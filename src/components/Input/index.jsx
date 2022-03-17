/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';

function Index({
  label, type, placeholder, onChange, ...rest
}) {
  return (
    <div className="input-container">
      <label htmlFor={label}>
        {label}
        { /* eslint-disable-next-line react/jsx-props-no-spreading */}
        <input type={type} placeholder={placeholder} id={label} {...rest} />
      </label>
    </div>
  );
}

export default Index;
