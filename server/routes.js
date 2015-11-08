/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/rules', require('./api/rule'));
  app.use('/api/numbers', require('./api/number'));
  app.use('/api/games', require('./api/game'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/trippy')
    .get(function(req, res) {
        var file = "./server/dummy.html";
        res.sendFile(path.resolve(file));
    });
  app.route('/*')
    .get(function(req, res) {
        var file = app.get("env") == "development" ? app.get('appPath') + "/home.html" : "./server/dummy.html";
        res.sendFile(path.resolve(file));
    });
};
