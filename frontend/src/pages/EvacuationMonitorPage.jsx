import React from "react";
import { Link } from "react-router-dom";

const EvacuationMonitorPage = () => {
  return (
    <div className="flex-1 min-h-full overflow-y-auto bg-[#080808] text-white">
      <div className="max-w-[1500px] mx-auto p-4 md:p-6 lg:p-8">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="material-symbols-outlined text-[#00d9ff]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                emergency
              </span>

              <span className="text-xs font-bold tracking-[0.2em] text-[#00d9ff] uppercase">
                Emergency Command Center
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Evacuation Monitor
            </h1>

            <p className="text-sm md:text-base text-gray-400 mt-2">
              Real-time monitoring of affected areas, evacuation routes and
              emergency response operations.
            </p>
          </div>

          {/* Live Status */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#00d9ff]/20 bg-[#0d1416]">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-[#00e89a]" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00e89a] animate-ping opacity-60" />
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest text-[#00e89a]">
                SYSTEM LIVE
              </p>
              <p className="text-xs text-gray-500">
                Monitoring active
              </p>
            </div>
          </div>
        </div>


        {/* =========================================================
            ACTIVE INCIDENT BANNER
        ========================================================= */}
        <div className="border border-red-500/30 bg-red-950/20 rounded-xl p-4 md:p-5 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 shrink-0 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-red-400"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-bold text-lg">
                    Active Emergency Event
                  </h2>

                  <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400">
                    CRITICAL
                  </span>
                </div>

                <p className="text-sm text-gray-400 mt-1">
                  Severe slope instability detected in the monitored region.
                </p>

                <p className="text-xs text-gray-600 mt-2 font-mono">
                  EVENT ID: EVT-2026-08-29-01
                </p>
              </div>

            </div>

            <div className="text-left md:text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Last Updated
              </p>

              <p className="font-mono text-sm text-[#00d9ff] mt-1">
                05:20:14 IST
              </p>
            </div>

          </div>
        </div>


        {/* =========================================================
            TOP STAT CARDS
        ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* At Risk */}
          <div className="rounded-xl border border-orange-500/20 bg-[#101010] p-5">

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gray-500">
                At Risk
              </span>

              <span className="material-symbols-outlined text-orange-400">
                warning
              </span>
            </div>

            <div className="mt-4">
              <p className="text-3xl md:text-4xl font-bold text-orange-300">
                1,240
              </p>

              <p className="text-xs text-orange-400 mt-1">
                +12% / hr
              </p>
            </div>
          </div>


          {/* Safe */}
          <div className="rounded-xl border border-[#00e89a]/20 bg-[#101010] p-5">

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gray-500">
                Confirmed Safe
              </span>

              <span className="material-symbols-outlined text-[#00e89a]">
                verified_user
              </span>
            </div>

            <div className="mt-4">
              <p className="text-3xl md:text-4xl font-bold text-[#00e89a]">
                4,892
              </p>

              <p className="text-xs text-[#00e89a] mt-1">
                Verified
              </p>
            </div>
          </div>


          {/* Routes */}
          <div className="rounded-xl border border-[#00d9ff]/20 bg-[#101010] p-5">

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gray-500">
                Evacuation Routes
              </span>

              <span className="material-symbols-outlined text-[#00d9ff]">
                route
              </span>
            </div>

            <div className="mt-4">
              <p className="text-3xl md:text-4xl font-bold">
                08
              </p>

              <p className="text-xs text-[#00d9ff] mt-1">
                6 operational
              </p>
            </div>
          </div>


          {/* Response Teams */}
          <div className="rounded-xl border border-purple-500/20 bg-[#101010] p-5">

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-gray-500">
                Response Teams
              </span>

              <span className="material-symbols-outlined text-purple-400">
                groups
              </span>
            </div>

            <div className="mt-4">
              <p className="text-3xl md:text-4xl font-bold">
                12
              </p>

              <p className="text-xs text-purple-400 mt-1">
                9 deployed
              </p>
            </div>
          </div>

        </div>


        {/* =========================================================
            MAIN GRID
        ========================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* =======================================================
              MAP / AFFECTED AREA PLACEHOLDER
          ======================================================= */}
          <section className="xl:col-span-2 rounded-xl border border-white/10 bg-[#101010] overflow-hidden">

            <div className="flex items-center justify-between p-4 border-b border-white/10">

              <div>
                <h2 className="font-bold text-lg">
                  Affected Area Overview
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Live emergency zone monitoring
                </p>
              </div>

              <div className="flex items-center gap-2">

                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Critical
                </span>

                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  High
                </span>

                <span className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  Medium
                </span>

              </div>
            </div>


            {/* Temporary map area */}
            <div className="h-[380px] md:h-[480px] flex items-center justify-center bg-[#080808] relative overflow-hidden">

              {/* Grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative z-10 text-center">

                <div className="w-20 h-20 mx-auto rounded-full border border-[#00d9ff]/30 bg-[#00d9ff]/5 flex items-center justify-center">

                  <span className="material-symbols-outlined text-4xl text-[#00d9ff]">
                    map
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5">
                  India Risk Map
                </h3>

                <p className="text-sm text-gray-500 mt-2 max-w-sm">
                  Geographic risk visualization will appear here.
                  Risk zones and affected areas will be connected to the
                  monitoring data.
                </p>

                <div className="mt-5 flex justify-center gap-3">

                  <div className="px-3 py-2 rounded border border-red-500/20 bg-red-500/5">
                    <p className="text-xs text-red-400">
                      03 Critical Zones
                    </p>
                  </div>

                  <div className="px-3 py-2 rounded border border-orange-500/20 bg-orange-500/5">
                    <p className="text-xs text-orange-400">
                      07 High Risk
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </section>


          {/* =======================================================
              RIGHT SIDE
          ======================================================= */}
          <section className="flex flex-col gap-5">


            {/* Response Team */}
            <div className="rounded-xl border border-white/10 bg-[#101010] p-5">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="font-bold">
                    Response Teams
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Current deployment status
                  </p>
                </div>

                <span className="material-symbols-outlined text-gray-500">
                  groups
                </span>

              </div>


              {/* Team Alpha */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-2">

                <div className="flex items-center gap-3">

                  <div className="w-2 h-2 rounded-full bg-[#00e89a]" />

                  <div>
                    <p className="text-sm font-semibold">
                      Unit Alpha
                    </p>

                    <p className="text-xs text-gray-500">
                      Sector 7
                    </p>
                  </div>

                </div>

                <span className="text-xs font-bold text-[#00e89a]">
                  EN ROUTE
                </span>

              </div>


              {/* Team Bravo */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5 mb-2">

                <div className="flex items-center gap-3">

                  <div className="w-2 h-2 rounded-full bg-orange-400" />

                  <div>
                    <p className="text-sm font-semibold">
                      Unit Bravo
                    </p>

                    <p className="text-xs text-gray-500">
                      Sector 4
                    </p>
                  </div>

                </div>

                <span className="text-xs font-bold text-orange-400">
                  DELAYED
                </span>

              </div>


              {/* Team Charlie */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">

                <div className="flex items-center gap-3">

                  <div className="w-2 h-2 rounded-full bg-[#00d9ff]" />

                  <div>
                    <p className="text-sm font-semibold">
                      Unit Charlie
                    </p>

                    <p className="text-xs text-gray-500">
                      Sector 9
                    </p>
                  </div>

                </div>

                <span className="text-xs font-bold text-[#00d9ff]">
                  STANDBY
                </span>

              </div>

            </div>


            {/* =====================================================
                EVACUATION TIMELINE
            ===================================================== */}
            <div className="rounded-xl border border-white/10 bg-[#101010] p-5 flex-1">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h2 className="font-bold">
                    Evacuation Timeline
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Emergency response progression
                  </p>
                </div>

                <span className="material-symbols-outlined text-[#00d9ff]">
                  timeline
                </span>

              </div>


              <div className="relative">

                {/* Vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10" />


                {/* Event 1 */}
                <div className="relative flex gap-4 pb-6">

                  <div className="relative z-10 w-4 h-4 rounded-full bg-[#00d9ff] border-4 border-[#101010]" />

                  <div>
                    <p className="text-xs font-mono text-[#00d9ff]">
                      14:30 HRS
                    </p>

                    <p className="font-semibold text-sm mt-1">
                      Emergency Detected
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      High-risk slope instability detected.
                    </p>
                  </div>

                </div>


                {/* Event 2 */}
                <div className="relative flex gap-4 pb-6">

                  <div className="relative z-10 w-4 h-4 rounded-full bg-orange-400 border-4 border-[#101010]" />

                  <div>
                    <p className="text-xs font-mono text-orange-400">
                      14:42 HRS
                    </p>

                    <p className="font-semibold text-sm mt-1">
                      Evacuation Order Issued
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Emergency evacuation initiated.
                    </p>
                  </div>

                </div>


                {/* Event 3 */}
                <div className="relative flex gap-4">

                  <div className="relative z-10 w-4 h-4 rounded-full border border-gray-600 bg-[#101010]" />

                  <div>
                    <p className="text-xs font-mono text-gray-600">
                      EST. 18:00 HRS
                    </p>

                    <p className="font-semibold text-sm text-gray-500 mt-1">
                      Expected Clearance
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      Personnel expected to clear affected sectors.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>


        {/* =========================================================
            DIRECT ACTIONS
        ========================================================= */}
        <div className="mt-5 rounded-xl border border-white/10 bg-[#101010] p-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="font-bold">
                Emergency Actions
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Execute or review emergency response operations.
              </p>
            </div>


            <div className="flex flex-col sm:flex-row gap-3">

              <button className="px-5 py-3 rounded-lg border border-orange-500/30 bg-orange-500/5 text-orange-300 text-sm font-semibold hover:bg-orange-500/10 transition">
                <span className="material-symbols-outlined text-sm align-middle mr-2">
                  campaign
                </span>
                Broadcast Alert
              </button>


              <button className="px-5 py-3 rounded-lg border border-[#00d9ff]/30 bg-[#00d9ff]/5 text-[#00d9ff] text-sm font-semibold hover:bg-[#00d9ff]/10 transition">
                <span className="material-symbols-outlined text-sm align-middle mr-2">
                  route
                </span>
                Manage Routes
              </button>


              <Link
                to="/emergency/summary"
                className="px-5 py-3 rounded-lg bg-[#00d9ff] text-black text-sm font-bold text-center hover:bg-[#49e4ff] transition"
              >
                View Emergency Summary
              </Link>

            </div>

          </div>

        </div>


        {/* =========================================================
            FOOTER STATUS
        ========================================================= */}
        <div className="flex flex-col md:flex-row justify-between gap-2 mt-5 px-1">

          <p className="text-[11px] text-gray-600 font-mono">
            LANDSLIDEGUARD COMMAND CENTER v4.2
          </p>

          <p className="text-[11px] text-gray-600 font-mono">
            DATA STREAM: ACTIVE • LOCATION SERVICES: ONLINE
          </p>

        </div>

      </div>
    </div>
  );
};

export default EvacuationMonitorPage;