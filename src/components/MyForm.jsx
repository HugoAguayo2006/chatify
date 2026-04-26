import React, { useState } from 'react'
import { socket } from '../socket';
import './MyForm.css'

function MyForm() {

    const[messageData, setmessageData] = useState('')
    

    const handleOnchange = (e) => {
        setmessageData(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault()
        // TECER SOCKET 
        socket.emit('chat message', messageData)
        setmessageData('')
    }


  return (
    <div className='form-container'>
      <input 
      type="text" 
      name="messageData" 
      value={messageData}
      onChange={handleOnchange} 
      className='barra'/>
      <button className="btn-send" onClick={handleClick}> Send</button>
    </div>
  )

}

export default MyForm
