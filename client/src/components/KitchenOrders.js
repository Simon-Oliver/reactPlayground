import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import KitchenOrder from './KitchenOrder';
import { initOrder } from '../actions';

class KitchenOrders extends Component {
  socket = io.connect('http://192.168.1.105:5000/');

  componentDidMount() {
    this.socket.emit('test');
    this.socket.on('test', data => console.log(data));
    this.props.initOrder();
  }

  render() {
    return (
      <div>
        <h3>Kitchen Orders</h3>
        <KitchenOrder />
      </div>
    );
  }
}

const mapStateProps = state => {
  console.log('Kitchen Order', state);
  return { order: state.orders };
};

export default connect(
  mapStateProps,
  { initOrder }
)(KitchenOrders);
