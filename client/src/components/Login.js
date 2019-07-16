import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isLogin } from './utils/index';

export default class Login extends Component {
  state = { redirectToReferrer: false, email: '', password: '' };

  _isMounted = false;

  login = () => {
    console.log('Login fired');
    isLogin.authenticate(this.state, () => {
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

    if (redirectToReferrer) {
      return <Redirect to={{ pathname: from.pathname, state: this.state.email }} />;
    }
    return (
      <div className="ui segment">
        <p>You must log in to view this page.</p>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
