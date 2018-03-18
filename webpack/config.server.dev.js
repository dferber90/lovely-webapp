/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const config = require('../config.json');
const nodeExternals = require('webpack-node-externals');
const WebpackNodeServerPlugin = require('webpack-node-server-plugin');

const publicPath = '/assets/';
const outputPath = path.join(process.cwd(), 'dist-development', 'assets');
module.exports = {
  target: 'node',
  mode: 'development',
  stats: 'minimal',
  externals: [
    nodeExternals({
      whitelist: [
        // we need to include the components, otherwise they won't get transpiled
        '@wa/components',
        '@wa/design-system',
        'webpack/hot/dev-server',
      ],
    }),
  ],
  context: path.resolve(process.cwd(), 'packages', 'server'),
  entry: './index.js',
  output: {
    publicPath,
    path: outputPath,
    filename: '../server.js',
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
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      SERVER: 'true',
      DEV: 'true',
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
    }),
    new WebpackNodeServerPlugin(),
  ],
};
