'use strict';

var Backbone = require('../vendor/index').Backbone;
var $ = require('../vendor/index').$;
var Model = require('./instructor.model');
var View = require('./instructor.view');

module.exports = Backbone.Controller.extend({
  routes: {
    'instructors/:id': 'showInstructor'
  },
  initialize: function(){
    this.options.container = this.options.container || 'body';
    this.model = new Model();
    this.view = new View({model: this.model});
  },
  showInstructor: function(instructorId, cb){
    this.fetchModel(instructorId, function(err){
      var view;

      this.remove();
      this.view = new View({model: this.model});

      if (err){
        view = this.renderError();
      } else {
        view = this.renderView();
      }
      if (cb){
        cb(err, view);
      }

    }.bind(this));
  },
  fetchModel: function(instructorId, cb){
    this.model.set({id: instructorId});
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
    return this.view;
  },
  renderError: function(){
    return this.renderToContainer(
      '<p>There was a problem rendering this instructor</p>');
  }
});
