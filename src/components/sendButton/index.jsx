import React from 'react';
import PropTypes from 'prop-types';

function SendButton({ image, alt }) {
  return <img src={image} alt={alt} />;
}

SendButton.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
export default SendButton;
