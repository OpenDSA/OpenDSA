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
  var n11 = BPTreeNode.newNode(third1, av, 4, false);

  av.recorded();

}());

});
