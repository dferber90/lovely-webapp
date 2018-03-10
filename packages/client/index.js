import React from 'react';
import { render } from 'react-dom';

const renderApp = () => {
  const { Application } = require('@wa/components');
  render(<Application />, document.getElementById('app'));
};

renderApp();

if (module.hot) {
  module.hot.accept('@wa/components', renderApp);
}
