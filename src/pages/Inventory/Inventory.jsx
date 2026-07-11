import React, { useState } from 'react';
import { useInventory } from '../../context/InventoryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlus } from 'react-icons/fa';
import './Inventory.css';

export default function Inventory() {
  const { items, addItem, deleteItem } = useInventory();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemForm, setNewItemForm] = useState({ name: '', type: 'resource', description: '', rarity: 'common', link: '' });

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'legendary': return 'var(--color-accent)';
      case 'epic': return 'var(--color-primary)';
      case 'rare': return 'var(--color-accent-diamond)';
      default: return 'var(--color-stone)';
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemForm.name) return;
    addItem(newItemForm);
    setShowAddModal(false);
    setNewItemForm({ name: '', type: 'resource', description: '', rarity: 'common', link: '' });
  };

  return (
    <motion.div 
      className="inventory-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="inventory-header pixel-panel">
        <h2>Inventory</h2>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Craft Item
        </button>
      </div>

      <div className="inventory-grid pixel-panel">
        {items.length === 0 ? (
          <div className="empty-state">Inventory is empty. Add some items!</div>
        ) : (
          items.map(item => (
            <motion.div 
              key={item.id} 
              className="inventory-slot"
              style={{ borderColor: getRarityColor(item.rarity) }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedItem(item)}
              layoutId={`item-${item.id}`}
            >
              <div className="item-icon-placeholder" style={{ backgroundColor: getRarityColor(item.rarity) }}>
                {item.name.substring(0, 2).toUpperCase()}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              className="modal-content pixel-panel"
              layoutId={`item-${selectedItem.id}`}
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setSelectedItem(null)}>
                <FaTimes />
              </button>
              <h3 style={{ color: getRarityColor(selectedItem.rarity) }}>{selectedItem.name}</h3>
              <div className="item-details">
                <p><strong>Type:</strong> <span className="tag">{selectedItem.type}</span></p>
                <p><strong>Rarity:</strong> <span className="tag">{selectedItem.rarity}</span></p>
                <div className="item-description">
                  <p>{selectedItem.description}</p>
                </div>
                {selectedItem.link && (
                  <p><strong>Link:</strong> <a href={selectedItem.link} target="_blank" rel="noopener noreferrer">{selectedItem.link}</a></p>
                )}
              </div>
              <div className="modal-actions">
                <button className="btn-danger" onClick={() => { deleteItem(selectedItem.id); setSelectedItem(null); }}>
                  Discard Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAddModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div 
              className="modal-content pixel-panel"
              onClick={e => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
              <h3>Craft New Item</h3>
              <form onSubmit={handleAddItem} className="craft-form">
                <input 
                  type="text" 
                  placeholder="Item Name" 
                  value={newItemForm.name}
                  onChange={e => setNewItemForm({...newItemForm, name: e.target.value})}
                  required
                />
                <div className="form-row">
                  <select 
                    value={newItemForm.type}
                    onChange={e => setNewItemForm({...newItemForm, type: e.target.value})}
                  >
                    <option value="resource">Resource</option>
                    <option value="certificate">Certificate</option>
                    <option value="document">Document</option>
                    <option value="project">Project Artifact</option>
                  </select>
                  <select 
                    value={newItemForm.rarity}
                    onChange={e => setNewItemForm({...newItemForm, rarity: e.target.value})}
                  >
                    <option value="common">Common (Stone)</option>
                    <option value="rare">Rare (Diamond)</option>
                    <option value="epic">Epic (Emerald)</option>
                    <option value="legendary">Legendary (Gold)</option>
                  </select>
                </div>
                <input 
                  type="url" 
                  placeholder="Optional Link (e.g. Google Drive, GitHub)" 
                  value={newItemForm.link}
                  onChange={e => setNewItemForm({...newItemForm, link: e.target.value})}
                />
                <textarea 
                  placeholder="Item Description" 
                  value={newItemForm.description}
                  onChange={e => setNewItemForm({...newItemForm, description: e.target.value})}
                  rows="3"
                ></textarea>
                <button type="submit" className="btn-primary">Craft Item</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
