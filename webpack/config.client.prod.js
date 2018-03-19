/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const config = require('../config.json');

const publicPath = '/assets/';
const outputPath = path.join(process.cwd(), 'dist-production', 'assets');
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context: path.resolve(process.cwd(), 'packages', 'client'),
  entry: './index.js',
  performance: {
    maxAssetSize: 260000,
  },
  output: {
    path: outputPath,
    publicPath,
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].chunk.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /react|prop-types|apollo|graphql|styled-components/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
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
    new webpack.DefinePlugin({
      SERVER: 'false',
      DEV: 'false',
    }),
    // Write out stats file to build directory.
    new StatsWriterPlugin({
      filename: '../stats.json',
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
      filename: path.join(outputPath, '..', 'react-loadable.json'),
    }),
    new CompressionPlugin({
      exclude: /stats\.json$/,
    }),
  ],
};
