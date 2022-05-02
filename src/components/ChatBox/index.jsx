/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/socket';
import ChatInput from '../chatTextInput';
// import { getAllMessages, createMessage } from '../../services/messages';
import './index.scss';

function ChatBox() {
  const playerName = useSelector((state) => state.player.nick);
  const [messageContainer, setMessageContainer] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [inputValue, setInputValue] = useState('');

  // const getMessages = async () => {
  //   const data = await getAllMessages();
  //   setMessageContainer(data);
  // };

  useEffect(() => {
    // getMessages();

    socket.emit('conectado', playerName);
    return () => { socket.off(); };
  }, []);

  useEffect(() => {
    socket.on('mensajes', (info) => {
      setMessageContainer([...messageContainer, info]);
    });

    return () => { socket.off(); };
  }, [messageContainer]);

  const inputValueHandler = (e) => {
    const input = e.target.value;
    setInputValue(input);
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    const msg = inputValue;

    const dataToSubmit = {
      message: msg,
      author: playerName,
    };

    const addMessage = async () => {
      // await createMessage(dataToSubmit);
      // await getMessages();
      socket.emit('mensaje', dataToSubmit);
      setInputValue('');
    };
    addMessage();
  };

  return (
    <div className="chatBox">

      {messageContainer ? messageContainer.map((message, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={key} className="chatBox__messageSent">
          <strong>
            {' '}
            {message.author}
          </strong>
          :
          {' '}
          {message.message}
        </p>

      )) : <p>cargando mensajes</p>}
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
