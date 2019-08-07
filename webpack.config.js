var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    core: "./src/core/main.js",
    sandbox: "./src/sandbox/worker.js"
  },
  output: {
    path: __dirname + "/build",
    filename: "[name]-bundle.js"
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
      ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["stage-2"]
        }
      }
    ]
  }
};
