/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Partition Analysis
$(document).ready(function () {
  var av_name = "QuickSortPartitionAnalysisCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code).hide();
  var arr;
  var arr_values = [];
  var pointer1, pointer2, pointer3;
  var left_moves = 0, right_moves = 0;
  var lmoves, rmoves;
  
  // Slide 1
  av.umsg("To analyze Quicksort, we first analyze the findpivot and partition functions when operating on a subarray of length $k$");
  av.displayInit();
  
  // Slide 2
  av.umsg("Clearly, findpivot takes constant time for any $k$. Here we have $k = 9$");
  for (var i = 0; i < 9; i++) {
    arr_values[i] = " ";
  }
  arr = av.ds.array(arr_values, {"left": 150, "top": 30, "indexed": true});
  pointer1 = av.pointer("i", arr.index(0));
  pointer2 = av.pointer("j", arr.index(8));
  pointer3 = av.pointer("pivot", arr.index(4));
  av.step();

  // Slide 3 
  pseudo.show();
  pointer1.hide();
  pointer2.hide();
  pointer3.hide();
  av.umsg("Function partition contains an outer while loop with two nested while loops");
  pseudo.highlight("loops");
  av.step();
  
  // Slide 4
  av.umsg("The total cost of the partition operation is constrained by how far left and right can move inwards");
  pointer1 = av.pointer("left", arr.index(0));
  pointer2 = av.pointer("right", arr.index(7),
                             { anchor: "center bottom",
                               myAnchor: "right top",
                               top: 80,
                               left: -50,
                               arrowAnchor: "center bottom"
                             });
	
  pointer3 = av.pointer("pivot", arr.index(8),
                             { anchor: "center bottom",
                               myAnchor: "right top",
                               top: 80,
                               left: -50,
                               arrowAnchor: "center bottom"
                             });
  av.step();
  
  // Slide 5
  av.umsg("The swap operation in the body of the outer while loop guarantees the movement of left and right at least one step each");
  pseudo.unhighlight("loop2");
  pseudo.unhighlight("loop3");
  pseudo.highlight("if");
  av.step();
  
  // Slide 6
  av.umsg("Thus, the maximum number of times swap can be executed is $\\frac{s-1}{2}$. In this case, left and right will move at most $\\frac{s-1}{2}$ steps each for a total of $s-1$ steps");
  av.step();
  
  // Slide 7
  av.umsg("The first inner while loop can be executed at most $s-1$ times in which case left will end up at the pivot and the outer while loop will end");
  pointer1.target(arr.index(8));
  pseudo.unhighlight("if");
  pseudo.highlight("loop2");
  av.step();
  
  // Slide 8
  av.umsg("The second inner while loop can be executed at most $s-1$ times in which case right will end up at array position $-1$ and the outer while loop will end");
  pointer1.target(arr.index(0));
  var a = av.ds.array(["-1"], {"left": 103, "top": 30, "indexed": false});
  pointer2.target(a.index(0));
  pseudo.unhighlight("loop2");
  pseudo.highlight("loop3");
  av.step();
  
  // Slide 9
  av.umsg("Accordingly, the outer while loop along with its two inner loops will move left and right a total of $s-1$ steps");
  pseudo.highlight("loop2");
  a.hide();
  pointer2.target(arr.index(7));
  av.step();
  
  // Slide 10
  av.umsg("Thus, the running time of the partition function is $\\theta(s)$, where $s$ is the size of the subarray");
  av.recorded();
});
