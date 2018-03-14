import React from 'react';
import { Application } from '@wa/components';
import { renderToString } from 'react-dom/server';
import Koa from 'koa';
import serve from 'koa-static';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import tinyHtml from 'tinyhtml';
import pretty from 'pretty';
import { createApolloClient } from './create-apollo-client';
const app = new Koa();

app.use(serve('static'));
app.use(serve('client'));

const html = ({ title, body, styles, cachedData }) => {
  const appBundle =
    process.env.NODE_ENV === 'production'
      ? `<script src="/${
          require('./client/stats.json').assetsByChunkName.main
        }"></script>`
      : '<!-- client-side app bundle omitted in server-development -->';
  const dataScript =
    process.env.NODE_ENV === 'production'
      ? `<script>window.__APOLLO_STATE__=${JSON.stringify(
          cachedData
        )};</script>`
      : '<!-- data for rehydration -->';

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
      </body>
    </html>`;
};

app.use(async context => {
  const apolloClient = createApolloClient();
  const sheet = new ServerStyleSheet();
  const routingContext = {};
  try {
    const body = await renderToStringWithData(
      sheet.collectStyles(
        <ApolloProvider client={apolloClient}>
          <StaticRouter location={context.request.url} context={routingContext}>
            <Application />
          </StaticRouter>
        </ApolloProvider>
      )
    );

    if (routingContext.url) {
      context.body = `should redirect to ${routingContext.url} using koa`;
      // can use the `routingContext.status` that
      // we added in RedirectWithStatus
      // redirect(routingContext.status, routingContext.url);
    } else {
      const styles = sheet.getStyleTags();
      const markup = html({
        title: 'Webapp',
        body,
        styles,
        cachedData: apolloClient.cache.extract(),
      });
      context.body =
        process.env.NODE_ENV === 'production'
          ? tinyHtml(markup)
          : pretty(markup);
    }
  } catch (e) {
    context.body = `Rendering Error: ${e.stack}`;
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(
    // eslint-disable-line no-console
    `App Server is now running on http://localhost:${port}`
  )
);

if (module.hot) {
  module.hot.accept(() => {
    console.log('received new hm', msg);
  });
}
