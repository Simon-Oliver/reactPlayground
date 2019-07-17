import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { isAuth } from './utils';

export default class Menu extends Component {
  // Not working properly as state is not updated when login in! component already mounted. Redux!!!
  state = {
    loading: true,
    isAuth: false
  };

  componentDidMount() {
    this.isAuth();
  }

  isAuth = () => {
    isAuth.authenticate(() => {
      this.setState({ loading: false, isAuth: true }, () => console.log('setState fired'));
    });
  };

  render() {
    return (
      <div className="ui secondary  menu">
        <NavLink className="item" to="/" activeClassName="is-active" exact>
          Public Page
        </NavLink>
        <NavLink className="item" to="/protected" activeClassName="is-active">
          Protected Page
        </NavLink>
        {this.state.isAuth ? (
          <NavLink className="item" activeClassName="is-active">
            Logout
          </NavLink>
        ) : (
          <NavLink className="item" to="/login" activeClassName="is-active">
            Login
          </NavLink>
        )}
      </div>
    );
  }
}
