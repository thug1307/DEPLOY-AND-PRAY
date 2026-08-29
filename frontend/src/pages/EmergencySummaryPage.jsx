import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmergencySummaryPage = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = () => {
    if (!feedback.trim()) return;

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background text-on-surface">

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="p-margin-mobile md:p-margin-desktop max-w-7xl mx-auto w-full flex flex-col gap-6 pb-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="border-b border-white/10 pb-6">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shadow-[0_0_10px_rgba(141,255,190,0.8)]"></div>

                <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">
                  PROTOCOL RESOLVED
                </span>

              </div>

              <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface tracking-tight">
                Post-Emergency Debrief
              </h1>

              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Incident review and emergency response summary
              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-data-numeric text-data-numeric text-xs text-on-surface-variant">
                  EVENT #EVT-2023-11-04-A
                </span>

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-data-numeric text-data-numeric text-xs text-on-surface-variant">
                  SECTOR 7G
                </span>

                <span className="px-3 py-1 rounded-full bg-tertiary-fixed-dim/10 border border-tertiary-fixed-dim/20 font-data-numeric text-data-numeric text-xs text-tertiary-fixed-dim">
                  RESOLVED
                </span>

              </div>

            </div>


            {/* HEADER BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-3 lg:items-end">

              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-primary-fixed-dim/50 text-primary-fixed-dim bg-transparent hover:bg-primary-fixed-dim/10 rounded-lg font-label-caps text-label-caps transition-colors"
              >

                <span className="material-symbols-outlined">
                  download
                </span>

                Export Report

              </button>


              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-primary-fixed-dim text-on-primary rounded-lg font-label-caps text-label-caps font-bold hover:bg-primary transition-all"
              >

                <span className="material-symbols-outlined">
                  dashboard
                </span>

                Dashboard

              </Link>

            </div>

          </div>

        </div>


        {/* =====================================================
            INCIDENT OVERVIEW
        ===================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* Duration */}

          <StatCard
            icon="timer"
            label="Event Duration"
            value="04:12:45"
            sub="HH : MM : SS"
          />


          {/* Peak Risk */}

          <StatCard
            icon="warning"
            label="Peak Risk"
            value="CRITICAL"
            sub="98.4%"
            danger
          />


          {/* Actions */}

          <StatCard
            icon="bolt"
            label="Automated Responses"
            value="14"
            sub="ACTIONS"
          />


          {/* Location */}

          <StatCard
            icon="location_on"
            label="Affected Sector"
            value="SECTOR 7G"
            sub="NORTH RIDGE"
          />

        </div>


        {/* =====================================================
            INCIDENT STATUS
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Main status */}

          <div className="lg:col-span-2 glass-panel rounded-xl border border-white/10 p-5">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="font-headline-md text-headline-md">
                  Incident Response Status
                </h2>

                <p className="text-sm text-on-surface-variant mt-1">
                  Final state of emergency response operations
                </p>

              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary-fixed-dim/10 border border-tertiary-fixed-dim/20">

                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>

                <span className="text-xs text-tertiary-fixed-dim font-semibold">
                  STABLE
                </span>

              </div>

            </div>


            {/* Progress */}

            <div className="relative">

              <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10"></div>


              <TimelineItem
                time="14:02:00"
                title="Threat Detected"
                description="Seismic anomaly detected by monitoring sensors."
                status="complete"
                icon="sensors"
              />

              <TimelineItem
                time="14:02:05"
                title="Risk Escalated"
                description="Automated assessment elevated the event to CRITICAL risk."
                status="complete"
                icon="trending_up"
              />

              <TimelineItem
                time="14:03:10"
                title="Emergency Protocol Activated"
                description="Evacuation warnings and response procedures initiated."
                status="complete"
                icon="campaign"
              />

              <TimelineItem
                time="18:15:45"
                title="Stabilization Confirmed"
                description="Ground movement ceased and conditions returned toward baseline."
                status="complete"
                icon="check_circle"
                last
              />

            </div>

          </div>


          {/* =====================================================
              RESPONSE SUMMARY
          ===================================================== */}

          <div className="glass-panel rounded-xl border border-white/10 p-5">

            <div className="flex items-center gap-2 mb-5">

              <span className="material-symbols-outlined text-primary-fixed-dim">
                groups
              </span>

              <h2 className="font-headline-md text-headline-md">
                Response Summary
              </h2>

            </div>


            <div className="space-y-3">

              <ResponseRow
                label="Area Sirens"
                value="ACTIVATED"
                good
              />

              <ResponseRow
                label="Authorities"
                value="NOTIFIED"
                good
              />

              <ResponseRow
                label="Rescue Teams"
                value="DEPLOYED"
                good
              />

              <ResponseRow
                label="Evacuation Routes"
                value="ACTIVE"
                good
              />

              <ResponseRow
                label="Heavy Machinery"
                value="LOCKED"
                good
              />

            </div>


            <div className="mt-5 pt-5 border-t border-white/10">

              <div className="text-xs text-on-surface-variant mb-2">
                RESPONSE COMPLETION
              </div>

              <div className="flex items-end justify-between mb-2">

                <span className="text-2xl font-bold">
                  100%
                </span>

                <span className="text-xs text-tertiary-fixed-dim">
                  ALL ACTIONS COMPLETE
                </span>

              </div>

              <div className="h-2 rounded-full bg-white/5 overflow-hidden">

                <div className="h-full w-full bg-gradient-to-r from-primary-fixed-dim to-tertiary-fixed-dim"></div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            RISK & SYSTEM ANALYTICS
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Risk analytics */}

          <div className="glass-panel rounded-xl border border-white/10 p-5">

            <div className="flex items-center gap-2 mb-5">

              <span className="material-symbols-outlined text-error">
                analytics
              </span>

              <div>

                <h2 className="font-headline-md text-headline-md">
                  Risk Analytics
                </h2>

                <p className="text-xs text-on-surface-variant mt-1">
                  Peak conditions recorded during the incident
                </p>

              </div>

            </div>


            <div className="grid grid-cols-2 gap-3">

              <Metric
                label="Peak Probability"
                value="98.4%"
                danger
              />

              <Metric
                label="Peak Risk Score"
                value="9.8 / 10"
                danger
              />

              <Metric
                label="Sensor Response"
                value="12 ms"
                good
              />

              <Metric
                label="Data Integrity"
                value="99.8%"
                good
              />

            </div>


            <div className="mt-5">

              <div className="flex justify-between text-xs mb-2">

                <span className="text-on-surface-variant">
                  PEAK RISK
                </span>

                <span className="text-error font-semibold">
                  CRITICAL
                </span>

              </div>

              <div className="h-3 bg-white/5 rounded-full overflow-hidden">

                <div className="h-full w-[98.4%] bg-gradient-to-r from-orange-500 to-red-500"></div>

              </div>

            </div>

          </div>


          {/* GIS information */}

          <div className="glass-panel rounded-xl border border-white/10 p-5">

            <div className="flex items-center gap-2 mb-5">

              <span className="material-symbols-outlined text-primary-fixed-dim">
                terrain
              </span>

              <div>

                <h2 className="font-headline-md text-headline-md">
                  Environmental Conditions
                </h2>

                <p className="text-xs text-on-surface-variant mt-1">
                  GIS and sensor observations
                </p>

              </div>

            </div>


            <div className="grid grid-cols-2 gap-3">

              <EnvironmentalMetric
                label="Slope"
                value="42.6°"
              />

              <EnvironmentalMetric
                label="Elevation"
                value="1,842 m"
              />

              <EnvironmentalMetric
                label="Rainfall · 1D"
                value="86.4 mm"
              />

              <EnvironmentalMetric
                label="Rainfall · 7D"
                value="241.8 mm"
              />

              <EnvironmentalMetric
                label="Rainfall · 30D"
                value="487.2 mm"
              />

              <EnvironmentalMetric
                label="Region"
                value="North Ridge"
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            EXECUTION LOG
        ===================================================== */}

        <div className="glass-panel rounded-xl border border-white/10 p-5">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">

            <div>

              <h2 className="font-headline-md text-headline-md">
                Protocol Execution Log
              </h2>

              <p className="text-xs text-on-surface-variant mt-1">
                Chronological record of emergency operations
              </p>

            </div>

            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-on-surface-variant">
              SYSTEM TIME · UTC
            </span>

          </div>


          <div className="grid gap-3">

            <LogItem
              time="14:02:00"
              title="Seismic Anomaly Detected"
              description="Sensor Array Alpha recorded tremor magnitude 4.2."
              type="danger"
            />

            <LogItem
              time="14:02:05"
              title="Risk Level Elevated"
              description="Automated system escalated status based on terrain and rainfall conditions."
              type="warning"
            />

            <LogItem
              time="14:03:10"
              title="Emergency Protocol Initiated"
              description="Emergency response sequence activated. Evacuation warnings broadcast."
              type="primary"
            />

            <LogItem
              time="14:05:22"
              title="Response Units Dispatched"
              description="Emergency response teams assigned to predicted impact zones."
              type="primary"
            />

            <LogItem
              time="18:15:45"
              title="Stabilization Confirmed"
              description="Ground movement ceased. Monitoring system returned to stable state."
              type="success"
            />

          </div>

        </div>


        {/* =====================================================
            MODEL FEEDBACK
        ===================================================== */}

        <div className="glass-panel rounded-xl border border-white/10 p-5">

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

            <div>

              <div className="flex items-center gap-2">

                <span className="material-symbols-outlined text-primary-fixed-dim">
                  psychology
                </span>

                <h2 className="font-headline-md text-headline-md">
                  Model Performance Feedback
                </h2>

              </div>

              <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
                Record observations about the ML prediction to help
                evaluate system performance after the emergency.
              </p>

            </div>


            <span className="px-3 py-1 rounded-full bg-primary-fixed-dim/10 border border-primary-fixed-dim/20 text-xs text-primary-fixed-dim">
              XGBOOST MODEL
            </span>

          </div>


          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add observations about prediction accuracy, response timing, or environmental conditions..."
            className="w-full mt-5 h-28 bg-black/20 border border-white/10 rounded-lg p-4 text-sm text-on-surface placeholder:text-white/30 outline-none focus:border-primary-fixed-dim transition-colors resize-none"
          />


          <div className="flex justify-end mt-3">

            <button
              onClick={handleFeedback}
              disabled={!feedback.trim()}
              className="px-5 py-2.5 rounded-lg bg-primary-fixed-dim text-on-primary font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary transition-all"
            >
              {submitted ? 'Feedback Saved ✓' : 'Submit Feedback'}
            </button>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 text-xs text-on-surface-variant">

          <span>
            Emergency Management System
          </span>

          <span className="font-mono">
            INCIDENT CLOSED · EVT-2023-11-04-A
          </span>

        </div>

      </div>

    </div>
  );
};


