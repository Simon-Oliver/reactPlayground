import React, { Component } from 'react';

export default class Message extends Component {
  state = {
    message: ''
  };

  onMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  submitMessage = () => {
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  };

  render() {
    return (
      <div>
        <textarea value={this.state.message} onChange={e => this.onMessageChange(e)} />
        <button onClick={this.submitMessage}>Send</button>
      </div>
    );
  }
}
