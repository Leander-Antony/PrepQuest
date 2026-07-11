import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const JournalContext = createContext();

export function useJournal() {
  return useContext(JournalContext);
}

export function JournalProvider({ children }) {
  const [entries, setEntries] = useLocalStorage('craftquest_journal', []);

  const addEntry = (entry) => {
    setEntries([{ ...entry, id: Date.now() }, ...entries]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const value = {
    entries,
    addEntry,
    deleteEntry
  };

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}
