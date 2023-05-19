/*global JSAV, document */
// Written by Cliff Shaffer
// Based on earlier material written by Sushma Mandava and Milen John
// variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  //"use strict";
  var av_name = "WeakEntity";
  var av = new JSAV(av_name);
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  
  var pY=25;
  var LabelLeft=100;
  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=300;
  var arrayTop=100;

  
  //arrayLeft+=arrayWidth+arrayGap;
  arrayLeft+=arrayWidth+arrayGap;

  var shiftDrawingValue=70;
  
  var line1Chen = av.g.line(arrayLeft-90-45,  arrayTop-90+20+shiftDrawingValue,  arrayLeft-300+110,  arrayTop-90+20+shiftDrawingValue,{opacity: 100, "stroke-width": 2});
  line1Chen.hide();
  

  var line2Chen = av.g.line(arrayLeft-90+45,  arrayTop-90+20+shiftDrawingValue,  arrayLeft+28,  arrayTop-90+20+shiftDrawingValue,{opacity: 100, "stroke-width": 2});
  //line2.addClass("dashed");
  line2Chen.hide();

  //line2 repetation representing total participation
  var line2Chenrepitation = av.g.line(arrayLeft-90+40,  arrayTop-90+25+shiftDrawingValue,  arrayLeft+28,  arrayTop-90+25+shiftDrawingValue,{opacity: 100, "stroke-width": 2});
  line2Chenrepitation.hide();

  var EnameLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
  EnameLine.hide();
   var EidLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   EidLine.hide();
   var EsalaryLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   EsalaryLine.hide();

   //primarykey line of strong entity
   var EmpPKLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   EmpPKLine.hide();

  //partial key line of weak entity
   var CHPartKeyLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CHPartKeyLine.addClass("dashed");
   CHPartKeyLine.hide();

   var CHnameLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
  CHnameLine.hide();
   var CHageLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CHageLine.hide();
   var CHgenderLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CHgenderLine.hide();

   var arrayWidthMatrix=120;
  var arrayLeftMatrix=10;
  var arrayGapMatrix=200;
  var arrayTopMatrix=-15;   

  //definning Matrix as a table
  var themMatrix3 =[["E-id","E-name","salary"],["100","Ahmed","3000"],["200","Hazem","7000"],["300","Khaled","5000"]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTopMatrix, left: arrayLeftMatrix });
  
  arrayLeftMatrix+=arrayWidthMatrix+arrayGapMatrix+90;
  arrayLeftMatrix+=arrayWidthMatrix+arrayGapMatrix;
  
  var themMatrix1 = [["CH-name","age","gender"],["ALi","12","male"],["Nada","9","female"],["Ali","12","male"],["sara","6","female"],["Morad","10","male"],["Nada","9","female"]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTopMatrix, left: arrayLeftMatrix-140 });

  var Matrix1CHPartKeyLine=av.g.line(arrayLeftMatrix-140+5,arrayTopMatrix+40,arrayLeftMatrix-140+70,arrayTopMatrix+40, {opacity: 100, "stroke-width": 1});
  Matrix1CHPartKeyLine.addClass("dashed");
  Matrix1CHPartKeyLine.hide();

  var themMatrix2 =[["CH-name","age","gender", "E-id(FK)"],["ALi","12","male","100"],["Nada","9","female","100"],["Ali","12","male","200"],["sara","6","female","200"],["Morad","10","male","200"],["Nada","9","female","300"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTopMatrix, left: arrayLeftMatrix-140 });
 // var Matrix2CHPartKeyLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
 // Matrix2CHPartKeyLine.addClass("dashed");
//  Matrix1CHPartKeyLine.hide();
 
  // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

  // to underline primary keys in all tables
  //matrx1._arrays[0].css([0], {"text-decoration": "underline"});
  //matrx2._arrays[0].css([0], {"text-decoration": "underline"});
  matrx3._arrays[0].css([0], {"text-decoration": "underline"});

  // hide all of the empty rows
  for (var i=0; i < themMatrix1.length; i++)
  {
  matrx1._arrays[i].hide();
  }

   // hide all of the empty rows
   for (var i=0; i < themMatrix2.length; i++)
   {
   matrx2._arrays[i].hide();
   }


  // hide all of the empty rows
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  }

