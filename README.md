# Chatify Server

Servidor de Chatify desarrollado con Node.js, Express, Socket.IO y PostgreSQL. Esta rama (`server-develop`) contiene la version terminada del desarrollo del servidor y funciona como rama base para las ramas de tickets del backend.

## Requisitos

- Node.js
- npm
- PostgreSQL corriendo localmente
- Base de datos local llamada `chatify`
- UI de Chatify corriendo desde la rama `UI-develop`

## Como correr la UI

La interfaz web existe en la rama `UI-develop`. Por defecto, el servidor permite conexiones desde:

```txt
http://localhost:5173
```

Si la UI esta corriendo en otra URL, configurar la variable `CLIENT_URL` al levantar el servidor:

```bash
CLIENT_URL=http://localhost:5173 DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify" npm start
```

## Como correr el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Tener PostgreSQL corriendo y crear la base de datos local:

```txt
chatify
```

3. Levantar el servidor con la URL de conexion a PostgreSQL:

```bash
DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify" npm start
```

4. El servidor queda disponible por defecto en:

```txt
http://localhost:3000
```

Si se quiere usar otro puerto, configurar la variable `PORT`:

```bash
PORT=3001 DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify" npm start
```

## Base de datos

El servidor usa PostgreSQL mediante la variable `DATABASE_URL`.

Al iniciar, el servidor crea automaticamente la tabla `messages` si no existe:

```sql
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    content TEXT,
    username TEXT,
    room TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Variables de entorno

```bash
DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify"
```

URL de conexion a PostgreSQL. Esta variable es obligatoria para que el servidor pueda guardar y consultar mensajes.

```bash
CLIENT_URL=http://localhost:5173
```

URL del frontend permitida por CORS. Si no se configura, el valor por defecto es `http://localhost:5173`.

```bash
PORT=3000
```

Puerto donde corre el servidor. Si no se configura, el valor por defecto es `3000`.

## Scripts disponibles

```bash
npm start
```

Inicia el servidor con Node.js.

```bash
npm test
```

Script de prueba por defecto. Actualmente no hay pruebas configuradas.

## Eventos de Socket.IO

El servidor maneja los eventos principales del chat:

- `join room`: une al usuario a una sala y envia el historial de mensajes de esa sala.
- `leave room`: saca al usuario de una sala.
- `chat message`: guarda un mensaje en PostgreSQL y lo envia a los usuarios de la sala.
- `typing`: avisa a los usuarios de la sala cuando alguien esta escribiendo.
- `room users`: envia la lista de usuarios conectados en una sala.
- `chat history`: envia el historial de mensajes de una sala al usuario que entra.

## Ramas de trabajo

El desarrollo esta separado por ramas de UI y servidor:

- `UI-develop`: rama donde esta terminado el desarrollo del frontend. De esta rama salen las ramas de tickets de UI.
- `server-develop`: rama donde esta terminado el desarrollo del servidor. De esta rama salen las ramas de tickets del backend.
- Cada ticket se trabaja en una rama independiente.

Ejemplos de ramas por ticket:

- `UI-chat-001-rooms`
- `UI-chat-002-autenticacion`
- `UI-003-activeUsers`
- `UI-004`
- `UI-005`
- `server-chat-001-rooms`
- `server-chat-002-autenticacion`
- `SERVER-003-activeUsers`
- `server-004`
- `server-005`

## Explicacion de tickets

La explicacion de cada ticket esta en este video:

https://youtu.be/boAvT8zibRI

Cada ticket corresponde a una rama, por lo que se puede revisar el avance entrando a la rama especifica del ticket.
