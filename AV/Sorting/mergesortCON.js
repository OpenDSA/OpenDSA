"use strict";
/*global alert*/

(function ($) {
  var rowHeight = 91;   // Space required for each row to be displayed
  var blockWidth = 47;  // Width of an array element

  var leftArray = [4, 8, 11, 20];
  var rightArray = [2, 3, 17, 25, 30];
  var empty = [];
  empty.length = 9;
  var av = new JSAV("mergesortCON1");

  var move = function (a, o, i) {
    av.step();
    av.umsg("Move the smaller value.");
    jsavarr_answer.value(o, a.value(i));
    a.value(i, "");
    av.step();
    av.umsg("Compare the smallest values in each list");
    a.highlight(i + 1);
  };

  var jsavarr_answer = av.ds.array(empty, {indexed: true, center: false,
                                         layout: "array"});
  jsavarr_answer.element.css({"left": blockWidth / 2, "top": 0});
  var jsavarr_left = av.ds.array(leftArray, {indexed: true, center: false,
                                              layout: "array"});
  jsavarr_left.element.css({"left": 0, "top": 0});
  var jsavarr_right = av.ds.array(rightArray, {indexed: true, center: false,
                                                layout: "array"});
  jsavarr_right.element.css({"left": blockWidth * 5, "top": -rowHeight});
  av.umsg("We now merge two sorted lists into one.");
  av.displayInit();
  av.umsg("First compare the smallest values in each list");
  jsavarr_left.highlight(0);
  jsavarr_right.highlight(0);
  av.step();
  av.umsg("The smaller value is 2 in the right list.");
  av.step();
  av.umsg("Move it to position 0 of the output list.");
  jsavarr_answer.value(0, 2);
  jsavarr_right.value(0, "");
  av.step();
  av.umsg("Continue in this way, at each step comparing the smallest values in each list");
  jsavarr_right.highlight(1);
  move(jsavarr_right, 1, 1);
  move(jsavarr_left, 2, 0);
  move(jsavarr_left, 3, 1);
  move(jsavarr_left, 4, 2);
  move(jsavarr_right, 5, 2);
  move(jsavarr_left, 6, 3);
  move(jsavarr_right, 7, 3);
  move(jsavarr_right, 8, 4);
  av.recorded();
}(jQuery));
