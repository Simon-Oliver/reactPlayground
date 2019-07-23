import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthFunc } from '../actions';

class Menu extends Component {
  // Not working properly as state is not updated when login in! component already mounted. Redux!!!
  state = {
    loading: true
    // isAuth: false
  };

  componentDidMount() {
    fetch('/checkToken')
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
          // this.props.isAuthFunc(true);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        // this.props.isAuthFunc(false);
        this.setState({ loading: false, redirect: true });
      });
  }

  //   isAuth = () => {
  //     isAuth.authenticate(() => {
  //       this.setState({ loading: false, isAuth: true }, () => console.log('setState fired'));
  //     });
  //   };

  render() {
    return (
      <div className="ui secondary  menu">
        <NavLink className="item" to="/" activeClassName="is-active" exact>
          Public Page
        </NavLink>
        <NavLink className="item" to="/protected" activeClassName="is-active">
          Protected Page
        </NavLink>
        {this.props.isAuth ? (
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

const mapStateToProps = state => {
  return { isAuth: state.auth.isAuth };
};

export default connect(
  mapStateToProps,
  { isAuthFunc }
)(Menu);
