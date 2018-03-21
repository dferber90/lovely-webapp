/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const config = require('../config.json');
const nodeExternals = require('webpack-node-externals');
const { NodeServerPlugin } = require('webpack-node-server-plugin');

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
  entry: ['babel-polyfill', './index.js'],
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
          options: {
            presets: [
              ['env', { targets: { node: 'current' }, useBuiltIns: true }],
            ],
            plugins: [
              'transform-react-jsx',
              'transform-class-properties',
              'transform-async-to-generator',
              'transform-object-rest-spread',
              'transform-do-expressions',
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
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'static'),
        to: path.join(process.cwd(), 'dist-development', 'static'),
      },
    ]),
    new webpack.DefinePlugin({
      SERVER: 'true',
      DEV: 'true',
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
    }),
    new NodeServerPlugin({
      spawnOptions: { stdio: 'inherit', cwd: 'dist-development' },
    }),
  ],
};
