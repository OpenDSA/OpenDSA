"use strict";

//===============================================================================================================================
// Visualization of the four steps to write a recursive function
(function ($) {

  var av = new JSAV("RecursionWriteCON2");
  
  av.umsg("To solve the sum problem, we use the simpler of the two versions. The first one:");
  av.step();

  var  pseudo = av.code(" int sum(int arr[],int size)\n{ if (size==0)\n  return 0;\n else{\n  int smallResult=sum(arr,size-1);\n  return smallResult + arr[size-1];\n  }\n}" , {lineNumbers:false , top:0 , left:0});
  
  av.step();
    
  av.umsg("Some people don’t like multiple return statements. That can be easily handled by the second version:");

  var  pseudo2 = av.code("int sum(int arr[],int size)\n{ if (size==0)\n  return 0;\n else\n  {\n  int smallResult=sum(arr,size-1);\n  result= smallResult+arr[size-1];\n  }\n  return result;\n}", {lineNumbers:false , top:0 , left:350});
  pseudo2.highlight(7);
  av.step();
  av.umsg(" You may even think there's no reason to declare smallResult and prefer to write:");
  av.step();
 
   var  pseudo3 = av.code("int sum(int arr[],int size)\n{ if ( size == 0 )\n  return 0;\n else\n{\nreturn sum( arr, size - 1 )+ arr[ size - 1 ];\n}", {lineNumbers:false , top:270 , left:150});
  pseudo3.highlight(6);
  av.step();

  av.umsg("Certainly, once you gain more experience with recursive functions, this is the preferable version. However, declaring a local variable to store the result of the recursive call might help you in the beginning to think about the small solution and then thinking about how to use that small solution to solve the bigger problem.");
  av.step();
  
  av.recorded();
  
}(jQuery));



//==============================================================================================================================
