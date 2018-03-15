const NodemonPlugin = require('nodemon-webpack-plugin');
const webpack = require('webpack');
const config = require('../../config.json');

module.exports = {
  target: 'node',
  mode: 'development',
  context: __dirname,
  // entry: ['webpack/hot/signal', './index.js'],
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
    new webpack.DefinePlugin({
      SERVER: 'true',
      DEV: 'true',
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
    }),
    new NodemonPlugin(),
    // Only use this in DEVELOPMENT
    // new StartServerPlugin({
    //   name: 'dist/server.js',
    //   nodeArgs: [], // allows debugging by passing ['--inspect']
    //   args: [], // pass args to script
    //   signal: 'SIGUSR2' /* | true | 'SIGUSR2' */, // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
    //   keyboard: true /* | false */, // Allow typing 'rs' to restart the server. default: only if NODE_ENV is 'development'
    // }),
  ],
};