// =====================================================
// STAT CARD
// =====================================================

const StatCard = ({
  icon,
  label,
  value,
  sub,
  danger = false,
}) => {

  return (

    <div
      className={
        'glass-panel rounded-xl border p-5 relative overflow-hidden ' +
        (danger
          ? 'border-error/30'
          : 'border-white/10')
      }
    >

      {danger && (
        <div className="absolute inset-0 bg-gradient-to-br from-error/10 to-transparent pointer-events-none"></div>
      )}

      <div className="flex items-center gap-2 relative">

        <span
          className={
            'material-symbols-outlined text-lg ' +
            (danger
              ? 'text-error'
              : 'text-primary-fixed-dim')
          }
        >
          {icon}
        </span>

        <span className="font-label-caps text-label-caps text-on-surface-variant">
          {label}
        </span>

      </div>


      <div className="flex items-end gap-2 mt-5 relative">

        <span
          className={
            'font-data-numeric text-2xl md:text-3xl font-bold ' +
            (danger ? 'text-error' : 'text-on-surface')
          }
        >
          {value}
        </span>

        <span className="text-xs text-on-surface-variant mb-1">
          {sub}
        </span>

      </div>

    </div>

  );
};


// =====================================================
// TIMELINE ITEM
// =====================================================

const TimelineItem = ({
  time,
  title,
  description,
  icon,
  last = false,
}) => {

  return (

    <div className="relative flex gap-4 pb-5">

      <div className="relative z-10 w-8 h-8 rounded-full bg-surface-container-highest border border-tertiary-fixed-dim/40 flex items-center justify-center shrink-0">

        <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm">
          {icon}
        </span>

      </div>


      <div className="flex-1">

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">

          <span className="font-mono text-xs text-primary-fixed-dim">
            {time}
          </span>

          <span className="font-semibold text-sm">
            {title}
          </span>

        </div>

        <p className="text-xs text-on-surface-variant mt-1">
          {description}
        </p>

      </div>

    </div>

  );
};


