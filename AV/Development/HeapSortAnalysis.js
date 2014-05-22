"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var arr = [];
  var numNodes = 31;
  var bh;
  function runit() {
    av = new JSAV($(".avcontainer"));
	MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
	$(".avcontainer").on("jsav-message", function() {
      // invoke MathJax to do conversion again
      MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    });
	$(".avcontainer").on("jsav-updatecounter", function(){ 
      // invoke MathJax to do conversion again 
      MathJax.Hub.Queue(["Typeset", MathJax.Hub]); 
    });
	av.umsg("The first step in heapsort is to heapify the array. This will cost $\\theta(n)$ running time for an array of size $n$.<br> Consider the following structure of a Max Heap");
	 for (var i = 0; i < numNodes; i++) {
      arr.push(" ");
    }
    bh = av.ds.binheap(arr, {left: 100, top: 50, nodegap: 15});
	bh.element.hide();
	av.displayInit();
	av.umsg("HeapSort swaps the root node containng the maximum element with the last node in the heap and then the heap size is decremented by $1$");
	swap(0,30);
	bh.css(30, {"background-color":"grey"});
	av.step();
	av.umsg("After swapping, the array should be re-heapified. This happens by recursively call the siftdown function on the root node");
	bh.highlight(0);
	av.step();
	av.umsg("In the worst case, siftdown will push the root node towards the last heap level");
	swap(0,2);
	bh.unhighlight(0);
	bh.highlight(2);
	av.step();
	swap(2,5);
	bh.unhighlight(2);
	bh.highlight(5);
	av.step();
	swap(5,12);
	bh.unhighlight(5);
	bh.highlight(12);
	av.step();
	swap(12,25);
	bh.unhighlight(12);
	bh.highlight(25);
	av.step();
	av.umsg("This will requires $\\theta(\\log{n})$ amount of work");
	av.label("|----------- $\\log{n}$ -----------|", {"top": "125px", "left": "0px"}).css({'font-size': '14px', "text-align": "center"}).addClass("rotated");
	av.step();
	av.umsg("Since this operation is repeated for all $n$ array elements, we will have the total running time of heapsort is $\\theta(n\\log{n})$")
    av.recorded();
  }
  function swap(index1, index2){
    var treeswap = function(index1, index2) {
      bh.jsav.effects.swap(bh._treenodes[index1].element, bh._treenodes[index2].element, true);
    };
    JSAV.anim(treeswap).call(bh, index1, index2);
  }
  function about() {
    var mystring = "Build heap running time visual proof\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
