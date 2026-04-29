import './App.css'
import { useEffect, useState } from 'react'
import { socket } from './socket'
import ManageConnnection from './components/ManageConnnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels'
import Chats from './components/Chats'
import Users from './components/Users'
import UsernamePrompt from './components/UsernamePrompt'
import JoinScreen from './components/JoinScreen'

function App() {
  const STORAGE_KEY = 'Chatify_usernames_by_room'
  const [chat, setChat] = useState('General')
  const [username, setUsername] = useState("")
  const [activeUsers, setActiveUsers] = useState([])
  const [hasStarted, setHasStarted] = useState(false)

  // 1. CORRECCIÓN: Lo regresamos a {} para que solo recuerde 
  // los canales en la sesión actual y te pida nombre en los nuevos
  const [unlockedRooms, setUnlockedRooms] = useState({})

  // Conexión inicial de sockets
  useEffect(() => {
    const onConnnect = () => {
      console.log("Conectado")
    }

    socket.on('connect', onConnnect)
    socket.on('room users', (users) => {
      console.log("Usuarios del server:", users);
      setActiveUsers(users)
    })

    return () => {
      socket.off("disconnect")
      socket.off("connect", onConnnect)
      socket.off("room users")
    }
  }, [])

  // 2. CORRECCIÓN: Emitir entrada y SALIDA del room
  useEffect(() => {
    if (username && chat) {
      socket.emit('join room', { username, chat: chat })
    }

    // Función de limpieza: cuando cambias de chat, avisa que saliste del anterior
    return () => {
      if (username && chat) {
        socket.emit('leave room', { chat: chat })
      }
    }
  }, [username, chat])

  // 3. CORRECCIÓN: Dejamos UN SOLO useEffect para la validación de nombres
  useEffect(() => {
    const nameForThisRoom = unlockedRooms[chat];

    if (nameForThisRoom) {
      setUsername(nameForThisRoom);
    } else {
      setUsername('');
    }
  }, [chat, unlockedRooms]);

  // Guarda username del room actual
  const handleSaveUsername = (newUsername, targetRoom = chat) => {
    const cleanUsername = newUsername.trim();
    if (!cleanUsername) return;

    const updatedRooms = { ...unlockedRooms, [targetRoom]: cleanUsername };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRooms));
    setUnlockedRooms(updatedRooms);
  };

  const handleInitialJoin = (selectedUsername, selectedRoom) => {
    setChat(selectedRoom);
    handleSaveUsername(selectedUsername, selectedRoom);
    setHasStarted(true);
  }

  // checa para poner la pantalla de inicio
  if (!hasStarted) {
    return <JoinScreen onJoin={handleInitialJoin} />
  }

  // Layout principal
  return (
    <>
      <div className="app-layout">
        <div className="left">
          <Users activeUsers={activeUsers} />
        </div>
        <div className="center">
          {username ? (
            <>
              <Chats chat={chat} username={username} />
              <MyForm />
              <ManageConnnection />
            </>
          ) : (
            <UsernamePrompt room={chat} onSubmit={(name) => handleSaveUsername(name, chat)} />
          )}
        </div>
        <div className="right">
          <Channels chat={chat} setChat={setChat} username={username} />
        </div>
      </div>
    </>
  )
}

export default App
