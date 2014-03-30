(function () {
  "use strict";

  function generateBSTNodes(root, max_level, level, colors) {
    if (level <= max_level) {
      var color_index;
      // Determine if left node will be created.
      if (Math.random() > window.ODSA.probability_threshold) {
        // Create new node.
        var new_left = root.left("");
        // Determine node background color.
        color_index = Math.floor((Math.random() * 100) % colors.length);
        new_left.css({"background-color": colors[color_index]});
        // Give node chosen property
        new_left.is_chosen = false;
        // Add node to bottom layer if level is last.
        if (level === max_level) {
          window.ODSA.bottom_layer.push(new_left);
        }
        generateBSTNodes(new_left, max_level, level + 1, colors);
      }

      // Determine if right node will be created.
      if (Math.random() > window.ODSA.probability_threshold) {
        // Determine if left node will be created.
        var new_right = root.right("");
        // Determine node background color.
        color_index = Math.floor((Math.random() * 100) % colors.length);
        new_right.css({"background-color": colors[color_index]});
        // Give node chosen property
        new_right.is_chosen = false;
        // Add node to bottom layer if level is last.
        if (level === max_level) {
          window.ODSA.bottom_layer.push(new_right);
        }
        generateBSTNodes(new_right, max_level, level + 1, colors);
      }
    } else {
      return null;
    }
  }

  function getAnswer(root, disk_accesses) {
    if (root.is_chosen === true) {
      window.ODSA.disk_accesses = disk_accesses;
    } else {
      // Explore left child.
      if (typeof(root.left()) !== "undefined" && root.left() !== null) {
        if (root.css("background-color") !== root.left().css("background-color")) {
          getAnswer(root.left(), disk_accesses + 1);
        } else {
          getAnswer(root.left(), disk_accesses);
        }
      }

      // Explore right child.
      if (typeof(root.right()) !== "undefined" && root.right() !== null) {
        if (root.css("background-color") !== root.right().css("background-color")) {
          getAnswer(root.right(), disk_accesses + 1);
        } else {
          getAnswer(root.right(), disk_accesses);
        }
      }
    }
  }

  var ODSA = {};
  ODSA.generateBSTNodes = generateBSTNodes;
  ODSA.getAnswer = getAnswer;
  ODSA.bottom_layer = [];
  ODSA.disk_accesses = 0;
  ODSA.probability_threshold = 0.3;
  window.ODSA = ODSA;
}());

/**
 * Creates a diagram to demonstrate how a binary search tree might be laid out on disk.
 *
 * Container ID: pagedBSTCON
 */
//(function () {
//  "use strict";
//  // Create JSAV object
//  var jsav = new JSAV("pagedBSTCON", {"animationMode": "none"});
//
//  // Create rectangles.
//  // Set the starting x and y positions.
//  var x_offset = 6;
//  var y_offset = 10;
//  // Add a store to the rectangles.
//  var properties = {"stroke-width": 1};
//  jsav.g.rect(x_offset + 46, y_offset - 5, 200, 65, 0, properties);   // Top rectangle.
//  jsav.g.rect(x_offset + 0, y_offset + 70, 63, 65, 0, properties);    // First rectangle on second row.
//  jsav.g.rect(x_offset + 76, y_offset + 70, 63, 65, 0, properties);   // Second rectangle on second row.
//  jsav.g.rect(x_offset + 152, y_offset + 70, 63, 65, 0, properties);  // Third rectangle on second row.
//  jsav.g.rect(x_offset + 229, y_offset + 70, 63, 65, 0, properties);  // Fourth rectangle on second row.
//
//  // Recursive function to create a binary tree of height 4.
//  function genNodes(root, level) {
//    if (level <= 2) {
//      // Create left and right child nodes.
//      genNodes(root.left(""), level + 1);
//      genNodes(root.right(""), level + 1);
//    }
//  }
//
//  // Create binary tree object.
//  var bst = jsav.ds.bintree({width: 500, height: 520, nodegap: 20, anchor: "left top"});
//  // Set root node.
//  bst.root("");
//  // Generate child nodes.
//  genNodes(bst.root(), 0);
//  // Redraw binary tree to display newly created children nodes.
//  bst.layout();
//}());

