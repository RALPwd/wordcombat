/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';

function Index({ label, type, placeholder }) {
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
