/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Radix Sort Analysis
$(document).ready(function () {
  var av_name = "RadixSortAnalysisCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code).hide();
  var arr;
  var count, out;
  var arr_values = [];
  
  // Slide 1
  av.umsg("Radixsort starts with an input array of $n$ keys with $k$ digits. Here we have $n=12$ and $k=2$");
  for (var i = 0; i < 12; i++) {
    arr_values[i] = parseInt(Math.random() * 100 + 1, 10);
  }
  arr = av.ds.array(arr_values, {"left": 10, "top": 0, "indexed": true});
  av.label("|-------------------------------- $n$ ---------------------------------|", {"top": "-20px", "left": "20px"}).css({'font-size': '14px', "text-align": "center"});
  av.displayInit();
  
  // Slide 2
  pseudo.show();
  av.umsg("The outer loop will be executed $k$ times, one pass for each digit of key values");
  pseudo.highlight("loop1");
  av.step();
  
  // Slide 3
  av.umsg("The first inner loop initializes the count array of size $r$, where $r$ is the base of the key values. This requires $r$ units of work");
  pseudo.unhighlight("loop1");
  pseudo.highlight("loop2");
  arr_values = [];
  for (i = 0; i < 10; i++) {
    arr_values[i] = 0;
  }
  count = av.ds.array(arr_values, {"left": 10, "top": 120, "indexed": true});
  av.label("|-------------------------- $r$ ---------------------------|", {"top": "100px", "left": "20px"}).css({'font-size': '14px', "text-align": "center"});
  av.step();
  
  // Slide 4
  av.umsg("The Second inner loop counts the number of keys to be inserted in each bin. This requires a single pass over the input array that takes $n$ units of work");
  pseudo.unhighlight("loop2");
  pseudo.highlight("loop3");
  for (i = 0; i < 12; i++) {
    count.value(arr.value(i) % 10, count.value(arr.value(i) % 10) + 1);
  }
  arr.highlight();
  av.step();
  
  // Slide 5
  av.umsg("The third inner loop sets the values in the input array to their proper indices within the output array. This requires a single pass over the count array that takes $r$ units of work");
  arr.unhighlight();
  count.highlight();
  pseudo.unhighlight("loop3");
  pseudo.highlight("loop4");
  count.value(0, count.value(0) - 1);
  for (i = 1; i < 10; i++) {
    count.value(i, count.value(i) + count.value(i - 1));
  }
  av.step();
  
  // Slide 6
  av.umsg("The fourth loop assigns the keys from the input array to the bins within the output array according to the indices stored in the count array. This requires $n$ units of work");
  count.unhighlight();
  pseudo.unhighlight("loop4");
  pseudo.highlight("loop5");
  arr_values = [];
  for (i = arr.size() - 1; i >= 0; i--) {
    arr_values[count.value(arr.value(i) % 10)] = arr.value(i);
    count.value(arr.value(i) % 10, count.value(arr.value(i) % 10) - 1);
  }
  out = av.ds.array(arr_values, {"left": 10, "top": 240, "indexed": true});
  av.label("|-------------------------------- $n$ ---------------------------------|", {"top": "220px", "left": "20px"}).css({'font-size': '14px', "text-align": "center"});
  av.step();
  
  // Slide 7
  av.umsg("The last inner loop simply copies the keys from the output array back to the input array to be ready for the next pass of the outer loop. This requires $n$ units of work");
  pseudo.unhighlight("loop5");
  pseudo.highlight("loop6");
  for (i = 0; i < out.size(); i++) {
    arr.value(i, out.value(i));
    out.value(i, " ");
  }
  av.step();
  
  // Slide 8
  av.umsg("Since we have $k=2$, the outer loop will be executed once more and all the previous steps are repeated for the leftmost digit (Tens digit)");
  pseudo.unhighlight("loop6");
  pseudo.highlight("loop1");
  
  //Repeat the steps again in a single slide
  for (i = 0; i < 10; i++) {
    count.value(i, 0);
  }
  for (i = 0; i < arr.size(); i++) {
    count.value(parseInt(arr.value(i) / 10, 10) % 10, count.value(parseInt(arr.value(i) / 10, 10) % 10) + 1);
    //console.log(count.value(arr.value(i) / 10 % 10));
  }
  count.value(0, count.value(0) - 1);
  for (i = 1; i < count.size(); i++) {
    count.value(i, count.value(i) + count.value(i - 1));
  }
  for (i = arr.size() - 1; i >= 0; i--) {
    out.value(count.value(parseInt(arr.value(i) / 10, 10) % 10), arr.value(i));
    count.value(parseInt(arr.value(i) / 10, 10) % 10, count.value(parseInt(arr.value(i) / 10, 10) % 10) - 1);
  }
  for (i = 0; i < out.size(); i++) {
    arr.value(i, out.value(i));
  }
  av.step();
  
  // Slide 9
  av.umsg("At the end, since the outer loop is executed $k$ times and some of the inner loops execute $n$ times, while others are executed $r$ times, we have the total amount of work required is $\\theta(nk + rk)$");
  pseudo.unhighlight("loop1");
  pseudo.highlight("loops");
  av.step();
  
  // Slide 10
  av.umsg("Because $r$ is the size of the base, it might be rather small and it can be treated as a constant. Thus, the total amount of work will be $\\theta(nk)$");
  av.step();
  
  // Slide 11
  av.umsg("In the case of unique key values, we have $k\\geq\\log_{r}{n}$, and thus the total running time of radixsort is $\\Omega(n\\log{n})$");
  av.recorded();
});
