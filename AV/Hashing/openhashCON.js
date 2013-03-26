"use strict";
(function ($) {
  var temp;
  var empty = [];
  var arrows = [];
  var i;
  for (i = 0; i < 10; i++) { empty[i] = ""; }
  var av = new JSAV("openhashCON1", {"animationMode": "none"});
  var arr = av.ds.array(empty, {indexed: true, center: false,
                            layout: "vertical", left: 20});
  var lists = []; // The actual set of lists
  for (i = 0; i < 10; i++) {
    lists[i] = av.ds.list({top: (22 + i * 46), left: 95, nodegap: 25});
    lists[i].layout({center: false});
  }
  lists[0].addFirst(100);
  lists[0].addLast(930);
  lists[0].layout({center: false});
  var x = av.g.line(52, 38 + 0 * 46, 95, 38 + 0 * 46,
    {"arrow-end": "classic-wide-long", "opacity": 1, "stroke-width": 2});
  lists[3].addLast(313);
  lists[3].layout({center: false});
  av.g.line(52, 38 + 3 * 46, 95, 38 + 3 * 46,
    {"arrow-end": "classic-wide-long", "stroke-width": 2});
  lists[7].addFirst(977);
  lists[7].addLast(207);
  lists[7].addLast(157);
  lists[7].layout({center: false});
  av.g.line(52, 38 + 7 * 46, 95, 38 + 7 * 46,
    {"arrow-end": "classic-wide-long", "stroke-width": 2});
  lists[9].addFirst(979);
  lists[9].layout({center: false});
  av.g.line(52, 38 + 9 * 46, 95, 38 + 9 * 46,
    {"arrow-end": "classic-wide-long", "stroke-width": 2});
}(jQuery));
