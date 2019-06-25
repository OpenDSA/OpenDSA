/*global ODSA */
// Written by Liling Yuan and Cliff Shaffer
// Deleting from a B+ Tree of order 4
$(document).ready(function() {
  "use strict";
  var av_name = "BPdeleteCON";
  var av = new JSAV(av_name);

   av.umsg("Example B+ Tree Visualization: Delete from a tree of degree 4");

    var t = BPTree.newTree(av, 3, false);
    t.addWithoutGraphic(27, "T");
    t.addWithoutGraphic(48, "E");
    t.addWithoutGraphic(44, "Q");
    t.addWithoutGraphic(5, "F");
    t.addWithoutGraphic(88, "B");
    t.addWithoutGraphic(67, "A");
    t.addWithoutGraphic(58, "A");
    t.addWithoutGraphic(60, "F");
    t.addWithoutGraphic(12, "V");
    t.addWithoutGraphic(10, "S");
    t.printTree();
    av.displayInit();
    t.detail = true;
    t.delete(12);
    t.delete(67);
    t.delete(60);
    t.delete(5);
    av.recorded();
});
