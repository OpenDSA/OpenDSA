"use strict";

// Create the pagedBSTCON diagram
(function ($) {
  // Create JSAV object
  var jsav = new JSAV("pagedBSTCON", {"animationMode": "none"});

  // Create rectangles.
  // Set the starting x and y positions.
  var x_base = 10;
  var y_base = 30;
  // Add a store to the rectangles.
  var properties = {"stroke-width": 1};
  jsav.g.rect(x_base + 46, y_base - 5, 200, 65, 0, properties);   // Top rectangle.
  jsav.g.rect(x_base + 0, y_base + 70, 63, 65, 0, properties);    // First rectangle on second row.
  jsav.g.rect(x_base + 76, y_base + 70, 63, 65, 0, properties);   // Second rectangle on second row.
  jsav.g.rect(x_base + 152, y_base + 70, 63, 65, 0, properties);  // Third rectangle on second row.
  jsav.g.rect(x_base + 229, y_base + 70, 63, 65, 0, properties);  // Fourth rectangle on second row.

  // Recursive function to create a binary tree of height 4.
  function genNodes(root, level) {
    if (level > 2) {
      // Base case
      return;
    } else {
      // Create left and right child nodes.
      genNodes(root.left(""), level + 1);
      genNodes(root.right(""), level + 1);
    }
  }

  // Create binary tree object.
  var bst = jsav.ds.bintree({width: 500, height: 520, nodegap: 20, anchor: "left top"});
  // Set root node.
  bst.root("");
  // Generate child nodes.
  genNodes(bst.root(), 0);
  // Redraw binary tree to dislay newly created children nodes.
  bst.layout();
}(jQuery));
