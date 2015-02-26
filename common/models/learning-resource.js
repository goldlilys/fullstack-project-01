module.exports = function(learningResource) {
  learningResource.validatesInclusionOf('resourceType', {
    in: ['document', 'presentation', 'link'],
    message: 'not a valid resource type'
  });
};
