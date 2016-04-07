$(document).ready(function () {
  "use strict";
  var av = new JSAV("fragCON", {"animationMode": "none"});
  var l = av.g.line(0, 30, 470, 30);
  var l2 = av.g.line(0, 80, 470, 80);
  
  var rect1 = av.g.rect(20, 30, 60, 50).css({"fill": "lightgray"});
  var rect2 = av.g.rect(80, 30, 20, 50).css({"fill": "white"});
  var rect3 = av.g.rect(100, 30, 90, 50).css({"fill": "lightgray"});
  var rect4 = av.g.rect(190, 30, 60, 50).css({"fill": "white"});
  var rect5 = av.g.rect(250, 30, 70, 50).css({"fill": "lightgray"});
  var rect6 = av.g.rect(320, 30, 20, 50).css({"fill": "lightgray"});
  var rect7 = av.g.rect(340, 30, 60, 50).css({"fill": "white"});
  var rect8 = av.g.rect(400, 30, 30, 50).css({"fill": "lightgray"});
  
  //var point = av.pointer(xFrag, rect2);
  var xFragLabel = av.label("Small block: External Fragmentation", {left :  110, top:  0});
  var xFragArrow = av.g.line(105,  10,  90, 28, {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var inFragLabel = av.label("Unused space in allocated block: Internal fragmentation", {left :  20, top:  100});
  var inFragArrow = av.g.line(315, 100,  330, 82, {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  av.displayInit();
  av.recorded();
});
