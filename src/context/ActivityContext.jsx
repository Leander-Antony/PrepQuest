import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ActivityContext = createContext();

export function useActivity() {
  return useContext(ActivityContext);
}

export function ActivityProvider({ children }) {
  // activityLog structure: { 'YYYY-MM-DD': count }
  const [activityLog, setActivityLog] = useLocalStorage('craftquest_activity', {});

  const logActivity = () => {
    const today = new Date().toISOString().split('T')[0];
    setActivityLog(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + 1
    }));
  };

  const getRecentActivity = (days = 365) => {
    // We will compute this in the component, but we just export the log here
    return activityLog;
  };

  const value = {
    activityLog,
    logActivity
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}
