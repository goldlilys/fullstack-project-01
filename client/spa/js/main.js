/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code
var Instructor = require('./instructor/instructor.controller');
var Resource = require('./learning-resource/learning-resource.controller');
// Initialize it
window.instructor = new Instructor({router:true, container: 'body'});
window.resource = new Resource({router:true, container: 'body'});

// Additional modules go here


// This should be the last line
window.Backbone.history.start();
