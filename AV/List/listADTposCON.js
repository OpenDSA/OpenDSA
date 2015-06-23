/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
//Possible positions for Array-Based list
$(document).ready(function () {
  var av_name = "listADTposCON";
  var config = ODSA.UTILS.loadConfig({"av_name": av_name});
  var interpret = config.interpreter;
  var av = new JSAV(av_name);
  var arrPositions = [" ", 5, 7, 3, 9, " "];

  //calculate left margin for the JSAV array object
  var canvasWidth = $(".jsavcanvas").width();
  var arrWidth3 = arrPositions.length * 65;
  var leftMargin3 = (canvasWidth - arrWidth3) / 2;
  var i;
  var arrowArray = [];
  var arr = av.ds.array(arrPositions, {indexed: false}).hide();

  // Slide 1
  av.umsg(interpret("av_c1"));
  av.displayInit();

  // Slide 2
  arr.show();
  for (i = 0; i < 5; i++) {
    arrowArray[i] = av.g.line(leftMargin3 + 75 + 60 * i, 0,
                              leftMargin3 + 75 + 60 * i, 25,
                              {"arrow-end": "classic-wide-long",
                               "opacity": 0, "stroke-width": 2});
  }
  av.umsg(interpret("av_c2"));
  av.step();

  // Slide 3
  for (i = 0; i < 5; i++) {
    arrowArray[i].show();
  }
  av.umsg(interpret("av_c3"));
  av.recorded();
});
