$(document).ready(function() {
  "use strict";

  (function () {
    var av = new JSAV("tree");

    av.umsg("Example BP Tree Visualization");
    av.displayInit();

    var t = BPTree.newTree(av, 3, true);
    t.add(12, "T");
    t.add(13, "K");
    t.add(14, "E");
    t.add(23, "Q");
    t.add(5, "F");
    t.add(100, "B");
    t.add(20, "J");
    t.add(37, "N");
    t.delete(5);
    t.delete(23);
    t.delete(37);
    t.add(120, "Y");
    t.add(1000, "B");
    t.add(230, "A");
    t.add(222, "F");
    t.add(111, "O");
    t.add(225, "M");
    t.add(226, "L");
    t.delete(120);
    av.recorded();
  }());
});
