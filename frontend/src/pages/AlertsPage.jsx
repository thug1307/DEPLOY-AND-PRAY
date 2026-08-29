import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  MapPin,
  Clock,
  Activity,
  Eye,
  XCircle,
} from 'lucide-react';

const AlertsPage = () => {
  // =====================================================
  // SAMPLE ALERT DATA
  // =====================================================

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      location: 'Tawang, Arunachal Pradesh',
      category: 'CRITICAL',
      probability: 0.984,
      score: 9.8,
      time: '14:32:18',
      date: '15 Aug 2024',
      description:
        'Extremely high landslide probability detected based on terrain and rainfall conditions.',
      status: 'ACTIVE',
    },
    {
      id: 2,
      location: 'Aizawl, Mizoram',
      category: 'VERY HIGH',
      probability: 0.921,
      score: 9.1,
      time: '14:18:42',
      date: '15 Aug 2024',
      description:
        'High slope instability detected with significant recent rainfall.',
      status: 'ACTIVE',
    },
    {
      id: 3,
      location: 'Gangtok, Sikkim',
      category: 'HIGH',
      probability: 0.846,
      score: 8.3,
      time: '13:56:09',
      date: '15 Aug 2024',
      description:
        'Elevated landslide risk detected across the monitored region.',
      status: 'ACTIVE',
    },
    {
      id: 4,
      location: 'Kohima, Nagaland',
      category: 'MEDIUM',
      probability: 0.674,
      score: 6.5,
      time: '13:21:33',
      date: '15 Aug 2024',
      description:
        'Moderate risk conditions detected. Continued monitoring recommended.',
      status: 'ACKNOWLEDGED',
    },
    {
      id: 5,
      location: 'Shillong, Meghalaya',
      category: 'HIGH',
      probability: 0.812,
      score: 7.9,
      time: '12:48:16',
      date: '15 Aug 2024',
      description:
        'Heavy rainfall combined with steep terrain has increased risk.',
      status: 'RESOLVED',
    },
  ]);

  // =====================================================
  // FILTER
  // =====================================================

  const [filter, setFilter] = useState('ALL');

  // =====================================================
  // ACKNOWLEDGE ALERT
  // =====================================================

  const acknowledgeAlert = (id) => {
    setAlerts((previous) =>
      previous.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: 'ACKNOWLEDGED',
            }
          : alert
      )
    );
  };

  // =====================================================
  // RESOLVE ALERT
  // =====================================================

  const resolveAlert = (id) => {
    setAlerts((previous) =>
      previous.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: 'RESOLVED',
            }
          : alert
      )
    );
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
  // RISK BACKGROUND
  // =====================================================

  const getRiskBackground = (category) => {
    const value = String(category || '').toLowerCase();

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

    return 'border-green-400/30 bg-green-400/5';
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusColor = (status) => {
    if (status === 'ACTIVE') {
      return 'text-red-400';
    }

    if (status === 'ACKNOWLEDGED') {
      return 'text-yellow-400';
    }

    return 'text-green-400';
  };

  // =====================================================
  // FILTERED ALERTS
  // =====================================================

  const filteredAlerts =
    filter === 'ALL'
      ? alerts
      : alerts.filter((alert) => alert.status === filter);

  // =====================================================
  // STATISTICS
  // =====================================================

  const activeCount = alerts.filter(
    (alert) => alert.status === 'ACTIVE'
  ).length;

  const criticalCount = alerts.filter(
    (alert) => alert.category === 'CRITICAL'
  ).length;

  const acknowledgedCount = alerts.filter(
    (alert) => alert.status === 'ACKNOWLEDGED'
  ).length;

  const resolvedCount = alerts.filter(
    (alert) => alert.status === 'RESOLVED'
  ).length;

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-background text-on-surface p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6">

          <div className="flex items-center gap-2 text-red-400 text-xs font-semibold tracking-widest uppercase mb-2">
            <ShieldAlert size={17} />
            Alert Management
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Risk Alerts
              </h1>

              <p className="text-sm text-on-surface-variant mt-2 max-w-2xl">
                Monitor, acknowledge and resolve landslide
                risk alerts generated by the GIS + ML system.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ALERT SYSTEM ONLINE
            </div>

          </div>
        </div>

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

          <StatCard
            icon={<AlertTriangle size={19} />}
            label="Active Alerts"
            value={activeCount}
            description="Require attention"
            valueClass="text-red-400"
          />

          <StatCard
            icon={<ShieldAlert size={19} />}
            label="Critical Alerts"
            value={criticalCount}
            description="Highest priority"
            valueClass="text-red-500"
          />

          <StatCard
            icon={<Eye size={19} />}
            label="Acknowledged"
            value={acknowledgedCount}
            description="Seen by operator"
            valueClass="text-yellow-400"
          />

          <StatCard
            icon={<CheckCircle size={19} />}
            label="Resolved"
            value={resolvedCount}
            description="No longer active"
            valueClass="text-green-400"
          />

        </div>

        {/* =================================================
            MAIN ALERT PANEL
        ================================================= */}

        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">

          {/* FILTER BAR */}

          <div className="p-4 border-b border-white/10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h2 className="font-bold text-lg">
                  Alert Feed
                </h2>

                <p className="text-xs text-on-surface-variant mt-1">
                  Latest detected risk events
                </p>
              </div>

              <div className="flex flex-wrap gap-2">

                {['ALL', 'ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'].map(
                  (option) => (
                    <button
                      key={option}
                      onClick={() => setFilter(option)}
                      className={
                        filter === option
                          ? 'px-3 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold'
                          : 'px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors'
                      }
                    >
                      {option}
                    </button>
                  )
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              ALERT LIST
          ================================================= */}

          <div className="p-4 flex flex-col gap-3">

            {filteredAlerts.length === 0 ? (

              <div className="py-16 text-center">

                <CheckCircle
                  size={42}
                  className="mx-auto text-green-400/60"
                />

                <h3 className="font-bold mt-3">
                  No alerts found
                </h3>

                <p className="text-sm text-on-surface-variant mt-1">
                  There are no alerts matching this filter.
                </p>

              </div>

            ) : (

              filteredAlerts.map((alert) => (

                <div
                  key={alert.id}
                  className={
                    'rounded-xl border p-4 transition-all ' +
                    getRiskBackground(alert.category)
                  }
                >

                  {/* TOP ROW */}

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                    <div className="flex gap-3">

                      {/* ICON */}

                      <div className="shrink-0 p-2.5 rounded-lg bg-black/20">

                        <AlertTriangle
                          size={21}
                          className={getRiskColor(
                            alert.category
                          )}
                        />

                      </div>

                      {/* INFORMATION */}

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-bold text-lg">
                            {alert.location}
                          </h3>

                          <span
                            className={
                              'text-[10px] font-bold px-2 py-1 rounded border ' +
                              getRiskColor(alert.category)
                            }
                          >
                            {alert.category}
                          </span>

                        </div>

                        <p className="text-sm text-on-surface-variant mt-1">
                          {alert.description}
                        </p>

                      </div>

                    </div>

                    {/* STATUS */}

                    <div className="flex items-center gap-2">

                      {alert.status === 'ACTIVE' && (
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      )}

                      {alert.status === 'ACKNOWLEDGED' && (
                        <Eye size={14} className="text-yellow-400" />
                      )}

                      {alert.status === 'RESOLVED' && (
                        <CheckCircle
                          size={14}
                          className="text-green-400"
                        />
                      )}

                      <span
                        className={
                          'text-xs font-bold tracking-widest ' +
                          getStatusColor(alert.status)
                        }
                      >
                        {alert.status}
                      </span>

                    </div>

                  </div>

                  {/* =================================================
                      DATA ROW
                  ================================================= */}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">

                    <AlertData
                      label="ML Probability"
                      value={`${(
                        alert.probability * 100
                      ).toFixed(1)}%`}
                    />

                    <AlertData
                      label="Risk Score"
                      value={`${alert.score.toFixed(1)} / 10`}
                    />

                    <AlertData
                      label="Detected"
                      value={alert.time}
                      icon={<Clock size={13} />}
                    />

                    <AlertData
                      label="Date"
                      value={alert.date}
                    />

                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/10">

                    <Link
                      to="/monitoring"
                      className="flex items-center gap-2 text-xs text-primary hover:text-white transition-colors"
                    >
                      <MapPin size={15} />
                      View on Map
                    </Link>

                    <div className="flex gap-2">

                      {alert.status === 'ACTIVE' && (
                        <>
                          <button
                            onClick={() =>
                              acknowledgeAlert(alert.id)
                            }
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold hover:bg-yellow-500/20 transition-colors"
                          >
                            <Eye size={14} />
                            Acknowledge
                          </button>

                          <button
                            onClick={() =>
                              resolveAlert(alert.id)
                            }
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-colors"
                          >
                            <CheckCircle size={14} />
                            Resolve
                          </button>
                        </>
                      )}

                      {alert.status === 'ACKNOWLEDGED' && (
                        <button
                          onClick={() =>
                            resolveAlert(alert.id)
                          }
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold hover:bg-green-500/20 transition-colors"
                        >
                          <CheckCircle size={14} />
                          Resolve
                        </button>
                      )}

                      {alert.status === 'RESOLVED' && (
                        <span className="flex items-center gap-2 text-xs text-green-400">
                          <CheckCircle size={14} />
                          Alert resolved
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

        {/* =================================================
            FOOTER INFORMATION
        ================================================= */}

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[10px] text-white/40">

          <div className="flex items-center gap-2">
            <Activity size={13} />
            GIS + XGBoost Risk Detection System
          </div>

          <div>
            Alerts are generated from monitored risk zones
          </div>

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
  description,
  valueClass,
}) => {
  return (
    <div className="glass-panel rounded-xl border border-white/10 p-5">

      <div className="flex items-center gap-2 text-on-surface-variant">
        {icon}

        <span className="text-xs font-bold tracking-widest">
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mt-4">

        <span className={`text-3xl font-black ${valueClass}`}>
          {value}
        </span>

        <span className="text-[10px] text-white/40">
          ALERTS
        </span>

      </div>

      <p className="text-xs text-on-surface-variant mt-1">
        {description}
      </p>

    </div>
  );
};

// =====================================================
// ALERT DATA
// =====================================================

const AlertData = ({
  label,
  value,
  icon,
}) => {
  return (
    <div className="rounded-lg bg-black/20 border border-white/5 p-3">

      <div className="flex items-center gap-1 text-[10px] text-on-surface-variant uppercase tracking-wider">
        {icon}
        {label}
      </div>

      <div className="font-mono font-bold text-sm mt-1">
        {value}
      </div>

    </div>
  );
};

export default AlertsPage;