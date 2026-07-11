import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('craftquest_theme', 'dark'); // default dark

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--color-bg-primary', '#e0e0e0');
      document.documentElement.style.setProperty('--color-bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--color-text-main', '#1e1e1e');
      document.documentElement.style.setProperty('--color-text-muted', '#616161');
      document.documentElement.style.setProperty('--color-border', '#1e1e1e');
    } else {
      // Dark mode defaults
      document.documentElement.style.setProperty('--color-bg-primary', '#1e1e1e');
      document.documentElement.style.setProperty('--color-bg-secondary', '#2d2d2d');
      document.documentElement.style.setProperty('--color-text-main', '#ffffff');
      document.documentElement.style.setProperty('--color-text-muted', '#b0bec5');
      document.documentElement.style.setProperty('--color-border', '#000000');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
