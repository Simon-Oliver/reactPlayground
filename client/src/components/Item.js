import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

export default class Item extends Component {
  state = {
    response: 0,
    endpoint: 'http://192.168.1.105:5000/'
  };

  componentDidMount() {
    const { endpoint } = this.state;
    // Very simply connect to the socket
    const socket = socketIOClient(endpoint);
    // Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    socket.on('outgoing data', data => this.setState({ response: data.num }));
  }

  render() {
    return (
      <div>
        <h3>Test</h3>
      </div>
    );
  }
}
