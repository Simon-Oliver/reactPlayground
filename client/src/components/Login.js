import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    userName: '',
    isAuthenticated: true
  };

  changeInput = e => {
    this.setState({ userName: e.target.value });
  };

  render() {
    const { loggedIn, userName, users } = this.props;
    return (
      <div>
        <h3>Test Socket.io</h3>
        <div>
          <p>Please login!</p>
          <input value={this.state.userName} onChange={e => this.changeInput(e)} />
          <button onClick={() => this.props.sendEmit(this.state.userName)}>Test Emit</button>
        </div>
      </div>
    );
  }
}
