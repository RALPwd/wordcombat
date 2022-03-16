/* eslint-disable react/prop-types */
import React from 'react';
import SendButton from '../sendButton';
import send from '../../assets/img/send.png';
import './index.scss';

function ChatInput({
  name, id, placeholder, handleChange,
}) {
  return (
    <div className="chatInput">
      <input name={name} id={id} placeholder={placeholder} onKeyDown={handleChange} />
      <SendButton image={send} alt="Enviar" sendMessage={handleChange} />
    </div>
  );
}

export default ChatInput;
