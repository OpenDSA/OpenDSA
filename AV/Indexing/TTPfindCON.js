/*global ODSA */
// Written by Cliff Shaffer
// Search in a 2-3+ Tree
$(document).ready(function() {
  "use strict";
  var av_name = "TTPfindCON";
  var av = new JSAV(av_name);

   av.umsg("Example 2-3+ Tree Visualization: Search");

    var t = BPTree.newTree(av, 2, false);
    t.addWithoutGraphic(65, "S");
    t.addWithoutGraphic(52, "B");
    t.addWithoutGraphic(22, "X");
    t.addWithoutGraphic(33, "O");
    t.addWithoutGraphic(71, "W");
    t.addWithoutGraphic(89, "M");
    t.addWithoutGraphic(46, "H");
    t.addWithoutGraphic(47, "L");
    t.addWithoutGraphic(15, "J");
    t.printTree();
    av.displayInit();
    t.findDetail(t.root, 65, t.root);
    t.findDetail(t.root, 15, t.root);
    t.findDetail(t.root, 47, t.root);
    av.recorded();
});
