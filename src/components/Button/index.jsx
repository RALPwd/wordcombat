import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

function Button({
  name, type, handleCLick,
}) {
  // eslint-disable-next-line react/button-has-type
  return <button type={type} onClick={handleCLick}>{name}</button>;
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleCLick: PropTypes.func.isRequired,
};

export default Button;
