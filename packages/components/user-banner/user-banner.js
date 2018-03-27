/* eslint-env browser */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { LocalLink } from '@wa/design-system';
import { FriendlyLoader } from '../friendly-loader';
import { Logout } from '../logout';

class LogoutButton extends React.Component {
  static displayName = 'LogoutButton';
  render() {
    return (
      <Logout to="/">
        {({ loading, logout }) => (
          <button
            className="dib bg-red white pa3 pointer dim"
            disabled={loading}
            onClick={logout}
          >
            Logout
          </button>
        )}
      </Logout>
    );
  }
}

export class UserBanner extends React.Component {
  static displayName = 'UserBanner';
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    me: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  render() {
    if (this.props.loading) {
      return <FriendlyLoader />;
    }

    const isLoggedIn = this.props.me && this.props.me.id !== null;

    if (isLoggedIn)
      return (
        <div>
          <span>User: {this.props.me.name}</span>
          <div className="pv3">
            <LogoutButton />
          </div>
        </div>
      );

    return (
      <div>
        <div className="pv3">
          <div className="w-100 pa4 flex justify-center">
            <LocalLink to="/login">Log in with Email</LocalLink>
          </div>
          <div className="w-100 flex justify-center">
            <LocalLink to="/signup">Sign up with Email</LocalLink>
          </div>
        </div>
      </div>
    );
  }
}
