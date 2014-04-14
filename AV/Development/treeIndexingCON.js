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

  function toggleNodeHighlight(node) {
    if (node.css(node_highlight_property) === node_highlight_default) {
      node.css(node_highlight_add);
    } else {
      node.css(node_highlight_remove);
    }
  }

  function setNodeHighlightDefault(node) {
    node_highlight_default = node.css(node_highlight_property);
    node_highlight_remove["box-shadow"] = node_highlight_default;
  }

  var node_highlight_property = "box-shadow";
  var node_highlight_default;
  var node_highlight_add = {"box-shadow": "0 0 15px 5px #2B92FF"};
  var node_highlight_remove = {"box-shadow": "node"};

  var ODSA = {};
  ODSA.generateBSTNodes = generateBSTNodes;
  ODSA.getAnswer = getAnswer;
  ODSA.bottom_layer = [];
  ODSA.disk_accesses = 0;
  ODSA.probability_threshold = 0.3;
  ODSA.toggleNodeHighlight = toggleNodeHighlight;
  ODSA.setNodeHighlightDefault = setNodeHighlightDefault;
  window.ODSA = ODSA;
}());

/**
 * Creates a diagram to demonstrate how a binary search tree might be laid out on disk.
 *
 * Container ID: pagedBSTCON
 */
(function () {
  "use strict";
  var jsav = new JSAV("pagedBSTCON");

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
  var t = 310, l = 30, v = false;
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
}());

(function () {
  "use strict";
  var jsav = new JSAV("pagedBSTCON_2");

  var n = [10, 5, 15, 3, 8, 13, 18, 2, 4, 7, 9, 12, 14, 17, 19];  // Tree node values.
  var colors = ["#7BFF95", "#77CCFF", "#FF6F52", "#FFDE70", "#E39BCF"]; // Tree node colors.

  // Create bst
  var bst = jsav.ds.binarytree({nodegap: 40});
  var nodes = [bst.root(n[0])]; // Node array
  nodes[0].css({"background-color": colors[0]});  // Color root node.

  // Create tree
  var node = 0, flag = true, i;
  for (i = 1; i < n.length; i++) {
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
  }

  bst.layout();

  // Create rectangles
  var recs = [];
  var x = 20, y = 300, w = 120, h = 50, num = 5;
  for (i = 0; i < num; i++) {
    recs.push(jsav.g.rect(x, y, w, h, {"stroke-width": 2, "fill": colors[i]}));
    x += w;
  }

  // Create labels
  var t = 310, l = 30, v = true;
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
    "This is the same tree as the previous slide show. Lets try to find the key 9.",
    "First we look at the root. First disk access",
    "Since 10 is more than 9 we follow the left child.",
    "Since 5 if less than 9 we follow the right child. Second disk access",
    "Since 8 is less than 9 we follow the right child. Third disk access",
    "We found the node.",
    "This search could be made more efficient if we rearranged the layout of node on disk.",
    "This is one possible layout.",
    "Lets find the key 9 again.",
    "This time it only takes 2 disk accesses.",
    "The proble with this layout is that it is difficult to maintain."
  ];

  jsav.label("Disk Accesses:", {visible: true, left: "0px", top: "16px"});
  var da_array = jsav.ds.array([0], {left: "135px", top: "0px"});
  da_array.css({height: "30px", width: "30px"});

  jsav.umsg(messages.shift());
  window.ODSA.setNodeHighlightDefault(nodes[0]);
  jsav.displayInit();

  jsav.umsg(messages.shift());
  jsav.step();

  jsav.umsg(messages.shift());
  window.ODSA.toggleNodeHighlight(nodes[0]);
  da_array.value(0, 1);
  jsav.step();

  jsav.umsg(messages.shift());
  window.ODSA.toggleNodeHighlight(nodes[0]);
  window.ODSA.toggleNodeHighlight(nodes[1]);
  jsav.step();

  jsav.umsg(messages.shift());
  window.ODSA.toggleNodeHighlight(nodes[1]);
  window.ODSA.toggleNodeHighlight(nodes[4]);
  da_array.value(0, 2);
  jsav.step();

  jsav.umsg(messages.shift());
  window.ODSA.toggleNodeHighlight(nodes[4]);
  window.ODSA.toggleNodeHighlight(nodes[10]);
  da_array.value(0, 3);
  jsav.step();

  jsav.umsg(messages.shift());
  window.ODSA.toggleNodeHighlight(nodes[10]);
  da_array.value(0, "");
  jsav.step();

  jsav.umsg(messages.shift());
  for (i = 0; i < n.length; i++) {
    if (i < 3) {
      nodes[i].css({"background-color": colors[0]});
    } else if (i < 7) {
      nodes[i].css({"background-color": colors[i - 2]});
    } else if (i < 9) {
      nodes[i].css({"background-color": colors[1]});
    } else if (i < 11) {
      nodes[i].css({"background-color": colors[2]});
    } else if (i < 13) {
      nodes[i].css({"background-color": colors[3]});
    }
  }
  labels[0].text(n[0]);
  labels[1].text(n[1]);
  labels[2].text(n[2]);
  labels[3].text(n[3]);
  labels[4].text(n[7]);
  labels[5].text(n[8]);
  labels[6].text(n[4]);
  labels[7].text(n[9]);
  labels[8].text(n[10]);
  labels[9].text(n[5]);
  labels[10].text(n[11]);
  labels[11].text(n[12]);
  jsav.step();

  jsav.umsg(messages.shift());
  jsav.step();

  jsav.umsg(messages.shift());
  window.ODSA.toggleNodeHighlight(nodes[0]);
  window.ODSA.toggleNodeHighlight(nodes[1]);
  window.ODSA.toggleNodeHighlight(nodes[4]);
  window.ODSA.toggleNodeHighlight(nodes[10]);
  da_array.value(0, 2);
  jsav.step();

  jsav.umsg(messages.shift());
  window.ODSA.toggleNodeHighlight(nodes[0]);
  window.ODSA.toggleNodeHighlight(nodes[1]);
  window.ODSA.toggleNodeHighlight(nodes[4]);
  window.ODSA.toggleNodeHighlight(nodes[10]);
  da_array.value(0, "");
  jsav.step();

  jsav.step();

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
  var bst = jsav.ds.binarytree({left: "10px", nodegap: 20});
  var bbst = jsav.ds.binarytree({left: "220px", nodegap: 20});
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

  var bst = jsav.ds.binarytree({nodegap: 15});

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
  chosen_node.css({"box-shadow": "0 0 10px 3px black"});
  chosen_node.is_chosen = true;

  // Find the number of accesses to get to chosen one.
  window.ODSA.getAnswer(bst.root(), 1);
  jsav.label("Number of disk accesses: " + window.ODSA.disk_accesses, {top: "280px", left: "220px"});

}());

