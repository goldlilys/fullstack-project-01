'use strict';

var Backbone = require('../vendor/index').Backbone;
var _ = require('../vendor/index')._;
var $ = require('../vendor/index').$;

var fs = require('fs'); //will be replaced by brfs in the browser

// readFileSync will be evaluated statically so errors can't be caught
var template = fs.readFileSync(__dirname + '/learning-resources.html', 'utf8');

module.exports = Backbone.View.extend({

  className: 'learning-resource',

  template: _.template(template),

  events: {
    'click .b-delete': 'destroy',
    'click .b-edit': 'edit',
    'click .b-cancel': 'cancel',
    'click .b-update': 'save'
  },

  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change', this.render);
  },

  edit: function(){
    var resource = this.model.get('resourceType');
    this.$el.addClass('editing'); //displays input fields
    $('#form-area').addClass('sty-form'); //add bg color of form
  },

  cancel: function(){
    this.$('#title').val(this.model.get('title'));
    this.$('#desc').val(this.model.get('description'));
    this.$('#auth').val(this.model.get('authors'));
    this.$('select option[value="'+this.model.get('resourceType')+'"]')
        .attr('selected','selected');
    $('#form-area').removeClass('sty-form'); //remove bg color of form
    $('#msg').empty()
             .addClass('alert-warning')
             .html('Changes cancelled')
             .fadeIn().delay(2000).fadeOut('slow')
             .queue(function(remove){
                $('#msg').removeClass('alert-warning');
                remove();
             });
    this.$el.removeClass('editing');
  },

  save: function(){
    var view = this;
    var auth = [];
    if (this.$('#auth').val() === '') auth = null;
    else $.each(this.$('#auth').val().split(','), function(){
      auth.push($.trim(this));
    });
    var attributes = {
      title: this.$('#title').val().trim(),
      resourceType: $('#resourceType option:selected').val(),
      description: this.$('#desc').val().trim(),
      authors: auth
    };
    var options = {
      success: function(){
        $('#form-area').removeClass('sty-form');
        view.$el.removeClass('editing');
        $('#msg').empty()
                 .addClass('alert-success')
                 .html('Sucessfully updated')
                 .fadeIn().delay(2000).fadeOut('slow')
                 .queue(function(remove){
                    $('#msg').removeClass('alert-success');
                    remove();
                  });
      },
      error: function(model, error){
        //server response errors if no validations specified
      }
    };
    this.model.save(attributes, options);
    if (this.model.validationError) {
      $('#msg').empty()
         .addClass('alert-danger')
         .html(this.model.validationError)
         .fadeIn().delay(2000).fadeOut('slow')
         .queue(function(remove){
            $('#msg').removeClass('alert-danger');
            remove();
      });
    }
  },

  render: function(){
    var context = this.model.toJSON();
    var auth = this.model.get('authors').toString().split(',').join(', ');
    this.$el.html(this.template(context));
    this.input = this.$('.editing');
    this.$('select option[value="'+this.model.get('resourceType')+'"]')
        .attr('selected','selected');
    this.$('#auth').val(auth);
    this.$('#author-dsp').text(auth);
    return this;
  },

  destroy: function(){
    this.model.destroy();
    this.remove();
  }
});
