import React from 'react'
import './Users.css'

function Users({ activeUsers }) {
  return (
    <div className='users-sidebar'>
        <div className='users-title'>Usuarios en línea:</div>

        {activeUsers && activeUsers.length > 0 ? (
            activeUsers.map((user, index) => (
                <div key={index} className='user-item'>
                    <span className='user-status-dot'>🟢</span> 
                    {user.username || user} 
                </div>
            ))
        ) : (
            <div className='user-item'>*</div>
        )}
    </div>
  )
}

export default Users
