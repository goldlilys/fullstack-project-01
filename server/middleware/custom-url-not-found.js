module.exports = customUrlNotFound;

/**
 * Convert any request not handled so far to a 404 error
 * to be handled by error-handling middleware.
 * @header customUrlNotFound()
 */
function customUrlNotFound() {
  return function raiseUrlNotFoundError(req, res) {
    var path = require('path');
    var error = new Error('Cannot ' + req.method + ' ' + req.url);
    error.status = 404;
    res.sendFile(path.join(__dirname, '../../', 'client/404.html'));
  };
}
