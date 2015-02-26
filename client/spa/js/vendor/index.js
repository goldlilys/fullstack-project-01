'use strict';

// Expose underscore
exports._ = require('underscore');

var Backbone = require('backbone');
// Patch backbone as necessary

var Controller = require('backbone.controller');

// Assign and expose jquery reference since we are using browserify
Backbone.$ = exports.$ = require('jquery');

// Help prevent 'ghost views'
Backbone.View.prototype.close = function(){
  if (this.beforeClose) {
    this.beforeClose();
  }
  this.remove();
  this.unbind();
};

// Expose Backbone
exports.Backbone = Backbone;
