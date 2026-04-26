import React, {useState} from 'react'

function UsernamePrompt({room,onSubmit}){
    const[value,setValue]=useState('')

    //Valida username antes de entrar
    const handleSubmit=(e)=>{
        e.preventDefault()
        const cleanValue=value.trim()
        if(!cleanValue) return
        onSubmit(cleanValue)
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Ingresa tu username para #{room}</h2>
                <input
                type="text"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                placeholder="Username"
                />
                <button type="submit">
                Entrar
                </button>
            </form>
        </div>
    )
}
export default UsernamePrompt
