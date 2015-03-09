'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var Model = require('../course.model');

// Test suite
console.log('test course.model');
describe('course model ', function(){
  var model;

  describe('when creating a new model ', function(){
    beforeEach(function(){
      model = new Model();
    });

    it('has the expected routes', function(){
      expect(model.urlRoot).toEqual('/api/courses');
    });
  });

  describe('when updating the model for course with errorSpy ', function(){
    var errorSpy;

    beforeEach(function(){
      errorSpy = jasmine.createSpy('Invalid');
      model = new Model({
        id: 1,
        title: 'Full Stack Dev I',
        courseType: 'video',
        description: 'Learn how to do single page apps'
      });
      model.on('invalid', errorSpy);
    });

    it('does not save when title is empty ', function(){
      model.set('title', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'title cannot be empty');
    });

    it('does not save when courseType is empty ', function(){
      model.set('courseType', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'courseType cannot be empty');
    });

    it('does not save when description is empty ', function(){
      model.set('description', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'description cannot be empty');
    });
  });

  describe('when changing the state of the model without errorSpy', function(){

    beforeEach(function(){

      model = new Model({
        id: 1,
        title: 'Front End Dev',
        courseType: 'instructor led',
        description: 'Learn front end dev'
      });

    });

    it('does not save when title is empty ', function(){
      model.set('title', null);
      model.save();
      expect(model.validationError).toEqual(['title cannot be empty']);
    });

    it('does not save when title and courseType are empty ', function(){
      model.set({title:null, courseType:null});
      model.save();
      expect(model.validationError).toEqual(['title cannot be empty',
                                             'courseType cannot be empty']);
    });

    it('does not save when title and description are empty ', function(){
      model.set({title:null, description:null});
      model.save();
      expect(model.validationError).toEqual(['title cannot be empty',
                                             'description cannot be empty']);
    });

    it('does not save when description is empty ', function(){
      model.set('description', null);
      model.save();
      expect(model.validationError).toEqual(['description cannot be empty']);
    });

    it('does not save when description and courseType are empty ', function(){
      model.set({description:null, courseType:null});
      model.save();
      expect(model.validationError).toEqual(['courseType cannot be empty',
                                             'description cannot be empty']);
    });

    it('does not save when courseType is empty ', function(){
      model.set('courseType', null);
      model.save();
      expect(model.validationError).toEqual(['courseType cannot be empty']);
    });

    it('does not save when all fields are empty ', function(){
      model.set({title:null, description:null, courseType:null});
      model.save();
      expect(model.validationError).toEqual(['title cannot be empty',
                                             'courseType cannot be empty',
                                             'description cannot be empty']);
    });
  });
});
