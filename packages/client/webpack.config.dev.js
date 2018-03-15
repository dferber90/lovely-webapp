const webpack = require('webpack');
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const config = require('../../config.json');

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
  plugins: [
    new webpack.DefinePlugin({
      SERVER: 'false',
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
    }),
  ],
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
