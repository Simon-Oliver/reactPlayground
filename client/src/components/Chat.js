import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Login from './Login';
import Message from './Message';
import Messages from './Messages';

export default class Chat extends Component {
  state = {
    response: 0,
    endpoint: 'http://192.168.1.105:5000/',
    userName: '',
    userId: '',
    users: [],
    loggedIn: false,
    message: '',
    messages: []
  };

  socket = socketIOClient(this.state.endpoint);

  componentDidMount() {
    // Very simply connect to the socket

    // Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    this.socket.emit('init_data');
    this.socket.on('get_data', data =>
      this.setState({ users: data.users, messages: data.messages })
    );
    this.socket.on('outgoing data', data => this.setState({ response: data.num }));
    this.socket.on('outgoing users', users => this.setState({ users }));
    this.socket.on('initUser', user => {
      console.log('Init User Fired', user);
      this.setState({ userName: user.userName, userId: user.userId });
    });

    this.socket.on('outgoing messages', message => {
      console.log(message);
      this.setState(prevState => ({ messages: [...prevState.messages, message] }));
    });

    // const watchID = navigator.geolocation.watchPosition(position => {
    //   this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
    //   console.log(position.coords.latitude, position.coords.longitude);
    // });

    // this.setState({ geoLoc: watchID });
  }

  componentWillUnmount() {
    // this.socket.off('outgoing data');
    // this.socket.off('outgoing users');
  }

  sendEmit = userName => {
    this.socket.emit('newUser', userName);
    this.setState({ loggedIn: true });
  };

  sendMessage = message => {
    console.log(message);
    this.setState({ message }, () => {
      this.socket.emit('message', {
        userName: this.state.userName,
        id: this.socket.id,
        message: this.state.message
      });
    });
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
        {this.state.messages.length ? (
          <Messages messages={this.state.messages} />
        ) : (
          <p>Loading...</p>
        )}
        <Message sendMessage={this.sendMessage} />
      </div>
    );
  }
}
