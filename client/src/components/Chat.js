import React, { Component } from 'react';
import io from 'socket.io-client';
import Login from './Login';

export default class Chat extends Component {
  state = {
    response: 0,
    endpoint: 'http://192.168.1.105:5000/',
    userName: '',
    userId: '',
    users: [],
    loggedIn: false,
    message: '',
    messages: [],
    error: ''
  };

  socket = io.connect(this.state.endpoint);

  componentDidMount() {
    console.log(sessionStorage);
    // Very simply connect to the socket
    // Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    // this.socket.emit('init_data');
    // this.socket.on('get_data', data =>
    //   this.setState({ users: data.users, messages: data.messages })
    // );
    // this.socket.on('outgoing data', data => this.setState({ response: data.num }));
    // this.socket.on('outgoing users', users => this.setState({ users }));
    // this.socket.on('initUser', user => {
    //   console.log('Init User Fired', user);
    //   this.setState({ userName: user.userName });
    //   sessionStorage.token = user.token;
    //   console.log(sessionStorage);
    // });
    // this.socket.on('error', e => this.setState({ error: e }));
    const hasToken = !sessionStorage.userName !== 'undefined';
    console.log(!sessionStorage.userName === 'undefined');
    if (hasToken) {
      console.log('componenstDidMount with sesssionstorage');
      this.socket.emit('auth_check');
    }
    this.socket.on('create_user', data => {
      sessionStorage.token = data.token;
      sessionStorage.userName = data.userName;
      this.socket.emit('auth_check');
      this.setState({ error: '' });
    });
    this.socket.on('auth', e => console.log('Is authenticated', e));
    this.socket.on('error', e => console.log(e));
    this.socket.emit('login', { userName: 'oli', password: 'abc123' });
    this.socket.on('login', data => {
      console.log(data);
      sessionStorage.token = data.token;
      sessionStorage.userName = data.userName;
      this.setState({ useName: data.userName, userId: data.userId });
    });
    // this.socket.on('outgoing messages', message => {
    //   console.log(message);
    //   this.setState(prevState => ({ messages: [...prevState.messages, message] }));
    // });
    // this.socket.on('existing user', user =>
    //   this.setState({ userName: user.userName, userId: user.userId })
    // );
  }

  componentWillUnmount() {
    // this.socket.off('outgoing data');
    // this.socket.off('outgoing users');
  }

  sendEmit = userName => {
    this.socket.emit('create_user', userName);
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
    const isLoggedIn = this.state.error.type !== 'authentication_error';

    return (
      <div>
        {isLoggedIn ? <p>Authenticated</p> : <p>Not Authenticated</p>}
        <Login
          loggedIn={this.state.loggedIn}
          sendEmit={this.sendEmit}
          users={this.state.users}
          userName={this.state.userName}
        />
      </div>
    );
  }
}
