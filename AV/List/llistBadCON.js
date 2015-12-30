/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Bad representation version for linked list
$(document).ready(function() {
  "use strict";
  var av_name = "llistBadCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);

  // Set up the list
  var l = av.ds.list({nodegap: 30, top: 35, left: 257});
  l.addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20);
  l.layout();
  l.get(2).addVLine();

  // Set up the various pointers
  var head = av.pointer("head", l.get(0));
  head.hide();
  var curr = av.pointer("curr", l.get(2));
  curr.hide();
  var tail = av.pointer("tail", l.get(4));
  tail.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  head.show();
  curr.show();
  tail.show();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  l.remove(2);
  l.layout();
  av.recorded();
});
