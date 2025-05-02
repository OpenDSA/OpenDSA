/*global JSAV, document */
// Written by Liling Yuan

$(document).ready(function() {
  "use strict";
  var av_name = "ptrSwapCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  var ytop = 1;

  // Slide 1
  av.umsg(interpret("sc1"));
  for (var pos = ytop; pos < 115; pos += 30) {
    av.g.rect(360, pos, 30, 30);
    av.g.rect(425, pos + 5, 80, 20);
  }
  var arrow42 = av.g.line(375, 16, 425, 16,
                          {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow5 = av.g.line(375, 46, 425, 46,
                         {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(375, 76, 425, 76,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(375, 106, 425, 106,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var label42 = av.label("Key = 42", {left: 435, top: ytop - 10});
  var label5 = av.label("Key = 5", {left: 435, top: ytop + 20});
  av.label("Key = 23", {left: 435, top: ytop + 50});
  av.label("Key = 10", {left: 435, top: ytop + 80});
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  var swap1 = av.g.path("M 505 16 A 10 10 0 1 1 505 46",
                        {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var swap2 = av.g.path("M 505 46 A 10 10 0 1 0 505 16",
                        {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arrow5.hide();
  arrow42.hide();
  var arrow5b = av.g.line(375, ytop + 15, 425, ytop + 45, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  var arrow42b = av.g.line(375, ytop + 45, 425, ytop + 15, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();

  // Slide 4
  av.umsg(interpret("sc3"));
  swap1.hide();
  swap2.hide();
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

