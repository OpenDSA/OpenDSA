/*global window */
(function() {
  "use strict";
  var treeprobs = {
    initJSAV: function() {
      var jsav = new JSAV("Treeprobs");
      jsav.recorded();
      var bt = jsav.ds.binarytree({
        center: true,
        visible: true,
        nodegap: 15
      });
      bt.root(14);
      var rt = bt.root();
      rt.left(2);
      rt.left().left(1);
      rt.left().right(3);
      rt.right(11);
      rt.right().left(10);
      rt.right().left().left(7);
      rt.right().right(30);
      rt.right().right().left(40);
      bt.layout();
    }
  };

  window.treeprobs = window.treeprobs || treeprobs;
}());
