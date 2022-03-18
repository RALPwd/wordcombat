/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';

function Input({
  type, placeholder, onChange, ...rest
}) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (<input type={type} placeholder={placeholder} onChange={onChange} {...rest} />);
}

export default Input;
