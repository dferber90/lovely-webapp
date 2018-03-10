import React from 'react';
import { Application } from '@wa/components';
import { renderToString } from 'react-dom/server';
import Koa from 'koa';
import serve from 'koa-static';
import { ServerStyleSheet } from 'styled-components';
const app = new Koa();

app.use(serve('static'));
app.use(serve('client'));

const html = ({ title, body, styles }) => {
  const appBundle =
    process.env.NODE_ENV === 'production'
      ? `<script src="/${
          require('./client/stats.json').assetsByChunkName.main
        }"></script>`
      : '<!-- client-side app bundle omitted in server-development -->';
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
        ${appBundle}
      </body>
    </html>`;
};

app.use(async context => {
  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<Application />));
  const styles = sheet.getStyleTags();

  context.body = html({
    title: 'Webapp',
    body,
    styles,
  });
});

app.listen(3000);

if (module.hot) {
  module.hot.accept(() => {
    console.log('received new hm', msg);
  });
}
