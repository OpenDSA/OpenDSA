"use strict";
(function ($) {
  var blockWidth = 47;  // Width of an array element

  var leftArray = [4, 8, 11, 25, 30];
  var rightArray = [2, 3, 17, 20];
  var empty = [];
  empty.length = 9;
  var av = new JSAV("mergesortCON1");

  var move = function (a, o, i) {
    av.step();
    av.umsg("Move the smaller value.");
    av.effects.moveValue(a, i, jsavarr_answer, o);
    a.unhighlight(i);
    av.step();
    av.umsg("Compare the smallest values in each list");
    a.highlight(i + 1);
  };

  var jsavarr_answer = av.ds.array(empty, {indexed: true, center: true, // let this auto-center
                                         layout: "array"});
  // position the left array relative to the answer array
  var jsavarr_left = av.ds.array(leftArray, {indexed: true, center: false,
                                              layout: "array",
                                              relativeTo: jsavarr_answer,
                                              left: - (blockWidth / 2),
                                              top: 20,
                                              myAnchor: "left top",
                                              anchor: "left bottom"
                                            });
  var jsavarr_right = av.ds.array(rightArray, {indexed: true, center: false,
                                                layout: "array",
                                                relativeTo: jsavarr_answer,
                                                left: blockWidth * 5.5,
                                                top: 20,
                                                myAnchor: "left top",
                                                anchor: "left bottom"
                                              });
  av.umsg("We now merge two sorted lists into one.");
  av.displayInit();
  av.umsg("First compare the smallest values in each list");
  jsavarr_left.highlight(0);
  jsavarr_right.highlight(0);
  av.step();
  av.umsg("The smaller value is 2 in the right list.");
  av.step();
  av.umsg("Move it to position 0 of the output list.");
  av.effects.moveValue(jsavarr_right, 0, jsavarr_answer, 0);
  jsavarr_right.unhighlight(0);
  av.step();
  av.umsg("Continue in this way, at each step comparing the smallest values in each list");
  jsavarr_right.highlight(1);
  move(jsavarr_right, 1, 1);
  move(jsavarr_left, 2, 0);
  move(jsavarr_left, 3, 1);
  move(jsavarr_left, 4, 2);
  move(jsavarr_right, 5, 2);
  move(jsavarr_right, 6, 3);
  move(jsavarr_left, 7, 3);
  move(jsavarr_left, 8, 4);
  av.recorded();
}(jQuery));
