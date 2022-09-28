/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "ExampleDatabase";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

 // var theArray1 = ["", "", "", ""];
 // var theArray2 = ["", "", "", ""];
 // var theArray3 = ["", "", "", ""];
  
  var av = new JSAV(av_name);

   //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=250;
  var arrayTop=50;

  //to facilitate detection of pointers' top of the three matrices
  // MatrixCellHight i.e the step size is -30 so
  //the let poiter point to the top of the 4th element in the matrix
  //4th element = index(3) then pointerTopEqu=(MatrixPointerTopStart+(MatrixCellHight*index))= (-10+(-30*3))=-100;
  // in case of matrix the index is equals to the number of the array used i.e. index 3=matrix1_array[3]; so below in the top equation
  // we will use the number of the array of the matrix instead of the index
  //pointerTopEqu=pointerTop=(MatrixPointerTopStart+(MatrixCellHight*MartixArrayNo))= (-10+(-30*3))=-100;
  var MatrixPointerTopStart=-10;
  var MatrixCellHight=-30;
 // var Matrix1ArrayNo;
 // var Matrix2ArrayNo;
 // var Matrix3ArrayNO;
//  var pointerTop=0;

 /* var Matrix1PonterLeft=65;
  var Matrix1Ponterright=160;
  var Matrix2Ponterright=90;
  var Matrix3PonterLeft=30;
  var Matrix3Ponterright=140;*/

  //definning Matrix as a table
  var themMatrix1 = [["E-id","E-name"," E-salary"],[1,"ali","500"],[2,"adel","700"],[3,"khaled","1000"],[4,"morad","700"],[5,"Ahmed",300],[6,"Walid",1200]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });
 
  arrayLeft+=arrayWidth+arrayGap;
  var themMatrix2 =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewage","assiut"],["D","Natural gas","Cairo"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });
  
  arrayLeft+=arrayWidth+arrayGap;
  var themMatrix3 =[["EQ-id","EQ-name","EQ-cost"],["F512","skimmer",45000],["G920","trill",60000],["K344","crane",75000],["Z212","wench",80000]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });
 
 // to underline primary keys in all tables
matrx1._arrays[0].css([0], {"text-decoration": "underline"});
matrx2._arrays[0].css([0], {"text-decoration": "underline"});
matrx3._arrays[0].css([0], {"text-decoration": "underline"});
 
  // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

//pointer arrpws (lines) defined here used in the last slides
//main line 1 first relation coordinates
//all of the y-coordiates of both of main lines of the two relations are the same because both lines on the samee level exactly
var mainline1X1=335;
var mainline1Y1=160;
var mainline1X2=430;
var mainline1Y2=mainline1Y1;

//main line 2 second relation coordinates
var mainline2X1=800;
var mainline2Y1=mainline1Y1;
var mainline2X2=705;
var mainline2Y2=mainline1Y1;

//circles' variables around relations
var cx;
var cy;
var cRadius;

//two main lines
// main line first/second tables' relations
var line1 = av.g.line(mainline1X1,  mainline1Y1,  mainline1X2,  mainline1Y2,{opacity: 100, "stroke-width": 2});
// main line second/third tables' relations
var line2 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2,  mainline2Y2, {opacity: 100, "stroke-width": 2});

//cross foot first/second tables' relations
var line3 = av.g.line( mainline1X1+20,  mainline1Y1, mainline1X1,  mainline1Y1-10, {opacity: 100, "stroke-width": 2});
var line4 = av.g.line( mainline1X1+20,  mainline1Y1, mainline1X1,  mainline1Y1+10, {opacity: 100, "stroke-width": 2});

//cross foot second/third tables' relations
var line5 = av.g.line( mainline2X1-20,  mainline2Y1,  mainline2X1,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
var line6 = av.g.line( mainline2X1-20,  mainline2Y1, mainline2X1,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});

//two vertical lines first/second tables' relations
var line7 = av.g.line( mainline1X1+20,  mainline1Y1-10, mainline1X1+20,  mainline1Y1+10, {opacity: 100, "stroke-width": 2});
var line8 = av.g.line( mainline1X1+80,  mainline1Y1-10, mainline1X1+80,  mainline1Y1+10, {opacity: 100, "stroke-width": 2});

