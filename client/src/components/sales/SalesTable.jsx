import React from 'react';

const SalesTable = ({ sales }) => {
  return (
    <table className="w-full border-collapse table-auto">
      <thead>
        <tr>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Customer</th>
          <th className="border px-4 py-2">Amount</th>
          <th className="border px-4 py-2">Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {sales.length > 0 ? (
          sales.map((sale, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{sale.date}</td>
              <td className="border px-4 py-2">{sale.customer}</td>
              <td className="border px-4 py-2">{sale.amount}</td>
              <td className="border px-4 py-2">{sale.paymentMethod}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4">No sales records found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SalesTable;
