
(function ($) {
  $(document).ready(init);

  // Tree array testing function
  function init($) {
    createArrayTree();
//    createOther();
  }

  function createArrayTree() {
    var jsav = new JSAV("arrayTree");
    var tree = new jsav.ds.arraytree();
    tree.root([1, 2, 3]);

    tree.root().addChild([4, 5, 6]);
    tree.root().addChild([7, 8, 9]);
    tree.root().addChild([10, 11, 12]);
    tree.root().addChild([13, 14, 15]);

    tree.layout();
  }

  function createOther() {
    var jsav = new JSAV("other");
    var arr = new jsav.ds.array([1, 2, 3, 4], {element: $('#hello')});
  }
}(jQuery));

