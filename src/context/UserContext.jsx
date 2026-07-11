import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('craftquest_user', {
    name: 'Player 1',
    avatar: 'default',
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0]
  });

  // Function to update daily streak
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (user.lastActiveDate !== today || user.streak === 0) {
      let newStreak = user.streak;
      
      if (user.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (user.lastActiveDate === yesterdayStr) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      } else if (user.streak === 0) {
        newStreak = 1;
      }
      
      setUser(prev => ({
        ...prev,
        streak: newStreak,
        lastActiveDate: today
      }));
    }
  };

  const value = {
    user,
    setUser,
    updateStreak
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
