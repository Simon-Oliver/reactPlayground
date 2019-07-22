import React, { Component } from 'react';
import { connect } from 'react-redux';
import KitchenOrder from './KitchenOrder';
import { initOrder } from '../actions';

class KitchenOrders extends Component {
  componentDidMount() {
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
};

export default connect(
  mapStateProps,
  { initOrder }
)(KitchenOrders);
