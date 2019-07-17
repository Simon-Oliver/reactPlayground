import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  state = {
    email: '',
    name: '',
    role: ''
  };

  componentDidMount() {
    fetch('/secret')
      .then(res => res.json())
      .then(data => this.setState({ ...data }));
  }

  render() {
    return (
      <div>
        <h3>{`I'm a private dashboard for "${this.state.name}"`}</h3>
      </div>
    );
  }
}

export default Dashboard;
