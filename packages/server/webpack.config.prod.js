const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../../config.json');

const outputPath = path.join(process.cwd(), 'dist-production');
module.exports = {
  target: 'node',
  mode: 'production',
  context: __dirname,
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
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'static'),
        to: path.join(outputPath, 'static'),
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
