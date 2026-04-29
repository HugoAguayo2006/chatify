import React, { useEffect, useRef, useState } from 'react'
import { socket } from '../socket';
import './Chats.css'
import moment from 'moment';

function Chats({ chat, username }) {

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

    return () => {
      // Apagar el listener
      socket.off('chat history', handleChatHistory);
      socket.off('chat message', handleChatMessage);
    }
  }, []);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='chats-container'>
      <div className='chat-header'>{chat} // Name: {username}</div>

      <div className='messages-list'>
        {messages.map((m) => {
          // detecta si el mensaje es del usuario actual
          const isOwnMessage = m.username === username;

          return (
            <div
              key={m.id}
              className={`message-wrapper ${isOwnMessage ? 'sent' : 'received'}`}
            >
              <div>
                <div className='message-item'>
                  <span className='message-username'>{m.username}</span>
                  <div className='message-content'>{m.content}</div>
                </div>
                <div className='message-time'>{moment(m.created_at).fromNow()}</div>
              </div>

              <div ref={scrollRef} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Chats
