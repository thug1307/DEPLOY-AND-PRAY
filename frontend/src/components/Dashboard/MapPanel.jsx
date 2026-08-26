import { MapPin, Navigation } from 'lucide-react';
import { MOCK_HOTSPOTS } from '../../data/mockData';

const MapPanel = ({ onSelectHotspot, selectedHotspotId }) => {
  return (
    <div className="card map-panel">
      <div className="map-header">
        <h3>Risk Map (Northeast India)</h3>
        <div className="map-legend">
          <span className="legend-item"><span className="legend-dot critical"></span>Critical</span>
          <span className="legend-item"><span className="legend-dot high"></span>High</span>
          <span className="legend-item"><span className="legend-dot moderate"></span>Moderate</span>
        </div>
      </div>
      
      {/* Mock Map Area */}
      <div className="mock-map-container">
        <div className="mock-map-bg">
          <div className="grid-overlay"></div>
          {/* Mock Markers */}
          {MOCK_HOTSPOTS.map((hotspot, index) => {
            const isSelected = hotspot.id === selectedHotspotId;
            // Fake positions for visual purposes
            const positions = [
              { top: '30%', left: '40%' },
              { top: '60%', left: '60%' },
              { top: '45%', left: '25%' }
            ];
            const pos = positions[index % positions.length];
            const colorClass = hotspot.riskLevel.toLowerCase();

            return (
              <button 
                key={hotspot.id}
                className={`map-marker ${colorClass} ${isSelected ? 'selected' : ''}`}
                style={pos}
                onClick={() => onSelectHotspot(hotspot)}
                title={hotspot.location}
              >
                <MapPin size={isSelected ? 28 : 24} />
                {isSelected && (
                  <div className="marker-pulse"></div>
                )}
              </button>
            );
          })}
          
          <div className="map-overlay-text">
            <Navigation size={16} />
            <span>Map API Integration Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
