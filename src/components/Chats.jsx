import React, { useEffect, useState } from 'react'
import { socket } from '../socket';
import './Chats.css'

function Chats({chat}) {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const handleChatHistory = (messagesFromDB) => {
      console.log("Historial desde el server:", messagesFromDB);
      setMessages(messagesFromDB);
    };

    /*
    messages = [
      { id: 1, username: "Ana", content: "Hola" },
      { id: 2, username: "Luis", content: "Qué onda" }
    ]
    */
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
      <div className='chats'>
        <p className='chat-title'># {chat}</p>
        <div className='mensajes'>
          {messages.map((m) => (
            <p key={m.id}>
              <strong>{m.username}</strong>: {m.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chats
