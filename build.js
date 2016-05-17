var path = require('path')
var webpack = require("webpack");
var server = require("webpack-dev-server");
var config = require('./webpack.config.js');
var compiler = webpack(config);
new server(compiler, config.devServer).listen(8080, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Listening at http://localhost:' + 8080 + '\n')
  }
})
