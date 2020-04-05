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
av.umsg("This module introduces an important concept for understanding the relationships between problems, called reduction. Reduction allows us to solve one problem in terms of another. Equally importantly, when we wish to understand the difficulty of a problem, reduction allows us to make relative statements about upper and lower bounds on the cost of a problem (as opposed to an algorithm or program).");
av.displayInit();

//frame 2
av.umsg(Frames.addQuestion("q0"));
av.step();

//frame 3
av.umsg("Because the concept of a problem is discussed extensively in this chapter, we want notation to simplify problem descriptions. Throughout this chapter, a problem will be defined in terms of a mapping between inputs and outputs, and the name of the problem will be given in all capital letters. Thus, a complete definition of the sorting problem could appear as follows:");
var l1 = av.label("<br><br><b>Sorting </b>"
+"<br><br><b>Input:</b>" + "A sequence of integers x0,x1,x2,…,xn−1." + 
"<br><br><b>Output:</b>" + "A permutation y0,y1,y2,…,yn−1 of the sequence such that yi ≤ yj whenever i < j.",{top:60});
av.step();
l1.hide();


//frame 4
av.umsg("Here is a visual explanation about Sorting Problem. We Have:" + "<br><br><b><u>Input:</u></b>"+"An unsorted array of records: R1, R2, ..., Rn with associated key values: K1, K2, ..., kn");
//left array
var arr;
var arr_values = [];
for (var i = 0; i < 6; i++) {
    arr_values.push("K" + (i + 1));
  }
//rectangle
var rect = av.g.rect(250, 200, 75, 50);
arr = av.ds.array(arr_values, {left: 0, top: 200, indexed: true});
var line1 = av.g.line(188, 230, 250, 230);
var rectLabel = av.label("Sorting" + "<br>Problem",
                            {top: 190, left: 260});
var label1 = av.label("input", {top: 190, left: 200});
av.step();


//frame 5
av.umsg("Here is a visual explanation about Sorting Problem. We Have:" + "<br><br><b><u>Input:</u></b>"+"An unsorted array of records: R1, R2, ..., Rn with associated key values: K1, K2, ..., kn" + "<br><br><b><u>Output:</u></b>" + "the permutation Ks1, Ks2, ..., Ksn such that Ks1 <= Ks2 <= ... <= Ksn.");
var line2 = av.g.line(325, 230, 395, 230);
var label2 =  av.label("output", {top: 190, left: 338});
var arr_values_out = [];
//right array
for (var i = 0; i < 6; i++) {
    arr_values_out.push("Ks" + (i + 1));
}
var arr2 = av.ds.array(arr_values_out, {left: 395, top: 200, indexed: true});
av.step();

//frame 6
av.umsg("Here we see an example of a Sorting problem instance in which we have initialized an unsorted array and we obtained the sorted array as a result.");
var count = 0;
while (count < 6) {
    var value = Math.round(Math.random() * 5);
    if (arr_values.indexOf(value) === -1) {
      arr_values[count] = value;
      count++;
    }
}
arr.hide();
arr = av.ds.array(arr_values, {left: 0, top: 200, indexed: false});
arr2.hide();
arr2 = av.ds.array([0,1,2,3,4,5], {left: 395, top: 200, indexed: false});
av.step();

//frame 7
av.umsg(Frames.addQuestion("q01"));
av.step();
arr.hide();
arr2.hide();
line1.hide();
line2.hide();
rect.hide();
label1.hide();
label2.hide();
rectLabel.hide();

//frame 8
av.umsg("When you buy or write a program to solve one problem, such as sorting, you might be able to use it to help solve a different problem. This is known in software engineering as software reuse. To illustrate this, let us consider another problem.");
av.step();


//frame 9
av.umsg(Frames.addQuestion("q02"));
av.step();

