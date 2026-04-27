import React, { useEffect, useState } from 'react'
import { socket } from '../socket';
import './Chats.css'

function Chats({chat,username}) {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const handleChatHistory = (messagesFromDB) => {
      console.log("Historial desde el server:", messagesFromDB);
      setMessages(messagesFromDB);
    };

    const handleChatMessage = (newMessage) => {
      console.log("Mensaje desde el server:", newMessage);
      socket.auth.serverOffset = newMessage.id;
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on('chat history', handleChatHistory);
    socket.on('chat message', handleChatMessage);

    return() => {
      // Apagar el listener
      socket.off('chat history', handleChatHistory);
      socket.off('chat message', handleChatMessage);
    }
  }, []);

  return (
    <div className='chats-container'>
        <p className='chat-title'>{chat} // Name: {username}</p>
        <div className='mensajes'>
          {messages.map((m)=>{
            //Detecta si el mensaje es del usuario actual
            const isOwnMessage=m.username===username
            return(
              <p 
                key={m.id}
                className={isOwnMessage ? 'message own-message':'message other-message'}
              >
                <strong>{m.username}</strong>: {m.content}
              </p>
            )
          })}
        </div>
    </div>
  )
}

export default Chats
