/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import ChatInput from '../chatTextInput';
// import { getAllMessages, createMessage } from '../../services/messages';
import './index.scss';

function ChatBox() {
  const socket = io('http://localhost:3001/');
  const nombre = useSelector((state) => state.player.nick);

  const [messageContainer, setMessageContainer] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [inputValue, setInputValue] = useState('');

  // const getMessages = async () => {
  //   const data = await getAllMessages();
  //   setMessageContainer(data);
  // };

  useEffect(() => {
    // getMessages();
    socket.emit('conectado', `${nombre} esta conectado`);
  }, []);

  const inputValueHandler = (e) => {
    const input = e.target.value;
    setInputValue(input);
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const msg = inputValue;

    const dataToSubmit = {
      message: msg,
      author: nombre,
    };

    const addMessage = async () => {
      // await createMessage(dataToSubmit);
      // await getMessages();
      setMessageContainer(messageContainer.concat(dataToSubmit));
      console.log(messageContainer);
      setInputValue('');
    };
    addMessage();
  };

  return (
    <div className="chatBox">
      {messageContainer.map((message) => (
        <p key={message.id} className="chatBox__messageSent">
          {' '}
          De:
          {' '}
          {message.author}
          {' '}
          <br />
          {message.message}
        </p>
      ))}
      <ChatInput
        name="chat-input"
        id="ingreso-texto"
        placeholder="Escribe tu mensaje"
        handleSubmit={sendMessageHandler}
        handleChange={inputValueHandler}
        inputValue={inputValue}
      />

    </div>
  );
}

export default ChatBox;
