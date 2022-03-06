import React from 'react';

function MySelect({ options, defaultValue }) {
  return (
    <select style={{ float: 'right' }}>
      <option disabled={true} value={''} key={options.value}>
        {defaultValue}
      </option>
      {options.map(option => (
        <option value={option.value} key={options.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
export default MySelect;
