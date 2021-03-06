var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('bundle.css'),
    //Used to include index.html in build folder
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
      "__PROD__": true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        dead_code: true,
        drop_console: true,
        unused: true,
        if_return: true
      }
    }),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader") },
      { test: /\.(png|jpg|gif)$/, loader: "url-loader", query: { limit: 8192, name: '[path][name].[ext]' } },
    ]
  }
};
