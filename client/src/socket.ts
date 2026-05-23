import { io } from 'socket.io-client';

const socket = io('https://logisticos-q046.onrender.com', {
  transports: ['websocket'], // Force WebSocket to prevent HTTP long-polling spam
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;
