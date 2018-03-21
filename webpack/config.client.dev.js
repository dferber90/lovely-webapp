/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const config = require('../config.json');

const publicPath = '/assets/';
const outputPath = path.join(process.cwd(), 'dist-development', 'assets');

console.log(path.resolve(process.cwd(), 'packages', 'client'));
module.exports = {
  mode: 'development',
  stats: 'minimal',
  devtool: 'cheap-module-source-map',
  context: path.resolve(process.cwd(), 'packages', 'client'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: outputPath,
    publicPath,
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
          options: {
            presets: [
              [
                'env',
                { targets: { browsers: ['last 2 versions', 'safari >= 7'] } },
              ],
            ],
            plugins: [
              'transform-react-jsx',
              'transform-class-properties',
              'graphql-tag',
              ['styled-components', { ssr: true }],
              'syntax-dynamic-import',
              'react-loadable/babel',
            ],
          },
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
    content: [
      'static',
      path.join(process.cwd(), 'packages', 'client', 'static'),
    ],
    hot: {},
    clipboard: false,
    dev: { publicPath },
    add: app => {
      const historyOptions = {
        // ... see: https://github.com/bripkens/connect-history-api-fallback#options
      };
      app.use(convert(history(historyOptions)));
    },
  },
};
