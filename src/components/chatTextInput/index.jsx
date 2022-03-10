import React from 'react'
import SendButton from '../sendButton'
import send from "../../assets/img/send.png"
import './index.scss'

const chatInput = ( {name, id, event} ) => {

  const sendMessageHandler = (e)=>{
    alert(e.target.previousElementSibling.value)
  }
  return (
    <div className='chatInput' onClick={event}>
        <input name={name} id={id} />
        <SendButton image={send} alt='Enviar' event={sendMessageHandler} />
    </div>
  )
}

export default chatInput