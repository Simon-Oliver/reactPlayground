import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

export default class Item extends Component {
  state = {
    response: 0,
    endpoint: 'http://192.168.1.105:5000/',
    userName: '',
    users: []
  };

  componentDidMount() {
    const { endpoint } = this.state;
    // Very simply connect to the socket
    const socket = socketIOClient(endpoint);
    // Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    socket.emit('init_data');
    socket.on('get_data', users => this.setState({ users }));
    socket.on('outgoing data', data => this.setState({ response: data.num }));
    socket.on('outgoing users', users => this.setState({ users }));
  }

  componentWillUnmount() {
    const { endpoint } = this.state;
    // Very simply connect to the socket
    const socket = socketIOClient(endpoint);
    socket.off('outgoing data');
    socket.off('outgoing users');
  }

  sendEmit = e => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('newUser', this.state.userName);
    this.setState({ userName: '' });
  };

  changeInput = e => {
    this.setState({ userName: e.target.value });
  };

  renderUsers() {
    const { users } = this.state;
    const renderList = users.map(e => <li key={e.id}>{e.name}</li>);
    return renderList;
  }

  render() {
    return (
      <div className="container" style={{ height: '100vh', width: '100vw' }}>
        <h3>Test Socket.io</h3>
        <input value={this.state.userName} onChange={e => this.changeInput(e)} />
        <button onClick={() => this.sendEmit()}>Test Emit</button>
        {this.state.users.length ? <ul>{this.renderUsers()}</ul> : <h3>No Users</h3>}
      </div>
    );
  }
}
