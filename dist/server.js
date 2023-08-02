"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _App = require('./App'); var _App2 = _interopRequireDefault(_App);
require('dotenv/config');
var _http = require('http');
var _socketio = require('socket.io');

const PORT = process.env.PORT || 3000;

const server = _http.createServer.call(void 0, _App2.default);
const io = new (0, _socketio.Server)(server, {
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