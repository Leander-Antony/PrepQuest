import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useXP } from './XPContext';

const PlacementContext = createContext();

export function usePlacements() {
  return useContext(PlacementContext);
}

export function PlacementProvider({ children }) {
  const [bosses, setBosses] = useLocalStorage('craftquest_bosses', []);
  const { addXP } = useXP();

  const addBoss = (boss) => {
    setBosses([...bosses, { ...boss, id: Date.now(), hp: 100, status: 'Applying' }]);
  };

  const attackBoss = (id, damage, newStatus) => {
    setBosses(bosses.map(b => {
      if (b.id === id) {
        const newHp = Math.max(0, b.hp - damage);
        if (newHp === 0 && b.hp > 0) {
          addXP(500); // Defeated boss!
        } else {
          addXP(50); // Progress made
        }
        return { ...b, hp: newHp, status: newStatus || b.status };
      }
      return b;
    }));
  };

  const deleteBoss = (id) => {
    setBosses(bosses.filter(b => b.id !== id));
  };

  const value = {
    bosses,
    addBoss,
    attackBoss,
    deleteBoss
  };

  return <PlacementContext.Provider value={value}>{children}</PlacementContext.Provider>;
}
