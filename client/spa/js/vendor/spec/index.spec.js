/*
global jasmine, describe, it, expect, beforeEach, afterEach, xdescribe, xit,
spyOn
*/

// Get the code you want to test
var vendor = require('../index');
var _ = vendor._;
var $ = vendor.$;
var Backbone =  vendor.Backbone;

// Test suite
console.log('test _');
describe('Underscore ', function(){

  it('is defined', function(){
    expect(_.VERSION).toBeDefined();
  });

  it('has a template function', function(){
    expect(_.template).toBeDefined();
  });

});

console.log('test $');
describe('Underscore ', function(){

  it('is defined', function(){
    expect(_.VERSION).toBeDefined();
  });

  it('has a template function', function(){
    expect(_.template).toBeDefined();
  });

});

console.log('test Backbone');
describe('Backbone ', function(){

  it('is defined', function(){
    expect(Backbone.VERSION).toBeDefined();
  });

  it('has a Model', function(){
    expect(Backbone.Model).toBeDefined();
  });

  it('has a $', function(){
    expect(Backbone.$).toBeDefined();
  });

  it('has a View', function(){
    expect(Backbone.View).toBeDefined();
  });

  it('has a View.close', function(){
    expect(Backbone.View.prototype.close).toBeDefined();
  });

  it('has a Controller', function(){
    expect(Backbone.Controller).toBeDefined();
  });

});


