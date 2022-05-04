import React from 'react';
import PropTypes from 'prop-types';
import SendButton from '../sendButton';
import send from '../../assets/img/send.png';
import './index.scss';

function ChatInput({
  name, id, placeholder, handleSubmit, inputValue, handleChange, onFocus, onBlur,
}) {
  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <div className="chatInput">
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          name={name}
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button type="submit" className="chatButton">
          <SendButton image={send} alt="Enviar" />
        </button>
      </form>
    </div>
  );
}

ChatInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default ChatInput;
