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

// Setting up a socket with the namespace "connection" for new sockets

io.on('connection', socket => {
  socket.on('auth_check', () => {
    console.log('auth check fired');
    if (
      socket.handshake.query &&
      socket.handshake.query.token &&
      socket.handshake.query.token !== 'undefined'
    ) {
      jwt.verify(socket.handshake.query.token, 'secret', function(err, decoded) {
        if (err) {
          io.emit('error', { error: 'authentication_error' });
        } else {
          socket.decoded = decoded;
          console.log('is authenitcated');
          io.emit('auth', { isAuth: true });
        }
      });
    } else {
      io.emit('error', { error: 'authentication_error' });
    }
  });

  socket.on('login', user => {
    const existingUser = users.find(u => u.userName === user.userName);
    if (!existingUser) {
      io.emit('error', { error: 'no_user_account' });
    } else {
      const correctPw = existingUser.password === user.password;
      if (existingUser && correctPw) {
        const token = jwt.sign({ userName: user.userName }, 'secret');
        const index = users.findIndex(item => item.name === user.userName);
        const updatedUser = { ...existingUser, token };
        users.splice(index, 1, updatedUser);
        io.emit('login', updatedUser);
        console.log(existingUser);
      } else if (existingUser && !correctPw) {
        io.emit('error', { error: 'incorrect_password' });
      }
    }
  });

  socket.on('create_user', userName => {
    const existingUser = users.find(u => u.userName === userName);
    if (existingUser) {
      io.emit('create_user', { error: 'user_taken' });
    } else {
      const token = jwt.sign({ userName }, 'secret');
      const userObj = { userName, token };
      users.push(userObj);
      socket.emit('create_user', userObj);
    }
  });

  // socket.on('init_data', () => {
  //   io.emit('get_data', { users, messages });
  // });

  // // Here we listen on a new namespace called "incoming data"
  // socket.on('incoming data', data => {
  //   // Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
  //   socket.broadcast.emit('outgoing data', { num: data });
  // });

  // socket.on('newUser', userName => {
  //   const existingUser = users.find(u => u.userName === userName);

  //   if (existingUser) {
  //     socket.emit('existing user', existingUser);
  //   } else if (!existingUser) {
  //     const token = jwt.sign({ userName }, 'secret');
  //     const userObj = { userName, token };
  //     users.push(userObj);
  //     socket.emit('initUser', userObj);
  //     io.emit('outgoing users', users);
  //     console.log(users);
  //   }
  // });

  // socket.on('message', message => {
  //   console.log(message);
  //   messages.push(message);
  //   io.emit('outgoing messages', message);
  // });

  // A special namespace "disconnect" for when a client disconnects
  socket.on('disconnect', () => console.log('Client disconnected ' + socket.id));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   // const token = jwt.sign({ _id: 'abc123' }, 'this is my secret', { expiresIn: '7days' });
//   // console.log(token);

//   const isTrue = jwt.verify(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InBhdHJpY2siLCJpYXQiOjE1NjI2NTUwMzN9.fJnnWHJl65gLYS3--HM5L5Z-Ip5JQIDQT4PeHR88ujw',
//     'secret'
//   );
//   console.log(isTrue);
// };

// myFunction();
