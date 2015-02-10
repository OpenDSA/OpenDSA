/*global ODSA */
"use strict";
$(document).ready(function () {
  var av = new JSAV("BinaryTreeMistakesCON");
 
  
  av.umsg("When you write a recursive method that traverses a binary tree, you have to avoid the following common mistakes :");
   
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor2/RecBTMistakes.java",
                       lineNumbers: false,top:10 , left: 100});
  av.displayInit();   
    
  av.umsg("Make sure to check if the root is null:");
  pseudo.highlight(3);
  av.step();
  
  av.umsg("Make sure to NOT to check if the children are null if your solution doesn't require that you explicitly do that:");
  pseudo.unhighlight(3);
  pseudo.highlight(7);
  pseudo.highlight(13);
  av.step();
  
  av.umsg("Make sure to NOT to access the children values your solution doesn't require that you explicitly do that:");
  pseudo.unhighlight(7);
  pseudo.unhighlight(13);
  pseudo.highlight(9);
  pseudo.highlight(15);
  av.step();
  
  
  av.recorded();
});
