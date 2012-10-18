"use strict";
(function ($) {
  var empty = [];
  var i;
  for (i = 0; i < 10; i++) { empty[i] = ""; }
  var av = new JSAV(openhashCON1, {"animationMode": "none"});
  var arr = av.ds.array(empty, {indexed: true, center: false,
                            layout: "vertical"});
  var lists = []; // The actual set of lists
  for (i = 0; i < 10; i++) {
    lists[i] = av.ds.list({top: (i * 50), left: 60, nodegap: 30});
    lists[i].layout({center: false});
  }
  lists[0].addFirst(1000);
  lists[0].addLast(9530);
  lists[0].layout({center: false});
  lists[3].addLast(3013);
  lists[3].layout({center: false});
  lists[7].addFirst(9877);
  lists[7].addLast(2007);
  lists[7].addLast(1057);
  lists[7].layout({center: false});
  lists[9].addFirst(9879);
  lists[9].layout({center: false});
}(jQuery));
