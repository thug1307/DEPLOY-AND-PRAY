import React, { useEffect, useState } from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import {
  Map as MapIcon,
  AlertTriangle,
  Loader2,
  ShieldAlert,
  Radio,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

import { Link } from 'react-router-dom';



// =====================================================
// BACKEND
// =====================================================

const API_BASE = 'http://127.0.0.1:8000/api';



// =====================================================
// INDIA MAP CENTER
// =====================================================

const INDIA_CENTER = [22.5, 79.0];



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
// RISK MARKER
// =====================================================

const createRiskIcon = (category) => {
  const value = String(category || '').toLowerCase();

  let background = '#22c55e';

  if (value.includes('critical')) {
    background = '#991b1b';
  } else if (value.includes('very high')) {
    background = '#ef4444';
  } else if (value.includes('high')) {
    background = '#f97316';
  } else if (value.includes('medium')) {
    background = '#eab308';
  } else if (value.includes('low')) {
    background = '#84cc16';
  }

  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${background};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 12px ${background};
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
};



// =====================================================
// RISK COLOR
// =====================================================

const getRiskColor = (category) => {
  const value = String(category || '').toLowerCase();

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
// MAIN PAGE
// =====================================================

const EmergencyChecklistPage = () => {

  // ===================================================
  // CHECKLIST
  // ===================================================

  const [checklist, setChecklist] = useState([
    {
      id: 1,
      title: 'Sound Area Sirens',
      description:
        'Activate sector Alpha and Beta warning systems immediately.',
      critical: true,
      completed: false,
    },
    {
      id: 2,
      title: 'Notify Authorities',
      description:
        'Auto-dispatched alert to regional emergency services.',
      critical: false,
      completed: true,
    },
    {
      id: 3,
      title: 'Dispatch Rescue Teams',
      description:
        'Deploy quick response units to predicted impact zones.',
      critical: false,
      completed: false,
    },
    {
      id: 4,
      title: 'Activate Evacuation Routes',
      description:
        'Enable dynamic routing on digital road signs and mobile apps.',
      critical: false,
      completed: false,
    },
  ]);



  // ===================================================
  // MAP DATA
  // ===================================================

  const [zones, setZones] = useState([]);

  const [mapLoading, setMapLoading] =
    useState(true);

  const [mapError, setMapError] =
    useState('');



  // ===================================================
  // COMMUNICATION
  // ===================================================

  const [message, setMessage] =
    useState('');

  const [logs, setLogs] = useState([
    {
      source: 'SYS_AUTO',
      time: '14:02:45',
      text:
        'Seismic anomaly detected. Confidence: 94%. Triggering protocol.',
      type: 'system',
    },
    {
      source: 'DISPATCH',
      time: '14:03:10',
      text:
        'Alert broadcast to regional authorities confirmed.',
      type: 'dispatch',
    },
    {
      source: 'UNIT_BRAVO',
      time: '14:05:22',
      text:
        'Road blocked at Sector 4. Rerouting required.',
      type: 'urgent',
    },
  ]);



  // ===================================================
  // FETCH INDIA RISK ZONES
  // ===================================================

  const fetchRiskZones = async () => {

    setMapLoading(true);
    setMapError('');

    try {

      const response = await fetch(
        `${API_BASE}/risk/india/zones`
      );

      if (!response.ok) {

        throw new Error(
          `Risk zone API returned ${response.status}`
        );

      }

      const data =
        await response.json();

      console.log(
        'India risk zones:',
        data
      );

      setZones(
        Array.isArray(data.zones)
          ? data.zones
          : []
      );

    } catch (error) {

      console.error(
        'Failed to load India risk zones:',
        error
      );

      setMapError(
        error.message ||
        'Unable to load risk zones.'
      );

    } finally {

      setMapLoading(false);

    }
  };



  // ===================================================
  // LOAD MAP DATA
  // ===================================================

  useEffect(() => {

    fetchRiskZones();

  }, []);



  // ===================================================
  // CHECKLIST PROGRESS
  // ===================================================

  const completedCount =
    checklist.filter(
      item => item.completed
    ).length;

  const progress =
    Math.round(
      (completedCount / checklist.length) * 100
    );



  // ===================================================
  // TOGGLE CHECKLIST
  // ===================================================

  const toggleChecklist = (id) => {

    setChecklist(
      previous =>
        previous.map(item =>
          item.id === id
            ? {
                ...item,
                completed:
                  !item.completed,
              }
            : item
        )
    );

  };



  // ===================================================
  // SEND COMMUNICATION
  // ===================================================

  const sendMessage = () => {

    const trimmed =
      message.trim();

    if (!trimmed) {
      return;
    }

    const now =
      new Date();

    const time =
      now.toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }
      );

    setLogs(
      previous => [
        ...previous,
        {
          source: 'OPERATOR',
          time,
          text: trimmed,
          type: 'operator',
        },
      ]
    );

    setMessage('');

  };



  // ===================================================
  // ENTER KEY
  // ===================================================

  const handleMessageKeyDown = (event) => {

    if (event.key === 'Enter') {

      event.preventDefault();

      sendMessage();

    }

  };



  // ===================================================
  // FIND HIGHEST RISK
  // ===================================================

  const highestRiskZone =
    zones.length > 0
      ? [...zones]
          .filter(
            zone =>
              zone.risk_score !== null &&
              zone.risk_score !== undefined
          )
          .sort(
            (a, b) =>
              Number(b.risk_score) -
              Number(a.risk_score)
          )[0]
      : null;



  // ===================================================
  // PAGE
  // ===================================================

  return (

    <div className="min-h-screen bg-background text-on-surface p-4 md:p-6">

      <div className="max-w-[1700px] mx-auto">



        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-5">

          <div className="flex items-center gap-2 text-red-500 text-xs font-semibold tracking-widest uppercase mb-2">

            <ShieldAlert size={17} />

            Emergency Response

          </div>



          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">

            <div>

              <h1 className="text-2xl md:text-3xl font-bold">

                Protocol Execution

              </h1>

              <p className="text-sm text-on-surface-variant mt-1">

                Immediate Response Phase 1

              </p>

            </div>



            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2 text-xs text-green-400">

                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                EMERGENCY SYSTEM ACTIVE

              </div>

            </div>

          </div>

        </div>



        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_430px] gap-5">



          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="flex flex-col gap-5">



            {/* =================================================
                INDIA RISK MAP
            ================================================= */}

            <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">



              <div className="px-4 py-3 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  <div className="flex items-center gap-2">

                    <MapIcon
                      size={18}
                      className="text-primary"
                    />

                    <h2 className="font-bold">

                      India Risk Overview

                    </h2>

                  </div>

                  <p className="text-xs text-on-surface-variant mt-1">

                    Live GIS + ML risk assessment zones

                  </p>

                </div>



                <button
                  onClick={fetchRiskZones}
                  disabled={mapLoading}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors disabled:opacity-50"
                >

                  <RefreshCw
                    size={14}
                    className={
                      mapLoading
                        ? 'animate-spin'
                        : ''
                    }
                  />

                  Refresh

                </button>

              </div>



              {/* MAP */}

              <div className="relative h-[500px]">



                <MapContainer

                  center={INDIA_CENTER}

                  zoom={5}

                  scrollWheelZoom={true}

                  className="h-full w-full"

                >

                  <TileLayer

                    attribution="&copy; OpenStreetMap contributors"

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                  />



                  {zones.map((zone, index) => {

                    if (
                      zone.latitude === null ||
                      zone.longitude === null
                    ) {
                      return null;
                    }

                    return (

                      <Marker

                        key={
                          `${zone.name}-${index}`
                        }

                        position={[
                          Number(zone.latitude),
                          Number(zone.longitude),
                        ]}

                        icon={
                          createRiskIcon(
                            zone.risk_category
                          )
                        }

                      >

                        <Popup>

                          <div className="min-w-[190px] text-sm">

                            <div className="font-bold text-base mb-2">

                              {zone.name}

                            </div>



                            <div className="flex justify-between gap-4 mb-1">

                              <span>
                                Risk
                              </span>

                              <strong
                                className={
                                  getRiskColor(
                                    zone.risk_category
                                  )
                                }
                              >

                                {zone.risk_category}

                              </strong>

                            </div>



                            <div className="flex justify-between gap-4 mb-1">

                              <span>
                                Probability
                              </span>

                              <strong>

                                {zone.risk_probability !== null
                                  ? `${(
                                      Number(
                                        zone.risk_probability
                                      ) * 100
                                    ).toFixed(1)}%`
                                  : 'N/A'}

                              </strong>

                            </div>



                            <div className="flex justify-between gap-4 mb-1">

                              <span>
                                Score
                              </span>

                              <strong>

                                {zone.risk_score !== null
                                  ? `${Number(
                                      zone.risk_score
                                    ).toFixed(1)} / 10`
                                  : 'N/A'}

                              </strong>

                            </div>



                            <div className="border-t border-gray-200 my-2 pt-2">

                              <div className="flex justify-between">

                                <span>
                                  Slope
                                </span>

                                <strong>

                                  {zone.slope !== null
                                    ? `${Number(
                                        zone.slope
                                      ).toFixed(2)}°`
                                    : 'N/A'}

                                </strong>

                              </div>



                              <div className="flex justify-between">

                                <span>
                                  Rainfall 1D
                                </span>

                                <strong>

                                  {zone.rainfall_1d !== null
                                    ? `${Number(
                                        zone.rainfall_1d
                                      ).toFixed(2)} mm`
                                    : 'N/A'}

                                </strong>

                              </div>

                            </div>

                          </div>

                        </Popup>

                      </Marker>

                    );

                  })}

                </MapContainer>



                {/* MAP LOADING */}

                {mapLoading && (

                  <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">

                    <div className="flex items-center gap-2 bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-sm">

                      <Loader2
                        size={18}
                        className="animate-spin text-primary"
                      />

                      Loading GIS + ML risk zones...

                    </div>

                  </div>

                )}



                {/* MAP ERROR */}

                {mapError && !mapLoading && (

                  <div className="absolute top-4 left-4 right-4 z-[1000]">

                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-300">

                      <AlertTriangle size={17} />

                      {mapError}

                    </div>

                  </div>

                )}



                {/* MAP TITLE */}

                <div className="absolute top-4 left-4 z-[900]">

                  <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">

                    <div className="text-xs font-bold">

                      INDIA

                    </div>

                    <div className="text-[10px] text-white/50">

                      ML RISK ZONES

                    </div>

                  </div>

                </div>



                {/* LEGEND */}

                <div className="absolute bottom-4 left-4 z-[900]">

                  <div className="bg-black/85 backdrop-blur-md border border-white/10 rounded-xl p-3">

                    <div className="text-[10px] font-bold tracking-widest mb-2">

                      RISK LEVEL

                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">

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

            </div>



            {/* =================================================
                HIGHEST RISK SUMMARY
            ================================================= */}

            {highestRiskZone && (

              <div className="glass-panel rounded-xl border border-red-500/20 bg-red-500/5 p-4">

                <div className="flex items-start gap-3">

                  <div className="p-2 rounded-lg bg-red-500/10">

                    <AlertTriangle
                      size={20}
                      className="text-red-400"
                    />

                  </div>

                  <div className="flex-1">

                    <div className="text-[10px] tracking-widest text-red-300 uppercase">

                      Highest Detected Risk

                    </div>

                    <div className="font-bold text-lg mt-1">

                      {highestRiskZone.name}

                    </div>

                    <div className="text-sm text-on-surface-variant mt-1">

                      {highestRiskZone.risk_category}
                      {' • '}
                      {Number(
                        highestRiskZone.risk_score
                      ).toFixed(1)}
                      / 10 risk score

                    </div>

                  </div>

                  <div className="text-right">

                    <div className="text-2xl font-black text-red-400">

                      {(
                        Number(
                          highestRiskZone.risk_probability
                        ) * 100
                      ).toFixed(1)}%

                    </div>

                    <div className="text-[10px] text-white/40">

                      ML PROBABILITY

                    </div>

                  </div>

                </div>

              </div>

            )}



            {/* =================================================
                CHECKLIST
            ================================================= */}

            <div className="glass-panel rounded-xl border border-white/10 p-4">

              <div className="flex justify-between items-end mb-3">

                <div>

                  <h2 className="font-bold">

                    Response Checklist

                  </h2>

                  <p className="text-xs text-on-surface-variant mt-1">

                    Immediate Response Phase 1

                  </p>

                </div>

                <div className="text-right">

                  <span className="text-xl font-bold text-primary">

                    {progress}%

                  </span>

                  <div className="text-[9px] text-white/40 tracking-widest">

                    COMPLETED

                  </div>

                </div>

              </div>



              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden mb-4">

                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>



              <div className="flex flex-col gap-2">

                {checklist.map(item => (

                  <label
                    key={item.id}
                    className={`
                      flex items-start gap-3 p-3 rounded-lg
                      border border-white/10
                      cursor-pointer
                      transition-all
                      ${
                        item.completed
                          ? 'opacity-50 bg-white/5'
                          : 'bg-white/[0.02] hover:bg-white/5'
                      }
                    `}
                  >

                    <input
                      type="checkbox"
                      checked={
                        item.completed
                      }
                      onChange={() =>
                        toggleChecklist(
                          item.id
                        )
                      }
                      className="mt-1 shrink-0"
                    />



                    <div className="flex-1">

                      <div className="flex items-start justify-between gap-2">

                        <h3
                          className={
                            item.completed
                              ? 'font-semibold line-through'
                              : 'font-semibold'
                          }
                        >

                          {item.title}

                        </h3>



                        {item.critical &&
                          !item.completed && (

                            <span className="text-[9px] text-red-400 border border-red-500/30 bg-red-500/10 px-2 py-0.5 rounded">

                              CRITICAL

                            </span>

                          )}



                        {item.completed && (

                          <span className="flex items-center gap-1 text-[9px] text-green-400">

                            <CheckCircle
                              size={12}
                            />

                            DONE

                          </span>

                        )}

                      </div>



                      <p className="text-xs text-on-surface-variant mt-1">

                        {item.description}

                      </p>

                    </div>

                  </label>

                ))}

              </div>

            </div>



            {/* =================================================
                NEXT PAGE BUTTON
            ================================================= */}

            <div className="flex justify-end">

              <Link
                to="/emergency/summary"
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-primary text-on-primary font-semibold hover:opacity-90 transition-all shadow-[0_0_15px_rgba(0,218,248,0.25)]"
              >

                Continue to Debrief

                <span className="text-lg">
                  →
                </span>

              </Link>

            </div>



          </section>



          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <section className="flex flex-col gap-5">



            {/* =================================================
                TEAM STATUS
            ================================================= */}

            <div className="glass-panel rounded-xl p-4 border border-white/10">

              <div className="flex items-center gap-2 mb-3">

                <Radio
                  size={17}
                  className="text-primary"
                />

                <h3 className="text-xs font-bold tracking-widest">

                  ACTIVE RESPONSE TEAMS

                </h3>

              </div>



              <TeamRow
                name="Unit Alpha"
                status="EN ROUTE"
                statusClass="text-green-400"
              />

              <TeamRow
                name="Unit Bravo"
                status="DELAYED"
                statusClass="text-orange-400"
                delayed
              />

              <TeamRow
                name="Medical Response"
                status="STANDBY"
                statusClass="text-yellow-400"
              />

            </div>



            {/* =================================================
                COMMUNICATION LOG
            ================================================= */}

            <div className="glass-panel rounded-xl border border-white/10 flex flex-col min-h-[520px] overflow-hidden">

              <div className="p-4 border-b border-white/10">

                <h3 className="text-xs font-bold tracking-widest flex items-center gap-2">

                  <Radio size={14} />

                  COMMUNICATIONS LOG

                </h3>

              </div>



              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

                {logs.map((log, index) => (

                  <div
                    key={index}
                    className={`
                      border-l-2 pl-3
                      ${
                        log.type === 'urgent'
                          ? 'border-orange-500 bg-orange-500/5 rounded-r p-2'
                          : log.type === 'dispatch'
                          ? 'border-green-400/40'
                          : log.type === 'operator'
                          ? 'border-primary'
                          : 'border-primary/30'
                      }
                    `}
                  >

                    <div className="flex justify-between items-baseline gap-2">

                      <span
                        className={`
                          text-[10px] font-bold tracking-widest
                          ${
                            log.type === 'urgent'
                              ? 'text-orange-400'
                              : log.type === 'operator'
                              ? 'text-primary'
                              : log.type === 'dispatch'
                              ? 'text-green-400'
                              : 'text-primary/80'
                          }
                        `}
                      >

                        {log.source}

                      </span>



                      <span className="text-[10px] font-mono text-white/40">

                        {log.time}

                      </span>

                    </div>



                    <p className="text-xs text-on-surface mt-1">

                      {log.text}

                    </p>

                  </div>

                ))}

              </div>



              {/* MESSAGE INPUT */}

              <div className="p-3 border-t border-white/10">

                <div className="relative">

                  <input
                    value={message}
                    onChange={event =>
                      setMessage(
                        event.target.value
                      )
                    }
                    onKeyDown={
                      handleMessageKeyDown
                    }
                    className="w-full bg-black/30 border border-white/10 rounded-lg text-sm text-on-surface py-2.5 pl-3 pr-12 outline-none focus:border-primary"
                    placeholder="Transmit status update..."
                  />



                  <button
                    onClick={sendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors"
                  >

                    <Radio
                      size={17}
                    />

                  </button>

                </div>

              </div>

            </div>



          </section>



        </div>



      </div>

    </div>

  );
};



// =====================================================
// TEAM ROW
// =====================================================

const TeamRow = ({
  name,
  status,
  statusClass,
  delayed = false,
}) => {

  return (

    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 mb-2 last:mb-0">

      <div className="flex items-center gap-3">

        <div
          className={`
            w-2 h-2 rounded-full
            ${
              delayed
                ? 'bg-orange-400 animate-pulse'
                : 'bg-green-400'
            }
          `}
        />

        <span className="text-sm">

          {name}

        </span>

      </div>

      <span
        className={`text-[10px] font-mono font-bold ${statusClass}`}
      >

        {status}

      </span>

    </div>

  );
};



// =====================================================
// LEGEND
// =====================================================

const LegendItem = ({
  label,
  color,
}) => {

  return (

    <div className="flex items-center gap-2">

      <span
        className={`w-2.5 h-2.5 rounded-sm ${color}`}
      />

      <span>

        {label}

      </span>

    </div>

  );
};



export default EmergencyChecklistPage;