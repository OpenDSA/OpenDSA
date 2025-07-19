/*global ODSA */
// Written by Sally Hamouda (updated by Cliff Shaffer)

// Title: Inefficient Range Query in a BST Slideshow
// Author: Sally Hamouda; Cliff Shaffer
// Institution: Virginia Tech
// Features: Code Tracing Visualization; Algorithm Visualization
// Keyword: Binary Search Tree
// Natural Language: en
// Programming Language: Java

/* Description: Slideshow visualizing a range query implementation in a BST, contrasting an inefficient and an efficient implementation. */

$(document).ready(function () {
  "use strict";
  var av_name = "IneffBinaryTreeRangeCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  // Slide 1
  av.umsg("Suppose that you want to write a recursive function named range that, given a root to a BST, a key value min, and a key value max, returns the number of nodes having key values that fall between min and max. Function range should visit as few nodes in the BST as possible. An inefficient solution is shown.");
  av.displayInit();

  // Slide 2
  av.umsg("This solution has neither compilation errors nor logical errors. It will return the correct number of nodes in the given range. However, the solution did not use the BST property to minimize the nodes visits.");
  av.step();

  // Slide 3
  // Set up the tree
  var btTop = 320;
  var btLeft = 305;
  var bt = av.ds.binarytree({nodegap: 15, top: btTop, left: btLeft});
  bt.root('20');
  var rt = bt.root();
  rt.left('10');
  rt.left().left('5');
  rt.left().right('15');
 
  
  rt.right('40');
  rt.right().left('35');
  rt.right().right('65');

  bt.layout();
  var rt1 = av.pointer("rt", bt.root(), {anchor: "left top", top: -10});
  
  var label1 = av.label("range(rt, 10, 14)", {left: 50, top: btTop + 50}); 
  av.umsg("Suppose that the function call is range(rt, 10, 14). So we are looking for the values between 10 and 14. Let's trace the code on the tree shown.");
  pseudo.highlight(2);
  rt1.target(rt, {anchor: "left top"});
  av.step();
  
  // Slide 4
  av.umsg("Since the root is not null we proceed to check on the range.")
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  av.step();
  
  // Slide 5
  av.umsg("The root value is not within the range.");
  rt1.target(rt.left(), {anchor: "left top"}); 
  av.step();
  
  // Slide 6
  av.umsg("We now proceed to the recursive calls. The first recursive call counts nodes in range in the left sub-tree, and the second recursive call counts nodes in range in the right subtree.");
  pseudo.unhighlight(5);
  pseudo.highlight([7, 8]);
  rt1.target(rt.right(), {anchor: "right top"}); 
  av.step();
   
  // Slide 7
  av.umsg("The code is not effecient because it does not avoid vsiting un-needed nodes. The code will visit the whole right sub-tree even though it is not needed.");
  var label3 = av.label("The range function should be written in a way that avoid traversing this side for the given range.", {left: 550, top: btTop + 50}); 
  var el1= av.g.ellipse(442, btTop + 108, 50 , 50).css({fill: "red", opacity: 0.4});
  av.step();
  
  // Slide 8
  pseudo.unhighlight([7, 8]);
  label3.hide();
  el1.hide();
  av.umsg("As another example, suppose that the function call is range(rt, 38, 68). So we are looking for the values between 38 and 68. Let's trace the code on the tree shown.");
  label1.hide();
  var label2 = av.label("range(rt, 38, 68)", {left: 50, top: btTop + 50}); 
  pseudo.highlight(2);
  rt1.target(rt, {anchor: "left top"});
  av.step();
  
  // Slide 9
  av.umsg("Since the root is not null we proceed to check on the range.")
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  av.step();
  
  // Slide 10
  av.umsg("The root value is not within the range.");
  rt1.target(rt.left(), {anchor: "left top"}); 
  av.step();
 
  // Slide 11
  av.umsg("We now proceed to the recursive calls. The first recursive call counts nodes in range in the left sub-tree, and the second recursive call counts nodes in range in the right subtree.");
  pseudo.unhighlight(5);
  pseudo.highlight([7, 8]);
  var el2= av.g.ellipse(342, btTop + 108, 50 , 50).css({fill: "red", opacity: 0.4});
  av.step();

  // Slide 12
  av.umsg("The recursive calls should be controlled by if statements to avoid unnecessary node visits. The following code checks the current node value so as to decide whether to visit children.");
  pseudo.hide();
  var pseudo2 = av.code(code[1]);
  el2.hide();
  label2.hide();
  rt1.hide();
  pseudo2.highlight([7, 9]);
  av.recorded();
});
