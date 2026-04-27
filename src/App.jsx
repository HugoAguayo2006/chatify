import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'
import ManageConnnection from './components/ManageConnnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels' 
import Chats from './components/Chats'
import Users from './components/Users'
import { Socket } from 'socket.io-client'
import UsernamePrompt from './components/UsernamePrompt'


function App() {
  const [count, setCount] = useState(0)
  //Username guardado por room
  const STORAGE_KEY='Chatify_usernames_by_room'
  const [chat, setChat] = useState('General')
  const [username, setUsername] = useState("")
  const [unlockedRooms, setUnlockedRooms] = useState({})
  


  //Leemos usuarios guardados
  const getUsernamesByRoom = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  }


  useEffect(()=>{
    const onConnnect = () =>{
      console.log("Conectado")
    }
   // const onDisconnect = () =>{
     // console.log("Conectado")
    //}

    
    socket.on('connect',onConnnect)
    return () => {
      socket.off("disconnect")
      socket.off("connect", onConnnect)
    }
    //socket.on('disconnect',onDisconnect)
  },[])

  useEffect(() => {
    const usernamesByRoom = getUsernamesByRoom()
    const savedUsername = usernamesByRoom[chat]

    //Si existe, entra al room
    if (unlockedRooms[chat]) {
      setUsername(unlockedRooms[chat])
    } else {
      setUsername('')
    }
  },[chat,unlockedRooms])

  //Guarda username del room actual
  const handleSaveUsername = (newUsername) => {
    const cleanUsername = newUsername.trim()
    if (!cleanUsername) return

    const usernamesByRoom = getUsernamesByRoom()
    const updatedUsernames={...usernamesByRoom,[chat]: cleanUsername}
    localStorage.setItem(STORAGE_KEY,JSON.stringify(updatedUsernames))
    setUnlockedRooms({...unlockedRooms,[chat]: cleanUsername})
    setUsername(cleanUsername)
  }


  return (
    <>
    <div className="app-layout">
      <div className="left">
        <Channels chat={chat} setChat={setChat} username={username}/>
      </div>
      <div className="center">
        {username ? (
          <>
            <Chats chat={chat} username={username}/>
            <MyForm/>
            <ManageConnnection/>
          </>
          ):(
          <UsernamePrompt room={chat} onSubmit={handleSaveUsername}/>
        )}
      </div>
      <div className="right">
        <Users/>
      </div>
    </div>
    </>
  )
}

export default App
