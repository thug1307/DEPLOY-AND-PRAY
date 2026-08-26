import React from 'react';
import { Link } from 'react-router-dom';

const MonitoringPage = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col p-margin-mobile md:p-gutter">
{/* Mobile TopAppBar (Visible only on mobile) */}

{/* Map Background (Simulated) */}
<div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" data-alt="A dark, high-tech topographical map of Northeast India. The map uses deep blues and blacks with subtle glowing grid lines. The terrain is detailed, emphasizing mountainous regions. The aesthetic is cyber-physical command center, highly detailed, technical, data-driven visualization." data-location="Northeast India" style={{ "backgroundImage": "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600')" }}></div>
{/* Hotspots Overlay (Simulated) */}
<div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
{/* Hotspot 1 */}
<div className="absolute top-[40%] left-[30%] w-32 h-32 -ml-16 -mt-16 rounded-full bg-error/10 border border-error/30 animate-pulse flex items-center justify-center glow-active" style={{ "boxShadow": "0 0 30px rgba(255, 180, 171, 0.4)" }}>
<div className="w-4 h-4 rounded-full bg-error"></div>
</div>
{/* Hotspot 2 */}
<div className="absolute top-[60%] left-[55%] w-24 h-24 -ml-12 -mt-12 rounded-full bg-secondary-container/10 border border-secondary-container/30 flex items-center justify-center">
<div className="w-3 h-3 rounded-full bg-secondary-container"></div>
</div>
</div>
{/* Content Overlay */}
<div className="relative z-20 flex-1 flex flex-col p-gutter gap-md overflow-hidden pointer-events-auto h-full">
{/* Top Metrics Row */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-md shrink-0">
{/* Card 1 */}
<div className="glass-panel p-md rounded-xl flex flex-col gap-2 relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error to-error-container"></div>
<div className="flex justify-between items-start">
<span className="font-label-caps text-label-caps text-on-surface-variant">Active Alerts</span>
<span className="material-symbols-outlined text-error">warning</span>
</div>
<div className="font-display-lg text-display-lg text-error glow-text-error mt-2">12</div>
<div className="font-data-numeric text-data-numeric text-on-surface-variant mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-error">trending_up</span>
                        +3 since last hour
                    </div>
</div>
{/* Card 2 */}
<div className="glass-panel p-md rounded-xl flex flex-col gap-2 relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-container to-secondary"></div>
<div className="flex justify-between items-start">
<span className="font-label-caps text-label-caps text-on-surface-variant">Critical Zones</span>
<span className="material-symbols-outlined text-secondary-container">location_searching</span>
</div>
<div className="font-display-lg text-display-lg text-secondary-container mt-2" style={{ "textShadow": "0 0 10px rgba(255, 87, 26, 0.5)" }}>04</div>
<div className="font-data-numeric text-data-numeric text-on-surface-variant mt-1 flex items-center gap-1">
                        High risk thresholds met
                    </div>
</div>
{/* Card 3 */}
<div className="glass-panel p-md rounded-xl flex flex-col gap-2 relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-fixed-dim to-primary-container"></div>
<div className="flex justify-between items-start">
<span className="font-label-caps text-label-caps text-on-surface-variant">Citizen Reports</span>
<span className="material-symbols-outlined text-primary-fixed-dim">campaign</span>
</div>
<div className="font-display-lg text-display-lg text-primary-fixed-dim glow-text-primary mt-2">89</div>
<div className="font-data-numeric text-data-numeric text-on-surface-variant mt-1 flex items-center gap-1">
<span className="text-tertiary-fixed-dim">98% verified</span> in past 24h
                    </div>
</div>
</div>
{/* Bottom Area: Map Tools & Side Panel */}
<div className="flex-1 flex gap-md min-h-0">
{/* Map Controls (Left) */}
<div className="flex flex-col gap-sm justify-end shrink-0 pointer-events-none">
<div className="glass-panel rounded-full p-2 flex flex-col gap-2 pointer-events-auto">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary-fixed-dim hover:bg-white/5 transition-colors">
<span className="material-symbols-outlined">add</span>
</button>
<div className="w-full h-px bg-white/10 my-1"></div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary-fixed-dim hover:bg-white/5 transition-colors">
<span className="material-symbols-outlined">remove</span>
</button>
</div>
<div className="glass-panel rounded-full p-2 pointer-events-auto mt-2">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary-fixed-dim hover:bg-white/5 transition-colors">
<span className="material-symbols-outlined">my_location</span>
</button>
</div>
</div>
{/* Spacer for Map */}
<div className="flex-1"></div>
{/* Detail Panel (Right) */}
<div className="w-full md:w-[400px] glass-panel rounded-xl flex flex-col h-full overflow-hidden border-t-4 border-error pointer-events-auto shrink-0 shadow-2xl">
{/* Panel Header */}
<div className="p-md border-b border-white/10 bg-surface/50">
<div className="flex justify-between items-start mb-2">
<div className="font-label-caps text-label-caps text-error flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                                Selected Hotspot
                            </div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Gangtok, Sikkim</h2>
<div className="font-data-numeric text-data-numeric text-on-surface-variant mt-1">27.3389° N, 88.6065° E</div>
</div>
{/* Panel Content */}
<div className="p-md flex-1 overflow-y-auto flex flex-col gap-lg custom-scrollbar">
{/* Risk Score */}
<div className="flex flex-col items-center justify-center py-sm">
<div className="relative w-32 h-32 flex items-center justify-center">
{/* Simulated SVG Circle */}
<svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
<circle cx="50" cy="50" fill="none" r="45" stroke="#1A1A1A" strokeWidth="8"></circle>
<circle className="text-error" cx="50" cy="50" fill="none" r="45" stroke="#ffb4ab" strokeDasharray="283" strokeDashoffset="34" strokeWidth="8" style={{ "filter": "drop-shadow(0 0 4px rgba(255, 180, 171, 0.5))" }}></circle>
</svg>
<div className="text-center z-10">
<div className="font-display-lg text-display-lg text-error leading-none">88</div>
<div className="font-label-caps text-label-caps text-on-surface-variant mt-1">/ 100</div>
</div>
</div>
<div className="font-label-caps text-label-caps text-error mt-4 tracking-widest">CRITICAL RISK</div>
</div>
{/* Telemetry Bars */}
<div className="flex flex-col gap-md">
{/* Metric 1 */}
<div>
<div className="flex justify-between font-label-caps text-label-caps mb-2">
<span className="text-on-surface">Heavy Rainfall (24h)</span>
<span className="text-secondary-container font-data-numeric">185mm</span>
</div>
<div className="h-2 rounded-full progress-track overflow-hidden relative">
<div className="absolute top-0 left-0 h-full bg-secondary-container w-[85%]" style={{ "boxShadow": "0 0 10px rgba(255, 87, 26, 0.5)" }}></div>
<div className="absolute top-0 left-[75%] h-full w-px bg-white/50 z-10"></div> {/* Threshold marker */}
</div>
</div>
{/* Metric 2 */}
<div>
<div className="flex justify-between font-label-caps text-label-caps mb-2">
<span className="text-on-surface">Soil Moisture Index</span>
<span className="text-primary-fixed-dim font-data-numeric">62%</span>
</div>
<div className="h-2 rounded-full progress-track overflow-hidden relative">
<div className="absolute top-0 left-0 h-full bg-primary-fixed-dim w-[62%]" style={{ "boxShadow": "0 0 10px rgba(0, 218, 248, 0.5)" }}></div>
</div>
</div>
{/* Metric 3 */}
<div>
<div className="flex justify-between font-label-caps text-label-caps mb-2">
<span className="text-on-surface">Slope Stability</span>
<span className="text-error font-data-numeric">Marginal</span>
</div>
<div className="h-2 rounded-full progress-track overflow-hidden relative">
<div className="absolute top-0 left-0 h-full bg-error w-[90%]" style={{ "boxShadow": "0 0 10px rgba(255, 180, 171, 0.5)" }}></div>
</div>
</div>
</div>
{/* Actions */}
<div className="mt-auto pt-md flex flex-col gap-sm">
<button className="w-full bg-primary-fixed-dim text-on-primary font-label-caps text-label-caps py-3 rounded-lg hover:bg-primary-fixed transition-colors font-bold" onclick="window.location.href='screen6.html'">
                                Issue Evacuation Warning
                            </button>
<button className="w-full border border-primary-fixed-dim text-primary-fixed-dim font-label-caps text-label-caps py-3 rounded-lg hover:bg-primary-fixed-dim/10 transition-colors">
                                View Drone Imagery
                            </button>
</div>
</div>
</div>
</div>
</div>

    </div>
  );
};

export default MonitoringPage;
