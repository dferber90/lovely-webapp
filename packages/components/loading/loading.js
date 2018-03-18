import React from 'react';
import PropTypes from 'prop-types';

export const Loading = props => {
  if (props.error) {
    // When the loader has errored
    return <div>Error!</div>;
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return <div>Loading...</div>;
  }
  // When the loader has just started
  return null;
};

Loading.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
};
