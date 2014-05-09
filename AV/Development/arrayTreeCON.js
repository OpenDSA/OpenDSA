
(function ($) {
  $(document).ready(init);

  // Tree array testing function
  function init($) {
//    createArray();
    createArrayTree();
  }

  function createArray() {
    var jsav = new JSAV("array");

//    var arr = new jsav.ds.array([1, 2, 3], {"element": $("#holder")});

    jsav.g.line(0, 0, 100, 100);

    var line = jsav.g.line(0, 0, 100, 100);
    line.translatePoint(0, 70, 20);
  }

  function createArrayTree() {
    var jsav = new JSAV("arrayTree");
    var tree = new jsav.ds.arraytree(jsav, {visible: true});
    var node = tree.newNode([1, 2, 3], null, 0);
    tree.newNode([4, 5, 6, 7, 8], node, 0);
  }
}(jQuery));

