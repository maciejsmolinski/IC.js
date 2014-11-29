// Include all production dependencies
var bodyParser   = require('body-parser');
var nunjucks     = require('nunjucks');
var cookieParser = require('cookie-parser');
var express      = require('express');
var favicon      = require('serve-favicon');
var logger       = require('morgan');

var middlewareBefore = require('require-all')(__dirname + '/config/middleware/before/');
var middlewareAfter  = require('require-all')(__dirname + '/config/middleware/after/');

var filters      = require('require-all')(__dirname + '/config/filters');
var path         = require('path');
var routes       = require('./routes/routes');

// Bootstrap Express Instance
var app           = express();

// Helper function
var isDevelopment = app.get('env') === 'development';

// Configure View Engine (Nunjucks)
var nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
});

// Extend Nunjucks with custom filters from `views/filters/` directory
Object.keys(filters).forEach(function (filter) {
  nunjucksEnv.addFilter(filter, filters[filter](nunjucks));
});

// App Setting: Set Views Extension
app.set('view engine', 'nunjucks');

// App Middlewares (logging, parsing input, static dir)
app.use(logger(isDevelopment ? 'dev' : 'common'));       // Log HTTP Requests in console. Formats: https://github.com/expressjs/morgan
app.use(bodyParser.json());                              // Parse JSON (application/json) input automatically (req.body)
app.use(bodyParser.urlencoded({ extended: false }));     // Parse Form (x-www-form-urlencoded) input automatically (req.body)
app.use(cookieParser());                                 // Parse Cookies automatically (req.cookies)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static assets from `public/` dir
// app.use(favicon(__dirname + '/public/favicon.ico'));    // Exclude favicon.ico requests from logs automatically, cache icon in the memory

// Use all before-dispatch middleware
Object.keys(middlewareBefore).forEach(function (middleware) {
  app.use(middlewareBefore[middleware]);
});

// Plug in all routes from `routes/` directory
Object.keys(routes).forEach(function (route) {
  var router          = express.Router();
  var routeDefinition = route.indexOf(' ') > 0  && route.split(' ') || ['get', route];

  var routeToAdd = router[routeDefinition.shift()](routeDefinition.pop(), routes[route]);
  app.use(routeToAdd);
});

// Use all after-dispatch middleware
Object.keys(middlewareAfter).forEach(function (middleware) {
  app.use(middlewareAfter[middleware]);
});

app.listen(8080, function () {
  console.log('App listens on port 8080');
});

module.exports = app;
