module.exports = {

  'get /:controller/:action' : function (req, res, next) {

    try {
      require('../controllers/' + req.param('controller').replace(/\W/g, ''))[req.param('action') || 'index'](req, res);
    } catch (jsError) {
      var error = new Error('Page Not Found');
      error.status = 404;
      error.message = jsError;

      next(error);
    }
  },

  'get /' : function (req, res) {
    require('../controllers/homepage').index(req, res);
  }

};
