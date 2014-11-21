// Include all production dependencies
var bodyParser    = require('body-parser');
var consolidate   = require('consolidate');
var cookieParser  = require('cookie-parser');
var express       = require('express');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var middleware    = require('require-all')(__dirname + '/middleware');
var path          = require('path');
var routes        = require('./routes/index');

// Bootstrap Express Instance
var app           = express();

// Helper function
var isDevelopment = app.get('env') === 'development';

// App Setting: Views folder
app.set('views', path.join(__dirname, 'views'));
// App Setting: Views extension
app.set('view engine', 'nunjucks');
// App Setting: View Engine Renderer Handler
app.engine('nunjucks', consolidate.nunjucks);

// App Middlewares (logging, parsing input, static dir)
app.use(logger(isDevelopment ? 'dev' : 'common'));       // Log HTTP Requests in console. Formats: https://github.com/expressjs/morgan
app.use(bodyParser.json());                              // Parse JSON (application/json) input automatically (req.body)
app.use(bodyParser.urlencoded({ extended: false }));     // Parse Form (x-www-form-urlencoded) input automatically (req.body)
app.use(cookieParser());                                 // Parse Cookies automatically (req.cookies)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static assets from `public/` dir
// app.use(favicon(__dirname + '/public/favicon.ico'));    // Exclude favicon.ico requests from logs automatically, cache icon in the memory

// Routing
app.use('/', routes);

// Not Found Handler: Catch 404 and forward to error handler
app.use(middleware.notFound);

// Error Handlers: Depending on the environment, display detailed (development) or non-detailed (production) server error
app.use(isDevelopment ? middleware.detailedServerError : middleware.serverError);

module.exports = app;
