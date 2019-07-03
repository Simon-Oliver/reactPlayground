import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events';

const socketUrl = 'http://192.168.1.105:5000/';

export default class Items extends Component {
  state = {
    data: [],
    response: false,
    socket: null,
    user: null
  };

  initSocket = () => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('conneceted');
    });
    this.setState({ socket });
  };

  getData = () => {
    fetch('/api/getList')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      .then(() => console.log(this.state.data));
  };

  componentDidMount() {
    this.initSocket();
  }

  renderArr() {
    const { data } = this.state;
    const renderList = data.map(e => <li>{e}</li>);
    return renderList;
  }

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  logout = () => {
    const { socket } = this.setState;
    socket.emmit(LOGOUT);
    this.setState({ user: null });
  };

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <div>
          <h3>Online Users</h3>
          <ul />
        </div>
        <div>
          <h3>Chat</h3>
          <form>
            <textarea />
            <input type="submit" />
          </form>
        </div>
        <button onClick={this.getData}>CLick</button>
      </div>
    );
  }
}
