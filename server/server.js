const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const uuid = require('uuid');

// Port from environment variable or default - 4001
const port = process.env.PORT || 5000;

// Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = [];
const client = [];

// Setting up a socket with the namespace "connection" for new sockets
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('init_data', () => {
    io.emit('get_data', users);
  });

  // Here we listen on a new namespace called "incoming data"
  socket.on('incoming data', data => {
    // Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    socket.broadcast.emit('outgoing data', { num: data });
  });

  socket.on('newUser', userName => {
    console.log('New client connected ' + socket.id);
    const userObj = { userName, userId: socket.id };
    console.log(userObj);
    users.push(userObj);
    socket.emit('initUser', userObj);
    console.log('SOCKET_ID: ', userObj.userId);
    io.emit('outgoing users', users);

    console.log(users);
  });

  socket.on('message', message => {
    console.log(message);
    socket.broadcast.emit('outgoing messages', message);
  });

  // A special namespace "disconnect" for when a client disconnects
  socket.on('disconnect', () => console.log('Client disconnected ' + socket.id));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
