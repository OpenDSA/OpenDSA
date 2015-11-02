/*global window */
(function () {
  "use strict";
  var av,             // The JSAV object
  bottom_layer = [],
  probability_threshold = 0.3;

  var treeIndexing = {
    diskAccesses: 0,      // The answer

    initJSAV: function() {
      av = new JSAV("TreeIndexing");
      var bst = av.ds.binarytree({nodegap: 10});

      // Create color array
      var colors = ["#7BFF95", "#77CCFF", "#FF6F52", "#FFDE70", "#E39BCF"];

      // Get color for right and level 1 nodes.
      var color_root = Math.floor((Math.random() * 100) % colors.length);
      var color_right = Math.floor((Math.random() * 100) % colors.length);
      var color_left = Math.floor((Math.random() * 100) % colors.length);

      // Create tree.
      bst.root("").css({"background-color": colors[color_root]});
      bst.root().right("").css({"background-color": colors[color_right]});
      bst.root().left("").css({"background-color": colors[color_left]});

      // Randomly generate three more levels of nodes.
      while (bottom_layer.length === 0) {
        generateBSTNodes(bst.root().left(), 2, 0, colors);
        generateBSTNodes(bst.root().right(), 2, 0, colors);
      }
      bst.layout();

      // Pick bottom layer node to be the chosen one at random.
      var chosen_index = Math.floor((Math.random() * 100) % bottom_layer.length);
      var chosen_node = bottom_layer[chosen_index];

      // Give the chosen node a grey glow to indicate that is has being selected.
      chosen_node.css({"box-shadow": "0 0 8px 6px rgba(0, 0, 0, 0.8)"});
      chosen_node.is_chosen = true;
      av.displayInit();
      av.recorded();

      // Find the number of accesses to get to the chosen one.
      getAnswer(bst.root(), 1);
    }
  };

  /**
   * Examines a colorized binary search tree and determines the number of disk
   * accesses necessary to reach the selected node.
   * @param root The root of the tree.
   * @param diskAccesses The current number of disk access to get to the given
   *        tree node 'root'.
   */
  function getAnswer(root, diskAcc) {
    if (root.is_chosen === true) {
      treeIndexing.diskAccesses = diskAcc;
    } else {
      // Explore left child.
      if (typeof(root.left()) !== "undefined" && root.left() !== null) {
        if (root.css("background-color") !==
            root.left().css("background-color")) {
          getAnswer(root.left(), diskAcc + 1);
        } else {
          getAnswer(root.left(), diskAcc);
        }
      }

      // Explore right child.
      if (typeof(root.right()) !== "undefined" && root.right() !== null) {
        if (root.css("background-color") !==
            root.right().css("background-color")) {
          getAnswer(root.right(), diskAcc + 1);
        } else {
          getAnswer(root.right(), diskAcc);
        }
      }
    }
  }


  /**
   * Generate a colorized binary search tree.
   * @param root The root of the tree.
   * @param max_level The level depth to stop at.
   * @param level The current level of depth.
   * @param colors Array of colors from which to select the background.
   */
  function generateBSTNodes(root, max_level, level, colors) {
    if (level <= max_level) {
      var color_index;
      // Determine if left node will be created.
      if (Math.random() > probability_threshold) {
        // Create new node.
        var new_left = root.left("");
        // Determine node background color.
        color_index = Math.floor((Math.random() * 100) % colors.length);
        new_left.css({"background-color": colors[color_index]});
        // Give node chosen property
        new_left.is_chosen = false;
        // Add node to bottom layer if level is last.
        if (level === max_level) {
          bottom_layer.push(new_left);
        }
        generateBSTNodes(new_left, max_level, level + 1, colors);
      }

      // Determine if right node will be created.
      if (Math.random() > probability_threshold) {
        // Determine if left node will be created.
        var new_right = root.right("");
        // Determine node background color.
        color_index = Math.floor((Math.random() * 100) % colors.length);
        new_right.css({"background-color": colors[color_index]});
        // Give node chosen property
        new_right.is_chosen = false;
        // Add node to bottom layer if level is last.
        if (level === max_level) {
          bottom_layer.push(new_right);
        }
        generateBSTNodes(new_right, max_level, level + 1, colors);
      }
    }
  }

  window.treeIndexing = window.treeIndexing || treeIndexing;
}());
