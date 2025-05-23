import React from 'react';

const EmployeeTable = ({ employees }) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">Name</th>
          <th className="border px-4 py-2">Role</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Phone</th>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((emp, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.role}</td>
              <td className="border px-4 py-2">{emp.email}</td>
              <td className="border px-4 py-2">{emp.phone}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4">No employees found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
