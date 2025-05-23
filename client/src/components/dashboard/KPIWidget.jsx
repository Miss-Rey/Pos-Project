import React from 'react';

const KPIWidget = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default KPIWidget;
