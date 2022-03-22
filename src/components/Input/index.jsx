import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

function Input({
  // eslint-disable-next-line react/prop-types
  type, placeholder, onChange, id,
}) {
  return (<input type={type} placeholder={placeholder} onChange={onChange} id={id} />);
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
