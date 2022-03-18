/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';

function Button({
  name, type, handleCLick, ...rest
}) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <button type={type} onClick={handleCLick} {...rest}>{name}</button>;
}

export default Button;
