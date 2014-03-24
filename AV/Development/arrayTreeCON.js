// Tree array testing function
(function ($) {
  console.log("start array tree");
  var jsav = new JSAV("arrayTree");
  var tree = new jsav.ds.arraytree();

  tree.root([10, 1, 5]);
  tree.layout();
  console.log("end array tree");

}(jQuery));