var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const port = process.env.PORT || 3000;
const host = '0.0.0.0' || 'localhost';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, host, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});