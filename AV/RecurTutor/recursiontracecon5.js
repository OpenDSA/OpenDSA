"use strict";

//===============================================================================================================================
// Visualization of the four steps to write a recursive function
(function ($) {

  var av = new JSAV("RecursionTraceCON5");
  av.umsg("To model the domino effect recursively, think of it as to tip n dominos over. For symbolization, let's use the functional notation Domino(n) to represent the correspondent solution. Thus, Domino(1) is the solution to tip a single domino over, Domino(2) is the solution to tip two, Domino(3) is the solution to tip three.");
 
  var  pseudo = av.code("Domino(n){\n If(n == 1) \n  manually tip the domino over.\n else{\n  Domino(n-1) //to tip the first (n-1) dominos over\n  the nth domino will be tipped over subsequently //where 1 < n <= N\n  }\n}" , {lineNumbers:false , top:0 , left:100}); 
  
  av.step();
  av.umsg("If there is only one domino, it is easy enough to tip it over manually. Let’s think of that Domino(1) is solved nonrecursively.");
  pseudo.highlight(2);
  av.step();
  
  av.umsg("If there are two dominos, after the first domino is tipped over the second domino will be tipped over subsequently. So, Domino(2) is solved by executing Domino(1) first followed by tipping the second domino over");
  av.step();  
  av.umsg("Similarly, if there are three dominos, after the first and second dominos are tipped over, the third domino will be tipped over subsequently. So, Domino(3) is solved by executing Domino(2) first followed by tipping the third domino over.");
  av.step();

  av.umsg("More generally, Domino(n) is solved by executing Domino(n-1) first followed by tipping the nth domino over, where 1 < n ≤ N."); 
  
  pseudo.unhighlight(2);
  pseudo.highlight(5);
  pseudo.highlight(6);

  av.step();
  av.recorded();
  
}(jQuery));



//==============================================================================================================================
