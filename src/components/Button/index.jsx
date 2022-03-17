/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import './index.scss';

function Index({ name, type }) {
  return <button type={type}>{name}</button>;
}

export default Index;
