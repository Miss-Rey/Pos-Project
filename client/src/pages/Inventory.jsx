import React, { useState } from 'react';
import InventoryTable from '../components/inventory/InventoryTable';
import AddItemModal from '../components/inventory/AddItemModal';

const Inventory = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const inventoryItems = [
    { id: 1, name: 'Coke', quantity: 10, price: 1.5 },
    { id: 2, name: 'Chips', quantity: 5, price: 2 },
  ];

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>

      <InventoryTable items={inventoryItems} />

      {showAddModal && (
        <AddItemModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default Inventory;
