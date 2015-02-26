'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var View = require('../instructor.view.js');
var matchers = require('jasmine-jquery-matchers');
var Backbone = require('../../vendor/index').Backbone;
// Test suite
console.log('test instructor.view');
describe('Instructor view ', function(){

  var model;
  var view;
  var Model;

  beforeEach(function(){

    // Add some convenience tests for working with the DOM
    jasmine.addMatchers(matchers);
    Model = Backbone.Model.extend({});

    spyOn(Model.prototype, 'save');

    // Needs to have the fields required by the template
    model = new Model({
      firstName: 'Jeff',
      lastName: 'Thomas',
      skills: 'C++, Java'
    });

    view = new View({
      model: model
    });
  });

  describe('when the view is instantiated ', function(){

    it('creates the correct element', function(){

      // Element has to be uppercase
      expect(view.el.nodeName).toEqual('DIV');

    });

    it('sets the correct class', function(){
      expect(view.$el).toHaveClass('instructor');
    });
  });

  describe('when the view is rendered ', function(){
    it('returns the view object ', function(){
      expect(view.render()).toEqual(view);
    });

    it('produces the correct HTML ', function(){
      view.render();
      expect(view.$('h1').html()).toEqual('Jeff Thomas');
    });
  });

  describe('when the user clicks on the Edit button ', function(){
    beforeEach(function(){
      // do all spyOn before rendering
      spyOn(view, 'save').and.callThrough();
      spyOn(view, 'cancel').and.callThrough();
      // call delegate after spyOn
      view.delegateEvents();
      view.render();
      view.$('.i-edit').trigger('click');
    });

    describe('when the user enters new instructor information ', function(){

      describe('when user clicks on the cancel button', function(){

        beforeEach(function(){
          view.$('.i-cancel').trigger('click');
        });

        it('cancels the user input', function(){
          expect(view.cancel).toHaveBeenCalled();
        });
      });

      describe('when user clicks on the save button', function(){
        beforeEach(function(){
          view.$('#firstName').val('changed firstName');
          view.$('#lastName').val('changed lastName');
          view.$('#skills').val('changed skills');

          view.$('.i-save').trigger('click');
        });

        it('updates the model', function(){
          expect(view.save).toHaveBeenCalled();
          expect(Model.prototype.save).toHaveBeenCalled();
        });

      });

    });

  });  // end edit/update test

  describe('when the user clicks on the Delete button ', function(){

    beforeEach(function(){

      // Must call through otherwise the actual view function won't be called
      spyOn(view, 'destroy').and.callThrough();

      // Must delegateEvents for the spy on a DOM event to work
      view.delegateEvents();
      spyOn(model, 'destroy');
    });

    it('deletes the model', function(){
      // Must render for the event to be fired
      view.render();
      view.$('.i-delete').trigger('click');
      expect(view.destroy).toHaveBeenCalled();
      expect(model.destroy).toHaveBeenCalled();
    });  // end delete model test

  }); // end delete

});  // end entire suite
