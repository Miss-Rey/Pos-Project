import React, { useState } from 'react';

const DateRangePicker = ({ onChange }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleChange = () => {
    if (onChange) onChange({ start, end });
  };

  return (
    <div className="flex gap-2">
      <input
        type="date"
        value={start}
        onChange={(e) => { setStart(e.target.value); handleChange(); }}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={end}
        onChange={(e) => { setEnd(e.target.value); handleChange(); }}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default DateRangePicker;
