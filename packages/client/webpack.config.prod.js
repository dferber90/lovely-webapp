const path = require('path');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

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
    // Write out stats file to build directory.
    new StatsWriterPlugin({
      filename: 'stats.json',
    }),
  ],
};
