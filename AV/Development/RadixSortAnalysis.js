"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr, count, out;
  var arr_values = [];
  
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
    
	av.umsg("Radixsort starts with an input array of $n$ keys with $k$ digits. Here we have $n=12$ and $k=2$");
	for (var i = 0;i < 12;i++){
	  arr_values[i] = parseInt(Math.random()*100 + 1);
	}
	arr = av.ds.array(arr_values, {"left":10, "top":0,"indexed":true});
	av.label("|-------------------------------- $n$ ---------------------------------|", {"top": "-5px", "left": "20px"}).css({'font-size': '14px', "text-align": "center"});
    av.displayInit();
	code = av.code({url: "../../SourceCode/Processing/Sorting/RadixsortNoComments.pde",
                    lineNumbers: false,
                    startAfter: "/* *** ODSATag: Radixsort *** */",
                    endBefore: "/* *** ODSAendTag: Radixsort *** */", top: -40, left: 400});
	
    av.recorded();    
  }
  function about() {
    var mystring = 
    "Radix Sort Analysis\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more Information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
