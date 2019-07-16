import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Test } from './helpers/PrivateRoute';
import Dashboard from './Dashboard';
import Login from './Login';
import withAuth from './helpers/withAuth';

const App = () => {
  return (
    <div className="ui segment">
      <Router>
        <div>
          <div className="ui secondary  menu">
            <Link className="item" to="/">
              Public Page
            </Link>
            <Link className="item" to="/protected">
              Protected Page
            </Link>
            <a className="ui item">Logout</a>
          </div>
          <Switch>
            <Route path="/" exact component={Test} />
            <Route path="/login" component={Login} />
            <Route path="/protected" component={withAuth(Dashboard)} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
// <PrivateRoute path="/protected" component={Dashboard} />
