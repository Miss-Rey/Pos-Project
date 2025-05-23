import React from 'react';
import EmployeeTable from '../components/employees/EmployeeTable';

const Employees = () => {
  const employees = [
    { name: 'Alice Johnson', role: 'Cashier', email: 'alice@example.com', phone: '555-1234' },
    { name: 'Bob Smith', role: 'Manager', email: 'bob@example.com', phone: '555-5678' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Employees</h2>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default Employees;
