"use strict";

(function () {
  var global = window.ttplustree;
  var av = new JSAV("tree");
  var leafList = [];
  var arrowList = [];

  var msg = [
    "Insert key-value pair (52, B).",
    "The 2-3+ plus tree is empty, so create a new leaf node and set is as the root node.",
    "Set the key-value pair (52, B) ",
    "Insert key-value pair (46, X).",
    "The root node is a leaf node, and the right key-value pair is empty. Since 46 is less than 52, we can move 52 over to the right and insert 46 on the left",
    "Insert key-value pair (33, D).",
    "The root node is a leaf node, and it is full. A new leaf node must be created.",
    "The middle (46) and highest (52) key go to the new node. The lowest key (33) goes to the old node and the smallest key on the new node gets promoted",
    "Link the two leaf nodes together.",
    "A new internal node is created. This is going to become the new root node",
    "Set the key of the internal node and add links to the leaf node.",
    "Insert key-value pair (22, J).",
    "First look at the root node. The new key (22) is less than the left value, so we follow the left child.",
    "This is a leaf node and there is space to insert the new key.",
    "The new key (22) is less than 33, so the key 33 is moved to the right and the new key is placed on the left.",
    "Insert key-value pair (71, M).",
    "First look at the root node. The new key (71) is greater than the left value, so we follow the center child.",
    "This is a leaf node and there is no more space to insert the new key.",
    "The leaf node has to be split.",
    "The middle (52) and highest (71) key values go to the new node. The lowest (46) key value stays in the old node and the smallest key on the new node gets promoted.",
    "Link the leaf nodes together",
    "Update the key of the parent node and add link to the leaf node.",
    "Insert key-value pair (65, S)",
    "First look at the root node. The new key (65) is greater than the right value, so we follow the right child",
    "This is a leaf node and there is no more space to insert the new key.",
    "The leaf node has to be split",
    "The middle (65) and largest (71) key values go to the new node. The lowest (52) key value stays in the old node and the smalle key of the new node gets promoted.",
    "Link the leaf nodes together",
    "The lowest key (65) of the new node has to be promoted",
    "The parent node is full however.",
    "The parent node has to be split.",
    "The highest (65) key goes to the new node. The lowest key (46) stays in the old node and the middle key (52) gets promoted.",
    "Now update the pointers.",
    "The middle key (52) of the internal node now has to be promoted",
    "A new root has to be created.",
    "The new root is empty.",
    "The key can be inserted here.",
    "And the pointers are updated."
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

  // First Insert -------------------------------------------------------------

  // Slide 1
  // Create insert node
  var ins = global.newNode(av, ["52"], true, ["B"]); // Array for insert values
  ins.array.element.addClass('insert-node');
  var canvas = $(ins.array.element).parent();
  var w = $(canvas).innerWidth();
  var aw = $(ins.array.element).outerWidth();
  var ah = $(ins.array.element).outerHeight();
  ins.move((w / 2) - aw, 0);
  var label = av.label("Insert:"); // Label for insert values
  label.addClass('insert-label');
  var lw = $(label.element).outerWidth();
  label.css({"left": (w - aw - lw - 15) + "px", "top": "10px"});
  // Create promote node
  var prom = global.newNode(av, [""], false, [""]); // Array for promote values
  prom.array.addClass('promote-node');
  prom.move((w / 2) - aw, ah + 10);
  label = av.label("Promote:"); // Label for promote valus
  label.addClass('promote-label');
  lw = $(label.element).outerWidth();
  label.css({"left": (w - aw - lw - 15) + "px", "top": "35px"});
  step(false, true);

  // Slide 2
  var n1 = global.newNode(av, ["", ""], true, ["", ""]);
  var nw = $(n1.array.element).outerWidth(); // Node width
  var nhg = 30; // Node horizontal gap
  var nvg = 70; // Node vertical gap
  step();

  // Slide 3
  av.effects.moveValue(ins.array, 0, n1.array, 0);
  step();

  // Second Insert -------------------------------------------------------------

  // Slide 4
  ins.value(0, "46", "X");
  step();

  // Slide 5
  n1.array.swap(0, 1);
  step();

  // Slide 6
  av.effects.moveValue(ins.array, 0, n1.array, 0);
  step(true);

  // Third Insert -------------------------------------------------------------

  // Slide 7
  ins.value(0, "33", "D");
  step();

  // Slide 8
  var shift = ((nw) / 2) + (nhg / 2); // Horizontal shift for center nodes
  n1.move(-shift, 0);
  var n2 = global.newNode(av, ["", ""], true, ["", ""]);
  n2.move(shift, 0);
  step();

  // Slide 9
  av.effects.moveValue(n1.array, 0, n2.array, 0);
  av.effects.moveValue(n1.array, 1, n2.array, 1);
  av.effects.moveValue(ins.array, 0, n1.array, 0);
  prom.array.value(0, 46);
  step();

  // Slide 10
  leafList.push(n1);
  leafList.push(n2);
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 11
  n1.move(0, nvg);
  n2.move(0, nvg);
  var n3 = global.newNode(av, ["", ""], false);
  n3.addChild(n1);
  n3.addChild(n2);
  n3.hideEdges();
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 12
  n3.showEdges();
  av.effects.moveValue(prom.array, 0, n3.array, 0);
  step();

  // Fourth Insert -------------------------------------------------------------

  // Slide 13
  ins.value(0, "22", "J");
  step();

  // Slide 14
  n3.highlightToggle();
  n3.highlightToggleEdge(0);
  step();

  // Slide 15
  n3.highlightToggle();
  n3.highlightToggleEdge(0);
  n3.child(0).highlightToggle();
  step();

  // Slide 16
  n3.child(0).array.swap(0, 1);
  step();

  // Slide 17
  av.effects.moveValue(ins.array, 0, n3.child(0).array, 0);
  n3.child(0).highlightToggle();
  step(true);

  // Fifth Insert -------------------------------------------------------------

  // Slide 18
  ins.value(0, "71", "M");
  step();

  // Slide 19
  n3.highlightToggle();
  n3.highlightToggleEdge(1);
  step();

  // Slide 20
  n3.highlightToggle();
  n3.highlightToggleEdge(1);
  n3.child(1).highlightToggle();
  step();

  // Slide 21
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
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 22
  av.effects.moveValue(n3.child(1).array, 1, n3.child(2).array, 0);
  av.effects.moveValue(ins.array, 0, n4.array, 1);
  prom.value(0, 52);
  step();

  // Slide 23
  leafList.push(n4);
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 24
  av.effects.moveValue(prom.array, 0, n3.array, 1);
  n3.showEdges();
  step();

  // Sixth Insert -------------------------------------------------------------

  // Slide 25
  ins.value(0, "65", "S");
  step();

  // Slide 26
  n3.highlightToggle();
  n3.highlightToggleEdge(2);
  step();

  // Slide 27
  n3.highlightToggle();
  n3.highlightToggleEdge(2);
  n3.child(2).highlightToggle();
  step();

  // Slide 28
  n3.child(2).highlightToggle();
  var n5 = global.newNode(av, ["", ""], true, ["", ""]);
  shift = (nw * 1.5) + (nhg * 1.5);
  n5.move(shift, nvg);

  shift = (nw / 2) + (nhg / 2);
  n3.child(0).move(-shift);
  n3.child(1).move(-shift);
  n3.child(2).move(-shift);
  n3.updateEdges();
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 29
  av.effects.moveValue(n3.child(2).array, 1, n5.array, 1);
  av.effects.moveValue(ins.array, 0, n5.array, 0);
  prom.value(0, 65);
  step();

  // Slide 30
  leafList.push(n5);
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 31
  step();

  // Slide 32
  n3.highlightToggle();
  step();

  // Slide 33
  n3.highlightToggle();
  var n6 = global.newNode(av, ["", ""], false, ["", ""]);
  shift = (nw / 2) + (nhg / 2) + ((nw + nhg) / 2);
  n3.move(-shift, 0);
  n6.move(shift, 0);
  n3.updateEdges();
  step();

  // Slide 34
  av.effects.moveValue(prom.array, 0, n6.array, 0);
  prom.value(0, "52");
//  av.effects.moveValue(n3.array, 1, n6.array, 0);
  n3.value(1, "");
//  n6.value(0, 65);
  step();

  // Slide 35
  var child = n3.removeChild(2);
  n6.addChild(child);
  n6.addChild(n5);
  n6.updateEdges();
  step();

  // Slide 36
  step();

  // Slide 37
  var n7 = global.newNode(av, ["", ""], false, ["", ""]);
  n3.child(0).move(0, nvg);
  n3.child(1).move(0, nvg);
  n6.child(0).move(0, nvg);
  n6.child(1).move(0, nvg);
  n3.move(0, nvg);
  n6.move(0, nvg);
  n3.updateEdges();
  n6.updateEdges();
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 38
  n7.highlightToggle();
  step();

  // Slide 39
  n7.highlightToggle();
  av.effects.moveValue(prom.array, 0, n7.array, 0);
  step();

  // Slide 40
  n7.addChild(n3);
  n7.addChild(n6);
  n7.updateEdges();
  step();

  av.recorded();
}());

(function () {
  var global = window.ttplustree;
  var av = new JSAV("find");
  var leafList = [];
  var arrowList = [];

  var msg = [
    "",
    ""
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

  // Setup initial tree state
  var root = global.newNode(av, ["52", ""], false);
  root.addChild(global.newNode(av, ["22", "46"], false));
  root.addChild(global.newNode(av, ["65", "71"], false));

  root.child(0).addChild(global.newNode(av, ["15", ""], true, ["J", ""]));
  root.child(0).addChild(global.newNode(av, ["22", "33"], true, ["X", "O"]));
  root.child(0).addChild(global.newNode(av, ["46", "47"], true, ["H", "L"]));

  root.child(1).addChild(global.newNode(av, ["52", ""], true, ["B", ""]));
  root.child(1).addChild(global.newNode(av, ["65", ""], true, ["S", ""]));
  root.child(1).addChild(global.newNode(av, ["71", "89"], true, ["W", "M"]));

  var nw = $(root.array.element).outerWidth(); // Node width
  var nhg = 30; // Node horizontal gap
  var nvg = 70; // Node vertical gap

  var shift = (nw / 2) + (nhg / 2);
  root.child(0).child(0).move(-5 * shift, nvg * 2);
  root.child(0).child(1).move(-3 * shift, nvg * 2);
  root.child(0).child(2).move(-shift, nvg * 2);
  root.child(1).child(0).move(shift, nvg * 2);
  root.child(1).child(1).move(3 * shift, nvg * 2);
  root.child(1).child(2).move(5 * shift, nvg * 2);

  shift = shift * 3;
  root.child(0).move(-shift, nvg);
  root.child(1).move(shift, nvg);

  root.updateEdges(true);
  leafList = root.getLeafs();
  global.drawLeafArrows(av, leafList, arrowList);

  // Create find node
  var find = global.newNode(av, [""], false); // Array for insert values
  find.array.element.addClass('find-node');
  var canvas = $(find.array.element).parent();
  var w = $(canvas).innerWidth();
  var aw = $(find.array.element).outerWidth();
  var ah = $(find.array.element).outerHeight();
  find.move((w / 2) - aw, 5);
  var label = av.label("Find:"); // Label for insert values
  label.addClass('find-label');
  var lw = $(label.element).outerWidth();
  label.css({"left": (w - aw - lw - 15) + "px", "top": "10px"});

  find.value(0, 65);
  step(true, true);

  root.compare(av, 65);
  root.highlightToggle();
  root.highlightToggleEdge(1);
  step(true);

  root.highlightToggle();
  root.highlightToggleEdge(1);
  root.child(1).compare(av, 65);
  root.child(1).highlightToggle();
  root.child(1).highlightToggleEdge(1);
  step(true);

  root.child(1).highlightToggle();
  root.child(1).highlightToggleEdge(1);
  root.child(1).child(1).highlightToggle();
  find.highlightToggle();
  step();

  root.child(1).child(1).highlightToggle();
  find.value(0, 15);
  find.highlightToggle();
  step(true);

  root.compare(av, 15);
  root.highlightToggle();
  root.highlightToggleEdge(0);
  step(true);

  root.highlightToggle();
  root.highlightToggleEdge(0);
  root.child(0).compare(av, 15);
  root.child(0).highlightToggle();
  root.child(0).highlightToggleEdge(0);
  step(true);

  root.child(0).highlightToggle();
  root.child(0).highlightToggleEdge(0);
  root.child(0).child(0).highlightToggle();
  find.highlightToggle();
  step();

  av.recorded();
}());