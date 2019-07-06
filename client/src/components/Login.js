import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    userName: ''
  };

  changeInput = e => {
    this.setState({ userName: e.target.value });
  };

  renderUsers() {
    const { users } = this.props;
    const renderList = users.map(e => <li key={e.userId}>{e.userName}</li>);
    return renderList;
  }

  render() {
    const { loggedIn, userName, users } = this.props;
    return (
      <div>
        <h3>Test Socket.io</h3>
        {users.length ? (
          <div>
            <h4>Active Users</h4>
            <ul>{this.renderUsers()}</ul>
          </div>
        ) : (
          <h3>No Users</h3>
        )}
        <div>
          {loggedIn ? (
            <p>
              {`You're logged in as
              ${userName}`}
            </p>
          ) : (
            <div>
              <p>Please login!</p>
              <input value={this.state.userName} onChange={e => this.changeInput(e)} />
              <button onClick={() => this.props.sendEmit(this.state.userName)}>Test Emit</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
