/*global JSAV, document */
// Written by Brannon Angers

$(document).ready(function() {
  "use strict";
  var av = new JSAV("AutomataCON", {animationMode: "none"});

  var left = 200;
  var ytop = 20;
  var elements = ["a", "a", "b", "b", "a", "b", "", "", "", ""];
  av.ds.tape(elements, left + 30, ytop, "right");

  //Control unit
  av.g.rect(left + 50, ytop + 105, 148, 152, {"stroke-width": 1});
  av.g.circle(left + 124, ytop + 194, 48, {"stroke-width": 1});
  // Arrow in circle of control unit
  av.g.line(left + 124, ytop + 194, left + 134, ytop + 184, {"stroke-width": 1});
  av.g.polyline([[left + 129, ytop + 186], [left + 134, ytop + 184], [left + 132, ytop + 188]], {"stroke-width": 1});

  //Arrow from control unit to input tape
  av.g.line(left + 107, ytop + 38, left + 107, ytop + 105, {"stroke-width": 1});
  av.g.polyline([[left + 104, ytop + 44], [left + 107, ytop + 38], [left + 110, ytop + 44]], {"stroke-width": 1});

  //Arrow from control unit to storage
  av.g.line(left + 198, ytop + 204, left + 245, ytop + 204, {"stroke-width": 1});
  av.g.polyline([[left + 239, ytop + 201], [left + 245, ytop + 204], [left + 239, ytop + 207]], {"stroke-width": 1});

  // Right edge of storage
  av.g.line(left + 248, ytop + 194, left + 248, ytop + 300, {"stroke-width": 1});
  // Left edge of storage
  av.g.line(left + 278, ytop + 194, left + 278, ytop + 300, {"stroke-width": 1});

  // Inner lines of storage from top to bottom
  av.g.line(left + 248, ytop + 204, left + 278, ytop + 204, {"stroke-width": 1});
  av.g.line(left + 248, ytop + 229, left + 278, ytop + 229, {"stroke-width": 1});
  av.g.line(left + 248, ytop + 254, left + 278, ytop + 254, {"stroke-width": 1});
  av.g.line(left + 248, ytop + 278, left + 278, ytop + 278, {"stroke-width": 1});

  av.label("input tape", {left: left + 90, top: ytop - 35});
  // Inner text of input tape
  av.label("tape head", {left: left + 126, top: ytop + 25});
  av.label("control unit", {left: left + 85, top: ytop + 100});
  av.label("0", {left: left + 105, top: ytop + 145});
  av.label("1", {left: left + 140, top: ytop + 145});
  av.label("storage", {left: left + 290, top: ytop + 170});
  av.label("(optional)", {left: left + 290, top: ytop + 190});

  av.displayInit();
  av.recorded();
});
