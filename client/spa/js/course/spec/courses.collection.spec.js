'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var Collection = require('../courses.collection');
// Test suite
console.log('Test courses.collection');
describe('Courses collection ', function(){
  var collection;
  var modelA;
  var modelB;
  var modelC;

  beforeEach(function(){

    // Set up test data
    modelA = {id: 3, title: 'Full Stack Dev I', courseType: 'video'};
    modelB = {id: 1, title: 'Front End Dev', courseType: 'instructor led'};
    modelC = {id: 2, title: 'Graphics', courseType: 'instructor led'};
  });

  describe('when models are added to the collection ', function(){
    beforeEach(function(){
      collection = new Collection();
      collection.add([
        modelA,
        modelC,
        modelB
      ],
        {silent: false} // Set to true to suppress add event
      );
    });

    it('orders the models by the course id', function(){
      collection.trigger('sortById');
      expect(collection.at(2).get('id')).toEqual(modelA.id);
      expect(collection.at(0).get('id')).toEqual(modelB.id);
      expect(collection.at(1).get('id')).toEqual(modelC.id);
    });
  });

  describe('when models are filtered in the collection ', function(){
    beforeEach(function(){
      collection = new Collection();
      collection.add([
        modelA,
        modelC,
        modelB
      ],
        {silent: false} // Set to true to suppress add event
      );
    });

    it('filters by courseType', function(){
      var typeCollection = collection.where({courseType: 'instructor led'});
      var newcollection = new Collection(typeCollection);

      //console.log('newcollection length = ' + newcollection.length);

      expect(newcollection.at(0).get('id')).toEqual(modelB.id);
      expect(newcollection.at(1).get('id')).toEqual(modelC.id);
      expect(newcollection.length).toEqual(2);
    });

    it('filters by courseType2', function(){
      var instructorLed = collection.trigger('filterByCourseType');

      //var newInstructors = new Collection(instructorLed);

      //console.log('instructorLed length = ' + instructorLed.length);

      expect(collection.at(0).get('id')).toEqual(modelB.id);
      expect(collection.at(1).get('id')).toEqual(modelC.id);
      //expect(collection.length).toEqual(2);
    });
  });

  describe('when the collection interacts with the server', function(){
    it('fetches from the correct url', function(){
      collection = new Collection();
      expect(collection.url).toEqual('/api/courses/');
    });
  });

  describe('when a sort event is triggered', function(){
    beforeEach(function(){
      collection = new Collection();
      collection.add([
        modelC,
        modelB,
        modelA
        ],
        {silent: false} // Set to true to suppress add event
      );
    });

    it('sorts by id', function(){
      collection.trigger('sortById');
      expect(collection.at(2).get('id')).toEqual(modelA.id);
      expect(collection.at(0).get('id')).toEqual(modelB.id);
      expect(collection.at(1).get('id')).toEqual(modelC.id);
    });

    it('sorts by title', function(){
      collection.trigger('sortByTitle');
      expect(collection.at(1).get('title')).toEqual(modelA.title);
      expect(collection.at(0).get('title')).toEqual(modelB.title);
      expect(collection.at(2).get('title')).toEqual(modelC.title);
    });

    it('sorts by courseType', function(){
      collection.trigger('sortByCourseType');
      expect(collection.at(2).get('courseType')).toEqual(modelA.courseType);
      expect(collection.at(1).get('courseType')).toEqual(modelB.courseType);
      expect(collection.at(0).get('courseType')).toEqual(modelC.courseType);
    });

    it('filters by courseType', function(){
      collection.trigger('filterByCourseType');
      expect(collection.at(1).get('courseType')).toEqual(modelB.courseType);
      expect(collection.at(0).get('courseType')).toEqual(modelC.courseType);
    });
  });
});
