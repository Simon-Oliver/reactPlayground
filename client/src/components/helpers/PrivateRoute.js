import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogin } from '../utils/index';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isLogin.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export const Test = () => <h3>Test</h3>;
