# Chatify

Chatify es la actividad realizada en clase con React + Vite para el frontend y un servidor desplegado en Railway. Esta rama corresponde a lo trabajado durante la clase y al deploy general de la actividad.

El proyecto completo y el desarrollo por tickets se puede encontrar en las otras ramas del repositorio. Cada ticket fue trabajado en su propia rama.

## Deploy

Frontend en Vercel:

```txt
https://chatify-five-ecru.vercel.app/
```

El servidor esta hosteado en Railway y el frontend se conecta al backend mediante Socket.IO.

## Division del proyecto por ramas

El proyecto esta dividido en ramas de frontend y backend:

- `UI`: rama principal de la actividad hecha en clase.
- `UI-develop`: rama donde esta integrado el desarrollo terminado del frontend.
- `server-develop`: rama donde esta integrado el desarrollo terminado del servidor.
- Ramas `UI-*`: ramas correspondientes a tickets del frontend.
- Ramas `server-*` o `SERVER-*`: ramas correspondientes a tickets del backend.

Ejemplos de ramas del frontend:

- `UI-chat-001-rooms`
- `UI-chat-002-autenticacion`
- `UI-003-activeUsers`
- `UI-004`
- `UI-005`

Ejemplos de ramas del backend:

- `server-chat-001-rooms`
- `server-chat-002-autenticacion`
- `SERVER-003-activeUsers`
- `server-004`
- `server-005`

## Requisitos

- Node.js
- npm
- Servidor de Chatify corriendo localmente o desplegado en Railway

## Como correr el frontend localmente

1. Instalar dependencias:

```bash
npm install
```

2. Configurar la URL del servidor si no se usara el valor por defecto.

Por defecto, el frontend intenta conectarse a:

```txt
http://localhost:3000
```

Si se quiere apuntar al servidor de Railway u otra URL, crear un archivo `.env` en la raiz del proyecto:

```bash
VITE_SOCKET_URL=https://URL_DEL_SERVER_EN_RAILWAY
```

3. Levantar el proyecto:

```bash
npm run dev
```

4. Abrir la URL que muestra Vite en la terminal, normalmente:

```txt
http://localhost:5173
```

## Como correr el servidor localmente

El servidor puede correrse localmente con una base de datos PostgreSQL local usando:

```bash
DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify" npm start
```

## Scripts disponibles

```bash
npm run dev
```

Inicia el frontend en modo desarrollo.

```bash
npm run build
```

Genera la version de produccion.

```bash
npm run preview
```

Sirve localmente la version generada por `npm run build`.

```bash
npm run lint
```

Ejecuta ESLint para revisar el codigo.

## Estructura del proyecto

```txt
src/
  App.jsx
  main.jsx
  socket.js
  App.css
  index.css
  assets/
    hero.png
    react.svg
    vite.svg
  components/
    Channels.jsx
    Chats.jsx
    ManageConnnection.jsx
    MyForm.jsx
    Users.jsx
    *.css
```

- `src/main.jsx`: punto de entrada de React.
- `src/App.jsx`: componente principal de la aplicacion.
- `src/socket.js`: configuracion de Socket.IO y conexion con el servidor.
- `src/components/`: componentes de la interfaz de chat.
- `src/assets/`: imagenes y recursos estaticos.

## Video de explicacion de tickets

La explicacion de los tickets y de como se trabajo cada rama se encuentra en este video:

```txt
https://youtu.be/boAvT8zibRI
```
