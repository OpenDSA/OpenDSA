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
    t.add(23, "Q");
    t.add(5, "F");
    t.add(2, "B");
    t.add(37, "N");
    // t.delete(12);
    // t.delete(23);
    // t.delete(37);
    t.add(120, "Y");
    t.add(1000, "B");
    t.add(38, "A");
    t.add(39, "F");
    t.delete(2);
    // t.delete(38);
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
    // t.delete(1111);
    // t.delete(1225);
    // t.delete(1228);
    // t.delete(13);
    // t.delete(9);
    // t.delete(228);
    // t.add(2227, "Y");
    // t.add(2228, "B");
    // t.add(3228, "B");
    // t.add(3227, "Y");
    // t.add(3228, "B");
    // t.delete(120);
    av.recorded();
  }());
});
