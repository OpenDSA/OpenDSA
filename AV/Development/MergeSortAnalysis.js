"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr, arr11, arr12, arr21, arr22, arr23, arr24,
  arr31,arr32,arr33,arr34,arr35,arr36,arr37,arr38;
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
	// code = av.code({url: "../../../SourceCode/Processing/Sorting/Selectionsort.pde",
                    // lineNumbers: true,
                    // startAfter: "/* *** ODSATag: Selectionsort *** */",
                    // endBefore: "/* *** ODSAendTag: Selectionsort *** */", top: 200, left: 150});	
	av.displayInit();
	
	av.umsg("The analysis of merge sort is straightforward... Consider the following array of 8 elements");
    for (var i = 0;i < 8;i++){
	  arr_values[i] = parseInt(Math.random()*20);
	}
	arr = av.ds.array(arr_values, {"left":100, "top":0,"indexed":false});
	av.step();
	
	av.umsg("Splitting the array into two halves requires 8 units of work");
	arr.highlight();
	av.step();
	arr11 = av.ds.array([arr_values[0],arr_values[1],arr_values[2],arr_values[3]], {"left":60, "top":100,"indexed":false});
	arr12 = av.ds.array([arr_values[4],arr_values[5],arr_values[6],arr_values[7]], {"left":320, "top":100,"indexed":false});
	av.label("<b>Amount of work (Splitting)</b>",  {"top": "-5px", "left": "535px"}).css({'font-size': '16px', "text-align": "center"});
	var label = av.label("|------------ $n$ ------------|",  {"top": "20px", "left": "555px"});
	for (var i = 0; i < 8; i++){
	  av.g.rect(550 + (i*20), 50, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 4 units of work");
	arr11.highlight();
	arr.unhighlight();
	av.step();
	arr21 = av.ds.array([arr_values[0],arr_values[1]], {"left":40, "top":200,"indexed":false});
	arr22 = av.ds.array([arr_values[2],arr_values[3]], {"left":165, "top":200,"indexed":false});
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "120px", "left": "555px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(550 + (i*20), 150, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr21.highlight();
	arr11.unhighlight();
	av.step();
	arr31 = av.ds.array([arr_values[0]], {"left":30, "top":300,"indexed":false});
	arr32 = av.ds.array([arr_values[1]], {"left":95, "top":300,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "220px", "left": "550px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(550 + (i*20), 250, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr31.css(0, {"background-color":"green"});
	arr32.css(0, {"background-color":"green"});
	av.step();
	merge(arr31, arr32, arr21);
	arr31.hide();
	arr32.hide();
	av.label("<b>Amount of work (Merging)</b>",  {"top": "-5px", "left": "740px"}).css({'font-size': '16px', "text-align": "center"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "760px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "790px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(760 + (i*20+i*10), 350, 20, 20);
	}
	arr21.unhighlight();
	av.clearumsg();
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr22.highlight();
	av.step();
	arr33 = av.ds.array([arr_values[2]], {"left":155, "top":300,"indexed":false});
	arr34 = av.ds.array([arr_values[3]], {"left":220, "top":300,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "220px", "left": "600px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(600 + (i*20), 250, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr33.css(0, {"background-color":"green"});
	arr34.css(0, {"background-color":"green"});
	av.step();
	merge(arr33, arr34, arr22);
	arr33.hide();
	arr34.hide();
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "820px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "850px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(820 + (i*20+i*10), 350, 20, 20);
	}
	arr22.unhighlight();
	av.clearumsg();
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 4 units of work");
	arr21.css([0,1], {"background-color":"green"});
	arr22.css([0,1], {"background-color":"green"});
	av.step();
	merge(arr21, arr22, arr11);
    arr21.hide();
	arr22.hide();
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "220px", "left": "762px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(760 + (i*20), 250, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 4 units of work");
	arr12.highlight();
	av.step();
	arr23 = av.ds.array([arr_values[4],arr_values[5]], {"left":300, "top":200,"indexed":false});
	arr24 = av.ds.array([arr_values[6],arr_values[7]], {"left":430, "top":200,"indexed":false});
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "120px", "left": "645px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(640 + (i*20), 150, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr23.highlight();
	arr12.unhighlight();
	av.step();
	arr35 = av.ds.array([arr_values[4]], {"left":290, "top":300,"indexed":false});
	arr36 = av.ds.array([arr_values[5]], {"left":355, "top":300,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "220px", "left": "650px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(650 + (i*20), 250, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr35.css(0, {"background-color":"green"});
	arr36.css(0, {"background-color":"green"});
	av.step();
	merge(arr35, arr36, arr23);
	arr35.hide();
	arr36.hide();
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "880px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "910px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(880 + (i*20+i*10), 350, 20, 20);
	}
	arr23.unhighlight();
	av.clearumsg();
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr24.highlight();
	av.step();
	arr37 = av.ds.array([arr_values[6]], {"left":420, "top":300,"indexed":false});
	arr38 = av.ds.array([arr_values[7]], {"left":485, "top":300,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "220px", "left": "700px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(700 + (i*20), 250, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr37.css(0, {"background-color":"green"});
	arr38.css(0, {"background-color":"green"});
	av.step();
	merge(arr37, arr38, arr24);
	arr37.hide();
	arr38.hide();
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "940px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "320px", "left": "970px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(940 + (i*20+i*10), 350, 20, 20);
	}
	arr24.unhighlight();
	av.clearumsg();
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 4 units of work");
	arr23.css([0,1], {"background-color":"green"});
	arr24.css([0,1], {"background-color":"green"});
	av.step();
	merge(arr23, arr24, arr12);
    arr23.hide();
	arr24.hide();
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "220px", "left": "852px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(850 + (i*20), 250, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 8 units of work");
	arr11.css([0,1,2,3], {"background-color":"green"});
	arr12.css([0,1,2,3], {"background-color":"green"});
	av.step();
	merge(arr11, arr12, arr);
    arr11.hide();
	arr12.hide();
	var label = av.label("|------------ $n$ ------------|",  {"top": "120px", "left": "760px"});
	for (var i = 0; i < 8; i++){
	  av.g.rect(760 + (i*20), 150, 20, 20);
	}
	av.clearumsg();
	av.step();
	
	av.umsg("Thus, we have $\\log{n+1}$ levels each of which requires $\\theta(n)$ amount of work");
	av.label("|---------------------- $\\log{n+1}$----------------------|", 
	{"top": "200px", "left": "370px"}).css({'font-size': '16px', "text-align": "center"})
	.addClass("rotated");
	av.step();
	av.umsg("Therefore, the total running time of merge sort is $\\theta(n\\log{n})$");
	
	av.recorded();
  }
  function merge(a1, a2, return_into){
    var i = 0, j = 0;
	for (var k = 0; k < a1.size()*2; k++){
	  if(a1.value(i) <= a2.value(j)){
	    av.effects.moveValue(a1, i, return_into, k);
		i++;
		if (i == a1.size()){
		  for (var l = j; l < a2.size(); l++){
		    k++;
		    av.effects.moveValue(a2, l, return_into, k);
		  }
		  return;
		}
	  }
	  else{
	    av.effects.moveValue(a2, j, return_into, k);
		j++;
	  }
	  if (j == a2.size()){
		  for (var l = i; l < a1.size(); l++){
		    k++;
		    av.effects.moveValue(a1, l, return_into, k);
		  }
		  return;
		}
	}
  }
  function about() {
    var mystring = "Merge Sort Analysis\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
