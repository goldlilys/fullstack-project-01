'use strict';

var Backbone = require('../vendor/index').Backbone;
module.exports = Backbone.Model.extend({
  defaults: {
    firstName: '',
    lastName: '',
    skills: ''
  },
  urlRoot: '/api/instructors',
  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },
  validate: function(attrs){
    var errors = [];
    if (!attrs.firstName){
      errors.push('firstName cannot be empty');
    }
    if (!attrs.lastName){
      errors.push('lastName cannot be empty');
    }
    if (!attrs.skills){
      errors.push('skills cannot be empty');
    }
    return errors;
  }
});
