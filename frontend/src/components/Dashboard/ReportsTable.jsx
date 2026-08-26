import { MOCK_REPORTS } from '../../data/mockData';

const ReportsTable = () => {
  return (
    <div className="card reports-table-panel">
      <div className="panel-header">
        <h3>Recent Citizen Reports</h3>
        <button className="btn btn-outline btn-sm">View All</button>
      </div>
      
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Hazard</th>
              <th>Risk Level</th>
              <th>Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_REPORTS.map(report => (
              <tr key={report.id}>
                <td className="text-muted">{report.id}</td>
                <td className="fw-500">{report.location}</td>
                <td>{report.hazard}</td>
                <td>
                  <span className={`risk-badge ${report.riskLevel.toLowerCase()}`}>
                    {report.riskLevel}
                  </span>
                </td>
                <td className="text-muted">{report.date}</td>
                <td>
                  <span className={`status-pill ${report.status === 'Verified' ? 'verified' : 'review'}`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsTable;
