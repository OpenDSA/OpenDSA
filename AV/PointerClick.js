"use strict";

(function ($) {
  var jsav = new JSAV("avcontainer1");
  // Relative offsets
  var leftMargin = 160;
  var topMargin = 45;

  var labeOne = jsav.label("labelOne",{top : 150, left: 0});
  var labelTwo = jsav.label("labelTwo",{top : 150, left: 700});

  var curr = jsav.pointer("click me", labeOne);
  jsav.displayInit();

  curr.element.click(function () {
    curr.target(labelTwo);
    jsav.container.trigger("jsav-updaterelative");
  });

  jsav.recorded();
}(jQuery));