'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Model.extend({

  defaults: {
    title: 'JavaScript Is Sexy',
    resourceType: 'link',
    description: 'Learn JavaScript properly.',
    authors: ['Mom', 'Dad']
  },

  urlRoot: '/api/learning-resources',

  initialize: function(){
    this.on('change', function(){
      this.trigger('foo', 'bar');
    });
  },

  validate: function(attrs){

    if (!attrs.title) {
      return 'Title cannot be empty';
    }
    if (!attrs.description) {
      return 'Description cannot be empty';
    }
    if (!attrs.authors) {
      return 'Authors cannot be empty';
    }
  }
});