// =====================================================
// RESPONSE ROW
// =====================================================

const ResponseRow = ({
  label,
  value,
  good = false,
}) => {

  return (

    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">

      <span className="text-sm text-on-surface-variant">
        {label}
      </span>

      <div className="flex items-center gap-2">

        <span
          className={
            'w-1.5 h-1.5 rounded-full ' +
            (good ? 'bg-tertiary-fixed-dim' : 'bg-error')
          }
        ></span>

        <span
          className={
            'text-xs font-semibold ' +
            (good
              ? 'text-tertiary-fixed-dim'
              : 'text-error')
          }
        >
          {value}
        </span>

      </div>

    </div>

  );
};


// =====================================================
// METRIC
// =====================================================

const Metric = ({
  label,
  value,
  danger = false,
  good = false,
}) => {

  return (

    <div className="rounded-lg bg-white/5 border border-white/5 p-4">

      <div className="text-[10px] tracking-widest text-on-surface-variant">
        {label}
      </div>

      <div
        className={
          'font-data-numeric text-xl font-bold mt-2 ' +
          (danger
            ? 'text-error'
            : good
            ? 'text-tertiary-fixed-dim'
            : 'text-on-surface')
        }
      >
        {value}
      </div>

    </div>

  );
};


// =====================================================
// ENVIRONMENTAL METRIC
// =====================================================

