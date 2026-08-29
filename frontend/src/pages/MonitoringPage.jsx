import React, { useState } from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import {
  Map as MapIcon,
  Crosshair,
  Navigation,
  BrainCircuit,
  Loader2,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';


// =====================================================
// BACKEND
// =====================================================

const API_BASE = 'http://127.0.0.1:8000/api';


// =====================================================
// NER MAP CENTER
// =====================================================

const NER_CENTER = [25.8, 93.2];


// =====================================================
// LEAFLET MARKER FIX
// =====================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',

  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',

  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});


// =====================================================
// MAP CLICK HANDLER
// =====================================================

function MapClickHandler({ onLocationSelect }) {

  useMapEvents({

    click(event) {

      onLocationSelect({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });

    },

  });

  return null;
}


// =====================================================
// MAIN MONITORING PAGE
// =====================================================

const MonitoringPage = () => {

  const [selectedLocation, setSelectedLocation] =
    useState(null);

  const [selectedDate, setSelectedDate] =
    useState('2024-08-15');

  const [loading, setLoading] =
    useState(false);

  const [riskResult, setRiskResult] =
    useState(null);

  const [error, setError] =
    useState('');


  // =====================================================
  // LOCATION SELECT
  // =====================================================

  const handleLocationSelect = (location) => {

    setSelectedLocation(location);

    setRiskResult(null);

    setError('');

  };


  // =====================================================
  // ML ASSESSMENT
  // =====================================================

  const runMLAssessment = async () => {

    if (!selectedLocation) {

      setError(
        'Please select a location on the map.'
      );

      return;

    }


    if (!selectedDate) {

      setError(
        'Please select a date.'
      );

      return;

    }


    setLoading(true);

    setError('');

    setRiskResult(null);


    try {

      const payload = {

        latitude:
          selectedLocation.lat,

        longitude:
          selectedLocation.lng,

        date:
          selectedDate,

      };


      console.log(
        'Sending location to GIS + ML:',
        payload
      );


      const response = await fetch(

        `${API_BASE}/risk/predict`,

        {

          method: 'POST',

          headers: {

            'Content-Type':
              'application/json',

            Accept:
              'application/json',

          },

          body:
            JSON.stringify(payload),

        }

      );


      if (!response.ok) {

        let message =
          `Prediction API returned status ${response.status}`;


        try {

          const errorData =
            await response.json();

          if (errorData.detail) {

            message =
              typeof errorData.detail === 'string'
                ? errorData.detail
                : JSON.stringify(
                    errorData.detail
                  );

          }

        } catch {

          // Keep default error.

        }


        throw new Error(message);

      }


      const data =
        await response.json();


      console.log(
        'GIS + ML prediction result:',
        data
      );


      setRiskResult(data);

    }


    catch (err) {

      console.error(
        'GIS + ML prediction error:',
        err
      );


      setError(
        err.message ||
        'Unable to run ML prediction.'
      );

    }


    finally {

      setLoading(false);

    }

  };


  // =====================================================
  // RISK COLOR
  // =====================================================

  const getRiskColor = (category) => {

    const value =
      String(category || '').toLowerCase();


    if (value.includes('critical')) {
      return 'text-red-500';
    }

    if (value.includes('very high')) {
      return 'text-red-400';
    }

    if (value.includes('high')) {
      return 'text-orange-400';
    }

    if (value.includes('medium')) {
      return 'text-yellow-400';
    }

    if (value.includes('low')) {
      return 'text-lime-400';
    }

    return 'text-green-400';

  };


  // =====================================================
  // RISK BACKGROUND
  // =====================================================

  const getRiskBackground = (category) => {

    const value =
      String(category || '').toLowerCase();


    if (value.includes('critical')) {
      return 'border-red-500/40 bg-red-500/10';
    }

    if (value.includes('very high')) {
      return 'border-red-400/40 bg-red-400/10';
    }

    if (value.includes('high')) {
      return 'border-orange-400/40 bg-orange-400/10';
    }

    if (value.includes('medium')) {
      return 'border-yellow-400/40 bg-yellow-400/10';
    }

    if (value.includes('low')) {
      return 'border-lime-400/30 bg-lime-400/5';
    }

    return 'border-green-400/30 bg-green-400/5';

  };


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <div className="min-h-screen bg-background text-on-surface p-6">

      <div className="max-w-[1600px] mx-auto">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6">

          <div className="flex items-center gap-2 text-primary text-xs font-semibold tracking-widest uppercase mb-2">

            <MapIcon size={16} />

            Risk Monitoring

          </div>


          <h1 className="text-3xl md:text-4xl font-bold">

            NER Landslide Risk Map

          </h1>


          <p className="text-on-surface-variant mt-2 max-w-3xl">

            Interactive geospatial monitoring of
            landslide-prone areas across the
            North Eastern Region of India.

          </p>

        </div>



        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_390px] gap-5 items-start">


          {/* =================================================
              MAP
          ================================================= */}

          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/10 min-h-[650px]">

            <MapContainer

              center={NER_CENTER}

              zoom={6}

              scrollWheelZoom={true}

              className="h-[650px] w-full"

            >

              <TileLayer

                attribution="&copy; OpenStreetMap contributors"

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

              />


              <MapClickHandler

                onLocationSelect={
                  handleLocationSelect
                }

              />


              {selectedLocation && (

                <Marker

                  position={[
                    selectedLocation.lat,
                    selectedLocation.lng,
                  ]}

                >

                  <Popup>

                    <div className="text-sm">

                      <strong>
                        Selected Location
                      </strong>

                      <br />

                      Latitude:{' '}

                      {selectedLocation.lat.toFixed(5)}

                      <br />

                      Longitude:{' '}

                      {selectedLocation.lng.toFixed(5)}

                    </div>

                  </Popup>

                </Marker>

              )}

            </MapContainer>



            {/* =================================================
                MAP OVERLAY
            ================================================= */}

            <div className="absolute top-4 left-4 z-[1000]">

              <div className="bg-black/75 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">

                <div className="flex items-center gap-2 text-sm font-semibold">

                  <Navigation
                    size={16}
                    className="text-primary"
                  />

                  NER Monitoring Area

                </div>


                <p className="text-xs text-white/60 mt-1">

                  Click anywhere on the map
                  to select a location

                </p>

              </div>

            </div>



            {/* =================================================
                LEGEND
            ================================================= */}

            <div className="absolute bottom-5 left-5 z-[1000]">

              <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-4">

                <div className="text-xs font-bold mb-3">

                  LANDSLIDE RISK

                </div>


                <div className="space-y-2 text-xs">

                  <LegendItem
                    label="Very Low"
                    color="bg-green-500"
                  />

                  <LegendItem
                    label="Low"
                    color="bg-lime-500"
                  />

                  <LegendItem
                    label="Medium"
                    color="bg-yellow-500"
                  />

                  <LegendItem
                    label="High"
                    color="bg-orange-500"
                  />

                  <LegendItem
                    label="Very High"
                    color="bg-red-500"
                  />

                  <LegendItem
                    label="Critical"
                    color="bg-red-900"
                  />

                </div>

              </div>

            </div>

          </div>



          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <div className="xl:sticky xl:top-5 space-y-4 max-h-[calc(100vh-40px)] overflow-y-auto pr-1">


            {/* =================================================
                LOCATION CARD
            ================================================= */}

            <div className="glass-panel rounded-2xl p-5 border border-white/10">

              <div className="flex items-center gap-2 mb-4">

                <Crosshair
                  size={18}
                  className="text-primary"
                />

                <h2 className="font-bold">

                  Location Assessment

                </h2>

              </div>


              <p className="text-sm text-on-surface-variant mb-4">

                Click on the map to select a
                location for risk assessment.

              </p>


              {selectedLocation ? (

                <div className="grid grid-cols-2 gap-3">


                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">

                    <div className="text-[10px] text-on-surface-variant tracking-widest">

                      LATITUDE

                    </div>


                    <div className="font-mono text-sm mt-1">

                      {selectedLocation.lat.toFixed(5)}

                    </div>

                  </div>


                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">

                    <div className="text-[10px] text-on-surface-variant tracking-widest">

                      LONGITUDE

                    </div>


                    <div className="font-mono text-sm mt-1">

                      {selectedLocation.lng.toFixed(5)}

                    </div>

                  </div>


                  <div className="col-span-2 rounded-lg bg-white/5 border border-white/10 p-3">

                    <div className="text-[10px] text-on-surface-variant tracking-widest">

                      ASSESSMENT DATE

                    </div>


                    <input

                      type="date"

                      value={selectedDate}

                      min="2024-01-01"

                      max="2024-12-31"

                      onChange={(event) => {

                        setSelectedDate(
                          event.target.value
                        );

                        setRiskResult(null);

                        setError('');

                      }}

                      className="w-full mt-2 rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary"

                    />

                  </div>

                </div>

              ) : (

                <div className="rounded-lg border border-dashed border-white/15 p-5 text-center">

                  <Crosshair
                    size={26}
                    className="mx-auto text-white/30"
                  />


                  <p className="text-sm text-on-surface-variant mt-2">

                    No location selected

                  </p>


                  <p className="text-xs text-white/40 mt-1">

                    Click anywhere on the map

                  </p>

                </div>

              )}

            </div>



            {/* =================================================
                AI CARD
            ================================================= */}

            <div className="glass-panel rounded-2xl p-5 border border-primary/20 bg-primary/5">

              <div className="flex items-center gap-2 text-primary">

                <BrainCircuit size={18} />

                <span className="text-xs font-semibold tracking-widest uppercase">

                  AI Risk Prediction

                </span>

              </div>


              <h2 className="text-xl font-bold mt-2">

                Machine Learning Assessment

              </h2>


              <p className="text-sm text-on-surface-variant mt-2">

                GIS automatically extracts terrain
                and rainfall data before running
                the XGBoost prediction model.

              </p>


              {/* =================================================
                  BUTTON
              ================================================= */}

              <button

                onClick={runMLAssessment}

                disabled={
                  !selectedLocation ||
                  !selectedDate ||
                  loading
                }

                className="w-full mt-4 py-3 rounded-lg bg-primary text-on-primary font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center justify-center gap-2"

              >

                {loading ? (

                  <>

                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Getting GIS Data...

                  </>

                ) : (

                  <>

                    <BrainCircuit
                      size={18}
                    />

                    Run ML Risk Assessment

                  </>

                )}

              </button>



              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (

                <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">

                  <div className="flex gap-2 items-start">

                    <AlertTriangle
                      size={17}
                      className="text-red-400 mt-0.5 shrink-0"
                    />


                    <p className="text-xs text-red-300">

                      {error}

                    </p>

                  </div>

                </div>

              )}



              {/* =================================================
                  RESULT
              ================================================= */}

              {riskResult && (

                <div className="mt-4">


                  {/* =============================================
                      RESULT HEADER
                  ============================================= */}

                  <div className="flex items-center justify-between mb-3">

                    <div className="text-xs text-on-surface-variant uppercase tracking-widest">

                      Prediction Result

                    </div>


                    <CheckCircle
                      size={18}
                      className="text-green-400"
                    />

                  </div>



                  {/* =============================================
                      MAIN RISK BOX
                  ============================================= */}

                  <div

                    className={

                      'rounded-xl border p-4 ' +

                      getRiskBackground(
                        riskResult.risk_category
                      )

                    }

                  >

                    <div className="text-xs text-on-surface-variant">

                      RISK CATEGORY

                    </div>


                    <div

                      className={

                        'text-4xl font-black mt-1 ' +

                        getRiskColor(
                          riskResult.risk_category
                        )

                      }

                    >

                      {riskResult.risk_category}

                    </div>



                    {/* =========================================
                        PROBABILITY + SCORE
                    ========================================= */}

                    <div className="grid grid-cols-2 gap-3 mt-4">


                      <div className="rounded-lg bg-black/20 p-3">

                        <div className="text-xs text-on-surface-variant">

                          Probability

                        </div>


                        <div className="text-2xl font-bold mt-1">

                          {(
                            Number(
                              riskResult.risk_probability
                            ) * 100

                          ).toFixed(1)}

                          %

                        </div>

                      </div>



                      <div className="rounded-lg bg-black/20 p-3">

                        <div className="text-xs text-on-surface-variant">

                          Risk Score

                        </div>


                        <div className="text-2xl font-bold mt-1">

                          {Number(
                            riskResult.risk_score
                          ).toFixed(1)}

                          <span className="text-sm text-white/40">

                            {' '}/ 10

                          </span>

                        </div>

                      </div>

                    </div>

                  </div>



                  {/* =============================================
                      GIS FACTORS
                  ============================================= */}

                  {riskResult.contributing_factors && (

                    <div className="mt-4">

                      <div className="text-xs text-on-surface-variant uppercase tracking-widest mb-2">

                        GIS Contributing Factors

                      </div>


                      <div className="space-y-2">


                        <FactorRow
                          label="Elevation"
                          value={
                            riskResult
                              .contributing_factors
                              .elevation
                          }
                          unit="m"
                        />


                        <FactorRow
                          label="Slope"
                          value={
                            riskResult
                              .contributing_factors
                              .slope
                          }
                          unit="°"
                        />


                        <FactorRow
                          label="Rainfall (1 Day)"
                          value={
                            riskResult
                              .contributing_factors
                              .rainfall_1d
                          }
                          unit="mm"
                        />


                        <FactorRow
                          label="Rainfall (7 Days)"
                          value={
                            riskResult
                              .contributing_factors
                              .rainfall_7d
                          }
                          unit="mm"
                        />


                        <FactorRow
                          label="Rainfall (30 Days)"
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



                  {/* =============================================
                      MODEL
                  ============================================= */}

                  <div className="mt-3 text-xs text-white/40">

                    Model:{' '}

                    {riskResult.model_version}

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};


// =====================================================
// FACTOR ROW
// =====================================================

const FactorRow = ({
  label,
  value,
  unit,
}) => {

  const numericValue =
    Number(value);


  return (

    <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">

      <span className="text-xs text-on-surface-variant">

        {label}

      </span>


      <span className="font-mono text-sm font-semibold">

        {Number.isFinite(numericValue)
          ? numericValue.toFixed(2)
          : 'N/A'}

        {unit && (

          <span className="text-white/40 ml-1">

            {unit}

          </span>

        )}

      </span>

    </div>

  );

};


// =====================================================
// LEGEND ITEM
// =====================================================

const LegendItem = ({
  label,
  color,
}) => {

  return (

    <div className="flex items-center gap-2">

      <span

        className={
          'w-3 h-3 rounded-sm ' +
          color
        }

      />

      <span>
        {label}
      </span>

    </div>

  );

};


// =====================================================
// EXPORT
// =====================================================

export default MonitoringPage;