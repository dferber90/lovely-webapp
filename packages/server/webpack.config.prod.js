const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../../config.json');

module.exports = {
  target: 'node',
  mode: 'production',
  context: __dirname,
  entry: './index.js',
  output: {
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
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'static'),
        to: path.join(process.cwd(), 'dist', 'static'),
      },
    ]),
    new webpack.DefinePlugin({
      SERVER: 'true',
      DEV: 'false',
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
    }),
  ],
  externals: {
    './client/stats.json': "require('./client/stats.json')",
    './client/react-loadable.json': "require('./client/react-loadable.json')",
  },
};
