/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "oneToManyUnaryRelation";
  //var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  
  var av = new JSAV(av_name);

  //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=10;
  //note that 90 is the feild(cell) width in matrix1 and matrix3 and 4 is the number of fields(attributes) in each record
  var arrayEnd=arrayLeft+(4*90);
  var arrayGap=200;
  var arrayTop=40;

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
 
  var themMatrix3 = [["E-id","E-name","E-salary","E-id(FK)"],[1,"ali",500,""],[2,"adel",700,""],[3,"mona",1000,""],[4,"morad",300,""],[5,"ahmed",500,""],[6,"Randa",600,""],[7,"Rasha",250,""],[8,"Hazem",500,""],[9,"Layla",800,""]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix1 = [["E-id","E-name","E-salary"],[1,"ali",500],[2,"adel",700],[3,"mona",1000],[4,"morad",300],[5,"ahmed",500],[6,"Randa",600],[7,"Rasha",250],[8,"Hazem",500],[9,"Layla",800]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });
  
  var ERDlab=av.label(interpret("<span style='color:blue;'> Logical ER-Diagram </span>"), {left: arrayLeft, top: arrayTop-40 });
  ERDlab.css({"font-weight": "bold", "font-size": 20});
  ERDlab.hide();

  var schemaOffsit=arrayLeft+600;
  var SCHlab=av.label(interpret("<span style='color:blue;'> physical schema Diagram </span>"), {left: schemaOffsit, top: arrayTop-40 });
  SCHlab.css({"font-weight": "bold", "font-size": 20});
  SCHlab.hide();
  var empSchlab=av.label(interpret("Employee"), {left: schemaOffsit, top: arrayTop });
  empSchlab.css({"font-weight": "bold", "font-size": 15});
  empSchlab.hide();
  var EmpSchema = [["E-id","E-name","E-salary","manager-id(FK)"]];
  var EmpSchemaArr= av.ds.matrix(EmpSchema, {style: "table", top: arrayTop+20, left: schemaOffsit});
  EmpSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  EmpSchemaArr._arrays[0].hide();
  //arrayLeft+=arrayWidth+arrayGap;
 // arrayLeft+=arrayWidth+arrayGap;
  
  //var themMatrix2 =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewage","cairo"],["D","Natural gas","assiut"]];
  //var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });

 
  // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
 // matrx2._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  //matrx4._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  //matrx5._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

  // to underline primary keys in all tables
  matrx1._arrays[0].css([0], {"text-decoration": "underline"});
 // matrx2._arrays[0].css([0], {"text-decoration": "underline"});
  matrx3._arrays[0].css([0], {"text-decoration": "underline"});
  //matrx4._arrays[0].css([0], {"text-decoration": "underline"});
  //matrx5._arrays[0].css([0], {"text-decoration": "underline"});

  // hide all rows of matrix 3
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  }

  
  //Draw relation between project and employee tables in the first slide
  //x1 & y1 are right side points
  var mainline2X1=550;
  var mainline2Y1=170;
  //x1 & y1 are left side points
  var mainline2X2=290;
  var mainline2Y2=mainline2Y1; 

  // main that represents the two tables' relations
  var line2 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  //the bottom line parrallel to the main line
  var line3 = av.g.line(mainline2X1,  (mainline2Y1+7*30), mainline2X2-100,  (mainline2Y1+7*30), {opacity: 100, "stroke-width": 2});
  //vertical line parrallel to table employee
  // number 30 in this equation (mainline2Y1+7*30) is the matrix cell hieght
  var line4 = av.g.line( mainline2X1,  mainline2Y2, mainline2X1,  (mainline2Y1+7*30), {opacity: 100, "stroke-width": 2}); 
  //two vertical lines of the tables' relations representing cardinality
  //two line of many cardinality under table employee
  //all calculations of cross foot calculated regards of the vertical line under table employee which is line7
  var line10 = av.g.line( mainline2X2-100, (mainline2Y1+7*30)-10, (mainline2X2-100)+15, (mainline2Y1+7*30)-25 , {opacity: 100, "stroke-width": 2});
  var line5 = av.g.line(  mainline2X2-100, (mainline2Y1+7*30)-10 ,  (mainline2X2-100)-15, (mainline2Y1+7*30)-25 , {opacity: 100, "stroke-width": 2});
  //vertical line of cardinality beside table employee
  var line6= av.g.line( mainline2X1-235,  mainline2Y1-10, mainline2X1-235,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  //vertical line under table employee
  var line7 = av.g.line( mainline2X2-100,  (mainline2Y1+7*30), mainline2X2-100,  (mainline2Y1+7*30)-25, {opacity: 100, "stroke-width": 2});
  var lab=av.label(interpret("<span style='color:red;'> Manage </span>"), {left: ((mainline2X1-mainline2X2)+100), top: mainline2Y1- 50 });
  lab.css({"font-weight": "bold", "font-size": 20});


  // array that hold project number that has already worked employee so as when another employee come to work at this project we will search
  //that array to see if the employee cell isnot empty we will add a new record to the project matrix 
  //that result in redundancy problem that we want to show
  
  var pointer1;
  var pointer2;
  var arr_values = [];
  //var NoEmpProA=0;
  //var NoEmpProB=0;
  //var NoEmpProC=0;
 // var NoEmpProD=0;
 // var matrix3Flag=0;
 // var matrix4Flag=0;
 // var matrix5Flag=0;
  var arrFullProIndex=0;
  //var redundantProIndex=themMatrix2.length;
  var empNo=0;
  var ManagerEmp=0;
  var subordinate=0;
  var Partner=0;
  var cx=arrayLeft+48;
  var cy=arrayTop+(30*((empNo)+1));
  var cRadius=15;
  var x1=cx;
  var y1=arrayTop+(30*((empNo)+1));
  var x2=350/2;
  //var y2=arrayTop+(30*((proNo)+1));
  var y2=y1-50;
  //note that 90 is the cell or feild width in matrix 1 and matrix3
  var cx1=arrayEnd-(90/2);
  //circle surrounding primary key
  var circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  var circle2=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  var circle3=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  var circle4=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  // circle to point for employee
  circle.hide();
  // circle to point for employee's partner
  circle2.hide();
  circle3.hide();
  circle4.hide();

  //ellipse surrounding forigen key
  var yradiusElipse=15; //15 is the cell or feild hight
  var ellipse=av.g.ellipse(cx1,cy ,cRadius*2+5, yradiusElipse , {stroke: "red","stroke-width": 2});
  ellipse.hide();

  //two lines pointing @ primary key and the coressponding forigen key
  var line1 = av.g.line(0,0, 0,  0, {opacity: 100, "stroke-width": 2});
  var line8 = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  var line11 = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  var line12 = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //line that pointes from employee to his partner
  //its corrdinates will be named x1M,y1M,x2M,y2M M refere to marrige x1M and y1M the first point from pk & x2M,y2M repere to the second point for the partner (forigen key)
  var x1M=0; var y1M=0; var x2M=0; var y2M=0; 
  var line9 = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  line1.hide();
  line8.hide();
  line9.hide();

  av.umsg(interpret("sc1").bold().big());

  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  av.displayInit(1);

  //slide 2
  line2.hide();
  line3.hide();
  line4.hide();
  line5.hide();
  line6.hide();
  line7.hide();
  line10.hide();
  lab.hide();
  av.umsg(interpret("sc2").bold().big());
  // hide all of the rows of matrix 2 and show all rows of matrix3 knowing that the two rows are of the same length
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx1._arrays[i].hide();
  matrx3._arrays[i].show();
  matrx3._arrays[i].highlight(3);
  }  
  y1=arrayTop+(30*((empNo)+1));
  //y2=arrayTop+(30*((proNo)+1));
  cy=arrayTop+(30*((empNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  //line8.movePoints([[0, x2, y2], [1, x2*2, arrayTop]]);
  line8.movePoints([[0, x2, y2], [1, arrayEnd-45, arrayTop+25]]);
  line1.show();
  line8.show();
  av.step();

  //slide 3
  av.umsg(interpret("sc3").bold().big());
  line1.hide();
  line8.hide();
  pointer2 = av.pointer("<span style='color:red;'> E-id(FK)= </span> <span style='color:blue;'> manager </span> OR <span style='color:red;'> E-id(FK)= </span> <span style='color:blue;'> sub-ordinate employee </span>", matrx3._arrays[0].index(3), {left: 110, top:-10 });
  av.step();

  // Slide 4
  av.umsg(interpret("sc4").bold().big());
  matrx3._arrays[0].value(3,"subordinate-id");
  pointer2.hide();
  pointer1 = av.pointer("<span style='color:red;'> E-id </span> <span style='color:blue;'> (Primary key) </span>", matrx3._arrays[0].index(0), {left: 110, top:-10 });
  pointer2 = av.pointer("<span style='color:red;'> subordinate-id=E-id </span> where, subordinate-id<span style='color:blue;'> (forigen key) </span>", matrx3._arrays[0].index(3), {left: 110, top:-10 });
  circle.hide();
  ellipse.show();
  
  av.step();

// Slide 5
av.umsg(interpret("sc5").bold().big());
//matrx3._arrays[0].value(3,"Partner");
//circle.hide();
for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].unhighlight(3);
  }  
  ManagerEmp=5;
  subordinate=2;
  
  pointer1.hide();
  pointer1 = av.pointer("As <span style='color:red;'> adel , hazem & randa </span> are all subordinate employees under the manager employee <span style='color:blue;'> ahmed </span> So all of their E-ids should be saved here which is <span style='color:red;'> IMPOSSIBLE </span> ", matrx3._arrays[ManagerEmp].index(3), {left: 310, top:25 });
  pointer1.hide();
  pointer2.hide();
  pointer2 = av.pointer("<span style='color:red;'> Manager Employee </span> <span style='color:blue;'> ahmed </span>", matrx3._arrays[ManagerEmp].index(1), {left: 350, top:-10 });
  matrx3._arrays[ManagerEmp].highlight();

line1.hide();
  line8.hide();
//pointer1 = av.pointer("<span style='color:red;'> E-id </span> <span style='color:blue;'> (Primary key) </span>", matrx3._arrays[0].index(0), {left: 110, top:-10 });
//pointer2 = av.pointer("<span style='color:red;'> Partner=E-id </span> where, Partner<span style='color:blue;'> (forigen key) </span>", matrx3._arrays[0].index(3), {left: 110, top:-10 });
ellipse.show();
av.step();

//slide 6
av.umsg(interpret("sc6").bold().big());
//pointer1.show();
pointer2.hide();
cy=arrayTop+(30*((ManagerEmp)+1));
circle=av.g.circle(cx1,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();


  
  //slide 7
  av.umsg(interpret("adel's E-id=2 shoule be inserted in subordinate feild").bold().big());
  matrx3._arrays[subordinate].highlight(0);
matrx3._arrays[subordinate].highlight(1);
  //circle.show();
  //matrx3._arrays[Partner].value(3,empNo);
  x2M=x1M+(4*75);
  y2M=cy;
  cy=arrayTop+(30*((subordinate)+1));
  //note: 4 denote number of cell while 65 is the width of each cell
  x1M=cx;
  y1M=cy;
  circle2=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  //circle2.hide();
  line9.movePoints([[0, x1M, y1M], [1, x2M, y2M]]);
  line9.show();
  av.step()

//slide 8
av.umsg(interpret("Hazem's E-id=8 shoule be inserted in subordinate feild").bold().big());
//circle.show();
//matrx3._arrays[Partner].value(3,empNo);
subordinate=8;
matrx3._arrays[subordinate].highlight(0);
matrx3._arrays[subordinate].highlight(1);
//x2M=x1M+(4*75);
//y2M=cy;
cy=arrayTop+(30*((subordinate)+1));
//note: 4 denote number of cell while 65 is the width of each cell
x1M=cx;
y1M=cy;
circle3=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
//circle2.hide();
line11.movePoints([[0, x1M, y1M], [1, x2M, y2M]]);
line11.show();
av.step()
//slide 9
av.umsg(interpret("Randa's E-id=6 shoule be inserted in subordinate feild").bold().big());
subordinate=6;
matrx3._arrays[subordinate].highlight(0);
matrx3._arrays[subordinate].highlight(1);
//x2M=x1M+(4*75);
//y2M=cy;
cy=arrayTop+(30*((subordinate)+1));
//note: 4 denote number of cell while 65 is the width of each cell
x1M=cx;
y1M=cy;
circle4=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
//circle2.hide();
line12.movePoints([[0, x1M, y1M], [1, x2M, y2M]]);
line12.show();
av.step()


  //slide 10
  av.umsg(interpret("Here is the problem").bold().big());
  pointer1.show();
 
  
  /*line9.hide();
  circle2.show();
  //swap empNo & Partner valuse and repeate the equations of th y1M and y2M coordinates
  empNo=3;
  Partner=5;
  cy=arrayTop+(30*((empNo)+1));
  y1M=cy;
  //then change the cy value so y2M equals the new value of cy
  cy=arrayTop+(30*((Partner)+1));
  y2M=cy;
  matrx3._arrays[Partner].value(3,empNo);
  line9.movePoints([[0, x1M, y1M], [1, x2M, y2M]]);
  circle.hide();*/
  
  av.step();

  // Slide 11
  av.umsg(interpret("the true solution for representing that relation is to use the E-id as a foreign key for referring to the manager id As each employee can only has one manager").bold().big());
  pointer1.hide();
  matrx3._arrays[ManagerEmp].unhighlight();
  matrx3._arrays[subordinate].unhighlight(0);
  matrx3._arrays[subordinate].unhighlight(1);
  matrx3._arrays[2].unhighlight(0);
  matrx3._arrays[2].unhighlight(1);
  matrx3._arrays[8].unhighlight(0);
  matrx3._arrays[8].unhighlight(1);
  circle.hide();
  circle2.hide();
  circle3.hide();
  circle4.hide();
  line9.hide();
  line11.hide();
  line12.hide();
  matrx3._arrays[0].value(3,"manager-id");
  //pointer2.hide();
  pointer1 = av.pointer("<span style='color:red;'> E-id </span> <span style='color:blue;'> (Primary key) </span>", matrx3._arrays[0].index(0), {left: 110, top:-10 });
  pointer2 = av.pointer("<span style='color:red;'> manager-id=E-id </span> where, manager-id<span style='color:blue;'> (forigen key) </span>", matrx3._arrays[0].index(3), {left: 110, top:-10 });
  /*line9.hide();
  circle2.hide();
  matrx3._arrays[empNo].unhighlight();
  matrx3._arrays[Partner].unhighlight();
  empNo=2;
  Partner=9;
  matrx3._arrays[empNo].highlight();
  matrx3._arrays[Partner].highlight();
  y1=arrayTop+(30*((empNo)+1));
  y2=arrayTop+(30*((empNo)+1));
  cy=arrayTop+(30*((empNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();*/
  av.step();

  // Slide 12
  av.umsg(interpret("sc5").bold().big());
  ManagerEmp=5;
  subordinate=2;
  pointer1.hide();
  pointer2.hide();
  pointer2 = av.pointer("<span style='color:red;'> Manager Employee </span> <span style='color:blue;'> ahmed </span>", matrx3._arrays[ManagerEmp].index(1), {left: 350, top:-10 });
  matrx3._arrays[ManagerEmp].highlight(0);
  matrx3._arrays[ManagerEmp].highlight(1);
  av.step();

  //slide 13
  av.umsg(interpret("E-id=5 of ahmed (the manager) should be inserted in manager-id feild of employee adel").bold().big());
  pointer2.hide();
  matrx3._arrays[subordinate].highlight();
 matrx3._arrays[subordinate].value(3,ManagerEmp);
  x2M=x1M+(4*65);
  y2M=arrayTop+(30*((subordinate)+1));
  cy=arrayTop+(30*((ManagerEmp)+1));
  //note: 4 denote number of cell while 65 is the width of each cell
  x1M=cx;
  y1M=cy;
  circle2=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  //circle2.hide();
  line9.movePoints([[0, x1M, y1M], [1, x2M, y2M]]);
  line9.show();
  av.step()

//slide 14
av.umsg(interpret("E-id=5 of ahmed (the manager) should be inserted in manager-id feild of employee Hazem").bold().big());
//circle.show();
//matrx3._arrays[Partner].value(3,empNo);
subordinate=8;
matrx3._arrays[subordinate].highlight();
matrx3._arrays[subordinate].value(3,ManagerEmp);
//x2M=x1M+(4*75);
//y2M=cy;
y2M=arrayTop+(30*((subordinate)+1));
cy=arrayTop+(30*((ManagerEmp)+1));
//note: 4 denote number of cell while 65 is the width of each cell
x1M=cx;
y1M=cy;
circle3=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
//circle2.hide();
line11.movePoints([[0, x1M, y1M], [1, x2M, y2M]]);
line11.show();
av.step()

//slide 15
av.umsg(interpret("E-id=5 of ahmed (the manager) should be inserted in manager-id feild of employee Randa").bold().big());
subordinate=6;
matrx3._arrays[subordinate].highlight();
matrx3._arrays[subordinate].value(3,ManagerEmp);
//x2M=x1M+(4*75);
//y2M=cy;
y2M=arrayTop+(30*((subordinate)+1));
cy=arrayTop+(30*((ManagerEmp)+1));
//note: 4 denote number of cell while 65 is the width of each cell
x1M=cx;
y1M=cy;
circle4=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
//circle2.hide();
line12.movePoints([[0, x1M, y1M], [1, x2M, y2M]]);
line12.show();
av.step();

//slide 16
av.umsg(interpret("As shoen below ahmed's id=5 stored in manager-id feild of ali, hazem & randa because he is the manager of these three employees").bold().big());
line9.hide();  
line11.hide();
line12.hide();
pointer1=av.pointer("<span style='color:red;'> manager-id=5 </span> <span style='color:blue;'> where 5 is the id of employee <span style='color:red;'> ahmed the manager </span>  of employee <span style='color:red;'> adel </span> ", matrx3._arrays[2].index(3), {left: 110, top:-10 });
pointer2=av.pointer("<span style='color:red;'> manager-id=5 </span> <span style='color:blue;'> where 5 is the id of employee <span style='color:red;'> ahmed the manager </span>  of employee <span style='color:red;'> randa </span> ", matrx3._arrays[6].index(3), {left: 110, top:-10 });
var pointer3=av.pointer("<span style='color:red;'> manager-id=5 </span> <span style='color:blue;'> where 5 is the id of employee <span style='color:red;'> ahmed the manager </span>  of employee <span style='color:red;'> hazem </span> ", matrx3._arrays[8].index(3), {left: 110, top:-10 });
av.step();

//slide 17
av.umsg(interpret("Finally this is the logical ERD of the relation").bold().big());
circle2.hide();
circle3.hide();
circle4.hide();
pointer1.hide();
pointer2.hide();
pointer3.hide();
ellipse.hide();
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  matrx1._arrays[i].show();
  }  
  line2.show();
  line3.show();
  line4.show();
  line5.show();
  line6.show();
  line7.show();
  line10.show();
  lab.show();
  av.step();

  //slide 18
  av.umsg(interpret("Here is the corresponding physical relational schema diagram where the manager-id is the foreign key").bold().big());
  ERDlab.show();
  SCHlab.show();
  empSchlab.show();
  EmpSchemaArr._arrays[0].show();
  av.recorded();
});
