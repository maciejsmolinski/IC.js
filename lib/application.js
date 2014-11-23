function Application (cb) {
  this._logger = function () {};
  this._app    = function () {};

  cb.call(this);
}

Application.prototype.init = function () {
  this._app = this._app();
};

Application.prototype.setLogger = function (logger) {
  this._logger = logger || function () {};
};

Application.prototype.setApp = function (app) {
  this._app = app || function () {};
};

Application.prototype.log = function () {
  this._logger.apply(this._logger, arguments);
};

Application.prototype.serve = function (port) {
  this._app.listen(port, function () {
    this.log('Server listening on port ' + port);
  }.bind(this));
};


// var app = require('../app');
// app.set('port', cli.port);

// console.log(app.get('env'));

// var server = app.listen(app.get('port'), function() {
//   debug('Server listening on port ' + server.address().port);
// });


module.exports = Application;
