"use strict";

// Search slideshow
(function ($) {
  var jsav = new JSAV("searchCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Binary/BST.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: findhelp *** */",
                       endBefore: "/* *** ODSAendTag: findhelp *** */"});

  var bt = jsav.ds.bintree({top: 10, left: 10, visible: true, nodegap: 15});
  bt.root(37);
  var rt = bt.root();
  rt.left(24);
  rt.left().left(7);
  rt.left().left().left(2);
  rt.left().right(32);
  rt.right(42);
  rt.right().left(42);
  rt.right().left().left(40);
  rt.right().right(120);
  bt.layout();

  var rt1 = jsav.pointer("rt", bt.root(), {anchor: "right top", top: 0});

  jsav.umsg("Consider searching for the record with key value 32 in this tree. We call the findhelp method with a pointer to the BST root (the node with key value 37).");
  pseudo.highlight(0);
  jsav.displayInit();

  jsav.umsg("Check what rt is pointing to. It is not null.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  jsav.umsg("Check the value at the root. We find that it is greater than what we are looking for.");
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();

  jsav.umsg("So we want to visit the left child.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("We make a recursive call with the left child as the new rt.");
  pseudo.unhighlight(3);
  pseudo.highlight(0);
  rt1.target(bt.root().left(), {anchor: "left top"});
  jsav.step();

  jsav.umsg("Check what rt is pointing to. It is not null.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  jsav.umsg("Check the value at the root. We find that it is less than what we are looking for.");
  pseudo.unhighlight(1);
  pseudo.highlight(6);
  jsav.step();

  jsav.umsg("So we want to visit the right child.");
  jsav.step();

  jsav.umsg("We make a recursive call with the right child as the new rt.");
  pseudo.unhighlight(6);
  pseudo.highlight(0);
  rt1.target(bt.root().left().right(), {anchor: "right top"});
  jsav.step();

  jsav.umsg("Check what rt is pointing to. It is not null.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  jsav.umsg("Check the value at the root. This is the record that we are looking for.");
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  jsav.step();

  jsav.umsg("Now we will start unwinding the recursion, passing the record with key value 32 back up to the caller.");
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  jsav.step();

  jsav.umsg("Pop the recursion, now rt is back to the node with value 24.");
  rt1.target(bt.root().left(), {anchor: "left top"});
  pseudo.unhighlight(6);
  pseudo.highlight(5);
  jsav.step();

  jsav.umsg("Pop the recursion, now rt is back to the node with value 37.");
  rt1.target(bt.root(), {anchor: "right top"});
  pseudo.unhighlight(5);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("Pop the recursion one final time to return the record back to the original caller of findhelp.");
  pseudo.unhighlight(3);
  pseudo.highlight(7);
  jsav.step();

  jsav.recorded();
}(jQuery));

// Insert slideshow
(function ($) {
  var jsav = new JSAV("insertCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Binary/BST.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: inserthelp *** */",
                       endBefore: "/* *** ODSAendTag: inserthelp *** */"});

  var bt = jsav.ds.bintree({visible: true, nodegap: 15});
  bt.root(37);
  var rt = bt.root();
  rt.left(24);
  rt.left().left(7);
  rt.left().left().left(2);
  rt.left().right(32);
  rt.right(42);
  rt.right().left(42);
  rt.right().left().left(40);
  rt.right().right(120);
  var newnode = rt.left().right().left(30);
  newnode.css({"color": "#eed"});
  newnode.css({"border-color": "#eed"});
  var parent = newnode.parent();
  var newedge = parent.edgeToLeft();
  newedge.hide();
  newedge.css({"stroke": "red"});
  newedge.css({"stroke-width": 3});
  bt.layout();

  var rt1 = jsav.pointer("rt", bt.root(), {anchor: "right top", top: 0});

  jsav.umsg("Consider inserting a record with key value 30 in this tree. We call the findhelp method with a pointer to the BST root (the node with value 37).");
  pseudo.highlight(0);
  jsav.displayInit();

  jsav.umsg("Check what rt is pointing to. It is not null.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  jsav.umsg("Check the value at the root. We find that it is greater than what we are looking for.");
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();

  jsav.umsg("So we want to visit the left child.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("We make a recursive call with the left child as the new rt.");
  pseudo.unhighlight(3);
  pseudo.highlight(0);
  rt1.target(bt.root().left(), {anchor: "left top"});
  jsav.step();

  jsav.umsg("Check what rt is pointing to. It is not null.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  jsav.umsg("Check the value at the root. We find that it is less than what we are looking for.");
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  jsav.step();

  jsav.umsg("So we want to visit the right child.");
  jsav.step();

  jsav.umsg("We make a recursive call with the right child as the new rt.");
  pseudo.unhighlight(4);
  pseudo.highlight(0);
  rt1.target(bt.root().left().right(), {anchor: "right top"});
  jsav.step();

  jsav.umsg("Check what rt is pointing to. It is not null.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();

  jsav.umsg("Check the value at the root. We find that it is greater than what we are looking for.");
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();

  jsav.umsg("So we want to visit the left child.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("We make a recursive call with the left child as the new rt.");
  pseudo.unhighlight(3);
  pseudo.highlight(0);
  rt1.target(newnode, {anchor: "left top"});
  jsav.step();

  jsav.umsg("Check what rt is pointing to. This time it is null! So make a new node.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  newnode.css({"color": "red"});
  newnode.css({"border-color": "red"});
  newedge.hide();
  jsav.step();

  jsav.umsg("At this point we have hit the base case on the recursive process. So now we will return out of the current instance of inserthelp.");
  jsav.step();

  jsav.umsg("Unwinding the recursion one level brings us the node with value 32, which is to the parent of the new node that we just created. We now re-assign its left pointer to point to the return value from the call to inserthelp (the new node that we had just created).");

  newnode = newnode.parent();
  newedge.show();
  rt1.target(newnode, {anchor: "left top"});
  pseudo.unhighlight(1);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("Unwinding the recursion another level brings us the node with value 24. We now re-assign its right pointer to point to the return value from the call to inserthelp.");
  newedge = newnode.edgeToParent();
  newnode = newnode.parent();
  newedge.css({"stroke": "red"});
  newedge.css({"stroke-width": 3});
  rt1.target(newnode, {anchor: "left top"});
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  jsav.step();

  jsav.umsg("Unwinding the recursion another level brings us the node with value 37. We now re-assign its right pointer to point to the return value from the call to inserthelp.");
  newedge = newnode.edgeToParent();
  newnode = newnode.parent();
  newedge.css({"stroke": "red"});
  newedge.css({"stroke-width": 3});
  rt1.target(newnode, {anchor: "left top"});
  pseudo.unhighlight(5);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("Finally we return from initial call to inserthelp, returning a pointer to the node with value 37 (the root of the original tree). We now re-assign the BST's root pointer.");
  rt1.hide();
  var root1 = jsav.pointer("root", bt.root(), {anchor: "right top", top: 0});
  root1.arrow.css({"stroke": "red"});
  pseudo.unhighlight(3);
  pseudo.highlight(7);
  jsav.step();

  jsav.recorded();

}(jQuery));

// deletemax slideshow
(function ($) {
  var jsav = new JSAV("deletemaxCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Binary/BST.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: deletemax *** */",
                       endBefore: "/* *** ODSAendTag: deletemax *** */"});

  var bt = jsav.ds.bintree({top: 10, left: 40, visible: true, nodegap: 15});

  bt.root(10);
  var rt = bt.root();
  rt.left(5);
  rt.right(20);
  rt.right().left(9);
  rt.right().left().right(15);
  bt.layout();

  var rt1 = jsav.pointer("rt", bt.root(), {anchor: "left top", top: 0});

  jsav.umsg("To remove the node with the maximum key value from a subtree, first find that node by starting at the subtree root and continuously move down the right link until there is no further right link to follow.");
  jsav.displayInit();

  jsav.umsg("Beginning at the node with value 10, we check and find that the right child is not null.");
  pseudo.highlight(2);
  jsav.step();

  jsav.umsg("Recursively call deletemax on the right child.")
  rt1.target(rt.right(), {anchor: "right top"});
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("The node with value 20 does not have a right child. So return the pointer to its left child.");
  pseudo.unhighlight(3);
  pseudo.highlight(2);
  jsav.step();

  jsav.umsg("Unwinding the recursion a level, we are back to the node with root 10, who has its right pointer changed to point to the result of its call to deletemax. This has the effect of setting it to point to the node with value 9.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  rt1.target(rt, {anchor: "left top"});
  rt.right(rt.right().left());
  var newedge = rt.edgeToRight();
  newedge.css({"stroke": "red"});
  bt.layout();
  jsav.step();

  jsav.umsg("Unwinding the original call to deletemax returns a copy of the original pointer to the node with value 10, which will be set by the caller.");
  rt1.arrow.css({"stroke": "red"});
  jsav.step();

  jsav.recorded();
}(jQuery));
