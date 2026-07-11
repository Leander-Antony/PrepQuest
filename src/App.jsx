import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Quests from './pages/Quests/Quests';
import Skills from './pages/Skills/Skills';
import Inventory from './pages/Inventory/Inventory';
import Projects from './pages/Projects/Projects';
import Placements from './pages/Placements/Placements';
import Journal from './pages/Journal/Journal';
import Statistics from './pages/Statistics/Statistics';
import Achievements from './pages/Achievements/Achievements';
import AchievementGuide from './pages/Achievements/AchievementGuide';
import Settings from './pages/Settings/Settings';
import Landing from './pages/Landing/Landing';

// We will add pages and layout here as we build them.
// For now, a simple placeholder.

function PlaceholderPage({ title }) {
  return (
    <div className="pixel-panel" style={{ margin: '2rem' }}>
      <h1>{title}</h1>
      <p>This is the {title} page.</p>
    </div>
  );
}

function App() {
  const isElectron = navigator.userAgent.includes('Electron') || navigator.userAgent.includes('PrepQuest-Electron');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isElectron ? <Navigate to="/dashboard" replace /> : <Landing />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quests" element={<Quests />} />
          <Route path="skills" element={<Skills />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="projects" element={<Projects />} />
          <Route path="placements" element={<Placements />} />
          <Route path="journal" element={<Journal />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="achievements/guide" element={<AchievementGuide />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
