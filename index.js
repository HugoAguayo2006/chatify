// Como correr mi base datos local: 
// DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify" npm start
import express from 'express';
import { disconnect } from 'node:cluster';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import pg from "pg"


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});


// PostgreSQL connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Modificamos la tabla para que se adecue a los campos que se nos piden
await pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      content TEXT,
      username TEXT,
      room TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);


app.get('/', (req, res) => {
  res.send('<h1>Hello world 3</h1>');
});

io.on('connection', async (socket) => {
  console.log('a user connected', socket.id);
  if (!socket.recovered) {
      try {
        const result = await pool.query(
          // se agregan datos a la consulta
          'SELECT id, content, username, room, created_at FROM messages WHERE id > $1 ORDER BY id',
          [socket.handshake.auth.serverOffset || 0]
        );
        
        for (const row of result.rows) {
          socket.emit('chat message', row.content, row.id);
        }
      } catch (e) {
        console.error('Error fetching messages:', e);
      }
    }

 socket.on('chat message', async (msg) => {
    // Nueva logica de asignacion de valores
    const message = typeof msg === 'object' ? msg : { content: msg };
    const content = message.content;
    const username = message.username || 'anonymous';
    const room = message.room || 'general';

    console.log('message: ' + content);
    let result;
    try {
      result = await pool.query(
        // Por lo tanto se insertan de diferente manera
        'INSERT INTO messages (content, username, room) VALUES ($1, $2, $3) RETURNING id',
        [content, username, room]
      );
      // include the offset with the message
      io.emit('chat message', content, result.rows[0].id);
    } catch (e) {
      console.error('Error inserting message:', e);
      return;
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
  connectionStateRecovery: {

  }
});

// prep for deployment
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`server running on port ${PORT}`);
});
