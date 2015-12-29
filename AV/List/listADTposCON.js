/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Positions and notation for lists
$(document).ready(function() {
  "use strict";
  var av_name = "listADTposCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name});
  var interpret = config.interpreter;
  var av = new JSAV(av_name);
  var arrPositions = [" ", 5, 7, 3, 9, " "];
  var arr2Positions = ["<", 20, ",", 23, "|", 12, ",", 15, ">", "", "", "", ""];

  //calculate left margin for the JSAV array object
  var canvasWidth = $(".jsavcanvas").width();
  var arrWidth3 = arrPositions.length * 65;
  var leftMargin3 = (canvasWidth - arrWidth3) / 2;
  var i;
  var arrowArray = [];
  var arr = av.ds.array(arrPositions, {indexed: false}).hide();

  var alength = arr2Positions.length;
  var curr = 4;
  //Hidden jsav array for copyValue animation
  var temp = ["10", "|", "17"];
  var arr1 = av.ds.array(temp, {indexed: false}).hide();

  //jsav array object of the slideshow
  var arr2 = av.ds.array(arr2Positions, {indexed: false});
  arr2.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  arr.show();
  for (i = 0; i < 5; i++) {
    arrowArray[i] = av.g.line(leftMargin3 + 75 + 60 * i, 0,
                              leftMargin3 + 75 + 60 * i, 25,
                              {"arrow-end": "classic-wide-long",
                               opacity: 0, "stroke-width": 2});
  }
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  for (i = 0; i < 5; i++) {
    arrowArray[i].show();
  }
  av.umsg(interpret("sc3"));
  av.step();

  // Slide 4
  // Now for the notation part
  arr.hide();
  for (i = 0; i < 5; i++) {
    arrowArray[i].hide();
  }
  arr2.show();
  av.umsg(interpret("sc4"));
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.step();

  // Slide 6
  for (i = alength - 3; i > curr; i--) {
    av.effects.copyValue(arr2, i, arr2, i + 2);
  }
  av.effects.copyValue(arr1, 0, arr2, curr + 1);
  arr2.value(curr + 2, ",");
  av.umsg(interpret("sc6"));
  arr2.css([5], {color: "red"});
  av.step();

  // Slide 7
  arr2.value(4, ",");
  arr2.value(10, "|");
  arr2.value(11, ">");
  arr2.css([5], {color: "black"});
  av.umsg(interpret("sc7"));
  av.step();

  // Slide 8
  av.effects.copyValue(arr2, 11, arr2, 12);
  av.effects.copyValue(arr1, 2, arr2, 11);
  av.umsg(interpret("sc8"));
  arr2.css([11], {color: "red"});
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  av.recorded();
});
