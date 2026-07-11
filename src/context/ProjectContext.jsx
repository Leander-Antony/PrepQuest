import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useXP } from './XPContext';
import { useActivity } from './ActivityContext';

const ProjectContext = createContext();

export function useProjects() {
  return useContext(ProjectContext);
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useLocalStorage('craftquest_projects', []);
  const { addXP } = useXP();
  const { logActivity } = useActivity();

  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now(), progress: 0, status: 'planning' }]);
  };

  const updateProjectProgress = (id, progress) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        if (progress === 100 && p.progress !== 100) {
          addXP(100); // Reward for completing a project
          logActivity(); // Track for heatmap
          return { ...p, progress, status: 'completed' };
        }
        return { ...p, progress, status: progress > 0 ? 'in-progress' : 'planning' };
      }
      return p;
    }));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const value = {
    projects,
    addProject,
    updateProjectProgress,
    deleteProject
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
