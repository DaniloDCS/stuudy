import App from './App';
import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';

import { connection } from './database/connection';
import { authenticate } from './database/authenticate';
const { auth, onlyAdmins, connecting } = authenticate();
import { User } from './models/User';

const PORT = process.env.PORT || 3000;

const server = createServer(App);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(PORT, () => {
  console.clear();
  console.log(`Server running on port ${PORT} - ${new Date()}`);
});