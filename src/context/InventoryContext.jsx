import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const InventoryContext = createContext();

export function useInventory() {
  return useContext(InventoryContext);
}

export function InventoryProvider({ children }) {
  const [items, setItems] = useLocalStorage('craftquest_inventory', []);

  const addItem = (item) => {
    setItems([...items, { ...item, id: Date.now() }]);
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const value = {
    items,
    addItem,
    deleteItem
  };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}
