"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr;
  
  function runit() {
    av = new JSAV($(".avcontainer"));
	code = av.code({url: "../../../SourceCode/Processing/Sorting/Insertionsort.pde",
                    lineNumbers: true,
                    startAfter: "/* *** ODSATag: Insertionsort *** */",
                    endBefore: "/* *** ODSAendTag: Insertionsort *** */", top: 20, left: 200});	
	av.displayInit();
	
	av.umsg("The body of inssort contains of two nested for loops");
	var rect1 = av.g.rect(318, 30, 267, 15).css({"fill": "green","opacity":0.3});
    var rect2 = av.g.rect(338, 52, 460, 15).css({"fill": "green","opacity":0.3});
	av.step();
	
	av.umsg("The outer for loop is executed n-1 times");
	rect1.hide();
	rect2.hide();
	var rect3 = av.g.rect(364, 30, 170, 15).css({"fill": "green","opacity":0.3});
	av.step();
	
	av.umsg("The inner loop is harder to analyze since it depends on how many records in positions 0 to i-1 have a value less than that of the record in position i");
	rect3.hide();
	var rect4 = av.g.rect(380, 52, 410, 15).css({"fill": "green","opacity":0.3});
	av.step();
	
	av.umsg("Let's consider now a worst case example of an array with 6 elements");
	rect4.hide();
	arr = av.ds.array([6, 5, 4, 3, 2, 1], {"left":-5, "top":150,"indexed":true});
	av.step();
	
	av.umsg("At i=1 a single comparison is required");
	arr.swap(0,1);
	av.g.rect(320, 320, 50, 20);
	av.label("i=1",  {"top": "350px", "left": "330px"})
	av.step();
	
	av.umsg("At i=2 two comparisons are required");
	arr.swap(1,2);
	av.g.rect(370, 320, 50, 20);
	av.label("i=2",  {"top": "350px", "left": "380px"});
	av.step();
	arr.swap(0,1);
	av.g.rect(370, 300, 50, 20);
	av.step();
	
	av.umsg("At i=3 three comparisons are required");
	arr.swap(2,3);
	av.g.rect(420, 320, 50, 20);
	av.label("i=3",  {"top": "350px", "left": "430px"});
	av.step();
	arr.swap(1,2);
    av.g.rect(420, 300, 50, 20);
	av.step();
	arr.swap(0,1);
	av.g.rect(420, 280, 50, 20);
	av.step();
	
	av.umsg("At i=4 four comparisons are required");
	arr.swap(3,4);
	av.g.rect(470, 320, 50, 20);
	av.label("i=4",  {"top": "350px", "left": "480px"});
	av.step();
	arr.swap(2,3);
	av.g.rect(470, 300, 50, 20);
	av.step();
	arr.swap(1,2);
	av.g.rect(470, 280, 50, 20);
	av.step();
	arr.swap(0,1);
	av.g.rect(470, 260, 50, 20);
	av.step();
	
	av.umsg("At i=5 five comparisons are required");
	arr.swap(4,5);
	av.g.rect(520, 320, 50, 20);
	av.label("i=5",  {"top": "350px", "left": "530px"});
	av.step();
	arr.swap(3,4);
	av.g.rect(520, 300, 50, 20);
	av.step();
	arr.swap(2,3);
	av.g.rect(520, 280, 50, 20);
	av.step();
	arr.swap(1,2);
	av.g.rect(520, 260, 50, 20);
	av.step();
	arr.swap(0,1);
	av.g.rect(520, 240, 50, 20);
	av.step();
	
	av.umsg("The total running time now will be the total surface area of this shape");
    av.step();
	
	av.umsg("The total area will be the sum of the areas of the big traingle and the series of (n-1) small traingles");
	var rect5 = av.g.rect(310,290,268,1);
	rect5.rotate(-22);
	av.label("}",  {"top": "240px", "left": "570px"}).css({'font-size': '80px', "text-align": "center"});
	av.label("n-1",  {"top": "275px", "left": "600px"}).css({'font-size': '20px', "text-align": "center"});
	
	av.umsg("So, the total area is (n-1)(n-1)/2 + (n-1)/2 which gives n(n-1)/2");
	av.step();
	av.umsg("And therefore, the worst case running time of insertion sort is &theta;(n<sup>2</sup>)");
	
	av.recorded();
}
  function about() {
    var mystring = "Insertion Sort Analysis\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
