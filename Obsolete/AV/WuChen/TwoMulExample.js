$(document).ready(function(){
    "use strict";

    var av_name = "TwoMulExample";
    var av = new JSAV(av_name);


var Frames = PIFRAMES.init(av_name);
// Load the config object with interpreter and code created by odsaUtils.js
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;




//frame 1
av.umsg("As an example of reduction, consider the simple problem of multiplying two n-digit numbers. <br>The standard long-hand method for multiplication is to multiply the last digit of the first number by the second number (taking Θ(n) time), multiply the second digit of the first number by the second number (again taking Θ(n) time), and so on for each of the n digits of the first number. Finally, the intermediate results are added together.");
av.displayInit();

//frame 2
av.umsg(Frames.addQuestion("q1"));
av.step();

//frame 3
av.umsg("Note that adding two numbers of length M and N can easily be done in Θ(M+N) time. Because each digit of the first number is multiplied against each digit of the second, this algorithm requires Θ(n<sup>2</sup>) time. Asymptotically faster (but more complicated) algorithms are known, but none is so fast as to be in O(n).");
av.step();

//frame 4
av.umsg(Frames.addQuestion("q2"));
av.step();

//frame 5
av.umsg("Next we ask the question: Is squaring an n-digit number as difficult as multiplying two n-digit numbers? We might hope that something about this special case will allow for a faster algorithm than is required by the more general multiplication problem. However, a simple reduction proof serves to show that squaring is as hard as multiplying.");
av.step();

//frame 6
av.umsg(Frames.addQuestion("q3"));
av.step();

//frame 7 
av.umsg("The key to the reduction is the following formula:");
var a0 =av.label("<b>X×Y = [(X+Y)<sup>2</sup>−(X−Y)<sup>2</sup>] / 4 </b>",{left:100, top: 0});
var a1 =av.label("The significance of this formula is that it allows us to convert an arbitrary instance of multiplication to a series of operations involving three addition/subtractions (each of which can be done in linear time), two squarings, and a division by 4.",{left: 0, top: 40});
av.step();
a0.hide();
a1.hide();


//frame 8
av.umsg("This is because: ");
var a2 =av.label("<b>X×Y = [(X+Y)<sup>2</sup>−(X−Y)<sup>2</sup>] / 4 </b>",{left:70, top: 0});
var a3 =av.label("<b>(X+Y)<sup>2</sup>−(X−Y)<sup>2</sup> = X<sup>2</sup> + 2XY + Y<sup>2</sup> - (X<sup>2</sup> - 2XY + Y<sup>2</sup>) = 4XY</b>",{left:70, top: 40});
var a4 =av.label("Note that the division by 4 can be done in linear time (simply convert to binary, shift right by two digits, and convert back). This reduction shows that if a linear time algorithm for squaring can be found, it can be used to construct a linear time algorithm for multiplication.",{left:0, top: 80});
av.step();

//frame 9
av.umsg(Frames.addQuestion("q4"));
av.step();
a2.hide();
a3.hide();
a4.hide();

//frame 10
av.umsg("Our next example of reduction concerns the multiplication of two n×n matrices. For this problem, we will assume that the values stored in the matrices are simple integers and that multiplying two simple integers takes constant time (because multiplication of two int variables takes a fixed number of machine instructions). ");
av.step();

//frame 11
av.umsg("The standard algorithm for multiplying two matrices is to multiply each element of the first matrix's first row by the corresponding element of the second matrix's first column, then adding the numbers. This takes Θ(n) time. Each of the n<sup>2</sup> elements of the solution are computed in similar fashion, requiring a total of Θ(n<sup>3</sup>) time. Faster algorithms are known (see Strassen's algorithm), but none are so fast as to be in O(n<sup>2</sup>).");
av.step();

//frame 12
av.umsg(Frames.addQuestion("q5"));
av.step();

//frame 13
av.umsg(Frames.addQuestion("q6"));
av.step();

//frame 14
av.umsg("Now, consider the case of multiplying two symmetric matrices. A symmetric matrix is one in which entry <b>ij</b> is equal to entry <b>ji</b>; that is, the upper-right triangle of the matrix is a mirror image of the lower-left triangle. ");
av.step();

//frame 15
av.umsg("Is there something about this restricted case that allows us to multiply two symmetric matrices faster than in the general case? The answer is no, as can be seen by the following reduction.");
av.step();

//frame 16
av.umsg(Frames.addQuestion("q7"));
av.step();

//frame 17
av.umsg("Assume that we have been given two n×n matrices <b>A</b> and <b>B</b>. We can construct a <b>2n×2n</b> symmetric matrix from an arbitrary matrix <b>A</b> as follows:");
var data1=[[0, "A"],["A<sup>T</sup>",0]];
var a5= av.ds.matrix(data1,{style:"matrix",left:50,top:50});
var a6 = av.label("Here 0 stands for an n×n matrix composed of zero values, A is the original matrix, and AT stands for the transpose of matrix A. <br><br>Note that the resulting matrix is now symmetric.",{left:0, top: 140});
av.step();
a6.hide();

//frame 18
av.umsg("We can convert matrix B to a symmetric matrix in a similar manner. If symmetric matrices could be multiplied quickly (in particular, if they could be multiplied together in Θ(n<sup>2</sup>) time), then we could find the result of multiplying two arbitrary n×n matrices in Θ(n<sup>2</sup>) time by taking advantage of the following observation:");
var data2 = [[0, "B<sup>T</sup>"],[0,"A<sup>T</sup>B<sup>T</sup>"]];
var data3 = [["AB", "0"],["B",0]];
var a7= av.ds.matrix(data2,{style:"matrix",left:150,top:50});
var a8 = av.label("=",{left:260, top: 80});
var a9= av.ds.matrix(data3,{style:"matrix",left:290,top:50});
var a10 = av.label("In the above formula, AB is the result of multiplying matrices A and B together.",{left:0, top: 140});
av.step();

//frame 19
av.umsg(Frames.addQuestion("q8"));
av.step();
a5.hide();
a7.hide();
a8.hide();
a9.hide();
a10.hide();




//function for matrix in the following reduction
function transpose(matrix,row,col){
    var result = new Array(col);;
    for(var i=0;i<col;i++)
      result[i]=new Array(row); 
    for(var i=0;i<col;i++){
      for(var j=0;j<row;j++){
        result[i][j] = matrix[j][i];
      }
    }
    return result;
  }

  function zeroMat(row,col){
    var result = new Array(row);
    for(var i=0;i<row;i++)
      result[i]=new Array(col); 
    for(var i=0;i<row;i++)
      for(var j=0;j<col;j++)
        result[i][j]=0;
    return result;
  }

  function transform(matrix,row,col,flag){
    var num = row+col;
    var result = zeroMat(num,num);
    var matrixT = transpose(matrix,row,col) ;
    for(var i=0;i<row;i++){
      for(var j=0;j<col;j++){
        if(flag==0){
          result[i][row+j]=matrix[i][j];
          result[row+j][i]=matrixT[j][i];
        }
        else if(flag==1) {
          result[j][col+i]=matrixT[j][i];
          result[col+i][j]=matrix[i][j];
        }
      }
    }
    return result;
  }

  function multiply(mat1,mat2,row,col,mid){
    var result = zeroMat(row,col);
    for(var i=0;i<row;i++)
      for(var j=0;j<col;j++)
        for(var k=0;k<mid;k++)
          result[i][j]+=mat1[i][k]*mat2[k][j];
    return result;
  }

//frame 20
av.umsg("This slideshow illustrates this reduction process. <br> The following two matrices need to be multiplied");
var x;
var y;
var mat1,mat2;
var mat1data;
var mat2data;
x = 0; y = 0;
mat1data=[[2,3],[6,7],[4,9]];
mat2data=[[1,10,5],[12,8,11]];
mat1 = av.ds.matrix(mat1data,{style:"matrix",left:x+30,top:y+0});
for(var i=0;i<3;i++)
    for(var j=0;j<2;j++)
        mat1.css(i,j,{"background-color":"Wheat"});
mat1.show();
var a11= av.label("X",{left:x+190,top:y+10});
mat2 = av.ds.matrix(mat2data,{style:"matrix",left:x+280,top:y+0});
for(var i=0;i<2;i++)
    for(var j=0;j<3;j++)
      mat2.css(i,j,{"background-color":"PowderBlue"});
mat2.show();
av.step();



//frame 21
av.umsg ("Each of the two matrices are transformed into corresponding symmeric matrices by using its transpose as shown.");
var r21 = av.g.rect(0,200,435,200);
r21.show();
var l11 = av.g.line(70,130,70,150, {"stroke-width": 3});
l11.show();
var l12 = av.g.line(70,170,70,200, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
l12.show();
var l21 = av.g.line(350,110,350,150, {"stroke-width": 3});
l21.show();
var l22 = av.g.line(350,170,350,200, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
l22.show();
var r2 = av.g.rect(0,150,200,20);
var a12 = av.label("Transformation (Cost:O(mn))",{left:5,top:135});
r2.show();
var r3 = av.g.rect(250,150,200,20);
var b0 =av.label("Transformation (Cost:O(mn))",{left:255,top:135});
r3.show();
var mat1Transformed = transform(mat1data,3,2,0); 
var mat1TransDisp = av.ds.matrix(mat1Transformed,{style:"matrix",left:x+10,top:y+200});
for(var i=0;i<3;i++)
    for(var j=3;j<5;j++)
      mat1TransDisp.css(i,j,{"background-color":"Wheat"});
for(var i=3;i<5;i++)
    for(var j=0;j<3;j++)
      mat1TransDisp.css(i,j,{"background-color":"Khaki"});
mat1TransDisp.show();
var a13 =av.label("X",{left:x+210,top:y+270});
var mat2Transformed = transform(mat2data,2,3,1); 
var mat2TransDisp = av.ds.matrix(mat2Transformed,{style:"matrix",left:x+250,top:y+200});
for(var i=0;i<3;i++)
    for(var j=3;j<5;j++)
      mat2TransDisp.css(i,j,{"background-color":"LightSteelBlue"});
for(var i=3;i<5;i++)
    for(var j=0;j<3;j++)
      mat2TransDisp.css(i,j,{"background-color":"PowderBlue"});
  mat2TransDisp.show();
av.step();

//frame 22
av.umsg(Frames.addQuestion("q9"));
av.step();

//frame 23
av.umsg("Then the two symmetric matrices are multiplied.");
var r31 = av.g.rect(535,200,200,220);
r31.show();
var b2 = av.g.line(450,300,520,300, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
var b1 =av.label("Multiply",{left:450,top:300}); 
var product = multiply(mat1Transformed,mat2Transformed,5,5,5); 
var productDisp = av.ds.matrix(product,{style:"matrix",left:x+550,top:y+200});
productDisp.show();
av.step();

  // frame 24
av.umsg("The 3*3 matrix in the upper left corner gives the output array.");
for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
      productDisp.css(i,j,{"background-color":"#CCFF99"});
var r32 = av.g.rect(560,220,95,100);
r31.show();
var r4 = av.g.rect(550,150,200,20);
var a14= av.label("Reverse Transform (O(mn))",{left:555,top:135});
r4.show();
var b3 = av.g.line(640,150,640,120, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
b3.show();
var l32 = av.g.line(640,170,640,200, {"stroke-width": 3});
l32.show();
av.step();

//frame 25
av.umsg("Total cost = O(mn) + cost of symmetric multiply.");
var verifyprod = multiply(mat1data,mat2data,3,3,2); 
var verifyprodDisp = av.ds.matrix(verifyprod,{style:"matrix",left:x+600,top:y+0});
for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
      verifyprodDisp.css(i,j,{"background-color":"#CCFF99"});
verifyprodDisp.show();
var a15 = av.label("Output Array", {left: 610, top: -15});
av.step();

//frame 26
av.umsg("The transpose operation takes position ij of the original matrix and places it in position ji of the transpose matrix. This can easily be done in n2 time for an n×n matrix.");
av.step();
mat1.hide();
mat2.hide();
a11.hide();
r21.hide();
l11.hide();
l12.hide();
l21.hide();
l22.hide();
r2.hide();
a12.hide();
r3.hide();
mat1TransDisp.hide();
a13.hide();
mat2TransDisp.hide();
r31.hide();
l21.hide();
verifyprodDisp.hide();
l32.hide();
r32.hide();
r4.hide();
a14.hide();
productDisp.hide();
a15.hide();
b0.hide();
b1.hide();
b2.hide()
b3.hide();


//frame 27
av.umsg("<b>Bounds Theorems</b> <br><br> we will use the following notation: ≤<sub>O(g(n))</sub> means that a reduction can be done with transformations that cost O(g(n))");
av.step();

//frame 28
av.umsg("<b>Lower Bounds Theorem</b>: If P<sub>1</sub> ≤<sub>O(g(n))</sub>, then there is a lower bound of Ω(h(n)) on the time complexity of P1, and g(n)=o(h(n)), then there is a lower bound of Ω(h(n)) on P2. (Notice little-oh, not big-Oh.) <br><br>Example: SORTING ≤<sub>O(n)</sub> PAIRING, because g(n)=n, h(n)=nlogn, and g(n)=o(h(n)). The Lower Bound Theorem gives us an Ω(nlogn) lower bound on PAIRING. <br><br>This also goes the other way.");
av.step();

//frame 29
av.umsg(Frames.addQuestion("q10"));
av.step();

//frame 30
av.umsg(Frames.addQuestion("q11"));
av.step();

//frame31
av.umsg("<b>Upper Bounds Theorem</b>:  If P2 has time complexity O(h(n)) and P1 ≤<sub>O(g(n))</sub> P2, then P1 has time complexity O(g(n)+h(n)). <br><br>So, given good transformations, both problems take at least Ω(P1) and at most O(P2).");
av.step();

//frame 32
av.umsg(Frames.addQuestion("q12"));
av.step();

//frame 33
av.umsg("<b>The Cost of Making a Simple Polygon</b><br><br>SIMPLE POLYGON: Given a set of n points in the plane, find a simple polygon with those points as vertices. (Here, simple means that no lines cross.) We will show that SORTING ≤<sub>O(n)</sub> SIMPLE POLYGON.");
av.step();

//frame 34
av.umsg("We start with an instance of SORTING: {x<sub>1</sub>,x<sub>2</sub>,⋯,x<sub>n</sub>}. In linear time, find M=max|x<sub>i</sub>|. Let C be a circle centered at the origin, of radius M. <br>We will generate an instance of SIMPLE POLYGON by replacing each value in the array to be sorted with a corresponding point defined as <b>{(x<sub>1</sub>, <sqrt>M<sup>2</sup>-x<sub>i</sub><sup>2</sup>),...,(x<sub>n</sub>, <sqrt>M<sup>2</sup>-x<sub>n</sub><sup>2</sup>)}</b>");
av.g.line(0, 450, 840, 450, {"stroke-width": 2});

  //y-axis
  av.g.line(410, 30, 410, 460, {"stroke-width": 2});

  var step = 40;
  var x1 = 370;
  var x2 = 450;
  var y = 50;

  //draw y-axis lines
  for(i = 0; i < 10; i++){
    av.g.line(400, y, 420, y, {"stroke-width": 0.8});
    y += step;
  }

  //draw x-axis lines
  for(i = 0; i < 10; i++){
    av.g.line(x1, 440, x1, 460, {"stroke-width": 0.8});
    av.g.line(x2, 440, x2, 460, {"stroke-width": 0.8});
    x1 -= step;
    x2 += step
  }


  //x-axis labels
  av.label("-3", {left: 285, top: 450});
  av.label("0",  {left: 405, top: 450});
  av.label("2",  {left: 485, top: 450});
  av.label("5",  {left: 605, top: 450});
  av.label("10", {left: 800, top: 450});

  //y-axis labels
  av.label("1", {left: 380, top: 385});
  av.label("2", {left: 380, top: 345});
  av.label("3", {left: 380, top: 305});
  av.label("9", {left: 380, top: 65});

  //(10, 0) to (-3,9)
  av.g.line(810, 450, 280, 72, {"stroke-width": 3, stroke:"blue"});

  //(-3,9) to (0, 100)
  av.g.line(280, 72, 410, 50, {"stroke-width": 3, stroke:"blue"});

  //(0, 100) to (2, 96)
  av.g.line(410, 50, 490, 58, {"stroke-width": 3, stroke:"blue"});

  //(2, 96) to (5, 75)
  av.g.line(490, 58, 610, 103, {"stroke-width": 3, stroke:"blue"});

  //(5, 75) to (10, 0)
  av.g.line(610, 103, 810, 450, {"stroke-width": 3, stroke:"blue"});

  //point labels and points
  av.label("(-3, $\\sqrt{91}$)", {left: 260, top: 20});
  av.label("(2, $\\sqrt{96}$)", {left: 490, top: 15});
  av.label("(5, $\\sqrt{75}$)", {left: 620, top: 70});

  av.g.circle(280, 72, 5, {fill: 'black'});  // -3,  91
  av.g.circle(410, 50, 5, {fill: 'black'});  //  0, 100
  av.g.circle(490, 58, 5, {fill: 'black'});  //  2,  96
  av.g.circle(610, 103, 5, {fill: 'black'}); //  5,  75
  av.g.circle(810, 450, 5, {fill: 'black'}); // 10,   0
  //formula for y
  // var y = 450 - Math.sqrt(400 - Math.pow((x - 410), 2));

  var poly = "M 10, 450 A 50 50 0 1 1 810 450";
  av.g.path(poly, {"stroke-width": 1, stroke: "gray"});
  av.label("Figure 0.2.3: Input to SORTING: the values 5, -3, 2, 0, 10. When converted to points, they fall on a circle as shown.", {left: 0, top:480});
av.step();

//frame 35
av.umsg("It is an important fact that all of these points fall on C. Furthermore, when we find a simple polygon, the points all fall along the circle in sort order. This is because the only simple polygon having all of its points on C as vertices is the convex one. Therefore, by the Lower Bound Theorem, SIMPLE POLYGON is in Ω(nlogn).");
av.step();

av.recorded();
});
