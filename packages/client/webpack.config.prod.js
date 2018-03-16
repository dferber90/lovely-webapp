const path = require('path');
const webpack = require('webpack');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('../../config.json');

const outputPath = path.join(process.cwd(), 'dist', 'client');
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context: __dirname,
  entry: './index.js',
  output: {
    path: outputPath,
    filename: 'bundle.[hash].js',
    chunkFilename: '[name].[hash].bundle.js',
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
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        ecma: 6,
      },
    }),
    new ReactLoadablePlugin({
      filename: path.join(outputPath, 'react-loadable.json'),
    }),
  ],
};
