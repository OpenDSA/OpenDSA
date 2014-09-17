
(function () {
  "use strict";
  var global = window.ttplustree;
  var av = new JSAV("tree");
  var n1;

  var msg = [
    "Insert key-value pair (52, B).",
    "The 2-3+ plus tree is empty, so create a new leaf node with the key-value pair (52, B) and set is as the n1 node.",
    "Insert key-value pair (46, X).",
    "The n1 node is a leaf node, and the right key-value pair is empty. Since 46 is less than 52, we can move 52 over to the right and insert 46 on the left",
    "Insert key-value pair (33, D).",
    "The n1 node is a leaf node, and it is full. A new leaf node must be created.",
    "The middle (46) and highest (52) key go to the new node. The lowest key (33) goes to the old node.",
    "A new internal node is created. This is going to become the new root node",
    "Set the key of the internal node and add links to the leaf node.",
    "Insert key-value pair (22, J).",
    "First look at the root node. The new key (22) is less than the left value, so we follow the left child.",
    "This is a leaf node and there is space to insert the new key.",
    "The new key (22) is less than 33, so the key 33 is moved to the right and the new key is placed on the left.",
    "Insert key-value pair (71, M).",
    "First look at the root node. The new key (77) is greater than the left value, so we follow the center child.",
    "This is a leaf node and there is no more space to insert the new key.",
    "The leaf node has to be split.",
    "The middle (52) and highest (71) key values go to the new node. The lowest (46) key value stays in the old node.",
    "Update the key of the parent node and add link to the leaf node."
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

  // Slide 1
  step(false, true);

  // Slide 2
  n1 = global.newNode(av, [52, ""], true, ["B", ""]);
  var nw = $(n1.array.element).outerWidth(); // Node width
  var nh = $(n1.array.element).outerHeight(); // Node height
  var nhg = 60; // Node horizontal gap
  var nvg = 100; // Node vertical gap
  step();

  // Slide 3
  step();

  // Slide 4
  n1.array.swap(0, 1);
  step();

  // Slide 5
  n1.value(0, 46, "X");
  step(true);

  // Slide 6
  step();

  // Slide 7
  var shift = ((nw) / 2) + (nhg / 2); // Horizontal shift for center nodes
  n1.move(-shift, 0);
  var n2 = global.newNode(av, ["", ""], true, ["", ""]);
  n2.move(shift, 0);
  step();

  // Slide 8
  av.effects.moveValue(n1.array, 0, n2.array, 0);
  av.effects.moveValue(n1.array, 1, n2.array, 1);
  n1.value(0, "33", "D");
  step();

  // Slide 9
  n1.move(0, nvg);
  n2.move(0, nvg);
  var n3 = global.newNode(av, ["", ""], false);
  n3.addChild(n1);
  n3.addChild(n2);
  n3.hideEdges();
  step();

  // Slide 10
  n3.showEdges();
  n3.value(0, "46");
  step();

  // Slide 11
  step();

  // Slide 12
  n3.highlightToggle();
  n3.highlightToggleEdge(0);
  step();

  // Slide 13
  n3.highlightToggle();
  n3.highlightToggleEdge(0);
  n3.child(0).highlightToggle();
  step();

  // Slide 14
  n3.child(0).array.swap(0, 1);
  step();

  // Slide 15
  n3.child(0).value(0, "22", "J");
  n3.child(0).highlightToggle();
  step(true);

  // Slide 16
  step();

  // Slide 17
  n3.highlightToggle();
  n3.highlightToggleEdge(1);
  step();

  // Slide 18
  n3.highlightToggle();
  n3.highlightToggleEdge(1);
  n3.child(1).highlightToggle();
  step();

  // Slide 18
  n3.child(1).highlightToggle();
  var n4 = global.newNode(av, ["", ""], true, ["", ""]);
  shift = nw + nhg;
  n4.move(shift, nvg);
  n3.addChild(n4);
  n3.hideEdges();

  shift = (nhg / 2) + (nw / 2);
  n3.child(0).move(-shift, 0);
  n3.child(1).move(-shift, 0);
  n3.updateEdges().showEdge(0).showEdge(1);
  step();

  // Slide 19
  av.effects.moveValue(n3.child(1).array, 1, n3.child(2).array, 0);
  n4.value(1, "71", "M");
  step();

  // Slide 20
  n3.value(1, "52");
  n3.showEdges();
  step();

  av.recorded();
}());