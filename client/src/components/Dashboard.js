import React from 'react';

class Dashboard extends React.Component {
  state = {
    email: ''
  };

  componentDidMount() {
    fetch('/secret')
      .then(res => res.text())
      .then(data => this.setState({ email: data }));
  }

  render() {
    return (
      <div>
        <h3>{`I'm a private dashboard for "${this.state.email}"`}</h3>
      </div>
    );
  }
}

export default Dashboard;