//frame 10
av.umsg("<b>PAIRING</b>"+"<br><br><br><b>Input: </b>"+"Two sequences of integers <b>X</b> = (x0,x1,...,xn−1) and <b>Y</b> = (y0,y1,...,yn−1)."+"<br><br><b>Output: </b>"+"A pairing of the elements in the two sequences such that the least value in <b>X</b> is paired with the least value in <b>Y</b>, the next least value in <b>X</b> is paired with the next least value in Y and so on.");
var verRect1 = av.g.rect(30, 180, 40, 250);
var verRect2 = av.g.rect(230, 180, 40, 250);
var l23 = av.label("23", {top: 175, left: 40});
var r48 = av.label("48", {top: 175, left: 240});
var arrow11 = av.g.line(70, 200, 230, 410, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow12 = av.g.line(230, 410, 70, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var l42 = av.label("42", {top: 205, left: 40});
var r59 = av.label("59", {top: 205, left: 240});
var arrow21 = av.g.line(70, 230, 230, 200, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow22 = av.g.line(230, 200, 70, 230, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var l17 = av.label("17", {top: 235, left: 40});
var r11 = av.label("11", {top: 235, left: 240});
var arrow31 = av.g.line(70, 255, 230, 320, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow32 = av.g.line(230, 320, 70, 255, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var l93 = av.label("93", {top: 265, left: 40});
var r89 = av.label("89", {top: 265, left: 240});
var arrow41 = av.g.line(70, 290, 230, 350, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow42 = av.g.line(230, 350, 70, 290, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var l88 = av.label("88", {top: 295, left: 40});
var r12 = av.label("12", {top: 295, left: 240});
var arrow51 = av.g.line(70, 320, 230, 380, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow52 = av.g.line(230, 380, 70, 320, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var l12 = av.label("12", {top: 325, left: 40});
var r91 = av.label("91", {top: 325, left: 240});
var arrow61 = av.g.line(70, 350, 230, 255, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow62 = av.g.line(230, 255, 70, 350, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var l57 = av.label("57", {top: 355, left: 40});
var r64 = av.label("64", {top: 355, left: 240});
var arrow71 = av.g.line(70, 380, 230, 230, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow72 = av.g.line(230, 230, 70, 380, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var l90 = av.label("90", {top: 385, left: 40});
var r34 = av.label("34", {top: 385, left: 240});
var arrow81 = av.g.line(70, 410, 230, 290, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var arrow82 = av.g.line(230, 290, 70, 410, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
var caption02 = av.label("Figure 0.2.1: An illustration of PAIRING. The two lists of numbers are paired up so that the least values from each list make a pair, the next smallest values from each list make a pair, and so on.", {top: 420, left: 0});
av.step();

//frame 11
verRect1.hide();
verRect2.hide();
l23.hide();
l42.hide();
l17.hide();
l93.hide();
l88.hide();
l12.hide();
l57.hide();
l90.hide();
r48.hide();
r59.hide();
r11.hide();
r89.hide();
r12.hide();
r91.hide();
r64.hide();
r34.hide();
arrow11.hide();
arrow21.hide();
arrow31.hide();
arrow41.hide();
arrow51.hide();
arrow61.hide();
arrow71.hide();
arrow81.hide();
arrow12.hide();
arrow22.hide();
arrow32.hide();
arrow42.hide();
arrow52.hide();
arrow62.hide();
arrow72.hide();
arrow82.hide();
caption02.hide();
av.umsg(Frames.addQuestion("q1"));
av.step();

//frame12
av.umsg(Frames.addQuestion("q2"));
av.step();

//frame13
var ex = av.label("In terms of asymptotic notation, assuming that we can find one method to convert the inputs to PAIRING into inputs to SORTING fast enough, and a second method to convert the result of SORTING back to the correct result for PAIRING fast enough, then the asymptotic cost of PAIRING cannot be more than the cost of SORTING." + "<br><br>In this case, there is little work to be done to convert from PAIRING to SORTING, or to convert the answer from SORTING back to the answer for PAIRING, so the dominant cost of this solution is performing the sort operation. Thus, an upper bound for PAIRING is in O(nlogn).", {top: 10, left: 0});
av.umsg(Frames.addQuestion("q31"));
av.step();


//frame 14
av.umsg(Frames.addQuestion("q32"));
av.step();

//frame 15
av.umsg(Frames.addQuestion("q33"));
av.step();
ex.hide();

//frame 16
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

//frame 17
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

//frame18
av.umsg(Frames.addQuestion("q4"));
var textlabel = av.label("Reduction is a three-step process. The first step is to convert an instance of PAIRING into two instances of SORTING. The conversion step in this example is not very interesting; it simply takes each sequence and assigns it to an array to be passed to SORTING. The second step is to sort the two arrays (i.e., apply SORTING to each array). The third step is to convert the output of SORTING to the output for PAIRING. This is done by pairing the first elements in the sorted arrays, the second elements, and so on.",{left: 0, top: 130 + yoffset});
av.step();
textlabel.hide();

//frame 19
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

//frame 20
//pair
var r4 = av.g.rect(15,260 + yoffset,550,40);
var l12 = av.g.line(300,230 + yoffset,300,260 + yoffset);
av.label("<b>Reverse Transformation Cost= O(n)</b>",{left: 310, top: 220 + yoffset});
oparr= av.ds.array([" "," "," "," "," "," "," "," "],  {left: 140, top: 250 + yoffset});
av.step();

//frame 21-30
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
//frame 31
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
