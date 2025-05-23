import React from 'react';

const CustomerTable = ({ customers }) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Phone</th>
          <th className="border px-4 py-2">Total Spent</th>
        </tr>
      </thead>
      <tbody>
        {customers.length > 0 ? (
          customers.map((cust, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{cust.name}</td>
              <td className="border px-4 py-2">{cust.email}</td>
              <td className="border px-4 py-2">{cust.phone}</td>
              <td className="border px-4 py-2">${cust.totalSpent}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4">No customer data found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CustomerTable;
