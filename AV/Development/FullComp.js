/*global ODSA */
"use strict";
$(document).ready(function () {
  var av = new JSAV("FullComp", {"animationMode": "none"});
  // Setup first row of trees
  var btTop = 10;
  var btLeft = 150;
  var btRight = 375;
  var bt = av.ds.binarytree({nodegap: 25, top: btTop, left: btLeft});
  bt.root('');
  var rt = bt.root().addClass("blacknode");
  rt.left('').addClass("blacknode");
  rt.left().left('').addClass("blacknode");
  rt.left().right('').addClass("blacknode");
  rt.left().right().left('').addClass("blacknode");
  rt.left().right().right('').addClass("blacknode");
  rt.right('').addClass("blacknode");

  var bt2 = av.ds.binarytree({nodegap: 25, top: btTop, left: btRight});
  var rt2 = bt2.root('').addClass("blacknode");
  rt2.left('').addClass("blacknode");
  rt2.left().left('').addClass("blacknode");
  rt2.left().right('').addClass("blacknode");
  rt2.left().left().left('').addClass("blacknode");
  rt2.left().left().right('').addClass("blacknode");
  rt2.left().right().left('').addClass("blacknode");
  rt2.left().right().right('').addClass("blacknode");
  rt2.right('').addClass("blacknode");
  rt2.right().right('').addClass("blacknode");
  rt2.right().left('').addClass("blacknode");
  rt2.right().left().left('').addClass("blacknode");

  bt.layout();
  bt2.layout();

  // Add first row of labels
  var alabel = av.label("(a)", {left: btLeft + 60, top: 250}).show;
  var blabel = av.label("(b)", {left: btRight + 190, top: 250}).show;
});
