/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "MgrOneVsManyRel";
  //var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  
  var av = new JSAV(av_name);

  //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=10;
  var arrayGap=200;
  var arrayTop=20;

  var arrayLeftCase2=10;
  var arrayTopCase2=20;

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
  //var themMatrix5 =[["P-id","P-name","P-location","E-id1(FK)","E-id2(FK)","E-id3(FK)"],["A","electricity","minia"," "," "," "],["B","plumbing","sohag"," "," "," "],["C","sewage","cairo"," "," "," "],["D","Natural gas","assiut"," "," "," "]];
  //var matrx5= av.ds.matrix(themMatrix5, {style: "table", top: arrayTop, left: arrayLeft }); 
 
  //var themMatrix4 =[["P-id","P-name","P-location","E-id1(FK)","E-id2(FK)"],["A","electricity","minia"," "," "],["B","plumbing","sohag"," "," "],["C","sewage","cairo"," "," "],["D","Natural gas","assiut"," "," "]];
  //var matrx4= av.ds.matrix(themMatrix4, {style: "table", top: arrayTop, left: arrayLeft }); 
 
  var themMatrix3Case2 = [["S-id","S-name"],[1,"ali"],[2,"adel"],[3,"khaled"]];
  var matrx3Case2= av.ds.matrix(themMatrix3Case2, {style: "table", top: arrayTop, left: arrayLeft+95 });
  for (var i=0; i < themMatrix3Case2.length; i++)
  {
    matrx3Case2._arrays[i].hide();
  } 
 
 
  var themMatrix3 = [["S-id","S-name","P-id(FK)"],[1,"ali",""],[2,"adel",""],[3,"khaled",""]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix3Case3 = [["S-id","S-name","P-id(FK)","Sdate"],[1,"ali","",""],[2,"adel","",""],[3,"khaled","",""],[4,"morad","",""],[5,"adam","",""]];
  var matrx3Case3= av.ds.matrix(themMatrix3Case3, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix1 = [["S-id","S-name"],[1,"ali"],[2,"adel"],[3,"khaled"]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });


  var TheBridge1 = [["S-id","P-id"],["",""],["",""],["",""],["",""],["",""],["",""],["",""]];
  var Bridge1= av.ds.matrix(TheBridge1, {style: "table", top: arrayTop, left: arrayLeft+320 });
   // hide all rows of matrix 3
   for (var i=0; i < TheBridge1.length; i++)
   {
    Bridge1._arrays[i].hide();
   }

  var TheBridge2 = [["S-id","P-id","Sdate"],["","",""],["","",""],["","",""],["","",""],["","",""],["","",""]];
  var Bridge2= av.ds.matrix(TheBridge2, {style: "table", top: arrayTop, left: arrayLeft+320 });
  for (var i=0; i < TheBridge2.length; i++)
  {
   Bridge2._arrays[i].hide();
  }

  var ERDlab=av.label(interpret("<span style='color:blue;'> Logical ER-Diagram </span>"), {left: arrayLeft, top: arrayTop-40 });
  ERDlab.css({"font-weight": "bold", "font-size": 20});
  ERDlab.hide();
  
  arrayLeft+=arrayWidth+arrayGap;
  arrayLeft+=arrayWidth+arrayGap;

  arrayLeftCase2+=arrayWidth+arrayGap;
  arrayLeftCase2+=arrayWidth+arrayGap;

 var themMatrix2Case2 =[["P-id","P-name","P-location", "S-id (FK)"],["A","electricity","minia",""],["B","plumbing","sohag",""],["C","sewag","assiut",""],["D","construction","cairo",""],["E","Irrigation","Luxor",""]];
  var matrx2Case2= av.ds.matrix(themMatrix2Case2, {style: "table", top: arrayTop, left: arrayLeft });
  for (var i=0; i < themMatrix2Case2.length; i++)
  {
    matrx2Case2._arrays[i].hide();
  } 


  var themMatrix2Case3 =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewag","assiut"],["","",""]];
  var matrx2Case3= av.ds.matrix(themMatrix2Case3, {style: "table", top: arrayTop, left: arrayLeft });
  for (var i=0; i < themMatrix2Case3.length; i++)
  {
    matrx2Case3._arrays[i].hide();
  } 

  
  var themMatrix2 =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewag","assiut"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });
  

  var themMatrix2Copy =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewag","assiut"],["D","construction","cairo"],["E","Irrigation","Luxor"]];
  var matrx2Copy= av.ds.matrix(themMatrix2Copy, {style: "table", top: arrayTop, left: arrayLeft });
  for (var i=0; i < themMatrix2Copy.length; i++)
  {
  matrx2Copy._arrays[i].hide();
  } 

  var themMatrix2Case5 =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewag","assiut"],["D","construction","cairo"],["E","Irrigation","Luxor"]];
  var matrx2Case5= av.ds.matrix(themMatrix2Case5, {style: "table", top: arrayTop, left: arrayLeft+60 });
  for (var i=0; i < themMatrix2Case5.length; i++)
  {
  matrx2Case5._arrays[i].hide();
  } 

  var schmaOffsit=arrayLeft+75;
  var SCHlab=av.label(interpret("<span style='color:blue;'> physical schema Diagram </span>"), {left: schmaOffsit, top: arrayTop-40 });
  SCHlab.css({"font-weight": "bold", "font-size": 20});
  SCHlab.hide();
  var empSchlab=av.label(interpret("Supervisor"), {left: schmaOffsit, top: arrayTop });
  empSchlab.css({"font-weight": "bold", "font-size": 15});
  empSchlab.hide();
  var empSchema = [["S-id","S-name","S-salary","P-id(FK)"]];
  var empSchemaArr= av.ds.matrix(empSchema, {style: "table", top: arrayTop+20, left: schmaOffsit});
  empSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  empSchemaArr._arrays[0].hide();
  
  var proSchlab=av.label(interpret("Project"), {left: schmaOffsit, top: arrayTop+70 });
  proSchlab.css({"font-weight": "bold", "font-size": 15});
  proSchlab.hide();
  var proSchema = [["P-id","P-name","P-location"]];
  var proSchemaArr= av.ds.matrix(proSchema, {style: "table", top: arrayTop+90, left: schmaOffsit});
  proSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  proSchemaArr._arrays[0].hide();

 
  // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2Case2._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  matrx3Case2._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2Case3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx3Case3._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  matrx2Copy._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2Case5._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  Bridge1._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  Bridge2._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

  // to underline primary keys in all tables
  matrx1._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2._arrays[0].css([0], {"text-decoration": "underline"});
  matrx3._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2Case2._arrays[0].css([0], {"text-decoration": "underline"});
  matrx3Case2._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2Case3._arrays[0].css([0], {"text-decoration": "underline"});
  matrx3Case3._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2Copy._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2Case5._arrays[0].css([0], {"text-decoration": "underline"});
  Bridge1._arrays[0].css([0,1], {"text-decoration": "underline"});
  Bridge2._arrays[0].css([0,1], {"text-decoration": "underline"});

  // hide all rows of matrix 3
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  }

  for (var i=0; i < themMatrix3Case3.length; i++)
  {
  matrx3Case3._arrays[i].hide();
  }
