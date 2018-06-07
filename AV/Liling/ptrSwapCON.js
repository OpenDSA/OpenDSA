/*global JSAV, document */
// Written by Liling Yuan

$(document).ready(function() {
  "use strict";
  var av_name = "ptrSwapCON";
  var av = new JSAV(av_name);
  var ytop = 50;

  // Slide 1
  av.umsg("Here we see an array with references to four records.");
  for (var pos = ytop; pos < 145; pos += 30) {
    av.g.rect(360, pos, 30, 30);
    av.g.rect(425, pos + 5, 80, 20);
  }
  var arrow42 = av.g.line(375, 65, 425, 65,
                          {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow5 = av.g.line(375, 95, 425, 95,
                         {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(375, 125, 425, 125,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(375, 155, 425, 155,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var label42 = av.label("Key = 42", {left: 435, top: ytop - 10});
  var label5 = av.label("Key = 5", {left: 435, top: ytop + 20});
  av.label("Key = 23", {left: 435, top: ytop + 50});
  av.label("Key = 10", {left: 435, top: ytop + 80});
  av.displayInit();

  // Slide 2
  av.umsg("To start with, the record with key value 42 comes before the record with key value 5. So we want to swap them.");
  var swap1 = av.g.path("M 505 65 A 10 10 0 1 1 505 95",
                        {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var swap2 = av.g.path("M 505 95 A 10 10 0 1 0 505 65",
                        {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();


  // Slide 3
  av.umsg("All that we actually need to do is swap the pointers, not the records.");
  arrow5.hide();
  arrow42.hide();
  swap1.hide();
  swap2.hide();
  var arrow5b = av.g.line(375, ytop + 15, 425, ytop + 45, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow42b = av.g.line(375, ytop + 45, 425, ytop + 15, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 4
  av.umsg("Which is effectively the same as reordering the records themselves.");
  label42.hide();
  label5.hide();
  av.label("Key = 5", {left: 435, top: ytop - 10});
  av.label("Key = 42", {left: 435, top: ytop + 20});
  arrow5b.hide();
  arrow42b.hide();
  arrow5.show();
  arrow42.show();

  av.recorded();
});

