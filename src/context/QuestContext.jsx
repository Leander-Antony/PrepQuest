import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useXP } from './XPContext';
import { useActivity } from './ActivityContext';

const QuestContext = createContext();

export function useQuests() {
  return useContext(QuestContext);
}

export function QuestProvider({ children }) {
  const [quests, setQuests] = useLocalStorage('craftquest_quests', []);
  const { addXP } = useXP();
  const { logActivity } = useActivity();

  const addQuest = (quest) => {
    setQuests([...quests, { ...quest, id: Date.now(), completed: false }]);
  };

  const updateQuest = (id, updatedData) => {
    setQuests(quests.map(q => q.id === id ? { ...q, ...updatedData } : q));
  };

  const deleteQuest = (id) => {
    setQuests(quests.filter(q => q.id !== id));
  };

  const completeQuest = (id) => {
    const quest = quests.find(q => q.id === id);
    if (quest && !quest.completed) {
      updateQuest(id, { completed: true });
      addXP(quest.xp || 20); // default 20 XP
      logActivity(); // Track for heatmap
    }
  };

  const resetDailies = () => {
    setQuests(quests.map(q => (q.category === 'daily' ? { ...q, completed: false } : q)));
  };

  const value = {
    quests,
    addQuest,
    updateQuest,
    deleteQuest,
    completeQuest,
    resetDailies
  };

  return <QuestContext.Provider value={value}>{children}</QuestContext.Provider>;
}
