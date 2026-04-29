import React, { useState } from 'react'
import { socket } from '../socket';
import './MyForm.css'

function MyForm() {

    const[messageData, setmessageData] = useState('')
    

    const handleOnchange = (e) => {
        setmessageData(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault()
        // TECER SOCKET 
        socket.emit('chat message', messageData)
        setmessageData('')
    }


  return (
    <form 
      className='chat-form-container' 
      onSubmit={(e) => {
        e.preventDefault(); 
        handleClick();     
      }}
    >
      <input 
        type="text" 
        name="messageData" 
        value={messageData}
        onChange={handleOnchange} 
        className='chat-form-input'
        placeholder="Escribe un mensaje..."
        autoComplete="off" /* esto hace que no aparezcan mensajes pasados*/
      />
      <button type="submit" className="chat-form-btn"> 
        Send 
      </button>
    </form>
  )
}

export default MyForm
