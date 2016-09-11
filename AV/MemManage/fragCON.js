$(document).ready(function () {
  "use strict";
  var av = new JSAV("fragCON", {"animationMode": "none"});
  var top = 45;

  var l = av.g.line(0, top, 470, top);
  var l2 = av.g.line(0, top + 50, 470, top + 50);

  var rect1 = av.g.rect(20, top, 60, 50).css({"fill": "lightgray"});
  var rect2 = av.g.rect(80, top, 20, 50).css({"fill": "white"});
  var rect3 = av.g.rect(100, top, 90, 50).css({"fill": "lightgray"});
  var rect4 = av.g.rect(190, top, 60, 50).css({"fill": "white"});
  var rect5 = av.g.rect(250, top, 70, 50).css({"fill": "lightgray"});
  var rect6 = av.g.rect(320, top, 20, 50).css({"fill": "lightgray"});
  var rect7 = av.g.rect(340, top, 60, 50).css({"fill": "white"});
  var rect8 = av.g.rect(400, top, 30, 50).css({"fill": "lightgray"});
  
  //var point = av.pointer(xFrag, rect2);
  var xFragLabel = av.label("Small block: External Fragmentation", {left :  110, top:  0});
  var xFragArrow = av.g.line(105, top - 15,  90, top, {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var inFragLabel = av.label("Unused space in allocated block: Internal fragmentation", {left :  20, top:  90});
  var inFragArrow = av.g.line(315, top + 65,  330, top + 50, {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  av.displayInit();
  av.recorded();
});
