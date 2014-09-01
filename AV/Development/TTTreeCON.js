// Array tree diagram
(function() {
  var jsav = new JSAV("TTTreeDgm");
  var at = jsav.ds.arraytree(); // Create Array Tree

  // Create root node and all child nodes.
  var r = at.root([18, 31]);
  r.addChild([12, ""]);
  r.addChild([23, 30]);
  r.addChild([48, ""]);

  r.child(0).addChild([10, ""]);
  r.child(0).addChild([15, ""]);

  r.child(1).addChild([20, 21]);
  r.child(1).addChild([24, ""]);
  r.child(1).addChild([31, ""]);

  r.child(2).addChild([45, 47]);
  r.child(2).addChild([50, 52]);

  at.layout(); // Layout array tree.
}());

// Array tree simple insert slide show
(function() {
  var jsav = new JSAV("TTTreeSimpleInsert");
  var at = jsav.ds.arraytree(); // Create Array Tree

  // Create root node and all child nodes.
  var r = at.root([18, 31]);
  r.addChild([12, ""]);
  r.addChild([23, 30]);
  r.addChild([48, ""]);
  r.child(0).addChild([10, ""]);
  r.child(0).addChild([15, ""]);
  r.child(1).addChild([20, 21]);
  r.child(1).addChild([24, ""]);
  r.child(1).addChild([31, ""]);
  r.child(2).addChild([45, 47]);
  r.child(2).addChild([50, 52]);
  at.layout(); // Layout array tree.

  // Messages for slideshow
  var msg = [
    "Simple insert into 2-3 tree. We want to insert the key 14 into the tree.",
    "The value is first compared against the root node. Since 14 is less than the left value of the root node, the left child node is followed next.",
    "This node has only one element, and 14 is greater than 12 so the center child is followed next.",
    "A leaf node has being reached. Since the leaf node has an empty space the new node can be inserted here. The key 15 has to be shifted to the right to make room for the new key (14).",
    "Now the key 14 can be inserted into the tree.",
    "The insertion is complete."
  ];

  function step() {
    jsav.umsg(msg.shift());
    jsav.step();
  }

  // Slide 1
  jsav.umsg(msg.shift());
  jsav.displayInit(); // Start slideshow

  // Slide 2
  r.highlight(0);
  r.highlightEdgeToChild(0);
  step();

  // Slide 3
  r.unhighlight(0);
  r.unhighlightEdgeToChild(0);
  r.child(0).highlight(0);
  r.child(0).highlightEdgeToChild(1);
  step();

  // Slide 4
  r.child(0).unhighlight(0);
  r.child(0).unhighlightEdgeToChild(1);
  r.child(0).child(1).highlight();
  step();

  // Slide 5
  r.child(0).child(1).swap(0, 1, {arrow: false});
  step();

  // Slide 6
  r.child(0).child(1).value(0, 14);
  step();

  jsav.recorded(); // End slideshow
}());

// Array tree promote insert slide show
(function() {
  var jsav = new JSAV("TTTreePromoteInsert");
  var at = jsav.ds.arraytree(); // Create Array Tree

  // Create root node and all child nodes.
  var r = at.root([18, 31]);
  r.addChild([12, ""]);
  r.addChild([23, 30]);
  r.addChild([48, ""]);
  r.child(0).addChild([10, ""]);
  r.child(0).addChild([15, ""]);
  r.child(1).addChild([20, 21]);
  r.child(1).addChild([24, ""]);
  r.child(1).addChild([31, ""]);
  r.child(2).addChild([45, 47]);
  r.child(2).addChild([50, 52]);
  at.layout(); // Layout array tree.

  // Messages for slideshow
  var msg = [
    "Example of inserting a record that causes the 2-3 tree root to split. We want to insert the key 19 into the tree.",
    "The key is first compared against the root node. Since 19 is more than the left key and less than the right key of the root node, the center child node is followed next.",
    "This node has only two elements, and 19 is less than 23 so the left child is followed next.",
    "A leaf node has being reached. Since the leaf node has no empty spaces it will have to be split.",
    "Next we have to rearrange the keys. First the largest key (21) goes in the new node.",
    "The middle key (20) has to be promoted.",
    "The smallest key (19) goes is the old node",
    "The parent node is full, so the promoted element cannot be inserted. Therefore the parent node has to be split.",
    "Again, the largest key (30) goes in the new node, the smallest key (20) goes is the old node, and the middle key (23) is promoted",
    "The pointers can now be updated",
    "The parent node is full so the promoted element cannot be inserted. Therefore the parent node has to be split. Because the parent node is the root node, a new root has to be created as well.",
    "Again, the largest key (23) goes in the new node, the smallest key (13) goes is the old node, and the middle key (18) is promoted.",
    "The pointers can now be updated.",
    "The insertion is complete."
  ];

  function step() {
    jsav.umsg(msg.shift());
    jsav.step();
  }

  // Slide 1
  jsav.umsg(msg.shift());
  jsav.displayInit(); // Start slideshow

  jsav.recorded(); // End slideshow
}());

// Array tree split root insert slide show
(function() {
  var jsav = new JSAV("TTTreeSplitInsert");
  var at = jsav.ds.arraytree(); // Create Array Tree

  // Create root node and all child nodes.
  var r = at.root([18, 31]);
  r.addChild([12, ""]);
  r.addChild([23, 30]);
  r.addChild([48, ""]);
  r.child(0).addChild([10, ""]);
  r.child(0).addChild([15, ""]);
  r.child(1).addChild([20, 21]);
  r.child(1).addChild([24, ""]);
  r.child(1).addChild([31, ""]);
  r.child(2).addChild([45, 47]);
  r.child(2).addChild([50, 52]);
  at.layout(); // Layout array tree.
}());