(function () {
  "use strict";
  var jsav = new JSAV("pagedBSTCON");
  var n = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  var bst = jsav.ds.bintree({nodegap: 20});
  var nodes = [
    bst.root(n[0]),
  ];

//  nodes.push(nodes[0].left(n[1]));
//  nodes.push(nodes[0].right(n[2]));
//  nodes.push(nodes[1].left(n[3]));
//  nodes.push(nodes[1].right(n[4]));
//  nodes.push(nodes[2].left(n[5]));
//  nodes.push(nodes[2].right(n[6]));
//  nodes.push(nodes[3].left(n[7]));
//  nodes.push(nodes[3].right(n[8]));
//  nodes.push(nodes[4].left(n[9]));
//  nodes.push(nodes[4].right(n[10]));
//  nodes.push(nodes[5].left(n[11]));
//  nodes.push(nodes[5].right(n[12]));
//  nodes.push(nodes[6].left(n[13]));
//  nodes.push(nodes[6].right(n[14]));
  bst.layout();

  var recs = [];

  // Create rectangles
  var x = 20, y = 300, w = 120, h = 50, p = {"stroke-width": 2, "fill": "#FFFFFF"}, num = 5;
  for (var i = 0; i < num; i++) {
    recs.push(jsav.g.rect(x, y, w, h, p));
    x += w;
  }

  // Create labels
  var t = 310, l = 25, v = false, offset = 50;
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
    if (flag) {
      nodes.push(nodes[node].left(n[i]));
      flag = false;
    } else {
      nodes.push(nodes[node].right(n[i]));
      flag = true;
      node++;
    }
    bst.layout();
    labels[i].show();
    jsav.step();
  }

  jsav.recorded();
}());

/**
 * Creates a diagram to demonstrate the changes made to a binary search tree when it is balanced.
 *
 * Container ID: balanceBSTCON
 */
(function () {
  "use strict";
  // Initialize JSAV object.
  var jsav = new JSAV("balanceBSTCON", {"animationMode": "none"});
  // Initialize BST and the balanced BST object.
  var bst = jsav.ds.bintree({left: "10px", nodegap: 20});
  var bbst = jsav.ds.bintree({left: "220px", nodegap: 20});
  // Add labels
  jsav.label("(a)", {visible: true, left: "75px", top: "110px"});
  jsav.label("(b)", {visible: true, left: "285px", top: "110px"});

  // Add nodes for the BST.
  bst.root("5");

  bst.root().left("3");
  bst.root().left().left("2");
  bst.root().left().right("4");

  bst.root().right("7");
  bst.root().right().left("6");

  // Add nodes for the balanced BST
  bbst.root("4");

  bbst.root().left("2");
  bbst.root().left().left("1");
  bbst.root().left().right("3");

  bbst.root().right("6");
  bbst.root().right().left("5");
  bbst.root().right().right("7");

  // Redraw the two trees to display the newly created children nodes.
  bst.layout();
  bbst.layout();

}());

/**
 * Demo: Randomized creation of a colorized binary search tree.
 *
 * Container ID: colorizedCON
 */
(function () {
  "use strict";

  var jsav = new JSAV("colorizedBST");

  var bst = jsav.ds.bintree({nodegap: 15});

  // Create color array
  var colors = ["#7BFF95", "#77CCFF", "#FF6F52", "#FFDE70", "#E39BCF"];

  // Create disk rectangles.
  var width = 100;
  var height = 50;
  var x = 50;
  var y = 210;
  for (var i = 0; i < colors.length; i++) {
    jsav.g.rect(x, y, width, height, {"fill": colors[i]});
    x += width;
  }

  // Get color for right and level 1 nodes.
  var color_root = Math.floor((Math.random() * 100) % colors.length);
  var color_right = Math.floor((Math.random() * 100) % colors.length);
  var color_left = Math.floor((Math.random() * 100) % colors.length);

  // Create tree.
  bst.root("").css({"background-color": colors[color_root]});
  bst.root().right("").css({"background-color": colors[color_right]});
  bst.root().left("").css({"background-color": colors[color_left]});

  // Randomly generate three more levels of nodes.
  while (window.ODSA.bottom_layer.length === 0) {
    window.ODSA.generateBSTNodes(bst.root().left(), 2, 0, colors);
    window.ODSA.generateBSTNodes(bst.root().right(), 2, 0, colors);
  }
  bst.layout();

  // Pick bottom layer node to be chosen one.
  var chosen_index = Math.floor((Math.random() * 100) % window.ODSA.bottom_layer.length);
  var chosen_node = window.ODSA.bottom_layer[chosen_index];
  chosen_node.css({"border": "1px solid white"});
  chosen_node.css({"box-shadow": "0 0 10px 5px black"});
  chosen_node.is_chosen = true;

  // Find the number of accesses to get to chosen one.
  window.ODSA.getAnswer(bst.root(), 1);
  jsav.label("Number of disk accesses: " + window.ODSA.disk_accesses, {top: "280px", left: "220px"});

}());

