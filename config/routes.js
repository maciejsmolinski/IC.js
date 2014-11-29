module.exports = {

  'get /:controller/:action' : function (req, res, next) {
    try {
      require('../controllers/' + req.param('controller').replace(/\W/g, ''))[req.param('action') || 'index'](req, res);
    } catch (e) {
      var error = new Error('Page Not Found');
      error.status = 404;
      console.log('err');
      error.message = e;
      next(error);
    }
  },

  'get /' : function (req, res) {
    require('../controllers/homepage').index(req, res);
  }

};
