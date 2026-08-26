import React from 'react';
import { Link } from 'react-router-dom';

const EmergencyActivationPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-gutter relative z-10 min-h-full py-12">
{/* Emergency Header */}
<div className="text-center mb-xl flex flex-col items-center animate-pulse">
<span className="material-symbols-outlined text-[64px] text-error mb-4" style={{ "fontVariationSettings": "'FILL' 1" }}>warning</span>
<h1 className="font-display-lg text-display-lg text-error tracking-tighter uppercase">Protocol Activation</h1>
<p className="font-body-lg text-body-lg text-error/80 mt-2">Authorization Required</p>
</div>
{/* Details Card */}
<div className="glass-panel w-full max-w-2xl rounded-xl p-md mb-xl border-error/30 relative overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-sm flex items-center gap-2">
<span className="material-symbols-outlined text-error">sensors</span>
                Triggering Event Summary
            </h2>
<div className="bg-surface/50 rounded-lg p-sm border border-white/5 mb-md">
<div className="grid grid-cols-2 gap-4">
<div>
<p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Event Type</p>
<p className="font-body-md text-body-md text-error font-bold">Severe Slope Instability Detected</p>
</div>
<div>
<p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Location</p>
<p className="font-body-md text-body-md text-on-surface">Sector 7 - North Ridge</p>
</div>
<div>
<p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Risk Level</p>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-error animate-ping"></div>
<p className="font-body-md text-body-md text-error font-bold">CRITICAL</p>
</div>
</div>
<div>
<p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Time Detected</p>
<p className="font-data-numeric text-data-numeric text-on-surface">14:32:05 UTC</p>
</div>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
                Initiating this protocol will broadcast immediate evacuation orders to all personnel in Sector 7 and lock down automated heavy machinery.
            </p>
</div>
{/* Action Area */}
<div className="flex flex-col items-center">
<p className="font-label-caps text-label-caps text-error mb-4">Hold to Confirm Protocol</p>
<Link to="/emergency/checklist" className="hold-btn relative overflow-hidden bg-error-container text-on-error font-headline-lg text-headline-lg uppercase py-4 px-12 rounded-lg border-2 border-error emergency-glow transition-transform active:scale-95 flex items-center gap-4 z-10" id="emergencyBtn">
<span className="material-symbols-outlined text-[32px]">campaign</span>
                Initiate
            </Link>
<div className="mt-4 font-data-numeric text-data-numeric text-error opacity-0 transition-opacity" id="progressText">0%</div>
</div>
<div className="mt-auto pt-8">
<Link to="/" className="text-on-surface-variant hover:text-on-surface flex items-center gap-2 font-label-caps text-label-caps transition-colors">
<span className="material-symbols-outlined">close</span>
                Cancel &amp; Return
            </Link>
</div>
    </div>
  );
};

export default EmergencyActivationPage;
