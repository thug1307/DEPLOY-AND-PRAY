import React from 'react';
import { Link } from 'react-router-dom';

const EmergencyChecklistPage = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row gap-gutter p-margin-mobile md:p-gutter min-h-full">
{/* Left Column: Interactive Checklist */}
<section className="flex-1 flex flex-col gap-base overflow-hidden">
{/* Progress Header */}
<div className="glass-panel p-md rounded-xl flex flex-col gap-sm shrink-0">
<div className="flex justify-between items-end">
<div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Protocol Execution</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Immediate Response Phase 1</p>
</div>
<div className="text-right">
<span className="font-data-numeric text-data-numeric text-primary-fixed-dim text-2xl" id="progress-text">25%</span>
<p className="font-label-caps text-label-caps text-on-surface-variant">COMPLETED</p>
</div>
</div>
{/* Technical Progress Bar */}
<div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden mt-2 relative">
<div className="h-full bg-gradient-to-r from-primary to-primary-fixed-dim transition-all duration-500 ease-out" id="progress-bar" style={{ "width": "25%" }}></div>
</div>
</div>
{/* Checklist Items */}
<div className="glass-panel rounded-xl flex-1 overflow-y-auto p-base flex flex-col gap-xs custom-scrollbar">
{/* Urgent Item (Active) */}
<label className="flex items-start gap-md p-md rounded-lg glass-panel urgent-pulse cursor-pointer group hover:bg-white/5 transition-all">
<input className="mt-1 shrink-0" id="check-1" type="checkbox" />
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-headline-md text-headline-md text-secondary-container">Sound Area Sirens</h3>
<span className="font-label-caps text-label-caps text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/30">CRITICAL</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Activate sector Alpha and Beta warning systems immediately.</p>
</div>
</label>
{/* Completed Item */}
<label className="flex items-start gap-md p-md rounded-lg glass-panel cursor-pointer group hover:bg-white/5 transition-all opacity-60">
<input checked="" className="mt-1 shrink-0" disabled="" type="checkbox" />
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-body-lg text-body-lg text-on-surface line-through">Notify Authorities</h3>
<span className="font-label-caps text-label-caps text-tertiary-fixed bg-tertiary-fixed/10 px-2 py-0.5 rounded border border-tertiary-fixed/30">DONE</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-through">Auto-dispatched alert to regional emergency services.</p>
</div>
</label>
{/* Pending Item */}
<label className="flex items-start gap-md p-md rounded-lg glass-panel cursor-pointer group hover:bg-white/5 transition-all">
<input className="mt-1 shrink-0" type="checkbox" />
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">Dispatch Rescue Teams</h3>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Deploy quick response units to predicted impact zones.</p>
</div>
</label>
{/* Pending Item */}
<label className="flex items-start gap-md p-md rounded-lg glass-panel cursor-pointer group hover:bg-white/5 transition-all">
<input className="mt-1 shrink-0" type="checkbox" />
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">Activate Evacuation Routes</h3>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Enable dynamic routing on digital road signs and mobile apps.</p>
</div>
</label>
</div>
{/* Proceed Button */}
<div className="mt-auto pt-4 shrink-0">
    <Link to="/emergency/evacuation" className="w-full flex items-center justify-center gap-2 py-3 bg-primary-fixed-dim text-on-primary font-label-caps text-label-caps rounded-lg hover:bg-primary transition-colors">
        Proceed to Monitor <span className="material-symbols-outlined">arrow_forward</span>
    </Link>
</div>
</section>
{/* Right Column: Comm Log & Status */}
<section className="flex-1 md:max-w-md flex flex-col gap-base overflow-hidden">
{/* Team Status Panel */}
<div className="glass-panel rounded-xl p-md flex flex-col gap-sm shrink-0">
<h3 className="font-label-caps text-label-caps text-on-surface-variant border-b border-white/10 pb-2 mb-2">ACTIVE RESPONSE TEAMS</h3>
<div className="flex items-center justify-between p-2 rounded bg-white/5">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(141,255,190,0.8)]"></div>
<span className="font-body-md text-body-md text-on-surface">Unit Alpha</span>
</div>
<span className="font-data-numeric text-data-numeric text-tertiary">EN ROUTE</span>
</div>
<div className="flex items-center justify-between p-2 rounded bg-white/5">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_8px_rgba(255,87,26,0.8)] animate-pulse"></div>
<span className="font-body-md text-body-md text-on-surface">Unit Bravo</span>
</div>
<span className="font-data-numeric text-data-numeric text-secondary-container">DELAYED</span>
</div>
</div>
{/* Comm Log */}
<div className="glass-panel rounded-xl flex-1 flex flex-col overflow-hidden relative">
{/* Blur overlay for aesthetic depth at top of log */}
<div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-surface-container-high/90 to-transparent z-10 pointer-events-none"></div>
<div className="p-md pb-2 border-b border-white/10 shrink-0 z-20 bg-surface-container-high/50 backdrop-blur-sm">
<h3 className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-sm">cell_tower</span>
                        COMMUNICATIONS LOG
                    </h3>
</div>
<div className="flex-1 overflow-y-auto p-md flex flex-col gap-4 custom-scrollbar z-0">
{/* Log Entry */}
<div className="flex flex-col gap-1 border-l-2 border-primary-fixed-dim/30 pl-3">
<div className="flex justify-between items-baseline">
<span className="font-label-caps text-label-caps text-primary-fixed-dim">SYS_AUTO</span>
<span className="font-data-numeric text-data-numeric text-on-surface-variant text-xs">14:02:45</span>
</div>
<p className="font-body-md text-body-md text-on-surface">Seismic anomaly detected. Confidence: 94%. Triggering protocol.</p>
</div>
{/* Log Entry */}
<div className="flex flex-col gap-1 border-l-2 border-tertiary/30 pl-3">
<div className="flex justify-between items-baseline">
<span className="font-label-caps text-label-caps text-tertiary">DISPATCH</span>
<span className="font-data-numeric text-data-numeric text-on-surface-variant text-xs">14:03:10</span>
</div>
<p className="font-body-md text-body-md text-on-surface">Alert broadcast to regional authorities confirmed.</p>
</div>
{/* Log Entry Urgent */}
<div className="flex flex-col gap-1 border-l-2 border-secondary-container pl-3 bg-secondary-container/5 rounded-r p-2 mt-2">
<div className="flex justify-between items-baseline">
<span className="font-label-caps text-label-caps text-secondary-container flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">warning</span>
                                UNIT_BRAVO
                            </span>
<span className="font-data-numeric text-data-numeric text-on-surface-variant text-xs">14:05:22</span>
</div>
<p className="font-body-md text-body-md text-on-surface">Road blocked at Sector 4. Rerouting required.</p>
</div>
</div>
{/* Input Area */}
<div className="p-3 border-t border-white/10 shrink-0 bg-surface-container-high/30">
<div className="relative">
<input className="w-full bg-surface-container-lowest/50 border-b border-primary/30 focus:border-primary-fixed-dim focus:ring-0 text-on-surface font-body-md py-2 px-3 outline-none transition-colors" placeholder="Transmit status update..." type="text" />
<button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-fixed-dim hover:text-primary transition-colors">
<span className="material-symbols-outlined" style={{ "fontVariationSettings": "'FILL' 1" }}>send</span>
</button>
</div>
</div>
</div>
</section>

    </div>
  );
};

export default EmergencyChecklistPage;
