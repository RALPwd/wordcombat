import React, { useState } from 'react'
import ChatInput from '../chatTextInput'
import './index.scss'

const ChatBox = () => {
  const [messageContainer, setMessageContainer] = useState([])

  const sendMessageHandler = (e) => {
    if (e.type === 'keydown') {
      if (e.keyCode === 13) {
        const input = e.target
        setMessageContainer(messageContainer.concat(input.value))
        input.value = ''
      }
    } else {
      const input = e.target.previousElementSibling
      setMessageContainer(messageContainer.concat(input.value))
      input.value = ''
    }
  }

  return (
    <div className='chatBox'>
      {messageContainer.map((message, idx) => <p key={idx} className='chatBox__messageSent'> {message}</p>)}
      <ChatInput name='chat-input' id='ingreso-texto' placeholder='Escribe tu mensaje' handleChange={sendMessageHandler} />
    </div>
  )
}

export default ChatBox