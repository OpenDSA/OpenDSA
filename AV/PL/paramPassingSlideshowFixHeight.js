//jsav whyyyyyyyy
$(window).load(function() {
  var canvases = $('.jsavcanvas');
  for(var i=0; i<canvases.length; i++){
    var canvas = $('svg', canvases[i]);
    var jsavcode = $('.jsavcode', canvases[i]);
    canvas.css('height', (jsavcode.height() + 12) + 'px');
    $(canvases[i]).css('min-height', (jsavcode.height() + 24) + 'px')
  }
})
