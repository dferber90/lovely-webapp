import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { FriendlyLoader } from '../friendly-loader';
import { AddPostForm } from '../add-post-form';
import { Me } from '../me';

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
          <button type="button" onClick={() => refetch()}>Refresh</button>
          <ul>
            {feed &&
              feed.map(post => <li key={post.id}>{post.description}</li>)}
          </ul>
          <Me>
            {meProps => {
              if (meProps.loading) return <FriendlyLoader />;
              if (meProps.error) return <FriendlyLoader error={error} />;
              return meProps.me ? (
                <AddPostForm query={GET_FEED} />
              ) : (
                'Not authenticated'
              );
            }}
          </Me>
        </div>
      );
    }}
  </Query>
);
