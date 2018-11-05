/* eslint-disable import/no-extraneous-dependencies */
const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const runtimeEnv = require("./utils/runtime-env");

const publicPath = "/assets/";
const outputPath = path.join(
  process.cwd(),
  "dist-development",
  "frontend",
  "assets"
);

module.exports = {
  mode: "development",
  stats: "minimal",
  devtool: "cheap-module-source-map",
  context: path.resolve(process.cwd(), "packages", "client"),
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    path: outputPath,
    publicPath,
    filename: "bundle.js",
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: ["last 2 versions", "safari >= 7"] } }
              ]
            ],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              "@babel/plugin-proposal-class-properties",
              "graphql-tag",
              ["styled-components", { ssr: true }],
              "@babel/plugin-syntax-dynamic-import",
              "react-loadable/babel"
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist-development/frontend/*"]),
    new webpack.DefinePlugin({
      SERVER: "false",
      DEV: "true"
    }),
    new HtmlWebpackPlugin({
      // We can't serve index.html from "static"
      // as our server (packages/server) also serves the "static" folder.
      // If an "index.html" file was in "static", we'd never run SSR for the
      // main page during development
      filename: "../static-dev/index.html",
      template: "index.template.html",
      alwaysWriteToDisk: true,
      config: JSON.stringify({
        API_ENDPOINT: { ...process.env, ...runtimeEnv }.API_ENDPOINT
      })
    }),
    // this plugin provideds the alwaysWriteToDisk option for HtmlWebpackPlugin
    new HtmlWebpackHarddiskPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: [
      path.join(outputPath, "..", "static"),
      path.join(outputPath, "..", "static-dev")
    ],
    hot: true,
    compress: true
  }
};
