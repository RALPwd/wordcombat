import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

function Button({
  name, type,
}) {
  // eslint-disable-next-line react/button-has-type
  return <button type={type}>{name}</button>;
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

};

export default Button;
