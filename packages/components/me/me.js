import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    me {
      id
      name
    }
  }
`;

class CreateMe extends React.Component {
  static displayName = 'Me';
  static propTypes = {
    loggedInUserQuery: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
      me: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }).isRequired,
    children: PropTypes.func.isRequired,
  };
  render() {
    return this.props.children({
      error: this.props.loggedInUserQuery.error,
      loading: this.props.loggedInUserQuery.loading,
      me: this.props.loggedInUserQuery.me,
    });
  }
}

export const Me = graphql(LOGGED_IN_USER_QUERY, {
  name: 'loggedInUserQuery',
})(CreateMe);
