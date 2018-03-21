/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { LocalLink } from '@wa/design-system';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import Cookies from 'cookies-js';
import { FriendlyLoader } from '../friendly-loader';

class App extends React.Component {
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      me: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }).isRequired,
  };
  logout = () => {
    // remove cookie and reload page to reset apollo client
    Cookies.expire('authToken');
    window.location.reload();
  };

  isLoggedIn = () =>
    this.props.loggedInUserQuery.me &&
    this.props.loggedInUserQuery.me.id !== null;

  renderLoggedIn() {
    return (
      <div>
        <span>User: {this.props.loggedInUserQuery.me.name}</span>
        <div className="pv3">
          <button
            className="dib bg-red white pa3 pointer dim"
            onClick={this.logout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  renderLoggedOut = () => (
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

  render() {
    if (this.props.loggedInUserQuery.loading) {
      return <FriendlyLoader />;
    }

    return this.isLoggedIn() ? this.renderLoggedIn() : this.renderLoggedOut();
  }
}

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    me {
      id
      name
    }
  }
`;

export const UserBanner = graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
  options: { fetchPolicy: 'network-only' },
})(withRouter(App));
