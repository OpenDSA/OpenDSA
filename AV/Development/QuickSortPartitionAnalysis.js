"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr;
  var arr_values = [];
  var pointer1, pointer2, pointer3;
  var left_moves = 0, right_moves = 0;
  var lmoves, rmoves;
  
  function runit() {
    av = new JSAV($(".avcontainer"));
    MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
	$(".avcontainer").on("jsav-message", function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });
	$(".avcontainer").on("jsav-updatecounter", function(){ 
      // invoke MathJax to do conversion again 
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]); 
    });  
	av.umsg("To analyze Quicksort, we first analyze the findpivot and partition functions when operating on a subarray of length $k$");
	av.displayInit();
	av.umsg("Clearly, findpivot takes constant time for any $k$. Here we have $k = 9$");
	code = av.code({url: "../../SourceCode/Processing/Sorting/Quicksort.pde",
                    lineNumbers: true,
                    startAfter: "/* *** ODSATag: findpivot *** */",
                    endBefore: "/* *** ODSAendTag: findpivot *** */", top: 200, left: 200});
	for (var i = 0;i < 9;i++){
	  arr_values[i] = " ";
	}
	arr = av.ds.array(arr_values, {"left":150, "top":30,"indexed":true});
	var rect = av.g.rect(350, 210, 65, 20).css({"fill": "green","opacity":0.3});
	pointer1 = av.pointer("i", arr.index(0));
	pointer2 = av.pointer("j", arr.index(8));	
	pointer3 = av.pointer("pivot", arr.index(4));
	av.step();		
    code.hide();
    pointer1.hide();
    pointer2.hide();
    pointer3.hide();
    rect.hide();
    av.umsg("Function partition contains an outer while loop with two nested while loops");
	code = av.code({url: "../../SourceCode/Processing/Sorting/Quicksort.pde",
                    lineNumbers: true,
                    startAfter: "/* *** ODSATag: partition *** */",
                    endBefore: "/* *** ODSAendTag: partition *** */", top: 200, left: 80});
	rect = av.g.rect(150, 210, 185, 15).css({"fill": "green","opacity":0.3});		
    var rect1 = av.g.rect(168, 232, 392, 15).css({"fill": "blue","opacity":0.3});		
    var rect2 = av.g.rect(168, 252, 610, 15).css({"fill": "blue","opacity":0.3});
    av.step();
	av.umsg("The total cost of the partition operation is constrained by how far left and right can move inwards");
	rect.hide();
	rect1.hide();
	rect2.hide();
	pointer1 = av.pointer("left", arr.index(0));
	pointer2 = av.pointer("right", arr.index(7),
                             { anchor: "center bottom",
                               myAnchor: "right top",
                               top: 50,
                               left: -25,
                               arrowAnchor: "center bottom"
                             });
	
	pointer3 = av.pointer("pivot", arr.index(8),
                             { anchor: "center bottom",
                               myAnchor: "right top",
                               top: 50,
                               left: -25,
                               arrowAnchor: "center bottom"
                             });
	av.step();
	av.umsg("The outer while loop along with its two nested while loops can move left and right a total of $s$ steps for a subarray of length $s$");
	rect = av.g.rect(150, 210, 185, 15).css({"fill": "green","opacity":0.3});		
    rect1 = av.g.rect(168, 232, 392, 15).css({"fill": "blue","opacity":0.3});		
    rect2 = av.g.rect(168, 252, 610, 15).css({"fill": "blue","opacity":0.3});
	av.step();
	av.umsg("Consider a subarray of length $s=9$ as shown");
	arr.hide();
	for (var i = 0;i < 9;i++){
	  arr_values[i] = parseInt(Math.random()*20 + 1);
	}
	arr = av.ds.array(arr_values, {"left":150, "top":30,"indexed":false});
	rect.hide();
	rect1.hide();
	rect2.hide();
	av.label("<b><u>left moves</u></b>", {"top": "-20px", "left": "600px"}).css({'font-size': '14px', "text-align": "center"});
	av.label("<b><u>right moves</u></b>", {"top": "-20px", "left": "700px"}).css({'font-size': '14px', "text-align": "center"});
	lmoves = av.label(left_moves, {"top": "10px", "left": "630px"}).css({'font-size': '14px', "text-align": "center"});
	rmoves = av.label(right_moves, {"top": "10px", "left": "730px"}).css({'font-size': '14px', "text-align": "center"});
	av.step();
	partition(arr, 0, 7, arr.value(8));
	var total_moves = left_moves + right_moves;
	av.umsg("As we see at the end of the partition function, the sum of left moves and right moves is $"+total_moves+"$, which is bounded by the size of the subarray $s=9$");
	code.setCurrentLine(6);
	av.step();
	av.umsg("Accordingly, the running time of the partition function is $\\theta(s)$, where $s$ is the size of the subarray");
	av.recorded();
  }
  function partition(A, left, right, pivot){
    while (left <= right) { 
	  code.setCurrentLine(1);
	  av.clearumsg();
	  av.step();
      while (A.value(left) < pivot){
	    left++;
		left_moves++;
		lmoves.text(left_moves);
		code.setCurrentLine(2);
		av.umsg("A[left] is less than pivot. Move left inwards");
		pointer1.target(arr.index(left));
		av.step();
      }
      while ((right > 0) && (right >= left) && (A.value(right) >= pivot)){
	    right--;
		right_moves++;
		rmoves.text(right_moves);
		code.setCurrentLine(3);
		av.umsg("A[right] is greater than or equal to pivot. Move right inwards");
		pointer2.target(arr.index(right));
		av.step();
	  }
      if (right > left){
	    A.swap(left, right);
		code.setCurrentLine(4);
		av.umsg("Swap left and right");
		av.step();
      }
    }
    return left;
  }
  function about() {
    var mystring = "Quick Sort Analysis\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
