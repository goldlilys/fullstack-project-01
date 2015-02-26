'use strict';

module.exports = function(instructor) {
  instructor.validatesUniquenessOf('_id', {
    message: 'must be unique id'
  });
};
