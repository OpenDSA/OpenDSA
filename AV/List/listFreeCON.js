/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Freelist example
$(document).ready(function() {
  "use strict";
  var av_name = "listFreeCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Offsets
  var leftMargin = 217;
  var topMargin = 35;

  // Create a list object under control of JSAV library
  var l = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  l.addFirst("null");
  l.addFirst("null");
  l.layout();

  // Create freelist
  var freelist = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin + 100});

  // Labels and pointers
  var nullLabel = av.label("null", {left: leftMargin, top: topMargin + 100});
  nullLabel.css({color: "red"});
  av.pointer("head", l.get(0));
  var curr = av.pointer("curr", l.get(1));
  var tail = av.pointer("tail", l.get(1), {anchor: "right top",
                                           myAnchor: "left bottom", left: -10});
  var pfreelist = av.pointer("freelist", nullLabel);

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  l.add(1, 8);
  l.layout();
  curr.target(l.get(1));
  tail.target(l.get(2), {anchor: "left top", myAnchor: "right bottom", left: 15, top: -20});
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  l.add(1, 12);
  l.add(2, 6);
  l.add(3, 20);
  l.layout();
  curr.target(l.get(1));
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  l.remove(1);
  l.layout();
  nullLabel.hide();
  freelist.addFirst("null");
  freelist.layout();
  pfreelist.target(freelist.get(0));
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  l.remove(1);
  l.layout();
  freelist.addFirst("null");
  freelist.layout();
  pfreelist.target(freelist.get(0));
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  l.add(1, 6);
  l.layout();
  freelist.remove(0);
  freelist.layout();
  pfreelist.target(freelist.get(0));
  av.recorded();
});
