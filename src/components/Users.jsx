import React from 'react'
import './Channels.css'

function Users({ activeUsers }) {
  return (
    <div className='channels-container'>
        <div className='lista'>
            <p>Usuarios en línea:</p>

            {activeUsers && activeUsers.length > 0 ? (
                activeUsers.map((user, index) => (
                    <div key={index} className='chats'>
                        🟢 {user.username || user} 
                    </div>
                ))
            ) : (
                <div className='chats'>*</div>
            )}
        </div>
    </div>
  )
}

export default Users
