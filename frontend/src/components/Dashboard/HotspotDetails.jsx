import { AlertCircle, Users, Activity } from 'lucide-react';

const ProgressBar = ({ label, value }) => (
  <div className="progress-group">
    <div className="progress-label">
      <span>{label}</span>
      <span>{value}/100</span>
    </div>
    <div className="progress-bar-bg">
      <div 
        className={`progress-bar-fill ${value > 80 ? 'critical' : value > 60 ? 'high' : 'moderate'}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const HotspotDetails = ({ hotspot }) => {
  if (!hotspot) {
    return (
      <div className="card hotspot-details empty">
        <p>Select a hotspot on the map to view details.</p>
      </div>
    );
  }

  return (
    <div className="card hotspot-details">
      <div className="hotspot-header">
        <div>
          <span className={`risk-badge ${hotspot.riskLevel.toLowerCase()}`}>
            {hotspot.riskLevel} Risk
          </span>
          <h2>{hotspot.location}</h2>
        </div>
        <div className="risk-score-circle">
          <span className="score">{hotspot.riskScore}</span>
          <span className="score-max">/10</span>
        </div>
      </div>

      <div className="details-section">
        <h3><Activity size={16}/> Risk Factors</h3>
        <ProgressBar label="Heavy Rainfall" value={hotspot.metrics.rainfall} />
        <ProgressBar label="Steep Slope" value={hotspot.metrics.slope} />
        <ProgressBar label="Soil Moisture" value={hotspot.metrics.soilMoisture} />
        <ProgressBar label="Historical Vulnerability" value={hotspot.metrics.historicalVulnerability} />
        <ProgressBar label="Citizen Reports" value={hotspot.metrics.citizenReports} />
      </div>

      <div className="details-section">
        <h3><Users size={16}/> Context & Exposure</h3>
        <div className="context-grid">
          <div className="context-item">
            <span className="context-label">Population Exposure</span>
            <span className="context-value">{hotspot.populationExposure}</span>
          </div>
          <div className="context-item">
            <span className="context-label">Nearby Infrastructure</span>
            <span className="context-value">{hotspot.nearbyInfrastructure}</span>
          </div>
          <div className="context-item">
            <span className="context-label">Active Reports</span>
            <span className="context-value">{hotspot.reportCount}</span>
          </div>
        </div>
      </div>

      <div className="action-section">
        <h3>Recommended Actions</h3>
        <ul className="action-list">
          {hotspot.riskScore > 8 ? (
            <>
              <li><AlertCircle size={14} className="icon-critical"/> Immediate field inspection required.</li>
              <li><AlertCircle size={14} className="icon-critical"/> Issue local evacuation warning.</li>
              <li><AlertCircle size={14} className="icon-critical"/> Monitor road connectivity NH-6.</li>
            </>
          ) : (
            <>
              <li><AlertCircle size={14} className="icon-high"/> Monitor soil moisture sensors closely.</li>
              <li><AlertCircle size={14} className="icon-high"/> Review citizen reports daily.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HotspotDetails;
