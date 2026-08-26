import { NavLink, Outlet } from 'react-router-dom';
import { Activity, Map, FileText, AlertTriangle, Menu, User } from 'lucide-react';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <Activity className="logo-icon" size={24} />
            <div>
              <h1 className="logo-title">LandslideGuard</h1>
              <p className="logo-subtitle">Risk Intelligence</p>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Map size={20} />
            <span>Overview & Map</span>
          </NavLink>
          
          <NavLink to="/report" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <AlertTriangle size={20} />
            <span>Report Hazard</span>
          </NavLink>
          
          <div className="nav-group">
            <p className="nav-group-title">AUTHORITY TOOLS</p>
            <a href="#" className="nav-item disabled">
              <FileText size={20} />
              <span>All Reports</span>
            </a>
            <a href="#" className="nav-item disabled">
              <Activity size={20} />
              <span>Hotspot Analysis</span>
            </a>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              <User size={16} />
            </div>
            <div className="user-info">
              <p className="user-name">Gov. Official</p>
              <p className="user-role">Disaster Mgmt</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="header">
          <button className="menu-btn d-mobile-only">
            <Menu size={24} />
          </button>
          <div className="header-right">
            {/* Additional header items could go here */}
            <span className="system-status">
              <span className="status-dot"></span>
              System Normal
            </span>
          </div>
        </header>
        
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
