var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('bundle.css'),
    //Used to include index.html in build folder
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        dead_code: true,
        drop_console: true
      }
    }),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!stylus-loader")}
    ]
  }
};
