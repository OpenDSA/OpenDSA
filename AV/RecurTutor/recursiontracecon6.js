"use strict";
/*


*/
//===============================================================================================================================
// Visualization of the four steps to write a recursive function
(function ($) {

  var av = new JSAV("RecursionTraceCON6");
  av.umsg("To apply Domino effect solving technique, it is assumed that there is a sequence of integers, from 1 to N, hidden behind the dominos, and the only way to see the integer behind a domino is tipping its front domino over");
 
  var  pseudo = av.code("PrintOneToN(n){\n If(n==1)\n  print 1\n else{\n  PrintOneToN(n-1) //to print integers from 1 to n-1\n  print n //where 1<n≤N\n  }\n}" , {lineNumbers:false , top:0 , left:100}); 
  
  av.step();
  av.umsg("Since the first domino has to be tipped over manually, the solution for the base case, PrintOneToN(1), is solved nonrecursively by printing 1.");
  pseudo.highlight(3);
  av.step();
  av.umsg("For any other domino, before a domino is tipped over all of its preceded dominos have to be tipped over and then the current domino will be tipped over subsequently.")
  pseudo.highlight(5);
  pseudo.highlight(6);
  pseudo.unhighlight(3);
  av.recorded();
  
}(jQuery));



//==============================================================================================================================
