import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@wa/design-system';
import { Loading } from '../loading';

export const LoadingPage = props => (
  <Flex alignItems="center" justifyContent="center">
    <Box mt={6}>
      <Loading {...props} />
    </Box>
  </Flex>
);

LoadingPage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
};
