$(document).ready(function() {
  "use strict";

  (function () {
    var av = new JSAV("tree");

    av.umsg("Example BP Tree Visualization");
    av.displayInit();

    var t = BPTree.newTree(av, 3, true);
    t.add(12, "T");
    t.add(13, "K");
    t.add(9, "E");
    t.add(3, "Q");
    t.add(15, "F");
    t.add(100, "B");
    t.add(37, "N");
    // t.delete(5);
    // t.delete(23);
    // t.delete(37);
    t.add(120, "Y");
    t.add(1000, "B");
    t.add(38, "A");
    t.add(39, "F");
    // t.add(227, "Y");
    // t.add(228, "B");
    // t.add(229, "A");
    // t.add(230, "F");
    // t.add(1222, "F");
    // t.add(1111, "O");
    // t.add(1225, "M");
    // t.add(1226, "L");
    // t.add(1227, "Y");
    // t.add(1228, "B");
    // t.add(2227, "Y");
    // t.add(2228, "B");
    // t.add(3228, "B");
    // t.add(3227, "Y");
    // t.add(3228, "B");
    // t.delete(120);
    av.recorded();
  }());
});
