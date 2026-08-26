import { AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import { MOCK_ALERTS } from '../../data/mockData';

const AlertsPanel = () => {
  const getIcon = (severity) => {
    switch(severity) {
      case 'critical': return <AlertOctagon size={18} />;
      case 'high': return <AlertTriangle size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div className="card alerts-panel">
      <div className="panel-header">
        <h3>Active Alerts</h3>
        <span className="badge-count">{MOCK_ALERTS.length}</span>
      </div>
      
      <div className="alerts-list">
        {MOCK_ALERTS.map(alert => (
          <div key={alert.id} className={`alert-item ${alert.severity}`}>
            <div className="alert-icon-wrapper">
              {getIcon(alert.severity)}
            </div>
            <div className="alert-content">
              <h4>{alert.title}</h4>
              <p>{alert.description}</p>
              <span className="alert-time">
                {new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
