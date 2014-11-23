var Application = require('./lib/application');
var pkg         = require('./package.json');
var debug       = require('debug')(pkg.name + ':application');
var express     = require('express');

var app = new Application(function () {
  this.setLogger(debug);
  this.setApp(express);
  this.init();
  this.serve(process.env.PORT);
});

module.exports = app;
