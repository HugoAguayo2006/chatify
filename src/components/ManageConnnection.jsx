import React from 'react'
import { socket } from '../socket'
import './ManageConnnection.css'

function ManageConnnection() {

    const handleConection = (con) =>{
      console.log({con})
        switch (con){
            case 'on':
                socket.connect()
                break
            case 'off':
                socket.disconnect()
                break
            default:
                break
        }
    }

  return (
    <div className='connection-actions'>
      <button className='connection-btn connect' onClick={()=> handleConection('on')}> Conexión</button>
      <button className='connection-btn disconnect' onClick={()=> handleConection('off')}> Desconexión</button>
    </div>
  )
}

export default ManageConnnection
