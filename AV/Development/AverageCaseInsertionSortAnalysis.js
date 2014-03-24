"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr;
  
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
	code = av.code({url: "../../../SourceCode/Processing/Sorting/Insertionsort.pde",
                    lineNumbers: true,
                    startAfter: "/* *** ODSATag: Insertionsort *** */",
                    endBefore: "/* *** ODSAendTag: Insertionsort *** */", top: 225, left: 150});	
	av.displayInit();
	
	av.umsg("When record $i$ is processed, the number of times through the inner for loop depends on how far out of order the record is");
	arr = av.ds.array(["0", "1", "...","i-1", "i","...", "n-1"], {"left":250, "top":20,"indexed":false});
	var rect = av.g.rect(271, 256, 480, 15).css({"fill": "green","opacity":0.3});
	arr.highlight(4);
	av.step();

	av.umsg("The inner for loop is executed once for each value greater than the value of record $i$ that appears in positions $0$ to $i-1$");
	arr.css([0,1,2,3],{"background-color":"#00FA9A"});
	av.step();
	
	av.umsg("To calculate the average cost, we want to determine what is the average number of inversions will be for the record in position $i$");
	rect.hide();
	av.step();
	
	av.umsg("This can be calculated as:");
	var eq1 = av.label("$$\\frac{\\displaystyle\\sum_{j=1}^{i}j}{i}$$",  {"top": "-30px", "left": "25px"}).css({'font-size': '14px', "text-align": "center"});
	av.step();
	
	av.umsg("And since this had to be done for the records from $1$ to $n-1$, then we have the total cost as:");
	eq1.hide();
	var eq2 = av.label("$$\\displaystyle\\sum_{i=1}^{n-1}\\frac{\\displaystyle\\sum_{j=1}^{i}j}{i}$$",  {"top": "-30px", "left": "25px"}).css({'font-size': '14px', "text-align": "center"});
	var label = av.label("|____________________|",  {"top": "85px", "left": "315px"}).css({'font-size': '20px', "text-align": "center"});
	rect = av.g.rect(263, 235, 170, 15).css({"fill": "green","opacity":0.3});
	arr.unhighlight(4);
	arr.css([0,1,2,3],{"background-color":"white"});
	av.step();
	av.umsg("This can be solved as:");
	av.label("$$=\\sum_{i=1}^{n-1}\\frac{i+1}{2}$$", 
	{"top": "50px", "left": "20px"}).css({'font-size': '14px', "text-align": "center"});
	av.step();
	av.label("$$=\\frac{(n-1)(n+4)}{4}$$",  
	{"top": "110px", "left": "20px"}).css({'font-size': '14px', "text-align": "center"});;
	av.step();
	av.umsg("Therefore, the average case running time of insertion sort is $\\theta(n^2)$");
	rect.hide();
	label.hide();
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
