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
        <div className='lista'>
            <p> SW-TC</p>
            <div className='chats'> Text Channels</div>
            <button className='chats' onClick={()=> handleChangeChat('General')}> # General </button>
            <button className='chats' onClick={()=> handleChangeChat('Tech Talk')}> # Tech Talk</button>
            <button className='chats' onClick={()=> handleChangeChat('Random')}> # Random</button>
            <button className='chats'onClick={()=> handleChangeChat('Gaming')}> # Gaming</button>
        </div>
    </div>
  )
}

export default Channels
