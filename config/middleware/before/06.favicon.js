// Exclude favicon.ico requests from logs automatically, cache icon in the memory
module.exports = function (req, res, next) { next(); }; //require('serve-favicon')(__dirname + '/public/favicon.ico');
