import { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, CheckCircle, ArrowLeft, X, RefreshCw, SwitchCamera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createReport, uploadImage } from '../services/api';
import './ReportHazardPage.css';

const ReportHazardPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [formData, setFormData] = useState({
    hazardType: '',
    description: '',
    latitude: '',
    longitude: '',
    photo: null,
    photoDataUrl: null
  });

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async (mode = facingMode) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: mode } } 
      });
      setIsCameraActive(true);
      // Wait for state update to render video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 0);
      streamRef.current = stream;
    } catch (err) {
      console.error("Error accessing camera with specific facing mode:", err);
      // Fallback for older browsers or strict devices
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraActive(true);
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
          }
        }, 0);
        streamRef.current = fallbackStream;
      } catch (fallbackErr) {
        console.error("Fallback camera error:", fallbackErr);
        alert("Could not access the camera. Please check permissions or use a secure context (HTTPS/localhost).");
      }
    }
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setFormData(prev => ({ ...prev, photoDataUrl: dataUrl }));
      
      // Auto geo-tag
      if (!formData.latitude || !formData.longitude) {
        handleLocation({ preventDefault: () => {} });
      }
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setFormData(prev => ({ ...prev, photoDataUrl: null }));
    startCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleLocation = (e) => {
    e.preventDefault();
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4)
          }));
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Could not get your location. Please ensure location services are enabled.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
    }
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
    }
  };

const CATEGORY_MAP = {
  'Road/Hillside Crack': 'ROAD_CRACK',
  'Rockfall': 'ROCKFALL',
  'Soil Movement': 'SOIL_MOVEMENT',
  'Water Seepage': 'WATER_SEEPAGE',
  'Landslide': 'LANDSLIDE',
  'Other': 'OTHER',
};

const handleSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);
  setSubmitError('');

  try {
    let imageUrl = null;

    if (formData.photo) {
      const uploaded = await uploadImage(formData.photo);
      imageUrl = uploaded.path;
    }

    const report = await createReport({
      description: formData.description,
      category: CATEGORY_MAP[formData.hazardType] || 'OTHER',
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      image_url: imageUrl,
    });

    console.log('Report successfully created:', report);

    setSubmittedReport(report);
    setIsSubmitted(true);

  } catch (error) {
    console.error('Report submission failed:', error);
    setSubmitError(
      error.message || 'Failed to submit report. Please try again.'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  if (isSubmitted) {
    return (
      <div className="report-container">
        <div className="card confirmation-card">
          <div className="success-icon-wrapper">
            <CheckCircle size={48} />
          </div>
          <h2>Report Submitted Successfully</h2>
          <p className="text-muted">Thank you for contributing to community safety.</p>
          
          <div className="assessment-card">
            <h3>Initial Risk Assessment</h3>
            <div className="assessment-grid">
              <div className="a-item">
                <span className="a-label">Report ID</span>
                <span className="a-value">REP-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="a-item">
                <span className="a-label">Location</span>
                <span className="a-value">{formData.latitude || 'Unknown'}, {formData.longitude || 'Unknown'}</span>
              </div>
              <div className="a-item">
                <span className="a-label">Hazard Type</span>
                <span className="a-value">{formData.hazardType}</span>
              </div>
              <div className="a-item">
                <span className="a-label">Status</span>
                <span className="a-value status-review">Under Review</span>
              </div>
            </div>
            
            <div className="risk-banner high">
              <div className="rb-left">
                <span className="rb-title">Estimated Risk Level</span>
                <span className="rb-level">High Risk</span>
              </div>
              <div className="rb-right">
                <span className="rb-score">7.8</span>
                <span className="rb-max">/10</span>
              </div>
            </div>
            
            <div className="recommendation">
              <strong>Recommended Action:</strong> Avoid the immediate area. A field inspection team has been notified.
            </div>
          </div>
          
          <button className="btn btn-primary" onClick={() => setIsSubmitted(false)}>
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/" className="btn btn-outline" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 style={{ margin: 0 }}>Report a Hazard</h2>
          <p className="text-muted" style={{ margin: 0 }}>Help authorities identify potential landslide risks in your area.</p>
        </div>
      </div>

      <div className="card report-form-card">
        <form onSubmit={handleSubmit} className="report-form">
          
          <div className="form-group">
            <label>Live Camera &amp; Geo-Tag</label>
            
            {!isCameraActive && !formData.photoDataUrl && (
              <div 
                className="photo-upload-area" 
                onClick={startCamera}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
              >
                <Camera size={32} className="text-muted" />
                <span style={{ marginTop: '0.5rem', fontWeight: 500 }}>
                  Tap to Start Camera
                </span>
                <p className="small-text">Take a live photo to automatically geo-tag</p>
              </div>
            )}

            {isCameraActive && (
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '8px', backgroundColor: '#000', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover' }}
                />
                <button 
                  type="button"
                  onClick={capturePhoto}
                  style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', zIndex: 10 }}
                >
                  <Camera size={28} />
                </button>
                <button
                  type="button"
                  onClick={toggleCamera}
                  style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                >
                  <SwitchCamera size={24} />
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {formData.photoDataUrl && (
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
                <img src={formData.photoDataUrl} alt="Captured hazard" style={{ width: '100%', display: 'block' }} />
                <button 
                  type="button"
                  onClick={retakePhoto}
                  className="btn btn-outline"
                  style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <RefreshCw size={16} /> Retake Photo
                </button>
              </div>
            )}
            
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          <div className="form-group">
            <label htmlFor="hazardType">Hazard Type</label>
            <select 
              id="hazardType" 
              className="form-control" 
              required
              value={formData.hazardType}
              onChange={e => setFormData({...formData, hazardType: e.target.value})}
            >
              <option value="" disabled>Select hazard type...</option>
              <option value="Road/Hillside Crack">Road/Hillside Crack</option>
              <option value="Soil Movement">Soil Movement</option>
              <option value="Rockfall">Rockfall</option>
              <option value="Water Seepage">Water Seepage</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              className="form-control" 
              rows="3" 
              placeholder="What did you observe? E.g., deep crack on the road expanding since yesterday..."
              required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Location</label>
            <div className="location-control">
              <button 
                type="button" 
                className="btn btn-outline location-btn" 
                onClick={handleLocation}
                disabled={isLocating}
              >
                <MapPin size={18} />
                {isLocating ? 'Acquiring GPS...' : 'Use Current Location'}
              </button>
              {(formData.latitude && formData.longitude) && (
                <div className="coordinates-display">
                  Lat: {formData.latitude}, Lng: {formData.longitude}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            Submit Hazard Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportHazardPage;
