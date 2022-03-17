/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';

function Index({
  name, type, handleCLick, ...rest
}) {
  return <button type={type} onClick={handleCLick}>{name}</button>;
}

export default Index;
