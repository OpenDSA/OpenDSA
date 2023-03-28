/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "oneToManyWrongForm1";
  //var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  
  var av = new JSAV(av_name);

  //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=10;
  var arrayGap=200;
  var arrayTop=-15;

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
  var themMatrix3 =[["P-id","P-name","P-location","E-id(FK)"],["A","electricity","minia"," "],["B","plumbing","sohag"," "],["C","sewage","cairo"," "],["D","Natural gas","assiut"," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," "],[" "," "," "," "]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix2 =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewage","cairo"],["D","Natural gas","assiut"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });
    
  arrayLeft+=arrayWidth+arrayGap+90;
  arrayLeft+=arrayWidth+arrayGap;
  
  var themMatrix1 = [["E-id","E-name"," E-salary"],[1,"ali",500],[2,"adel",700],[3,"khaled",1000],[4,"morad",300],[5,"ahmed",500],[6,"walid",600]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });
 
 
  // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx2._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

  // to underline primary keys in all tables
  matrx1._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2._arrays[0].css([0], {"text-decoration": "underline"});
  matrx3._arrays[0].css([0], {"text-decoration": "underline"});

  // hide all of the empty rows
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  }

  //Draw relation between project and employee tables in the first slide
  var mainline2X1=740;
  var mainline2Y1=90;
  var mainline2X2=290;
  var mainline2Y2=mainline2Y1; 

  // main that represents the two tables' relations
  var line2 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  //cross foot of the tables' relations
  var line3 = av.g.line( mainline2X1-20,  mainline2Y1,  mainline2X1,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
  var line4 = av.g.line( mainline2X1-20,  mainline2Y1, mainline2X1,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  //two vertical lines of the tables' relations
  //vertical line beside table employee
  //var line5 = av.g.line( mainline2X1-40,  mainline2Y1-10, mainline2X1-40,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
  //vertical line beside table project
  var line6= av.g.line( mainline2X1-400,  mainline2Y1-10, mainline2X1-400,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  var lab=av.label(interpret("<span style='color:red;'> Works at </span>"), {left: ((mainline2X1-mainline2X2)), top: mainline2Y1- 50 });
  lab.css({"font-weight": "bold", "font-size": 20});


  // array that hold project number that has already worked employee so as when another employee come to work at this project we will search
  //that array to see if the employee cell isnot empty we will add a new record to the project matrix 
  //that result in redundancy problem that we want to show
  
  var pointer1;
  var arr_values = [];
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

  var Fcircle=av.g.circle(0,0 ,0 , {stroke: "red","stroke-width": 2});
  Fcircle.hide();

  var line1 = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  line1.hide();
  av.umsg(interpret("sc1").bold().big());

  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  av.displayInit(1);

  //slide 2
  line2.hide();
  line3.hide();
  line4.hide();
  //line5.hide();
  line6.hide();
  lab.hide();
  av.umsg(interpret("sc2").bold().big());
  // hide all of the empty rows
  for (var i=0; i < themMatrix2.length; i++)
  {
  matrx2._arrays[i].hide();
  }
  
  for (var i=0; i < 5; i++)
  {
  matrx3._arrays[i].show();
  }
  y1=arrayTop+(30*((empNo)+1));
  y2=arrayTop+(30*((proNo)+1));
  cy=arrayTop+(30*((empNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  line1.show();
  av.step();

  // Slide 3
  av.umsg(interpret("sc4").bold().big());
  circle.hide();
  line1.hide();
  empNo=5;
  proNo=2;
  y1=arrayTop+(30*((empNo)+1));
  y2=arrayTop+(30*((proNo)+1));
  cy=arrayTop+(30*((empNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  matrx1._arrays[empNo].highlight(0);
  matrx1._arrays[empNo].highlight(1);
  matrx3._arrays[proNo].highlight();
  arr_values[arrFullProIndex] = proNo;
  arrFullProIndex++;
  av.step();

  // Slide 4  
  av.umsg(interpret("sc4").bold().big());
  circle.show();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  line1.show();
  matrx3._arrays[proNo].value(3,empNo);
  av.step();
  
  //slide 5
  av.umsg(interpret("sc5").bold().big());
  matrx1._arrays[empNo].unhighlight(0);
  matrx1._arrays[empNo].unhighlight(1);
  matrx3._arrays[proNo].unhighlight();
  circle.hide();
  line1.hide();
  empNo=4;
  proNo=3;
  
  if (arr_values.indexOf(proNo) === -1) {
    arr_values[arrFullProIndex] = proNo;
    arrFullProIndex++;
  }
  else{
    matrx3._arrays[redundantProIndex].value(0,matrx3._arrays[proNo].value(0));
    matrx3._arrays[redundantProIndex].value(1,matrx3._arrays[proNo].value(1));
    matrx3._arrays[redundantProIndex].value(2,matrx3._arrays[proNo].value(2));
    matrx3._arrays[redundantProIndex].highlight();
    proNo=redundantProIndex;
    matrx3._arrays[proNo].show();
    redundantProIndex++;
  }
  matrx1._arrays[empNo].highlight(0);
  matrx1._arrays[empNo].highlight(1);
  matrx3._arrays[proNo].highlight();

  y1=arrayTop+(30*((empNo)+1));
  y2=arrayTop+(30*((proNo)+1));
  cy=arrayTop+(30*((empNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

  // Slide 6 
  av.umsg(interpret("sc5").bold().big());
  circle.show();
  line1.show();
  matrx3._arrays[proNo].value(3,4);
  av.step();

  // Slide 7
  av.umsg(interpret("sc6").bold().big());
  matrx1._arrays[empNo].unhighlight(0);
  matrx1._arrays[empNo].unhighlight(1);
  matrx3._arrays[proNo].unhighlight();
  circle.hide();
  line1.hide();
  proNo=2;
  empNo=6;
  matrx1._arrays[empNo].highlight(0);
  matrx1._arrays[empNo].highlight(1);
  matrx3._arrays[proNo].highlight();
  if (arr_values.indexOf(proNo) != -1) {
    pointer1 = av.pointer("<span style='color:red;'> Warning: </span> Feild is Full with another employee ID", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
   }
  av.step();

  // Slide 8 
  
  pointer1.hide();
  if (arr_values.indexOf(proNo) === -1) {
  arr_values[arrFullProIndex] = proNo;
  arrFullProIndex++;
  av.umsg(interpret("sc6").bold().big());
 }
 else{
  av.umsg(interpret("<span style='color:red;'> Warning: </span> <span style='color:blue;'> new row added </span> in the projects table to record that <span style='color:blue;'> another </span> employee <span style='color:red;'>"+matrx1._arrays[empNo].value(1)+"</span>  joined <span style='color:blue;'> the same "+matrx3._arrays[proNo].value(1)+ "</span> project").bold().big());
  matrx3._arrays[redundantProIndex].value(0,matrx3._arrays[proNo].value(0));
  matrx3._arrays[redundantProIndex].value(1,matrx3._arrays[proNo].value(1));
  matrx3._arrays[redundantProIndex].value(2,matrx3._arrays[proNo].value(2));
  matrx3._arrays[redundantProIndex].highlight();
  matrx3._arrays[proNo].unhighlight();
  proNo=redundantProIndex;
  matrx3._arrays[proNo].show();
  pointer1 = av.pointer("<span style='color:red;'> new added row</span>", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
  redundantProIndex++;
 }
 y1=arrayTop+(30*((empNo)+1));
 y2=arrayTop+(30*((proNo)+1));
 cy=arrayTop+(30*((empNo)+1));
 circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
 circle.hide();
 line1.movePoints([[0, x1, y1], [1, x2, y2]]);
 av.step();

 // Slide 9
 pointer1.hide();
 av.umsg(interpret("sc6").bold().big());
 circle.show();
 line1.show();
 matrx3._arrays[proNo].value(3,empNo);
 av.step();

 // Slide 10
 av.umsg(interpret("sc7").bold().big());
 matrx1._arrays[empNo].unhighlight(0);
 matrx1._arrays[empNo].unhighlight(1);
 matrx3._arrays[proNo].unhighlight();
 circle.hide();
 line1.hide();
 proNo=3;
 empNo=2;
 matrx1._arrays[empNo].highlight(0);
 matrx1._arrays[empNo].highlight(1);
 matrx3._arrays[proNo].highlight();
 if (arr_values.indexOf(proNo) != -1) {
  pointer1 = av.pointer("<span style='color:red;'> Warning: </span> Feild is Full with another employee ID", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
 }
 av.step();

 // Slide 11 
 pointer1.hide();
 av.umsg(interpret("sc7").bold().big());
  if (arr_values.indexOf(proNo) === -1) {
 arr_values[arrFullProIndex] = proNo;
 arrFullProIndex++;
}
else{
 av.umsg(interpret("<span style='color:red;'> Warning: </span> <span style='color:blue;'> new row added </span> in the projects table to record that <span style='color:blue;'> another </span> employee <span style='color:red;'>"+matrx1._arrays[empNo].value(1)+"</span>  joined <span style='color:blue;'> the same "+matrx3._arrays[proNo].value(1)+ "</span> project").bold().big());
 matrx3._arrays[redundantProIndex].value(0,matrx3._arrays[proNo].value(0));
 matrx3._arrays[redundantProIndex].value(1,matrx3._arrays[proNo].value(1));
 matrx3._arrays[redundantProIndex].value(2,matrx3._arrays[proNo].value(2));
 matrx3._arrays[redundantProIndex].highlight();
 matrx3._arrays[proNo].unhighlight();
 proNo=redundantProIndex;
 matrx3._arrays[proNo].show();
 pointer1 = av.pointer("<span style='color:red;'> new added row</span>", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
 redundantProIndex++;
}
y1=arrayTop+(30*((empNo)+1));
y2=arrayTop+(30*((proNo)+1));
cy=arrayTop+(30*((empNo)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
circle.hide();
line1.movePoints([[0, x1, y1], [1, x2, y2]]);
av.step();

// Slide 12
pointer1.hide();
av.umsg(interpret("sc7").bold().big());
circle.show();
line1.show();
matrx3._arrays[proNo].value(3,empNo);
av.step();

// Slide 13
av.umsg(interpret("sc8").bold().big());
matrx1._arrays[empNo].unhighlight(0);
matrx1._arrays[empNo].unhighlight(1);
matrx3._arrays[proNo].unhighlight();
circle.hide();
line1.hide();
proNo=2;
empNo=1;
matrx1._arrays[empNo].highlight(0);
matrx1._arrays[empNo].highlight(1);
matrx3._arrays[proNo].highlight();
if (arr_values.indexOf(proNo) != -1) {
  pointer1 = av.pointer("<span style='color:red;'> Warning: </span> Feild is Full with another employee ID", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
 }
av.step();

// Slide 14 
pointer1.hide();
av.umsg(interpret("sc8").bold().big());
if (arr_values.indexOf(proNo) === -1) {
arr_values[arrFullProIndex] = proNo;
arrFullProIndex++;
}
else{
av.umsg(interpret("<span style='color:red;'> Warning: </span> <span style='color:blue;'> new row added </span> in the projects table to record that <span style='color:blue;'> another </span> employee <span style='color:red;'>"+matrx1._arrays[empNo].value(1)+"</span>  joined <span style='color:blue;'> the same "+matrx3._arrays[proNo].value(1)+ "</span> project").bold().big());
matrx3._arrays[redundantProIndex].value(0,matrx3._arrays[proNo].value(0));
matrx3._arrays[redundantProIndex].value(1,matrx3._arrays[proNo].value(1));
matrx3._arrays[redundantProIndex].value(2,matrx3._arrays[proNo].value(2));
matrx3._arrays[redundantProIndex].highlight();
matrx3._arrays[proNo].unhighlight();
proNo=redundantProIndex;
matrx3._arrays[proNo].show();
pointer1 = av.pointer("<span style='color:red;'> new added row</span>", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
redundantProIndex++;
}
y1=arrayTop+(30*((empNo)+1));
y2=arrayTop+(30*((proNo)+1));
cy=arrayTop+(30*((empNo)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
circle.hide();
line1.movePoints([[0, x1, y1], [1, x2, y2]]);
av.step();

// Slide 15
pointer1.hide();
av.umsg(interpret("sc8").bold().big());
circle.show();
line1.show();
matrx3._arrays[proNo].value(3,empNo);
av.step();

// Slide 16
av.umsg(interpret("sc9").bold().big());
matrx1._arrays[empNo].unhighlight(0);
matrx1._arrays[empNo].unhighlight(1);
matrx3._arrays[proNo].unhighlight();
circle.hide();
line1.hide();
proNo=1;
empNo=3;
matrx1._arrays[empNo].highlight(0);
matrx1._arrays[empNo].highlight(1);
matrx3._arrays[proNo].highlight();
if (arr_values.indexOf(proNo) != -1) {
  pointer1 = av.pointer("<span style='color:red;'> Warning: </span> Feild is Full with another employee ID", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
 }
av.step();

// Slide 17 
pointer1.hide();
av.umsg(interpret("sc9").bold().big());
if (arr_values.indexOf(proNo) === -1) {
arr_values[arrFullProIndex] = proNo;
arrFullProIndex++;
}
else{
av.umsg(interpret("<span style='color:red;'> Warning: </span> <span style='color:blue;'> new row added </span> in the projects table to record that <span style='color:blue;'> another </span> employee <span style='color:red;'>"+matrx1._arrays[empNo].value(1)+"</span>  joined <span style='color:blue;'> the same "+matrx3._arrays[proNo].value(1)+ "</span> project").bold().big());
matrx3._arrays[redundantProIndex].value(0,matrx3._arrays[proNo].value(0));
matrx3._arrays[redundantProIndex].value(1,matrx3._arrays[proNo].value(1));
matrx3._arrays[redundantProIndex].value(2,matrx3._arrays[proNo].value(2));
matrx3._arrays[redundantProIndex].highlight();
matrx3._arrays[proNo].unhighlight();
proNo=redundantProIndex;
matrx3._arrays[proNo].show();
pointer1 = av.pointer("<span style='color:red;'> new added row</span>", matrx3._arrays[proNo].index(3), {left: 110, top:-30 });
redundantProIndex++;
}
y1=arrayTop+(30*((empNo)+1));
y2=arrayTop+(30*((proNo)+1));
cy=arrayTop+(30*((empNo)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
circle.hide();
line1.movePoints([[0, x1, y1], [1, x2, y2]]);
av.step();

// Slide 18
pointer1.hide();
av.umsg(interpret("sc9").bold().big());
circle.show();
line1.show();
matrx3._arrays[proNo].value(3,empNo);
av.step();

//slide 19
av.umsg(("This is not an effective solution as it resulted in a lot of redundant data which wastes memory as highlighted in the below figure").bold().big());
circle.hide();
line1.hide();
var Fpointer = av.pointer("<span style='color:green;'> Redundant data= wasting memory</span>", matrx3._arrays[6].index(1), {left: 110, top:120 });
matrx1._arrays[empNo].unhighlight(0);
matrx1._arrays[empNo].unhighlight(1);
matrx3._arrays[proNo].unhighlight();
matrx3._arrays[5].highlight(0);
matrx3._arrays[5].highlight(1);
matrx3._arrays[5].highlight(2);
matrx3._arrays[6].highlight(0);
matrx3._arrays[6].highlight(1);
matrx3._arrays[6].highlight(2);
matrx3._arrays[7].highlight(0);
matrx3._arrays[7].highlight(1);
matrx3._arrays[7].highlight(2);
av.step();

//slide 20
av.umsg(("").bold().big());
line2.movePoints([[0,mainline2X1,mainline2Y1],[1,mainline2X2+90,mainline2Y2]]);
line2.show();
line3.show();
line4.show();
line6.movePoints([[0,mainline2X1-400+90, mainline2Y1-10],[1,mainline2X1-400+90, mainline2Y1+10]]);
line6.show();
Fpointer.hide();
matrx3._arrays[5].unhighlight();
matrx3._arrays[6].unhighlight();
matrx3._arrays[7].unhighlight();
matrx1._arrays[0].highlight(0);
var Flab1=av.label(("<span style='color:red;'> So: </span>"), {left: 40, top: 240 });
Flab1.css({"font-weight": "bold", "font-size": 28});
var Flab2=av.label(("<span style='color:green;'> Using the primary key</span>"), {left: 90, top: 250 });
Flab2.css({"font-weight": "bold", "font-size": 22});
av.step();

//slide 21
Fcircle=av.g.circle(mainline2X1-20,  mainline2Y1 ,20 , {stroke: "red","stroke-width": 2});
Fcircle.show();
Flab2=av.label(("<span style='color:green;'> of entity beside the many side</span>"), {left: 330, top: 250 });
Flab2.css({"font-weight": "bold", "font-size": 22});
av.step();

//slide 22
Fcircle.hide();
matrx1._arrays[0].unhighlight(0);
matrx3._arrays[0].highlight(3);
Flab2=av.label(("<span style='color:green;'> as a foreign key</span>"), {left: 650, top: 250 });
Flab2.css({"font-weight": "bold", "font-size": 22});
av.step();

//slide 23
Fcircle=av.g.circle(mainline2X1-400+90,  mainline2Y1 ,15 , {stroke: "red","stroke-width": 2});
Fcircle.show();
Flab2=av.label(("<span style='color:green;'> of the entity beside the</span>"), {left: 820, top: 250 });
Flab2.css({"font-weight": "bold", "font-size": 22});
Flab2=av.label(("<span style='color:green;'> one side</span>"), {left: 40, top: 300 });
Flab2.css({"font-weight": "bold", "font-size": 22});
av.step();

//slide 24
Flab2=av.label(("<span style='color:red;'> isn't a feasible</span> solution "), {left: 140, top: 300 });
Flab2.css({"font-weight": "bold", "font-size": 22});
av.recorded();
});
