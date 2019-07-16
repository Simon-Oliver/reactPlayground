import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { Test } from './helpers/PrivateRoute';
import Dashboard from './Dashboard';
import Login from './Login';
import withAuth from './helpers/withAuth';

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Test} />
          <Route path="/login" component={Login} />
          <Route path="/protected" component={withAuth(Dashboard)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
// <PrivateRoute path="/protected" component={Dashboard} />
