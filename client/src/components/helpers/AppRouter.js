import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Menu from '../Menu';
import { Test } from './PrivateRoute';
import Dashboard from '../Dashboard';
import Login from '../Login';
import withAuth from './withAuth';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Switch>
          <Route path="/" exact component={Test} />
          <Route path="/login" component={Login} />
          <Route path="/protected" component={withAuth(Dashboard)} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
