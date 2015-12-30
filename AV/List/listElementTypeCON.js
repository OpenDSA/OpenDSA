/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Homogeneous vs. non-homgeneous lists.
$(document).ready(function() {
  "use strict";
  var av_name = "listElementTypeCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Relative offsets
  var leftMargin = 200;
  var topMargin = 35;

  // Define lists
  var list1 = av.ds.list({left: leftMargin, top: topMargin});
  list1.addFirst("null").addFirst("").addFirst("").addFirst("").addFirst("").addFirst("null");
  list1.layout();

  var list2 = av.ds.list({left: leftMargin, top: topMargin + 100});
  list2.addFirst("null").addFirst("").addFirst("").addFirst("").addFirst("").addFirst("null");
  list2.layout();
  list2.hide();
  av.pointer("head", list1.get(0));
  av.pointer("curr", list1.get(2));
  av.pointer("tail", list1.get(5));

  var bigData = av.ds.array(["ID : 546457",
                             "Name : Jake",
                             "Phone : 5405642511",
                             "Email : example@vt.edu",
                             "Office : 212"
                            ], {layout: "vertical", top: 125, left: 50});
  bigData.addClass(true, "widerecord");

  var bigData1 = av.ds.array(["ID : 546213",
                              "Name : Mike",
                              "Phone : 5405642513",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", top: 125, left: 250});
  bigData1.addClass(true, "widerecord");

  var bigData2 = av.ds.array(["ID : 546805",
                              "Name : John",
                              "Phone : 5405642552",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", top: 125, left: 450});
  bigData2.addClass(true, "widerecord");

  var bigData3 = av.ds.array(["ID : 546991",
                              "Name : Lucy",
                              "Phone : 5405642568",
                              "Email : example@vt.edu",
                              "Office : 212"
                             ], {layout: "vertical", top: 125, left: 650});
  bigData3.addClass(true, "widerecord");

  list1.show();
  list1.layout();
  var listP1 = av.g.line(305, 65, 130, 140,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP2 = av.g.line(388, 65, 330, 140,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP3 = av.g.line(471, 65, 530, 140,
                 {"arrow-end": "classic-wide", "stroke-width": 2});
  var listP4 = av.g.line(554, 65, 730, 140,
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
  list1.get(2).value(5);
  list1.get(4).value("true");
  bigData.css({left: 170});
  bigData1.css({left: 400});
  bigData2.hide();
  bigData3.hide();
  av.g.line(305, 65, 240, 140, {"arrow-end": "classic-wide", "stroke-width": 2});
  av.g.line(470, 65, 480, 140, {"arrow-end": "classic-wide", "stroke-width": 2});
  av.recorded();
});
