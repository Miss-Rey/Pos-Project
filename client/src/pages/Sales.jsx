import React, { useState } from 'react';
import SalesTable from '../components/sales/SalesTable';
import SalesFilters from '../components/sales/SalesFilters';
import ReceiptModal from '../components/sales/ReceiptModal';

const Sales = () => {
  const [selectedSale, setSelectedSale] = useState(null);

  const salesData = [
    { id: 1, date: '2024-05-01', total: 120, customer: 'John Doe' },
    { id: 2, date: '2024-05-02', total: 80, customer: 'Jane Smith' },
  ];

  return (
    <div className="space-y-4">
      <SalesFilters />
      <SalesTable sales={salesData} onView={(sale) => setSelectedSale(sale)} />
      {selectedSale && (
        <ReceiptModal sale={selectedSale} onClose={() => setSelectedSale(null)} />
      )}
    </div>
  );
};

export default Sales;
