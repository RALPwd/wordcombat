import React from 'react';
import './index.scss';

function Index({
  // eslint-disable-next-line react/prop-types
  label, type, placeholder,
}) {
  return (
    <div className="input-container">
      <label htmlFor={label}>
        {label}
        <input type={type} placeholder={placeholder} id={label} />
      </label>

    </div>
  );
}

export default Index;
