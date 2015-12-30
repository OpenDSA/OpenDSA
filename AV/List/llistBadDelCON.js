/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// The reason why there is a problem with naive representation of linked list
$(document).ready(function() {
  "use strict";
  var av_name = "llistBadDelCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);

  // Linked list
  var l = av.ds.list({nodegap: 30, top: 40, left: 257});
  l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
  l.get(1).highlight();
  l.layout();

  av.pointer("head", l.get(0));
  var curr = av.pointer("curr", l.get(2));
  var tail = av.pointer("tail", l.get(4));
  var bar = l.get(2).addVLine();
  var bar2 = l.get(3).addVLine({visible: 0});
  var dashlineLeftMargin = 452;    // Dash line in step 4
  var dashline = av.g.polyline([[dashlineLeftMargin, 66],
                                [dashlineLeftMargin + 13, 66],
                                [dashlineLeftMargin + 13, 30],
                                [dashlineLeftMargin + 83, 30],
                                [dashlineLeftMargin + 83, 66],
                                [dashlineLeftMargin + 101, 66]],
                               {"arrow-end": "classic-wide-long", opacity: 0,
                                "stroke-width": 2, "stroke-dasharray": "-"});

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  l.get(1).unhighlight();
  l.get(3).highlight();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  l.get(3).unhighlight();
  l.get(2).value("");
  l.get(2).highlight();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  av.effects.moveValue(l.get(3), l.get(2));
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  dashline.show();
  l.get(2).edgeToNext().hide();
  l.get(3).edgeToNext().hide();
  l.get(2).unhighlight();
  l.get(3).highlight();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  dashline.hide();
  l.remove(3);
  l.get(2).edgeToNext().show();
  l.layout();
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  curr.hide();
  tail.hide();
//  var newcurr = setPointerL("curr", l.get(3));
//  var newtail = setPointerR("tail", l.get(3));
  av.pointer("curr", l.get(3), {anchor: "left top",
                                myAnchor: "right bottom", left: 15});
  av.pointer("tail", l.get(3), {anchor: "right top",
                                myAnchor: "left bottom", left: -10});
  bar.hide();
  bar2.show();
  l.get(2).highlight();
  av.recorded();
});
