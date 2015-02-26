/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var Backbone = require('../../vendor/index').Backbone;
var Controller = require('../learning-resource.controller');
var View = require('../learning-resource.view');
var $ = require('jquery');
var matchers = require('jasmine-jquery-matchers');

// Test suite
console.log('test learning-resource.controller');
describe('Learning resource controller', function(){

  var controller;

  beforeEach(function(){
    controller = new Controller();
  });

  it('can be created', function(){
    expect(controller).toBeDefined();
  });

  describe('when it is created', function(){

    it('has the expected routes', function(){
      expect(controller.routes).toEqual(jasmine.objectContaining({
        'learning-resource/:id': 'showLearningResource'
      }));
    });

    it('without a container option, uses body as the container', function(){
      expect(controller.options.container).toEqual('body');
    });

    it('with a container option, uses specified container', function(){
      var ctrl = new Controller({container: '.newcontainer'});
      expect(ctrl.options.container).toEqual('.newcontainer');
    });
  });

  describe('when calling showLearningResource', function(){

    beforeEach(function(){
      jasmine.addMatchers(matchers);
      //callThrough not necessary if not checking results
      spyOn(controller, 'showLearningResource').and.callThrough();
      spyOn(controller, 'initializeModel').and.callThrough();
      spyOn(controller, 'renderView').and.callThrough();
      spyOn(controller, 'renderError').and.callThrough();
    });

    describe('when viewing id the first time', function(){
      beforeEach(function(){
        spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
          params.success();
        });
        controller.showLearningResource(123);
      });

      it('does not have a previous view to remove', function(){
        spyOn(controller.view, 'remove').and.callThrough();
        expect(controller.view.remove).not.toHaveBeenCalled();
      });

    });

    describe('when switching to a different id', function(){

      beforeEach(function(done){
        spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
          params.success();
          done();
        });
        controller.showLearningResource(123);
      });

      it('does has a previous view to remove', function(){
        var oldView = controller.view;
        spyOn(oldView, 'destroy');
        controller.showLearningResource(222);
        expect(oldView.destroy).toHaveBeenCalled();
      });

    });

    describe('with a valid learning resource id', function(){
      beforeEach(function(){
        spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
          params.success();
        });
        controller.showLearningResource(123);
      });

      it('fetches the model successfully', function(){
        expect(controller.initializeModel).toHaveBeenCalled();
        expect(controller.model.attributes.id).toEqual(123);
      });

      it('renders the view', function(){
        expect(controller.renderView).toHaveBeenCalled();
        expect(controller.view.model.attributes.id).toEqual(123);
      });
    });

    describe('with an invalid learning resource id', function(){
      beforeEach(function(){
        spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
          params.error();
        });
        controller.showLearningResource('zzz');
      });

      it('fetches the model successfully', function(){
        //showLearningResource will initializeModel everytime
        expect(controller.initializeModel).toHaveBeenCalled();
        expect(controller.model.attributes.id).toEqual('zzz');
      });

      it('fails to render the view', function(){
        expect(controller.renderError).toHaveBeenCalled();
        expect($('body')).toHaveText('There was a problem');
      });
    });

    describe('with no learning resource id', function(){
      beforeEach(function(){
        spyOn(Backbone.Model.prototype, 'fetch').and.callFake(function(params){
          params.error();
        });
        controller.showLearningResource();
      });

      it('fetches the undefined model', function(){
        expect(controller.initializeModel).toHaveBeenCalledWith({id:undefined});
        expect(controller.model.attributes.id).toBe(undefined);
      });

      it('fails to render the view', function(){
        expect(controller.renderError).toHaveBeenCalled();
        expect($('body')).toHaveText('There was a problem');
      });

    });//no learning resource id

  });//calling showLearningResource

});//learning resource controller
