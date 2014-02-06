"use strict";

// Create the balanceBSTCON diagram.
(function ($) {
  // Intialize JSAV object.
  var jsav = new JSAV("balanceBSTCON", {"animationMode": "none"});
  // Initialize BST and the balanced BST object.
  var bst = jsav.ds.bintree({left: "10px", nodegap: 20});
  var bbst = jsav.ds.bintree({left: "220px", nodegap: 20});
  // Add labels
  jsav.label("(a)", {visible: true, left: "95px", top: "100px"});
  jsav.label("(b)", {visible: true, left: "295px", top: "100px"});

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
