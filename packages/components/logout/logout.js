/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';

export class Logout extends React.Component {
  static displayName = 'Logout';
  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.func.isRequired,
  };
  state = { loading: false };
  // remove cookie and reload page to reset apollo client
  logout = async () => {
    this.setState({ loading: true });
    await fetch(`${process.env.GRAPHQL_ENDPOINT}/logout`, {
      body: '{}',
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      // Sends and accepts cookies
      // They won't be sent at all if this is not set
      // It would be better to set this to 'same-origin'
      credentials: 'include',
    }).then(res => res.json());
    this.setState({ loading: false });
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
