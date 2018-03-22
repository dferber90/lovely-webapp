/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const config = require('../config.json');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { NodeServerPlugin } = require('webpack-node-server-plugin');

const outputPath = path.join(process.cwd(), 'dist-development', 'api');
module.exports = {
  target: 'node',
  mode: 'development',
  stats: 'minimal',
  externals: [
    nodeExternals({
      whitelist: [
        // we need to include the components, otherwise they won't get transpiled
        'webpack/hot/dev-server',
      ],
    }),
  ],
  context: path.resolve(process.cwd(), 'packages', 'api'),
  entry: './index.js',
  output: {
    path: outputPath,
    filename: 'server.js',
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
              'transform-class-properties',
              'transform-async-to-generator',
              'transform-object-rest-spread',
              'transform-do-expressions',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'packages', 'api', 'schema.graphql'),
        to: path.join(
          process.cwd(),
          'dist-development',
          'api',
          'schema.graphql'
        ),
      },
      {
        from: path.join(process.cwd(), 'packages', 'api', 'generated'),
        to: path.join(process.cwd(), 'dist-development', 'api', 'generated'),
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
      spawnOptions: { stdio: 'inherit', cwd: 'dist-development/api' },
    }),
  ],
};
