// src/pages/SalesHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, isWithinInterval } from 'date-fns';
import { CSVLink } from 'react-csv';
import { Download } from 'lucide-react';
import API from '../api/axios';
import 'react-datepicker/dist/react-datepicker.css';

const SalesHistoryPage = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await API.get('/sales');
        setSales(res.data);
        setFilteredSales(res.data);
      } catch (err) {
        console.error('Failed to fetch sales:', err);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    if (startDate && endDate && startDate <= endDate) {
      const filtered = sales.filter((sale) => {
        const saleDate = new Date(sale.createdAt);
        return isWithinInterval(saleDate, { start: startDate, end: endDate });
      });
      setFilteredSales(filtered);
    } else if (!startDate && !endDate) {
      setFilteredSales(sales);
    } else {
      setFilteredSales([]);
    }
  }, [startDate, endDate, sales]);

  useEffect(() => {
    const csv = filteredSales.map((sale) => ({
      ID: sale.id,
      Date: format(new Date(sale.createdAt), 'yyyy-MM-dd HH:mm'),
      Customer: sale.customerName || 'N/A',
      Total: sale.total,
      PaymentMethod: sale.paymentMethod || 'Cash',
    }));
    setCsvData(csv);
  }, [filteredSales]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-semibold">Sales History</h2>

        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-sm">
            <span className="mr-2">Start:</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              className="border px-2 py-1 rounded"
              dateFormat="yyyy-MM-dd"
            />
          </label>
          <label className="text-sm">
            <span className="mr-2">End:</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              className="border px-2 py-1 rounded"
              dateFormat="yyyy-MM-dd"
            />
          </label>

          <CSVLink
            data={csvData}
            filename={`sales_report_${Date.now()}.csv`}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </CSVLink>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Total (Ksh)</th>
              <th className="px-4 py-2 text-left">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <tr key={sale.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {format(new Date(sale.createdAt), 'yyyy-MM-dd HH:mm')}
                  </td>
                  <td className="px-4 py-2">{sale.customerName || 'N/A'}</td>
                  <td className="px-4 py-2">Ksh {sale.total?.toFixed(2)}</td>
                  <td className="px-4 py-2">{sale.paymentMethod || 'Cash'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  {startDate && endDate && startDate > endDate
                    ? 'Invalid date range selected.'
                    : 'No sales found for the selected range.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistoryPage;
