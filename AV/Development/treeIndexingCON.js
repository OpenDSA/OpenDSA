// Create the pagedBSTCON diagram
(function ($) {
  "use strict";
  // Create JSAV object
  var jsav = new JSAV("pagedBSTCON", {"animationMode": "none"});

  // Create rectangles.
  // Set the starting x and y positions.
  var x_base = 6;
  var y_base = 10;
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

// Create the balanceBSTCON diagram.
(function ($) {
  "use strict";
  // Intialize JSAV object.
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

}(jQuery));

