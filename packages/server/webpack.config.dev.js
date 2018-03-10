const StartServerPlugin = require('start-server-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  // nodeExternals ignores all modules in node_modules folder
  // externals: [
  //   nodeExternals({
  //     whitelist: ['webpack/hot/signal', 'webpack/hot/poll'],
  //   }),
  // ],
  mode: 'development',
  context: __dirname,
  // entry: ['webpack/hot/signal', './index.js'],
  entry: './index.js',
  output: {
    filename: 'dist/server.js',
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
