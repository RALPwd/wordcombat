import React from 'react'

const SendButton = ( {image, alt, sendMessage }) => <img src={image} alt={alt} onClick={sendMessage} />

export default SendButton