import { useEffect, useState } from 'react'
import './App.css'
import { socket } from '../socket'
import ManageConnnection from './components/ManageConnnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels' 
import Chats from './components/Chats'
import Users from './components/Users'

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
    //socket.on('disconnect',onDisconnect)
  },[])

  return (
    <>
    <h1>Chatify</h1>
    <ManageConnnection/>
    <div className="app-layout">
      <div className="left">
        <Channels/>
      </div>
      <div className="center">
        <Chats/>
        <MyForm/>
      </div>
      <div className="right">
        <Users/>
      </div>
    </div>
    </>
  )
}

export default App
