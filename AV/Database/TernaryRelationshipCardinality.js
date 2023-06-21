/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationshipCardinality";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

 // var theArray1 = ["", "", "", ""];
 // var theArray2 = ["", "", "", ""];
 // var theArray3 = ["", "", "", ""];
  
  var av = new JSAV(av_name);

   //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=250;
  var arrayTop=100;

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

  //two problem definitions
  var Prob1Label=av.label("<span style='color:blue;'>Problem statment</span>", {left: arrayLeft, top: arrayTop-70 });
  Prob1Label.css({"font-weight": "bold", "font-size": 16});
  var Prob1Statment=av.label("assume that you should design a hospital database that should keeps track of patients, doctors and patients' medicine in which each .....", {left: arrayLeft+20, top: arrayTop-45 });
  Prob1Statment.css({"font-weight": "bold", "font-size": 16});

  var cx=0;
  var cy=0;
  var cRadius=100;
  var cxdoc=0;
  var cydoc=0;
  var cxpat=0;
  var cypat=0;
  var cxmed=0;
  var cymed=0;
  var HalfMatrixWidth=90;
  var HalfMatrixHight=100;
  //definning Matrix as a table
  var Mtrix1Lab=av.label("Patient", {left: arrayLeft+60, top: arrayTop+25 });
  Mtrix1Lab.css({"font-weight": "bold", "font-size": 16});
  Mtrix1Lab.hide();
  var themMatrix1 = [["Pat-id","Pat-name"],[1,"Ahmed"],[2,"ali"],[3,"adel"],[4,"hany"]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop+50, left: arrayLeft+60 });
  cxpat=(arrayLeft+60)+HalfMatrixWidth;
  cypat=(arrayTop+50)+HalfMatrixHight;
  var PatCircle=av.g.circle(cxpat,cypat ,cRadius , {stroke: "red","stroke-width": 3});
  PatCircle.hide();
 
  arrayLeft+=arrayWidth+arrayGap;
  var Mtrix2Lab=av.label("Doctor", {left: arrayLeft+10, top: arrayTop-70 });
  Mtrix2Lab.css({"font-weight": "bold", "font-size": 16});
  Mtrix2Lab.hide();
  var themMatrix2 =[["Doc-id","Doc-name"],["A","morad"],["B","selim"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop-45, left: arrayLeft+10 });
  cxdoc=(arrayLeft+10)+HalfMatrixWidth;
  cydoc=(arrayTop-45)+HalfMatrixHight;
  var DocCircle=av.g.ellipse(cxdoc,cydoc-30,cRadius-10,cRadius-40, {stroke: "red","stroke-width": 3});
  DocCircle.hide();
   
  arrayLeft+=arrayWidth+arrayGap;
  var Mtrix3Lab=av.label("Medicine", {left: arrayLeft-60, top: arrayTop+25 });
  Mtrix3Lab.css({"font-weight": "bold", "font-size": 16});
  Mtrix3Lab.hide();
  var themMatrix3 =[["M-name","M-expiry","M-type"],["panadol","9-11-23","tablet"],["gast-reg","2-1-25","injection"],["contraloc","2-2-25","tablet"],["brufin","3-9-23","tablet"],["zantac","4-6-23","tablets"]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop+50, left: arrayLeft-60});
  cxmed=(arrayLeft-60)+HalfMatrixWidth;
  cymed=(arrayTop+50)+HalfMatrixHight;
  var MedCircle=av.g.ellipse(cxmed+40,cymed+10,cRadius+60,cRadius, {stroke: "red","stroke-width": 3});
  MedCircle.hide();

   //line connecting doctoc & patient circles and anpther line pointing to third entity medicin
   var DocPatLine=av.g.line( cxpat+cRadius, cypat, cxdoc-20, cydoc-30+(cRadius-40), {opacity: 100,stroke: "red", "stroke-width": 3});
   var MedPointerline=av.g.line(cxdoc-130, cydoc+(cRadius-35), arrayLeft-60, arrayTop+150, {opacity: 100,stroke: "red", "stroke-width": 3});
   var MedCardLab=av.label("<span style='color:blue;'>1 or M ?</span>", {left: arrayLeft-125, top: arrayTop+107 });
   MedCardLab.css({"font-weight": "bold", "font-size": 16});  
   MedCardLab.hide();
   DocPatLine.hide();
   MedPointerline.hide();
   //MedCardLab.hide();


    //line connecting doctoc & Medicine circles and anpther line pointing to third entity medicin
  var PatPointerline=av.g.line( cxpat+cRadius-7, cypat, arrayLeft-130, arrayTop+100, {opacity: 100,stroke: "red", "stroke-width": 3});
  var DocMedLine=av.g.line(  arrayLeft-185, arrayTop+40, arrayLeft-90, arrayTop+140, {opacity: 100,stroke: "red", "stroke-width": 3});
  var PatCardLab=av.label("<span style='color:blue;'>1 or M ?</span>", {left:  cxpat+cRadius, top: cypat-50 });
  PatCardLab.css({"font-weight": "bold", "font-size": 16});
  PatCardLab.hide();
  DocMedLine.hide();
  PatPointerline.hide();
   //line connecting Ptient & medicine circles and anpther line pointing to third entity medicin
   var PatMedLine=av.g.line( cxpat+cRadius-7, arrayTop+110, arrayLeft-70, arrayTop+110, {opacity: 100,stroke: "red", "stroke-width": 3});
   var DocPointerline=av.g.line( arrayLeft-290, arrayTop+110, arrayLeft-290, arrayTop+60, {opacity: 100,stroke: "red", "stroke-width": 3});
   PatMedLine.hide();
   DocPointerline.hide();
   var DocCardLab=av.label("<span style='color:blue;'>1 or M ?</span>", {left: arrayLeft-320, top: arrayTop+50 });
   DocCardLab.css({"font-weight": "bold", "font-size": 16});  
   DocCardLab.hide();

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
//var line4 = av.g.line( mainline1X1+20,  mainline1Y1, mainline1X1,  mainline1Y1+10, {opacity: 100, "stroke-width": 2});

