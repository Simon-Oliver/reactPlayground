import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isAuthFunc } from '../../actions';

function withAuth(ComponentToProtect) {
  return class extends Component {
    state = {
      loading: true,
      redirect: false
    };

    componentDidMount() {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.props.isAuthFunc(true);
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          this.props.isAuthFunc(false);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}

const mapStateToProps = state => {
  console.log('withAuth mapStateToProps', state);
  return { isAuth: state.isAuth };
};

const composeWithAuth = compose(
  connect(
    mapStateToProps,
    { isAuthFunc }
  ),
  withAuth
);

export default composeWithAuth;
