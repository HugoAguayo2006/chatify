import React, { useState } from 'react';
import './JoinScreen.css';

function JoinScreen({ onJoin }) {
  const [tempUsername, setTempUsername] = useState('');
  const [tempRoom, setTempRoom] = useState('General'); 

  const rooms = [
    { id: 'General', desc: '# general' },
    { id: 'Tech Talk', desc: '# Tech Talk' },
    { id: 'Random', desc: '# Random' },
    { id: 'Gaming', desc: '# Gaming' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempUsername.trim() && tempRoom) {
      onJoin(tempUsername, tempRoom);
    }
  };

  return (
    <div className="join-screen-container">
      <div className="join-card">
        <h1 className="join-title">CHATIFY</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>TU NOMBRE</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Ingresa tu nombre de usuario..." 
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>SELECCIONAR SALA</label>
            <div className="room-list">
              {rooms.map((room) => (
                <div 
                  key={room.id}
                  className={`room-option ${tempRoom === room.id ? 'selected' : ''}`}
                  onClick={() => setTempRoom(room.id)}
                >
                  <div className="room-name">{room.id}</div>
                  <div className="room-desc">{room.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="join-btn"
            disabled={!tempUsername.trim()}
          >
            ENTRAR A LA SALA
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinScreen;
