import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isLogin } from './utils/index';

export default class Login extends Component {
  state = { redirectToReferrer: false };

  _isMounted = false;

  login = () => {
    isLogin.authenticate(data => {
      if (this._isMounted) {
        this.setState({ redirectToReferrer: true });
      }
    });
  };

  componentDidMount() {
    fetch('http://localhost:3000/test');
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}
