import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { FriendlyLoader } from '../friendly-loader';

const PlainMessage = ({ data: { error, loading, hello, refetch } }) => {
  if (loading) return <FriendlyLoader />;
  if (error) return <FriendlyLoader error={error} />;

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      <div>
        <Helmet>
          <title>{`${hello.message} - Webapp`}</title>
        </Helmet>
        {hello.message}
      </div>
    </div>
  );
};

PlainMessage.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    loading: PropTypes.bool,
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
