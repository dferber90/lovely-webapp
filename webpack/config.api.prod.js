/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = path.join(process.cwd(), 'dist-production', 'api');

module.exports = {
  target: 'node',
  mode: 'production',
  context: path.resolve(process.cwd(), 'packages', 'api'),
  entry: './index.js',
  output: {
    path: outputPath,
    filename: 'index.js',
  },
  optimization: {
    // opt out of uglify to keep code readable
    minimizer: [],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { targets: { node: 8 }, useBuiltIns: true }]],
            plugins: [
              'transform-class-properties',
              'transform-async-to-generator',
              'transform-object-rest-spread',
              'transform-do-expressions',
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist-production/api/*']),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(process.cwd(), 'packages', 'api', 'schema.graphql'),
          to: path.join(
            process.cwd(),
            'dist-production',
            'api',
            'schema.graphql'
          ),
        },
        {
          from: path.join(process.cwd(), 'packages', 'api', 'generated'),
          to: path.join(process.cwd(), 'dist-production', 'api', 'generated'),
        },
        {
          from: path.join(process.cwd(), 'packages', 'api', 'package.json'),
          to: path.join(
            process.cwd(),
            'dist-production',
            'api',
            'package.json'
          ),
        },
        {
          from: path.join(process.cwd(), 'now', 'api.now.json'),
          to: path.join(process.cwd(), 'dist-production', 'api', 'now.json'),
        },
        !process.env.CI && {
          from: path.join(process.cwd(), '.env'),
          to: path.join(process.cwd(), 'dist-production', 'api'),
        },
      ].filter(Boolean)
    ),
    new webpack.DefinePlugin({
      SERVER: 'true',
      DEV: 'false',
    }),
  ],
  externals: [
    // modules that should not be bundled
    nodeExternals(),
  ],
};
