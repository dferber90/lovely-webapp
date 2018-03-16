const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const config = require('../../config.json');
const nodeExternals = require('webpack-node-externals');

const outputPath = path.join(process.cwd(), 'dist-development');
module.exports = {
  target: 'node',
  mode: 'development',
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
  context: __dirname,
  // entry: ['webpack/hot/signal', './index.js'],
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
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER: 'true',
      DEV: 'true',
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
    }),
    new NodemonPlugin(),
  ],
};
