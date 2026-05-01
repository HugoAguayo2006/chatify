import React, {useState} from 'react'
import './UsernamePrompt.css';

function UsernamePrompt({room,onSubmit}){
    const[value,setValue]=useState('')

    //Valida username antes de entrar
    const handleSubmit=(e)=>{
        e.preventDefault()
        const cleanValue=value.trim()
        if(!cleanValue) return
        onSubmit(cleanValue)
    }

    return (
    <div className="prompt-container">
      <h2 className="prompt-title">Ingresa tu nombre de usuario para #{room}</h2>
      
      <form onSubmit={handleSubmit} className="prompt-form">
        <input
          type="text"
          className="prompt-input"
          placeholder="Nombre de usuario"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit" className="prompt-btn">
          Entrar
        </button>
      </form>
    </div>
  );
}
export default UsernamePrompt
