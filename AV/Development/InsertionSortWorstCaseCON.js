/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Insertion Sort Worst Case
$(document).ready(function () {
  var av_name = "InsertionSortWorstCaseCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code).hide();
  var arr;

  // Slide 1
  av.umsg("We first examine the worst case cost.");
  av.displayInit();

  // Slide 2
  pseudo.show();
  av.umsg("The body of inssort contains of two nested for loops");
  //  pseudo.css("loops", {"background-color":"#99FF00"});
  pseudo.highlight("loops");
  av.step();

  // Slide 3
  av.umsg("The outer for loop is executed $n-1$ times");
  pseudo.unhighlight("loop2");
  av.step();

  // Slide 4
  av.umsg("The inner loop is harder to analyze since it depends on how many records in positions $0$ to $i-1$ have a value less than that of the record in position $i$");
  pseudo.unhighlight("loop1");
  pseudo.highlight("loop2");
  av.step();

  // Slide 5
  av.umsg("Let's consider now a worst case example of an array with 6 elements");
  pseudo.unhighlight("loop2");
  arr = av.ds.array([6, 5, 4, 3, 2, 1], {"left": 10, "top": 160, "indexed": true});
  av.step();

  // Slide 6
  av.umsg("At $i=1$ a single comparison is required");
  arr.swap(0, 1);
  av.g.rect(320, 320, 50, 20);
  av.label("i=1",  {"top": "330px", "left": "330px"});
  av.step();

  // Slide 7
  av.umsg("At $i=2$ two comparisons are required");
  arr.swap(1, 2);
  av.g.rect(370, 320, 50, 20);
  av.label("i=2",  {"top": "330px", "left": "380px"});
  av.step();

  // Slide 8
  arr.swap(0, 1);
  av.g.rect(370, 300, 50, 20);
  av.step();

  // Slide 9
  av.umsg("At i=3 three comparisons are required");
  arr.swap(2, 3);
  av.g.rect(420, 320, 50, 20);
  av.label("i=3",  {"top": "330px", "left": "430px"});
  av.step();

  // Slide 10
  arr.swap(1, 2);
  av.g.rect(420, 300, 50, 20);
  av.step();

  // Slide 11
  arr.swap(0, 1);
  av.g.rect(420, 280, 50, 20);
  av.step();

  // Slide 12
  av.umsg("At i=4 four comparisons are required");
  arr.swap(3, 4);
  av.g.rect(470, 320, 50, 20);
  av.label("i=4",  {"top": "330px", "left": "480px"});
  av.step();

  // Slide 13
  arr.swap(2, 3);
  av.g.rect(470, 300, 50, 20);
  av.step();

  // Slide 14
  arr.swap(1, 2);
  av.g.rect(470, 280, 50, 20);
  av.step();

  // Slide 15
  arr.swap(0, 1);
  av.g.rect(470, 260, 50, 20);
  av.step();

  // Slide 16
  av.umsg("At i=5 five comparisons are required");
  arr.swap(4, 5);
  av.g.rect(520, 320, 50, 20);
  av.label("i=5",  {"top": "330px", "left": "530px"});
  av.step();

  // Slide 17
  arr.swap(3, 4);
  av.g.rect(520, 300, 50, 20);
  av.step();

  // Slide 18
  arr.swap(2, 3);
  av.g.rect(520, 280, 50, 20);
  av.step();

  // Slide 19
  arr.swap(1, 2);
  av.g.rect(520, 260, 50, 20);
  av.step();

  // Slide 20
  arr.swap(0, 1);
  av.g.rect(520, 240, 50, 20);
  av.step();

  // Slide 21
  av.umsg("The total running time now will be the total surface area of this shape");
  av.step();

  // Slide 22
  av.umsg("The total area will be the sum of the areas of the big traingle and the series of (n-1) small traingles");
  var rect5 = av.g.rect(310, 290, 268, 1);
  rect5.rotate(-22);
  av.label("}",  {"top": "147px", "left": "560px"}).css({'font-size': '80px', "text-align": "center"});
  av.label("$n-1$",  {"top": "270px", "left": "600px"}).css({'font-size': '20px', "text-align": "center"});
  av.umsg("So, the total area is $\\frac{(n-1)(n-1)}{2} + \\frac{(n-1)}{2}$ which gives $\\frac{n(n-1)}{2}$");
  av.step();

  // Slide 23
  av.umsg('And therefore, the worst case running time of insertion sort is $\\theta(n^2)$');
  av.recorded();
});
