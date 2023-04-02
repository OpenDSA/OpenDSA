$(document).ready(function(){
  "use strict";

  var av_name = "TwoMulExampleFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("As an example of reduction, consider the simple problem of multiplying two $n$-digit numbers.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("mult"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("adding"));
  av.step();

  // Frame 4
  av.umsg("Next we ask the question: Is squaring an $n$-digit number as difficult as multiplying two $n$-digit numbers? We might hope that something about this special case will allow for a faster algorithm than is required by the more general multiplication problem. However, a simple reduction proof serves to show that squaring is as hard as multiplying.");
  av.step();

  // Frame 5
  av.umsg("The key to the reduction is the following formula:<br/><br/>$\\qquad X×Y = [(X+Y)^2 − (X−Y)^2] / 4$<br/><br/>The significance of this formula is that it allows us to convert an arbitrary instance of multiplication to a series of operations involving three addition/subtractions (each of which can be done in linear time), two squarings, and a division by 4.");
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("squaring"));
  av.step();

  // Frame 7
  av.umsg("Our next example of reduction concerns the multiplication of two $n \\times n$ matrices. For this problem, we will assume that the values stored in the matrices are simple integers and that multiplying two simple integers takes constant time (because multiplication of two int variables takes a fixed number of machine instructions). ");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("matmult"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("fastmat"));
  av.step();

  // Frame 10
  av.umsg("Now, consider the case of multiplying two symmetric matrices. A symmetric matrix is one in which entry $ij$ is equal to entry $ji$. That is, the upper-right triangle of the matrix is a mirror image of the lower-left triangle.<br/><br/>Is there something about this restricted case that allows us to multiply two symmetric matrices faster than in the general case? The answer is no, as can be seen by the following reduction.");
  av.step();

  // Frame 11
  av.umsg("Assume that we have been given two n×n matrices <b>A</b> and <b>B</b>. We can construct a <b>2n×2n</b> symmetric matrix from an arbitrary matrix <b>A</b> as follows:");
  var data1=[[0, "A"],["A<sup>T</sup>",0]];
  var a5= av.ds.matrix(data1,{style:"matrix",left:50,top:50});
  var a6 = av.label("Here 0 stands for an n×n matrix composed of zero values, A is the original matrix, and AT stands for the transpose of matrix A. <br><br>Note that the resulting matrix is now symmetric.",{left:0, top: 140});
  av.step();
  a6.hide();

  // Frame 12
  av.umsg(Frames.addQuestion("symmat"));
  var data2 = [[0, "B<sup>T</sup>"],["B", 0]];
  var data3 = [["AB", "0"],[0, "A<sup>T</sup>B<sup>T</sup>"]];
  var a7= av.ds.matrix(data2,{style:"matrix",left:150,top:50});
  var a8 = av.label("=",{left:260, top: 80});
  var a9= av.ds.matrix(data3,{style:"matrix",left:290,top:50});
  var a10 = av.label("In the above formula, AB is the result of multiplying matrices A and B together.",{left:0, top: 140});
  av.step();

  // Frame 13
  av.umsg("This slideshow illustrates this reduction process.<br/>The following two matrices need to be multiplied.");
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

  var x;
  var y;
  var mat1,mat2;
  var mat1data;
  var mat2data;
  x = 0; y = 0;
  mat1data=[[2,3],[6,7],[4,9]];
  mat2data=[[1,10,5],[12,8,11]];
  mat1 = av.ds.matrix(mat1data,{style:"matrix",left:x+80,top:y+0});
  for(var i=0;i<3;i++)
    for(var j=0;j<2;j++)
      mat1.css(i,j,{"background-color":"Wheat"});
  mat1.show();
  var a11= av.label("X",{left:x+240,top:y+10});
  mat2 = av.ds.matrix(mat2data,{style:"matrix",left:x+330,top:y+0});
  for(var i=0;i<2;i++)
    for(var j=0;j<3;j++)
      mat2.css(i,j,{"background-color":"PowderBlue"});
  mat2.show();
  av.step();

  // Frame 14
  av.umsg ("Each of the two matrices are transformed into corresponding symmeric matrices by using its transpose as shown.");
  var r21 = av.g.rect(50,200,435,200);
  r21.show();
  var l11 = av.g.line(70+50,130,70+50,150, {"stroke-width": 3});
  l11.show();
  var l12 = av.g.line(70+50,170,70+50,200, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
  l12.show();
  var l21 = av.g.line(350+50,110,350+50,150, {"stroke-width": 3});
  l21.show();
  var l22 = av.g.line(350+50,170,350+50,200, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
  l22.show();
  var r2 = av.g.rect(50,150,200,20);
  var a12 = av.label("Transformation (Cost:O(mn))",{left:55,top:135});
  r2.show();
  var r3 = av.g.rect(250,150,200,20);
  var b0 =av.label("Transformation (Cost:O(mn))",{left:255,top:135});
  r3.show();
  var mat1Transformed = transform(mat1data,3,2,0); 
  var mat1TransDisp = av.ds.matrix(mat1Transformed,{style:"matrix",left:x+60,top:y+200});
  for(var i=0;i<3;i++)
    for(var j=3;j<5;j++)
      mat1TransDisp.css(i,j,{"background-color":"Wheat"});
  for(var i=3;i<5;i++)
    for(var j=0;j<3;j++)
      mat1TransDisp.css(i,j,{"background-color":"Khaki"});
  mat1TransDisp.show();
  var a13 =av.label("X",{left:x+260,top:y+270});
  var mat2Transformed = transform(mat2data,2,3,1); 
  var mat2TransDisp = av.ds.matrix(mat2Transformed,{style:"matrix",left:x+300,top:y+200});
  for(var i=0;i<3;i++)
    for(var j=3;j<5;j++)
      mat2TransDisp.css(i,j,{"background-color":"LightSteelBlue"});
  for(var i=3;i<5;i++)
    for(var j=0;j<3;j++)
      mat2TransDisp.css(i,j,{"background-color":"PowderBlue"});
  mat2TransDisp.show();
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("symtrans"));
  av.step();

  // Frame 16
  av.umsg("Then the two symmetric matrices are multiplied.");
  var r31 = av.g.rect(535+50,200,200,220);
  r31.show();
  var b2 = av.g.line(500,300,520+50,300, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
  var b1 =av.label("Multiply",{left:500,top:300}); 
  var product = multiply(mat1Transformed,mat2Transformed,5,5,5); 
  var productDisp = av.ds.matrix(product,{style:"matrix",left:x+600,top:y+200});
  productDisp.show();
  av.step();

  // Frame 17
  av.umsg("The 3*3 matrix in the upper left corner gives the output array.");
  for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
      productDisp.css(i,j,{"background-color":"#CCFF99"});
  var r32 = av.g.rect(560+50,220,95,100);
  r31.show();
  var r4 = av.g.rect(600,150,200,20);
  var a14= av.label("Reverse Transform (O(mn))",{left:555+50,top:135});
  r4.show();
  var b3 = av.g.line(640+50,150,640+50,120, {"stroke-width": 3, "arrow-end": "classic-wide-long"});
  b3.show();
  var l32 = av.g.line(640+50,170,640+50,200, {"stroke-width": 3});
  l32.show();
  av.step();

  // Frame 18
  av.umsg("Total cost $= O(mn)$ plust the cost of SYMMETRIC MULTIPLY.");
  var verifyprod = multiply(mat1data,mat2data,3,3,2); 
  var verifyprodDisp = av.ds.matrix(verifyprod,{style:"matrix",left:x+650,top:y+0});
  for(var i=0;i<3;i++)
    for(var j=0;j<3;j++)
      verifyprodDisp.css(i,j,{"background-color":"#CCFF99"});
  verifyprodDisp.show();
  var a15 = av.label("Output Array", {left: 660, top: -20});
  av.step();

  // Frame 19
  av.umsg("The transpose operation takes position $ij$ of the original matrix and places it in position $ji$ of the transpose matrix. This can easily be done in $n^2$ time for an $n \\times n$ matrix.");
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


  // Frame 20
  av.umsg("<b>The Cost of Making a Simple Polygon</b><br><br>SIMPLE POLYGON: Given a set of $n$ points in the plane, find a simple polygon with those points as vertices. (Here, simple means that no lines cross.) We will show that SORTING $\\leq_{O(n)}$ SIMPLE POLYGON.");
  av.step();

  // Frame 21
  av.umsg("We start with an instance of SORTING: ${x_1, x_2, \\cdots, x_n}$. In linear time, find $M = \\max|x_i|$. Let $C$ be a circle centered at the origin, of radius $M$.<br\>We will generate an instance of SIMPLE POLYGON by replacing each value in the array to be sorted with a corresponding point defined as $(x_1, \\sqrt{M^2 - x_i^2}), ..., (x_n, \\sqrt{M_2 - x_n^2})$.");
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
  av.label("Input to SORTING: the values 5, -3, 2, 0, 10. When converted to points, they fall on a circle as shown.", {left: 0, top:480});
  av.step();

  // Frame 22
  av.umsg("All of these points fall on C. Furthermore, when we find a simple polygon, the points all fall along the circle in sort order. This is because the only simple polygon having all of its points on C as vertices is the convex one. Therefore, by the Lower Bound Theorem, SIMPLE POLYGON is in $\\Omega(n \\log n)$.");
  av.step();

  // Frame 23
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
