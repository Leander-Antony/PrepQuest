import React from 'react';
import { useXP } from '../../context/XPContext';
import { useUser } from '../../context/UserContext';
import { useQuests } from '../../context/QuestContext';
import { useProjects } from '../../context/ProjectContext';
import { useSkills } from '../../context/SkillContext';
import { usePlacements } from '../../context/PlacementContext';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import './Dashboard.css';

export default function Dashboard() {
  const { xp, level, xpNeeded, xpPercentage, addXP, showLevelUp } = useXP();
  const { user } = useUser();
  const { quests, completeQuest } = useQuests();
  const { projects } = useProjects();
  const { skills } = useSkills();
  const { bosses } = usePlacements();

  const activeDailyQuests = quests.filter(q => q.category === 'daily' && !q.completed);
  const activeBoss = bosses.find(b => b.hp > 0) || null;
  const completedTasksCount = quests.filter(q => q.completed).length;

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="dashboard-header pixel-panel">
        <div className="player-info">
          <div className="avatar-placeholder"></div>
          <div>
            <h1>{user.name}</h1>
            <p className="streak-text">🔥 Streak: {user.streak} days</p>
          </div>
        </div>
        
        <div className="level-info">
          <h2 className="level-text">Level {level}</h2>
          <div className="xp-bar-container">
            <div className="xp-bar-fill" style={{ width: `${Math.min(xpPercentage, 100)}%` }}></div>
          </div>
          <p className="xp-text">{xp} / {xpNeeded} XP</p>
          {showLevelUp && <div className="level-up-anim">LEVEL UP!</div>}
        </div>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-section pixel-panel">
          <h3>Today's Quests</h3>
          <ul className="quest-list">
            {activeDailyQuests.length > 0 ? (
              activeDailyQuests.map(quest => (
                <li key={quest.id} className="quest-item">
                  <span>{quest.title}</span>
                  <button onClick={() => completeQuest(quest.id)} className="btn-primary">
                    <FaCheck /> {quest.xp} XP
                  </button>
                </li>
              ))
            ) : (
              <li className="quest-item" style={{ justifyContent: 'center', color: 'var(--color-text-muted)' }}>
                No active daily quests. Add some!
              </li>
            )}
          </ul>
        </section>

        <section className="dashboard-section pixel-panel">
          <h3>Current Boss (Placement)</h3>
          {activeBoss ? (
            <div className="boss-placeholder">
              <h4>{activeBoss.name} - {activeBoss.status}</h4>
              <div className="hp-bar-container">
                <div className="hp-bar-fill" style={{ width: `${activeBoss.hp}%` }}></div>
              </div>
              <p className="hp-text">{activeBoss.hp}% HP Remaining</p>
            </div>
          ) : (
            <div className="boss-placeholder" style={{ color: 'var(--color-text-muted)', marginTop: '2rem' }}>
              No active bosses. Summon one!
            </div>
          )}
        </section>

        <section className="dashboard-section pixel-panel">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Tasks Done</h4>
              <p>{completedTasksCount}</p>
            </div>
            <div className="stat-card">
              <h4>Projects</h4>
              <p>{projects.length}</p>
            </div>
            <div className="stat-card">
              <h4>Skills</h4>
              <p>{skills.length}</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
