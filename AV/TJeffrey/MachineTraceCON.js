// Odd Numbers Traces
$(document).ready(function() {
  "use strict";
  var av_name = "MachineTraceCON";
  //  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  //      interpret = config.interpreter;

  // Load the config object with interpreter and code created by odsaUtils.js
  var av;

  av = new JSAV(av_name);

  // Slide 0

  var xStart = 150;
  var yStart = 0;
  av.umsg("Step 1: The tape head is at the character 1, with a current state of q0");
  var p1 = av.label("1)", {left: 170 + xStart, top: 0 + yStart});
  av.ds.tape([1, 0, 0, "", "", "", ""], 200 + xStart, yStart + 20, "right");
  var c0 = av.g.rect(200 + xStart, 100 + yStart, 110, 80);
  var c1 = av.label("q0", {left: 220 + xStart, top: 105 + yStart});

  var c2 = av.label("q1", {left: 220 + xStart, top: 135 + yStart});
  var p3 = av.g.line(215 + xStart, 100 + yStart, 215 + xStart, 55 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p4 = av.g.line(270 + xStart, 145 + yStart, 240 + xStart, 135 + yStart,
                     {"arrow-end": "classic-wide-long"});
  av.displayInit();


  // Slide 2
  av.umsg("Step 2: The tape head shifts right to the character 0 and the current state reaminds the same");
  var p5 = av.label("2)", {left: 170 + xStart, top: 0 + yStart});
  var p6 = av.g.line(245 + xStart, 100 + yStart, 245 + xStart, 55 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p7 = av.g.line(270 + xStart, 145 + yStart, 240 + xStart, 135 + yStart,
                     {"arrow-end": "classic-wide-long"});
  p1.hide();
  p4.hide();
  p3.hide();
  av.step();

  // Slide 3
  av.umsg("Step 3: The tape head shifts right again onto another 0, however, this time the current state changes from q0 to q1");
  var p8 = av.label("3)", {left: 170 + xStart, top: 0 + yStart});
  p5.hide();
  p6.hide();
  p7.hide();
  var p9 = av.g.line(275 + xStart, 100 + yStart, 275 + xStart, 55 + yStart,
                     {"arrow-end": "classic-wide-long"});
  var p10 = av.g.line(270 + xStart, 145 + yStart, 240 + xStart, 165 + yStart,
                      {"arrow-end": "classic-wide-long"});
  av.step();

  // Slide 4
  av.umsg("Step 4: The tape head shifts right again on a place with no value and the current state remains the same");
  av.label("4)", {left: 170 + xStart, top: 0 + yStart});
  p8.hide();
  p9.hide();
  p10.hide();
  c0.hide();
  c1.hide();
  c2.hide();
  av.g.rect(260 + xStart, 100 + yStart, 110, 80);
  av.label("q0", {left: 280 + xStart, top: 105 + yStart});
  av.label("q1", {left: 280 + xStart, top: 135 + yStart});
  av.g.line(305 + xStart, 100 + yStart, 305 + xStart, 55 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.g.line(330 + xStart, 145 + yStart, 300 + xStart, 165 + yStart,
            {"arrow-end": "classic-wide-long"});
  av.step();
  av.recorded();
});
