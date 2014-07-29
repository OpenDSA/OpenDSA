"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var code;
  var arr, arr11, arr12, arr21, arr22, arr23, arr24,
  arr31,arr32,arr33,arr34,arr35,arr36,arr37,arr38;
  var arr_values = [];
        av = new JSAV("MergeSortAnalysisCON");	
	av.displayInit();
	
	av.umsg("The analysis of merge sort is straightforward... Consider the following array of 8 elements");
        for (var i = 0;i < 8;i++){
	  arr_values[i] = parseInt(Math.random()*20);
	}
	arr = av.ds.array(arr_values, {"left":60, "top":0,"indexed":false});
	av.step();
	
	av.umsg("Splitting the array into two halves requires 8 units of work");
	arr.highlight();
	av.step();
	arr11 = av.ds.array([arr_values[0],arr_values[1],arr_values[2],arr_values[3]], {"left":40, "top":75,"indexed":false});
	arr12 = av.ds.array([arr_values[4],arr_values[5],arr_values[6],arr_values[7]], {"left":200, "top":75,"indexed":false});
	av.label("<b><u>Splitting Work</u></b>",  {"top": "-30px", "left": "430px"}).css({'font-size': '16px', "text-align": "center"});
	var label = av.label("|------------ $n$ ------------|",  {"top": "-10px", "left": "405px"});
	for (var i = 0; i < 8; i++){
	  av.g.rect(400 + (i*20), 30, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 4 units of work");
	arr11.highlight();
	arr.unhighlight();
	av.step();
	arr21 = av.ds.array([arr_values[0],arr_values[1]], {"left":20, "top":150,"indexed":false});
	arr22 = av.ds.array([arr_values[2],arr_values[3]], {"left":120, "top":150,"indexed":false});
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "65px", "left": "405px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(400 + (i*20), 105, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr21.highlight();
	arr11.unhighlight();
	av.step();
	arr31 = av.ds.array([arr_values[0]], {"left":0, "top":225,"indexed":false});
	arr32 = av.ds.array([arr_values[1]], {"left":70, "top":225,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "140px", "left": "398px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(400 + (i*20), 180, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr31.css(0, {"background-color":"green"});
	arr32.css(0, {"background-color":"green"});
	av.step();
	merge(arr31, arr32, arr21);
	arr31.hide();
	arr32.hide();
	av.label("<b><u>Merging Work</u></b>",  {"top": "-30px", "left": "640px"}).css({'font-size': '16px', "text-align": "center"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "562px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "592px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(560 + (i*20+i*10), 255, 20, 20);
	}
	arr21.unhighlight();
	av.clearumsg();
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr22.highlight();
	av.step();
	arr33 = av.ds.array([arr_values[2]], {"left":100, "top":225,"indexed":false});
	arr34 = av.ds.array([arr_values[3]], {"left":170, "top":225,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "140px", "left": "448px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(450 + (i*20), 180, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr33.css(0, {"background-color":"green"});
	arr34.css(0, {"background-color":"green"});
	av.step();
	merge(arr33, arr34, arr22);
	arr33.hide();
	arr34.hide();
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "622px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "652px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(620 + (i*20+i*10), 255, 20, 20);
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
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "140px", "left": "612px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(610 + (i*20), 180, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 4 units of work");
	arr12.highlight();
	av.step();
	arr23 = av.ds.array([arr_values[4],arr_values[5]], {"left":180, "top":150,"indexed":false});
	arr24 = av.ds.array([arr_values[6],arr_values[7]], {"left":280, "top":150,"indexed":false});
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "65px", "left": "495px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(490 + (i*20), 105, 20, 20);
	}
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr23.highlight();
	arr12.unhighlight();
	av.step();
	arr35 = av.ds.array([arr_values[4]], {"left":160, "top":225,"indexed":false});
	arr36 = av.ds.array([arr_values[5]], {"left":230, "top":225,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "140px", "left": "498px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(500 + (i*20), 180, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr35.css(0, {"background-color":"green"});
	arr36.css(0, {"background-color":"green"});
	av.step();
	merge(arr35, arr36, arr23);
	arr35.hide();
	arr36.hide();
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "682px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "712px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(680 + (i*20+i*10), 255, 20, 20);
	}
	arr23.unhighlight();
	av.clearumsg();
	av.step();
	
	av.umsg("Splitting the selected array into two halves requires 2 units of work");
	arr24.highlight();
	av.step();
	arr37 = av.ds.array([arr_values[6]], {"left":260, "top":225,"indexed":false});
	arr38 = av.ds.array([arr_values[7]], {"left":330, "top":225,"indexed":false});
	var label = av.label("|- $\\frac{n}{4}$ -|",  {"top": "140px", "left": "548px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(550 + (i*20), 180, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 2 units of work");
	arr37.css(0, {"background-color":"green"});
	arr38.css(0, {"background-color":"green"});
	av.step();
	merge(arr37, arr38, arr24);
	arr37.hide();
	arr38.hide();
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "742px"});
	var label = av.label("$\\frac{n}{8}$ ",  {"top": "215px", "left": "772px"});
	for (var i = 0; i < 2; i++){
	  av.g.rect(740 + (i*20+i*10), 255, 20, 20);
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
	var label = av.label("|---- $\\frac{n}{2}$ ----|",  {"top": "140px", "left": "702px"});
	for (var i = 0; i < 4; i++){
	  av.g.rect(700 + (i*20), 180, 20, 20);
	}
	av.step();
	
	av.umsg("Merging the green highlighted arrays requires 8 units of work");
	arr11.css([0,1,2,3], {"background-color":"green"});
	arr12.css([0,1,2,3], {"background-color":"green"});
	av.step();
	merge(arr11, arr12, arr);
        arr11.hide();
	arr12.hide();
	var label = av.label("|------------ $n$ ------------|",  {"top": "65px", "left": "615px"});
	for (var i = 0; i < 8; i++){
	  av.g.rect(610 + (i*20), 105, 20, 20);
	}
	av.clearumsg();
	av.step();
	
	av.umsg("Thus, we have $\\log{n+1}$ levels each of which requires $\\theta(n)$ amount of work");
	av.label("|--------------- $\\log{n+1}$---------------|", 
	{"top": "125px", "left": "250px"}).css({'font-size': '16px', "text-align": "center"})
	.addClass("rotated");
	av.step();
	av.umsg("Therefore, the total running time of merge sort is $\\theta(n\\log{n})$");
	av.step();

        av.umsg("This cost is unaffected by the relative order of the values being sorted, thus this analysis holds for the best, average, and worst cases.");
	av.recorded();
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
}(jQuery));
