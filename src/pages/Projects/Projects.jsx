import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import './Projects.css';

export default function Projects() {
  const { projects, addProject, updateProjectProgress, deleteProject } = useProjects();
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectStack, setNewProjectStack] = useState('');
  const [newProjectLink, setNewProjectLink] = useState('');

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    addProject({ title: newProjectName, stack: newProjectStack, link: newProjectLink, description: 'New project' });
    setNewProjectName('');
    setNewProjectStack('');
    setNewProjectLink('');
  };

  return (
    <motion.div 
      className="projects-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="projects-header pixel-panel">
        <h2>Project Portfolio</h2>
      </div>

      <form className="add-project-form pixel-panel" onSubmit={handleAddProject}>
        <h3>New Project</h3>
        <div className="form-row">
          <input 
            type="text" 
            placeholder="Project Title" 
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Tech Stack (e.g., React, Node)" 
            value={newProjectStack}
            onChange={(e) => setNewProjectStack(e.target.value)}
          />
          <input 
            type="url" 
            placeholder="Project Link (Optional)" 
            value={newProjectLink}
            onChange={(e) => setNewProjectLink(e.target.value)}
          />
          <button type="submit" className="btn-primary"><FaPlus /> Create</button>
        </div>
      </form>

      <div className="projects-grid">
        <AnimatePresence>
          {projects.map(project => (
            <motion.div 
              key={project.id} 
              className="project-card pixel-panel"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className={`status-badge ${project.status}`}>{project.status}</span>
              </div>
              <p className="project-stack"><strong>Stack:</strong> {project.stack}</p>
              {project.link && (
                <p className="project-link">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">View Project ↗</a>
                </p>
              )}
              
              <div className="project-progress">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="progress-controls">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={project.progress} 
                    onChange={(e) => updateProjectProgress(project.id, parseInt(e.target.value))}
                  />
                  <span>{project.progress}%</span>
                </div>
              </div>

              <div className="project-actions">
                {project.progress < 100 && (
                  <button className="btn-accent" onClick={() => updateProjectProgress(project.id, 100)}>
                    <FaCheck /> Mark Complete
                  </button>
                )}
                <button className="btn-danger" onClick={() => deleteProject(project.id)}>
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
