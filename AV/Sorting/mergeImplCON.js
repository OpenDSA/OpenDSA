"use strict";
(function ($) {
  var move = function (o, i) {
    av.step();
    av.umsg("Move the smaller value.");
    av.effects.moveValue(jsavarr_temp, i, jsavarr_A, o);
    jsavarr_temp.unhighlight(i);
    av.step();
    if (o !== 8) {
      av.umsg("Compare the smallest values in each list.");
      jsavarr_temp.highlight(i + 1);
    }
  };

  var startArray = [4, 8, 11, 25, 30, 2, 3, 17, 20];
  var empty = [];
  empty.length = 9;
  var av = new JSAV("mergeImplCON1");

  var jsavarr_A = av.ds.array(startArray, {indexed: true, center: true, // auto-center
                                           layout: "array"});
  var jsavarr_temp = av.ds.array(empty, {indexed: true, center: true, // auto-center
                                           layout: "array"});
  av.umsg("Initially, we have the two sorted sublists in array A, and an empty temp array.");
  av.displayInit();
  av.umsg("Move everything from A to temp.");
  for (var i = 0; i < empty.length; i++) {
    av.effects.moveValue(jsavarr_A, i, jsavarr_temp, i);
  }
  av.step();
  av.umsg("Now we are ready to do the merge. First compare the smallest values in each list");
  jsavarr_temp.highlight(0);
  jsavarr_temp.highlight(5);
  av.step();
  av.umsg("The smaller value is 2 in the right list.");
  av.step();
  av.umsg("Move it to position 0 of the A array.");
  av.effects.moveValue(jsavarr_temp, 5, jsavarr_A, 0);
  jsavarr_temp.unhighlight(5);
  av.step();
  av.umsg("Continue in this way, at each step comparing the smallest values in each list");
  jsavarr_temp.highlight(6);
  move(1, 6);
  move(2, 0);
  move(3, 1);
  move(4, 2);
  move(5, 7);
  move(6, 8);
  move(7, 3);
  move(8, 4);
  av.recorded();
}(jQuery));

(function ($) {
  var move = function (o, i, h) {
    av.step();
    av.umsg("Move the smaller value.");
    av.effects.moveValue(jsavarr_temp, i, jsavarr_A, o);
    jsavarr_temp.unhighlight(i);
    av.step();
    if (o !== 8) {
      av.umsg("Compare the smallest values in each list.");
      jsavarr_temp.highlight(h);
    }
  };

  var startArray = [4, 8, 11, 25, 30, 2, 3, 17, 20];
  var tempArray = [4, 8, 11, 25, 30, 20, 17, 3, 2];
  var empty = [];
  empty.length = 9;
  var av = new JSAV("mergeImplCON2");

  var jsavarr_A = av.ds.array(startArray, {indexed: true, center: true, // auto-center
                                           layout: "array"});
  var jsavarr_temp = av.ds.array(empty, {indexed: true, center: true, // auto-center
                                           layout: "array"});
  av.umsg("Initially, we have the two sorted sublists in array A, and an empty temp array.");
  av.displayInit();
  av.umsg("Move everything from A to temp...");
  for (var i = 0; i <= 4; i++) {
    av.effects.moveValue(jsavarr_A, i, jsavarr_temp, i);
  }
  av.step();
  av.umsg("Move everything from A to temp, but reverse the values in the right array.");
  av.effects.moveValue(jsavarr_A, 8, jsavarr_temp, 5);
  av.effects.moveValue(jsavarr_A, 7, jsavarr_temp, 6);
  av.effects.moveValue(jsavarr_A, 6, jsavarr_temp, 7);
  av.effects.moveValue(jsavarr_A, 5, jsavarr_temp, 8);
  av.step();
  av.umsg("Now we are ready to do the merge. First compare the smallest values in each list");
  jsavarr_temp.highlight(0);
  jsavarr_temp.highlight(8);
  av.step();
  av.umsg("The smaller value is 2 in the right list.");
  av.step();
  av.umsg("Move it to position 0 of the A array.");
  av.effects.moveValue(jsavarr_temp, 8, jsavarr_A, 0);
  jsavarr_temp.unhighlight(8);
  av.step();
  av.umsg("Continue in this way, at each step comparing the smallest values in each list");
  jsavarr_temp.highlight(7);
  move(1, 7, 6);
  move(2, 0, 1);
  move(3, 1, 2);
  move(4, 2, 3);
  move(5, 6, 5);
  move(6, 5, 4);
  move(7, 3, 9);
  move(8, 4, 4);
  av.recorded();
}(jQuery));
