/**
 * Creates a diagram to demonstrate how a binary search tree might be laid out on disk.
 *
 * Container ID: pagedBSTCON
 */
/*global ODSA */
$(document).ready(function () {
  "use strict";
  var av_name = "pagedBSTCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;

  var jsav = new JSAV(av_name);

  var n = [10, 5, 15, 3, 8, 13, 18, 2, 4, 7, 9, 12, 14, 17, 19];
  var colors = ["#7BFF95", "#77CCFF", "#FF6F52", "#FFDE70", "#E39BCF"];

  var bst = jsav.ds.binarytree({nodegap: 30});
  var nodes = [
    bst.root(n[0])
  ];
  nodes[0].css({"background-color": colors[0]});

  bst.layout();

  var recs = [];

  // Create rectangles
  var x = 20, y = 300, w = 120, h = 50, num = 5;
  for (var i = 0; i < num; i++) {
    recs.push(jsav.g.rect(x, y, w, h, {"stroke-width": 2, "fill": colors[i]}));
    x += w;
  }

  // Create labels
  var t = 295, l = 30, v = false;
  var labels = [
    jsav.label(n[0], {visible: v, left: (l + 0) + "px", top: (t + 0) + "px"}),
    jsav.label(n[1], {visible: v, left: (l + 40) + "px", top: (t + 0) + "px"}),
    jsav.label(n[2], {visible: v, left: (l + 80) + "px", top: (t + 0) + "px"}),
    jsav.label(n[3], {visible: v, left: (l + 120) + "px", top: (t + 0) + "px"}),
    jsav.label(n[4], {visible: v, left: (l + 160) + "px", top: (t + 0) + "px"}),
    jsav.label(n[5], {visible: v, left: (l + 200) + "px", top: (t + 0) + "px"}),
    jsav.label(n[6], {visible: v, left: (l + 240) + "px", top: (t + 0) + "px"}),
    jsav.label(n[7], {visible: v, left: (l + 280) + "px", top: (t + 0) + "px"}),
    jsav.label(n[8], {visible: v, left: (l + 320) + "px", top: (t + 0) + "px"}),
    jsav.label(n[9], {visible: v, left: (l + 360) + "px", top: (t + 0) + "px"}),
    jsav.label(n[10], {visible: v, left: (l + 400) + "px", top: (t + 0) + "px"}),
    jsav.label(n[11], {visible: v, left: (l + 440) + "px", top: (t + 0) + "px"}),
    jsav.label(n[12], {visible: v, left: (l + 480) + "px", top: (t + 0) + "px"}),
    jsav.label(n[13], {visible: v, left: (l + 520) + "px", top: (t + 0) + "px"}),
    jsav.label(n[14], {visible: v, left: (l + 560) + "px", top: (t + 0) + "px"})
  ];

  var messages = [
    "Paged BST demo. The bottom square represents blocks on disk.",
      "Insert " + n[0] + " into BST."
  ];
  jsav.umsg(messages.shift());
  nodes[0].hide();
  jsav.displayInit();

  jsav.umsg(messages.shift());
  nodes[0].show();
  labels[0].show();
  jsav.step();

  var node = 0, flag = true;
  for (i = 1; i < n.length; i++) {
    jsav.umsg("Insert " + n[i] + " into the tree.");
    var new_node;
    if (flag) {
      new_node = nodes[node].left(n[i]);
      new_node.css({"background-color": colors[Math.floor(i / 3)]});
      nodes.push(new_node);
      flag = false;
    } else {
      new_node = nodes[node].right(n[i]);
      new_node.css({"background-color": colors[Math.floor(i / 3)]});
      nodes.push(new_node);
      flag = true;
      node++;
    }
    bst.layout();
    labels[i].show();
    jsav.step();
  }

  jsav.recorded();
});
