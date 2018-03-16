/* eslint-disable no-param-reassign, no-console */
import React from 'react';
import { Application } from '@wa/components';
import Koa from 'koa';
import serve from 'koa-static';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import Loadable from 'react-loadable';
import tinyHtml from 'tinyhtml';
import uniq from 'lodash.uniq';
import pretty from 'pretty';
import { createApolloClient } from './create-apollo-client';

const app = new Koa();

app.use(serve('static'));
app.use(serve('client'));

const html = ({ title, body, styles, cachedData, loadableModules }) => {
  const appBundle = DEV
    ? '<!-- client-side app bundle omitted in server-development -->'
    : do {
        // eslint-disable-next-line global-require, import/no-unresolved
        const assets = require('./client/stats.json').assetsByChunkName.main;
        assets
          .filter(asset => asset.endsWith('.js'))
          .map(asset => `<script src="/${asset}"></script>`)
          .join('');
      };

  const dataScript = DEV
    ? '<!-- data for rehydration -->'
    : `<script>window.APOLLO_STATE=${JSON.stringify(cachedData)};</script>`;

  // It is important that the bundles are included before the main bundle,
  // so that they can be loaded by the browser prior to the app rendering.
  // However, as the Webpack manifest (including the logic for parsing bundles)
  // lives in the main bundle, it will need to be extracted into its own chunk.
  //  - from https://github.com/jamiebuilds/react-loadable
  const loadableBundles = DEV
    ? '<!-- bundles from code-splitting through react-loadable -->'
    : do {
        // eslint-disable-next-line global-require, import/no-unresolved
        const stats = require('./client/react-loadable.json');
        // eslint-disable-next-line global-require
        const { getBundles } = require('react-loadable/webpack');
        const bundles = getBundles(stats, loadableModules);

        uniq(bundles.filter(bundle => bundle.file.endsWith('.js')))
          .map(bundle => `<script src="/${bundle.file}"></script>`)
          .join('\n');
      };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" href="/favicon.png">
        <title>${title}</title>
        ${styles}
      </head>
      <body>
        <div id="app">${body}</div>
        ${dataScript}
        ${appBundle}
        ${loadableBundles}
      </body>
    </html>
  `;
};

app.use(async context => {
  const apolloClient = createApolloClient();
  const sheet = new ServerStyleSheet();
  const routingContext = {};
  const modules = [];
  try {
    const body = await renderToStringWithData(
      sheet.collectStyles(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <ApolloProvider client={apolloClient}>
            <StaticRouter
              location={context.request.url}
              context={routingContext}
            >
              <Application />
            </StaticRouter>
          </ApolloProvider>
        </Loadable.Capture>
      )
    );

    if (routingContext.url) {
      // we use `routingContext.status` by in RedirectWithStatus
      if (routingContext.status) context.status = routingContext.status;
      context.redirect(routingContext.url);
    } else {
      // add 404
      if (routingContext.status) context.status = routingContext.status;
      const styles = sheet.getStyleTags();
      const markup = html({
        title: 'Webapp',
        body,
        styles,
        cachedData: apolloClient.cache.extract(),
        loadableModules: modules,
      });
      context.body = DEV ? pretty(markup) : tinyHtml(markup);
    }
  } catch (e) {
    context.body = `Rendering Error: ${e.stack}`;
  }
});

const port = 3000;

Loadable.preloadAll().then(() => {
  app.listen(port, () =>
    console.log(
      // eslint-disable-line no-console
      `App Server is now running on http://localhost:${port}`
    )
  );
});

if (module.hot) {
  module.hot.accept(() => {
    console.log('received new hm');
  });
}
