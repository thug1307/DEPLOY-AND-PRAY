import React from 'react';
import { Link } from 'react-router-dom';

const EmergencySummaryPage = () => {
  return (
    <div className="flex-1 overflow-y-auto w-full">
{/* Mobile Top Nav */}

{/* Content Canvas */}
<div className="p-margin-mobile md:p-margin-desktop max-w-7xl mx-auto w-full flex-grow flex flex-col gap-8">
{/* Page Header */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-tertiary-fixed-dim" data-icon="check_circle">check_circle</span>
<span className="font-label-caps text-label-caps text-tertiary-fixed-dim">Protocol Resolved</span>
</div>
<h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">Post-Emergency Debrief</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Event ID: #EVT-2023-11-04-A • Sector 7G</p>
</div>
<div className="flex gap-4 w-full md:w-auto">
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-primary-fixed-dim text-primary-fixed-dim bg-transparent hover:bg-primary-fixed-dim/10 rounded font-label-caps text-label-caps transition-colors">
<span className="material-symbols-outlined" data-icon="download">download</span>
                        Export Report
                    </button>
<Link to="/" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary-fixed-dim text-on-primary rounded font-label-caps text-label-caps font-bold hover:bg-primary shadow-[0_0_15px_rgba(0,218,248,0.3)] transition-all">
<span className="material-symbols-outlined" data-icon="restart_alt">restart_alt</span>
                        Reset to Dashboard
                    </Link>
</div>
</div>
{/* Bento Grid Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{/* Stat Card 1 */}
<div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-between h-40">
<span className="font-label-caps text-label-caps text-on-surface-variant">Total Event Duration</span>
<div className="flex items-baseline gap-2">
<span className="font-data-numeric text-[32px] font-bold text-on-surface">04:12:45</span>
<span className="font-label-caps text-label-caps text-primary-fixed-dim">HH:MM:SS</span>
</div>
</div>
{/* Stat Card 2 */}
<div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-between h-40 relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-b from-error-container/20 to-transparent pointer-events-none"></div>
<span className="font-label-caps text-label-caps text-on-surface-variant relative z-10">Peak Risk Level</span>
<div className="flex items-baseline gap-2 relative z-10">
<span className="font-data-numeric text-[32px] font-bold text-error">CRITICAL</span>
<span className="font-label-caps text-label-caps text-on-surface-variant">(98.4%)</span>
</div>
</div>
{/* Stat Card 3 */}
<div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col justify-between h-40">
<span className="font-label-caps text-label-caps text-on-surface-variant">Automated Responses Triggered</span>
<div className="flex items-baseline gap-2">
<span className="font-data-numeric text-[32px] font-bold text-on-surface">14</span>
<span className="font-label-caps text-label-caps text-tertiary-fixed-dim">Actions</span>
</div>
</div>
</div>
{/* Action Log & System Feedback */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* Action Log (Takes up 2 cols on LG) */}
<div className="lg:col-span-2 bg-surface-container/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col h-[500px]">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline-md text-headline-md text-on-surface">Protocol Execution Log</h3>
<span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container py-1 px-3 rounded-full">System Time: UTC-8</span>
</div>
<div className="flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
{/* Log Item 1 */}
<div className="flex gap-4 p-4 rounded bg-surface-container-high/50 border-l-2 border-error">
<span className="font-data-numeric text-data-numeric text-on-surface-variant w-20 shrink-0">14:02:00</span>
<div>
<p className="font-body-md text-body-md text-on-surface font-semibold">Seismic Anomaly Detected</p>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Sensor Array Alpha recorded tremor magnitude 4.2.</p>
</div>
</div>
{/* Log Item 2 */}
<div className="flex gap-4 p-4 rounded bg-surface-container-high/50 border-l-2 border-secondary-container">
<span className="font-data-numeric text-data-numeric text-on-surface-variant w-20 shrink-0">14:02:05</span>
<div>
<p className="font-body-md text-body-md text-on-surface font-semibold">Risk Level Elevated</p>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Automated system escalated status to HIGH RISK based on moisture saturation data.</p>
</div>
</div>
{/* Log Item 3 */}
<div className="flex gap-4 p-4 rounded bg-surface-container-high/50 border-l-2 border-primary-fixed-dim shadow-[0_0_15px_rgba(0,218,248,0.1)]">
<span className="font-data-numeric text-data-numeric text-primary-fixed-dim w-20 shrink-0">14:03:10</span>
<div>
<p className="font-body-md text-body-md text-primary-fixed-dim font-semibold">Emergency Protocol Initiated</p>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manual override by Chief Monitoring Officer. Evacuation warnings broadcast to Sector 7G.</p>
</div>
</div>
{/* Log Item 4 */}
<div className="flex gap-4 p-4 rounded bg-surface-container-high/50 border-l-2 border-tertiary-fixed-dim">
<span className="font-data-numeric text-data-numeric text-on-surface-variant w-20 shrink-0">18:15:45</span>
<div>
<p className="font-body-md text-body-md text-on-surface font-semibold">Stabilization Confirmed</p>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Ground movement ceased. Moisture levels returning to baseline.</p>
</div>
</div>
</div>
</div>
{/* System Performance Feedback */}
<div className="bg-surface-container/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col">
<h3 className="font-headline-md text-headline-md text-on-surface mb-6">System Analytics</h3>
<div className="flex flex-col gap-6">
<div>
<div className="flex justify-between items-center mb-2">
<span className="font-label-caps text-label-caps text-on-surface-variant">Sensor Response Time</span>
<span className="font-data-numeric text-data-numeric text-tertiary-fixed-dim">12ms (Optimal)</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-gradient-to-r from-primary-fixed-dim to-tertiary-fixed-dim w-[95%]"></div>
</div>
</div>
<div>
<div className="flex justify-between items-center mb-2">
<span className="font-label-caps text-label-caps text-on-surface-variant">Data Integrity</span>
<span className="font-data-numeric text-data-numeric text-on-surface">99.8%</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-gradient-to-r from-primary-fixed-dim to-primary w-[99%]"></div>
</div>
</div>
<div className="mt-4 pt-4 border-t border-white/10">
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Provide qualitative feedback on predictive models for this event to improve machine learning accuracy.</p>
<textarea className="w-full bg-surface-container-high border-b border-primary-fixed-dim focus:border-primary-fixed focus:ring-0 text-on-surface font-body-md resize-none h-24 p-3 rounded-t" placeholder="Add notes on model accuracy..."></textarea>
<button className="w-full mt-3 py-2 bg-surface-container-highest hover:bg-surface-bright text-on-surface rounded font-label-caps text-label-caps transition-colors">Submit Feedback</button>
</div>
</div>
</div>
</div>
</div>

    </div>
  );
};

export default EmergencySummaryPage;
