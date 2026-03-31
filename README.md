# Chat Frontend

Real-time chat UI built with React, Tailwind CSS, and Socket.IO.

Paired with [Chat-Backend](https://github.com/Colin0224/Chat-Backend).

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

Make sure the [Chat Backend](https://github.com/Colin0224/Chat-Backend) is running.

## Tech Stack

| Layer       | Tool              |
| ----------- | ----------------- |
| Framework   | React 19 + TypeScript |
| Routing     | React Router 7    |
| Build       | Vite 7            |
| Styling     | Tailwind CSS 4    |
| WebSocket   | Socket.IO Client 4 |
| Animation   | Framer Motion     |
| Icons       | Lucide React      |

## Features

- **Join Room** — Enter a 6-character room code to join an existing chat
- **Create Room** — Generate a random room code and share it with others
- **Real-time messaging** — Messages are sent and received instantly via WebSockets
- **Message history** — Previous messages in a room are loaded on join
- **Auto-scroll** — Chat feed sticks to the bottom, pauses if you scroll up

## Project Structure

```
src/
├── App.tsx             # Route definitions (/ and /chat/:roomId)
├── ChatCreation.tsx    # Landing page — join or create a room
├── chatUI.tsx          # Chat room interface
├── App.css             # Root layout + scroll container styles
├── ChatCreation.css    # Title font styles
├── index.css           # Tailwind import + base styles
└── main.tsx            # Entry point with BrowserRouter
```
