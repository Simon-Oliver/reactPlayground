import React, { Component } from 'react';
import { connect } from 'react-redux';
import KitchenOrder from './KitchenOrder';

class KitchenOrders extends Component {
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

export default connect(mapStateProps)(KitchenOrders);
