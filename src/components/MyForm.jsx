import React, { useEffect, useState, useRef } from 'react'
import { socket } from '../socket';
import './MyForm.css'

export default function MyForm({ username, chat }) {
  const [messageData, setmessageData] = useState('')
  const typingEmitInterval = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleOnchange = (e) => {
    setmessageData(e.target.value);
    if (!typingEmitInterval.current) {
      socket.emit('typing', { username, chat });
      typingEmitInterval.current = setInterval(() => {
        socket.emit('typing', { username, chat });
      }, 2000);
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      clearInterval(typingEmitInterval.current);
      typingEmitInterval.current = null;
    }, 3000);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!messageData.trim()) return
    socket.emit('chat message', messageData)
    setmessageData('')
  }

  return (
    <>
      <form
        className='chat-form-container'
        onSubmit={handleSubmit}
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
          Enviar
        </button>
      </form>
    </>
  )
}

