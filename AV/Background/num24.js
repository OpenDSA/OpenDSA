/*global JSAV, document */
// Written by Sushma Mandava
$(document).ready(function() {
  "use strict";
  var av = new JSAV("num24", {animationMode: "none"});
  var xPosition = 400;
  var yPosition = 2;
  var length1 = 125;
  var width = 30;
  av.g.rect(xPosition, yPosition, length1, width);
  av.label("num",  {top: yPosition, left: xPosition - 35});
  av.label("42", {top: yPosition - 5, left: xPosition + 50});
  av.displayInit();
  av.recorded();
});
