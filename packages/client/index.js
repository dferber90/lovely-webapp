import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { preloadReady } from 'react-loadable';
import { apolloClient } from './apollo-client';

const renderApp = () => {
  // eslint-disable-next-line global-require
  const { Application } = require('@wa/components');
  const component = (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </ApolloProvider>
  );
  const app = document.getElementById('app');
  if (DEV) {
    render(component, app);
  } else {
    preloadReady().then(
      () => {
        hydrate(component, app);
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    );
  }
};

renderApp();

if (module.hot) {
  module.hot.accept('@wa/components', renderApp);
}
