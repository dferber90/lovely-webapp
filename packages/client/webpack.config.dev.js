const path = require('path');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    filename: 'dist/bundle.js',
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
  serve: {
    content: ['static', path.join(__dirname, 'static')],
    hot: {},
    clipboard: false,
    dev: { publicPath: '/' },
  },
};
