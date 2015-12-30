/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Deleting lists
$(document).ready(function() {
  "use strict";
  var av_name = "listElementDeleteCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 200;
  var topMargin = 35;

  // JSAV list
  var list1 = av.ds.list({left: leftMargin, top: topMargin});
  list1.addFirst("null").addFirst("").addFirst("").addFirst("").addFirst("").addFirst("null");
  list1.layout();

  var head = av.pointer("head", list1.get(0));
  var curr = av.pointer("curr", list1.get(2));
  var tail = av.pointer("tail", list1.get(5));

  var bigData = av.ds.array(["ID : 546457",
                             "Name : Jake",
                             "Phone : 5405642511",
                             "Email : example@vt.edu",
                             "Office : 212"
                            ], {layout: "vertical", left: 40, top: 135});
  bigData.addClass(true, "widerecord");

  var bigData1 = av.ds.array(["ID : 546213",
                              "Name : Mike",
                              "Phone : 5405642513",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", left: 240, top: 135});
  bigData1.addClass(true, "widerecord");

  var bigData2 = av.ds.array(["ID : 546805",
                              "Name : John",
                              "Phone : 5405642552",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", left: 440, top: 135});
  bigData2.addClass(true, "widerecord");

  var bigData3 = av.ds.array(["ID : 546991",
                              "Name : Lucy",
                              "Phone : 5405642568",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", left: 640, top: 135});
  bigData3.addClass(true, "widerecord");

  var listP1 = av.g.line(305, 65, 120, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP2 = av.g.line(388, 65, 320, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP3 = av.g.line(471, 65, 520, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP4 = av.g.line(554, 65, 720, 150,
                 {"arrow-end": "classic-wide", "stroke-width": 2});

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  listP1.hide();
  listP2.hide();
  listP3.hide();
  listP4.hide();
  list1.hide();
  curr.hide();
  head.hide();
  tail.hide();
  bigData.highlight();
  bigData1.highlight();
  bigData2.highlight();
  bigData3.highlight();
  av.recorded();
});