//cross foot second/third tables' relations
//var line5 = av.g.line( mainline2X1-20,  mainline2Y1,  mainline2X1,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
//var line6 = av.g.line( mainline2X1-20,  mainline2Y1, mainline2X1,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});

//two vertical lines first/second tables' relations
//var line7 = av.g.line( mainline1X1+20,  mainline1Y1-10, mainline1X1+20,  mainline1Y1+10, {opacity: 100, "stroke-width": 2});
//var line8 = av.g.line( mainline1X1+80,  mainline1Y1-10, mainline1X1+80,  mainline1Y1+10, {opacity: 100, "stroke-width": 2});

//two vertical lines second/third tables' relations
//var line9 = av.g.line( mainline2X1-20,  mainline2Y1-10, mainline2X1-20,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
//var line10= av.g.line( mainline2X1-80,  mainline2Y1-10, mainline2X1-80,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});


//line4.hide();
//line5.hide();
//line6.hide();
//line7.hide();
//line8.hide();
//line9.hide();
//line10.hide();

  // hide all of the empty rows
  for (var i=0; i < themMatrix2.length; i++)
  {
    matrx2._arrays[i].hide();
  }
  for (var i=0; i < themMatrix1.length; i++)
  {
    matrx1._arrays[i].hide();
  }
  for (var i=0; i < themMatrix3.length; i++)
  {
    matrx3._arrays[i].hide();
  }
  line1.hide();
  line2.hide();
  line3.hide();
  

  // Slide 1
  av.umsg(interpret("Here are the problems' statments").bold().big());
 av.displayInit(1);
 Prob1Label.show();
 Prob1Statment.show();
  //Prob2Label.show();
  //Prob2Statment.show();
  
