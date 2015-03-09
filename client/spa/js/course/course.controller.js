'use strict';

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./course.model');
var View = require('./course.view');

module.exports = Backbone.Controller.extend({
  routes: {
    'courses/:id': 'showCourse',
    'courses/new': 'addCourse'
  },
  initialize: function(){
    this.options.container = this.options.container || 'body';
    this.model = new Model();
    this.view = new View({model: this.model});
  },
  showCourse: function(courseId, cb){
    this.fetchModel(courseId, function(err){
      var view;

      this.view.remove();
      this.view = new View({model: this.model});

      if (err){
        view = this.renderError();
      } else {
        this.view.template = this.view.showTemplate;
        view = this.renderView();
      }
      if (cb){
        cb(err, view);
      }

    }.bind(this));
  },
  addCourse: function() {
    this.model = new Model();
    this.model.isNew();

    this.view.remove();

    this.view.template = this.view.editTemplate;
    this.renderView();
  },
  fetchModel: function(courseId, cb){
    this.model.set({id: courseId});
    this.model.fetch({
      success: function(model, response, options){
        //console.log(model);
        cb(null, model);
      },
      error: function(model, response, options){
        //console.error(response);
        cb(response, model);
      }
    });
  },
  renderToContainer: function(view){
    return $(this.options.container).html(view);
  },
  renderView: function(){
    this.renderToContainer(this.view.render().$el);
    this.view.delegateEvents();  // delegate for add in collections
    return this.view;
  },
  renderError: function(){
    return this.renderToContainer(
      '<p>There was a problem rendering this course</p>');
  }
});
