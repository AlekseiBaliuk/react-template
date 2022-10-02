import React from 'react';

const Filter = ({ value, onChange }) => (
  <label>
    Filter bu name <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;
