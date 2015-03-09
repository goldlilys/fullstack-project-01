'use strict';

var Backbone = require('../vendor/index').Backbone;

module.exports = Backbone.Collection.extend({
  url: '/api/courses/',

  initialize: function(){
    this.on('sortById', this.sortById);
    this.on('sortByTitle', this.sortByTitle);
    this.on('sortByCourseType', this.sortByCourseType);
    this.on('addNew', this.addNew);
    this.on('filterByCourseType', this.filterByCourseType);
    this.trigger('sortById');
  },

  sortById: function(){
    this.comparator = function(model){
      return model.get('id');
    };
    this.sort();
  },

  sortByTitle: function(){
    this.comparator = function(model){
      return model.get('title');
    };
    this.sort();
  },

  sortByCourseType: function(){
    this.comparator = function(model){
      return model.get('courseType');
    };
    this.sort();
  },

  addNew: function() {
    this.create = function(model) {
      model.get('title');
      model.get('courseType');
      model.get('description');
    };
  },

  filterByCourseType: function() {
    var filtered = this.where({courseType: 'instructor led'});

    return new Backbone.Collection(filtered);
  }
});
