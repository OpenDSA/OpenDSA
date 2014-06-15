"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;
  var input1;
  var input2;
  var sort1;
  var sort2;
  var iparr1;
  var iparr2;
  var sortarr1;
  var sortarr2;
  var oparr;
  var paired;

function runit() {
  ODSA.AV.reset(true);
  jsav = new JSAV($('.avcontainer'));

  jsav.umsg("Pairing of two arrays by reduction to sorting");
  jsav.displayInit();
  jsav.step();

  input1 = new Array(23,42,17,93,88,12,57,90);
  input2 = new Array(48,59,11,89,12,91,64,34);
  var r1 = jsav.g.rect(80,10,600,70);
  r1.show();
  iparr1 = jsav.ds.array(input1,  {left: 100, top: 0});
  iparr2 = jsav.ds.array(input2,  {left: 400, top: 0});
  jsav.label("<b>Arrays to be paired</b>",{left: 300, top: -28});
  jsav.step();

  var l1= jsav.g.line(220,80,220,120);
  l1.show();
  var l2= jsav.g.line(520,80,520,120);
  l2.show();
  
  jsav.umsg("Sort the two arrays individually");
  var r2 = jsav.g.rect(190,120,60,40);
  r2.show();
  var r3 = jsav.g.rect(490,120,60,40);
  r3.show();
  jsav.label("<b>Sort</b>",{left: 202, top: 112});
  jsav.label("<b>Sort</b>",{left: 502, top: 112});
  jsav.step();

  var l3= jsav.g.line(220,160,220,200);
  l3.show();
  var l4= jsav.g.line(520,160,520,200);
  l4.show();
  sort1 = new Array(12,17,23,42,57,88,90,93);
  sort2 = new Array(11,12,34,48,59,64,89,91);
  sortarr1 = jsav.ds.array(sort1,  {left: 100, top: 180});
  jsav.label("Sorted array",{left:170,top:240});
  sortarr2 = jsav.ds.array(sort2,  {left: 400, top: 180});
  jsav.label("Sorted array",{left:470,top:240});
  jsav.step();

  jsav.umsg("Pair the numbers at the same index of two sorted arrays together.");
  oparr= jsav.ds.array([" "," "," "," "," "," "," "," "],  {left: 200, top: 300});
  jsav.label("<b>Paired array</b>",{left:320,top:370});
  jsav.step();

  oparr.show();
  for(var i=0;i<8;i++){
	if(i>0){
        	sortarr1.unhighlight(i-1);
        	sortarr2.unhighlight(i-1);
        	oparr.unhighlight(i-1);
		oparr.css(i-1,{"background-color":"ForestGreen"});
	}
	var str="&nbsp"+sortarr1.value(i)+","+sortarr2.value(i)+"&nbsp";
        oparr.value(i,str);
        sortarr1.highlight(i);
        sortarr2.highlight(i);
        oparr.highlight(i);
	jsav.umsg("Pairing "+sortarr1.value(i)+" with "+sortarr2.value(i));
	jsav.step()
  }
  sortarr1.unhighlight(i-1);
  sortarr2.unhighlight(i-1);
  oparr.unhighlight(i-1);
  oparr.css(i-1,{"background-color":"ForestGreen"});
  jsav.umsg("The output array gives the pairing" );
  jsav.step();
  jsav.recorded();
}

function about() {
  alert("Reduction visualization");
}
  

// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
