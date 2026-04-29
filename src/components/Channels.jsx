import React, { useEffect } from 'react'
import { socket } from '../socket'
import './Channels.css'

function Channels({chat, setChat, username}) {

  useEffect(() => {
    const joinCurrentRoom = () => {
      //No entra sin username
      if(!username) return
      console.log('Enviando join room:', username, chat)
      socket.emit('join room', { username, chat })
    }

    if (socket.connected) {
      joinCurrentRoom()
    }

    socket.on('connect', joinCurrentRoom)

    return () => {
      // Apagamos el listener
      socket.off('connect', joinCurrentRoom)
    }
  }, [chat, username])

  const handleChangeChat = (newChat) => {
    if (chat === newChat) return

    console.log('Enviando leave room:', chat)
    socket.emit('leave room', { chat })
    setChat(newChat)
  }

  return (
    <div className='channels-container'>
        <p>SW-TC</p>
        <p style={{ marginTop: '20px', fontSize: '0.75rem' }}>Canales</p>
        
        <button 
          className={`channel-btn ${chat === 'General' ? 'active' : ''}`} 
          onClick={() => handleChangeChat('General')}
        > 
          # General 
        </button>
        <button 
          className={`channel-btn ${chat === 'Tech Talk' ? 'active' : ''}`} 
          onClick={() => handleChangeChat('Tech Talk')}
        > 
          # Tech Talk
        </button>
        <button 
          className={`channel-btn ${chat === 'Random' ? 'active' : ''}`} 
          onClick={() => handleChangeChat('Random')}
        > 
          # Random
        </button>
        <button 
          className={`channel-btn ${chat === 'Gaming' ? 'active' : ''}`} 
          onClick={() => handleChangeChat('Gaming')}
        > 
          # Gaming
        </button>
    </div>
  )
}

export default Channels
