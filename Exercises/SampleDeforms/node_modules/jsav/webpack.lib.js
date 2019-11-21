const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin'),
  merge = require('webpack-merge'),
  path = require('path'),
  common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJsWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "jav",
    libraryTarget: "umd",
    filename: "jav.js"
  },
  entry: path.resolve(__dirname, 'src', 'alignment.js')
});
