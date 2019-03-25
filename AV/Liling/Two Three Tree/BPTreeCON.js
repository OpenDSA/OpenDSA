$(document).ready(function() {
"use strict";

(function () {
  var av = new JSAV("tree");

  var msg = [
    "Example Tree"
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

  var third1 = [2, 11, 22, ""];
  var third2 = [34, 42, "", ""];
  var third3 = [47, 50, "", ""];
  var third4 = [53, 58, 60, ""];
  var third5 = [67, 76, "", ""];
  //var third6 = [83, 90, 100, ""];
  var second1 = [34, 47, "", ""];
  var second2 = [67, "", "", ""];
  var first1 = [53, "", "", ""];
  //level
  /*var n11 = BPTreeNode.newNode(first1, av, 4, false);
  var n21 = BPTreeNode.newNode(second1, av, 4, false);
  var n22 = BPTreeNode.newNode(second2, av, 4, false);
  var n31 = BPTreeNode.newNode(third1, av, 4, true);
  var n32 = BPTreeNode.newNode(third2, av, 4, true);
  var n33 = BPTreeNode.newNode(third3, av, 4, true);
  var n34 = BPTreeNode.newNode(third4, av, 4, true);
  var n35 = BPTreeNode.newNode(third5, av, 4, true);
  //Add chilrdren
  n11.setChildren(0, n21);
  n11.setChildren(1, n22);
  n21.setChildren(0, n31);
  n21.setChildren(1, n32);
  n21.setChildren(2, n33);
  n22.setChildren(0, n34);
  n22.setChildren(1, n35);

  n11.size_child = 2;
  n21.size_child = 3;
  n22.size_child = 2;*/
  //n22.setChildren(2, n36);
  //create a tree
  //var t = BPTree.newTree(av, 4, n11);
  var t = BPTree.newTree(av, 4, null);

  t.add(12);

  step();
  t.add(5);
  step();
  t.add(3);
  step();
  t.add(22);
  step();

  t.add(20);
  step();
  t.add(4);
  step();
  t.add(120);
  step();
  t.add(200);
  step();
  t.add(300);
  step();
  t.add(260);
  step();
  t.add(220);
  step();
  t.add(280);
  step();
  t.add(290);
  step();
  t.add(295);
  step();
  t.add(1);
  step();
  t.add(6);
  step();


  t.delete(200);
  step();
  t.delete(280);
  step();
  t.delete(290);
  step();
  t.delete(295);
  step();
  t.delete(12);
  step();
  t.delete(20);
  step();
  t.delete(4);
  step();
  t.delete(5);
  step();
  t.delete(6);
  step();
  t.add(4);
  t.add(5);
  t.delete(22);
  step();
  // t.delete(220);
  // step();
  // t.delete(300);
  // step();
  // t.delete(120);
  // step();
  // t.delete(6);
  // step();
  // t.delete(400);
  // step();
  // t.delete(5);
  // step();
  // t.add(6);
  // step();
  //  console.log(t);

t.printTree();
step();

  //var n11 = BPTreeNode.newNode(third1, av, 4, false);
  //var t = BPTree.newTree(av, 4);
  //console.log(t);
  //t.tempAdd();
  av.recorded();

}());

});
