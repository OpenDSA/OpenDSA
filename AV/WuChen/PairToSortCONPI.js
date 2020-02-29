$(document).ready(function(){
    "use strict";
//initialize 
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
    var yoffset = 15;
    var av_name = "PairToSortCONPI";
    var av = new JSAV(av_name);


var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;


//frame 1
av.umsg(" One way to solve PAIRING is to use an existing sorting program to sort each of the two sequences, and then pair off items based on their position in sorted order. Technically we say that in this solution, PAIRING is reduced to SORTING, because SORTING is used to solve PAIRING.");
av.displayInit();

//frame 2
av.umsg(Frames.addQuestion("q1"));
av.step();

//frame3
av.umsg(Frames.addQuestion("q2"));
av.step();

//frame4
av.umsg("A reduction of PAIRING to SORTING helps to establish an upper bound on the cost of PAIRING.");
av.step();

//frame5
av.umsg("In terms of asymptotic notation, assuming that we can find one method to convert the inputs to PAIRING into inputs to SORTING fast enough, and a second method to convert the result of SORTING back to the correct result for PAIRING fast enough, then the asymptotic cost of PAIRING cannot be more than the cost of SORTING. ");
av.step();

//frame6
av.umsg("In this case, there is little work to be done to convert from PAIRING to SORTING, or to convert the answer from SORTING back to the answer for PAIRING, so the dominant cost of this solution is performing the sort operation. Thus, an upper bound for PAIRING is in O(nlogn).");
av.step();

//frame 7
av.umsg("In this case, there is little work to be done to convert from PAIRING to SORTING, or to convert the answer from SORTING back to the answer for PAIRING, so the dominant cost of this solution is performing the sort operation. Thus, an upper bound for PAIRING is in O(nlogn).");
av.step();

//frame 8
av.umsg(Frames.addQuestion("q31"));
av.step();

//frame 9
av.umsg(Frames.addQuestion("q32"));
av.step();

//frame 10
av.umsg(Frames.addQuestion("q33"));
av.step();

//frame 11
//graph rectangle 1
av.umsg("Pairing of two arrays by reduction to sorting");
input1 = new Array(23,42,17,93,88,12,57,90);
input2 = new Array(48,59,11,89,12,91,64,34);
var r1 = av.g.rect(15, yoffset,550,40);
iparr1 = av.ds.array(input1,  {left: 17, top: yoffset - 10});
for(var i=0;i<input1.length;i++)
    iparr1.css(i,{"background-color":"AntiqueWhite"});
iparr2 = av.ds.array(input2,  {left: 317, top: yoffset - 10});
for(var i=0;i<input2.length;i++)
    iparr2.css(i,{"background-color":"AntiqueWhite"});
av.label("<b>Arrays to be paired</b>",{left: 200, top: yoffset - 32});
av.step();

//frame 12
av.umsg("The arrays are fed as input to the sorting problem directly");
var r12 = av.g.rect(15,80 + yoffset,550,40);
iparr1 = av.ds.array(input1,  {left: 17, top: 70+ yoffset});
for(var i=0;i<input1.length;i++)
    iparr1.css(i,{"background-color":"AntiqueWhite"});
iparr2 = av.ds.array(input2,  {left: 317, top: 70 + yoffset});
  for(var i=0;i<input2.length;i++)
iparr2.css(i,{"background-color":"AntiqueWhite"});
var l11 = av.g.line(300, yoffset + 40,300,80+ yoffset);
av.label("<b>Transformation - Identity function Cost= O(n)</b>",{left: 310, top: 27 + yoffset});
av.step();

//frame13
av.umsg(Frames.addQuestion("q4"));
av.step();

//frame 14
av.umsg(""); //get rid the problem which is diplayed
var l1= av.g.line(120,120 + yoffset,120,140 + yoffset);
var l2= av.g.line(420,120 + yoffset,420,140 + yoffset);
var r2 = av.g.rect(90,140 + yoffset,60,30);
var r3 = av.g.rect(390,140 + yoffset,60,30);
av.label("<b>Sort</b>",{left: 105, top: 130 + yoffset});
av.label("<b>Sort</b>",{left: 405, top: 130 + yoffset});
var l3=av.g.line(120,170 + yoffset,120,190 + yoffset);
var l4= av.g.line(420,170 + yoffset,420,190 + yoffset);
sort1 = new Array(12,17,23,42,57,88,90,93);
sort2 = new Array(11,12,34,48,59,64,89,91);
var r4 = av.g.rect(15,190 + yoffset,550,40);
sortarr1 = av.ds.array(sort1, {left: 17, top: 180 + yoffset});
av.label("Sorted arrays",{left:250,top:150 + yoffset});
sortarr2 = av.ds.array(sort2, {left: 317, top: 180 + yoffset});
av.step()

//frame 15
//pair
var r4 = av.g.rect(15,260 + yoffset,550,40);
var l12 = av.g.line(300,230 + yoffset,300,260 + yoffset);
av.label("<b>Reverse Transformation Cost= O(n)</b>",{left: 310, top: 220 + yoffset});
oparr= av.ds.array([" "," "," "," "," "," "," "," "],  {left: 140, top: 250 + yoffset});
av.step();

//frame 16-25
//show pair step by step
for(var i=0;i<8;i++){
    if(i>0){
        sortarr1.unhighlight(i-1);
        sortarr2.unhighlight(i-1);
        oparr.unhighlight(i-1);
    }
    var str="&nbsp"+sortarr1.value(i)+","+sortarr2.value(i)+"&nbsp";
    oparr.value(i,str);
    sortarr1.highlight(i);
    sortarr2.highlight(i);
    oparr.highlight(i);
    av.umsg("Pairing "+sortarr1.value(i)+" with "+sortarr2.value(i));
    if (i == 2){
        //frame 18
        av.umsg(Frames.addQuestion("q5"));
        av.step();
        //frame 19
        av.umsg("");
    }
    av.step()
}
//frame 26
//result
av.umsg("The output array gives the pairing" );
sortarr1.unhighlight(i-1);
sortarr2.unhighlight(i-1);
oparr.unhighlight(i-1);
av.step();
av.umsg("Cost of pairing = O(n) + Cost of sorting");
var l13 = av.g.line(300,300 + yoffset,300,330 + yoffset);
l13.show();
var oparr2= av.ds.array([" "," "," "," "," "," "," "," "],  {left: 140, top: 315 + yoffset});
for(var i=0;i<8;i++)
    oparr2.value(i,oparr.value(i));
for(var i=0;i<8;i++)
    oparr2.css(i,{"background-color":"#CCFF99"});
av.label("<b>Paired array</b>",{left:510,top:310 + yoffset});
av.step();

av.recorded();
});
