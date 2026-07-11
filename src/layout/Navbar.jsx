import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaTimes } from 'react-icons/fa';
import { useXP } from '../context/XPContext';
import { useUser } from '../context/UserContext';
import { useQuests } from '../context/QuestContext';
import { useNotification } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { level, xpPercentage } = useXP();
  const { user, setUser } = useUser();
  const { quests } = useQuests();
  const { notifications, removeNotification, activePopup } = useNotification();
  const activeQuests = quests.filter(q => !q.completed);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);

  // Auto-open notification dropdown when activePopup turns true
  useEffect(() => {
    if (activePopup) {
      setShowNotifications(true);
    }
  }, [activePopup]);

  const saveProfile = () => {
    setUser({ ...user, name: editName });
    setIsEditingProfile(false);
  };

  return (
    <header className="navbar pixel-panel">
      <div className="nav-left">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search quests, skills..." />
        </div>
      </div>
      
      <div className="nav-right">
        <div className="stats-preview">
          <div className="level-badge">Lvl {level}</div>
          <div className="xp-bar-mini">
            <div className="xp-fill-mini" style={{ width: `${Math.min(xpPercentage, 100)}%` }}></div>
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)} style={{ position: 'relative' }}>
            <FaBell />
            {notifications.length > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: 'var(--color-danger)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.6rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {notifications.length}
              </motion.span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                className="pixel-panel dropdown-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ position: 'absolute', top: '100%', right: 0, width: '320px', zIndex: 100 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>Notifications</h4>
                  <button className="close-btn" style={{ position: 'static' }} onClick={() => setShowNotifications(false)}><FaTimes /></button>
                </div>
                <div style={{ color: 'var(--color-text-main)', fontSize: '0.9rem' }}>
                  
                  {notifications.length > 0 ? (
                    <div style={{ marginBottom: '1rem' }}>
                      {notifications.map(n => (
                        <motion.div 
                          key={n.id} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          layout
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            padding: '0.5rem', 
                            backgroundColor: 'var(--color-bg-primary)', 
                            border: '1px solid var(--color-border)',
                            marginBottom: '0.5rem'
                          }}
                        >
                          <span style={{ flex: 1, fontSize: '0.8rem' }}>{n.message}</span>
                          <button onClick={() => removeNotification(n.id)} style={{ background: 'none', border: 'none', color: 'var(--color-stone)', cursor: 'pointer' }}><FaTimes /></button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>No new notifications.</div>
                  )}

                  <div style={{ color: 'var(--color-text-muted)', borderTop: '2px dashed var(--color-border)', paddingTop: '0.5rem' }}>
                    <p style={{ padding: '0.5rem 0' }}>🔔 Welcome back to PrepQuest!</p>
                    <p style={{ padding: '0.5rem 0' }}>🔔 Keep your streak alive today.</p>
                    
                    {activeQuests.length > 0 && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <strong style={{ color: 'var(--color-xp)' }}>Pending Quests:</strong>
                        <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                          {activeQuests.map(q => (
                            <li key={q.id}>{q.title}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowProfile(true)}>
            <FaUserCircle />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                className="pixel-panel dropdown-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ position: 'absolute', top: '100%', right: 0, width: '300px', zIndex: 100 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  {isEditingProfile ? (
                    <input 
                      type="text" 
                      value={editName} 
                      onChange={(e) => setEditName(e.target.value)}
                      style={{ flex: 1, marginRight: '0.5rem', fontSize: '0.9rem', padding: '0.3rem' }}
                      autoFocus
                    />
                  ) : (
                    <h4 style={{ margin: 0, color: 'var(--color-accent-diamond)' }}>{user.name}</h4>
                  )}
                  <button className="close-btn" style={{ position: 'static' }} onClick={() => { setShowProfile(false); setIsEditingProfile(false); }}><FaTimes /></button>
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <p>Level: {level}</p>
                  <p style={{ color: 'var(--color-xp)' }}>Streak: {user.streak} Days</p>
                </div>
                {isEditingProfile ? (
                  <button className="btn-primary" style={{ width: '100%' }} onClick={saveProfile}>Save Name</button>
                ) : (
                  <button className="btn-accent" style={{ width: '100%' }} onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
