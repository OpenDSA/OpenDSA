$(document).ready(function() {
"use strict";

(function () {
  var av = new JSAV("tree");

  var msg = [
    "Example Tree: adding 12",
    "add 13",
    "add 14",
    "add 23",
    "add 5",
    "add 100",
    "add 20",
    "add 37",
    "delete 5",
    "delete 23",
    "delete 37",
    "add 120",
    "add 1000",
    "add 230",
    "add 222",
    "add 111",
    "add 225",
    "add 226",
    "delete 120"
  ];


  function step(skip_message, init) {
    if (!skip_message) {
      av.umsg(msg.shift());
    }
    if (init) {
      av.displayInit();
    } else {
      av.step();
    }
  }

  var t = BPTree.newTree(av, 3, null);

  t.add(12, "T", true);
  step(false, true);
  t.add(13, "K", true);
  step();
  t.add(14, "E", true);
  step();
  t.add(23, "Q", true);
  step();
  t.add(5, "F", true);
  step();
  t.add(100, "B", true);
  step();
  t.add(20, "J", true);
  step();
  t.add(37, "N", true);
  step()
  t.delete(5);
  step();
  t.delete(23);
  step();
  t.delete(37);
  step();
  t.add(120, "Y", true);
  step();
  t.add(1000, "B", true);
  step();
  t.add(230, "A", true);
  step();
  t.add(222, "F", true);
  step();
  t.add(111, "O", true);
  step();
  t.add(225, "M", true);
  step();
  t.add(226, "L", true);
  step();
  t.delete(120);
// t.printTree();
// step();

  //var n11 = BPTreeNode.newNode(third1, av, 4, false);
  //var t = BPTree.newTree(av, 4);
  //console.log(t);
  //t.tempAdd();
  av.recorded();

}());

});
