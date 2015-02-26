'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var Model = require('../instructor.model');

// Test suite
console.log('test instructor.model');
describe('Instructor model ', function(){
  var model;

  describe('when creating a new model ', function(){
    beforeEach(function(){
      model = new Model();
    });

    it('has the expected routes', function(){
      expect(model.urlRoot).toEqual('/api/instructors');
    });
  });

  describe('when updating the model for instructor with errorSpy ', function(){
    var errorSpy;

    beforeEach(function(){
      errorSpy = jasmine.createSpy('Invalid');
      model = new Model({
        id: 1,
        firstName: 'Jeff',
        lastName: 'Thomas',
        skills: 'C++, Java'
      });
      model.on('invalid', errorSpy);
    });

    it('does not save when firstName is empty ', function(){
      model.set('firstName', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'firstName cannot be empty');
    });

    it('does not save when lastName is empty ', function(){
      model.set('lastName', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'lastName cannot be empty');
    });

    it('does not save when skills is empty ', function(){
      model.set('skills', null);
      model.save();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.calls.mostRecent().args[0]).toBe(model);
      expect(errorSpy.calls.mostRecent().args[1][0]).toEqual(
        'skills cannot be empty');
    });
  });

  describe('when changing the state of the model without errorSpy', function(){

    beforeEach(function(){

      model = new Model({
        id: 1,
        firstName: 'Mike',
        lastName: 'Foster',
        skills: 'reading'
      });

    });

    it('does not save when firstName is empty ', function(){
      model.set('firstName', null);
      model.save();
      expect(model.validationError).toEqual(['firstName cannot be empty']);
    });

    it('does not save when firstName and lastName are empty ', function(){
      model.set({firstName:null, lastName:null});
      model.save();
      expect(model.validationError).toEqual(['firstName cannot be empty',
                                             'lastName cannot be empty']);
    });

    it('does not save when firstName and skills are empty ', function(){
      model.set({firstName:null, skills:null});
      model.save();
      expect(model.validationError).toEqual(['firstName cannot be empty',
                                             'skills cannot be empty']);
    });

    it('does not save when lastName is empty ', function(){
      model.set('lastName', null);
      model.save();
      expect(model.validationError).toEqual(['lastName cannot be empty']);
    });

    it('does not save when lastName and skills are empty ', function(){
      model.set({lastName:null, skills:null});
      model.save();
      expect(model.validationError).toEqual(['lastName cannot be empty',
                                             'skills cannot be empty']);
    });

    it('does not save when skills is empty ', function(){
      model.set('skills', null);
      model.save();
      expect(model.validationError).toEqual(['skills cannot be empty']);
    });

    it('does not save when all fields are empty ', function(){
      model.set({firstName:null, lastName:null, skills:null});
      model.save();
      expect(model.validationError).toEqual(['firstName cannot be empty',
                                             'lastName cannot be empty',
                                             'skills cannot be empty']);
    });
  });
});
