import React from 'react';

const LowStockList = ({ items }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Low Stock Items</h2>
      {items.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, i) => (
            <li key={i}>
              {item.name} — <span className="text-red-500 font-semibold">{item.quantity} left</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No low stock items.</p>
      )}
    </div>
  );
};

export default LowStockList;
