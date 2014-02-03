"use strict";

(function ($) {
  var av = new JSAV("freelistCON", {"animationMode": "none"});
  var l = av.g.line(0, 30, 470, 30);
  var l2 = av.g.line(0, 105, 470, 105);
  
  var rect1 = av.g.rect(20, 30, 60, 75).css({"fill": "lightgray"});
  var rect2 = av.g.rect(80, 30, 70, 75).css({"fill": "white"});
  var rect3 = av.g.rect(150, 30, 100, 75).css({"fill": "lightgray"});
  var rect4 = av.g.rect(250, 30, 50, 75).css({"fill": "white"});
  var rect5 = av.g.rect(300, 30, 80, 75).css({"fill": "lightgray"});
  var rect6 = av.g.rect(380, 30, 40, 75).css({"fill": "white"});
  var rect7 = av.g.rect(420, 30, 30, 75).css({"fill": "lightgray"});
  
}(jQuery));