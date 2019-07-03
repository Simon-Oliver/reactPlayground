const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const users = [];
const connections = [];

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(connections);
  console.log('Sent list of items');
});
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log('App is listening on port ' + port);

io.sockets.on('connection', socket => {
  connections.push(socket.id);
  console.log('Connected: %s sockets connected', connections.length);

  // Disconnect
  // connections.splice(connections.indexOf(socket), 1);
  // console.log('Disconnected: %s sockets connected', connections.length);
});
