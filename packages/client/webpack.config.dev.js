const webpack = require('webpack');
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const config = require('../../config.json');

const outputPath = path.join(process.cwd(), 'dist-development', 'assets');
module.exports = {
  mode: 'development',
  stats: 'minimal',
  devtool: 'cheap-module-source-map',
  context: __dirname,
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: outputPath,
    filename: 'bundle.js',
    pathinfo: true,
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
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER: 'false',
      DEV: 'true',
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
    add: app => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };
      app.use(convert(history(historyOptions)));
    },
  },
};
