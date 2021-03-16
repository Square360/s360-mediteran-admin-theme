Drupal.behaviors.addModalParagraphsId = {
  attach: function(context, settings) {
    const $ = jQuery;

    $('.paragraph--type--modal',context).once('.paragraph--type--modal').each(function(){
      _modalId = $(this).attr('id');
      if (_modalId != undefined) {
        $(this).append('<div><strong>Modal ID:</strong> ' + _modalId + '</div>');
      }
    });
  }
};
