/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "manyToMany";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

 // var theArray1 = ["", "", "", ""];
 // var theArray2 = ["", "", "", ""];
 // var theArray3 = ["", "", "", ""];
  
  var av = new JSAV(av_name);

   //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=200;
  var arrayTop=50;
  // where 91 in the belwo equation of mainline2X2 represents cell width of student matrix and 3 is the number of cells
  var mainline2X2=arrayLeft+(91*3);
  
  //to facilitate detection of pointers' top of the three matrices
  // MatrixCellHight i.e the step size is -30 so
  //the let poiter point to the top of the 4th element in the matrix
  //4th element = index(3) then pointerTopEqu=(MatrixPointerTopStart+(MatrixCellHight*index))= (-10+(-30*3))=-100;
  // in case of matrix the index is equals to the number of the array used i.e. index 3=matrix1_array[3]; so below in the top equation
  // we will use the number of the array of the matrix instead of the index
  //pointerTopEqu=pointerTop=(MatrixPointerTopStart+(MatrixCellHight*MartixArrayNo))= (-10+(-30*3))=-100;
  var MatrixPointerTopStart=-10;
  var MatrixCellHight=-30;
  var Matrix1ArrayNo;
  var Matrix2ArrayNo;
  var Matrix3ArrayNO;
  var pointerTop=0;

  var Matrix1PonterLeft=65;
  var Matrix1Ponterright=160;
  var Matrix2Ponterright=90;
  var Matrix3PonterLeft=30;
  var Matrix3Ponterright=140;

  //definning Matrix as a table
  var themMatrix1 = [["S-id","S-name"," S-stage"],[201,"ali","2nd"],[101,"adel","1st"],[202,"mona","2nd"],[403,"layla","4th"]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });
  var ERDlab=av.label(interpret("<span style='color:blue;'> Logical ER-Diagram </span>"), {left: arrayLeft, top: arrayTop-40 });
  ERDlab.css({"font-weight": "bold", "font-size": 20});
  ERDlab.hide();

  
 
  arrayLeft+=arrayWidth+arrayGap+75;
  var LabelLeft=arrayLeft;
  var themMatrix2 =[["S-id","C-code"],[" "," "],[" "," "],[" "," "],[" "," "],[" "," "]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });
  var BridgeLeft=arrayLeft;
  var BridgeEnd=BridgeLeft+(91*2);

  

  arrayLeft+=arrayWidth+arrayGap;
  var themMatrix3 =[["C-code","C-name","C-total marks"],["cs1000","java",150],["cs1009","C++",150],["Is2000","Database",150],["G3000","Math",100]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix3Copy =[["C-code","C-name","C-total marks"],["cs1000","java",150],["cs1009","C++",150],["Is2000","Database",150],["G3000","Math",100]];
  var matrx3Copy= av.ds.matrix(themMatrix3Copy, {style: "table", top: arrayTop, left: arrayLeft-arrayGap-120 });
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3Copy._arrays[i].hide();
  } 

  var schmaOffsit=arrayLeft+30;
  var SCHlab=av.label(interpret("<span style='color:blue;'> physical schema Diagram </span>"), {left: schmaOffsit, top: arrayTop-40 });
  SCHlab.css({"font-weight": "bold", "font-size": 20});
  SCHlab.hide();
  var studSchlab=av.label(interpret("student"), {left: schmaOffsit, top: arrayTop });
  studSchlab.css({"font-weight": "bold", "font-size": 15});
  studSchlab.hide();
  var studSchema = [["S-id","S-name","S-stage"]];
  var studSchemaArr= av.ds.matrix(studSchema, {style: "table", top: arrayTop+20, left: schmaOffsit});
  studSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  studSchemaArr._arrays[0].hide();
  
  var corSchlab=av.label(interpret("course"), {left: schmaOffsit, top: arrayTop+70 });
  corSchlab.css({"font-weight": "bold", "font-size": 15});
  corSchlab.hide();
  var corSchema = [["C-code","C-name","C-total marks"]];
  var corSchemaArr= av.ds.matrix(corSchema, {style: "table", top: arrayTop+90, left: schmaOffsit});
  corSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  corSchemaArr._arrays[0].hide();

  var Bridgelab=av.label(interpret("Register"), {left: schmaOffsit, top: arrayTop+140 });
  Bridgelab.css({"font-weight": "bold", "font-size": 15});
  Bridgelab.hide();
  var bridgeSchema = [["S-id(FK)","C-code(FK)"]];
  var bridgeSchemaArr= av.ds.matrix(bridgeSchema, {style: "table", top: arrayTop+160, left: schmaOffsit});
  bridgeSchemaArr._arrays[0].css([0,1], {"text-decoration": "underline"});
  bridgeSchemaArr._arrays[0].hide();
 
 // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2._arrays[0].css([0,1,], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx3Copy._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

