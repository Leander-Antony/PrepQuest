import React, { useState } from 'react';
import { useSkills } from '../../context/SkillContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaLevelUpAlt } from 'react-icons/fa';
import './Skills.css';

export default function Skills() {
  const { skills, addSkill, addSkillXP, deleteSkill } = useSkills();
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('frontend');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({ name: newSkillName, category: newSkillCategory });
    setNewSkillName('');
  };

  return (
    <motion.div 
      className="skills-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="skills-header pixel-panel">
        <h2>Skill Tree</h2>
      </div>

      <div className="skills-content">
        <form className="add-skill-form pixel-panel" onSubmit={handleAddSkill}>
          <h3>Learn New Skill</h3>
          <div className="form-row">
            <input 
              type="text" 
              placeholder="Skill Name (e.g., Python)" 
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
            />
            <select 
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="tools">Tools / DevOps</option>
              <option value="soft">Soft Skills</option>
            </select>
            <button type="submit" className="btn-primary"><FaPlus /> Add</button>
          </div>
        </form>

        <div className="skills-grid">
          <AnimatePresence>
            {skills.map(skill => (
              <motion.div 
                key={skill.id} 
                className="skill-card pixel-panel"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="skill-header">
                  <h4>{skill.name}</h4>
                  <span className="skill-level">Lvl {skill.level}</span>
                </div>
                <p className="skill-category">{skill.category}</p>
                
                <div className="skill-progress">
                  <div className="xp-bar-container">
                    <div 
                      className="xp-bar-fill" 
                      style={{ width: `${(skill.xp / (skill.level * 100)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="xp-text">{skill.xp} / {skill.level * 100} XP</p>
                </div>

                <div className="skill-actions">
                  <button className="btn-accent" onClick={() => addSkillXP(skill.id, 50)}>
                    <FaLevelUpAlt /> +50 XP
                  </button>
                  <button className="btn-danger" onClick={() => deleteSkill(skill.id)}>
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
