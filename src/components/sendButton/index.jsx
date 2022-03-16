/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function SendButton({ image, alt, sendMessage }) {
  return <img src={image} alt={alt} onClick={sendMessage} />;
}

export default SendButton;
