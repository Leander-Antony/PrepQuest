import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobe, FaWindows } from 'react-icons/fa';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <motion.div 
        className="landing-content pixel-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="landing-title">PrepQuest</h1>
        <p className="landing-subtitle">
          Level up your career preparation. Gamify your learning, projects, and interview prep in a retro 8-bit RPG experience.
        </p>

        <div className="landing-actions">
          <button onClick={() => navigate('/dashboard')} className="landing-btn landing-btn-web">
            <FaGlobe style={{ marginRight: '10px' }} />
            Launch Web Version
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <a href="#" onClick={(e) => e.preventDefault()} className="landing-btn landing-btn-desktop" style={{ opacity: 0.7, cursor: 'not-allowed', display: 'inline-block' }}>
              <FaWindows style={{ marginRight: '10px' }} />
              Download Windows App
            </a>
            <span className="coming-soon">(Placeholder - Build via npm run electron:build)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
