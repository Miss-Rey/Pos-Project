import React, { useState } from 'react';
import DateRangePicker from '../common/DateRangePicker';

const SalesFilters = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onFilter(searchTerm);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
      <DateRangePicker onChange={(range) => onFilter({ dateRange: range })} />
      <input
        type="text"
        placeholder="Search by customer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-2 py-1 rounded w-full sm:w-64"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">
        Filter
      </button>
    </div>
  );
};

export default SalesFilters;
