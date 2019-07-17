import React from 'react';

import AppRouter from './helpers/AppRouter';

const App = () => {
  return (
    <div className="ui segment">
      <AppRouter />
    </div>
  );
};

export default App;
// <PrivateRoute path="/protected" component={Dashboard} />
