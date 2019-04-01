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
  var t = BPTree.newTree(av, 3, null);

  t.add(12, "12");
  t.add(5, "5");
  t.add(20, "20");
  t.add(50, "50");
  t.add(100, "100");
  t.add(200, "200");
  t.add(300, "300");
  t.add(400, "400");
  t.add(500, "500");
  t.add(600, "600");
  t.add(1000, "1000");
  t.add(60, "60");
  t.add(70, "70");
  t.add(80, "80");
  t.add(2000, "2000");
  t.add(3000, "3000");
  t.add(4000, "4000");
  t.add(5000, "5000");
  t.add(15, "15");
  t.add(7000, "7000");

//parent merge test
  // t.add(9000, "9000");
  // t.add(90, "90");
  // t.add(90, "80");
  // t.add(85, "85");
  // t.add(86, "86");
  // t.add(87, "87");
  // t.add(88, "88");
  // t.add(89, "89");
  // t.delete(88);
  // t.delete(89);
  // t.delete(86);
  // t.add(2500, "2500");
  // t.add(2600, "2600");
  // t.delete(90);
  // t.delete(90);
  // t.delete(60);
  // t.delete(70);
  // t.delete(2500);
  // t.delete(2600);
  // t.delete(20);
  // t.delete(85);
  // t.delete(200);
  // t.delete(87);
  // t.delete(1000);
  
//leaf merge test
  // t.delete(50);
  // t.add(30, "thirty");
  // t.delete(80);
  // t.delete(60);
  // t.add(90, "90");
  // t.delete(100);
  // t.add(25, "25")
  // t.delete(12);
  // t.add(85, "85");
  // t.delete(20);
  // t.add(220, "220");
  // t.delete(85);
  // t.delete(30);
  // t.delete(200);
  // t.delete(500);
  // t.delete(25);
  // t.delete(220);
  // t.delete(15);
  // t.delete(90);
  // t.delete(300);

t.printTree();
step();

  //var n11 = BPTreeNode.newNode(third1, av, 4, false);
  //var t = BPTree.newTree(av, 4);
  //console.log(t);
  //t.tempAdd();
  av.recorded();

}());

});
