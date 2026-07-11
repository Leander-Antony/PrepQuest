import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SkillContext = createContext();

export function useSkills() {
  return useContext(SkillContext);
}

export function SkillProvider({ children }) {
  const [skills, setSkills] = useLocalStorage('craftquest_skills', []);

  const addSkill = (skill) => {
    setSkills([...skills, { ...skill, id: Date.now(), level: 1, xp: 0 }]);
  };

  const updateSkill = (id, updatedData) => {
    setSkills(skills.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const addSkillXP = (id, amount) => {
    setSkills(skills.map(s => {
      if (s.id === id) {
        let newXp = s.xp + amount;
        let newLevel = s.level;
        let xpNeeded = s.level * 100;

        while (newXp >= xpNeeded) {
          newXp -= xpNeeded;
          newLevel += 1;
          xpNeeded = newLevel * 100;
        }

        return { ...s, xp: newXp, level: newLevel };
      }
      return s;
    }));
  };

  const value = {
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    addSkillXP
  };

  return <SkillContext.Provider value={value}>{children}</SkillContext.Provider>;
}
