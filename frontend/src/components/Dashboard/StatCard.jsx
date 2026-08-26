const StatCard = ({ title, value, icon: Icon, trend, trendLabel, colorClass }) => {
  return (
    <div className={`card stat-card ${colorClass}`}>
      <div className="stat-card-header">
        <h3 className="stat-title">{title}</h3>
        <div className={`stat-icon-wrapper ${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      {trend && (
        <div className="stat-trend">
          <span className={`trend-value ${trend > 0 ? 'up' : 'down'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span className="trend-label">{trendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
