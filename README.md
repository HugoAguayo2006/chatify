# Chatify UI

Interfaz web de Chatify desarrollada con React + Vite. Esta rama (`UI-develop`) contiene la version terminada del desarrollo de UI y funciona como rama base para las ramas de tickets del frontend.

## Requisitos

- Node.js
- npm
- Servidor de Chatify corriendo desde la rama `server-develop`

## Como correr el servidor

El servidor se corre desde la rama `server-develop` usando una base de datos local de PostgreSQL. El comando es:

```bash
DATABASE_URL="postgresql://postgres:Pepeh2014.@localhost:5433/chatify" npm start
```

## Como correr el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Configurar la URL del servidor si no se usara el valor por defecto.

El proyecto se conecta por defecto a:

```txt
http://localhost:3000
```

Si el servidor esta en otra URL, crear un archivo `.env` en la raiz del proyecto:

```bash
VITE_SOCKET_URL=http://localhost:3000
```

3. Levantar el frontend en modo desarrollo:

```bash
npm run dev
```

4. Abrir la URL que muestra Vite en la terminal, normalmente:

```txt
http://localhost:5173
```

## Scripts disponibles

```bash
npm run dev
```

Inicia el proyecto en modo desarrollo.

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
