import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const renderApp = () => {
  const { Application } = require('@wa/components');
  render(
    <BrowserRouter>
      <Application />
    </BrowserRouter>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('@wa/components', renderApp);
}
