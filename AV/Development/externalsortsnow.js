"use strict";

(function ($) {
  var av = new JSAV("externalSortSnow", {"animationMode": "none"});

  // Draw the objects
  var height = 100;
  var widthoffset = 100;

  av.g.rect(55 + widthoffset, height - 25, 200, 100);
  av.g.line(55 + widthoffset, height - 25, 100 + 255, height + 75);


  // Draw arrows
  av.g.line(55 + widthoffset, height + 138, 55 + widthoffset, height + 80, 
	{"stroke-width": "3", "arrow-end": "classic"});
  av.g.line(125 + widthoffset, height + 95, 200 + widthoffset, height + 95, 
	{"stroke-width": "3", "arrow-end": "classic"});
  av.g.line(65 + widthoffset, height - 50, 65 + widthoffset, height - 25, 
	{"stroke-width": "3", "arrow-end": "classic"});
  av.g.line(110 + widthoffset, height - 50, 110 + widthoffset, height - 25,
	{"stroke-width": "3", "arrow-end": "classic"});
  av.g.line(155 + widthoffset, height - 50, 155 + widthoffset, height - 25, 
	{"stroke-width": "3", "arrow-end": "classic"});
  av.g.line(200 + widthoffset, height - 50, 200 + widthoffset, height - 25, 
	{"stroke-width": "3", "arrow-end": "classic"});
  av.g.line(245 + widthoffset, height - 50, 245 + widthoffset, height - 25, 
	{"stroke-width": "3", "arrow-end": "classic"});

  // Draw the labels
  av.label("Falling Snow", {left: 100 + widthoffset, top: height - 75, visible: true}).show; 
  av.label("Existing snow", {left: 65 + widthoffset, top: height + 40, visible: true}).show; 
  av.label("Future snow", {left: 250, top: height - 10, visible: true}).show;
  av.label("Start time T", {left: 55 + widthoffset, top: height + 140, visible: true}).show;
  av.label("Snowplow Movement", {left: 100 + widthoffset, top: height + 100, visible: true}).show;

}(jQuery));
