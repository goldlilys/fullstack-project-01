'use strict';

/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/
// Get the code you want to test
var Collection = require('../instructors.collection');
// Test suite
console.log('test instructors.collection');
describe('Instructors collection ', function(){
  var collection;
  var modelA;
  var modelB;
  var modelC;

  beforeEach(function(){

    // Set up test data
    modelA = {id: 3, firstName: 'Jeff', lastName: 'Thomas'};
    modelB = {id: 1, firstName: 'Tom', lastName: 'Shell'};
    modelC = {id: 2, firstName: 'Emily', lastName: 'Row'};
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

    it('orders the models by the instructor id', function(){
      collection.trigger('sortById');
      expect(collection.at(2).get('id')).toEqual(modelA.id);
      expect(collection.at(0).get('id')).toEqual(modelB.id);
      expect(collection.at(1).get('id')).toEqual(modelC.id);
    });
  });

  describe('when the collection interacts with the server', function(){
    it('fetches from the correct url', function(){
      collection = new Collection();
      expect(collection.url).toEqual('/api/instructors/');
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

    it('sorts by firstName', function(){
      collection.trigger('sortByFirstName');
      expect(collection.at(1).get('firstName')).toEqual(modelA.firstName);
      expect(collection.at(2).get('firstName')).toEqual(modelB.firstName);
      expect(collection.at(0).get('firstName')).toEqual(modelC.firstName);
    });

    it('sorts by lastName', function(){
      collection.trigger('sortByLastName');
      expect(collection.at(2).get('lastName')).toEqual(modelA.lastName);
      expect(collection.at(1).get('lastName')).toEqual(modelB.lastName);
      expect(collection.at(0).get('lastName')).toEqual(modelC.lastName);
    });
  });
});
