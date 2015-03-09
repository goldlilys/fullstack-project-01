'use strict';

var Backbone = require('../vendor/index').Backbone;
module.exports = Backbone.Model.extend({
  defaults: {
    title: '',
    courseType: 'video',
    description: ''
  },
  urlRoot: '/api/courses',
  initialize: function(){
    this.on('change', function(){

    });
  },
  validate: function(attrs){
    var errors = [];
    if (!attrs.title){
      errors.push('title cannot be empty');
    }
    if (!attrs.courseType){
      errors.push('courseType cannot be empty');
    }
    if (!attrs.description){
      errors.push('description cannot be empty');
    }
    return errors.length > 0 ? errors: false;
  }
});
