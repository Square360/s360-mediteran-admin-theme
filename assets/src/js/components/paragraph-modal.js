Drupal.behaviors.addModalParagraphsId = {
  attach: function(context, settings) {
    const $ = jQuery;

    $('.paragraph--type--modal').each(function(){
      _modalId = $(this).attr('id');
      $(this).append('<div><strong>Modal ID:</strong> ' + _modalId + '</div>');
    });
  }
};
