'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Collection.extend({
  url: '/api/instructors/',

  initialize: function(){
    this.on('sortById', this.sortById);
    this.on('sortByFirstName', this.sortByFirstName);
    this.on('sortByLastName', this.sortByLastName);
    this.on('addNew', this.addNew);
    this.trigger('sortById');
  },

  sortById: function(){
    this.comparator = function(model){
      return model.get('id');
    };
    this.sort();
  },

  sortByFirstName: function(){
    this.comparator = function(model){
      return model.get('firstName');
    };
    this.sort();
  },

  sortByLastName: function(){
    this.comparator = function(model){
      return model.get('lastName');
    };
    this.sort();
  },

  addNew: function() {
    this.create = function(model) {
      model.get('firstName');
      model.get('lastName');
      model.get('skills');
    };
  }
});
