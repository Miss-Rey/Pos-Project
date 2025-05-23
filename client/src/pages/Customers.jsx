import React from 'react';
import CustomerTable from '../components/customers/CustomerTable';

const Customers = () => {
  const customers = [
    { name: 'Jane Doe', email: 'jane@example.com', phone: '555-0001', totalSpent: 250 },
    { name: 'Mark Lee', email: 'mark@example.com', phone: '555-0002', totalSpent: 120 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Customers</h2>
      <CustomerTable customers={customers} />
    </div>
  );
};

export default Customers;
