$(document).ready(function() {
  "use strict";

  /*
   * Create a new tree:
   * BPTree.newTree(av, sizeOfNode, detail);
   * Add a value:
   * t.add(key, value);
   * Add without detail (use for find and delete)
   * t.addWithoutGraphic(key, value);
   * Delete a value:
   * t.delete(key);
   * find value:
   * t.findDetail(t.root, key, t.root);
   */

  (function () {
    var av = new JSAV("tree");

    av.umsg("Example BP Tree Visualization - Insert");

    var t = BPTree.newTree(av, 3, true);
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
  }());

  (function () {
    var av = new JSAV("find");

    av.umsg("Example BP Tree Visualization - Find");

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
  }());

  (function () {
    var av = new JSAV("delete");

    av.umsg("Example BP Tree Visualization - Delete");

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
  }());

});
