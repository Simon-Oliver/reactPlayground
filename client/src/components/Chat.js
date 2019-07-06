import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Login from './Login';

export default class Chat extends Component {
  state = {
    response: 0,
    endpoint: 'http://192.168.1.105:5000/',
    userName: '',
    userId: '',
    users: [],
    loggedIn: false
  };

  socket = socketIOClient(this.state.endpoint);

  componentDidMount() {
    // Very simply connect to the socket

    // Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    this.socket.emit('init_data');
    this.socket.on('get_data', users => this.setState({ users }));
    this.socket.on('outgoing data', data => this.setState({ response: data.num }));
    this.socket.on('outgoing users', users => this.setState({ users }));
    this.socket.on('initUser', user => {
      console.log('Init User Fired', user);
      this.setState({ userName: user.userName, userId: user.userId });
    });

    const watchID = navigator.geolocation.watchPosition(position => {
      this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
      console.log(position.coords.latitude, position.coords.longitude);
    });

    this.setState({ geoLoc: watchID });
  }

  componentWillUnmount() {
    // const { endpoint } = this.state;
    // Very simply connect to the socket
    // const socket = socketIOClient(endpoint);
    // socket.off('outgoing data');
    // socket.off('outgoing users');
  }

  sendEmit = userName => {
    this.socket.emit('newUser', userName);
    this.setState({ loggedIn: true });
  };

  render() {
    return (
      <div>
        <Login
          loggedIn={this.state.loggedIn}
          sendEmit={this.sendEmit}
          users={this.state.users}
          userName={this.state.userName}
        />
        <p>{this.state.lat}</p>
      </div>
    );
  }
}
