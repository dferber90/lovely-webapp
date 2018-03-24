import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FriendlyLoader } from '../friendly-loader';

const GET_FEED = gql`
  query feedQuery {
    feed {
      id
      description
    }
  }
`;

export const Data = () => (
  <Query query={GET_FEED}>
    {({ loading, error, refetch, data: { feed } }) => {
      if (loading) return <FriendlyLoader />;
      if (error) return <FriendlyLoader error={error} />;

      return (
        <div>
          <button onClick={() => refetch()}>Refresh</button>
          <ul>
            {feed &&
              feed.map(post => <li key={post.id}>{post.description}</li>)}
          </ul>
        </div>
      );
    }}
  </Query>
);