// hide all rows of matrix 1
for (var i=0; i < themMatrix1.length; i++)
{
matrx1._arrays[i].hide();
}

// hide all rows of matrix 2
for (var i=0; i < themMatrix2.length; i++)
{
matrx2._arrays[i].hide();
}



  //Draw relation between project and employee tables in the first slide
  var mainline2X1=740+50-140;
  var mainline2Y1=110;
  var mainline2X2=290;
  var mainline2Y2=mainline2Y1; 

  // main that represents the two tables' relations
  var line2 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2,  mainline2Y2, {opacity: 100, "stroke-width": 2});

  var lineLftCase4 = av.g.line(330,  mainline2Y1, mainline2X2-100,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  lineLftCase4.hide();
  var lineRhtCase4 = av.g.line(mainline2X1,  mainline2Y1, 330+180,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  lineRhtCase4.hide();

  var lineRhtCase5 = av.g.line(mainline2X1+60,  mainline2Y1, 330+180+90,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  lineRhtCase5.hide();

  var Card1LftCase4=av.label(interpret("<span style='color:red;'><b> 1</b> </span>"), {left: mainline2X2-90, top: mainline2Y1- 45 });
  Card1LftCase4.css({"font-weight": "bold", "font-size": 20});
  Card1LftCase4.hide();

  var Card2LftCase4=av.label(interpret("<span style='color:red;'><b> M</b> </span>"), {left: 310, top: mainline2Y1- 45 });
  Card2LftCase4.css({"font-weight": "bold", "font-size": 20});
  Card2LftCase4.hide();

  var Card3LftCase4=av.label(interpret("<span style='color:red;'><b> M</b> </span>"), {left: 330+190, top: mainline2Y1- 45 });
  Card3LftCase4.css({"font-weight": "bold", "font-size": 20});
  Card3LftCase4.hide();

  var Card4LftCase4=av.label(interpret("<span style='color:red;'><b> 1</b> </span>"), {left: mainline2X1-20, top: mainline2Y1- 45 });
  Card4LftCase4.css({"font-weight": "bold", "font-size": 20});
  Card4LftCase4.hide();

  var Card3LftCase5=av.label(interpret("<span style='color:red;'><b> M</b> </span>"), {left: 330+190+87, top: mainline2Y1- 45 });
  Card3LftCase5.css({"font-weight": "bold", "font-size": 20});
  Card3LftCase5.hide();

  var Card4LftCase5=av.label(interpret("<span style='color:red;'><b> 1</b> </span>"), {left: mainline2X1-20+60, top: mainline2Y1- 45 });
  Card4LftCase5.css({"font-weight": "bold", "font-size": 20});
  Card4LftCase5.hide();



  var line2Case3 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2+80,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  //cross foot of the tables' relations
  var line3 = av.g.line( mainline2X1-20,  mainline2Y1,  mainline2X1,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
  var line4 = av.g.line( mainline2X1-20,  mainline2Y1, mainline2X1,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  var Card1Case1=av.label(interpret("<span style='color:red;'><b> 1</b> </span>"), {left: mainline2X1-20, top: mainline2Y1- 50 });
  Card1Case1.css({"font-weight": "bold", "font-size": 20});
  Card1Case1.hide();

  var Card1Case2=av.label(interpret("<span style='color:red;'><b> M</b> </span>"), {left: mainline2X1-20, top: mainline2Y1- 50 });
  Card1Case2.css({"font-weight": "bold", "font-size": 20});
  Card1Case2.hide();
  //two vertical lines of the tables' relations
  //vertical line beside table project
  //var line5 = av.g.line( mainline2X1-20,  mainline2Y1-10, mainline2X1-20,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
  //vertical line beside table employee
  var line6= av.g.line( mainline2X1-335,  mainline2Y1-10, mainline2X1-335,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  var Card2Case1=av.label(interpret("<span style='color:red;'><b> 1</b> </span>"), {left: mainline2X1-335, top: mainline2Y1- 50 });
  Card2Case1.css({"font-weight": "bold", "font-size": 20});
  Card2Case1.hide();

  var Card2Case3=av.label(interpret("<span style='color:red;'><b> M</b> </span>"), {left: mainline2X1-335+65, top: mainline2Y1- 45 });
  Card2Case3.css({"font-weight": "bold", "font-size": 20});
  Card2Case3.hide();

  var Card1Case3=av.label(interpret("<span style='color:red;'><b> 1</b> </span>"), {left: mainline2X1-20, top: mainline2Y1- 45 });
  Card1Case3.css({"font-weight": "bold", "font-size": 20});
  Card1Case3.hide();

  var lab=av.label(interpret("<span style='color:red;'> Supervise </span>"), {left: ((mainline2X1-mainline2X2)+60), top: mainline2Y1- 50 });
  lab.css({"font-weight": "bold", "font-size": 20});


  // array that hold project number that has already worked employee so as when another employee come to work at this project we will search
  //that array to see if the employee cell isnot empty we will add a new record to the project matrix 
  //that result in redundancy problem that we want to show
  
  var pointer1;
  var arr_values = [];
  //var NoEmpProA=0;
  //var NoEmpProB=0;
  //var NoEmpProC=0;
 // var NoEmpProD=0;
 // var matrix3Flag=0;
 // var matrix4Flag=0;
 // var matrix5Flag=0;
  var arrFullProIndex=0;
  var redundantProIndex=themMatrix2.length;
  var empNo=0;
  var proNo=0;
  var cx=arrayLeft+48;
  var cy=arrayTop+(30*((empNo)+1));
  var cRadius=15;
  var x1=cx;
  var y1=arrayTop+(30*((empNo)+1));
  var x2=350;
  var y2=arrayTop+(30*((proNo)+1));
  
  var circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  var line1 = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  line1.hide();
  av.umsg(interpret("sc1").bold().big());

  //hide lines of relation
line2.hide();
line2Case3.hide();
line3.hide();
line4.hide();
//line5.hide();
line6.hide();
lab.hide();

  // Slide 1
  av.umsg(interpret("Assume having two entities one for <span style='color:red;'>Supervisor</span> entity & the other for <span style='color:red;'>Project entity</span> both are related using <span style='color:blue;'>Control relationship</span>.This visualization presents five different problem statements for the same <span style='color:blue;'>binary Control relationship</span>.").bold().big());
  av.displayInit(1);

  //slide 2
  av.umsg(interpret("<span style='color:red;'>Case 1:</span> where each project is controlled by one supervisor and a supervisor can at most control one project").bold().big());
  av.step();

  //slide 3
  av.umsg(interpret("<span style='color:red;'>Case1 solution:</span> This relation should be considered a <span style='color:red;'><b>1:1</b></span> binary relationship</br><span style='color:blue;'>As said before:</span> in case of 1:1 relation PK of any entity can be used as a FK for the other entity <span style='color:red;'>(both are equivalent solutions)</span>").bold().big());
  line2.show();
  Card1Case1.show();
  Card2Case1.show();
  lab.show();
  // hide all of the rows of matrix 2 and show all rows of matrix3 knowing that the two rows are of the same length
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx1._arrays[i].hide();
  matrx3._arrays[i].show();
  }  

  // hide all rows of matrix 2
for (var i=0; i < themMatrix2.length; i++)
{
matrx2._arrays[i].show();
}
  av.step();

  //slide 4
  av.umsg(interpret("<span style='color:red;'>Example data:</span> </br><span style='color:red;'>ali</span> controls <span style='color:blue;'>sewag</span> project ,, <span style='color:red;'>Khaled</span> controls <span style='color:blue;'>electricity</span> project ,, <span style='color:red;'>adel</span> controls <span style='color:blue;'>plumbing</span> project").bold().big());
  matrx3._arrays[1].value(2,"<span style='color:red;'>C</span>");
  matrx3._arrays[2].value(2,"<span style='color:red;'>B</span>");
  matrx3._arrays[3].value(2,"<span style='color:red;'>A</span>");
  var pointerCase1=av.pointer("For each <span style='color:red;'>Supervisor</span>, the <span style='color:red;'> FK (P-id) </span> references <span style='color:blue;'> the project <span style='color:red;'> under his supervision  ", matrx3._arrays[0].index(2), {left: 110, top:0 });
  matrx3._arrays[0].highlight(2);
  av.step();

  //slide 5
  line2.hide();
  av.umsg(interpret("<span style='color:red;'>Case 2:</span> , each project is controled by one supervisor and a supervisor can control many projects ").bold().big());
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  }  
  for (var i=0; i < themMatrix2.length; i++)
  {
  matrx2._arrays[i].hide();
  }  
  pointerCase1.hide();
  matrx3._arrays[1].value(2,"");
  matrx3._arrays[2].value(2,"");
  matrx3._arrays[3].value(2,"");
  lab.hide();
  Card1Case1.hide();
  Card2Case1.hide();
    av.step();

     //slide 6
     av.umsg(interpret("<span style='color:red;'>Case2 solution:</span> This relation should be considered a <span style='color:red;'><b>1:M</b></span> binary relationship</br><span style='color:blue;'>where</span> (M) beside table project & (1) beside table supervisor </br> <span style='color:red;'>Following the rule:</span> PK from 1 side (i.e. Sid) inserted as a FK in the M side (project entity)").bold().big());
  // hide all rows of matrix 2
for (var i=0; i < themMatrix2Case2.length; i++)
{
matrx2Case2._arrays[i].show();
}
// hide all of the rows of matrix 2 and show all rows of matrix3 knowing that the two rows are of the same length
for (var i=0; i < themMatrix3Case2.length; i++)
{
//matrx1._arrays[i].hide();
matrx3Case2._arrays[i].show();
}  
line2.show();
  Card1Case2.show();
  Card2Case1.show();
  lab.show();
  av.step();


  //slide 7
  av.umsg(interpret("<span style='color:red;'>Example data:</span> </br><span style='color:red;'>ali</span> controls projects <span style='color:blue;'>A, C & E</span>,, <span style='color:red;'>adel</span> controls project <span style='color:blue;'>D</span>  ,, <span style='color:red;'>Khaled</span> controls project <span style='color:blue;'>B</span>").bold().big());
  matrx2Case2._arrays[1].value(3,"<span style='color:red;'>1</span>");
  matrx2Case2._arrays[2].value(3,"<span style='color:red;'>3</span>");
  matrx2Case2._arrays[3].value(3,"<span style='color:red;'>1</span>");
  matrx2Case2._arrays[4].value(3,"<span style='color:red;'>2</span>");
  matrx2Case2._arrays[5].value(3,"<span style='color:red;'>1</span>");
  var pointer1Case2=av.pointer("AS shown here supervisor <span style='color:red;'>Ali (Sid=1)</span>, controls <span style='color:blue;'>three different projects</span> at the same time so this design is <span style='color:red;'><b> perfectly fitting the problem requirement</b></span>", matrx2Case2._arrays[2].index(3), {left: -670, top: 175});
  var pointer2Case2=av.pointer(" ", matrx2Case2._arrays[4].index(3), {left: -230, top: 135});
  var pointer3Case2=av.pointer(" ", matrx2Case2._arrays[5].index(3), {left: -230, top: 110});
  matrx2Case2._arrays[1].highlight(3);
  matrx2Case2._arrays[3].highlight(3);
  matrx2Case2._arrays[5].highlight(3);
  matrx3Case2._arrays[1].highlight();
  av.step();

  //slide 8
  line2.hide();
  av.umsg(interpret("<span style='color:red;'>Case 3:</span>").bold().big());
  var Case3lab=av.label(interpret("Each project is controlled by one supervisor and a supervisor can at most controls one project,but the database should store the supervision history (i.e. to record all supervisors who controlled each project at different time periods) assuming that a supervisor can take supervision role only once in his working life time"), {left: 10, top:-10 });
  Case3lab.css({"font-weight": "bold", "font-size": 18});
  for (var i=0; i < themMatrix3Case2.length; i++)
  {
  matrx3Case2._arrays[i].hide();
  }  
  for (var i=0; i < themMatrix2Case2.length; i++)
  {
  matrx2Case2._arrays[i].hide();
  }  
  pointer1Case2.hide();
  pointer2Case2.hide();
  pointer3Case2.hide();
  lab.hide();
  Card1Case2.hide();
  Card2Case1.hide();
  av.step();

  //slide 9
  Case3lab.hide();
  var Case3lab=av.label(interpret("<span style='color:purple;'>Each project is controlled by one supervisor and a supervisor can at most controls one project,</span> but the database should store the supervision history (i.e. to record all supervisors who controlled each project at different time periods) assuming that a supervisor can take supervision role only once in his working life time"), {left: 10, top:-10 });
  Case3lab.css({"font-weight": "bold", "font-size": 18});
  var Case3Comment=av.label(interpret("<span style='color:red;'>Notice:</span> The first part of the problem statement <i>(highlighted by purple)</i> makes the relation looks like a regular 1:1 relationship <span style='color:red;'><b>But</b></span> after reading the rest of the problem the design perception is changed <i><span style='color:green;'>(see next slide to understand which design fulfills the whole problem statement requirements)</span></i>"), {left: 10, top:100 });
  Case3Comment.css({"font-weight": "bold", "font-size": 18}); 
  av.step();

     //slide 10
     Case3lab.hide();
     Case3Comment.hide();
     av.umsg(interpret("<span style='color:red;'>Case3 solution:</span>").bold().big());
     var Case3Comment2=av.label(interpret("<span style='color:red;'>Inspite of</span> the fact that at any given time a supervisor can only controls one project and also each project has one supervisor, the relation should be modelled as <span style='color:blue;'>1:M relation where (1) beside project & (M) beside supervisor</span> & additional attribute of supervision date <span style='color:blue;'>(Sdate)</span> is added to the relation"), {left: 10, top:-25 });
     Case3Comment2.css({"font-weight": "bold", "font-size": 18});

     var Case3Comment3=av.label(interpret("<span style='color:red;'>The reason behind using 1:M relationship is:</span> that each project is actually related to one current supervisor and a lot of previous supervisors who controlled the project in past periods </br> <span style='color:red;'>So</span> each project is related to many supervisors <span style='color:blue;'>(M)</span> in different periods (i.e., <i><span style='color:blue;'> periods</span> represented by <span style='color:blue;'> Sdate</span> attribute</i>)"), {left: 10, top:80 });
     Case3Comment3.css({"font-weight": "bold", "font-size": 18});
av.step();

//slide 11
Case3Comment2.hide();
Case3Comment3.hide();
av.umsg(interpret("<span style='color:red;'>Case3 solution continue:</span></br> <span style='color:red;'>Following the mapping rule:</span> PK from 1 side <span style='color:blue;'>(i.e. P-id)</span> inserted as a <span style='color:blue;'>FK</span> in the M side (Supervisor entity) & also the relational attribute <span style='color:blue;'>(Sdate)</span> inserted with the FK").bold().big());

// hide all rows of matrix 2
for (var i=0; i < themMatrix2Case3.length-1; i++)
{
matrx2Case3._arrays[i].show();
}
// hide all of the rows of matrix 2 and show all rows of matrix3 knowing that the two rows are of the same length
for (var i=0; i < themMatrix3Case3.length; i++)
{
//matrx1._arrays[i].hide();
matrx3Case3._arrays[i].show();
}  
line2Case3.show();
  Card1Case3.show();
  Card2Case3.show();
  lab.show();
  av.step();

  //slide 12
  av.umsg(interpret("<span style='color:red;'>Example data:</span> </br><span style='color:red;'>ali</span> controls project <span style='color:blue;'>C</span> at <span style='color:green;'> 2016 </span>, while <span style='color:red;'>morad</span> controls <span style='color:blue;'>the same project</span> at <span style='color:green;'> 2018 </span> And Now at <span style='color:blue;'>2023</span> <span style='color:red;'>adam</span> controls it.  <span style='color:red;'> Khaled</span> controls project <span style='color:blue;'>A</span> <span style='color:green;'> since 2021</span> & <span style='color:red;'>adel</span> controls project <span style='color:blue;'>B</span> at <span style='color:green;'>2000</span>").bold().big());
  matrx3Case3._arrays[1].value(2,"<span style='color:red;'>C</span>");
  matrx3Case3._arrays[1].value(3,"<span style='color:blue;'>2016</span>");
  matrx3Case3._arrays[2].value(2,"<span style='color:red;'>B</span>");
  matrx3Case3._arrays[2].value(3,"<span style='color:blue;'>2000</span>");
  matrx3Case3._arrays[3].value(2,"<span style='color:red;'>A</span>");
  matrx3Case3._arrays[3].value(3,"<span style='color:blue;'>2021</span>");
  matrx3Case3._arrays[4].value(2,"<span style='color:red;'>C</span>");
  matrx3Case3._arrays[4].value(3,"<span style='color:blue;'>2018</span>");
  matrx3Case3._arrays[5].value(2,"<span style='color:red;'>C</span>");
  matrx3Case3._arrays[5].value(3,"<span style='color:blue;'>2023</span>");
  //var pointer1Case2=av.pointer("AS shown here supervisor <span style='color:red;'>Ali</span>, controls <span style='color:blue;'>three different projects</span> at the same time so this design is <span style='color:red;'><b> perfectly fitting the problem requirement</b></span>", matrx2Case2._arrays[2].index(3), {left: -670, top: 175});
  //var pointer2Case2=av.pointer(" ", matrx2Case2._arrays[4].index(3), {left: -230, top: 135});
  //var pointer3Case2=av.pointer(" ", matrx2Case2._arrays[5].index(3), {left: -230, top: 110});
  //matrx2Case2._arrays[1].highlight(3);
  //matrx2Case2._arrays[3].highlight(3);
  //matrx2Case2._arrays[5].highlight(3);
  av.step();

  //slide 13
  matrx3Case3._arrays[0].highlight(3);
  var Sdate=av.pointer("<span style='color:red;'><b> Sdate</b></span>: <span style='color:blue;'>relational attribute</span>, representing <span style='color:blue;'>supervision period</span> describes the relationship not the supervisor entity nor the project entity", matrx3Case3._arrays[1].index(3), {left: -100, top: 300});
  av.step();

  //slide 14
  matrx3Case3._arrays[0].unhighlight(3);
  Sdate.hide();
  matrx3Case3._arrays[1].highlight(2);
  matrx3Case3._arrays[1].highlight(3);
  matrx3Case3._arrays[4].highlight(2);
  matrx3Case3._arrays[4].highlight(3);
  matrx3Case3._arrays[5].highlight(2);
  matrx3Case3._arrays[5].highlight(3);
  matrx2Case3._arrays[3].highlight();
  var ProC=av.pointer("<span style='color:red;'>Project C</span> related to <span style='color:blue;'>3</span> supervisors (ali, morad ,adam)", matrx2Case3._arrays[3].index(1), {left: -100, top: 300});
  var ProCAdam=av.pointer("<span style='color:red;'><b> adam</b></span> is the  <span style='color:blue;'> current supervisor</span> for project  <span style='color:blue;'>C (sewag)</span> ", matrx3Case3._arrays[5].index(2), {left: -100, top: 270});
  var ProCali=av.pointer("<span style='color:blue;'>ali</span> Previous supervisor for project C, <span style='color:green;'> supervision period=2016</span>", matrx3Case3._arrays[2].index(2), {left: -180, top: 190});
  var ProCmorad=av.pointer("<span style='color:blue;'>morad</span> Previous supervisor for project C, <span style='color:green;'> supervision period=2018</span>", matrx3Case3._arrays[5].index(2), {left: -120, top: 240});
  av.step();

  //slide 15
  matrx3Case3._arrays[1].unhighlight(2);
  matrx3Case3._arrays[1].unhighlight(3);
  matrx3Case3._arrays[4].unhighlight(2);
  matrx3Case3._arrays[4].unhighlight(3);
  matrx3Case3._arrays[5].unhighlight(2);
  matrx3Case3._arrays[5].unhighlight(3);
  matrx2Case3._arrays[3].unhighlight();
  ProC.hide();
  ProCAdam.hide();
  ProCali.hide();
  ProCmorad.hide();
  av.umsg(interpret("<span style='color:red;'>Case 4:</span> , each project is controled by many supervisor and a supervisor can control many projects at the same time").bold().big());
 // hide all rows of matrix 2
for (var i=0; i < themMatrix2Case3.length-1; i++)
{
matrx2Case3._arrays[i].hide();
}
// hide all of the rows of matrix 2 and show all rows of matrix3 knowing that the two rows are of the same length
for (var i=0; i < themMatrix3Case3.length; i++)
{
//matrx1._arrays[i].hide();
matrx3Case3._arrays[i].hide();
}  
line2Case3.hide();
  Card1Case3.hide();
  Card2Case3.hide();
  lab.hide();
  av.step();

  //slide 16
  av.umsg(interpret("<span style='color:red;'>Case 4 solution:</span> This relation should be considered a <span style='color:blue;'><b>N:M</b></span> binary relationship</br> <span style='color:red;'>Following the mapping rule:</span> create a <span style='color:blue;'>bridge</span> containing both PKs <span style='color:red;'>(sid, p-id) as Fks</span> for their tables & act as <span style='color:red;'>composite PK</span> for the bridge table").bold().big());
  for (var i=0; i < themMatrix2Copy.length; i++)
  {
  matrx2Copy._arrays[i].show();
  }  

  for (var i=0; i < TheBridge1.length; i++)
  {
   Bridge1._arrays[i].show();
  }

  for (var i=0; i < themMatrix1.length; i++)
  {
  matrx1._arrays[i].show();
  }  
  lineLftCase4.show();
  lineRhtCase4.show();
  Card1LftCase4.show();
  Card2LftCase4.show();
  Card3LftCase4.show();
  Card4LftCase4.show();
  av.step();

  //slide 17
  av.umsg(interpret("<span style='color:red;'>Example data:</span> </br><span style='color:red;'>ali</span> controls projects <span style='color:blue;'>B,D</span>,, <span style='color:red;'>adel</span> controls project <span style='color:blue;'>B,C & E</span>  ,, <span style='color:red;'>Khaled</span> controls project <span style='color:blue;'>A,B</span>").bold().big());
  Bridge1._arrays[1].value(0,"<span style='color:red;'>1</span>");
  Bridge1._arrays[1].value(1,"<span style='color:blue;'>D</span>");
  Bridge1._arrays[2].value(0,"<span style='color:red;'>3</span>");
  Bridge1._arrays[2].value(1,"<span style='color:blue;'>B</span>");
  Bridge1._arrays[3].value(0,"<span style='color:red;'>2</span>");
  Bridge1._arrays[3].value(1,"<span style='color:blue;'>C</span>");
  Bridge1._arrays[4].value(0,"<span style='color:red;'>1</span>");
  Bridge1._arrays[4].value(1,"<span style='color:blue;'>B</span>");
  Bridge1._arrays[5].value(0,"<span style='color:red;'>3</span>");
  Bridge1._arrays[5].value(1,"<span style='color:blue;'>A</span>");
  Bridge1._arrays[6].value(0,"<span style='color:red;'>2</span>");
  Bridge1._arrays[6].value(1,"<span style='color:blue;'>E</span>");
  Bridge1._arrays[7].value(0,"<span style='color:red;'>2</span>");
  Bridge1._arrays[7].value(1,"<span style='color:blue;'>B</span>");
  Bridge1._arrays[0].highlight();
 var Brdg1Pointer=av.pointer("This <span style='color:red;'>Bridge</span>, can represent all required <span style='color:blue;'>information</span> that perfectly fitting the problem requirement", Bridge1._arrays[1].index(0), {left: -300, top: 300});
 // var pointer2Case2=av.pointer(" ", matrx2Case2._arrays[4].index(3), {left: -230, top: 135});
 // var pointer3Case2=av.pointer(" ", matrx2Case2._arrays[5].index(3), {left: -230, top: 110});
//  matrx2Case2._arrays[1].highlight(3);
 // matrx2Case2._arrays[3].highlight(3);
 // matrx2Case2._arrays[5].highlight(3);
  av.step();

  //slide 18
  Brdg1Pointer.hide();
  var SuperPointerCase4=av.pointer("<span style='color:red;'>E.g.</span> Supervisor <span style='color:red;'>adel (sid=2)</span>, supervises <span style='color:blue;'>three projects</span> (B,C & E)", matrx1._arrays[3].index(1), {left: -50, top: 220});
  matrx1._arrays[2].highlight();
  Bridge1._arrays[0].unhighlight();
  av.step();

  //slide 19
  SuperPointerCase4.hide();
  var Brdg1Pointer2Case4=av.pointer("three projects <span style='color:blue;'>(B,C & E)</span> of supervisor adel (sid=2)", Bridge1._arrays[7].index(1), {left: 30, top: 160});
  matrx1._arrays[2].value(0,"<span style='color:Darkblue;'>2</span>");
  Bridge1._arrays[3].value(0,"<span style='color:Darkblue;'>2</span>");
  Bridge1._arrays[6].value(0,"<span style='color:Darkblue;'>2</span>");
  Bridge1._arrays[7].value(0,"<span style='color:Darkblue;'>2</span>");
  Bridge1._arrays[3].highlight();
  Bridge1._arrays[6].highlight();
  Bridge1._arrays[7].highlight();
  av.step();


  //slide 20
  av.umsg(interpret("From this design We can also know; <span style='color:red;'>Who are the supervisors of a specific project?</span></br> <span style='color:red;'>E.g.: </span> who are the supervisors of plumbing project (P-id=B)?").bold().big());
  Brdg1Pointer2Case4.hide();
  matrx1._arrays[2].unhighlight();
  matrx1._arrays[2].value(0,"<span style='color:black;'>2</span>");
  Bridge1._arrays[3].value(0,"<span style='color:red;'>2</span>");
  Bridge1._arrays[6].value(0,"<span style='color:red;'>2</span>");
  Bridge1._arrays[7].value(0,"<span style='color:red;'>2</span>");
  Bridge1._arrays[3].unhighlight();
  Bridge1._arrays[6].unhighlight();
  Bridge1._arrays[7].unhighlight();
  matrx2Copy._arrays[2].highlight();
  av.step();

  //slide 21
  Bridge1._arrays[2].value(1,"<span style='color:red;'>B</span>");
  Bridge1._arrays[4].value(1,"<span style='color:red;'>B</span>");
  Bridge1._arrays[7].value(1,"<span style='color:red;'>B</span>");
  Bridge1._arrays[2].highlight();
  Bridge1._arrays[4].highlight();
  Bridge1._arrays[7].highlight();
  var Brdg1Pointer3Case4=av.pointer("<span style='color:red;'>From the bridge</span> we can conclude that the supervisors of <span style='color:red;'>project B (Plumbing) are:</span> <span style='color:blue;'>(3,1 & 2)</span></br> </br>where <span style='color:red;'>sid=3</span> ------->then supervisor= <span style='color:blue;'>Khaled</span>", Bridge1._arrays[3].index(0), {left: 50, top: 225});
  var Brdg1Pointer4Case4=av.pointer("where <span style='color:red;'>sid=1</span> ------->then supervisor = <span style='color:blue;'>ali</span>", Bridge1._arrays[5].index(0), {left: 10, top: 200});
  var Brdg1Pointer5Case4=av.pointer("where <span style='color:red;'>sid=2</span> ------->then supervisor= <span style='color:blue;'>adel</span>", Bridge1._arrays[7].index(0), {left: -120, top: 175});
  av.step();

  //slide 22
  Brdg1Pointer3Case4.hide();
  Brdg1Pointer4Case4.hide();
  Brdg1Pointer5Case4.hide();
  Bridge1._arrays[2].value(1,"<span style='color:blue;'>B</span>");
  Bridge1._arrays[4].value(1,"<span style='color:blue;'>B</span>");
  Bridge1._arrays[7].value(1,"<span style='color:blue;'>B</span>");
  Bridge1._arrays[2].unhighlight();
  Bridge1._arrays[4].unhighlight();
  Bridge1._arrays[7].unhighlight();
  av.umsg(interpret("<span style='color:red;'>Case 5:</span>").bold().big());
  var Case5lab=av.label(interpret("At a given time, each project is controlled by one supervisor and a supervisor can at most control one project but the database should store the supervision history (i.e. we need to record all supervisors who managed each department at different time periods)"), {left: 10, top:-10 });
  Case5lab.css({"font-weight": "bold", "font-size": 18});
  var Case5Comment=av.label(interpret("<span style='color:red;'>Notice:</span> case 5 here is exactly the <span style='color:blue;'>same as</span> case 3 <span style='color:blue;'>except</span> the last part of case 3 is removed from case 5, which is <i>the restriction for each supervisor to take supervision role only once in his working lifetime</i>. </br> <span style='color:red;'>This difference</span> between case 3 and case 5 leads to a <span style='color:blue;'>different relationship cardinality</span> as shown in the next slide."), {left: 10, top:100 });
  Case5Comment.css({"font-weight": "bold", "font-size": 18}); 
  for (var i=0; i < themMatrix2Copy.length; i++)
  {
  matrx2Copy._arrays[i].hide();
  }  

  for (var i=0; i < TheBridge1.length; i++)
  {
   Bridge1._arrays[i].hide();
  }

  for (var i=0; i < themMatrix1.length; i++)
  {
  matrx1._arrays[i].hide();
  }  
  lineLftCase4.hide();
  lineRhtCase4.hide();
  Card1LftCase4.hide();
  Card2LftCase4.hide();
  Card3LftCase4.hide();
  Card4LftCase4.hide();
  av.step();

   //slide 23
   Case5lab.hide();
   Case5Comment.hide();
  av.umsg(interpret("<span style='color:red;'>Case 5 Solution:</span> instead of considering case 5 a 1:M relation as case 3, it is <span style='color:blue;'>considered a N:M realtionship</span> to fulfill the problem requirment. </span>").bold().big());
  var Case5Comment1=av.label(interpret("<span style='color:red;'>The N:M design here allows</span> each project to have different supervisors at different time slots <span style='color:red;'>as well as</span> allowing also the supervisors to take the supervision role many times at different periods <i>which is case 5 requirement</i>."), {left: 10, top:-10 });
  Case5Comment1.css({"font-weight": "bold", "font-size": 18});
  av.step();

  //slide 24
  //av.umsg(interpret("<span style='color:red;'>Case 5 Solution continue:").bold().big());
   var Case5Comment2=av.label(interpret("<span style='color:red;'>Following the mapping rules:</span> case 5 solution requires a bridge for representing N:M relationship, <span style='color:blue;'> but here</span> the bridge should contain an additional relational attribute 'Sdate'. </br> <span style='color:blue;'>'Sdate'</span> used for representing the time period for a specific supervisor controlling a certain project."), {left: 10, top:80 });
   Case5Comment2.css({"font-weight": "bold", "font-size": 18});
   av.step();

   //slide 25
   Case5Comment1.hide();
   Case5Comment2.hide();
   av.umsg(interpret("<span style='color:red;'>Case 5 Solution:</span> <span style='color:blue;'>N:M</span> relationship represented by a <span style='color:blue;'>bridge</span> containing an additional relational attribute <span style='color:blue;'>'Sdate'</span>").bold().big());
   for (var i=0; i < themMatrix2Case5.length; i++)
   {
   matrx2Case5._arrays[i].show();
   }  
 
   for (var i=0; i < TheBridge2.length; i++)
   {
    Bridge2._arrays[i].show();
   }
 
   for (var i=0; i < themMatrix1.length; i++)
   {
   matrx1._arrays[i].show();
   }  
   lineLftCase4.show();
   lineRhtCase5.show();
   Card1LftCase4.show();
   Card2LftCase4.show();
   Card3LftCase5.show();
   Card4LftCase5.show();
   av.step();

   //slide 26
   av.umsg(interpret("<span style='color:red;'>Example data:</span> supervisor </br><span style='color:red;'>ali (sid=1)</span> controls projects <span style='color:blue;'>sewag (p-id=c)</span> during <span style='color:blue;'>2016</span> and <span style='color:blue;'>Irrigation project (E)</span> at <span style='color:blue;'>2020</span>").bold().big());
   Bridge2._arrays[1].value(0,"<span style='color:red;'>1</span>");
   Bridge2._arrays[1].value(1,"<span style='color:blue;'>C</span>");
   Bridge2._arrays[1].value(2,"<span style='color:blue;'>2016</span>");
   Bridge2._arrays[2].value(0,"<span style='color:red;'>1</span>");
   Bridge2._arrays[2].value(1,"<span style='color:blue;'>E</span>");
   Bridge2._arrays[2].value(2,"<span style='color:blue;'>2020</span>");
   matrx1._arrays[1].highlight();
   matrx2Case5._arrays[3].highlight();
   matrx2Case5._arrays[5].highlight();
   //Bridge1._arrays[3].value(0,"<span style='color:red;'>2</span>");
   //Bridge1._arrays[3].value(1,"<span style='color:blue;'>C</span>");
   //Bridge1._arrays[4].value(0,"<span style='color:red;'>1</span>");
   //Bridge1._arrays[4].value(1,"<span style='color:blue;'>B</span>");
   //Bridge1._arrays[5].value(0,"<span style='color:red;'>3</span>");
   //Bridge1._arrays[5].value(1,"<span style='color:blue;'>A</span>");
   //Bridge1._arrays[6].value(0,"<span style='color:red;'>2</span>");
   //Bridge1._arrays[6].value(1,"<span style='color:blue;'>E</span>");
   //Bridge1._arrays[7].value(0,"<span style='color:red;'>2</span>");
   //Bridge1._arrays[7].value(1,"<span style='color:blue;'>B</span>");
   //Bridge1._arrays[0].highlight();
 
   av.step();

   //slide 27
   av.umsg(interpret("<span style='color:red;'>Example data:</span> supervisor </br><span style='color:red;'>Khaled (sid=3)</span> controls project <span style='color:blue;'>sewag (p-id=c)</span> during <span style='color:blue;'>2018</span> and <span style='color:blue;'>electricity project (A)</span> at <span style='color:blue;'>2020</span>").bold().big());
   Bridge2._arrays[3].value(0,"<span style='color:red;'>3</span>");
   Bridge2._arrays[3].value(1,"<span style='color:blue;'>C</span>");
   Bridge2._arrays[3].value(2,"<span style='color:blue;'>2018</span>");
   Bridge2._arrays[4].value(0,"<span style='color:red;'>3</span>");
   Bridge2._arrays[4].value(1,"<span style='color:blue;'>A</span>");
   Bridge2._arrays[4].value(2,"<span style='color:blue;'>2020</span>");
   matrx1._arrays[1].unhighlight();
   matrx1._arrays[3].highlight();
   matrx2Case5._arrays[5].unhighlight();
   matrx2Case5._arrays[1].highlight();
   av.step();

   //slide 28
   av.umsg(interpret("<span style='color:red;'>Example data:</span> supervisor </br><span style='color:red;'>adel (sid=2)</span> controls project <span style='color:blue;'>construction (p-id=D)</span> during <span style='color:blue;'>2022</span>").bold().big());
   Bridge2._arrays[5].value(0,"<span style='color:red;'>2</span>");
   Bridge2._arrays[5].value(1,"<span style='color:blue;'>D</span>");
   Bridge2._arrays[5].value(2,"<span style='color:blue;'>2022</span>");
   matrx1._arrays[3].unhighlight();
   matrx1._arrays[2].highlight();
   matrx2Case5._arrays[1].unhighlight();
   matrx2Case5._arrays[3].unhighlight();
   matrx2Case5._arrays[4].highlight();
   av.step();

   //slide 29
   av.umsg(interpret("<span style='color:red;'>The question now is:</span> What is the appropriate primary key for case5 bridge?? </br> OR Is the composite primary key (Sid, P-id) can uniquely identify all records of the bridge??").bold().big());
   matrx1._arrays[2].unhighlight();
   matrx2Case5._arrays[4].unhighlight();
   Bridge2._arrays[0].highlight(0);
   Bridge2._arrays[0].highlight(1);
  var Brdg2Key=av.pointer("<span style='color:red;'><b>Are (sid, p-id) enough for records unique identification??</b></span>", Bridge2._arrays[1].index(0), {left: -300, top: 300});
   av.step();

   //slide 30
   av.umsg(interpret("<span style='color:red;'>The answer is: </span> <span style='color:blue;'>according to</span> which the same supervisor is allowed to supervise the same project more than once at different time periods or not??").bold().big());
   av.step();

   //slide 31
   Brdg2Key.hide();
   av.umsg(interpret("<span style='color:red;'> Case 5 Condition 1:</span> Each supervisor can supervise a lot of projects at different periods, but can only supervise each project for maximum one time <i>(as shown with the example data in the bridge)</i> <span style='color:red;'>In this case:</span> <span style='color:blue;'>Yes</span> composite <span style='color:blue;'>PK(sid,p-id) is enough</span> for unique identification.").bold().big());
   var Case5Con1Pointer=av.pointer("<span style='color:red;'><b>PK(sid, p-id) can uniquly identify records</b></span></br> AS both values <span style='color:blue;'>(sid & p-id) <d>can not</b> be repeated <b>together</b></span></br> Any supervisor controls the <span style='color:red;'>same project</span> <span style='color:blue;'>only once</span></br> <span style='color:red;'>E.g.,</span> look at supervisor <span style='color:blue;'>ali's projects (C & E)</span> </br> <b>'No repetition in ali's projects'</b> as well as all other supervisors", Bridge2._arrays[1].index(0), {left: -300, top: 300});
   Bridge2._arrays[1].highlight(1);
   Bridge2._arrays[2].highlight(1);
   av.step();

   //slide 32
   Case5Con1Pointer.hide();
   av.umsg(interpret("<span style='color:red;'> Case 5 Condition 2:</span> the same supervisor is allowed to supervise the <span style='color:blue;'>same</span> project <span style='color:blue;'>more than once</span> at different time periods<i> <span style='color:red;'>E.g.,</span> Assume that supervisor <span style='color:red;'>ali</span> will <b><u>again</u></b> supervise sewag <span style='color:blue;'>project (c)</span> </i> but this time at <span style='color:blue;'>2023</span>. <span style='color:red;'><b>what is the appropriate PK in this case??</b></span> .").bold().big());
   var Case5Con2Pointer=av.pointer("<span style='color:red;'><b>Is the composite PK(sid, p-id) can uniquly identify records now??</b></span>", Bridge2._arrays[1].index(0), {left: -300, top: 300});
   Bridge2._arrays[1].unhighlight(1);
   Bridge2._arrays[2].unhighlight(1);
   matrx1._arrays[1].highlight();
   matrx2Case5._arrays[3].highlight();
   av.step();

   //slide 33
   Case5Con2Pointer.hide();
   av.umsg(interpret("<span style='color:red;'> The answer is:</span> <span style='color:blue;'>NO</span>, the composite PK(sid, p-id) is <span style='color:blue;'>not appropriate</span>. </br><span style='color:red;'>As</span> its value now can be repeated as many times as the same supervisor again controls the same project at different time periods<i>(as shown in the below bridge)</i>.").bold().big());
   var Case5Con2PointerAnsRec1=av.pointer("<span style='color:red;'>ERROR:</span> <span style='color:blue;'>PK value (1,C)</span> for representing (ali,sewag) <span style='color:blue;'>is repeated twice</span> as ali controls same project C for two time one time at (2016) & the other at (2023)", Bridge2._arrays[2].index(0), {left: -300, top: 300});
   var Case5Con2PointerAnsRec2=av.pointer("", Bridge2._arrays[6].index(0), {left: -270, top: 190});
   Bridge2._arrays[1].unhighlight(1);
   Bridge2._arrays[2].unhighlight(1);
   matrx1._arrays[1].highlight();
   matrx2Case5._arrays[3].highlight();
   Bridge2._arrays[6].value(0,"<span style='color:red;'>1</span>");
   Bridge2._arrays[6].value(1,"<span style='color:blue;'>C</span>");
   Bridge2._arrays[6].value(2,"<span style='color:blue;'>2023</span>");
   Bridge2._arrays[1].highlight(0);
   Bridge2._arrays[1].highlight(1);
   Bridge2._arrays[6].highlight(0);
   Bridge2._arrays[6].highlight(1);
   av.step();

   //slide 34
   Case5Con2PointerAnsRec1.hide();
   Case5Con2PointerAnsRec2.hide();
   av.umsg(interpret("<span style='color:red;'> The solution now is:</span> <span style='color:blue;'>Adding the 'Sdate'</span> attribute as part of the composite Pk.</br><span style='color:blue;'>PK(sid, p-is, Sdate)</span> value can't be repeated even if the same supervisor controls the same project, as the Sdata now  can differentiate between records having same (sid, p-id)values.").bold().big());
   Bridge2._arrays[0].highlight(2);
   Bridge2._arrays[1].highlight(2);
   Bridge2._arrays[6].highlight(2);
   Bridge2._arrays[0].css([0,1,2], {"text-decoration": "underline"});
   var Case5Con2PointerAns=av.pointer("Composite <span style='color:red;'>PK(sid, p-id, Sdate)</span> can <span style='color:blue;'>uniquely identify</span> each record", Bridge2._arrays[1].index(1), {left: -270, top: 250});
   var Case5Con2PointerAnsSdate=av.pointer("<span style='color:red;'>Sdate</span> as a part of the PK can <span style='color:blue;'>uniquely identify</span> supervisor ali's records", Bridge2._arrays[1].index(2), {left: -270, top: 300});
   av.step();

  av.recorded();

});
