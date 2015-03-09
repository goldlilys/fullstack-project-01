'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var fs = require('fs'); //will be replaced by brfs in the browser
// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/courses.html', 'utf8');

module.exports = Backbone.View.extend({
  className: 'courses',
  template: _.template(template),
  events:{
    'click .sortById': 'sortById',
    'click .sortByTitle': 'sortByTitle',
    'click .sortByCourseType': 'sortByCourseType',
    'click .addNew': 'addNew',
    'click .filterByCourseType': 'filterByCourseType'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', function(){
      this.render();
    });
    this.listenTo(this.collection, 'reset', function(){
      this.render();
    });
    this.listenTo(this.collection, 'sort', function(){
      this.render();
    });
    /* listen to the controller's event on this view
     * where displayCourses is an object and
     * this.on is for events happening to object on itself */
    this.on('display:courses', function(data) {
      console.log('inside listen');
      this.displayCourses(data);
    });
  },

  render: function(collection) {
    var context = collection || this.collection;
    this.$el.html(this.template(context));
    return this;
  },

  addNew: function() {
    this.trigger('addNew');
    this.render();
  },

  sortById: function(){
    this.collection.trigger('sortById');
    this.render();
  },

  sortByTitle: function(){
    this.collection.trigger('sortByTitle');
    this.render();
  },

  sortByCourseType: function(){
    this.collection.trigger('sortByCourseType');
    this.render();
  },

  /* Filter courses by the instructor id */
  displayCourses: function(data) {
    console.log('displayCourses');
    var subset = this.collection.where({instructorId: data.instructorId});
    var collection = new Backbone.Collection(subset);

    // pass this subset to the container from the instructor
    this(data.container).html(this.template(collection));
  },

  filterByCourseType: function() {
    var subset = this.collection.trigger('filterByCourseType');
    var collection = new Backbone.Collection(subset);
    this.render(collection);

    return this;
  }
});
