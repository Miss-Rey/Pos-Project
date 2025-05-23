import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="border px-4 py-2 text-left">{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col, cidx) => (
                <td key={cidx} className="border px-4 py-2">{row[col.accessor]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
