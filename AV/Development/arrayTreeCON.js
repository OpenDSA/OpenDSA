
(function ($) {
  "use strict";
  $(document).ready(init);

  // Tree array testing function
  function init($) {
    createArrayTree();
//    createOther();
  }

  function createArrayTree() {
    var jsav = new JSAV("arrayTree");
    var tree = new jsav.ds.arraytree(3);

    tree.root([1, 1, 1]);

    var child1 = tree.root().addChild([2, 2, 2]);
    var child2 = tree.root().addChild([3, 3, 3]);
    var child3 = tree.root().addChild([4, 4, 4]);
    var child4 = tree.root().addChild([5, 5, 5]);

    tree.layout();
  }

  function createOther() {
    var jsav = new JSAV("other");
    var arr = new jsav.ds.array([1, 2, 3, 4], {element: $('#hello')});
  }
}(jQuery));
