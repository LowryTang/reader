var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.js');
var port = process.env.DEV_PORT || 3030;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: true,
  quiet: false
}).listen(port, 'localhost', function(err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + port);
});