//two vertical lines second/third tables' relations
var line9 = av.g.line( mainline2X1-20,  mainline2Y1-10, mainline2X1-20,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
var line10= av.g.line( mainline2X1-80,  mainline2Y1-10, mainline2X1-80,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});

//line1.hide();
//line2.hide();

 /* // hide all of the empty rows
  for (var i=2; i < themMatrix2.length; i++)
  {
  matrx2._arrays[i].hide();
  }*/

  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  av.displayInit(1);
  //av.g.path('M '+ 55 + ',' + 145 + ' Q' + 300 + ','+ 480 + ' ' + 495 + ',' + 145, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  //av.step();
  //jsav.g.circle(cx center, cy center, radius, {stroke: "red"});
cx=(mainline1X1+((mainline1X2-mainline1X1)/2));
cy= (mainline1Y1+((mainline1Y2-mainline1Y1)/2));
cRadius=(mainline1X2-mainline1X1)/2;
av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

  // Slide 2
  av.umsg(interpret("sc2").bold().big());
  cx=(mainline2X2+((mainline2X1-mainline2X2)/2));
cy= (mainline2Y1+((mainline2Y2-mainline2Y1)/2));
cRadius=(mainline2X1-mainline2X2)/2;
av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  
   av.recorded();

/*  // Slide 3
  av.umsg(interpret("sc3").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
  matrx1._arrays[Matrix1ArrayNo].highlight(0);
  var pointer1 = av.pointer("Ali's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top:pointerTop });
  var pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top:pointerTop});
  matrx1._arrays[Matrix1ArrayNo].highlight(1);
  av.step();

  /* slide 4
  av.umsg(interpret("sc4").bold().big());
  Matrix2ArrayNo=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
  var pointer3 = av.pointer("Ali's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
  matrx2._arrays[Matrix2ArrayNo].value(0, "201");
  matrx2._arrays[Matrix2ArrayNo].highlight(0);
  av.step();

   // Slide 5
   av.umsg(interpret("sc5").bold().big());
   pointer1.hide();
   pointer2.hide();
   pointer3.hide();
   pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix3ArrayNO);
   matrx1._arrays[Matrix1ArrayNo].unhighlight(0);
   matrx1._arrays[Matrix1ArrayNo].unhighlight(1);
   matrx2._arrays[Matrix2ArrayNo].unhighlight(0);
   pointer1 = av.pointer("Database course's PK", matrx3._arrays[Matrix3ArrayNO].index(0), {left: Matrix3PonterLeft, top: pointerTop});
   pointer2 = av.pointer(" ", matrx3._arrays[Matrix3ArrayNO].index(1), {right: Matrix3Ponterright, top: pointerTop});
   matrx3._arrays[Matrix3ArrayNO].highlight(0);
   matrx3._arrays[Matrix3ArrayNO].highlight(1);
   av.step();

   // slide 6
   av.umsg(interpret("sc6").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
  pointer3 = av.pointer("Database course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
  matrx2._arrays[Matrix2ArrayNo].value(1, "Is2000");
  matrx2._arrays[Matrix2ArrayNo].highlight(1);
  av.step();
 
   // Slide 7
   av.umsg(interpret("sc7").bold().big());
   matrx3._arrays[Matrix3ArrayNO].unhighlight(0);
   matrx3._arrays[Matrix3ArrayNO].unhighlight(1);
   matrx2._arrays[Matrix2ArrayNo].unhighlight(1);
   pointer1.hide();
   pointer2.hide();
   pointer3.hide();
   // to prepare matrices for the new student registaration
   Matrix2ArrayNo++;
   Matrix1ArrayNo=1;
   Matrix3ArrayNO=1;
   matrx2._arrays[Matrix2ArrayNo].show();
   matrx1._arrays[Matrix1ArrayNo].highlight(1);
   matrx3._arrays[Matrix3ArrayNO].highlight(1);
   av.step();

    // Slide 8
    av.umsg(interpret("sc8").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
    matrx1._arrays[Matrix1ArrayNo].highlight(1);
    matrx1._arrays[Matrix1ArrayNo].highlight(0);
    pointer1 = av.pointer("Ali's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top: pointerTop});
    pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top: pointerTop});
    av.step();

    //slide 9
    av.umsg(interpret("sc9").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("Ali's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(0, "201");
    matrx2._arrays[Matrix2ArrayNo].highlight(0);
    av.step();

    //slide 10
    av.umsg(interpret("sc10").bold().big());
    matrx1._arrays[Matrix1ArrayNo].unhighlight(1);
    matrx1._arrays[Matrix1ArrayNo].unhighlight(0);
    matrx2._arrays[Matrix2ArrayNo].unhighlight(0);
    pointer1.hide();
    pointer2.hide();
    pointer3.hide();
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix3ArrayNO);
    matrx3._arrays[Matrix3ArrayNO].highlight(0);
    matrx3._arrays[Matrix3ArrayNO].highlight(1);
    pointer1 = av.pointer("Java course's code", matrx3._arrays[Matrix3ArrayNO].index(0), {left: Matrix3PonterLeft, top: pointerTop});
    pointer2 = av.pointer(" ", matrx3._arrays[Matrix3ArrayNO].index(1), {right: Matrix3Ponterright, top: pointerTop});
    av.step();

    //slide 11
    av.umsg(interpret("sc11").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    matrx2._arrays[Matrix2ArrayNo].value(1, "cs1000");
    matrx2._arrays[Matrix2ArrayNo].highlight(1);
    pointer3 = av.pointer("Java course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
    av.step();

     // Slide 12
    av.umsg(interpret("sc12").bold().big());
    matrx3._arrays[Matrix3ArrayNO].unhighlight(0);
    matrx3._arrays[Matrix3ArrayNO].unhighlight(1);
    matrx2._arrays[Matrix2ArrayNo].unhighlight(1);
    pointer1.hide();
    pointer2.hide();
    pointer3.hide();
    Matrix2ArrayNo++;
    Matrix1ArrayNo=3;
    Matrix3ArrayNO=1;
    matrx2._arrays[Matrix2ArrayNo].show();
    matrx1._arrays[Matrix1ArrayNo].highlight(1);
    matrx3._arrays[Matrix3ArrayNO].highlight(1);
    av.step();

    // Slide 13
    av.umsg(interpret("sc13").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
    matrx1._arrays[Matrix1ArrayNo].highlight(1);
    matrx1._arrays[Matrix1ArrayNo].highlight(0);
    pointer1 = av.pointer("mona's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top: pointerTop});
    pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top: pointerTop});
    av.step();

    //slide 14
    av.umsg(interpret("sc14").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("mona's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(0, "202");
    matrx2._arrays[Matrix2ArrayNo].highlight(0);
    av.step();

    //slide 15
    av.umsg(interpret("sc15").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix3ArrayNO);
    matrx1._arrays[Matrix1ArrayNo].unhighlight(1);
    matrx1._arrays[Matrix1ArrayNo].unhighlight(0);
    matrx2._arrays[Matrix2ArrayNo].unhighlight(0);
    pointer1.hide();
    pointer2.hide();
    pointer3.hide();
    matrx3._arrays[Matrix3ArrayNO].highlight(0);
    matrx3._arrays[Matrix3ArrayNO].highlight(1);
    pointer1 = av.pointer("Java course's code", matrx3._arrays[Matrix3ArrayNO].index(0), {left: Matrix3PonterLeft, top: pointerTop});
    pointer2 = av.pointer(" ", matrx3._arrays[Matrix3ArrayNO].index(1), {right: Matrix3Ponterright, top: pointerTop});
    av.step();

    //slide 16
    av.umsg(interpret("sc16").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("Java course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(1, "cs1000");
    matrx2._arrays[Matrix2ArrayNo].highlight(1);
    av.step();

     // Slide 17
    av.umsg(interpret("sc17").bold().big());
    matrx3._arrays[Matrix3ArrayNO].unhighlight(0);
    matrx3._arrays[Matrix3ArrayNO].unhighlight(1);
    matrx2._arrays[Matrix2ArrayNo].unhighlight(1);
    pointer1.hide();
    pointer2.hide();
    pointer3.hide();
    Matrix2ArrayNo++;
    Matrix1ArrayNo=4;
    Matrix3ArrayNO=4;
    matrx2._arrays[Matrix2ArrayNo].show();
    matrx1._arrays[Matrix1ArrayNo].highlight(1);
    matrx3._arrays[Matrix3ArrayNO].highlight(1);
    av.step();

   // Slide 18
   av.umsg(interpret("sc18").bold().big());
   pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
   matrx1._arrays[Matrix1ArrayNo].highlight(1);
   matrx1._arrays[Matrix1ArrayNo].highlight(0);
   pointer1 = av.pointer("Layla's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top: pointerTop});
   pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top: pointerTop});
   av.step();


   // slide 19
   av.umsg(interpret("sc19").bold().big());
   pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
   matrx2._arrays[Matrix2ArrayNo].value(0, "403");
   matrx2._arrays[Matrix2ArrayNo].highlight(0);
   pointer3 = av.pointer("Layla's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
   av.step();

    // Slide 20
    av.umsg(interpret("sc20").bold().big());
    matrx1._arrays[Matrix1ArrayNo].unhighlight(1);
    matrx1._arrays[Matrix1ArrayNo].unhighlight(0);
    matrx2._arrays[Matrix2ArrayNo].unhighlight(0);
    pointer1.hide();
    pointer2.hide();
    pointer3.hide();
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix3ArrayNO);
    matrx3._arrays[Matrix3ArrayNO].highlight(0);
    matrx3._arrays[Matrix3ArrayNO].highlight(1);
    pointer1 = av.pointer("Math course's code", matrx3._arrays[Matrix3ArrayNO].index(0), {left: Matrix3PonterLeft, top: pointerTop});
    pointer2 = av.pointer(" ", matrx3._arrays[Matrix3ArrayNO].index(1), {right: Matrix3Ponterright, top: pointerTop});
    av.step();

    //slide 21
    av.umsg(interpret("sc21").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("Math course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(1, "G3000");
    matrx2._arrays[Matrix2ArrayNo].highlight(1);
    av.step(); 

    // Slide 22
    av.umsg(interpret("sc22").bold().big());
    matrx3._arrays[Matrix3ArrayNO].unhighlight(0);
    matrx3._arrays[Matrix3ArrayNO].unhighlight(1);
    matrx2._arrays[Matrix2ArrayNo].unhighlight(1);
    pointer1.hide();
    pointer2.hide();
    pointer3.hide();
    Matrix2ArrayNo++;
    Matrix1ArrayNo=4;
    Matrix3ArrayNO=3;
    matrx2._arrays[Matrix2ArrayNo].show();
    matrx1._arrays[Matrix1ArrayNo].highlight(1);
    matrx3._arrays[Matrix3ArrayNO].highlight(1);
    av.step();

    // Slide 23
    av.umsg(interpret("sc23").bold().big());
    matrx2._arrays[Matrix2ArrayNo].show();
    line1.show();
    matrx1._arrays[Matrix1ArrayNo].unhighlight(1);
    matrx2._arrays[Matrix2ArrayNo].value(0, "403");
    matrx1._arrays[Matrix1ArrayNo].highlight(0);
    matrx2._arrays[Matrix2ArrayNo].highlight(0);
    av.step();

    // Slide 24
    av.umsg(interpret("sc23").bold().big());
   line2.show();
   matrx2._arrays[Matrix2ArrayNo].value(1, "Is2000");
   matrx3._arrays[Matrix3ArrayNO].unhighlight(1);
   matrx3._arrays[Matrix3ArrayNO].highlight(0);
   matrx2._arrays[Matrix2ArrayNo].highlight(1);
   av.recorded();*/

});
