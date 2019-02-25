$(document).ready(function() {
"use strict";

(function () {
  var av = new JSAV("tree");

  var msg = [
    "First Node"
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
  var third4 = [67, 76, "", ""];
  var third5 = [83, 90, 100, ""];
  var second1 = [34, 47, "", ""];
  var second2 = [67, 83, "", ""];
  var first1 = [53, "", "", ""];
  //level
  var n11 = BPTreeNode.newNode(first1, av, 4, false);
  var n21 = BPTreeNode.newNode(second1, av, 4, false);
  var n22 = BPTreeNode.newNode(second2, av, 4, false);
  var n31 = BPTreeNode.newNode(third1, av, 4, true);
  var n32 = BPTreeNode.newNode(third2, av, 4, true);
  var n33 = BPTreeNode.newNode(third3, av, 4, true);
  var n34 = BPTreeNode.newNode(third4, av, 4, true);
  var n35 = BPTreeNode.newNode(third5, av, 4, true);
  n11.drawEdge(n21);
  //second level

  n21.move(-160, 80);
  n22.move(160, 80);
  //third level

  n31.move(-320, 160);
  n32.move(-160, 160);
  n33.move(0, 160);
  n34.move(160, 160);
  n35.move(320, 160);
  //line

  var nhg = 30; // Node horizontal gap
  var nvg = 70; // Node vertical gap


  //var n1 = TTTreeNode.newNode(av, ["", ""], true, ["", ""]);
  //var nw = $(n1.array.element).outerWidth(); // Node width
  //step();


  av.recorded();

}());

});
