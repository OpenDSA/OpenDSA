/*global ODSA */
"use strict";
$(document).ready(function () {
  var av = new JSAV("IneffBinaryTreeRangeCON");
 
  
  av.umsg("Suppose that you want to write a recursive function named range that, given a root to a binary search tree (BST) and key value min, and a key value max, returns the number of nodes having key values that fall between min and max. Function range should visit as few nodes in the BST as possible. One possible solution is:");
   
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor2/RecIneffRng.java",
                       lineNumbers: false,top:10 , left: 100});
  av.displayInit();
  av.umsg("This solution has neither compilation errors nor logical errors. It will return the correct number of nodes in the given range. However, the solution did not benefit from the BST property to minimize the nodes visits.");
   
  av.step();
   // Setup the tree
  var btTop = 380;
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
  
  var label1 = av.label("range(rt, 10, 14)", {left: 50, top: 370}); 
  av.umsg(" Suppose that the function call is range(rt, 10, 14). So we are looking for the values between 10 and 14. Let's trace the code on the shown tree:");
  pseudo.highlight(3);
  rt1.target(rt, {anchor: "left top"});
  av.step();
  
  av.umsg("Since the root is not null we proceed to check on the range.")
  pseudo.unhighlight(3);
  pseudo.highlight(7);
  av.step();
  
  av.umsg("Since the min value is less than the root value and the max value is not more than  the root value, so the first recursive call will be executed.");
 
  pseudo.unhighlight(7);
  pseudo.highlight(10);
  rt1.target(rt.left(), {anchor: "left top"}); 
  av.step();
  
  av.umsg("After the first recursive call is done with counting the values in range in the left sub-tree, the second recursive call will go to count on the right subtree.");
  pseudo.unhighlight(10);
  pseudo.highlight(11);
  rt1.target(rt.right(), {anchor: "right top"}); 
  av.step();
   
  av.umsg("As we see in this example, the code is not effecient so it did not avoid vsiting un-needed nodes. The code will visit the whole right sub-tree while it is not needed.");
  var label3 = av.label("The range function should be written in a way that avoid traversing this side for the given range.", {left: 550, top: 420}); 
  var el1= av.g.ellipse(442, 488, 50 , 50).css({fill: "red", opacity: 0.4});
  av.step();
  
  //================================
  pseudo.unhighlight(11);
  label3.hide();
  el1.hide();
  av.umsg("Another example, suppose that the function call is range(rt, 38, 68). So we are looking for the values between 38 and 68. Let's trace the code on the shown tree:");
  label1.hide();
  var label2 = av.label("range(rt, 38, 68)", {left: 50, top: 370}); 
  pseudo.highlight(3);
  rt1.target(rt, {anchor: "left top"});
  av.step();
  
  av.umsg("Since the root is not null we proceed to check on the range.")
  pseudo.unhighlight(3);
  pseudo.highlight(7);
  av.step();
  
  av.umsg("Since the min value is not less than the root value and the max value is more than  the root value, so the first recursive call will be executed. ");
 
  pseudo.unhighlight(7);
  pseudo.highlight(10);
  rt1.target(rt.left(), {anchor: "left top"}); 
 
  av.umsg("As we see in this example, the code is not effecient so it did not avoid vsiting un-needed nodes. The code will visit the whole right sub-tree while it is not needed. The range function should be written in a way that avoid traversing this side for the given range.");
  var el2= av.g.ellipse(342, 488, 50 , 50).css({fill: "red", opacity: 0.4});
  av.step();
  
  av.umsg("So the recursive calls should be controlled by if-else statement to avoid redundant nodes visits. The following code shows how to convert this code to an effecient one that visit the minimal number of nodes.");
  
  pseudo.hide();
  var pseudo2 = av.code({url: "../../../SourceCode/Java/RecurTutor2/RecEffRng.java",
                       lineNumbers: false,top:10 , left: 100});
  el2.hide();
  label2.hide();
  rt1.hide();
  pseudo2.highlight(10);
  pseudo2.highlight(13);
  
  av.recorded();
});