//cx=(mainline1X1+((mainline1X2-mainline1X1)/2));
//cy= (mainline1Y1+((mainline1Y2-mainline1Y1)/2));
//cRadius=(mainline1X2-mainline1X1)/2;
//av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

  // Slide 2
  av.umsg(interpret("Entities defined in the problem statement").bold().big());
  Prob1Label.hide();
  Prob1Statment.hide();
  //Prob2Label.hide();
  //Prob2Statment.hide();
  Mtrix1Lab.show();
  Mtrix2Lab.show();
  Mtrix3Lab.show();  
  for (var i=0; i < themMatrix2.length; i++)
  {
    matrx2._arrays[i].show();
  }
  for (var i=0; i < themMatrix1.length; i++)
  {
    matrx1._arrays[i].show();
  }
  for (var i=0; i < themMatrix3.length; i++)
  {
    matrx3._arrays[i].show();
  }
  //cx=(mainline2X2+((mainline2X1-mainline2X2)/2));
//cy= (mainline2Y1+((mainline2Y2-mainline2Y1)/2));
//cRadius=(mainline2X1-mainline2X2)/2;
//av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  av.step();

  //slide 3
  av.umsg(interpret("Ternary relationship expressed in chen notation").bold().big());
  var pX=arrayLeft-280;
  var pY=arrayTop+170;
  var polygon = av.g.polyline([[pX+10, pY-30],
    [pX+10+60, pY],
    [pX+10, pY+30],
    [pX+10-60, pY],
    [pX+10, pY-30]],
   {"stroke-width": 3, stroke: "black"});
   var RelLab=av.label("<span style='color:blue;'>treat</span>", {left:pX-15, top: pY-35});
   RelLab.css({"font-weight": "bold", "font-size": 20});
   line1.movePoints([[0,pX+10-60,pY],[1,pX-215,pY]]);
   line2.movePoints([[0,pX+10+60,pY],[1,arrayLeft-60,pY]]);
   line3.movePoints([[0,pX+10,pY-30],[1,pX+10,pY-110]]);
   line1.show();
   line2.show();
   line3.show();
   av.step();

   //slide 4
   av.umsg(interpret("How to determine ternary relationship cardinality").bold().big());
   polygon.hide();
   line1.hide();
   line2.hide();
   line3.hide();
   RelLab.hide();
   Mtrix1Lab.hide();
   Mtrix2Lab.hide();
   Mtrix3Lab.hide();
    // hide all of the empty rows
  for (var i=0; i < themMatrix2.length; i++)
  {
    matrx2._arrays[i].hide();
  }
  for (var i=0; i < themMatrix1.length; i++)
  {
    matrx1._arrays[i].hide();
  }
  for (var i=0; i < themMatrix3.length; i++)
  {
    matrx3._arrays[i].hide();
  }
  var CardLab=av.label("<span style='color:blue;'>Ternary Cardinality:</span> <span style='color:green;'>Doctor</span>, <span style='color:green;'>Patient</span> and <span style='color:green;'>Medicine</span> will participate <span style='color:red;'><i>simultaneously</i></span> in a relationship. <span style='color:blue;'>Because</span> of this fact when we consider cardinality we need to consider it in the context of two entities simultaneously relative to third entity.", {left:arrayLeft-800, top: arrayTop-75});
   CardLab.css({"font-weight": "bold", "font-size": 18});
   av.step();

   //slide 5
   av.umsg(interpret("How to determine ternary relationship cardinality").bold().big());
   var CardLab2=av.label("<span style='color:blue;'>Note:</span> As <span style='color:green;'>Discussed before in binary relationship</span>, To set cardinaltity of relation of any degree, we should look at the instances of an entity not the entity itself.  <span style='color:red;'><i>(illustrated in the next slide)</i></span>", {left:arrayLeft-800, top: arrayTop-10});
   CardLab2.css({"font-weight": "bold", "font-size": 18});
   av.step();

   //slide 6
   CardLab.hide();
   CardLab2.hide();
   av.umsg(interpret("To determine <span style='color:blue;'>Medicine's cardinality</span>").bold().big());
   polygon.show();
   line1.show();
   line2.show();
   line3.show();
   RelLab.show();
   Mtrix1Lab.show();
   Mtrix2Lab.show();
   Mtrix3Lab.show();
    // hide all of the empty rows
  for (var i=0; i < themMatrix2.length; i++)
  {
    matrx2._arrays[i].show();
  }
  for (var i=0; i < themMatrix1.length; i++)
  {
    matrx1._arrays[i].show();
  }
  for (var i=0; i < themMatrix3.length; i++)
  {
    matrx3._arrays[i].show();
  }
  av.step();

  //slide 7
  var MedCard1=av.label("Say for a given instance of <u>Doctor</u>", {left:arrayLeft-800, top: arrayTop-125});
  MedCard1.css({"font-weight": "bold", "font-size": 18});
  DocCircle.show();
  av.step();

  //slide 8
  var MedCard2=av.label("and an Instance of <u>Patient</u>,", {left:arrayLeft-500, top: arrayTop-125});
  MedCard2.css({"font-weight": "bold", "font-size": 18});
  PatCircle.show();
  av.step();

  //slide 9
  var MedCard3=av.label("can that doctor treats that patient with <span style='color:blue;'><i>multiple</i></span> (more than one) ", {left:arrayLeft-265, top: arrayTop-125});
  MedCard3.css({"font-weight": "bold", "font-size": 18});
  var MedCard3Cont=av.label("<span style='color:red;'>or</span> <i>only <span style='color:blue;'>one</span></i> medicine.", {left:arrayLeft-800, top: arrayTop-100});
  MedCard3Cont.css({"font-weight": "bold", "font-size": 18});
  DocPatLine.show();
  MedPointerline.show();
  
  MedCardLab.show();
  av.step();

  //slide 10
  var MedCardEx=av.label("<span style='color:red;'>Example:</span> Consider Doctor Selim that treats a Patient ali using multiple (more than one) Medicines in the treatment then the cardinality of Medicin relative to Dr.Selim and Patient ali is N (many).", {left:arrayLeft-800, top: arrayTop-125});
  MedCardEx.css({"font-weight": "bold", "font-size": 18});
  MedCard1.hide();
  MedCard2.hide();
  MedCard3.hide();
  MedCard3Cont.hide();
  DocPatLine.hide();
  MedPointerline.hide();
  MedCardLab.hide();
  PatCircle.hide();
  DocCircle.hide();
  matrx1._arrays[2].highlight();
  matrx2._arrays[2].highlight();
  av.step();

  //slide 11
  MedCardEx.hide();
  var MedCardEx1=av.label("<span style='color:red;'>Then:</span> Medicine entity cardinality is N (many).", {left:arrayLeft-800, top: arrayTop-125});
  MedCardEx1.css({"font-weight": "bold", "font-size": 18});
  var MedCardEx2=av.label("<span style='color:red;'>N</span>", {left:arrayLeft-80, top: arrayTop+130});
  MedCardEx2.css({"font-weight": "bold", "font-size": 16});
  av.step();

   //slide 12
   MedCardEx1.hide();
   matrx1._arrays[2].unhighlight();
   matrx2._arrays[2].unhighlight();
   av.umsg(interpret("To determine <span style='color:blue;'>Patients's cardinality</span>").bold().big());
   var PatCard1=av.label("Shall a given instance of a <u>Doctor</u>", {left:arrayLeft-800, top: arrayTop-125});
   PatCard1.css({"font-weight": "bold", "font-size": 18});
   DocCircle.show();
   av.step();
 
   //slide 13
   var PatCard2=av.label("uses  <u>one of his medicines</u>,", {left:arrayLeft-500, top: arrayTop-125});
   PatCard2.css({"font-weight": "bold", "font-size": 18});
   MedCircle.show();
   av.step();
 
   //slide 14
   var PatCard3=av.label("for only <span style='color:blue;'><i>one</i></span>", {left:arrayLeft-265, top: arrayTop-125});
   PatCard3.css({"font-weight": "bold", "font-size": 18});
   var PatCard3Cont=av.label("<span style='color:red;'>or</span> <i><span style='color:blue;'>many</span></i> of his patients.", {left:arrayLeft-150, top: arrayTop-125});
   PatCard3Cont.css({"font-weight": "bold", "font-size": 18});
   DocMedLine.show();
   PatPointerline.show();
   PatCardLab.show();
   av.step();
 
   //slide 15
   var PatCardEx=av.label("<span style='color:red;'>Example:</span> Consider Doctor morad uses Panadol medicine for many patients in that case the cardinality of Patient relative to Doctor and Medicine is M (many).", {left:arrayLeft-800, top: arrayTop-125});
   PatCardEx.css({"font-weight": "bold", "font-size": 18});
   PatCard1.hide();
   PatCard2.hide();
   PatCard3.hide();
   PatCard3Cont.hide();
   DocMedLine.hide();
   PatPointerline.hide();
   PatCardLab.hide();
   MedCircle.hide();
   DocCircle.hide();
   matrx3._arrays[1].highlight();
   matrx2._arrays[1].highlight();
   av.step();
 
   //slide 16
   PatCardEx.hide();
   var PatCardEx1=av.label("<span style='color:red;'>Then:</span> Patient entity cardinality is M (many).", {left:arrayLeft-800, top: arrayTop-125});
   PatCardEx1.css({"font-weight": "bold", "font-size": 18});
   var PatCardEx2=av.label("<span style='color:red;'>M</span>", {left:arrayLeft-490, top: arrayTop+130});
   PatCardEx2.css({"font-weight": "bold", "font-size": 16});
   av.step();

   //slide 17
   PatCardEx1.hide();
   matrx3._arrays[1].unhighlight();
   matrx2._arrays[1].unhighlight();
   av.umsg(interpret("To determine <span style='color:blue;'>Doctors's cardinality</span>").bold().big());
   var DocCard1=av.label("Similarly, for a specific instance of <u>Medicine</u>,", {left:arrayLeft-800, top: arrayTop-125});
   DocCard1.css({"font-weight": "bold", "font-size": 18});
   MedCircle.show();
   av.step();
 
   //slide 18
   var DocCard2=av.label("given to a special<u> Patient</u>,", {left:arrayLeft-410, top: arrayTop-125});
   DocCard2.css({"font-weight": "bold", "font-size": 18});
   PatCircle.show();
   av.step();
 
   //slide 19
   var DocCard3=av.label("is this done by <span style='color:blue;'><i>one</i></span>", {left:arrayLeft-185, top: arrayTop-125});
   DocCard3.css({"font-weight": "bold", "font-size": 18});
   var DocCard3Cont=av.label("<span style='color:red;'>or</span> <i><span style='color:blue;'>many</span></i> Doctors.", {left:arrayLeft-15, top: arrayTop-125});
   DocCard3Cont.css({"font-weight": "bold", "font-size": 18});
   PatMedLine.show();
   DocPointerline.show();
   DocCardLab.show();
   av.step();
 
   //slide 20
   var DocCardEx=av.label("<span style='color:red;'>Example:</span> Consider Patient Ahmed is given brufin medicine, absolutely this brufin medicine is prescribed by only one doctor to that patient ahmed so Doctor's cardinality is 1 (one).", {left:arrayLeft-800, top: arrayTop-125});
   DocCardEx.css({"font-weight": "bold", "font-size": 18});
   DocCard1.hide();
   DocCard2.hide();
   DocCard3.hide();
   DocCard3Cont.hide();
   PatMedLine.hide();
   DocPointerline.hide();
   DocCardLab.hide();
   MedCircle.hide();
   PatCircle.hide();
   matrx3._arrays[4].highlight();
   matrx1._arrays[1].highlight();
   av.step();
 
   //slide 21
   DocCardEx.hide();
   var DocCardEx1=av.label("<span style='color:red;'>Then:</span> Doctor entity cardinality is 1 (one).", {left:arrayLeft-800, top: arrayTop-125});
   DocCardEx1.css({"font-weight": "bold", "font-size": 18});
   var DocCardEx2=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-280, top: arrayTop+45});
   DocCardEx2.css({"font-weight": "bold", "font-size": 16});
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