// draing relation using creossfoot using real tables field with data
 //Draw relation between employee and child tables in the first slide
 var mainline2X1=740-100;
 var mainline2Y1=90;
 var mainline2X2=290-100;
 var mainline2Y2=mainline2Y1; 

 // main that represents the two tables' relations
 var line2 = av.g.line(mainline2X1-40,  mainline2Y1, mainline2X2+35,  mainline2Y2, {opacity: 100, "stroke-width": 2});
 //cross foot of the tables' relations
 var line3 = av.g.line( mainline2X1-60,  mainline2Y1,  mainline2X1-40,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
 var line4 = av.g.line( mainline2X1-60,  mainline2Y1, mainline2X1-40,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
 var lineMandatory=av.g.line( mainline2X1-60,  mainline2Y1-10, mainline2X1-60,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); ;
 //two vertical lines of the tables' relations
 //vertical line beside table employee
 //var line5 = av.g.line( mainline2X1-40,  mainline2Y1-10, mainline2X1-40,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
 //vertical line beside table project
 var line6= av.g.line( mainline2X1-400+20,  mainline2Y1-10, mainline2X1-400+20,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
 var circleOptional=av.g.circle(mainline2X1-400+30,mainline2Y1 ,7 , {"stroke-width": 2});
 var lab=av.label(interpret("<span style='color:red;'> has </span>"), {left: ((mainline2X1-mainline2X2)-60), top: mainline2Y1- 50 });
 lab.css({"font-weight": "bold", "font-size": 20});
 line2.hide();
 line3.hide();
 line4.hide();
 lineMandatory.hide();
 line6.hide();
 circleOptional.hide();
 lab.hide();

 var ArrowLineChild = av.g.line( 200,  180, arrayLeft+40,  arrayTop-50+shiftDrawingValue, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
 ArrowLineChild.hide();
 var ArrowLineEmployee = av.g.line( 200,  180, arrayLeft-280,  arrayTop-50+shiftDrawingValue, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
 ArrowLineEmployee.hide();
 var ArrowLineCHname = av.g.line( LabelLeft-10+shiftDrawingValue+290,  240, LabelLeft-10+shiftDrawingValue+310,pY+5, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
 ArrowLineCHname.hide();
 var ArrowLineTotalParticipation = av.g.line( LabelLeft-10+shiftDrawingValue+335,  320, LabelLeft-10+shiftDrawingValue+310,pY+80, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
 ArrowLineTotalParticipation.hide();
 var ArrowLineEmployeeTable = av.g.line( 180,  220, arrayLeft-400,  arrayTop-50+shiftDrawingValue, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
 ArrowLineEmployeeTable.hide();
 var ArrowLineChildTable = av.g.line( 200,  230, arrayLeft+40+120,  arrayTop-50+shiftDrawingValue, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
 ArrowLineChildTable.hide();

  // Slide 1
  
  av.umsg(interpret("").bold().big());
  var lab1=av.label(interpret("<span style='color:red;'> Weak entity Vs. Strong entity</span>"), {left:220, top: -45 });
  lab1.css({"font-weight": "bold", "font-size": 32});
  av.step();
  av.displayInit();

  // slide 2
  av.umsg(interpret("").bold().big());
  var lab2=av.label(interpret("<span style='color:black;'> What is the difference between weak & strong entities?</span>"), {left:130, top: 60 });
  lab2.css({"font-weight": "bold", "font-size": 24});
  var lab3=av.label(interpret("<span style='color:black;'> AND </span>"), {left:420, top: 90 });
  lab3.css({"font-weight": "bold", "font-size": 24});
  var lab4=av.label(interpret("<span style='color:black;'> How they are related??</span>"), {left:320, top: 120 });
  lab4.css({"font-weight": "bold", "font-size": 24});
  av.step();

  // slide 3
  lab1.hide();
  lab2.hide();
  lab3.hide();
  lab4.hide();
  av.umsg(interpret("").bold().big());
  var lab5=av.label(interpret("<span style='color:red;'> * Strong entity:<i>(regular entity)</i></span> <span style='color:blue;'>normal entity that has a key attribute</span>"), {left:50, top: -25 });
  lab5.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 4
  var lab6=av.label(interpret("<span style='color:red;'> * Weak entity:</span> <span style='color:blue;'>Entity types that <span style='color:turquoise;'>do not</span> have a key attribute of their own</span> (i.e.<i> has no unique identifier (PK)</i>)"), {left:50, top: 20 });
  lab6.css({"font-weight": "bold", "font-size": 20});
  av.step();

   //slide 5
   var lab7=av.label(interpret("<span style='color:red;'> * Weak entity <span style='color:turquoise;'>must</span> be related to another strong entity: </span> as instances of weak entity aquire their uniqueness from their relation to instances of the related strong entity <br> <span style='color:red;'>So In this case:</span> <br>relationship called <span style='color:red;'>---------></span> </b>identifying relationship<b> <br>strong entity called <span style='color:red;'>---------></span> <b> identifying </b> or <b>owner</b> entity "), {left:50, top: 95 });
   lab7.css({"font-weight": "bold", "font-size": 20});
   av.step();

    //slide 6
    var lab8=av.label(interpret("<span style='color:red;'> * Weak entity only has</span> <span style='color:turquoise;'><b>partial key</b></span>, which is the attribute that can uniquely identify weak entity instances that are related to the same owner entity instance"), {left:50, top: 250 });
    lab8.css({"font-weight": "bold", "font-size": 20});
    av.step();

//slide 7
  av.umsg(interpret("<span style='color:red;'>Weak entity Notation</span></br> <span style='color:blue;'>Example given here:</span> is for CHILD entity related to an EMPLOYEE entity, where each employee may have one or more child and each child must have a parent employee.").bold().big());
  lab5.hide();
  lab6.hide();
  lab7.hide();
  lab8.hide();
  var Card1Rect1=av.g.rect(arrayLeft-320, arrayTop-90+shiftDrawingValue, 130, 50, {"stroke-width": 2});
  var Card1Rect1Lab=av.label("<span style='color:blue;'>Employee</span>", {left:arrayLeft-300, top: arrayTop-100+shiftDrawingValue});
  Card1Rect1Lab.css({"font-weight": "bold", "font-size": 20});
  var Card1Rect2=av.g.rect(arrayLeft+30, arrayTop-90+shiftDrawingValue, 130, 50, {"stroke-width": 2});
  var Card1Rect2Duplicate=av.g.rect(arrayLeft+35, arrayTop-85+shiftDrawingValue, 120, 40, {"stroke-width": 2});
  Card1Rect2Duplicate.hide();
  var Card1Rect2Lab=av.label("<span style='color:blue;'>Child</span>", {left:arrayLeft+70, top: arrayTop-100+shiftDrawingValue});
  Card1Rect2Lab.css({"font-weight": "bold", "font-size": 20});
 
  var polygonCard1 = av.g.polyline([[arrayLeft-90, arrayTop-70-25+shiftDrawingValue],
   [arrayLeft-90+45, arrayTop-70+shiftDrawingValue],
   [arrayLeft-90, arrayTop-70+25+shiftDrawingValue],
   [arrayLeft-90-45, arrayTop-70+shiftDrawingValue],
   [arrayLeft-90, arrayTop-70-25+shiftDrawingValue]],
  {"stroke-width": 2, stroke: "black"});

  var polygonCard2 = av.g.polyline([[arrayLeft-90, arrayTop-70-30+shiftDrawingValue],
    [arrayLeft-90+55, arrayTop-70+shiftDrawingValue],
    [arrayLeft-90, arrayTop-70+30+shiftDrawingValue],
    [arrayLeft-90-55, arrayTop-70+shiftDrawingValue],
    [arrayLeft-90, arrayTop-70-30+shiftDrawingValue]],
   {"stroke-width": 2, stroke: "black"});

   polygonCard2.hide();

  var polygonCard1Lab=av.label("<span style='color:blue;'>has</span>", {left:arrayLeft-102, top: arrayTop-70-25+shiftDrawingValue});
  polygonCard1Lab.css({"font-weight": "bold"});
 //left horizontal line
  //var line1 = av.g.line(arrayLeft-90-45,  arrayTop-90+20,  arrayLeft-290+110,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
  line1Chen.show();
  var Line1Lab=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-300+120, top:  arrayTop-123+20+shiftDrawingValue});
  Line1Lab.css({"font-weight": "bold", "font-size": 14});
  //right horizontal line
 // var line2 = av.g.line(arrayLeft-90+45,  arrayTop-90+20,  arrayLeft,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
 line2Chen.show();
 //line2Chenrepitation.show();
  var Line2Lab=av.label("<span style='color:red;'>M</span>", {left:arrayLeft+5, top:  arrayTop-123+20+shiftDrawingValue});
  Line2Lab.css({"font-weight": "bold", "font-size": 14});


//attributes elipses & lines of employee entity
  var EId =av.g.ellipse(LabelLeft-30,pY-5 ,40 ,18, {"stroke-width": 3});
   var EIdLab=av.label("<span style='color:blue;'> EID </span>", {left: LabelLeft-40, top:pY-35});
   EIdLab.css({"font-weight": "underline"});
   EidLine.movePoints([[0,LabelLeft+60,pY+60],[1,LabelLeft-30,pY+10]]);
   EidLine.show();
   var EName =av.g.ellipse(LabelLeft+20+60,pY ,40 ,18, {"stroke-width": 3});
   var ENameLab=av.label("<span style='color:blue;'> Ename </span>", {left: LabelLeft-10+65, top:pY-30 });
   EnameLine.movePoints([[0,LabelLeft+105,pY+60-5],[1,LabelLeft+70,pY+20]]);
   EnameLine.show();
   var Esalary =av.g.ellipse(LabelLeft+185,pY-5 ,40 ,18, {"stroke-width": 3});
   var EsalaryLab=av.label("<span style='color:blue;'> salary </span>", {left: LabelLeft+160, top:pY-35});
   EsalaryLine.movePoints([[0,LabelLeft+120,pY+60-5],[1,LabelLeft+180,pY+15-5]]);
   EsalaryLine.show();

   shiftDrawingValue+=300;
  
   //attributes elipses & lines of employee entity
  var CHname =av.g.ellipse(LabelLeft-10+shiftDrawingValue,pY-5 ,40 ,18, {"stroke-width": 3});
  var CHnameLab=av.label("<span style='color:blue;'> ch-name </span>", {left: LabelLeft-40+shiftDrawingValue, top:pY-35});
  CHnameLab.css({"font-weight": "underline"});
  CHnameLine.movePoints([[0,LabelLeft+60+shiftDrawingValue,pY+55],[1,LabelLeft-10+shiftDrawingValue,pY+15]]);
  CHnameLine.show();
  var CHage =av.g.ellipse(LabelLeft+480,pY ,40 ,18, {"stroke-width": 3});
  var CHageLab=av.label("<span style='color:blue;'> age </span>", {left: LabelLeft+470, top:pY-30 });
  CHageLine.movePoints([[0,LabelLeft+100+shiftDrawingValue,pY+55],[1,LabelLeft+110+shiftDrawingValue,pY+15]]);
  CHageLine.show();
  var CHgender =av.g.ellipse(LabelLeft+600,pY-5 ,40 ,18, {"stroke-width": 3});
  var CHgenderLab=av.label("<span style='color:blue;'> gender </span>", {left: LabelLeft+580, top:pY-30-5});
  CHgenderLine.movePoints([[0,LabelLeft+150+shiftDrawingValue,pY+55],[1,LabelLeft+200+shiftDrawingValue,pY+10]]);
  CHgenderLine.show();

  EmpPKLine.movePoints([[0, LabelLeft-40,pY],[1, LabelLeft-10,pY]]);
  EmpPKLine.show();
  CHPartKeyLine.movePoints([[0,LabelLeft-40+shiftDrawingValue,pY],[1,LabelLeft+20+shiftDrawingValue,pY]]);
  //CHPartKeyLine.show();
av.step();

//slide 8
var lab9=av.label(interpret("<span style='color:red;'>In this case:</span> <br><span style='color:red;'>Child entity</span> is considered ---------> <span style='color:blue;'>weak entity</span> </br> And <span style='color:red;'>denoted by</span> ---------> <span style='color:blue;'> double rectangle </span>"), {left:50, top: 150 });
lab9.css({"font-weight": "bold", "font-size": 20});
ArrowLineChild.show();
Card1Rect2Duplicate.show();
av.step();

//slide 9
var lab10=av.label(interpret("<span style='color:red;'>While,</span> <br><span style='color:red;'>Employee entity</span> is considered ---------> <span style='color:blue;'>strong entity</span> </br>And <span style='color:red;'>denoted by</span> ---------> <span style='color:blue;'> single rectangle</span> like ordinary entities"), {left:50, top: 150 });
lab10.css({"font-weight": "bold", "font-size": 20});
ArrowLineChild.hide();
lab9.hide();
ArrowLineEmployee.show();
av.step();

//slide 10
lab10.hide();
ArrowLineEmployee.hide();
var lab11=av.label(interpret("<span style='color:red;'>Always all weak entities,</span> <br><span style='color:red;'>(e.g. Child entity)</span> ---------> has <span style='color:blue;'>no primary key attribute</span> </br><span style='color:red;'>weak Child entity</span> ---------> only has<span style='color:blue;'> partial key (Ch-name)</span> </br><span style='color:red;'>denoted by</span> ---------> <span style='color:blue;'> dotted underline</span> "), {left:50, top: 150 });
lab11.css({"font-weight": "bold", "font-size": 20});
CHPartKeyLine.show();

ArrowLineCHname.show();
av.step();

//slide 11
lab11.hide();
ArrowLineCHname.hide();
var lab12=av.label(interpret("- As weak Child entity has no PK <span style='color:red;'>So,</span> <br>- <span style='color:red;'>Child entity</span> should depend on---------> <span style='color:blue;'>the strong Employee entity</span> for unique identification. </br> - By relating <span style='color:red;'>every instance of Child entity</span> ---------> with <span style='color:blue;'> one corresponding instance of Employee entity.</span> </br>- This means that <span style='color:red;'>weak Child entity </span>should  ---------> <span style='color:blue;'> totally participate in Has relationship.</span> </br>- This <span style='color:red;'>total participation </span> ---------> is denoted by <span style='color:blue;'> double lines</span>"), {left:40, top: 120 });
lab12.css({"font-weight": "bold", "font-size": 20});
line2Chenrepitation.show();
ArrowLineTotalParticipation.show();
av.step();

//slide 12
av.umsg(interpret("<span style='color:red;'>Using real data example for weak entity illustration</span></br> <span style='color:blue;'><b>Employee table,</b></span> contains 3 employees (Ahmed, Hazem, Khales) each of them has unique ID </br> <span style='color:blue;'><b>Child table,</b></span>contains 6 children(Ali, Nada, Ali, Sara, Morad, Nada)but <u>no unique ID</u> for anyone.").bold().big());
ArrowLineEmployeeTable.show();
var lab13=av.label(interpret("<span style='color:red;'>Employee</span> is <span style='color:blue;'>strong entity</span>, because every employee has unique ID highlighted by yellow"), {left:50, top: 200 });
lab13.css({"font-weight": "bold", "font-size": 20});
matrx3._arrays[0].highlight(0); 
matrx3._arrays[1].highlight(0); 
matrx3._arrays[2].highlight(0); 
matrx3._arrays[3].highlight(0); 
lab12.hide();
ArrowLineTotalParticipation.hide();
CHPartKeyLine.hide();
EmpPKLine.hide();
Card1Rect2Duplicate.hide();
EId.hide();
EIdLab.hide();
EidLine.hide();
EName.hide();
ENameLab.hide();
EnameLine.hide();
Esalary.hide();
EsalaryLab.hide();
EsalaryLine.hide();
CHname.hide();
CHnameLab.hide();
CHnameLine.hide();
CHage.hide();
CHageLab.hide();
CHageLine.hide();
CHgender.hide();
CHgenderLab.hide();
CHgenderLine.hide();
Card1Rect1.hide();
Card1Rect1Lab.hide();
Card1Rect2.hide();
Card1Rect2Lab.hide();
Card1Rect2Duplicate.hide();
Card1Rect2Duplicate.hide();
polygonCard1.hide();
polygonCard1Lab.hide();
polygonCard2.hide();
line1Chen.hide();
Line1Lab.hide();
line2Chen.hide();
line2Chenrepitation.hide();
Line2Lab.hide();
line2.show();
line3.show();
line4.show();
lineMandatory.show();
line6.show();
circleOptional.show();
lab.show();
 // show all rows
 for (var i=0; i < themMatrix1.length; i++)
 {
 matrx1._arrays[i].show();
 }
 // show all rows
 for (var i=0; i < themMatrix3.length; i++)
 {
 matrx3._arrays[i].show();
 }
 Matrix1CHPartKeyLine.show();
 av.step();

 //slide 13
 av.umsg(interpret("").bold().big());
 ArrowLineEmployeeTable.hide();
 lab13.hide();
 ArrowLineChildTable.show();
 var lab14=av.label(interpret("<span style='color:red;'>Child</span> is <span style='color:blue;'>weak entity</span>, No unique ID for children (e.g., two different children Ali & Ali both having the same data of age & gender"), {left:50, top: 200 });
 matrx1._arrays[1].highlight(); 
 matrx1._arrays[3].highlight(); 
 lab14.css({"font-weight": "bold", "font-size": 20});
 matrx3._arrays[0].unhighlight(0); 
 matrx3._arrays[1].unhighlight(0); 
 matrx3._arrays[2].unhighlight(0); 
 matrx3._arrays[3].unhighlight(0);
 av.step();

 //slide 14
 lab14.hide();
 var lab15=av.label(interpret("<span style='color:red;'>Now, How to differentiate between children??????</span>"), {left:50, top: 200 });
 lab15.css({"font-weight": "bold", "font-size": 20});
 av.step();

 //slide 15
 lab15.hide();
 var lab16=av.label(interpret("<span style='color:red;'>The answer is,</span> by their fathers"), {left:50, top: 200 });
 lab16.css({"font-weight": "bold", "font-size": 20});
 av.step();

 //slide 16
 lab16.hide();
 matrx3._arrays[1].highlight(); 
 matrx1._arrays[3].unhighlight(); 
 var lab17=av.label(interpret("<span style='color:red;'>For example</span> first child Ali is the son of employee Ahmed of ID=100"), {left:50, top: 200 });
 lab17.css({"font-weight": "bold", "font-size": 20});
 ArrowLineChildTable.hide();
 av.step();

 //slide 17
 matrx3._arrays[1].unhighlight(); 
 matrx1._arrays[1].unhighlight(); 
 matrx3._arrays[2].highlight(); 
 matrx1._arrays[3].highlight(); 
 lab17.hide();
 var lab18=av.label(interpret("<span style='color:red;'>For example</span> second child Ali is the son of employee Hazem of ID=200"), {left:50, top: 200 });
 lab18.css({"font-weight": "bold", "font-size": 20});
 av.step();

 //slide 18
 matrx3._arrays[2].unhighlight(); 
 lab18.hide();
 var lab19=av.label(interpret("<span style='color:red;'>Then</span> To acctually relate children to their fathers, (PK) of each father should be used as a (FK) for his child <i>(i.e. Binary relationship mapping</i>)"), {left:50, top: 200 });
 lab19.css({"font-weight": "bold", "font-size": 20});
 // show all rows
 for (var i=0; i < themMatrix2.length; i++)
 {
 matrx2._arrays[i].show();
 matrx2._arrays[i].highlight(3);
 }
 // hide all rows
 for (var i=0; i < themMatrix1.length; i++)
 {
 matrx1._arrays[i].hide();
 }
 av.step();

 //slide 19
 lab19.hide();
 for (var i=0; i < themMatrix2.length; i++)
 {
 matrx2._arrays[i].unhighlight(3);
 }
 
 var lab20=av.label(interpret("<span style='color:red;'>Finally the (PK) of Child entity=</span> <span style='color:blue;'>partial key of Child entity + (FK) of Employee entity</span></br><span style='color:red;'>Note:</span>CH-name used alone as a partial primary key because it can only differentiate between the kids of the same father (i.e., no father has two kids with the same name) "), {left:50, top: 200 });
 lab20.css({"font-weight": "bold", "font-size": 20});
 matrx2._arrays[0].highlight(0);
 matrx2._arrays[0].highlight(3);
 matrx2._arrays[0].css([0,3], {"text-decoration": "underline"});
Matrix1CHPartKeyLine.hide();
av.step();

//slide 20
matrx2._arrays[1].highlight();
 matrx2._arrays[3].highlight();
 lab20.hide();
 var lab21=av.label(interpret("<span style='color:red;'>Now, the two children Ali & Ali are different by their composite primary keys"), {left:50, top: 200 });
 lab21.css({"font-weight": "bold", "font-size": 20});
 av.step();

 //slide 21
 matrx2._arrays[1].unhighlight();
 matrx2._arrays[3].unhighlight();
 lab21.hide();
 var lab22=av.label(interpret("<span style='color:red;'>Relational Schema</span></br> Employee (<u>E-ID</u>, E-name, Salary)</br> Child (<u>CH-name</u>, age, gender, <u>E-id</u>)"), {left:50, top: 200 });
 lab22.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 22
lab22.hide();
var lab23=av.label(interpret("<span style='color:red;'> Another Important Example of weak entity</span><span style='color:blue;'>Hotel (strong entity) & Room (weak entity)</span> Because Room doesn't have PK, all rooms may have the same characteristics even the room number, so room number is not a primary key, the same room number can be found in many different hotels.)"), {left:50, top: 200 });
lab23.css({"font-weight": "bold", "font-size": 20});
  av.recorded();
});
