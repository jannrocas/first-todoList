'use strict';

var path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    todo: './webpack/index.todo.js'
  },
  output: {
    filename: "[name]_bundle.js",
    path: path.join(__dirname, 'app', 'assets', 'javascripts')
  },
  resolve: {
    alias: {}
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.(coffee\.md|litcoffee)$/, loader: 'coffee-loader?literate' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  }
};
