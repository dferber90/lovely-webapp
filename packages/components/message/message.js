import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const PlainMessage = ({ data: { hello, refetch } }) => (
  <div>
    <button onClick={() => refetch()}>Refresh</button>
    <div>{hello ? hello.message : '...'}</div>
  </div>
);

PlainMessage.propTypes = {
  data: PropTypes.shape({
    hello: PropTypes.shape({
      message: PropTypes.string,
    }),
    refetch: PropTypes.func,
  }).isRequired,
};

export const Message = graphql(gql`
  query aMessage {
    hello(name: "Startup Stack") {
      message
    }
  }
`)(PlainMessage);
