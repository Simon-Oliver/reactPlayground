import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, Test } from './helpers/PrivateRoute';
import Dashboard from './Dashboard';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Route path="/public" component={Test} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Dashboard} />
      </div>
    </Router>
  );
};

export default App;
