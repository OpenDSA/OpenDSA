/*global ODSA */
// Written by Liling Yuan and Cliff Shaffer
// Building a B+ Tree of order 5
$(document).ready(function() {
  "use strict";
  var av_name = "BPbuild5CON";
  var av = new JSAV(av_name);

  av.umsg("Example B+ Tree Visualization: Insert into a tree of degree 5");

  var t = BPTree.newTree(av, 4, true);
  av.displayInit();
  t.add(12, "T");
  t.add(9, "E");
  t.add(23, "Q");
  t.add(5, "F");
  t.add(2, "B");
  t.add(7, "A");
  t.add(38, "A");
  t.add(39, "F");
  t.add(40, "V");
  t.add(45, "V");
  av.recorded();
});
