import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

function Button({
  // eslint-disable-next-line react/prop-types
  name, type, onClick, disabled,
}) {
  // eslint-disable-next-line react/button-has-type
  return <button type={type} onClick={onClick} disabled={disabled}>{name}</button>;
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

};

export default Button;
