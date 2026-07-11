import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // addNotification takes a message and automatically removes it after 3 seconds from the "popup" queue, 
  // but wait, the user said: "pop up in the notifcation bell for 3 se and show a notiftication bubble and it should be there as long i press x near that msg"
  // Let's interpret this as:
  // 1. A badge on the bell icon appears and stays until dismissed.
  // 2. The dropdown opens automatically for 3 seconds to show it, or a toast pops up for 3 seconds.
  // I will just use this state for the persistent list that requires an 'X' to remove.
  // For the 3-second popup, I can use a separate state `activePopup` that sets to true for 3 seconds.

  const [activePopup, setActivePopup] = useState(false);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [{ id, message, read: false }, ...prev]);
    
    // Trigger popup
    setActivePopup(true);
    setTimeout(() => {
      setActivePopup(false);
    }, 3000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    activePopup,
    setActivePopup
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
