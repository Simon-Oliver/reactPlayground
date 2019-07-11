import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      props.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export const Test = () => <h3>Test</h3>;
