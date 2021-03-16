Drupal.behaviors.addModalParagraphsId = {
  attach: function(context, settings) {
    const $ = jQuery;

    $('.paragraph--type--modal').each(function(){
      _modalId = $(this).attr('id');
      $(this).append('<div><label>Modal ID:</label> ' + _modalId + '</div>');
    });
  }
};
