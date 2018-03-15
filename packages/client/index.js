import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { apolloClient } from './apollo-client';
import { ApolloProvider } from 'react-apollo';

const renderApp = () => {
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
    hydrate(component, app);
  }
};

renderApp();

if (module.hot) {
  module.hot.accept('@wa/components', renderApp);
}
