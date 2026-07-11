import React, { useState } from 'react';
import { usePlacements } from '../../context/PlacementContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaCrosshairs, FaTrash, FaTrophy } from 'react-icons/fa';
import './Placements.css';

export default function Placements() {
  const { bosses, addBoss, attackBoss, deleteBoss } = usePlacements();
  const [newBossName, setNewBossName] = useState('');
  const [newBossDate, setNewBossDate] = useState('');

  const handleAddBoss = (e) => {
    e.preventDefault();
    if (!newBossName.trim()) return;
    addBoss({ name: newBossName, date: newBossDate });
    setNewBossName('');
    setNewBossDate('');
  };

  const attack = (id) => {
    // Generate random damage between 10 and 25
    const damage = Math.floor(Math.random() * 16) + 10;
    attackBoss(id, damage);
  };

  return (
    <motion.div 
      className="placements-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="placements-header pixel-panel">
        <h2>Placement Bosses</h2>
      </div>

      <form className="add-boss-form pixel-panel" onSubmit={handleAddBoss}>
        <h3>Summon Boss (Company)</h3>
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Company Name" 
            value={newBossName}
            onChange={(e) => setNewBossName(e.target.value)}
          />
          <input 
            type="date" 
            value={newBossDate}
            onChange={(e) => setNewBossDate(e.target.value)}
          />
          <button type="submit" className="btn-primary"><FaPlus /> Summon</button>
        </div>
      </form>

      <div className="boss-grid">
        <AnimatePresence>
          {bosses.map(boss => (
            <motion.div 
              key={boss.id} 
              className={`boss-card pixel-panel ${boss.hp === 0 ? 'defeated' : ''}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {boss.hp === 0 && <div className="defeated-stamp">DEFEATED</div>}
              
              <div className="boss-header">
                <h3>{boss.name}</h3>
                <span className="boss-date">{boss.date}</span>
              </div>
              
              <div className="boss-sprite-placeholder">
                {boss.hp > 0 ? (
                  <div className="boss-avatar bg-enemy" />
                ) : (
                  <div className="boss-avatar bg-dead"><FaTrophy size={40} color="var(--color-accent)" /></div>
                )}
              </div>

              <div className="boss-hp">
                <div className="hp-bar-container">
                  <div 
                    className="hp-bar-fill" 
                    style={{ width: `${boss.hp}%` }}
                  ></div>
                </div>
                <p className="hp-text">{boss.hp} / 100 HP</p>
              </div>
              
              <div className="boss-status">
                <strong>Status:</strong>
                <select 
                  value={boss.status} 
                  onChange={(e) => attackBoss(boss.id, 0, e.target.value)}
                  disabled={boss.hp === 0}
                >
                  <option value="Applying">Applying</option>
                  <option value="OA Pending">OA Pending</option>
                  <option value="Tech Round">Tech Round</option>
                  <option value="HR Round">HR Round</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="boss-actions">
                <button 
                  className="btn-danger attack-btn" 
                  onClick={() => attack(boss.id)}
                  disabled={boss.hp === 0}
                >
                  <FaCrosshairs /> Attack (Prep)
                </button>
                <button className="btn-stone" onClick={() => deleteBoss(boss.id)}>
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
