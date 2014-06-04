"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr;
  var arr_values = [];
    av = new JSAV("BubbleSortAnalysisCON"); 
    code = av.code({url:"../../../SourceCode/Processing/Sorting/Bubblesort.pde",
             lineNumbers: true,
             startAfter: "/* *** ODSATag: Bubblesort *** */",
             endBefore: "/* *** ODSAendTag: Bubblesort *** */", top: 250, left: 200});	
    av.displayInit();	
    av.umsg("The number of comparisons made by the inner for loop on the $i^{th}$ iteration is always $n-i$");
    code.css(3, {"background-color":"#99FF00"});
    av.step();
    code.css(3, {"background-color":"white"});	
    av.umsg("Consider the following example of an array with 6 elements");
    for (var i = 0;i < 6;i++){
      arr_values[i] = parseInt(Math.random()*20);
    }
    arr = av.ds.array(arr_values, {"left":10, "top":120,"indexed":true});
    av.step();	
    av.umsg("At $i=0$ we have 5 comparisons");
    arr.css([0,1],{"background-color":"#00FA9A"});
    if(arr.value(0) > arr.value(1)){
      arr.swap(0,1);
    }
    av.g.rect(400, 150, 50, 20);
    av.label("i=0",  {"top": "172px", "left": "410px"});
    av.step();
    av.clearumsg();
    arr.css([1,2],{"background-color":"#00FA9A"});
    arr.css(0,{"background-color":"white"});
    if(arr.value(1) > arr.value(2)){
      arr.swap(1,2);
    }
    av.g.rect(400, 130, 50, 20);
    av.step();
    arr.css([2,3],{"background-color":"#00FA9A"});
    arr.css(1,{"background-color":"white"});
    if(arr.value(2) > arr.value(3)){
      arr.swap(2,3);
    }
    av.g.rect(400, 110, 50, 20);
    av.step();
    arr.css([3,4],{"background-color":"#00FA9A"});
    arr.css(2,{"background-color":"white"});
    if(arr.value(3) > arr.value(4)){
      arr.swap(3,4);
    }
    av.g.rect(400, 90, 50, 20);
    av.step();
    arr.css([4,5],{"background-color":"#00FA9A"});
    arr.css(3,{"background-color":"white"});
    if(arr.value(4) > arr.value(5)){
      arr.swap(4,5);
    }
    av.g.rect(400, 70, 50, 20);
    arr.css(5,{"background-color":"grey"});
    arr.css(4, {"background-color":"white"}); 
    av.step();	
    av.umsg("At $i=1$ we have 4 comparisons");
    arr.css([0,1],{"background-color":"#00FA9A"});
    if(arr.value(0) > arr.value(1)){
      arr.swap(0,1);
    }
    av.g.rect(450, 150, 50, 20);
    av.label("i=1",  {"top": "172px", "left": "460px"});
    av.step();
    av.clearumsg();
    arr.css([1,2],{"background-color":"#00FA9A"});
    arr.css(0,{"background-color":"white"});
    if(arr.value(1) > arr.value(2)){
      arr.swap(1,2);
    }
    av.g.rect(450, 130, 50, 20);
    av.step();
    arr.css([2,3],{"background-color":"#00FA9A"});
    arr.css(1,{"background-color":"white"});
    if(arr.value(2) > arr.value(3)){
      arr.swap(2,3);
    }
    av.g.rect(450, 110, 50, 20);
    av.step();
    arr.css([3,4],{"background-color":"#00FA9A"});
    arr.css(2,{"background-color":"white"});
    if(arr.value(3) > arr.value(4)){
      arr.swap(3,4);
    }
    av.g.rect(450, 90, 50, 20);
    arr.css(4,{"background-color":"grey"});
    arr.css(3, {"background-color":"white"}); 
    av.step();	
    av.umsg("At $i=2$ we have 3 comparisons");
    arr.css([0,1],{"background-color":"#00FA9A"});
    if(arr.value(0) > arr.value(1)){
      arr.swap(0,1);
    }
    av.g.rect(500, 150, 50, 20);
    av.label("i=2",  {"top": "172px", "left": "510px"});
    av.step();
    av.clearumsg();
    arr.css([1,2],{"background-color":"#00FA9A"});
    arr.css(0,{"background-color":"white"});
    if(arr.value(1) > arr.value(2)){
      arr.swap(1,2);
    }
    av.g.rect(500, 130, 50, 20);
    av.step();
    arr.css([2,3],{"background-color":"#00FA9A"});
    arr.css(1,{"background-color":"white"});
    if(arr.value(2) > arr.value(3)){
      arr.swap(2,3);
    }
    av.g.rect(500, 110, 50, 20);
    av.step();
    arr.css(3,{"background-color":"grey"});
    arr.css(2, {"background-color":"white"}); 
    av.step();	
    av.umsg("At $i=3$ we have 2 comparisons");
    arr.css([0,1],{"background-color":"#00FA9A"});
    if(arr.value(0) > arr.value(1)){
      arr.swap(0,1);
    }
    av.g.rect(550, 150, 50, 20);
    av.label("i=3",  {"top": "172px", "left": "560px"});
    av.step();
    av.clearumsg();
    arr.css([1,2],{"background-color":"#00FA9A"});
    arr.css(0,{"background-color":"white"});
    if(arr.value(1) > arr.value(2)){
      arr.swap(1,2);
    }
    av.g.rect(550, 130, 50, 20);
    av.step();
    arr.css(2,{"background-color":"grey"});
    arr.css(1, {"background-color":"white"}); 
    av.step();	
    av.umsg("At $i=4$ we have only 1 comparison");
    arr.css([0,1],{"background-color":"#00FA9A"});
    if(arr.value(0) > arr.value(1)){
      arr.swap(0,1);
    }
    av.g.rect(600, 150, 50, 20);
    av.label("i=4",  {"top": "172px", "left": "610px"});
    arr.css(1,{"background-color":"grey"});
    arr.css(0, {"background-color":"grey"}); 
    av.step();
    av.clearumsg();
    av.umsg("The total amount of comparisons will be the surface area of this shape");
    av.label("|------------ $n-1$ --------------|",  {"top": "190px", "left": "420px"}).css({'font-size': '16px', "text-align": "center"});
    av.label("|--- $n-1$ ---|",  {"top": "90px", "left": "330px"}).css({'font-size': '16px', "text-align": "center"}).addClass("rotated");
    av.g.line(400, 70, 650, 170);
    av.step();
    av.umsg("The total area will be the sum of the areas of the big traingle and the series of (n-1) small traingles");
    av.step();
    av.umsg("So, the total area is $\\frac{(n-1)(n-1)}{2} + \\frac{(n-1)}{2}$ which gives $\\frac{n(n-1)}{2}$");
    av.step();
    av.umsg('And therefore, the worst case running time of Bubble sort is $\\theta(n^2)$');
    av.recorded();
    // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
