import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const PlainData = ({ data: { allPosts, refetch } }) => (
  <div>
    <button onClick={() => refetch()}>Refresh</button>
    <ul>
      {allPosts && allPosts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  </div>
);

PlainData.propTypes = {
  data: PropTypes.shape({
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
