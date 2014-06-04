"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr;
    av = new JSAV("InsertionSortBestCaseCON");
    code = av.code({url: "../../../SourceCode/Processing/Sorting/Insertionsort.pde",
               lineNumbers: true,
               startAfter: "/* *** ODSATag: Insertionsort *** */",
               endBefore: "/* *** ODSAendTag: Insertionsort *** */", top: 0, left: 200});	
    av.displayInit();
    av.umsg("The best case of insertion sort occurs when the array values are in sorted order from lowest to highest as shown");
    arr = av.ds.array([1, 2, 3, 4, 5, 6], {"left":10, "top":150,"indexed":true});
    av.step();
    av.umsg("Every test in the inner for loop will fail immediately and no values will be moved");
    code.css(3, {"background-color":"#99FF00"});
    av.step();	
    av.umsg("The total number of comparisons will be $n-1$ which is the number of times the outer for loop executes");
    code.css(3, {"background-color":"white"});
    code.css(2, {"background-color":"#99FF00"}); 	
    av.g.rect(320, 230, 50, 20);
    av.label("i=1",  {"top": "240px", "left": 330});	
    av.g.rect(370, 230, 50, 20);
    av.label("i=2",  {"top": "240px", "left": "380px"});		
    av.g.rect(420, 230, 50, 20);
    av.label("i=3",  {"top": "240px", "left": "430px"});
    av.g.rect(470, 230, 50, 20);
    av.label("i=4",  {"top": "240px", "left": "480px"});
    av.g.rect(520, 230, 50, 20);
    av.label("i=5",  {"top": "240px", "left": "530px"});
    av.label("|--------- $n-1$ ---------|",  {"top": "250px", "left": "350px"}).css({'font-size': '18px', "text-align": "center"});
    av.step();
    av.umsg('And therefore, the best case running time of insertion sort is $\\theta(n)$');
    av.recorded();
}(jQuery));
