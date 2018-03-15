const path = require('path');
const webpack = require('webpack');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const config = require('../../config.json');

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(process.cwd(), 'dist', 'client'),
    filename: 'bundle.[hash].js',
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
      SERVER: 'false',
      DEV: 'false',
    }),
    // Write out stats file to build directory.
    new StatsWriterPlugin({
      filename: 'stats.json',
    }),
    new webpack.EnvironmentPlugin({
      GRAPHQL_ENDPOINT: config.GRAPHQL_ENDPOINT,
    }),
  ],
};
