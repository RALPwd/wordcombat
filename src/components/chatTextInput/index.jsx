/* eslint-disable react/prop-types */
import React from 'react';
import SendButton from '../sendButton';
import send from '../../assets/img/send.png';
import './index.scss';

function ChatInput({
  name, id, placeholder, handleSubmit, inputValue, handleChange,
}) {
  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <div className="chatInput">
      <form onSubmit={handleSubmit}>
        <input
          name={name}
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className="chatButton">
          <SendButton image={send} alt="Enviar" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
