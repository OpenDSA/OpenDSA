/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "ManyToManyUnaryRelation";
  //var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  
  var av = new JSAV(av_name);

  //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=10;
  var OriginalArrLeft=arrayLeft;
  //note that 90 is the feild(cell) width in matrix1 and matrix3 and 4 is the number of fields(attributes) in each record
  var arrayEnd=arrayLeft+(4*90);
  var arrayGap=400;
  var arrayTop=40;
  var BridgeTop=arrayTop+40;

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
 
  var themMatrix1 = [["E-id","E-name","E-salary"],[1,"ali",500],[2,"adel",700],[3,"mona",1000],[4,"morad",300],[5,"ahmed",500],[6,"Randa",600],[7,"Rasha",250],[8,"Hazem",500],[9,"Layla",800]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });
  var ERDlab=av.label(interpret("<span style='color:blue;'> Logical ER-Diagram </span>"), {left: arrayLeft, top: arrayTop-40 });
  ERDlab.css({"font-weight": "bold", "font-size": 20});
  ERDlab.hide();

  arrayLeft+=arrayWidth+arrayGap;
  var themMatrix3 = [["Sup-id(FK)","Subor-id(FK)"],["",""],["",""],["",""],["",""],["",""],["",""],["",""]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: BridgeTop, left: arrayLeft });
 
  var schmaOffsit=arrayLeft+150;
  var SCHlab=av.label(interpret("<span style='color:blue;'> physical schema Diagram </span>"), {left: schmaOffsit, top: arrayTop-40 });
  SCHlab.css({"font-weight": "bold", "font-size": 20});
  SCHlab.hide();
  var empSchlab=av.label(interpret("Employee"), {left: schmaOffsit, top: arrayTop });
  empSchlab.css({"font-weight": "bold", "font-size": 15});
  empSchlab.hide();
  var EmpSchema = [["E-id","E-name","E-salary"]];
  var EmpSchemaArr= av.ds.matrix(EmpSchema, {style: "table", top: arrayTop+20, left: schmaOffsit});
  EmpSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  EmpSchemaArr._arrays[0].hide();
  
  var Bridgelab=av.label(interpret("Supervise"), {left: schmaOffsit, top: arrayTop+70 });
  Bridgelab.css({"font-weight": "bold", "font-size": 15});
  Bridgelab.hide();
  var bridgeSchema = [["Sup-id(FK)","Subor-id(FK)"]];
  var bridgeSchemaArr= av.ds.matrix(bridgeSchema, {style: "table", top: arrayTop+90, left: schmaOffsit});
  bridgeSchemaArr._arrays[0].css([0,1], {"text-decoration": "underline"});
  bridgeSchemaArr._arrays[0].hide();

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
  matrx3._arrays[0].css([1], {"text-decoration": "underline"});
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
  var mainline2X2=285;
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
  //all calculations of this cross foot calculated regards of the vertical line under table employee which is line7
  var line10 = av.g.line( mainline2X2-100, (mainline2Y1+7*30)-10, (mainline2X2-100)+10, (mainline2Y1+7*30)-25 , {opacity: 100, "stroke-width": 2});
  var line5 = av.g.line(  mainline2X2-100, (mainline2Y1+7*30)-10 ,  (mainline2X2-100)-10, (mainline2Y1+7*30)-25 , {opacity: 100, "stroke-width": 2});
  //two line of many cardinality beside table employee
  //all calculations ofthis  cross foot calculated regards of the horizontal line beside table employee which is line2 (main line)
  var line6= av.g.line( mainline2X1-240,  mainline2Y1, mainline2X2,  mainline2Y1-10, {opacity: 100, "stroke-width": 2}); 
  var line13= av.g.line( mainline2X1-240,  mainline2Y1, mainline2X2,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  //vertical line under table employee
  var line7 = av.g.line( mainline2X2-100,  (mainline2Y1+7*30), mainline2X2-100,  (mainline2Y1+7*30)-25, {opacity: 100, "stroke-width": 2});
  var lab=av.label(interpret("<span style='color:red;'> Supervise </span>"), {left: ((mainline2X1-mainline2X2)+100), top: mainline2Y1- 50 });
  lab.css({"font-weight": "bold", "font-size": 15});
  var line14= av.g.line(0, 0 ,0 , 0 , {opacity: 100, "stroke-width": 2});
  var line15=av.g.line(0, 0 ,0 , 0 , {opacity: 100, "stroke-width": 2});;

  // array that hold project number that has already worked employee so as when another employee come to work at this project we will search
  //that array to see if the employee cell isnot empty we will add a new record to the project matrix 
  //that result in redundancy problem that we want to show
  
  var pointer1;
  var pointer2;
  var pointer3;
  var BridgeRow=0;
  var arr_values = [];
  var arrFullProIndex=0;
  var empNo=0;
  var supervisorEmp=0;
  var subordinateEmp=0;
  var Partner=0;
  var cx=OriginalArrLeft+48;
  var cy=arrayTop+(30*((empNo)+1));
  var cRadius=15;
  var x1=cx;
  var y1=arrayTop+(30*((empNo)+1));
  var x2=350/2;
  //var y2=arrayTop+(30*((proNo)+1));
  var y2=y1-50;
  //note that 90 is the cell or feild width in matrix 1 and matrix3
  //var cx1=arrayEnd-(90/2);
 // cx1 and cy1 for circle1 pointing at supurvisor Id in bridge table
  var cx1=arrayLeft+48;
  var cy1=0;
  // cx2 and cy2 for circle2 pointing at subordinate Id in bridge table
  var cx2=arrayLeft+138;
  var cy2=0;

  //circle surrounding primary key of employee table
  var circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
 //circle surrounding foreign key of Emp-id(supervisor-id) in bridge table
  var circle1=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  //circle surrounding foreign key of Emp-id(subordinate-id) in bridge table
  var circle2=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
  
 // var circle4=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  // circle to point for employee
  circle.hide();
  // circle to point for employee's partner
  circle2.hide();
  circle1.hide();
  //circle4.hide();

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
  var LinePkFk = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  line1.hide();
  line8.hide();
  line9.hide();
  line14.hide();
  line15.hide();
  LinePkFk.hide();
  av.umsg(interpret("sc1").bold().big());

  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  av.displayInit(1);

// Slide 2
av.umsg(("To represent the N:M relationship bridge should be used").bold().big());
line2.hide();
  line3.hide();
  line4.hide();
  line5.hide();
  line6.hide();
  line7.hide();
  line10.hide();
  line13.hide();
  lab.hide();
 // show all rows of matrix 3
 for (var i=0; i < themMatrix3.length; i++)
 {
 matrx3._arrays[i].show();
 }
av.step();

//slide 3
  
  av.umsg(("The primary key (E-id) in employee entity will be used twice as a foreign keys in the bridge").bold().big());
  cy=arrayTop+(30*((supervisorEmp)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  av.step();

  

//slide 4
av.umsg(("The first time PK (E-id) used as a foreign key for supervisor employees").bold().big());
 cy1=BridgeTop+(30*((subordinateEmp)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
  circle1.hide();
  matrx3._arrays[0].highlight(0);
  LinePkFk.movePoints([[0, cx, cy], [1, cx1, cy1]]);
  LinePkFk.show();
av.step();

//slide 5
av.umsg(("The second time PK (E-id) used as a foreign key for subordinate employees").bold().big());
cy2=BridgeTop+(30*((subordinateEmp)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "red","stroke-width": 2});
  circle2.hide();
  matrx3._arrays[0].unhighlight(0);
  matrx3._arrays[0].highlight(1);
  LinePkFk.movePoints([[0, cx, cy], [1, cx2, cy2]]);
  LinePkFk.show();
av.step();

//slide 6
av.umsg(interpret("sc5").bold().big());
circle.hide();
matrx3._arrays[0].unhighlight(1);
LinePkFk.hide();
matrx1._arrays[5].value(0,"<span style='color:red;'> 5 </span>");
matrx1._arrays[5].value(1,"<span style='color:red;'> ahmed </span>");
matrx1._arrays[5].value(2,"<span style='color:red;'> 500</span>");
matrx1._arrays[2].value(0,"<span style='color:blue;'> 2 </span>");
matrx1._arrays[2].value(1,"<span style='color:blue;'> adel </span>");
matrx1._arrays[2].value(2,"<span style='color:blue;'> 700</span>");
matrx1._arrays[8].value(0,"<span style='color:blue;'> 8 </span>");
matrx1._arrays[8].value(1,"<span style='color:blue;'> Hazem </span>");
matrx1._arrays[8].value(2,"<span style='color:blue;'> 500</span>");
matrx1._arrays[6].value(0,"<span style='color:blue;'> 6 </span>");
matrx1._arrays[6].value(1,"<span style='color:blue;'> Randa </span>");
matrx1._arrays[6].value(2,"<span style='color:blue;'> 600</span>");

av.step();

//slide 7
av.umsg(interpret("Initially how to represent that employee ahmed is the supervisor of employee adel").bold().big());
supervisorEmp=5;
subordinateEmp=2;
matrx1._arrays[supervisorEmp].highlight(0);
matrx1._arrays[supervisorEmp].highlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
av.step();

//slide 8
av.umsg(interpret("5 is the E-id of supervisor ahmed").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("supervisor ahmed ID", matrx1._arrays[supervisorEmp].index(0), {left: Matrix1PonterLeft-30, top:pointerTop });
 pointer2 = av.pointer(" ", matrx1._arrays[supervisorEmp].index(1), {right: Matrix1Ponterright, top:pointerTop});
cy=arrayTop+(30*((supervisorEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 9
av.umsg(("put ahmed's id=5 in the bridge in the supervisor column").bold().big());
BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("supervisor ahmed ID", matrx3._arrays[BridgeRow].index(0), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(0, "5");
  matrx3._arrays[BridgeRow].highlight(0);
  cy1=BridgeTop+(30*((BridgeRow)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
av.step(); 

//slide 10
av.umsg(("2 is the E-id of subordinate adel").bold().big());
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle1.hide();
matrx3._arrays[BridgeRow].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("subordinate emp adel ID", matrx1._arrays[subordinateEmp].index(0), {left: Matrix1PonterLeft-40, top:pointerTop+80 });
 pointer2 = av.pointer(" ", matrx1._arrays[subordinateEmp].index(1), {right: Matrix1Ponterright, top:pointerTop+80});
cy=arrayTop+(30*((subordinateEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
av.step();

//slide 11
av.umsg(("then put adel's id=2 in the bridge as a suborinate of employee ahmed(i.e., column beside ahmed's id=5)").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("subordinate emp adel ID", matrx3._arrays[BridgeRow].index(1), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(1, "2");
  matrx3._arrays[BridgeRow].highlight(1);
  cy2=BridgeTop+(30*((BridgeRow)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "blue","stroke-width": 2});
 
  //subordinateEmp=8;
av.step(); 

//slide 12
av.umsg(interpret("5 is the E-id of supervisor ahmed").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
matrx3._arrays[BridgeRow].unhighlight(1);
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle2.hide();
BridgeRow++;
//av.umsg(interpret("5 is the E-id of supervisor ahmed").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
supervisorEmp=5;
subordinateEmp=8;
matrx1._arrays[supervisorEmp].highlight(0);
matrx1._arrays[supervisorEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("supervisor ahmed ID", matrx1._arrays[supervisorEmp].index(0), {left: Matrix1PonterLeft-30, top:pointerTop });
 pointer2 = av.pointer(" ", matrx1._arrays[supervisorEmp].index(1), {right: Matrix1Ponterright, top:pointerTop});
cy=arrayTop+(30*((supervisorEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 13
av.umsg(("put ahmed's id=5 in the bridge in the supervisor column").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("supervisor ahmed ID", matrx3._arrays[BridgeRow].index(0), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(0, "5");
  matrx3._arrays[BridgeRow].highlight(0);
  cy1=BridgeTop+(30*((BridgeRow)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
av.step(); 

//slide 14
av.umsg(("8 is the E-id of subordinate Hazem").bold().big());
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle1.hide();
matrx3._arrays[BridgeRow].unhighlight(0);
//av.umsg(interpret("5 is the E-id of supervisor ahmed").bold().big());
matrx1._arrays[supervisorEmp].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("subordinate emp Hazem ID", matrx1._arrays[subordinateEmp].index(0), {left: Matrix1PonterLeft-60, top:pointerTop-100 });
 pointer2 = av.pointer(" ", matrx1._arrays[subordinateEmp].index(1), {right: Matrix1Ponterright+30, top:pointerTop-100});
cy=arrayTop+(30*((subordinateEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
av.step();

//slide 15
av.umsg(("then put Hazem's id=8 in the bridge as a suborinate of employee ahmed(i.e., column beside ahmed's id=5)").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("subordinate emp Hazem ID", matrx3._arrays[BridgeRow].index(1), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(1, "8");
  matrx3._arrays[BridgeRow].highlight(1);
  cy2=BridgeTop+(30*((BridgeRow)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "blue","stroke-width": 2});
  //BridgeRow++;
  //subordinateEmp=8;
av.step();

//slide 16
av.umsg(("5 is the E-id of supervisor ahmed").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
matrx3._arrays[BridgeRow].unhighlight(1);
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle2.hide();
BridgeRow++;
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
supervisorEmp=5;
subordinateEmp=6;
matrx1._arrays[supervisorEmp].highlight(0);
matrx1._arrays[supervisorEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("supervisor ahmed ID", matrx1._arrays[supervisorEmp].index(0), {left: Matrix1PonterLeft-30, top:pointerTop });
 pointer2 = av.pointer(" ", matrx1._arrays[supervisorEmp].index(1), {right: Matrix1Ponterright, top:pointerTop});
cy=arrayTop+(30*((supervisorEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 17
av.umsg(("put ahmed's id=5 in the bridge in the supervisor column").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("supervisor ahmed ID", matrx3._arrays[BridgeRow].index(0), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(0, "5");
  matrx3._arrays[BridgeRow].highlight(0);
  cy1=BridgeTop+(30*((BridgeRow)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
av.step(); 

//slide 18
av.umsg(("6 is the E-id of subordinate Randa").bold().big());
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle1.hide();
matrx1._arrays[supervisorEmp].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
matrx3._arrays[BridgeRow].unhighlight(0);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("subordinate emp Randa ID", matrx1._arrays[subordinateEmp].index(0), {left: Matrix1PonterLeft-60, top:pointerTop-40 });
 pointer2 = av.pointer(" ", matrx1._arrays[subordinateEmp].index(1), {right: Matrix1Ponterright+20, top:pointerTop-40});
cy=arrayTop+(30*((subordinateEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
av.step();

//slide 19
av.umsg(("then put Randa's id=6 in the bridge as a suborinate of employee ahmed(i.e., column beside ahmed's id=5)").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("subordinate emp Randa ID", matrx3._arrays[BridgeRow].index(1), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(1, "6");
  matrx3._arrays[BridgeRow].highlight(1);
  cy2=BridgeTop+(30*((BridgeRow)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "blue","stroke-width": 2});
  //BridgeRow++;
  //subordinateEmp=8;
av.step();

//slide 20
matrx1._arrays[5].value(0,"5");
matrx1._arrays[5].value(1,"ahmed");
matrx1._arrays[5].value(2,"500");
matrx1._arrays[2].value(0,"2");
matrx1._arrays[2].value(1,"adel");
matrx1._arrays[2].value(2,"700");
matrx1._arrays[8].value(0,"8");
matrx1._arrays[8].value(1,"Hazem");
matrx1._arrays[8].value(2,"500");
matrx1._arrays[6].value(0,"6");
matrx1._arrays[6].value(1,"Randa");
matrx1._arrays[6].value(2,"600");

matrx1._arrays[8].value(0,"<span style='color:red;'> 8 </span>");
matrx1._arrays[8].value(1,"<span style='color:red;'> Hazem </span>");
matrx1._arrays[8].value(2,"<span style='color:red;'> 500</span>");
matrx1._arrays[1].value(0,"<span style='color:blue;'> 1 </span>");
matrx1._arrays[1].value(1,"<span style='color:blue;'> ali </span>");
matrx1._arrays[1].value(2,"<span style='color:blue;'> 500</span>");
matrx1._arrays[3].value(0,"<span style='color:blue;'> 3 </span>");
matrx1._arrays[3].value(1,"<span style='color:blue;'> mona </span>");
matrx1._arrays[3].value(2,"<span style='color:blue;'> 1000</span>");

matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
matrx3._arrays[BridgeRow].unhighlight(1);
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle2.hide();
BridgeRow++;
av.umsg(interpret("sc6").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
supervisorEmp=8;
subordinateEmp=3;
matrx1._arrays[supervisorEmp].highlight(0);
matrx1._arrays[supervisorEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("supervisor Hazem ID", matrx1._arrays[supervisorEmp].index(0), {left: Matrix1PonterLeft-30, top:pointerTop });
 pointer2 = av.pointer(" ", matrx1._arrays[supervisorEmp].index(1), {right: Matrix1Ponterright, top:pointerTop});
cy=arrayTop+(30*((supervisorEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 21
av.umsg(("put Hazem's id=8 in the bridge in the supervisor column").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("supervisor Hazem ID", matrx3._arrays[BridgeRow].index(0), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(0, "8");
  matrx3._arrays[BridgeRow].highlight(0);
  cy1=BridgeTop+(30*((BridgeRow)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
av.step(); 

//slide 22
av.umsg(("3 is the E-id of subordinate mona").bold().big());
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle1.hide();
matrx1._arrays[supervisorEmp].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
matrx3._arrays[BridgeRow].unhighlight(0);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("subordinate emp mona ID", matrx1._arrays[subordinateEmp].index(0), {left: Matrix1PonterLeft-40, top:pointerTop+150 });
 pointer2 = av.pointer(" ", matrx1._arrays[subordinateEmp].index(1), {right: Matrix1Ponterright+40, top:pointerTop+150});
cy=arrayTop+(30*((subordinateEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
av.step();

//slide 23
av.umsg(("then put mona's id=3 in the bridge as a suborinate of supervisor employee Hazem(i.e., column beside Hazem's id=8)").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("subordinate emp mona ID", matrx3._arrays[BridgeRow].index(1), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(1, "3");
  matrx3._arrays[BridgeRow].highlight(1);
  cy2=BridgeTop+(30*((BridgeRow)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "blue","stroke-width": 2});
  //BridgeRow++;
  //subordinateEmp=8;
av.step();

//slide 24
av.umsg(("8 is the E-id of supervisor Hazem").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
matrx3._arrays[BridgeRow].unhighlight(1);
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle2.hide();
BridgeRow++;
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
supervisorEmp=8;
subordinateEmp=1;
matrx1._arrays[supervisorEmp].highlight(0);
matrx1._arrays[supervisorEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("supervisor Hazem ID", matrx1._arrays[supervisorEmp].index(0), {left: Matrix1PonterLeft-30, top:pointerTop });
 pointer2 = av.pointer(" ", matrx1._arrays[supervisorEmp].index(1), {right: Matrix1Ponterright, top:pointerTop});
cy=arrayTop+(30*((supervisorEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 25
//BridgeRow=1;
av.umsg(("put Hazem's id=8 in the bridge in the supervisor column").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("supervisor Hazem ID", matrx3._arrays[BridgeRow].index(0), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(0, "8");
  matrx3._arrays[BridgeRow].highlight(0);
  cy1=BridgeTop+(30*((BridgeRow)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
av.step(); 

//slide 26
av.umsg(("1 is the E-id of subordinate ali").bold().big());
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle1.hide();
matrx1._arrays[supervisorEmp].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
matrx3._arrays[BridgeRow].unhighlight(0);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("subordinate emp ali ID", matrx1._arrays[subordinateEmp].index(0), {left: Matrix1PonterLeft, top:pointerTop+40 });
 pointer2 = av.pointer(" ", matrx1._arrays[subordinateEmp].index(1), {right: Matrix1Ponterright-30, top:pointerTop+40});
cy=arrayTop+(30*((subordinateEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
av.step();

//slide 27
//BridgeRow=1;
av.umsg(("then put ali's id=1 in the bridge as a suborinate of supervisor employee Hazem(i.e., column beside Hazem's id=8)").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("subordinate emp ali ID", matrx3._arrays[BridgeRow].index(1), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(1, "1");
  matrx3._arrays[BridgeRow].highlight(1);
  cy2=BridgeTop+(30*((BridgeRow)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "blue","stroke-width": 2});
  //BridgeRow++;
  //subordinateEmp=8;
av.step();

//slide 28
matrx1._arrays[8].value(0,"8");
matrx1._arrays[8].value(1,"Hazem");
matrx1._arrays[8].value(2,"500");
matrx1._arrays[3].value(0,"3");
matrx1._arrays[3].value(1,"mona");
matrx1._arrays[3].value(2,"1000");
matrx1._arrays[1].value(0,"1");
matrx1._arrays[1].value(1,"ali");
matrx1._arrays[1].value(2,"500");

matrx1._arrays[9].value(0,"<span style='color:red;'> 9</span>");
matrx1._arrays[9].value(1,"<span style='color:red;'> Layla </span>");
matrx1._arrays[9].value(2,"<span style='color:red;'> 800</span>");
matrx1._arrays[6].value(0,"<span style='color:blue;'> 6 </span>");
matrx1._arrays[6].value(1,"<span style='color:blue;'> Randa </span>");
matrx1._arrays[6].value(2,"<span style='color:blue;'> 600</span>");
matrx1._arrays[4].value(0,"<span style='color:blue;'> 4</span>");
matrx1._arrays[4].value(1,"<span style='color:blue;'> morad </span>");
matrx1._arrays[4].value(2,"<span style='color:blue;'> 300</span>");

matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
matrx3._arrays[BridgeRow].unhighlight(1);
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle2.hide();
BridgeRow++;
av.umsg(interpret("sc7").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
supervisorEmp=9;
subordinateEmp=6;
matrx1._arrays[supervisorEmp].highlight(0);
matrx1._arrays[supervisorEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("supervisor Layla ID", matrx1._arrays[supervisorEmp].index(0), {left: Matrix1PonterLeft-30, top:pointerTop });
 pointer2 = av.pointer(" ", matrx1._arrays[supervisorEmp].index(1), {right: Matrix1Ponterright, top:pointerTop});
cy=arrayTop+(30*((supervisorEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 29
av.umsg(("put Layla's id=9 in the bridge in the supervisor column").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("supervisor Layla ID", matrx3._arrays[BridgeRow].index(0), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(0, "9");
  matrx3._arrays[BridgeRow].highlight(0);
  cy1=BridgeTop+(30*((BridgeRow)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
av.step(); 

//slide 30
av.umsg(("6 is the E-id of subordinate Randa").bold().big());
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle1.hide();
matrx1._arrays[supervisorEmp].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
matrx3._arrays[BridgeRow].unhighlight(0);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("subordinate emp Randa ID", matrx1._arrays[subordinateEmp].index(0), {left: Matrix1PonterLeft-60, top:pointerTop-40 });
 pointer2 = av.pointer(" ", matrx1._arrays[subordinateEmp].index(1), {right: Matrix1Ponterright+20, top:pointerTop-40});
cy=arrayTop+(30*((subordinateEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
av.step();

//slide 31
av.umsg(("then put Randa's id=6 in the bridge as a suborinate of supervisor employee Layla(i.e., column beside Layla's id=9)").bold().big());
//BridgeRow=1;
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("subordinate emp Randa ID", matrx3._arrays[BridgeRow].index(1), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(1, "6");
  matrx3._arrays[BridgeRow].highlight(1);
  cy2=BridgeTop+(30*((BridgeRow)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "blue","stroke-width": 2});
  //BridgeRow++;
  //subordinateEmp=8;
av.step();

//slide 32
av.umsg(("9 is the E-id of supervisor Layla").bold().big());
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
matrx3._arrays[BridgeRow].unhighlight(1);
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle2.hide();
BridgeRow++;
matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
supervisorEmp=9;
subordinateEmp=4;
matrx1._arrays[supervisorEmp].highlight(0);
matrx1._arrays[supervisorEmp].highlight(1);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("supervisor Layla ID", matrx1._arrays[supervisorEmp].index(0), {left: Matrix1PonterLeft-30, top:pointerTop });
 pointer2 = av.pointer(" ", matrx1._arrays[supervisorEmp].index(1), {right: Matrix1Ponterright, top:pointerTop});
cy=arrayTop+(30*((supervisorEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 33
//BridgeRow=1;
av.umsg(("put Layla's id=9 in the bridge in the supervisor column").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("supervisor Layla ID", matrx3._arrays[BridgeRow].index(0), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(0, "9");
  matrx3._arrays[BridgeRow].highlight(0);
  cy1=BridgeTop+(30*((BridgeRow)+1));
  circle1=av.g.circle(cx1,cy1 ,cRadius , {stroke: "red","stroke-width": 2});
av.step(); 

//slide 34
av.umsg(("4 is the E-id of subordinate morad").bold().big());
pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle1.hide();
matrx1._arrays[supervisorEmp].unhighlight(0);
matrx1._arrays[supervisorEmp].unhighlight(1);
matrx1._arrays[subordinateEmp].highlight(0);
matrx1._arrays[subordinateEmp].highlight(1);
matrx3._arrays[BridgeRow].unhighlight(0);
pointerTop=MatrixPointerTopStart+(MatrixCellHight*supervisorEmp);
 pointer1 = av.pointer("subordinate emp morad ID", matrx1._arrays[subordinateEmp].index(0), {left: Matrix1PonterLeft-60, top:pointerTop-40 });
 pointer2 = av.pointer(" ", matrx1._arrays[subordinateEmp].index(1), {right: Matrix1Ponterright+20, top:pointerTop-40});
cy=arrayTop+(30*((subordinateEmp)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "blue","stroke-width": 2});
av.step();

//slide 35
//BridgeRow=1;
av.umsg(("then put morad's id=4 in the bridge as a suborinate of supervisor employee Layla(i.e., column beside Layla's id=9)").bold().big());
  pointerTop=MatrixPointerTopStart+(MatrixCellHight*BridgeRow);
   pointer3 = av.pointer("subordinate emp morad ID", matrx3._arrays[BridgeRow].index(1), {right: Matrix2Ponterright+arrayLeft, top: pointerTop});
  matrx3._arrays[BridgeRow].value(1, "4");
  matrx3._arrays[BridgeRow].highlight(1);
  cy2=BridgeTop+(30*((BridgeRow)+1));
  circle2=av.g.circle(cx2,cy2 ,cRadius , {stroke: "blue","stroke-width": 2});
  //BridgeRow++;
  //subordinateEmp=8;
av.step();

//slide 36
matrx1._arrays[9].value(0,"9");
matrx1._arrays[9].value(1,"Layla");
matrx1._arrays[9].value(2,"800");
matrx1._arrays[6].value(0,"6");
matrx1._arrays[6].value(1,"Randa");
matrx1._arrays[6].value(2,"600");
matrx1._arrays[4].value(0,"4");
matrx1._arrays[4].value(1,"morad");
matrx1._arrays[4].value(2,"300");

matrx1._arrays[subordinateEmp].unhighlight(0);
matrx1._arrays[subordinateEmp].unhighlight(1);
matrx3._arrays[BridgeRow].unhighlight(1);

pointer1.hide();
pointer2.hide();
pointer3.hide();
circle.hide();
circle2.hide();
// main that represents the two tables' relations
line2.movePoints([[0, mainline2X1-20, mainline2Y1], [1, mainline2X2, mainline2Y2]]);
line2.show();
//the bottom line parrallel to the main line

line3.movePoints([[0, mainline2X1, (mainline2Y1+7*30)], [1, mainline2X2-100, (mainline2Y1+7*30)]]);
line3.show();
//vertical line parrallel to table employee
// number 30 in this equation (mainline2Y1+7*30) is the matrix cell hieght

 line4.movePoints([[0, mainline2X1, mainline2Y2+(5*33)], [1, mainline2X1, (mainline2Y1+7*30)]]);
line4.show();
//two vertical lines of the tables' relations representing cardinality
//two line of many cardinality under table employee
//all calculations of this cross foot calculated regards of the vertical line under table bridge which is line4

line10.movePoints([ [0, mainline2X1+10, mainline2Y2+(5*33)],[1, mainline2X1, mainline2Y2+(5*33)+15]]);
line10.show();

line5.movePoints([ [0,  mainline2X1-10, mainline2Y2+(5*33)],[1, mainline2X1, mainline2Y2+(5*33)+15]]);
line5.show();
// the one cardinality of under table employee
//line15= av.g.line((mainline2X2-100)+10, (mainline2Y1+7*30)-10,(mainline2X2-100)-10 , (mainline2Y1+7*30)-10, {opacity: 100, "stroke-width": 2});
line15.movePoints([[0, (mainline2X2-100)+10, (mainline2Y1+7*30)-10], [1,  (mainline2X2-100)-10, (mainline2Y1+7*30)-10]]);
line15.show();
//two line of many cardinality beside table employee
//all calculations of bridg's  cross foot calculated regards of the horizontal line beside table employee which is line2 (main line)

 line6.movePoints([[0, arrayLeft-20, mainline2Y1], [1, arrayLeft , mainline2Y1-10]]);
line6.show();

 line13.movePoints([[0, arrayLeft-20, mainline2Y1], [1,  arrayLeft,mainline2Y1+10]]);
line13.show();
// the one cardinality of beside table employee
 
 line14.movePoints([[0, mainline2X1-240, mainline2Y1-10], [1,  mainline2X1-240 ,mainline2Y1+10]]);
 line14.show();
//vertical line under table employee

line7.movePoints([[0, mainline2X2-100, (mainline2Y1+7*30)], [1, mainline2X2-100, (mainline2Y1+7*30)-25]]);
line7.show();
av.step();

//slide 37
av.umsg(interpret("Finally this is the logical ERD of the relation").bold().big());
line2.movePoints([[0, mainline2X1,mainline2Y1 ], [1,mainline2X2 , mainline2Y2]]);
line2.show();
line3.movePoints([[0, mainline2X1, (mainline2Y1+7*30)], [1,mainline2X2-100 ,(mainline2Y1+7*30) ]]);
line3.show();
line4.movePoints([[0, mainline2X1,mainline2Y2 ], [1, mainline2X1,(mainline2Y1+7*30) ]]);
line4.show();
line5.movePoints([ [0, mainline2X2-100 ,(mainline2Y1+7*30)-10 ],[1,(mainline2X2-100)-10 ,(mainline2Y1+7*30)-25]]);
line5.show();
line6.movePoints([[0, mainline2X1-240,mainline2Y1 ], [1, mainline2X2 , mainline2Y1-10]]);
line6.show();
line7.movePoints([[0,mainline2X2-100 , (mainline2Y1+7*30)], [1,mainline2X2-100 ,(mainline2Y1+7*30)-25 ]]);
line7.show();
line10.movePoints([ [0, mainline2X2-100 , (mainline2Y1+7*30)-10],[1,(mainline2X2-100)+10 ,(mainline2Y1+7*30)-25 ]]);
line10.show();
line13.movePoints([[0, mainline2X1-240 ,mainline2Y1 ], [1,mainline2X2,mainline2Y1+10]]);
line13.show();
  line14.hide();
  line15.hide();
  lab.show();
  // show all rows of matrix 3
 for (var i=0; i < themMatrix3.length; i++)
 {
 matrx3._arrays[i].hide();
 }
  av.step();


//slide 38
av.umsg(interpret("Here is the corresponding physical relational schema diagram").bold().big());
  ERDlab.show();
  SCHlab.show();
  empSchlab.show();
  Bridgelab.show();
 EmpSchemaArr._arrays[0].show();
 bridgeSchemaArr._arrays[0].show();
av.recorded();

  
});