const EnvironmentalMetric = ({
  label,
  value,
}) => {

  return (

    <div className="rounded-lg bg-white/5 border border-white/5 p-3">

      <div className="text-[10px] tracking-widest text-on-surface-variant">
        {label}
      </div>

      <div className="font-mono text-sm font-semibold mt-2">
        {value}
      </div>

    </div>

  );
};


// =====================================================
// LOG ITEM
// =====================================================

const LogItem = ({
  time,
  title,
  description,
  type,
}) => {

  const borderClass = {
    danger: 'border-error',
    warning: 'border-secondary-container',
    primary: 'border-primary-fixed-dim',
    success: 'border-tertiary-fixed-dim',
  }[type] || 'border-white/20';


  const timeClass = {
    danger: 'text-error',
    warning: 'text-secondary-container',
    primary: 'text-primary-fixed-dim',
    success: 'text-tertiary-fixed-dim',
  }[type] || 'text-on-surface-variant';


  return (

    <div
      className={
        'flex flex-col sm:flex-row gap-3 sm:gap-5 p-4 rounded-lg bg-white/[0.03] border-l-2 ' +
        borderClass
      }
    >

      <span className={
        'font-mono text-xs w-20 shrink-0 ' +
        timeClass
      }>
        {time}
      </span>


      <div>

        <p className="font-semibold text-sm">
          {title}
        </p>

        <p className="text-xs text-on-surface-variant mt-1">
          {description}
        </p>

      </div>

    </div>

  );
};


export default EmergencySummaryPage;