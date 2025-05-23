// src/pages/SalesPage.jsx
import React from 'react';
import InventoryList from '../components/InventoryList';
import Cart from '../components/Cart';

const SalesPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-xl font-bold mb-4">Inventory</h1>
        <InventoryList />
      </div>
      <div>
        <h1 className="text-xl font-bold mb-4">Cart</h1>
        <Cart />
      </div>
    </div>
  );
};

export default SalesPage;
