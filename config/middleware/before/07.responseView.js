// Provide res.view method that finds template name automatically and renders it with given data
module.exports = function (req, res, next) {

  res.view = function (/* <data, [cb]> || <view, data, [cb]> */) {
    var view = String.isPrototypeOf(arguments[0]) ? arguments[0] : undefined;
    var data = view ? arguments[1] : arguments[0];
    var cb   = data === arguments[0] ? arguments[1] : arguments[2];

    // If view is not provided, auto detect view path
    view = view || ((req.param('controller') || 'homepage') + '/' + (req.param('action') || 'index'));

    return res.render(view, data, cb);
  };

  next();
};
