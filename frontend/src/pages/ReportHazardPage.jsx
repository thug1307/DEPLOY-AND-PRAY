import React, { useEffect, useRef, useState } from "react";

import {
  FileText,
  MapPin,
  Calendar,
  Camera,
  CameraOff,
  RotateCcw,
  ShieldAlert,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Navigation,
} from "lucide-react";

// =====================================================
// BACKEND
// =====================================================

const API_BASE = "http://127.0.0.1:8000/api";

// =====================================================
// REPORT PAGE
// =====================================================

const ReportPage = () => {
  // ===================================================
  // FORM STATE
  // ===================================================

  const [hazardType, setHazardType] = useState("");

  const [description, setDescription] = useState("");

  const [observationDate, setObservationDate] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const [image, setImage] = useState(null);

  // ===================================================
  // CAMERA STATE
  // ===================================================

  const videoRef = useRef(null);

  const canvasRef = useRef(null);

  const streamRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);

  const [cameraLoading, setCameraLoading] = useState(false);

  const [cameraError, setCameraError] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  // ===================================================
  // UI STATE
  // ===================================================

  const [loading, setLoading] = useState(false);

  const [locationLoading, setLocationLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const [riskResult, setRiskResult] = useState(null);

  // ===================================================
  // STOP CAMERA
  // ===================================================

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setCameraOpen(false);
    setCameraLoading(false);
  };

  // ===================================================
  // CLEANUP CAMERA WHEN PAGE UNMOUNTS
  // ===================================================

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ===================================================
  // OPEN CAMERA
  // ===================================================

  const openCamera = async () => {
    setCameraError("");
    setError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "Camera access is not supported by this browser."
      );
      return;
    }

    try {
      setCameraLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 720,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      setCameraOpen(true);

      // Give React time to render the video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => {
            console.error("Video play error:", err);
          });
        }

        setCameraLoading(false);
      }, 100);
    } catch (err) {
      console.error("Camera error:", err);

      setCameraLoading(false);

      if (err.name === "NotAllowedError") {
        setCameraError(
          "Camera permission was denied. Please allow camera access in your browser."
        );
      } else if (err.name === "NotFoundError") {
        setCameraError(
          "No camera was found on this device."
        );
      } else {
        setCameraError(
          "Unable to access the camera. Please check your camera permissions."
        );
      }
    }
  };

  // ===================================================
  // CAPTURE PHOTO
  // ===================================================

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    if (!video.videoWidth || !video.videoHeight) {
      setCameraError(
        "Camera is not ready yet. Please wait a moment and try again."
      );
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError(
            "Unable to capture image."
          );
          return;
        }

        const capturedFile = new File(
          [blob],
          `hazard-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        setImage(capturedFile);

        const previewUrl =
          URL.createObjectURL(blob);

        setImagePreview(previewUrl);

        stopCamera();

        setCameraError("");
      },
      "image/jpeg",
      0.9
    );
  };

  // ===================================================
  // RETAKE PHOTO
  // ===================================================

  const retakePhoto = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview(null);

    openCamera();
  };

  // ===================================================
  // REMOVE PHOTO
  // ===================================================

  const removePhoto = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview(null);
  };

  // ===================================================
  // GET CURRENT LOCATION
  // ===================================================

  const useCurrentLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(
          position.coords.latitude.toFixed(6)
        );

        setLongitude(
          position.coords.longitude.toFixed(6)
        );

        setLocationLoading(false);
      },

      (err) => {
        console.error(
          "Location error:",
          err
        );

        setError(
          "Unable to get your current location. Please enter coordinates manually."
        );

        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ===================================================
  // VALIDATE FORM
  // ===================================================

  const validateForm = () => {
    if (!hazardType) {
      setError(
        "Please select a hazard type."
      );

      return false;
    }

    if (!description.trim()) {
      setError(
        "Please describe the hazard."
      );

      return false;
    }

    if (!observationDate) {
      setError(
        "Please select the observation date."
      );

      return false;
    }

    if (!latitude || !longitude) {
      setError(
        "Please provide latitude and longitude."
      );

      return false;
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      setError(
        "Latitude and longitude must be valid numbers."
      );

      return false;
    }

    if (lat < -90 || lat > 90) {
      setError(
        "Latitude must be between -90 and 90."
      );

      return false;
    }

    if (lng < -180 || lng > 180) {
      setError(
        "Longitude must be between -180 and 180."
      );

      return false;
    }

    return true;
  };

  // ===================================================
  // SUBMIT REPORT
  // ===================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setRiskResult(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // =================================================
      // STEP 1
      // CREATE REPORT
      // =================================================

      const reportPayload = {
        category: hazardType,

        description:
          description.trim(),

        observation_date:
          observationDate,

        latitude:
          Number(latitude),

        longitude:
          Number(longitude),
      };

      console.log(
        "Sending report:",
        reportPayload
      );

      console.log(
        "Captured evidence image:",
        image
      );

      const reportResponse = await fetch(
        `${API_BASE}/reports`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body:
            JSON.stringify(
              reportPayload
            ),
        }
      );

      const reportData =
        await reportResponse.json();

      console.log(
        "Report response:",
        reportData
      );

      // -------------------------------------------------
      // REPORT API ERROR
      // -------------------------------------------------

      if (!reportResponse.ok) {
        let message =
          "Report creation failed.";

        if (reportData?.detail) {
          message =
            typeof reportData.detail ===
            "string"
              ? reportData.detail
              : JSON.stringify(
                  reportData.detail
                );
        }

        throw new Error(message);
      }

      // =================================================
      // GET REPORT ID
      // =================================================

      const reportId =
        reportData.id ??
        reportData.report_id;

      console.log(
        "Created report ID:",
        reportId
      );

      // =================================================
      // STEP 2
      // RUN RISK CALCULATION
      // =================================================

      if (reportId) {
        const riskPayload = {
          latitude:
            Number(latitude),

          longitude:
            Number(longitude),

          date:
            observationDate,
        };

        console.log(
          "Sending risk calculation:",
          riskPayload
        );

        const riskResponse =
          await fetch(
            `${API_BASE}/risk/${reportId}/predict`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Accept:
                  "application/json",
              },

              body:
                JSON.stringify(
                  riskPayload
                ),
            }
          );

        const riskData =
          await riskResponse.json();

        console.log(
          "Risk response:",
          riskData
        );

        // ------------------------------------------------
        // RISK API ERROR
        // ------------------------------------------------

        if (!riskResponse.ok) {
          let message =
            "Risk calculation failed.";

          if (riskData?.detail) {
            message =
              typeof riskData.detail ===
              "string"
                ? riskData.detail
                : JSON.stringify(
                    riskData.detail
                  );
          }

          throw new Error(message);
        }

        // ------------------------------------------------
        // SAVE RISK RESULT
        // ------------------------------------------------

        setRiskResult(
          riskData
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(true);
    } catch (err) {
      console.error(
        "Report submission error:",
        err
      );

      setError(
        err.message ||
        "Unable to submit report."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // RESET FORM
  // ===================================================

  const resetForm = () => {
    stopCamera();

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setHazardType("");
    setDescription("");
    setObservationDate("");
    setLatitude("");
    setLongitude("");

    setImage(null);
    setImagePreview(null);

    setError("");
    setSuccess(false);
    setRiskResult(null);
    setCameraError("");
  };

  // ===================================================
  // RISK COLOR
  // ===================================================

  const getRiskColor = (category) => {
    const value =
      String(
        category || ""
      ).toLowerCase();

    if (
      value.includes("critical")
    ) {
      return "text-red-400";
    }

    if (
      value.includes("very high")
    ) {
      return "text-red-400";
    }

    if (
      value.includes("high")
    ) {
      return "text-orange-400";
    }

    if (
      value.includes("medium")
    ) {
      return "text-yellow-400";
    }

    if (
      value.includes("low")
    ) {
      return "text-lime-400";
    }

    return "text-green-400";
  };

  // ===================================================
  // RISK BACKGROUND
  // ===================================================

  const getRiskBackground = (category) => {
    const value =
      String(
        category || ""
      ).toLowerCase();

    if (
      value.includes("critical")
    ) {
      return (
        "border-red-500/40 bg-red-500/10"
      );
    }

    if (
      value.includes("very high")
    ) {
      return (
        "border-red-400/40 bg-red-400/10"
      );
    }

    if (
      value.includes("high")
    ) {
      return (
        "border-orange-400/40 bg-orange-400/10"
      );
    }

    if (
      value.includes("medium")
    ) {
      return (
        "border-yellow-400/40 bg-yellow-400/10"
      );
    }

    if (
      value.includes("low")
    ) {
      return (
        "border-lime-400/30 bg-lime-400/5"
      );
    }

    return (
      "border-green-400/30 bg-green-400/5"
    );
  };

  // ===================================================
  // PAGE
  // ===================================================

  return (
    <div className="min-h-screen bg-[#0b0f10] text-white p-5 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* =============================================
            HEADER
        ============================================= */}

        <div className="mb-7">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">
            <FileText size={16} />
            Hazard Reporting
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mt-2">
            Report a Hazard
          </h1>

          <p className="text-sm text-white/50 mt-2 max-w-2xl">
            Submit a landslide-related hazard
            observation. Location and observation
            date are used to perform an automated
            GIS and machine-learning risk assessment.
          </p>
        </div>

        {/* =============================================
            MAIN CARD
        ============================================= */}

        <div className="rounded-2xl border border-white/10 bg-[#111718] shadow-2xl overflow-hidden">

          {/* ===========================================
              CARD HEADER
          =========================================== */}

          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                <ShieldAlert
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <h2 className="font-semibold">
                  Hazard Information
                </h2>

                <p className="text-xs text-white/40 mt-1">
                  Provide details about the observed
                  hazard.
                </p>
              </div>

            </div>
          </div>

          {/* ===========================================
              FORM
          =========================================== */}

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >

            {/* =========================================
                HAZARD TYPE
            ========================================= */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Hazard Type
              </label>

              <select
                value={hazardType}
                onChange={(e) => {
                  setHazardType(
                    e.target.value
                  );

                  setError("");
                }}
                className="w-full h-12 rounded-xl bg-[#0b0f10] border border-white/10 px-4 text-sm text-white outline-none focus:border-cyan-400/60 transition"
              >
                <option
                  value=""
                  className="bg-[#111718]"
                >
                  Select hazard type
                </option>

                <option
                  value="Landslide"
                  className="bg-[#111718]"
                >
                  Landslide
                </option>

                <option
                  value="Mudslide"
                  className="bg-[#111718]"
                >
                  Mudslide
                </option>

                <option
                  value="Rockfall"
                  className="bg-[#111718]"
                >
                  Rockfall
                </option>

                <option
                  value="Debris Flow"
                  className="bg-[#111718]"
                >
                  Debris Flow
                </option>

                <option
                  value="Land Subsidence"
                  className="bg-[#111718]"
                >
                  Land Subsidence
                </option>

                <option
                  value="Other"
                  className="bg-[#111718]"
                >
                  Other
                </option>
              </select>
            </div>

            {/* =========================================
                DESCRIPTION
            ========================================= */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(
                    e.target.value
                  );

                  setError("");
                }}
                placeholder="Describe what you observed..."
                rows={4}
                className="w-full rounded-xl bg-[#0b0f10] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-cyan-400/60 transition resize-none"
              />
            </div>

            {/* =========================================
                DATE + LOCATION
            ========================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* DATE */}

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Calendar
                    size={15}
                    className="text-cyan-400"
                  />

                  Date of Observation
                </label>

                <input
                  type="date"
                  value={
                    observationDate
                  }
                  min="2024-01-01"
                  max="2024-12-31"
                  onChange={(e) => {
                    setObservationDate(
                      e.target.value
                    );

                    setError("");
                  }}
                  className="w-full h-12 rounded-xl bg-[#0b0f10] border border-white/10 px-4 text-sm text-white outline-none focus:border-cyan-400/60"
                />

                <p className="text-[11px] text-white/35 mt-2">
                  Historical rainfall data is
                  currently available for 2024.
                </p>
              </div>

              {/* LOCATION */}

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MapPin
                    size={15}
                    className="text-cyan-400"
                  />

                  Location
                </label>

                <button
                  type="button"
                  onClick={
                    useCurrentLocation
                  }
                  disabled={
                    locationLoading
                  }
                  className="h-10 px-4 rounded-lg border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 text-sm font-medium hover:bg-cyan-400/10 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {locationLoading ? (
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />
                  ) : (
                    <Navigation
                      size={15}
                    />
                  )}

                  {locationLoading
                    ? "Getting Location..."
                    : "Use Current Location"}
                </button>
              </div>

            </div>

            {/* =========================================
                COORDINATES
            ========================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Latitude
                </label>

                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => {
                    setLatitude(
                      e.target.value
                    );

                    setError("");
                  }}
                  placeholder="e.g. 26.139800"
                  className="w-full h-12 rounded-xl bg-[#0b0f10] border border-white/10 px-4 text-sm font-mono text-white placeholder:text-white/20 outline-none focus:border-cyan-400/60"
                />
              </div>

              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-2">
                  Longitude
                </label>

                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => {
                    setLongitude(
                      e.target.value
                    );

                    setError("");
                  }}
                  placeholder="e.g. 91.792500"
                  className="w-full h-12 rounded-xl bg-[#0b0f10] border border-white/10 px-4 text-sm font-mono text-white placeholder:text-white/20 outline-none focus:border-cyan-400/60"
                />
              </div>

            </div>

            {/* =========================================
                LIVE CAMERA EVIDENCE
            ========================================= */}

            <div>

              <label className="block text-sm font-semibold mb-2">
                Live Camera Evidence
              </label>

              <p className="text-xs text-white/40 mb-3">
                Capture a real-time image of the
                observed hazard. Previously saved
                images cannot be uploaded.
              </p>

              {/* CAMERA NOT OPEN + NO PHOTO */}

              {!cameraOpen && !imagePreview && (
                <div className="rounded-xl border border-dashed border-white/15 bg-[#0b0f10] p-6">

                  <div className="flex flex-col items-center justify-center text-center">

                    <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                      <Camera
                        size={26}
                        className="text-cyan-400"
                      />
                    </div>

                    <div className="text-sm font-semibold">
                      Capture Hazard Evidence
                    </div>

                    <div className="text-xs text-white/35 mt-1 max-w-sm">
                      Your device camera will be
                      opened to capture a live
                      photograph of the hazard.
                    </div>

                    <button
                      type="button"
                      onClick={openCamera}
                      disabled={cameraLoading}
                      className="mt-5 px-5 py-3 rounded-xl bg-cyan-300 text-black font-semibold hover:bg-cyan-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {cameraLoading ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />

                          Opening Camera...
                        </>
                      ) : (
                        <>
                          <Camera
                            size={18}
                          />

                          Open Camera
                        </>
                      )}
                    </button>

                  </div>

                </div>
              )}

              {/* LIVE CAMERA */}

              {cameraOpen && (
                <div className="rounded-xl border border-cyan-400/30 bg-black overflow-hidden">

                  <div className="relative aspect-video bg-black">

                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* CAMERA LIVE INDICATOR */}

                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5">

                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

                      <span className="text-[10px] font-bold tracking-widest">
                        LIVE CAMERA
                      </span>

                    </div>

                  </div>

                  <div className="p-3 flex gap-3">

                    <button
                      type="button"
                      onClick={
                        capturePhoto
                      }
                      className="flex-1 h-11 rounded-xl bg-cyan-300 text-black font-semibold hover:bg-cyan-200 transition flex items-center justify-center gap-2"
                    >
                      <Camera
                        size={18}
                      />

                      Capture Photo
                    </button>

                    <button
                      type="button"
                      onClick={
                        stopCamera
                      }
                      className="h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition flex items-center justify-center gap-2"
                    >
                      <CameraOff
                        size={17}
                      />

                      Close
                    </button>

                  </div>

                </div>
              )}

              {/* CAPTURED IMAGE PREVIEW */}

              {imagePreview && (
                <div className="rounded-xl border border-green-400/30 bg-green-400/5 overflow-hidden">

                  <div className="relative">

                    <img
                      src={imagePreview}
                      alt="Captured hazard evidence"
                      className="w-full max-h-[450px] object-contain bg-black"
                    />

                    <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/75 backdrop-blur-md border border-green-400/30 rounded-lg px-3 py-1.5">

                      <CheckCircle
                        size={14}
                        className="text-green-400"
                      />

                      <span className="text-[10px] font-bold tracking-widest text-green-300">
                        PHOTO CAPTURED
                      </span>

                    </div>

                  </div>

                  <div className="p-3 flex gap-3">

                    <button
                      type="button"
                      onClick={
                        retakePhoto
                      }
                      className="flex-1 h-11 rounded-xl border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 font-semibold hover:bg-cyan-400/10 transition flex items-center justify-center gap-2"
                    >
                      <RotateCcw
                        size={17}
                      />

                      Retake Photo
                    </button>

                    <button
                      type="button"
                      onClick={
                        removePhoto
                      }
                      className="h-11 px-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 hover:bg-red-500/10 transition"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              )}

              {/* CAMERA ERROR */}

              {cameraError && (
                <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">

                  <div className="flex items-start gap-3">

                    <AlertTriangle
                      size={17}
                      className="text-red-400 mt-0.5 shrink-0"
                    />

                    <div className="text-xs text-red-300">
                      {cameraError}
                    </div>

                  </div>

                </div>
              )}

              {/* HIDDEN CANVAS */}

              <canvas
                ref={canvasRef}
                className="hidden"
              />

            </div>

            {/* =========================================
                ERROR
            ========================================= */}

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">

                <div className="flex items-start gap-3">

                  <AlertTriangle
                    size={18}
                    className="text-red-400 mt-0.5 shrink-0"
                  />

                  <div>

                    <div className="text-sm font-semibold text-red-300">
                      Submission Failed
                    </div>

                    <div className="text-xs text-red-300/70 mt-1 break-words">
                      {error}
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* =========================================
                SUCCESS
            ========================================= */}

            {success && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-4">

                <div className="flex items-start gap-3">

                  <CheckCircle
                    size={20}
                    className="text-green-400 mt-0.5"
                  />

                  <div>

                    <div className="font-semibold text-green-300">
                      Report Submitted Successfully
                    </div>

                    <div className="text-xs text-green-300/70 mt-1">
                      Your hazard report has been
                      recorded and the risk assessment
                      has been completed.
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* =========================================
                RISK RESULT
            ========================================= */}

            {riskResult && (
              <div>

                <div className="flex items-center gap-2 mb-3">

                  <ShieldAlert
                    size={17}
                    className="text-cyan-400"
                  />

                  <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    AI Risk Assessment
                  </span>

                </div>

                <div
                  className={
                    "rounded-xl border p-5 " +
                    getRiskBackground(
                      riskResult.risk_category
                    )
                  }
                >

                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    Risk Category
                  </div>

                  <div
                    className={
                      "text-3xl font-black mt-1 " +
                      getRiskColor(
                        riskResult.risk_category
                      )
                    }
                  >
                    {
                      riskResult.risk_category
                    }
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <div className="rounded-lg bg-black/20 p-3">

                      <div className="text-xs text-white/40">
                        Probability
                      </div>

                      <div className="text-xl font-bold mt-1">

                        {(
                          Number(
                            riskResult.risk_probability
                          ) * 100
                        ).toFixed(1)}

                        %

                      </div>

                    </div>

                    <div className="rounded-lg bg-black/20 p-3">

                      <div className="text-xs text-white/40">
                        Risk Score
                      </div>

                      <div className="text-xl font-bold mt-1">

                        {Number(
                          riskResult.risk_score
                        ).toFixed(1)}

                        <span className="text-xs text-white/30">
                          {" "}/ 10
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* GIS FACTORS */}

                  {riskResult.contributing_factors && (
                    <div className="mt-4">

                      <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                        GIS Factors
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">

                        <RiskFactor
                          label="Elevation"
                          value={
                            riskResult
                              .contributing_factors
                              .elevation
                          }
                          unit="m"
                        />

                        <RiskFactor
                          label="Slope"
                          value={
                            riskResult
                              .contributing_factors
                              .slope
                          }
                          unit="°"
                        />

                        <RiskFactor
                          label="Rainfall 1D"
                          value={
                            riskResult
                              .contributing_factors
                              .rainfall_1d
                          }
                          unit="mm"
                        />

                        <RiskFactor
                          label="Rainfall 7D"
                          value={
                            riskResult
                              .contributing_factors
                              .rainfall_7d
                          }
                          unit="mm"
                        />

                        <RiskFactor
                          label="Rainfall 30D"
                          value={
                            riskResult
                              .contributing_factors
                              .rainfall_30d
                          }
                          unit="mm"
                        />

                      </div>

                    </div>
                  )}

                  {riskResult.model_version && (
                    <div className="text-[11px] text-white/25 mt-4">
                      Model:{" "}
                      {
                        riskResult.model_version
                      }
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* =========================================
                BUTTONS
            ========================================= */}

            <div className="pt-2 flex flex-col md:flex-row gap-3">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 rounded-xl bg-cyan-300 text-black font-semibold hover:bg-cyan-200 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Analyzing Hazard...
                  </>
                ) : (
                  <>
                    <ShieldAlert
                      size={18}
                    />

                    Submit & Analyze Risk
                  </>
                )}

              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="h-12 px-6 rounded-xl border border-white/10 bg-white/5 text-white/70 font-medium hover:bg-white/10 transition disabled:opacity-40"
              >
                Clear
              </button>

            </div>

          </form>
        </div>

        {/* =============================================
            FOOTER NOTE
        ============================================= */}

        <div className="mt-4 text-center text-[11px] text-white/25">
          LandslideGuard • GIS-assisted machine
          learning risk assessment
        </div>

      </div>
    </div>
  );
};

// =====================================================
// RISK FACTOR COMPONENT
// =====================================================

const RiskFactor = ({
  label,
  value,
  unit,
}) => {
  const number =
    Number(value);

  return (
    <div className="rounded-lg bg-black/20 p-3">

      <div className="text-[10px] text-white/35">
        {label}
      </div>

      <div className="font-mono text-sm font-semibold mt-1">

        {Number.isFinite(number)
          ? number.toFixed(2)
          : "N/A"}

        <span className="text-[10px] text-white/30 ml-1">
          {unit}
        </span>

      </div>

    </div>
  );
};

export default ReportPage;