import React from 'react';

const SalesTable = ({ sales }) => {
  const printReceipt = (sale) => {
    const win = window.open('', 'Print Receipt');
    win.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .total { font-weight: bold; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h2>Sales Receipt</h2>
          <p><strong>Date:</strong> ${new Date(sale.createdAt).toLocaleString()}</p>
          <p><strong>Sale ID:</strong> ${sale._id}</p>
          <table>
            <thead>
              <tr><th>Item</th><th>Quantity</th></tr>
            </thead>
            <tbody>
              ${sale.items.map(item => `
                <tr>
                  <td>${item.name || item.productName}</td>
                  <td>${item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p class="total">Total: KES ${sale.total}</p>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale._id} className="border-t">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{new Date(sale.createdAt).toLocaleString()}</td>
              <td className="p-2 border">
                <ul className="list-disc list-inside">
                  {sale.items.map((item, i) => (
                    <li key={i}>
                      {item.name || item.productName} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-2 border font-semibold">{sale.total}</td>
              <td className="p-2 border">
                <button
                  onClick={() => printReceipt(sale)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
