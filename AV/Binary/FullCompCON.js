$(document).ready(function () {
  "use strict";
  var av = new JSAV("FullCompCON", {"animationMode": "none"});
  // Setup first row of trees
  var btTop = 0;
  var btLeft = 225;
  var btRight = 425;
  var bt = av.ds.binarytree({nodegap: 25, left: btLeft, top: btTop});
  bt.root('');
  var rt = bt.root();
  rt.left('');
  rt.left().left('');
  rt.left().right('');
  rt.left().right().left('');
  rt.left().right().right('');
  rt.right('');

  var bt2 = av.ds.binarytree({nodegap: 25, left: btRight, top: btTop});
  var rt2 = bt2.root('');
  rt2.left('');
  rt2.left().left('');
  rt2.left().right('');
  rt2.left().left().left('');
  rt2.left().left().right('');
  rt2.left().right().left('');
  rt2.left().right().right('');
  rt2.right('');
  rt2.right().right('');
  rt2.right().left('');
  rt2.right().left().left('');

  bt.layout();
  bt2.layout();

  // Add first row of labels
  var alabel = av.label("(a)", {left: btLeft + 35, top: btTop + 135});
  var blabel = av.label("(b)", {left: btRight + 115, top: btTop + 135});
});
