import React from 'react';
import './index.scss';

// eslint-disable-next-line react/prop-types
function Index({ name, type }) {
  // eslint-disable-next-line react/button-has-type
  return <button type={type}>{name}</button>;
}

export default Index;
