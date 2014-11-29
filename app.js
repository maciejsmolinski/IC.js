// Include all production dependencies
var nunjucks         = require('nunjucks');
var express          = require('express');
var middlewareBefore = require('require-all')(__dirname + '/config/middleware/before/');
var middlewareAfter  = require('require-all')(__dirname + '/config/middleware/after/');
var filters          = require('require-all')(__dirname + '/config/filters');
var routes           = require('./config/routes');

// Bootstrap Express Instance
var app = express();

// Configure View Engine (Nunjucks)
var nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

// App Setting: Set Views Extension
app.set('view engine', 'nunjucks');

// Extend Nunjucks with custom filters from `views/filters/` directory
Object.keys(filters).forEach(function (filter) {
  nunjucksEnv.addFilter(filter, filters[filter](nunjucks));
});

// Before-dispatch middleware
Object.keys(middlewareBefore).forEach(function (middleware) {
  app.use(middlewareBefore[middleware]);
});

// Setup routes
Object.keys(routes).forEach(function (route) {
  var router          = express.Router();
  var routeDefinition = route.indexOf(' ') > 0  && route.split(' ') || ['get', route];

  var routeToAdd = router[routeDefinition.shift()](routeDefinition.pop(), routes[route]);
  app.use(routeToAdd);
});

// After-dispatch middleware
Object.keys(middlewareAfter).forEach(function (middleware) {
  app.use(middlewareAfter[middleware]);
});

// Serve application
app.listen(8080, function () {
  console.log('App listens on port 8080');
});

module.exports = app;
