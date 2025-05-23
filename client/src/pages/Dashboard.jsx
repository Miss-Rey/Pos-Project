import React from 'react';
import KPIWidget from '../components/dashboard/KPIWidget';
import SalesChart from '../components/dashboard/SalesChart';
import LowStockList from '../components/dashboard/LowStockList';

const Dashboard = () => {
  const dummySalesData = [
    { date: 'May 1', sales: 400 },
    { date: 'May 2', sales: 300 },
    { date: 'May 3', sales: 500 },
  ];

  const lowStockItems = [
    { name: 'Coke', quantity: 3 },
    { name: 'Chips', quantity: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPIWidget label="Total Sales" value="$2,300" />
        <KPIWidget label="Total Customers" value="152" />
        <KPIWidget label="Items Low in Stock" value={lowStockItems.length} />
      </div>

      <SalesChart data={dummySalesData} />

      <LowStockList items={lowStockItems} />
    </div>
  );
};

export default Dashboard;
