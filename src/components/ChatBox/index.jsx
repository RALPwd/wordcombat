import React, { useState } from 'react'
import ChatInput from '../chatTextInput'
import './index.scss'

const ChatBox = () => {
  const [messageContainer, setMessageContainer] = useState([])

  const sendMessageHandler = (e)=>{
    const input = e.target.previousElementSibling
    setMessageContainer(messageContainer.concat(input.value))
    input.value = ''
  }
  
  return (
    <div className='chatBox'>
        {messageContainer.map(message=><p> {message}</p>)}
        <ChatInput name='chat-input' id='ingreso-texto' placeholder='Escribe tu mensaje' handleChange={sendMessageHandler}/>
    </div>
  )
}

export default ChatBox