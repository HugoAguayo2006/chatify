// Como correr mi base datos local: 
// DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify" npm start
import express from 'express';
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

  // PRIMER SOCKET nuevo que recibe el nombre del usuario y el chat/room en el que esta
  socket.on('join room', async({ username, chat }) => {

    // En el socket guardamos data
    socket.data.username = username;
    socket.data.room = chat;
    // Metemos al usuario al chat correspondiente
    socket.join(chat);

    // Impresion en la consola
    console.log("Join room | usuario:", username, "| room:", chat);

    try {
    // Filtrado para traer los de una sala especifica WHERE room = $1 
      const result = await pool.query(
        `SELECT id, content, username, room, created_at
         FROM messages
         WHERE room = $1       
         ORDER BY created_at ASC, id ASC`,
        [chat]       // Filtrado para traer los de una sala especifica
      );

      // Enviamos a la UI chat history
      /*
        {
          id: 1,
          content: "Hola",
          username: "Hugo",
          room: "general",
          created_at: "2026-04-26T..."
        }
      */
      socket.emit('chat history', result.rows);
    } catch (e) {
      console.error('Error fetching room messages:', e);
    }
  })

  // SEGUNDO SOCKET nuevo que recibe el chat/room en el que esta
  socket.on('leave room', async({ chat }) => {
    console.log("Leave room| room:", chat);
    // Como entramos con join debemos de salir
    socket.leave(chat);
  })

// TECER SOCKET, EL QUE EMPEZAMOS A TRABAJAR EN CLASE
 socket.on('chat message', async (msg) => {
    // Nueva logica de asignacion de valores
    const message = typeof msg === 'object' ? msg : { content: msg };
    const content = message.content;
    // Principalmente por que guardamos data en el socket
    const username = socket.data.username || 'anonymous';
    const room = socket.data.room || 'General';


    console.log('message: ' + content);
    let result;
    try {
      result = await pool.query(
        `INSERT INTO messages (content, username, room)
         VALUES ($1, $2, $3)
         RETURNING id, content, username, room, created_at`,
        [content, username, room]
      );
      // Envía el mensaje guardado a todos los sockets que están dentro de esa sala.
      // result.rows[0] es el mensaje recién insertado.
      io.to(room).emit('chat message', result.rows[0]);
    } catch (e) {
      console.error('Error inserting message:', e);
      return;
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
  // Recuperar mensajes que se mandaron cuando tu estuviste desconectado
  connectionStateRecovery: {

  }
});

// prep for deployment
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`server running on port ${PORT}`);
});
