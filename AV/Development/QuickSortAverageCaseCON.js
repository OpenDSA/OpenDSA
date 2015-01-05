/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Average Case
$(document).ready(function () {
  var av_name = "QuickSortAverageCaseCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("QuickSort is a recursive function, accordingly we should end up with a recursive relation to describe its average case running time");
  av.displayInit();
  
  // Slide 2
  av.umsg("For an array of size $n$, the partition function can cause the pivot to be at any position $k$ from $0$ to $n-1$");
  av.g.rect(220, 50, 400, 30);
  av.label("|-------------------------------------  $n$  -----------------------------------|",  {"top": "80px", "left": "225px"}).css({'font-size': '14px', "text-align": "center"});
  var pivot = av.g.rect(330, 50, 30, 30);
  var piv = av.label("pivot", {"top": "45px", "left": "331px"}).css({'font-size': '11px', "text-align": "center"});
  var index = av.label("$k$", {"top": "15px", "left": "338px"}).css({'font-size': '14px', "text-align": "center"});
  av.step();
  
  // Slide 3
  av.umsg("Accordingly, there will be two recursive calls for the quicksort function, one for the left $k$ elements that will take $T(k)$ time and the other for the right $n-1-k$ elements that will take $T(n-1-k)$ time");
  var right_side = av.label("|----------------  $n-1-k$  ---------------|",  {"top": "15px", "left": "370px"}).css({'font-size': '14px', "text-align": "center"});
  var left_side = av.label("|---------- $k$ ----------|", {"top": "15px", "left": "225px"}).css({'font-size': '12px', "text-align": "center"});
  av.step();
  
  // Slide 4
  av.umsg("Consider the following cases for $k$:");
  av.umsg("If the pivot ends in position $0$, the total running time will be $cn+T(0)+T(n-1)$, where $cn$ here stands for the cost of the partition step");
  pivot.hide();
  pivot = av.g.rect(220, 50, 30, 30);
  index.hide();
  index = av.label("k = 0", {"top": "20px", "left": "220px"}).css({'font-size': '11px', "text-align": "center"});
  piv.hide();
  piv = av.label("pivot", {"top": "45px", "left": "221px"}).css({'font-size': '11px', "text-align": "center"});
  right_side.hide();
  left_side.hide();
  right_side = av.label("|-------------------------------  $n-1$  -----------------------------|",  {"top": "15px", "left": "255px"}).css({'font-size': '14px', "text-align": "center"});
  av.step();
  
  // Slide 5
  av.umsg("If the pivot ends in position $1$, the total running time will be $cn+T(1)+T(n-2)$");
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("k = 1");
  right_side.hide();
  right_side = av.label("|----------------------------  $n-2$  --------------------------|",  {"top": "15px", "left": "285px"}).css({'font-size': '14px', "text-align": "center"});
  left_side = av.label("$1$", {"top": "15px", "left": "230px"}).css({'font-size': '12px', "text-align": "center"});
  av.step();
  
  // Slide 6
  av.umsg("If the pivot ends in position $2$, the total running time will be $cn+T(2)+T(n-3)$");
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("k = 2");
  right_side.hide();
  right_side = av.label("|-------------------------  $n-3$  -----------------------|",  {"top": "15px", "left": "315px"}).css({'font-size': '14px', "text-align": "center"});
  left_side.hide();
  left_side = av.label("|---- $2$ ----|", {"top": "15px", "left": "225px"}).css({'font-size': '12px', "text-align": "center"});
  av.step();
  
  // Slide 7
  av.umsg("If the pivot ends in position $3$, the total running time will be $cn+T(3)+T(n-4)$");
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("k = 3");
  right_side.hide();
  right_side = av.label("|----------------------  $n-4$  ---------------------|",  {"top": "15px", "left": "345px"}).css({'font-size': '14px', "text-align": "center"});
  left_side.hide();
  left_side = av.label("|------- $3$ -------|", {"top": "15px", "left": "225px"}).css({'font-size': '12px', "text-align": "center"});
  av.step();
  
  // Slide 8
  av.umsg("We make one reasonable simplifying assumption: At each partition step, the pivot is equally likely to end in any position in the array");
  pivot.hide();
  pivot = av.g.rect(330, 50, 30, 30);
  piv.hide();
  piv = av.label("pivot", {"top": "45px", "left": "331px"}).css({'font-size': '11px', "text-align": "center"});
  index.hide();
  index = av.label("$k$", {"top": "15px", "left": "335px"}).css({'font-size': '14px', "text-align": "center"});
  right_side.hide();
  left_side.hide();
  right_side = av.label("|----------------  $n-1-k$  ---------------|",  {"top": "15px", "left": "370px"}).css({'font-size': '14px', "text-align": "center"});
  left_side = av.label("|---------- $k$ ----------|", {"top": "15px", "left": "225px"}).css({'font-size': '12px', "text-align": "center"});
  av.step();
  
  // Slide 9
  av.umsg("And since we have $n$ positions, therefore the average cost of the recursive calls can be modeled as:");
  var eqn = av.label("$$\\frac{1}{n}\\displaystyle\\sum_{k=0}^{n-1}[T(k)+T(n-1-k)]$$",  {"top": "-50px", "left": "0px"}).css({'font-size': '16px', "text-align": "center"});
  av.step();
  
  // Slide 10
  av.umsg("But also we need to add the cost for the partition and findpivot functions which is $cn$ for some constant $c$");
  av.step();
  
  // Slide 11
  av.umsg("Accordingly, quicksort's average running time can be modeled by the following recurrence:");
  eqn.hide();
  eqn = av.label("$$T(n) = cn + \\frac{1}{n}\\displaystyle\\sum_{k=0}^{n-1}[T(k)+T(n-1-k)]$$",  {"top": "-50px", "left": "0px"}).css({'font-size': '16px', "text-align": "center"});
  av.step();
  
  // Slide 12
  av.umsg("By solving this recurrence, we will have that quicksort's average running time is $\\theta(n\\log{n})$");
  av.recorded();
});
