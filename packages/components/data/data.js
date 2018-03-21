import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { FriendlyLoader } from '../friendly-loader';

const PlainData = ({ data: { error, loading, feed, refetch } }) => {
  if (loading) return <FriendlyLoader />;
  if (error) return <FriendlyLoader error={error} />;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {feed && feed.map(post => <li key={post.id}>{post.description}</li>)}
      </ul>
    </div>
  );
};

PlainData.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool,
    feed: PropTypes.array,
    refetch: PropTypes.func,
  }).isRequired,
};

export const Data = graphql(gql`
  query feedQuery {
    feed {
      id
      description
    }
  }
`)(PlainData);
