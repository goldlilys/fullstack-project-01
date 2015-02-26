'use strict';

module.exports = function mountApps(server) {

  var path = require('path');
  var browserify = require('browserify-middleware');
  var brfs = require('brfs');

  // Set up paths
  var clientPath = path.join(__dirname, '../..', '/client/');
  var clientRelativePath = '/client/';


  // Set up router
  var router = server.loopback.Router();

  router.get('/index', function(req, res){
    res.sendFile(path.join(clientPath, 'spa-index.html'));
  });

  router.get('/js/build.js', browserify(
    path.join(clientPath, 'spa/js/main.js'),
    {
      transform: [ brfs ]
    }
  ));

  router.use('/', server.loopback.static(clientRelativePath));


  // Mount the router on the app
  server.use('/spa', router);

};



