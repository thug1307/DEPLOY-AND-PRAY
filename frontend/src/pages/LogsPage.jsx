import React from "react";
import {
  Terminal,
  CheckCircle,
  AlertTriangle,
  Info,
  Activity,
  Database,
  Brain,
  Map,
} from "lucide-react";

const LogsPage = () => {

  const logs = [
    {
      time: "06:18:42",
      type: "INFO",
      message: "LandslideGuard monitoring service initialized.",
      icon: Activity,
    },
    {
      time: "06:18:38",
      type: "SUCCESS",
      message: "GIS data layer loaded successfully.",
      icon: Map,
    },
    {
      time: "06:17:54",
      type: "INFO",
      message: "XGBoost risk prediction model loaded.",
      icon: Brain,
    },
    {
      time: "06:17:41",
      type: "SUCCESS",
      message: "FastAPI backend connection established.",
      icon: Database,
    },
    {
      time: "06:16:29",
      type: "INFO",
      message: "Monitoring dashboard synchronized.",
      icon: Activity,
    },
    {
      time: "06:15:17",
      type: "WARNING",
      message: "Historical rainfall dataset contains limited 2024 coverage.",
      icon: AlertTriangle,
    },
    {
      time: "06:14:52",
      type: "INFO",
      message: "Emergency protocol module ready.",
      icon: Activity,
    },
  ];

  const getTypeStyle = (type) => {
    switch (type) {
      case "SUCCESS":
        return "text-green-400 bg-green-400/10 border-green-400/20";

      case "WARNING":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";

      case "ERROR":
        return "text-red-400 bg-red-400/10 border-red-400/20";

      default:
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0A0A0A] text-white p-5 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">
            <Terminal size={16} />
            System Logs
          </div>

          <h1 className="text-3xl font-bold mt-2">
            System Activity
          </h1>

          <p className="text-sm text-white/50 mt-2 max-w-2xl">
            Monitor application activity, system events,
            model operations and service status.
          </p>

        </div>

        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="rounded-2xl border border-green-400/20 bg-green-400/5 p-5">
            <div className="flex items-center gap-3">
              <CheckCircle
                size={20}
                className="text-green-400"
              />

              <div>
                <div className="text-sm font-semibold">
                  System Online
                </div>

                <div className="text-[11px] text-white/35 mt-1">
                  All major services operational
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5">
            <div className="flex items-center gap-3">
              <Activity
                size={20}
                className="text-cyan-400"
              />

              <div>
                <div className="text-sm font-semibold">
                  Monitoring Active
                </div>

                <div className="text-[11px] text-white/35 mt-1">
                  Real-time monitoring available
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111718] p-5">
            <div className="flex items-center gap-3">
              <Terminal
                size={20}
                className="text-white/60"
              />

              <div>
                <div className="text-sm font-semibold">
                  Log Stream
                </div>

                <div className="text-[11px] text-white/35 mt-1">
                  Latest system events
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Logs */}
        <div className="rounded-2xl border border-white/10 bg-[#111718] overflow-hidden">

          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">

            <div>
              <h2 className="font-semibold">
                Recent Activity
              </h2>

              <p className="text-xs text-white/35 mt-1">
                Latest events recorded by the system.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </div>

          </div>

          <div className="divide-y divide-white/5">

            {logs.map((log, index) => {

              const Icon = log.icon;

              return (
                <div
                  key={index}
                  className="px-6 py-4 hover:bg-white/[0.02] transition"
                >

                  <div className="flex items-start gap-4">

                    <div className="text-[11px] text-white/25 font-mono pt-1 w-20 shrink-0">
                      {log.time}
                    </div>

                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${getTypeStyle(
                        log.type
                      )}`}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="flex-1">

                      <div className="flex items-center gap-2">

                        <span
                          className={`text-[10px] font-bold tracking-wider ${getTypeStyle(
                            log.type
                          )
                            .split(" ")
                            .find((x) =>
                              x.startsWith("text-")
                            )}`}
                        >
                          {log.type}
                        </span>

                      </div>

                      <p className="text-sm text-white/65 mt-1">
                        {log.message}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-4 flex items-center gap-3">

          <Info
            size={16}
            className="text-white/30"
          />

          <p className="text-[11px] text-white/30">
            Logs currently display frontend system activity.
            Backend logging can be connected later through FastAPI.
          </p>

        </div>

      </div>
    </div>
  );
};

export default LogsPage;