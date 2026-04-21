import React, { useState } from 'react'
import { socket } from '../../socket';
import './MyForm.css'

function MyForm() {

    const[message, setMessage] = useState('')

    const handleOnchange = (e) => {
        setMessage(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault()
        socket.emit('chat message', message)
    }


  return (
    <div className='form-container'>
      <input 
      type="text" 
      name="message" 
      value={message}
      onChange={handleOnchange} 
      className='barra'/>
      <button className="btn-send" onClick={handleClick}> Send</button>
    </div>
  )

}

export default MyForm
