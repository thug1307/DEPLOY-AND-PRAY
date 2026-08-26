import React from 'react';
import { Link } from 'react-router-dom';

const EvacuationMonitorPage = () => {
  return (
    <div className="flex-1 overflow-y-auto">
{/* Header */}

{/* Scrollable Content Area */}
<div className="flex-grow overflow-y-auto p-margin-mobile md:p-gutter z-10">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-7xl mx-auto">
{/* Map / Visualization Container (Spans 8 cols on desktop) */}
<div className="md:col-span-8 h-[400px] md:h-[600px] glass-panel rounded-xl overflow-hidden relative flex flex-col">
<div className="p-4 border-b border-white/10 flex justify-between items-center bg-surface-container-highest/50">
<h3 className="font-label-caps text-label-caps text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="my_location">my_location</span>
                            Live Movement Heatmap
                        </h3>
<div className="flex gap-2">
<button className="px-3 py-1 text-xs border border-white/10 rounded hover:bg-white/5 transition-colors">Topo</button>
<button className="px-3 py-1 text-xs bg-primary-fixed-dim text-surface font-semibold rounded glow-active">Heatmap</button>
</div>
</div>
<div className="flex-grow relative bg-[#121212] overflow-hidden" data-alt="A highly detailed, dark-themed digital topographical map of a mountainous region. Overlayed with a vivid glowing heat map in cyan, yellow, and neon orange indicating population density and movement. The map has a sophisticated, command-center UI aesthetic with subtle grid lines and technical markers." data-location="Seattle" style={{ "backgroundImage": "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600')", "backgroundSize": "cover", "backgroundPosition": "center" }}>
{/* Simulated Overlay Controls */}
<div className="absolute bottom-4 left-4 glass-panel p-3 rounded-lg flex flex-col gap-2">
<div className="flex items-center gap-2 text-xs">
<span className="w-3 h-3 rounded bg-primary-fixed-dim"></span> Low Density
                            </div>
<div className="flex items-center gap-2 text-xs">
<span className="w-3 h-3 rounded bg-tertiary-container"></span> Moderate
                            </div>
<div className="flex items-center gap-2 text-xs">
<span className="w-3 h-3 rounded bg-secondary-container"></span> High Density (Risk)
                            </div>
</div>
{/* Simulated Route Indicator */}
<svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
<path className="animate-[dash_20s_linear_infinite]" d="M 20,80 Q 40,60 60,70 T 90,20" fill="none" stroke="rgba(0, 218, 248, 0.8)" strokeDasharray="2,2" strokeWidth="0.5"></path>
<circle cx="20" cy="80" fill="#ff571a" r="1"></circle>
<circle cx="90" cy="20" fill="#00e995" r="1"></circle>
</svg>
</div>
</div>
{/* Right Column: Stats & Timeline (Spans 4 cols on desktop) */}
<div className="md:col-span-4 flex flex-col gap-gutter">
{/* Metric Cards */}
<div className="grid grid-cols-2 gap-3">
<div className="glass-panel p-4 rounded-xl flex flex-col gap-1 data-gradient-danger border-t-2 border-t-secondary-container">
<span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="groups">groups</span>
                                At Risk
                            </span>
<span className="font-data-numeric text-display-lg text-secondary-fixed">1,240</span>
<span className="text-xs text-secondary-container flex items-center">
<span className="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span> +12% / hr
                            </span>
</div>
<div className="glass-panel p-4 rounded-xl flex flex-col gap-1 data-gradient-safe border-t-2 border-t-tertiary-container">
<span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" data-icon="how_to_reg">how_to_reg</span>
                                Confirmed Safe
                            </span>
<span className="font-data-numeric text-display-lg text-tertiary-fixed">4,892</span>
<span className="text-xs text-tertiary-container flex items-center">
<span className="material-symbols-outlined text-[14px]" data-icon="check_circle">check_circle</span> Verified
                            </span>
</div>
</div>
{/* Drone Feed Card */}
<div className="glass-panel rounded-xl overflow-hidden flex flex-col">
<div className="p-3 border-b border-white/10 flex justify-between items-center bg-surface-container-highest/50">
<h3 className="font-label-caps text-label-caps text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="flight">flight</span>
                                Route Alpha Feed
                            </h3>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-[10px] font-bold flex items-center gap-1 animate-pulse">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span> LIVE
                            </span>
</div>
<div className="relative h-40 bg-surface-lowest">
<img alt="Drone Feed Route Alpha" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" data-alt="A gritty, high-contrast aerial drone view of a mountain road during an evacuation. The scene is dark, lit by vehicle headlights and emergency vehicle strobes. A high-tech digital HUD overlay shows telemetry data, grid coordinates, and target locking boxes in cyan and bright orange." src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" />
<div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent pointer-events-none"></div>
{/* Overlay UI on Drone Feed */}
<div className="absolute bottom-2 left-2 text-[10px] font-data-numeric text-primary-fixed-dim">
                                LAT: 47.6062° N<br />
                                LON: 122.3321° W<br />
                                ALT: 450m
                            </div>
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary-fixed-dim/50 w-12 h-12 flex items-center justify-center pointer-events-none">
<div className="w-1 h-1 bg-primary-fixed-dim"></div>
</div>
</div>
</div>
{/* Timeline */}
<div className="glass-panel p-4 rounded-xl flex-grow overflow-hidden flex flex-col">
<h3 className="font-label-caps text-label-caps text-on-surface mb-4">Evacuation Timeline</h3>
<div className="flex-grow overflow-y-auto pr-2 relative">
{/* Track Line */}
<div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10"></div>
<div className="flex flex-col gap-4 relative">
{/* Item 1 */}
<div className="flex gap-4 relative">
<div className="w-6 h-6 rounded-full bg-surface border-2 border-primary-fixed-dim flex items-center justify-center z-10 shrink-0">
<div className="w-2 h-2 rounded-full bg-primary-fixed-dim"></div>
</div>
<div className="flex flex-col pb-4 border-b border-white/5 w-full">
<span className="font-data-numeric text-[12px] text-primary-fixed-dim">14:30 HRS</span>
<span className="text-sm font-semibold text-on-surface">Sector 7 Order Issued</span>
<span className="text-xs text-on-surface-variant">Mandatory evacuation initiated based on seismic sensor alert.</span>
</div>
</div>
{/* Item 2 */}
<div className="flex gap-4 relative">
<div className="w-6 h-6 rounded-full bg-surface border-2 border-secondary-container flex items-center justify-center z-10 shrink-0">
<span className="material-symbols-outlined text-[12px] text-secondary-container" data-icon="priority_high">priority_high</span>
</div>
<div className="flex flex-col pb-4 border-b border-white/5 w-full">
<span className="font-data-numeric text-[12px] text-secondary-container">15:15 HRS</span>
<span className="text-sm font-semibold text-on-surface">Route B Blocked</span>
<span className="text-xs text-on-surface-variant">Minor rockfall detected. Traffic rerouted to Route Alpha.</span>
</div>
</div>
{/* Item 3 */}
<div className="flex gap-4 relative opacity-50">
<div className="w-6 h-6 rounded-full bg-surface border-2 border-white/20 flex items-center justify-center z-10 shrink-0">
</div>
<div className="flex flex-col w-full">
<span className="font-data-numeric text-[12px] text-white/50">EST 18:00 HRS</span>
<span className="text-sm font-semibold text-on-surface">Expected Clearance</span>
<span className="text-xs text-on-surface-variant">Projected time for all at-risk personnel to clear Sector 7.</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
{/* Bottom Row: Wide Data Tables/Controls */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-7xl mx-auto mt-gutter pb-gutter">
{/* Shelter Capacity */}
<div className="md:col-span-2 glass-panel p-4 rounded-xl">
<div className="flex justify-between items-center mb-4">
<h3 className="font-label-caps text-label-caps text-on-surface">Shelter Capacity &amp; Status</h3>
<button className="text-primary-fixed-dim hover:text-primary transition-colors text-xs font-semibold flex items-center gap-1">
                            View All <span className="material-symbols-outlined text-[14px]" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div className="flex flex-col gap-3">
{/* Progress Bar Item */}
<div>
<div className="flex justify-between text-xs mb-1">
<span>Highland Community Center</span>
<span className="font-data-numeric text-tertiary-container">845 / 1000</span>
</div>
<div className="h-2 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
<div className="h-full bg-gradient-to-r from-primary-fixed-dim to-tertiary-container w-[84.5%] rounded-full shadow-[0_0_8px_rgba(0,233,149,0.5)]"></div>
</div>
</div>
{/* Progress Bar Item */}
<div>
<div className="flex justify-between text-xs mb-1">
<span>Northridge School</span>
<span className="font-data-numeric text-secondary-container">980 / 1000</span>
</div>
<div className="h-2 w-full bg-[#1A1A1A] rounded-full overflow-hidden">
<div className="h-full bg-gradient-to-r from-secondary-container to-error w-[98%] rounded-full shadow-[0_0_8px_rgba(255,87,26,0.5)]"></div>
</div>
<p className="text-[10px] text-secondary-container mt-1">Warning: Nearing maximum capacity.</p>
</div>
</div>
</div>
{/* Action Panel */}
<div className="glass-panel p-4 rounded-xl flex flex-col justify-center gap-4">
<h3 className="font-label-caps text-label-caps text-on-surface border-b border-white/10 pb-2">Direct Actions</h3>
<button className="w-full bg-transparent border border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim/10 transition-colors py-2 rounded flex items-center justify-center gap-2 text-sm font-semibold">
<span className="material-symbols-outlined text-[18px]" data-icon="campaign">campaign</span>
                        Broadcast Update
                    </button>
<button className="w-full bg-transparent border border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim/10 transition-colors py-2 rounded flex items-center justify-center gap-2 text-sm font-semibold">
<span className="material-symbols-outlined text-[18px]" data-icon="route">route</span>
                        Optimize Routes
                    </button>
<Link to="/emergency/summary" className="w-full mt-2 bg-primary-fixed-dim text-on-primary hover:bg-primary transition-colors py-2 rounded flex items-center justify-center gap-2 text-sm font-bold shadow-[0_0_15px_rgba(0,218,248,0.3)]">
                        Generate Summary <span className="material-symbols-outlined text-[18px]">summarize</span>
                    </Link>
</div>
</div>
</div>

    </div>
  );
};

export default EvacuationMonitorPage;
