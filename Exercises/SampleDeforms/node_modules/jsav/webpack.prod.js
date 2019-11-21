const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin'),
  merge = require('webpack-merge'),
  common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJsWebpackPlugin()
  ]
});
