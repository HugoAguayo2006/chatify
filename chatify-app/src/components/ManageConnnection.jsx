import React from 'react'
import { socket } from '../../socket'

function ManageConnnection() {

    const handleConection = (con) =>{
        switch (con){
            case 'on':
                socket.on('connect',onConnnect)
                break
            case 'off':
                socket.on('disconnect',onDisconnect)
                break
            default:
                break
        }
    }

  return (
    <div>
      <button onClick={()=> handleConection('on')}> Conection</button>
      <button onClick={()=> handleConection('off')}> Disconection</button>
    </div>
  )
}

export default ManageConnnection
