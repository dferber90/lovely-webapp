/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const runtimeEnv = require('./utils/runtime-env');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { NodeServerPlugin } = require('webpack-node-server-plugin');

const publicPath = '/assets/';
const outputPath = path.join(
  process.cwd(),
  'dist-development',
  'frontend',
  'assets'
);
module.exports = {
  target: 'node',
  mode: 'development',
  stats: 'minimal',
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
  context: path.resolve(process.cwd(), 'packages', 'server'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    publicPath,
    path: outputPath,
    filename: '../server.js',
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
              ['@babel/preset-env', { targets: { node: 'current' }, useBuiltIns: 'entry' }],
            ],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-proposal-class-properties",
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-syntax-object-rest-spread',
              '@babel/plugin-proposal-do-expressions',
              '@babel/plugin-syntax-dynamic-import',
              'react-loadable/babel',
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
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new CopyWebpackPlugin([
      {
        from: path.join(process.cwd(), 'static'),
        to: path.join(process.cwd(), 'dist-development', 'frontend', 'static'),
      },
    ]),
    new webpack.DefinePlugin({
      SERVER: 'true',
      DEV: 'true',
    }),
    new NodeServerPlugin({
      spawnOptions: {
        stdio: 'inherit',
        cwd: 'dist-development/frontend',
        env: {
          ...process.env,
          ...runtimeEnv,
        },
      },
    }),
  ],
};
