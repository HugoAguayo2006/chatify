import React, { useEffect, useState } from 'react'
import { socket } from '../../socket';
import './Chats.css'

function Chats() {

  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg,serverOffset) => {
      console.log("Mensaje desde el server:", msg)
      socket.auth.serverOffset = serverOffset;
      setMessage((prev) => [...prev,msg])
    });

    return() => {
      socket.off('chat message')
    }
      
  }, []);

  return (
    <div className='chats-container'>
      <div className='chats'>
        <p> # fortnite</p>
          {message?.map((m) => (
            <p>{m}</p>
          ))}
      </div>
    </div>
  )
}

export default Chats
