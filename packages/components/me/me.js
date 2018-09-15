import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    me {
      id
      name
    }
  }
`;

export class Me extends React.Component {
  static displayName = 'Me';

  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Query query={LOGGED_IN_USER_QUERY}>
        {({ error, loading, data }) =>
          this.props.children({ error, loading, me: data ? data.me : null })
        }
      </Query>
    );
  }
}
