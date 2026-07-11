import React, { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaDownload, FaUpload, FaTrash, FaPalette } from 'react-icons/fa';
import './Settings.css';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef(null);

  const handleExport = () => {
    // Gather all local storage keys starting with 'craftquest_'
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('craftquest_')) {
        data[key] = JSON.parse(localStorage.getItem(key));
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `craftquest_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        for (const key in data) {
          if (key.startsWith('craftquest_')) {
            localStorage.setItem(key, JSON.stringify(data[key]));
          }
        }
        alert('Data imported successfully! The app will now reload.');
        window.location.reload();
      } catch (err) {
        alert('Failed to parse the backup file. Is it a valid JSON?');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all your progress? This cannot be undone!")) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('craftquest_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
      alert('App data reset. Reloading...');
      window.location.reload();
    }
  };

  return (
    <motion.div 
      className="settings-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="settings-header pixel-panel">
        <h2>Game Settings</h2>
      </div>

      <div className="settings-content">
        <section className="settings-section pixel-panel">
          <h3>Display</h3>
          <div className="setting-item">
            <div>
              <h4>Theme Toggle</h4>
              <p>Switch between Light and Dark mode.</p>
            </div>
            <button className="btn-primary" onClick={toggleTheme}>
              <FaPalette /> {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </section>

        <section className="settings-section pixel-panel">
          <h3>Data Management</h3>
          
          <div className="setting-item">
            <div>
              <h4>Export Data</h4>
              <p>Download a backup of all your progress, quests, and stats.</p>
            </div>
            <button className="btn-accent" onClick={handleExport}>
              <FaDownload /> Export Save
            </button>
          </div>

          <div className="setting-item">
            <div>
              <h4>Import Data</h4>
              <p>Restore your progress from a previous backup file.</p>
            </div>
            <input 
              type="file" 
              accept=".json" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleImport}
            />
            <button className="btn-primary" onClick={() => fileInputRef.current.click()}>
              <FaUpload /> Import Save
            </button>
          </div>

          <div className="setting-item danger-zone">
            <div>
              <h4>Reset Progress</h4>
              <p>Permanently delete all local data. Be careful!</p>
            </div>
            <button className="btn-danger" onClick={handleReset}>
              <FaTrash /> Delete Save
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
