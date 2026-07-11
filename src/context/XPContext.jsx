import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const XPContext = createContext();

export function useXP() {
  return useContext(XPContext);
}

export function XPProvider({ children }) {
  const [xp, setXp] = useLocalStorage('craftquest_xp', 0);
  const [level, setLevel] = useLocalStorage('craftquest_level', 1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const xpRef = useRef(xp);
  const levelRef = useRef(level);

  useEffect(() => {
    xpRef.current = xp;
    levelRef.current = level;
  }, [xp, level]);

  // Leveling algorithm: Next level requires (currentLevel * 100) XP
  // Example: Level 1 -> 2 requires 100 XP.
  // Level 2 -> 3 requires 200 XP.
  const getXpNeededForNextLevel = (currentLevel) => {
    return currentLevel * 100;
  };

  const addXP = (amount) => {
    let currentXp = xpRef.current + amount;
    let currentLevel = levelRef.current;
    let leveledUp = false;

    while (currentXp >= getXpNeededForNextLevel(currentLevel)) {
      currentXp -= getXpNeededForNextLevel(currentLevel);
      currentLevel += 1;
      leveledUp = true;
    }

    xpRef.current = currentXp;
    levelRef.current = currentLevel;

    setXp(currentXp);
    
    if (leveledUp) {
      setLevel(currentLevel);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000); // hide animation after 3s
    }
  };

  const xpNeeded = getXpNeededForNextLevel(level);
  const xpPercentage = (xp / xpNeeded) * 100;

  const value = {
    xp,
    level,
    xpNeeded,
    xpPercentage,
    addXP,
    showLevelUp
  };

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
}
