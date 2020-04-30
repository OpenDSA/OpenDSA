$(document).ready(function(){
    "use strict";
//initialize 
  var input;
  var iparr;
  var pair1;
  var pair2;
  var pair11;
  var pair21;
  var pairs;
  var oparr;
  var paired;
  var line1;
  var yoffset = 20;
    var av_name = "LowerBound";
    var av = new JSAV(av_name);


var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;




//frame 1
av.umsg("<b>Reduction and Finding Lower Bound</b>"+ "<br><br>There is another use of reductions aside from applying an old algorithm to solve a new problem (and thereby establishing an upper bound for the new problem). That is to prove a lower bound on the cost of a new problem by showing that it could be used as a solution for an old problem with a known lower bound.");
av.displayInit();


//frame 2
av.umsg(Frames.addQuestion("q1"));
av.step();


//frame 3
av.umsg("<br>Assume we can go the other way and convert SORTING to PAIRING fast enough. What does this say about the minimum cost of PAIRING? We know that the lower bound for SORTING in the worst and average cases is in Ω(nlogn). In other words, the best possible algorithm for sorting requires at least nlogn time.");
av.step();

//frame 4
av.umsg("Assume that PAIRING could be done in O(n) time. Then, one way to create a sorting algorithm would be to convert SORTING into PAIRING, run the algorithm for PAIRING, and finally convert the answer back to the answer for SORTING. Provided that we can convert SORTING to/from PAIRING fast enough, this process would yield an O(n) algorithm for sorting! <br><br>Because this contradicts what we know about the lower bound for SORTING, and the only flaw in the reasoning is the initial assumption that PAIRING can be done in O(n) time, we can conclude that there is no O(n) time algorithm for PAIRING. This reduction process tells us that PAIRING must be at least as expensive as SORTING and so must itself have a lower bound in Ω(nlogn).");
av.step();

//frame 5
av.umsg(Frames.addQuestion("q2"));
av.step();


//frame 6
av.umsg("<b>The Reduction Template</b> <br> <br>Consider any two problems for which a suitable reduction from one to the other can be found. The first problem takes an arbitrary instance of its input, which we will call I, and transforms I to a solution, which we will call SLN. The second problem takes an arbitrary instance of its input, which we will call I', and transforms I' to a solution, which we will call SLN'. We can define reduction more formally as a three-step process:<br><br>1. Transform an arbitrary instance of the first problem to an instance of the second problem. In other words, there must be a transformation from any instance I of the first problem to an instance I' of the second problem." + "<br>2. Apply an algorithm for the second problem to the instance I', yielding a solution SLN'." + "<br>3. Transform SLN' to the solution of I, known as SLN. Note that SLN must in fact be the correct solution for I for the reduction to be acceptable.");
av.step();


//frame 7
av.umsg(Frames.addQuestion("q31"));
var r1 = av.g.rect(70, 150, 150, 180);
var l1 = av.g.line(145, 170, 125, 160);
var l2 = av.g.line(145, 170, 165, 160);
var l3 = av.g.line(135, 130, 135, 165);
var l4 = av.g.line(155, 130, 155, 165);
var r2 = av.g.rect(90, 170, 105, 30);
var l5 = av.g.line(145, 225, 125, 215);
var l6 = av.g.line(145, 225, 165, 215);
var l7 = av.g.line(135, 200, 135, 220);
var l8 = av.g.line(155, 200, 155, 220);
var r3 = av.g.rect(85, 225, 115, 30);
var l9 = av.g.line(145, 280, 125, 270);
var l0 = av.g.line(145, 280, 165, 270);
var l10 = av.g.line(135, 255, 135, 275);
var l11 = av.g.line(155, 255, 155, 275);
var r4 = av.g.rect(90,280,105, 30);
var l12 = av.g.line(145, 350, 125, 340);
var l13 = av.g.line(145, 350, 165, 340);
var l14 = av.g.line(135, 310, 135, 345);
var l15= av.g.line(155, 310, 155, 345);
var a = av.label("Problem A:",{left: 60, top: 115});
var i = av.label("I",{left: 170, top: 115});
var t1 = av.label("Transfrom 1",{left: 100, top: 160});
var b = av.label("Problem B",{left: 110, top: 215});
var t2 = av.label("Transfrom 2",{left: 100, top: 270});
var tii = av.label("I'",{left: 170, top: 190});
var ti1 = av.label("SLN'",{left: 170, top: 245});
var ti2 = av.label("SLN",{left: 170, top: 315});
var caption1 = av.label("Figure 0.2.2: The general process for reduction shown as a 'blackbox' diagram." + "<br><br>Figure 0.2.2 shows a graphical representation of the general reduction process, showing the role of the two problems, and the two transformations.",{left: 320, top: 115});
av.step();
r1.hide();
r2.hide();
r3.hide();
r4.hide();
l1.hide();
l2.hide();
l3.hide();
l4.hide();
l5.hide();
l6.hide();
l7.hide();
l9.hide();
l8.hide();
l0.hide();
l10.hide();
l11.hide();
l12.hide();
l13.hide();
l14.hide();
l15.hide();
a.hide();
b.hide();
t1.hide();
t2.hide();
i.hide();
tii.hide();
ti1.hide();
ti2.hide();
caption1.hide();


//frame 8
av.umsg("This is a slideshow that shows the steps for the reduction of SORTING to PAIRING. Sorting a given array by reducing it to Pairing problem");
input = new Array(23,42,17,93,88,12,57,90);
iparr = av.ds.array(input,  {left: 120+50, top: -8 + yoffset,indexed:true});
for(var i=0;i<8;i++)
iparr.css(i,{"background-color":"AntiqueWhite"});
var a0 = av.label("<b>Array to be sorted</b>",{left: 180+50, top: -28 + yoffset});
av.step();

//frame 9
av.umsg("Transformation step to reduce into pairing problem");
var l1= av.g.line(245+50,40 + yoffset,245+50,83 + yoffset);
l1.show();
var a00 =av.label("<b>Transformation (Cost=O(n))</b>",{left: 250+50, top: 45 + yoffset});
var r9 = av.g.rect(0+50,85 + yoffset,550,45);
r9.show();
av.step();


//frame 10
av.umsg("The Input array and Position array is given as an input to the Pairing problem. The Position array contains a value <i>k</i> at the k<sup>th</sup> index");
pair1 = av.ds.array([0,1,2,3,4,5,6,7],  {left: 5+50 , top: 75 + yoffset});
for(var i=0;i<8;i++)
    pair1.css(i,{color:"blue","background-color":"WhiteSmoke"});
var a1 = av.label("Position <br>array",{left: 20+50, top: 25 + yoffset});
pair2 = av.ds.array(input,  {left: 295+50, top: 75 + yoffset});
for(var i=0;i<8;i++)
    pair2.css(i,{"background-color":"AntiqueWhite"});
var a2 = av.label("Input <br>array",{left: 490+50, top: 25 + yoffset});
av.step();


//frame 11
av.umsg("The two arrays are fed into the Pairing problem as input");
var a3 = av.label("<b>Pairing</b>",{left: 250+50, top: 120 + yoffset});
var l2= av.g.line(245+50,130 + yoffset,245+50,160 + yoffset);
l2.show();
var r2 = av.g.rect(105+50,160 + yoffset,280,110);
r2.show();
av.step();


//frame 12
av.umsg("Pairing problem is to be solved on the two arrays");
pair11 = av.ds.array([0,1,2,3,4,5,6,7],  {left: 120+50 , top: 152 + yoffset});
for(var i=0;i<8;i++)
    pair11.css(i,{color:"blue","background-color":"WhiteSmoke"});
pair21 = av.ds.array(input,  {left: 120+50, top: 212 + yoffset});
for(var i=0;i<8;i++)
    pair21.css(i,{"background-color":"AntiqueWhite"});
av.step();


//slide 13
av.umsg("Pairing problem is solved on the two arrays");
pairs = new Array([23,2],[42,3],[17,1],[93,7],[88,5],[12,0],[57,4],[90,6]);
var pairing = new Array();
for(var i=0;i<8;i++){
	var x2=i*30+140;
	var x1=pairs[i][1]*30+140;
	pairing[i]=av.g.line([x1+50,197 + yoffset,x2+50,229 + yoffset]);
	pairing[i].show();
}
av.step();


//slide 14
av.umsg("Pairing problem is solved on the two arrays");
var l3= av.g.line(245+50,270 + yoffset,245+50,300 + yoffset);
l3.show();
var a4 = av.label("<b>Pairs generated</b>",{left: 250+50, top:260 + yoffset});
paired = av.ds.array(pairs,{left: 85+50, top: 285 + yoffset});
for(var i=0;i<8;i++)
     paired.css(i,{"width":"40px","min-width":"40px"});
av.step();


//frame 15
av.umsg("Reverse transformation: "
  +"In each pair, the second number determines the position of the first in Output Array");
var l4= av.g.line(245+50,330 + yoffset,245+50,360 + yoffset);
l4.show();
var a5 = av.label("<b>Reverse Transformation Cost=O(n)</b>",{left: 250+50,top: 320 + yoffset});
var r1 = av.g.rect(105+50,360 + yoffset,280,80);
r1.show();
oparr= av.ds.array([" "," "," "," "," "," "," "," "],  {left: 120+50, top: 360 + yoffset,indexed:true});
for(var i=0;i<8;i++)
    oparr.css(i,{"background-color":"Snow"});
av.step();


//frame 16-24
oparr.show();
var curr;
for(var i=0;i<8;i++){
  if(i>0){
          paired.unhighlight(i-1);
          oparr.unhighlight(curr);
      //oparr.css(curr,{"background-color":"ForestGreen"});
  }
  var str=paired.value(i)+",";
  var arr=str.split(",");
  curr=arr[1];
  curr=curr*1;
      oparr.value(curr,arr[0]);
      paired.highlight(i);
      oparr.highlight(curr);
  av.umsg("Placing "+arr[0]+" at "+curr);
  av.step()
}
paired.unhighlight(i-1);
oparr.unhighlight(curr);
av.umsg("The output array gives the sorted array" );
av.step();

//frame 25
var l5= av.g.line(385+50,412 + yoffset,412+50,412 + yoffset);
var a6 = av.label("<b>Output</b>",{left: 500+50,top: 410 + yoffset});
var op= av.ds.array([" "," "," "," "," "," "," "," "],  {left: 412+50, top: 380 + yoffset});
for(var i=0;i<8;i++)
  	op.value(i,oparr.value(i)); 
for(var i=0;i<8;i++)
    op.css(i,{"background-color":"#CCFF99"});
av.umsg("Total cost of sorting = O(n) + Cost of Pairing");
av.step();

a00.hide();
a0.hide();
a1.hide();
a2.hide();
a3.hide();
a4.hide();
a5.hide();
a6.hide();
iparr.hide();
pair1.hide();
pair2.hide();
pair11.hide();
pair21.hide();
paired.hide();
l1.hide();
l2.hide();
l3.hide();
l4.hide();
l5.hide();
r9.hide();
r2.hide();
r1.hide();
op.hide();
for(var i=0;i<8;i++){
	pairing[i].hide();
}
oparr.hide();

//frame 26
av.umsg(Frames.addQuestion("q32"));
av.step();

//frame 27
av.umsg(Frames.addQuestion("q33"));
av.step();


av.recorded();
});
