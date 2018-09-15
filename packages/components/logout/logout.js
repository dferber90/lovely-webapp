/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'cookies-js';

export class Logout extends React.Component {
  static displayName = 'Logout';

  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.func.isRequired,
  };

  state = { loading: false };

  // remove cookie and reload page to reset apollo client
  logout = () => {
    // remove cookie and reload page to reset apollo client
    Cookies.expire('authToken');
    if (this.props.to) {
      window.location.replace(this.props.to);
    } else {
      window.location.reload();
    }
  };

  render() {
    return this.props.children({
      loading: this.state.loading,
      logout: this.logout,
    });
  }
}
