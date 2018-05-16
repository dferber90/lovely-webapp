/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const publicPath = '/assets/';
const outputPath = path.join(
  process.cwd(),
  'dist-production',
  'frontend',
  'assets'
);
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  context: path.resolve(process.cwd(), 'packages', 'client'),
  entry: ['babel-polyfill', './index.js'],
  performance: {
    maxAssetSize: 260000,
  },
  output: {
    path: outputPath,
    publicPath,
    filename: '[name].[chunkhash].bundle.js',
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
          options: {
            presets: [
              [
                'env',
                { targets: { browsers: ['last 2 versions', 'safari >= 7'] } },
              ],
            ],
            plugins: [
              'transform-react-jsx',
              'transform-class-properties',
              'graphql-tag',
              ['styled-components', { ssr: true }],
              'syntax-dynamic-import',
              'react-loadable/babel',
              'transform-react-remove-prop-types',
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
    new CleanWebpackPlugin(['dist-production/frontend/*']),
    new webpack.DefinePlugin({
      SERVER: 'false',
      DEV: 'false',
    }),
    // Write out stats file to build directory.
    new StatsWriterPlugin({
      filename: '../stats.json',
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
