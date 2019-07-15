import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isLogin } from './utils/index';

export default class Login extends Component {
  state = { redirectToReferrer: false, name: '', password: '' };

  _isMounted = false;

  login = () => {
    console.log('Login fired');
    isLogin.authenticate(() => {
      if (this._isMounted) {
        this.setState({ redirectToReferrer: true });
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.login();
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>
          You must log in to view the page at
          {from.pathname}
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          <label>
            Password:
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}
