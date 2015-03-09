/* global window, require */

window.Backbone = require('./vendor').Backbone;

// Include your code
var Course = require('./course/course.controller');
var Courses = require('./course/courses.controller');
var Instructor = require('./instructor/instructor.controller');
var Instructors = require('./instructor/instructors.controller');
var Resource = require('./learning-resource/learning-resource.controller');
// Initialize it
window.course = new Course({router:true, container: 'body'});
window.courses = new Courses({router:true, container: 'body'});
window.instructor = new Instructor({router:true, container: 'body'});
window.instructors = new Instructors({router:true, container: 'body'});
window.resource = new Resource({router:true, container: 'body'});
// Additional modules go here

/* live instance to coordinate controller behavior for courses and instructor
 * glues both controllers together
 */
window.instructor.on('display:courses', function(data) {
  window.courses.trigger('display:courses', data);
});

// This should be the last line
window.Backbone.history.start();
