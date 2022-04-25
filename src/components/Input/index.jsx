import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

function Input({
  type, placeholder, onChange, name, value,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
Input.defaultProps = {
  value: '',
  placeholder: '',
};

export default Input;
