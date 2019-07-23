const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');

const router = require('./routes/routes');

const app = express();

const mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/kitchenTicketing';
mongoose.connect(
  mongo_uri,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client/public')));
app.use('/', router);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server);

// Setting up a socket with the namespace "connection" for new sockets

io.on('connection', socket => {
  console.log(socket.id);
  socket.on('test', () => {
    io.emit('test', 'This is working');
  });

  socket.on('disconnect', () => console.log('Client disconnected ' + socket.id));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
