import React from 'react';

const InventoryTable = ({ items }) => {
  return (
    <table className="w-full border-collapse table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Item Name</th>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Quantity</th>
          <th className="border px-4 py-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">${item.price}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4">No inventory data found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InventoryTable;
