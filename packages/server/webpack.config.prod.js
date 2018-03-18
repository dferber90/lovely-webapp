/* eslint-disable global-require, import/no-extraneous-dependencies, import/no-dynamic-require */
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const config = require('../../config.json');

const publicPath = '/assets/';
const outputPath = path.join(process.cwd(), 'dist-production');

// We could also use a simple Regex (/^@wa\//) and rely on a convention
// of workspace packages starting with the same prefix
const isWorkspacePackage = (() => {
  const { workspaces } = require('../../package.json');
  const flatten = require('lodash.flatten');
  const glob = require('glob');
  const packageLists = workspaces.map(workspace => glob.sync(workspace));
  const pkgPaths = flatten(packageLists);
  const pkgs = pkgPaths.map(pkgPath => {
    const pkg = require(`../../${pkgPath}/package.json`);
    return pkg;
  }, {});
  const pkgNames = pkgs.map(pkg => pkg.name);
  return pkgName => pkgNames.includes(pkgName);
})();

module.exports = {
  target: 'node',
  mode: 'production',
  context: __dirname,
  entry: './index.js',
  output: {
    path: outputPath,
    publicPath,
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
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
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
  externals: [
    // modules that should not be bundled
    nodeExternals({
      // modules that should be bundles, even though they're in node_modules.
      // They get linked to node_modules by the workspaces feature
      whitelist: isWorkspacePackage,
    }),
    {
      './stats.json': "require('./stats.json')",
      './react-loadable.json': "require('./react-loadable.json')",
    },
  ],
};
