// Init ES6 environments for .require()
require('babel/register')();

var express = require('express');
var isocall = require('iso-call');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config');
var app = express();

// Setup rpc
require('./rpclist');

// Mount yql iso-call middleware to the express
isocall.setupMiddleware(app);

// Serve the bundled app
// check webpack.config.js for more detail
app.use(webpackMiddleware(webpack(webpackConfig), webpackConfig.output));

// Serve the page
app.use(require('./page'));

app.listen(3000);
console.log('Express server started at port 3000');
