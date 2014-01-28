"use strict";

(function ($) {
  var jsav = new JSAV("pagedBSTCON1", {"animationMode": "none"});

  var bst = jsav.ds.bintree({width: 500, height: 500, nodegap: 40, anchor: "left top"});

  bst.root("");
  genNodes(bst.root(), 0)

  function genNodes(root, level) {
    if (level > 2) {
      return;
    } else {

      genNodes(root.left(""), level + 1);
      genNodes(root.right(""), level + 1);
    }
  }

  bst.layout();

  var x_base = Math.floor(parseInt(bst.css("left")));
  var y_base = 45;
  jsav.g.rect(x_base + 70, y_base - 5, 520, 150, 30, {"stroke-width": 2});
  jsav.g.rect(x_base - 15 , y_base + 160, 160, 200, 30, {"stroke-width": 2});
  jsav.g.rect(x_base + 160, y_base + 160, 160, 200, 30, {"stroke-width": 2});
  jsav.g.rect(x_base + 335, y_base + 160, 160, 200, 30, {"stroke-width": 2});
  jsav.g.rect(x_base + 510, y_base + 160, 160, 200, 30, {"stroke-width": 2});

}(jQuery));

(function ($) {
  var jsav = new JSAV("balanceBSTCON2", {"animationMode": "none"});
  var bst = jsav.ds.bintree({anchor: "left top"});
  var bbst = jsav.ds.bintree({anchor: "right top"});

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
