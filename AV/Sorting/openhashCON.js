"use strict";
(function ($) {
  var empty = [];
  var i;
  for (i = 0; i < 10; i++) { empty[i] = ""; }
  var av = new JSAV("openhashCON1", {"animationMode": "none"});
  var arr = av.ds.array(empty, {indexed: true, center: false,
                            layout: "vertical", left: 20});
  var lists = []; // The actual set of lists
  for (i = 0; i < 10; i++) {
    lists[i] = av.ds.list({top: (15 + i * 46), left: 80, nodegap: 30});
    lists[i].layout({center: false});
  }
  lists[0].addFirst(100);
  av.g.line(200, 60 + i * 46, 240, 60 + i * 46,
           {"arrow-end": "classic-wide-long", "opacity": 0, "stroke-width": 2});
  lists[0].addLast(930);
  lists[0].layout({center: false});
  lists[3].addLast(313);
  lists[3].layout({center: false});
  lists[7].addFirst(977);
  lists[7].addLast(207);
  lists[7].addLast(157);
  lists[7].layout({center: false});
  lists[9].addFirst(979);
  lists[9].layout({center: false});
}(jQuery));
