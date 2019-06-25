/*global ODSA */
// Written by Liling Yuan and Cliff Shaffer
// Search in a B+ Tree of order 4
$(document).ready(function() {
  "use strict";
  var av_name = "BPfindCON";
  var av = new JSAV(av_name);

   av.umsg("Example B+ Tree Visualization: Search in a tree of degree 4");

    var t = BPTree.newTree(av, 3, false);
    t.addWithoutGraphic(25, "T");
    t.addWithoutGraphic(18, "E");
    t.addWithoutGraphic(40, "Q");
    t.addWithoutGraphic(55, "F");
    t.addWithoutGraphic(89, "B");
    t.addWithoutGraphic(77, "A");
    t.addWithoutGraphic(98, "A");
    t.addWithoutGraphic(39, "F");
    t.addWithoutGraphic(127, "V");
    t.addWithoutGraphic(10, "S");
    t.printTree();
    av.displayInit();
    t.findDetail(t.root, 10, t.root);
    t.findDetail(t.root, 39, t.root);
    t.findDetail(t.root, 89, t.root);
    av.recorded();
});
