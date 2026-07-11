import React from 'react';
import { useAchievements } from '../../context/AchievementContext';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Achievements.css'; // Reuse Achievements CSS

export default function AchievementGuide() {
  const { achievements } = useAchievements();

  return (
    <motion.div 
      className="achievements-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="achievements-header pixel-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/achievements" className="btn-stone" style={{ textDecoration: 'none' }}>
          <FaArrowLeft /> Back
        </Link>
        <h2 style={{ margin: 0 }}>Achievement Guide</h2>
      </div>

      <div className="pixel-panel">
        <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
          This guide explains how to unlock all the achievements in PrepQuest.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {achievements.map(achievement => (
            <div key={achievement.id} style={{ borderBottom: '1px dashed var(--color-border)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-accent-diamond)' }}>{achievement.title}</h3>
                <span className="tag" style={{ backgroundColor: 'var(--color-xp)', color: 'white' }}>+{achievement.xpReward} XP</span>
              </div>
              <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.1rem', margin: 0 }}>
                <strong>How to unlock:</strong> {achievement.description}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-stone)', marginTop: '0.5rem' }}>
                Status: {achievement.unlocked ? '✅ Unlocked' : '❌ Locked'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
