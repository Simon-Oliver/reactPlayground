import React, { Component } from 'react';

export default class Items extends Component {
  state = {
    data: []
  };

  getData() {
    fetch('/api/getList')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  componentDidMount() {
    this.getData();
  }

  renderArr() {
    const { data } = this.state;
    const renderList = data.map(e => <li>{e}</li>);
    return renderList;
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        {this.state.data.length ? <ul>{this.renderArr()}</ul> : <p>Loading!</p>}
      </div>
    );
  }
}
