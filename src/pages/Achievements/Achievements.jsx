import React from 'react';
import { useAchievements } from '../../context/AchievementContext';
import { motion } from 'framer-motion';
import { FaTrophy, FaLock, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Achievements.css';

export default function Achievements() {
  const { achievements, unlockAchievement } = useAchievements();

  return (
    <motion.div 
      className="achievements-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="achievements-header pixel-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Trophy Room</h2>
        <Link to="/achievements/guide" className="icon-btn" title="Achievement Guide" style={{ color: 'var(--color-accent-diamond)', display: 'flex', alignItems: 'center' }}>
          <FaInfoCircle size={24} />
        </Link>
      </div>

      <div className="achievements-grid">
        {achievements.map(achievement => (
          <motion.div 
            key={achievement.id} 
            className={`achievement-card pixel-panel ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="achievement-icon">
              {achievement.unlocked ? <FaTrophy size={40} /> : <FaLock size={40} />}
            </div>
            <div className="achievement-info">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <div className="achievement-reward">
                Reward: <span>+{achievement.xpReward} XP</span>
              </div>
            </div>
            
            {/* DEV TOOL: button to unlock for testing */}
            {!achievement.unlocked && (
              <button 
                className="btn-stone dev-unlock-btn" 
                onClick={() => unlockAchievement(achievement.id)}
              >
                Dev Unlock
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
