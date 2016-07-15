var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3030',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    // Shared code
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      "__PROD__": false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" },
      { test: /\.(png|jpg)$/, loader: "url-loader", query: { limit: 8192, name: '[path][name].[ext]' } },
    ]
  }
};
