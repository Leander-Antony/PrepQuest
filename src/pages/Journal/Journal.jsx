import React, { useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaPlus, FaTrash } from 'react-icons/fa';
import './Journal.css';

export default function Journal() {
  const { entries, addEntry, deleteEntry } = useJournal();
  const [text, setText] = useState('');
  const [mood, setMood] = useState('Neutral');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addEntry({ date: new Date().toISOString().split('T')[0], text, mood });
    setText('');
    setMood('Neutral');
  };

  return (
    <motion.div 
      className="journal-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="journal-header pixel-panel">
        <h2>Adventure Log</h2>
      </div>

      <div className="journal-content">
        <form className="add-entry-form pixel-panel" onSubmit={handleSubmit}>
          <h3>Write Entry</h3>
          <div className="form-row">
            <select value={mood} onChange={e => setMood(e.target.value)}>
              <option value="Happy">Happy</option>
              <option value="Neutral">Neutral</option>
              <option value="Stressed">Stressed</option>
              <option value="Motivated">Motivated</option>
            </select>
          </div>
          <textarea 
            placeholder="Today I learned..."
            value={text}
            onChange={e => setText(e.target.value)}
            rows="5"
          ></textarea>
          <button type="submit" className="btn-primary"><FaPlus /> Save Entry</button>
        </form>

        <div className="entries-list">
          <AnimatePresence>
            {entries.map(entry => (
              <motion.div 
                key={entry.id} 
                className="entry-card pixel-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
              >
                <div className="entry-header">
                  <div className="entry-meta">
                    <span className="entry-date"><FaBook /> {entry.date}</span>
                    <span className="entry-mood tag">{entry.mood}</span>
                  </div>
                  <button className="btn-danger" onClick={() => deleteEntry(entry.id)}>
                    <FaTrash />
                  </button>
                </div>
                <p className="entry-text">{entry.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
