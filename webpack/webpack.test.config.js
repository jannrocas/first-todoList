var path = require('path');
var webpack = require('webpack');

module.exports = {
  output: {
    filename: '[name]_bundle.js',
    path: path.join(__dirname),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css' },
      { test: /\.scss$/, loader: 'style-loader!css!sass' },
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.(coffee\.md|litcoffee)$/, loader: 'coffee-loader?literate' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
