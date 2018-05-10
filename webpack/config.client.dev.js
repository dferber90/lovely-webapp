/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const publicPath = '/assets/';
const outputPath = path.join(
  process.cwd(),
  'dist-development',
  'frontend',
  'assets'
);

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
    new CleanWebpackPlugin(['dist-development/frontend/*']),
    new webpack.DefinePlugin({
      SERVER: 'false',
      DEV: 'true',
    }),
    new webpack.EnvironmentPlugin(['GRAPHQL_ENDPOINT']),
    new HtmlWebpackPlugin({
      // We can't serve index.html from "static"
      // as our server (packages/server) also serves the "static" folder.
      // If an "index.html" file was in "static", we'd never run SSR for the
      // main page during development
      filename: '../static-dev/index.html',
      template: 'index.template.html',
      alwaysWriteToDisk: true,
      config: JSON.stringify({
        GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
      }),
    }),
    // this plugin provideds the alwaysWriteToDisk option for HtmlWebpackPlugin
    new HtmlWebpackHarddiskPlugin(),
  ],
  serve: {
    content: [
      path.join(outputPath, '..', 'static'),
      path.join(outputPath, '..', 'static-dev'),
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