// to underline primary keys in all tables
matrx1._arrays[0].css([0], {"text-decoration": "underline"});
matrx2._arrays[0].css([0], {"text-decoration": "underline"});
matrx2._arrays[0].css([1], {"text-decoration": "underline"});
matrx3._arrays[0].css([0], {"text-decoration": "underline"});
matrx3Copy._arrays[0].css([0], {"text-decoration": "underline"});

 //Draw relation between project and employee tables in the first slide
 var mainline2X1=arrayLeft;
 var mainline2Y1=arrayTop+100;
// where 91 in the belwo equation of BridgeEnd represents cell width of bridge matrix and 2 is the number of cells 
 var mainline2Y2=arrayTop+100; 

// main that represents the two tables' relations
var line3 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2,  mainline2Y2, {opacity: 100, "stroke-width": 2});
//cross foot of the tables'  course relations
var line4 = av.g.line( mainline2X1-20,  mainline2Y1,  mainline2X1,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
var line5 = av.g.line( mainline2X1-20,  mainline2Y1, mainline2X1,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
//two vertical lines of the tables' relations
////cross foot of the tables'  student relations
var line6 = av.g.line( mainline2X2+20,  mainline2Y1, mainline2X2,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
var line7 = av.g.line( mainline2X2+20,  mainline2Y1, mainline2X2,  mainline2Y1-10, {opacity: 100, "stroke-width": 2}); 
var line8 = av.g.line( 0,  0, 0, 0, {opacity: 100, "stroke-width": 2}); 
var line9 = av.g.line( 0,  0, 0, 0, {opacity: 100, "stroke-width": 2}); 
var line10 = av.g.line( 0, 0, 0, 0, {opacity: 100, "stroke-width": 2}); 
var lab=av.label(interpret("<span style='color:red;'> Register </span>"), {left: LabelLeft+30, top: mainline2Y1- 50 });
lab.css({"font-weight": "bold", "font-size": 20});

//pointer arrpws (lines) defined here used in the last slides
var line1 = av.g.line(120, 200, 460, 235, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
var line2 = av.g.line(775, 170,635, 235, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
line1.hide();
line2.hide();
line8.hide();
line9.hide();
line10.hide();

  // hide all of the rows of the bridge 
  for (var i=0; i < themMatrix2.length; i++)
  {
  matrx2._arrays[i].hide();
  }

  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  av.displayInit(1);
  //av.g.path('M '+ 55 + ',' + 145 + ' Q' + 300 + ','+ 480 + ' ' + 495 + ',' + 145, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.step();

  //slide 2
  av.umsg(interpret("sc2").bold().big());
 // show only the first two rows of the bridge (attributes and first empty row)
  for (var i=0; i < 2; i++)
  {
  matrx2._arrays[i].show();
  }
  line3.hide();
  line4.hide();
  line5.hide();
  line6.hide();
  line7.hide();
  lab.hide();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3").bold().big());
  Matrix1ArrayNo=1;
  Matrix3ArrayNO=3;
  matrx1.value();
  matrx1._arrays[Matrix1ArrayNo].highlight(1); 
  matrx3._arrays[Matrix3ArrayNO].highlight(1);
  av.step();

  // Slide 4
  av.umsg(interpret("sc4").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
  matrx1._arrays[Matrix1ArrayNo].highlight(0);
  var pointer1 = av.pointer("Ali's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top:pointerTop });
  var pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top:pointerTop});
  matrx1._arrays[Matrix1ArrayNo].highlight(1);
  av.step();

  // slide 5
  av.umsg(interpret("sc5").bold().big());
  Matrix2ArrayNo=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
  var pointer3 = av.pointer("Ali's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
  matrx2._arrays[Matrix2ArrayNo].value(0, "201");
  matrx2._arrays[Matrix2ArrayNo].highlight(0);
  av.step();

   // Slide 6
   av.umsg(interpret("sc6").bold().big());
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

   // slide 7
   av.umsg(interpret("sc7").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
  pointer3 = av.pointer("Database course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
  matrx2._arrays[Matrix2ArrayNo].value(1, "Is2000");
  matrx2._arrays[Matrix2ArrayNo].highlight(1);
  av.step();
 
   // Slide 8
   av.umsg(interpret("sc8").bold().big());
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

    // Slide 9
    av.umsg(interpret("sc9").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
    matrx1._arrays[Matrix1ArrayNo].highlight(1);
    matrx1._arrays[Matrix1ArrayNo].highlight(0);
    pointer1 = av.pointer("Ali's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top: pointerTop});
    pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top: pointerTop});
    av.step();

    //slide 10
    av.umsg(interpret("sc10").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("Ali's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(0, "201");
    matrx2._arrays[Matrix2ArrayNo].highlight(0);
    av.step();

    //slide 11
    av.umsg(interpret("sc11").bold().big());
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

    //slide 12
    av.umsg(interpret("sc12").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    matrx2._arrays[Matrix2ArrayNo].value(1, "cs1000");
    matrx2._arrays[Matrix2ArrayNo].highlight(1);
    pointer3 = av.pointer("Java course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
    av.step();

     // Slide 13
    av.umsg(interpret("sc13").bold().big());
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

    // Slide 14
    av.umsg(interpret("sc14").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
    matrx1._arrays[Matrix1ArrayNo].highlight(1);
    matrx1._arrays[Matrix1ArrayNo].highlight(0);
    pointer1 = av.pointer("mona's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top: pointerTop});
    pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top: pointerTop});
    av.step();

    //slide 15
    av.umsg(interpret("sc15").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("mona's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(0, "202");
    matrx2._arrays[Matrix2ArrayNo].highlight(0);
    av.step();

    //slide 16
    av.umsg(interpret("sc16").bold().big());
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

    //slide 17
    av.umsg(interpret("sc17").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("Java course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(1, "cs1000");
    matrx2._arrays[Matrix2ArrayNo].highlight(1);
    av.step();

     // Slide 18
    av.umsg(interpret("sc18").bold().big());
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

   // Slide 19
   av.umsg(interpret("sc19").bold().big());
   pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix1ArrayNo);
   matrx1._arrays[Matrix1ArrayNo].highlight(1);
   matrx1._arrays[Matrix1ArrayNo].highlight(0);
   pointer1 = av.pointer("Layla's PK", matrx1._arrays[Matrix1ArrayNo].index(0), {left: Matrix1PonterLeft, top: pointerTop});
   pointer2 = av.pointer(" ", matrx1._arrays[Matrix1ArrayNo].index(1), {right: Matrix1Ponterright, top: pointerTop});
   av.step();


   // slide 20
   av.umsg(interpret("sc20").bold().big());
   pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
   matrx2._arrays[Matrix2ArrayNo].value(0, "403");
   matrx2._arrays[Matrix2ArrayNo].highlight(0);
   pointer3 = av.pointer("Layla's ID", matrx2._arrays[Matrix2ArrayNo].index(0), {right: Matrix2Ponterright, top: pointerTop});
   av.step();

    // Slide 21
    av.umsg(interpret("sc21").bold().big());
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

    //slide 22
    av.umsg(interpret("sc22").bold().big());
    pointerTop=MatrixPointerTopStart+(MatrixCellHight*Matrix2ArrayNo);
    pointer3 = av.pointer("Math course's code", matrx2._arrays[Matrix2ArrayNo].index(1), {right: Matrix2Ponterright, top: pointerTop});
    matrx2._arrays[Matrix2ArrayNo].value(1, "G3000");
    matrx2._arrays[Matrix2ArrayNo].highlight(1);
    av.step(); 

    // Slide 23
    av.umsg(interpret("sc23").bold().big());
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

    // Slide 24
    av.umsg(interpret("sc24").bold().big());
    matrx2._arrays[Matrix2ArrayNo].show();
    line1.show();
    matrx1._arrays[Matrix1ArrayNo].unhighlight(1);
    matrx2._arrays[Matrix2ArrayNo].value(0, "403");
    matrx1._arrays[Matrix1ArrayNo].highlight(0);
    matrx2._arrays[Matrix2ArrayNo].highlight(0);
    av.step();

    // Slide 25
    av.umsg(interpret("sc24").bold().big());
   line2.show();
   matrx2._arrays[Matrix2ArrayNo].value(1, "Is2000");
   matrx3._arrays[Matrix3ArrayNO].unhighlight(1);
   matrx3._arrays[Matrix3ArrayNO].highlight(0);
   matrx2._arrays[Matrix2ArrayNo].highlight(1);
   av.step();

   //slide 26
   av.umsg(interpret("sc25").bold().big());
   line1.hide();
   line2.hide();
   matrx1._arrays[Matrix1ArrayNo].unhighlight(0);
   matrx2._arrays[Matrix2ArrayNo].unhighlight(0);
   matrx3._arrays[Matrix3ArrayNO].unhighlight(0);
   matrx2._arrays[Matrix2ArrayNo].unhighlight(1);
  //these line points will be changed to serve as a two 1:N relation between the bridge and the two original tables
  //two main horizontal lines between bridge and tables that represents the two tables' relations
 //line between bridge and course
 line3.movePoints([[0,BridgeEnd, mainline2Y1], [1,  mainline2X1, mainline2Y2]]);
 line3.show();
 //line between student and bridge
 line8.movePoints([[0,mainline2X2 , mainline2Y1], [1, BridgeLeft, mainline2Y2]]);
 line8.show();
//cross foot of the bridge table from table course relation
line4.movePoints([[0,BridgeEnd+20, mainline2Y1], [1,  BridgeEnd, mainline2Y1+10]]);
line4.show();
// line4 = av.g.line( mainline2X1-20,  mainline2Y1,  mainline2X1,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
line5.movePoints([[0,BridgeEnd+20, mainline2Y1], [1,  BridgeEnd, mainline2Y2-10]]);
line5.show();
// line5 = av.g.line( mainline2X1-20,  mainline2Y1, mainline2X1,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
//two vertical lines of the tables' relations
//vertical of table student
line9.movePoints([[0,mainline2X2+20 , mainline2Y1-10], [1, mainline2X2+20, mainline2Y1+10]]);
line9.show();
//vertical of table course
line10.movePoints([[0,mainline2X1-20, mainline2Y1-10], [1,  mainline2X1-20, mainline2Y1+10]]);
line10.show();
////cross foot of the bridge table  from student relation
line6.movePoints([[0,BridgeLeft-20 , mainline2Y1], [1, BridgeLeft, mainline2Y1+10]]);
line6.show();
line7.movePoints([[0,BridgeLeft-20 , mainline2Y1], [1, BridgeLeft, mainline2Y1-10]]);
line7.show();
av.step();

//slide 27
av.umsg(interpret("Finally this is the logical ERD of the relation").bold().big());
line3.hide();
line8.hide();
line4.hide();
line5.hide();
line6.hide();
line7.hide();
line9.hide();
line10.hide();
// hide all of the rows of the bridge 
for (var i=0; i < themMatrix2.length; i++)
{
matrx2._arrays[i].hide();
}
for (var i=0; i < themMatrix3.length; i++)
{
matrx3._arrays[i].hide();
matrx3Copy._arrays[i].show();
}
/*for (var i=0; i < themMatrix3.length; i++)
{
matrx3._arrays[i].hide();
}
matrx3.layout({top: arrayTop+200, left: 200});
for (var i=0; i < themMatrix3.length; i++)
{
matrx3._arrays[i].show();
}*/
mainline2X1=arrayLeft-arrayGap-120;
// main that represents the two tables' relations
line3.movePoints([[0, mainline2X1 ,mainline2Y1 ], [1,mainline2X2,mainline2Y2]]);
line3.show();
//cross foot of the tables'  course relations
line4.movePoints([[0, mainline2X1-20 ,mainline2Y1 ], [1,mainline2X1,mainline2Y1-10]]);
line4.show();
line5.movePoints([[0,mainline2X1-20 ,mainline2Y1 ], [1,mainline2X1 ,mainline2Y1+10]]);
line5.show();
//two vertical lines of the tables' relations
////cross foot of the tables'  student relations
line6.movePoints([[0,mainline2X2+20 ,mainline2Y1 ], [1,mainline2X2 ,mainline2Y1+10]]);
line6.show();
line7.movePoints([[0,mainline2X2+20 ,mainline2Y1 ], [1,mainline2X2 ,mainline2Y1-10]]);
line7.show();
LabelLeft=mainline2X1-100;
var lab2=av.label(interpret("<span style='color:red;'> Register </span>"), {left: LabelLeft, top: mainline2Y1-40 });
lab2.css({"font-weight": "bold", "font-size": 15});
av.step();

//slide 28
av.umsg(interpret("Here is the corresponding physical relational schema diagram where new table (the bridge) is added to the schema").bold().big());
  ERDlab.show();
  SCHlab.show();
  studSchlab.show();
  corSchlab.show();
  Bridgelab.show();
  studSchemaArr._arrays[0].show();
  corSchemaArr._arrays[0].show();
  bridgeSchemaArr._arrays[0].show();
av.recorded();

});
