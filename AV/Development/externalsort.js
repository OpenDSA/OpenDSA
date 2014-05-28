"use strict";

(function ($) {
  var av = new JSAV("externalSortOver", {"animationMode": "none"});

  // Draw the objects
  var height = 150;
  var widthoffset = 100;

  av.g.circle(55, height, 50, 50);
  av.g.line(55 + 50, height, 50 + 105, height, {"stroke-width": "3", "arrow-end": "classic"});
  av.g.rect(55 + widthoffset, height - 25, 100, 50);
  av.g.line(55 + 200, height, 50 + 255, height, {"stroke-width": "3", "arrow-end": "classic"});
  av.g.rect(55 + 250, height - 50, 50, 100);
  av.g.line(55 + 300, height, 50 + 355, height, {"stroke-width": "3", "arrow-end": "classic"});
  av.g.rect(55 + 350, height - 25, 100, 50);
  av.g.line(55 + 450, height, 50 + 505, height, {"stroke-width": "3", "arrow-end": "classic"});
  av.g.circle(55 + 550, height, 50, 50);

  // Draw the labels
  av.label("Input File", {left: 15, top: height - 100, visible: true}).show; 
  av.label("Input Buffer", {left: 160, top: height - 100, visible: true}).show;
  av.label("RAM", {left: 313, top: height - 100, visible: true}).show;
  av.label("Output Buffer", {left: 406, top: height - 100, visible: true}).show;
  av.label("Output Run File", {left: 550, top: height - 100, visible: true}).show;

}(jQuery));
