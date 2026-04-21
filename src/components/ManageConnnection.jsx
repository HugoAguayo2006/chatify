import React from 'react'
import { socket } from '../../socket'

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
    <div>
      <button onClick={()=> handleConection('on')}> Conection</button>
      <button onClick={()=> handleConection('off')}> Disconection</button>
    </div>
  )
}

export default ManageConnnection
