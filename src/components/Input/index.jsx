/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';

function Index({
  label, type, placeholder, id,
}) {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} id={id} />
    </div>
  );
}

export default Index;
