import React, { useState } from 'react'
import ChatInput from '../chatTextInput'
import './index.scss'

const ChatBox = () => {
  let [messageContainer, setMessageContainer] = useState('')

  const messages = []
  const sendMessageHandler = (e)=>{
    const input = e.target.previousElementSibling
    messages.push(input.value)
    input.value = ''
    setMessageContainer(messages.map(message => messageContainer = messageContainer + message + '\n'))
    console.log(typeof(messageContainer))
  }

  return (
    <div className='chatBox'>
        <p>{messageContainer.split('\n')}</p>
        <ChatInput name='chat-input' id='ingreso-texto' placeholder='Escribe tu mensaje' handleChange={sendMessageHandler}/>
    </div>
  )
}

export default ChatBox