'use strict';

module.exports = function(course) {
  course.validatesInclusionOf('courseType', {
    in: ['video', 'WBT', 'instructor led'],
    message: 'courseType is not allowed'
  });
  course.validatesUniquenessOf('id', {
    message: 'must be unique id'
  });
  course.validatesUniquenessOf('title', {
    message: 'must be unique title'
  });
};
