"use strict";

(function ($) {
  var jsav = new JSAV("pagedBSTCON1", {"animationMode": "none"});

  var x_base = 10;
  var y_base = 30;
  var properties = {"stroke-width": 1};
  jsav.g.rect(x_base + 50, y_base - 5, 200, 65, 0, properties);
  jsav.g.rect(x_base + 0, y_base + 70, 63, 65, 0, properties);
  jsav.g.rect(x_base + 76, y_base + 70, 63, 65, 0, properties);
  jsav.g.rect(x_base + 152, y_base + 70, 63, 65, 0, properties);
  jsav.g.rect(x_base + 229, y_base + 70, 63, 65, 0, properties);

  function genNodes(root, level) {
    if (level > 2) {
      return;
    } else {

      genNodes(root.left(""), level + 1);
      genNodes(root.right(""), level + 1);
    }
  }

  var bst = jsav.ds.bintree({width: 500, height: 500, nodegap: 20, anchor: "left top"});
  bst.css("padding-bottom", "20px");
  bst.css("padding-right", "20px");

  bst.root("");
  genNodes(bst.root(), 0);

  bst.layout();
}(jQuery));

(function ($) {
  // Intialize JSAV object.
  var jsav = new JSAV("balanceBSTCON2", {"animationMode": "none"});
  // Initialize BST and the balanced BST object.
  var bst = jsav.ds.bintree({left: "0%", nodegap: 20});
  var bbst = jsav.ds.bintree({left: "50%", nodegap: 20});

  bst.root("5");

  bst.root().left("3");
  bst.root().left().left("2");
  bst.root().left().right("4");

  bst.root().right("7");
  bst.root().right().left("6");

  bbst.root("4");

  bbst.root().left("2");
  bbst.root().left().left("1");
  bbst.root().left().right("3");

  bbst.root().right("6");
  bbst.root().right().left("5");
  bbst.root().right().right("7");

  bst.layout();
  bbst.layout();

}(jQuery));
