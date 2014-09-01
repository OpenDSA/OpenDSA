
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
    var tree = new jsav.ds.arraytree();

    var n1 = tree.root([1, 1, 1]);

    var n2 = n1.addChild([2,2,2]).child(0);
    var n3 = n1.addChild([3,3,3,3]).child(1);
    var n4 = n1.addChild([4,4,4]).child(2);
    var n5 = n1.addChild([5,5,5]).child(3);

    var n6 = n2.addChild([6,6,6]).child(0);
    var n7 = n2.addChild([7,7,7]).child(1);
    var n8 = n2.addChild([8,8,8]).child(2);
    var n9 = n2.addChild([9,9,9]).child(3);

    n6.value([6, 5, 4]);

    n6.value([6, 5, 4, 3]);

    n6.edgeToParent().addClass("superclass");

    tree.layout();
  }

  function createOther() {
    var jsav = new JSAV("other");
    var arr = new jsav.ds.array([1, 2, 3, 4], {element: $('#hello')});
  }
}(jQuery));
