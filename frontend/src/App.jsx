import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StitchLayout from './components/StitchLayout';
import DashboardPage from './pages/DashboardPage';
import ReportHazardPage from './pages/ReportHazardPage';
import MonitoringPage from './pages/MonitoringPage';
import EmergencyActivationPage from './pages/EmergencyActivationPage';
import EmergencyChecklistPage from './pages/EmergencyChecklistPage';
import EvacuationMonitorPage from './pages/EvacuationMonitorPage';
import EmergencySummaryPage from './pages/EmergencySummaryPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StitchLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/report" element={<ReportHazardPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/emergency/activation" element={<EmergencyActivationPage />} />
          <Route path="/emergency/checklist" element={<EmergencyChecklistPage />} />
          <Route path="/emergency/evacuation" element={<EvacuationMonitorPage />} />
          <Route path="/emergency/summary" element={<EmergencySummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
