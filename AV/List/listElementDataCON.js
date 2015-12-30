/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// List data storage
$(document).ready(function() {
  "use strict";
  var av_name = "listElementDataCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 200;
  var topMargin = 100;

  // JSAV arrays and lists
  var arr = av.ds.array([21, 35, 21, 9], {left: 360, top: 10});
  var l = av.ds.list({left: leftMargin, top: topMargin});
  l.addFirst("null").addFirst(9).addFirst(21).addFirst(35).addFirst(21).addFirst("null");
  l.layout();

  var bigData = av.ds.array(["ID : 546457",
                             "Name : Jake",
                             "Phone : 5405642511",
                             "Email : example@vt.edu",
                             "Office : 212"
                            ], {layout: "vertical", top: 135, left: 170});
  bigData.addClass(true, "widerecord");

  var bigData1 = av.ds.array(["ID : 546213",
                              "Name : Mike",
                              "Phone : 5405642513",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", top: 135, left: 470});
  bigData1.addClass(true, "widerecord");

  var bigData2 = av.ds.array(["ID : 546805",
                              "Name : John",
                              "Phone : 5405642552",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", top: 135, left: 470});
  bigData2.addClass(true, "widerecord");

  var bigData3 = av.ds.array(["ID : 546991",
                              "Name : Lucy",
                              "Phone : 5405642568",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", top: 135, left: 470});
  bigData3.addClass(true, "widerecord");

  bigData.hide();
  bigData1.hide();
  bigData2.hide();
  bigData3.hide();
  var head = av.pointer("head", l.get(0));
  var curr = av.pointer("curr", l.get(2));
  var tail = av.pointer("tail", l.get(5));

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  arr.hide();
  l.show();
  l.get(1).value("");
  l.get(2).value("");
  l.get(3).value("");
  l.get(4).value("");
  l.translateY(-60);
  bigData.show();
  bigData1.show();
  var listP1 = av.g.line(305, 70, 250, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP2 = av.g.line(390, 70, 260, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP3 = av.g.line(470, 70, 560, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP4 = av.g.line(555, 70, 570, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  l.hide();
  head.hide();
  curr.hide();
  tail.hide();
  listP1.hide();
  listP2.hide();
  listP3.hide();
  listP4.hide();

  arr.show();
  arr.css({top: 20});
  arr.value(0, " ");
  arr.value(1, " ");
  arr.value(2, " ");
  arr.value(3, " ");

  bigData2.show();
  bigData3.show();
  bigData.css({left: 10});
  bigData1.css({left: 210});
  bigData2.css({left: 410});
  bigData3.css({left: 610});
  av.g.line(380, 50, 100, 150, {"arrow-end": "classic-wide", "stroke-width": 2});
  av.g.line(409, 50, 300, 150, {"arrow-end": "classic-wide", "stroke-width": 2});
  av.g.line(438, 50, 500, 150, {"arrow-end": "classic-wide", "stroke-width": 2});
  av.g.line(467, 50, 700, 150, {"arrow-end": "classic-wide", "stroke-width": 2});
  av.umsg(interpret("sc3"));
  av.recorded();
});
