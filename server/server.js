import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected to Socket.io');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
