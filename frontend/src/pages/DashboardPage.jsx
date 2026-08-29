import React from 'react';
import { Link } from 'react-router-dom';
import {
  Map,
  BrainCircuit,
  BellRing,
  FileWarning,
  ShieldCheck,
  ArrowRight,
  Activity,
  Mountain,
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background text-on-surface overflow-y-auto">
      {/* Hero Section */}
      <section className="relative px-6 md:px-10 lg:px-14 pt-10 pb-12">
        {/* Background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold tracking-wide mb-6">
            <Activity size={14} />
            AI-POWERED LANDSLIDE EARLY WARNING SYSTEM
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Protecting the{' '}
              <span className="text-primary">
                North Eastern Region
              </span>{' '}
              from landslide risk.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-on-surface-variant max-w-3xl leading-relaxed">
              An integrated GIS and Machine Learning platform for monitoring
              landslide-prone areas, assessing location-based risk, receiving
              incident reports, and supporting faster emergency response
              across Northeast India.
            </p>

            {/* Primary actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/monitoring"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-semibold hover:opacity-90 transition-all shadow-lg"
              >
                Open Risk Monitoring
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/report"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 bg-white/5 text-on-surface font-semibold hover:bg-white/10 transition-all"
              >
                <FileWarning size={18} />
                Report an Incident
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What the system does */}
      <section className="px-6 md:px-10 lg:px-14 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              System Overview
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              From terrain data to actionable warnings
            </h2>

            <p className="text-on-surface-variant mt-2 max-w-2xl">
              The platform combines geospatial intelligence, machine learning,
              field reports, and emergency protocols into a single monitoring
              workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* GIS */}
            <div className="glass-panel rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Map size={22} />
              </div>

              <h3 className="font-bold text-lg">
                GIS Risk Mapping
              </h3>

              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Visualize landslide susceptibility across the NER using
                geospatial terrain and risk data.
              </p>
            </div>

            {/* ML */}
            <div className="glass-panel rounded-xl p-5 border border-white/10 hover:border-secondary/30 transition-all">
              <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <BrainCircuit size={22} />
              </div>

              <h3 className="font-bold text-lg">
                ML Risk Prediction
              </h3>

              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Assess a specific location and estimate its landslide risk
                probability using the prediction model.
              </p>
            </div>

            {/* Alerts */}
            <div className="glass-panel rounded-xl p-5 border border-white/10 hover:border-error/30 transition-all">
              <div className="w-11 h-11 rounded-lg bg-error/10 flex items-center justify-center text-error mb-4">
                <BellRing size={22} />
              </div>

              <h3 className="font-bold text-lg">
                Critical Alerts
              </h3>

              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Identify high and critical-risk situations and surface them
                for administrative attention.
              </p>
            </div>

            {/* Emergency */}
            <div className="glass-panel rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck size={22} />
              </div>

              <h3 className="font-bold text-lg">
                Emergency Response
              </h3>

              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Support incident reporting, response coordination, and
                emergency protocols when risk becomes critical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-10 lg:px-14 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Mountain size={20} />
                  <span className="text-xs font-semibold tracking-widest uppercase">
                    How it works
                  </span>
                </div>

                <h2 className="text-2xl font-bold">
                  A unified early-warning workflow
                </h2>

                <p className="text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
                  Administrators can inspect regional risk, assess individual
                  coordinates, review incoming incidents, and respond to
                  critical situations from one platform.
                </p>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-black/10 border border-white/5">
                  <span className="text-primary font-bold">01</span>
                  <span className="text-sm">Monitor GIS risk zones</span>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-black/10 border border-white/5">
                  <span className="text-primary font-bold">02</span>
                  <span className="text-sm">Assess coordinates with ML</span>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-black/10 border border-white/5">
                  <span className="text-primary font-bold">03</span>
                  <span className="text-sm">Receive incident reports</span>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-black/10 border border-white/5">
                  <span className="text-primary font-bold">04</span>
                  <span className="text-sm">Trigger appropriate response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer information */}
      <section className="px-6 md:px-10 lg:px-14 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-3 text-xs text-on-surface-variant">
          <span>
            AI-Based Early Warning & Landslide Risk Monitoring System
          </span>

          <span>
            North Eastern Region of India • SIH 2026
          </span>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;