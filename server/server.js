const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

// Port from environment variable or default - 4001
const port = process.env.PORT || 5000;

// Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const users = [
  {
    userName: 'oli',
    password: 'abc123',
    userId: 'xxx123',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InBhdHJpY2siLCJpYXQiOjE1NjI2NTUwMzN9.fJnnWHJl65gLYS3--HM5L5Z-Ip5JQIDQT4PeHR88ujw'
  }
];
const messages = [];
const client = [];
const secret = 'You can only see me if you are logged in.';

app.get('/test', (req, res) => {
  console.log('Whoop');
  io.on('connection', socket => {
    socket.on('isLogin', data => {
      console.log('isLogin fired', data);
      if (data === '1234') {
        io.emit('isLogin', { isLogin: true });
      } else {
        io.emit('isLogin', { isLogin: false });
      }
    });

    socket.on('disconnect', () => console.log('Client disconnected ' + socket.id));
  });
});

// Setting up a socket with the namespace "connection" for new sockets

server.listen(port, () => console.log(`Listening on port ${port}`));
