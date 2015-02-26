/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var View = require('../learning-resource.view.js');
var matchers = require('jasmine-jquery-matchers');
var Backbone = require('../../vendor/index').Backbone;

// Test suite
console.log('test learning-resource.view');
describe('Learning resource view ', function(){

  var model;
  var view;

  beforeEach(function(){
    var Model = Backbone.Model.extend({});

    // Add some convenience tests for working with the DOM
    // Helper for toHaveClass
    jasmine.addMatchers(matchers);

    // Needs to have the fields required by the template
    model = new Model({
      title: 'Crisis Averted',
      resourceType: 'presentation',
      description: 'You are welcome.',
      authors: ['Mary', 'Joe']
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
      expect(view.$el).toHaveClass('learning-resource');
    });

  });

  describe('when the view is rendered ', function(){

    it('returns the view object ', function(){
      expect(view.render()).toEqual(view);
    });

    it('produces the correct HTML ', function(){
      view.render();
      expect(view.$('#title').val()).toEqual('Crisis Averted');
    });

  });

  describe('when the user clicks on the Edit button ', function(){

    beforeEach(function(){
      view.render();
      view.$('button.b-edit').trigger('click');
    });

    describe('and when the user inputs new information ', function(){

      describe('then clicks the cancel button', function(){

        beforeEach(function(){
          view.render();
          view.$('#title').val('changed title');
          view.$('#desc').val('changed description');
          view.$('#authors').val('sis');
          view.$('#resourceType option:selected').val('link');
        });

        it('cancels the user input', function(){
          view.render();
          view.$('button.b-cancel').trigger('click');
        });

        it('should see the initial information', function(){
          view.render();
          expect(view.$('#title').val()).toEqual('Crisis Averted');
          expect(view.$('#desc').val()).toEqual('You are welcome.');
          expect(view.$('#auth').val()).toContain('Joe');
          expect(view.$('#resourceType option:selected')
                     .val()).toEqual('presentation');
        });
      });

      describe('and then clicks on the Update button ', function(){

        beforeEach(function(){
          view.render();
          view.$('#title').val('changed title');
          view.$('#desc').val('changed description');
          view.$('#authors').val('sis');
          view.$('#resourceType option:selected').val('link');
          spyOn(view, 'save').and.callThrough();
          view.delegateEvents();
          spyOn(model, 'save');
        });

        it('updates the model', function(){
          view.render();
          view.$('button.b-update').trigger('click');
          expect(view.save).toHaveBeenCalled();
          expect(model.save).toHaveBeenCalled();
        });

      }); //describe update button

    }); //describe new information

    describe('when the user clicks on the Delete button ', function(){

      beforeEach(function(){
        // Must call through otherwise the actual view function won't be called
        spyOn(view, 'destroy').and.callThrough();
        // Must delegateEvents for the spy on a DOM event to work
        view.delegateEvents(); //allow bubbling

        spyOn(model, 'destroy');
      });

      it('deletes the model', function(){
        // Must render for the event to be fired
        view.render();
        view.$('button.b-delete').trigger('click');
        expect(view.destroy).toHaveBeenCalled();
        expect(model.destroy).toHaveBeenCalled();
      });

    }); //describe delete button

  }); //describe edit button

}); //describe suite
