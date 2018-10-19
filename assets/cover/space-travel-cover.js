(function($) {
  $(document).ready(function() {
    
    // Build the structure outside of the DOM
    var $layerWrap = $('<div/>').attr('id', 'layers'),
        layers = 5,
        $layer,
        stars,
        $star;
    
    while (layers) {
      $layer = $('<div/>').addClass('layer layer-'+ layers);
      stars = 30;
      
      // Stick a bunch of svg stars on each layer
      while (stars) {
        $star = $('<span/>').addClass('star');
        //TODO : would it be more efficient to xlink it?
        $star.html('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M10.744,5.372C7.777,5.372,5.372,2.967,5.372,0c0,2.967-2.405,5.372-5.372,5.372c2.967,0,5.372,2.405,5.372,5.372 C5.372,7.777,7.777,5.372,10.744,5.372z"/></svg>');
        
        // Randomise the position, size, and opacity (colour defined in CSS)
        $star.css({
          left: randomInt(1, 100) +'%',
          top: randomInt(1, 100) +'%',
          transform: 'scale('+ randomNum(0, 1) +')',
          opacity: randomNum(0.6, 1)
        });
        
        $layer.append($star);
        stars--;
      }
      $layerWrap.prepend($layer);
      layers--;
    }
    
    $('body').append($layerWrap);
  });
  
  
  
  /**
   * Returns random integer
   */
  function randomInt(min, max) {
    return Math.floor((Math.random() * max) + min);
  }
  
  
  
  /**
   * Returns random number
   */
  function randomNum(min, max) {
    return Math.max((Math.random() * max), min).toFixed(1);
  }
  
})(jQuery);