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
    "The root node is a leaf node, and it is full. The root leaf node must be split.",
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
    "The lowest value in the new node gets promoted and the links to the leaf nodes get updated",
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
  ins.move((w / 2) - aw, 0);
  var label = av.label("Insert:"); // Label for insert values
  label.addClass('insert-label');
  var lw = $(label.element).outerWidth();
  label.css({"left": (w - aw - lw - 15) + "px", "top": "25px"});
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
  var rect;
  rect = global.drawRectangle(av, rect, n1, n2);
  step();

  // Slide 9
  av.effects.moveValue(n1.array, 0, n2.array, 0);
  av.effects.moveValue(n1.array, 1, n2.array, 1);
  av.effects.moveValue(ins.array, 0, n1.array, 0);
  step();

  // Slide 10
  leafList.push(n1);
  leafList.push(n2);
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 11
  n1.move(0, nvg);
  n2.move(0, nvg);
  rect.translateY(nvg);
  global.drawLeafArrows(av, leafList, arrowList);
  var n3 = global.newNode(av, ["", ""], false);
  n3.addChild(n1);
  n3.addChild(n2);
  n3.hideEdges();
  step();

  // Slide 12
  rect.hide();
  n3.value(0, 46);
  n3.showEdges();
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
  rect = global.drawRectangle(av, rect, n3.child(1), n4);
  step();

  // Slide 22
  av.effects.moveValue(n3.child(1).array, 1, n3.child(2).array, 0);
  av.effects.moveValue(ins.array, 0, n4.array, 1);
  step();

  // Slide 23
  leafList.push(n4);
  global.drawLeafArrows(av, leafList, arrowList);
  step();

  // Slide 24
  n3.value(1, 52);
  n3.showEdges();
  rect.hide();
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
  rect = global.drawRectangle(av, rect, n3.child(2), n5);
  step();

  // Slide 29
  av.effects.moveValue(n3.child(2).array, 1, n5.array, 1);
  av.effects.moveValue(ins.array, 0, n5.array, 0);
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
  var rect2;
  rect2 = global.drawRectangle(av, rect2, n3, n6);
  step();

  // Slide 34
  n6.value(0, 65);
  n3.value(1, "");
  step();

  // Slide 35
  var child = n3.removeChild(2);
  n6.addChild(child);
  n6.addChild(n5);
  n6.updateEdges();
  rect.hide();
  step();

  // Slide 36
  step();

  // Slide 37
  var n7 = global.newNode(av, ["", ""], false, ["", ""]);
  n3.child(0).move(0, nvg);
  n3.child(1).move(0, nvg);
  n6.child(0).move(0, nvg);
  n6.child(1).move(0, nvg);
  rect2.translateY(nvg);
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
  n7.value(0, 52);
  n7.highlightToggle();
  step();

  // Slide 40
  n7.addChild(n3);
  n7.addChild(n6);
  n7.updateEdges();
  rect2.hide();
  step();

  av.recorded();
}());

(function () {
  var global = window.ttplustree;
  var av = new JSAV("find");
  var leafList = [];
  var arrowList = [];

  var msg = [
    "Find <b>65</b>",
    "<b>65</b> is greater-than or equal to 52. The center child is followed.<br><b>65</b> &lt; 52",
    "<b>65</b> is greater-than or equal to 65 and less than 71. The center child is followed.<br>65 &lt;= <b>65</b> &lt; 71",
    "We have found the correct leaf node",
    "Find <b>15</b>",
    "<b>15</b> is less than 53. The left child is followed.<br><b>15</b> &lt; 52",
    "<b>15</b> is less than 22. The left child is followed.<br><b>15</b> &lt; 22",
    "We have found the correct leaf node",
    "Find <b>47</b>",
    "<b>47</b> is less than 52. The left child is followed.<br>47 &lt; 52",
    "<b>47</b> is greated-than or equal to 46. The right child is followed.<br>46 &lt; <b>47</b>",
    "We have found the correct leaf node"
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

  // Position tree nodes.
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

  // Draw node edges
  root.updateEdges(true);
  leafList = root.getLeafs();
  global.drawLeafArrows(av, leafList, arrowList);

  // Create "find" node and label
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
  label.css({"left": (w - aw - lw - 5) + "px", "top": "25px"});

  // Slide 1
  find.value(0, 65);
  step(false, true);

  // Slide 2
  root.highlightToggle();
  root.highlightToggleEdge(1);
  step();

  // Slide 3
  root.highlightToggle();
  root.highlightToggleEdge(1);
  root.child(1).highlightToggle();
  root.child(1).highlightToggleEdge(1);
  step();

  // Slide 4
  root.child(1).highlightToggle();
  root.child(1).highlightToggleEdge(1);
  root.child(1).child(1).highlightToggle();
  find.highlightToggle();
  step();

  // Slide 5
  root.child(1).child(1).highlightToggle();
  find.value(0, 15);
  find.highlightToggle();
  step();

  // Slide 6
  root.highlightToggle();
  root.highlightToggleEdge(0);
  step();

  // Slide 7
  root.highlightToggle();
  root.highlightToggleEdge(0);
  root.child(0).highlightToggle();
  root.child(0).highlightToggleEdge(0);
  step();

  // Slide 8
  root.child(0).highlightToggle();
  root.child(0).highlightToggleEdge(0);
  root.child(0).child(0).highlightToggle();
  find.highlightToggle();
  step();

  // slide 9
  root.child(0).child(0).highlightToggle();
  find.highlightToggle();
  find.value(0, 47);
  step();

  // Slide 10
  root.highlightToggle();
  root.highlightToggleEdge(0);
  step();

  // Slide 11
  root.highlightToggle();
  root.highlightToggleEdge(0);
  root.child(0).highlightToggle();
  root.child(0).highlightToggleEdge(2);
  step();

  // Slide 12
  root.child(0).highlightToggle();
  root.child(0).highlightToggleEdge(2);
  root.child(0).child(2).highlightToggle();
  find.highlightToggle();
  step();

  av.recorded();
}());
