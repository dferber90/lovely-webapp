import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { FriendlyLoader } from '../friendly-loader';

const PlainData = ({ data: { error, loading, allPosts, refetch } }) => {
  if (loading) return <FriendlyLoader />;
  if (error) return <FriendlyLoader error={error} />;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <ul>
        {allPosts && allPosts.map(post => <li key={post.id}>{post.title}</li>)}
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
    allPosts: PropTypes.array,
    refetch: PropTypes.func,
  }).isRequired,
};

export const Data = graphql(gql`
  query allPosts {
    allPosts {
      id
      title
    }
  }
`)(PlainData);
