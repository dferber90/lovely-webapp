const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    filename: 'dist/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  serve: {
    content: ['static', path.join(__dirname, 'static')],
    hot: {},
    clipboard: false,
    dev: { publicPath: '/' },
    add: (app, middleware, options) => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };
      app.use(convert(history(historyOptions)));
    },
  },
};
