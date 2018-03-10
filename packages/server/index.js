import React from 'react';
import { Application } from '@wa/components';
import { renderToString } from 'react-dom/server';
import Koa from 'koa';
import serve from 'koa-static';
const app = new Koa();

app.use(serve('static'));

app.use(async context => {
  context.body = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="/favicon.png">
    <title>Webapp</title>
  </head>
  <body>
    <div id="app">${renderToString(<Application />)}</div>
  </body>
</html>`;
});

app.listen(3000);

if (module.hot) {
  module.hot.accept(() => {
    console.log('received new hm', msg);
  });
}
