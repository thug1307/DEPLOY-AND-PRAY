import React from "react";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  ShieldAlert,
  Map,
  Brain,
  Server,
  ChevronDown,
} from "lucide-react";

const SupportPage = () => {
  const faqs = [
    {
      question: "How does LandslideGuard calculate risk?",
      answer:
        "The system combines GIS-derived factors such as elevation, slope and rainfall with the XGBoost machine-learning model to generate a landslide risk assessment.",
    },
    {
      question: "How do I report a hazard?",
      answer:
        "Open Reports from the navigation menu, enter the hazard information, provide the location and submit the report for automated risk analysis.",
    },
    {
      question: "How does the map work?",
      answer:
        "The Map View displays geographic information relevant to landslide monitoring and helps visualize areas associated with potential hazards.",
    },
    {
      question: "What should I do during a critical alert?",
      answer:
        "Follow the Emergency Protocol available in the navigation panel and follow the recommended evacuation and safety procedures.",
    },
    {
      question: "What technologies are used?",
      answer:
        "LandslideGuard uses React for the frontend, FastAPI for the backend, XGBoost for machine learning and QGIS for GIS processing and mapping.",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#0A0A0A] text-white p-5 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-[0.2em] uppercase">
            <HelpCircle size={16} />
            Support Center
          </div>

          <h1 className="text-3xl font-bold mt-2">
            How can we help?
          </h1>

          <p className="text-sm text-white/50 mt-2 max-w-2xl">
            Find answers to common questions about LandslideGuard,
            hazard reporting, monitoring and emergency procedures.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="rounded-2xl border border-white/10 bg-[#111718] p-5 hover:border-cyan-400/30 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
              <MessageCircle size={20} className="text-cyan-400" />
            </div>

            <h3 className="font-semibold">
              System Help
            </h3>

            <p className="text-xs text-white/40 mt-2">
              Learn how to use the monitoring and reporting
              features of LandslideGuard.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111718] p-5 hover:border-cyan-400/30 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
              <Mail size={20} className="text-cyan-400" />
            </div>

            <h3 className="font-semibold">
              Contact Team
            </h3>

            <p className="text-xs text-white/40 mt-2">
              For technical issues or project-related
              questions, contact the LandslideGuard team.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111718] p-5 hover:border-red-400/30 transition">
            <div className="w-10 h-10 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center mb-4">
              <ShieldAlert size={20} className="text-red-400" />
            </div>

            <h3 className="font-semibold">
              Emergency
            </h3>

            <p className="text-xs text-white/40 mt-2">
              Use the Emergency Protocol when an immediate
              hazard response is required.
            </p>
          </div>

        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-white/10 bg-[#111718] overflow-hidden">

          <div className="px-6 py-5 border-b border-white/10">
            <h2 className="font-semibold text-lg">
              Frequently Asked Questions
            </h2>

            <p className="text-xs text-white/40 mt-1">
              Common questions about the system.
            </p>
          </div>

          <div className="divide-y divide-white/10">

            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group px-6 py-5"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-sm font-medium">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={18}
                    className="text-white/40 group-open:rotate-180 transition-transform"
                  />
                </summary>

                <p className="text-xs text-white/45 mt-3 leading-relaxed max-w-3xl">
                  {faq.answer}
                </p>
              </details>
            ))}

          </div>
        </div>

        {/* Technology */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111718] p-6">

          <h2 className="font-semibold mb-5">
            System Architecture
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-black/20 rounded-xl p-4">
              <Brain className="text-cyan-400 mb-3" size={20} />
              <div className="text-sm font-semibold">
                XGBoost
              </div>
              <div className="text-[11px] text-white/35 mt-1">
                Risk Prediction
              </div>
            </div>

            <div className="bg-black/20 rounded-xl p-4">
              <Server className="text-cyan-400 mb-3" size={20} />
              <div className="text-sm font-semibold">
                FastAPI
              </div>
              <div className="text-[11px] text-white/35 mt-1">
                Backend API
              </div>
            </div>

            <div className="bg-black/20 rounded-xl p-4">
              <Map className="text-cyan-400 mb-3" size={20} />
              <div className="text-sm font-semibold">
                QGIS
              </div>
              <div className="text-[11px] text-white/35 mt-1">
                GIS Processing
              </div>
            </div>

            <div className="bg-black/20 rounded-xl p-4">
              <ShieldAlert className="text-cyan-400 mb-3" size={20} />
              <div className="text-sm font-semibold">
                React
              </div>
              <div className="text-[11px] text-white/35 mt-1">
                User Interface
              </div>
            </div>

          </div>
        </div>

        <div className="text-center text-[11px] text-white/20 mt-6">
          LandslideGuard • Command Center v4.2
        </div>

      </div>
    </div>
  );
};

export default SupportPage;