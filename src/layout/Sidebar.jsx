import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaTasks, 
  FaBook, 
  FaTrophy, 
  FaChartBar, 
  FaCog, 
  FaBriefcase, 
  FaSkullCrossbones,
  FaCubes,
  FaUserCircle
} from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { useXP } from '../context/XPContext';

export default function Sidebar() {
  const { user } = useUser();
  const { level, xp, xpNeeded } = useXP();
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Quests', path: '/quests', icon: <FaTasks /> },
    { name: 'Skills', path: '/skills', icon: <FaBook /> },
    { name: 'Inventory', path: '/inventory', icon: <FaCubes /> },
    { name: 'Projects', path: '/projects', icon: <FaBriefcase /> },
    { name: 'Placements', path: '/placements', icon: <FaSkullCrossbones /> },
    { name: 'Journal', path: '/journal', icon: <FaBook /> },
    { name: 'Achievements', path: '/achievements', icon: <FaTrophy /> },
    { name: 'Statistics', path: '/statistics', icon: <FaChartBar /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ];

  return (
    <aside className="sidebar pixel-panel">
      <div className="sidebar-brand">
        <h2 className="brand-title">PrepQuest</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-profile" style={{ marginTop: 'auto', padding: '1rem', borderTop: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FaUserCircle size={32} style={{ color: 'var(--color-stone)' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--color-accent-diamond)' }}>{user.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Lvl {level} • {xp}/{xpNeeded} XP</div>
        </div>
      </div>
    </aside>
  );
}
