import React, { useState } from 'react';
import { useQuests } from '../../context/QuestContext';
import { motion } from 'framer-motion';
import { FaPlus, FaCheck, FaTrash, FaSync, FaEdit, FaSave } from 'react-icons/fa';
import './Quests.css';

export default function Quests() {
  const { quests, addQuest, completeQuest, deleteQuest, updateQuest, resetDailies } = useQuests();
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestXP, setNewQuestXP] = useState(20);
  const [newQuestCategory, setNewQuestCategory] = useState('daily');

  const [editingQuestId, setEditingQuestId] = useState(null);
  const [editQuestForm, setEditQuestForm] = useState({ title: '', xp: 20, category: 'daily' });

  const startEditing = (quest) => {
    setEditingQuestId(quest.id);
    setEditQuestForm({ title: quest.title, xp: quest.xp, category: quest.category });
  };

  const saveEdit = (id) => {
    updateQuest(id, { 
      title: editQuestForm.title, 
      xp: parseInt(editQuestForm.xp, 10), 
      category: editQuestForm.category 
    });
    setEditingQuestId(null);
  };

  const handleAddQuest = (e) => {
    e.preventDefault();
    if (!newQuestTitle.trim()) return;
    addQuest({
      title: newQuestTitle,
      xp: parseInt(newQuestXP, 10),
      category: newQuestCategory,
      difficulty: 'medium'
    });
    setNewQuestTitle('');
  };

  return (
    <motion.div 
      className="quests-container"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="quests-header pixel-panel">
        <h2>Quests</h2>
        <button onClick={resetDailies} className="btn-accent">
          <FaSync /> Reset Dailies
        </button>
      </div>

      <div className="quests-content">
        <form className="add-quest-form pixel-panel" onSubmit={handleAddQuest}>
          <h3>New Quest</h3>
          <input 
            type="text" 
            placeholder="Quest Title" 
            value={newQuestTitle}
            onChange={(e) => setNewQuestTitle(e.target.value)}
          />
          <div className="form-row">
            <input 
              type="number" 
              placeholder="XP" 
              value={newQuestXP}
              onChange={(e) => setNewQuestXP(e.target.value)}
              min="5" max="1000"
            />
            <select 
              value={newQuestCategory}
              onChange={(e) => setNewQuestCategory(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="epic">Epic</option>
            </select>
            <button type="submit" className="btn-primary"><FaPlus /> Add</button>
          </div>
        </form>

        <div className="quests-list">
          {quests.length === 0 ? (
            <div className="pixel-panel empty-state">No active quests. Add one to start earning XP!</div>
          ) : (
            quests.map(quest => (
              <motion.div 
                key={quest.id} 
                className={`quest-card pixel-panel ${quest.completed ? 'completed' : ''}`}
                layout
              >
                {editingQuestId === quest.id ? (
                  <div className="quest-info" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <input 
                      type="text" 
                      value={editQuestForm.title}
                      onChange={(e) => setEditQuestForm({...editQuestForm, title: e.target.value})}
                      style={{ fontSize: '0.9rem', padding: '0.3rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="number" 
                        value={editQuestForm.xp}
                        onChange={(e) => setEditQuestForm({...editQuestForm, xp: e.target.value})}
                        style={{ width: '80px', fontSize: '0.8rem', padding: '0.2rem' }}
                      />
                      <select 
                        value={editQuestForm.category}
                        onChange={(e) => setEditQuestForm({...editQuestForm, category: e.target.value})}
                        style={{ fontSize: '0.8rem', padding: '0.2rem' }}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="epic">Epic</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="quest-info">
                    <h4>{quest.title}</h4>
                    <div className="quest-meta">
                      <span className="quest-category">{quest.category}</span>
                      <span className="quest-xp">+{quest.xp} XP</span>
                    </div>
                  </div>
                )}
                
                <div className="quest-actions">
                  {editingQuestId === quest.id ? (
                    <button className="btn-accent" onClick={() => saveEdit(quest.id)}>
                      <FaSave />
                    </button>
                  ) : (
                    <>
                      {!quest.completed && (
                        <button className="btn-primary" onClick={() => completeQuest(quest.id)}>
                          <FaCheck />
                        </button>
                      )}
                      {!quest.completed && (
                        <button className="btn-accent" onClick={() => startEditing(quest)}>
                          <FaEdit />
                        </button>
                      )}
                      <button className="btn-danger" onClick={() => deleteQuest(quest.id)}>
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
