import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (SERVER) {
        // eslint-disable-next-line no-param-reassign
        if (staticContext) staticContext.status = code;
      }
      return children;
    }}
  />
);

Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export const RedirectWithStatus = ({ from, to, status }) => (
  <Status code={status}>
    <Redirect from={from} to={to} />
  </Status>
);

RedirectWithStatus.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.number,
};

export const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
);
