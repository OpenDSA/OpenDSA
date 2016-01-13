$(document).ready(function () {
  "use strict";
  var av = new JSAV("BinDiffCON", {"animationMode": "none"});
  // Setup first row of trees
  var btTop = 0;
  var btLeft = 250;
  var btRight = 455;
  var bt = av.ds.binarytree({nodegap: 30, top: btTop, left: btLeft});
  bt.root('A');
  var rt = bt.root();
  rt.left('B');

  var bt2 = av.ds.binarytree({nodegap: 30, top: btTop, left: btRight});
  bt2.root('A');
  bt2.root().right('B');

  bt.layout();
  bt2.layout();

  // Add first row of labels
  var alabel = av.label("(a)", {left: btLeft + 40, top: btTop + 105});
  var blabel = av.label("(b)", {left: btRight + 35, top: btTop + 105});

  // Setup second row of trees
  btTop = 155;
  var bt3 = av.ds.binarytree({nodegap: 30, left: btLeft, top: btTop});
  bt3.root('A');
  bt3.root().left('B');
  bt3.root().right('');
  bt3.root().right('EMPTY').addClass("clearnode");
  var bt4 = av.ds.binarytree({nodegap: 30, left: btRight, top: btTop});
  bt4.root('A');
  bt4.root().left('EMPTY').addClass("clearnode");
  bt4.root().right('B');
  bt3.layout();
  bt4.layout();

  // Add second row of labels
  var clabel = av.label("(c)", {left: btLeft + 40, top: btTop + 105}).show;
  var dlabel = av.label("(d)", {left: btRight + 35, top: btTop + 105}).show;

});
