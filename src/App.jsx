import { useEffect, useState } from 'react'
import './App.css'
import { socket } from '../socket'
import ManageConnnection from './components/ManageConnnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels' 
import Chats from './components/Chats'
import Users from './components/Users'
import { Socket } from 'socket.io-client'

function App() {
  const [count, setCount] = useState(0)

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

  return (
    <>
    <div className="app-layout">
      <div className="left">
        <Channels/>
      </div>
      <div className="center">
        <Chats/>
        <MyForm/>
        <ManageConnnection/>
      </div>
      <div className="right">
        <Users/>
      </div>
    </div>
    </>
  )
}

export default App
