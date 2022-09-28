/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "oneToManyrightForm";
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
 
  var themMatrix3 = [["E-id","E-name","E-salary","P-id(FK)"],[1,"ali",500,""],[2,"adel",700,""],[3,"khaled",1000,""],[4,"morad",300,""],[5,"ahmed",500,""],[6,"walid",600,""]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix1 = [["E-id","E-name","E-salary"],[1,"ali",500],[2,"adel",700],[3,"khaled",1000],[4,"morad",300],[5,"ahmed",500],[6,"walid",600]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });

  var ERDlab=av.label(interpret("<span style='color:blue;'> Logical ER-Diagram </span>"), {left: arrayLeft, top: arrayTop-40 });
  ERDlab.css({"font-weight": "bold", "font-size": 20});
  ERDlab.hide();
  
  arrayLeft+=arrayWidth+arrayGap;
  arrayLeft+=arrayWidth+arrayGap;
  
  var themMatrix2 =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewage","cairo"],["D","Natural gas","assiut"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix2Copy =[["P-id","P-name","P-location"],["A","electricity","minia"],["B","plumbing","sohag"],["C","sewage","cairo"],["D","Natural gas","assiut"]];
  var matrx2Copy= av.ds.matrix(themMatrix2Copy, {style: "table", top: arrayTop, left: arrayLeft-arrayGap-30 });
  for (var i=0; i < themMatrix2Copy.length; i++)
  {
  matrx2Copy._arrays[i].hide();
  } 

  var schmaOffsit=arrayLeft+75;
  var SCHlab=av.label(interpret("<span style='color:blue;'> physical schema Diagram </span>"), {left: schmaOffsit, top: arrayTop-40 });
  SCHlab.css({"font-weight": "bold", "font-size": 20});
  SCHlab.hide();
  var empSchlab=av.label(interpret("Employee"), {left: schmaOffsit, top: arrayTop });
  empSchlab.css({"font-weight": "bold", "font-size": 15});
  empSchlab.hide();
  var empSchema = [["E-id","E-name","S-salary","P-id(FK)"]];
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
  matrx2Copy._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

  // to underline primary keys in all tables
  matrx1._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2._arrays[0].css([0], {"text-decoration": "underline"});
  matrx3._arrays[0].css([0], {"text-decoration": "underline"});
  matrx2Copy._arrays[0].css([0], {"text-decoration": "underline"});

  // hide all rows of matrix 3
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  }

  
  //Draw relation between project and employee tables in the first slide
  var mainline2X1=740+50-140;
  var mainline2Y1=110;
  var mainline2X2=290;
  var mainline2Y2=mainline2Y1; 

  // main that represents the two tables' relations
  var line2 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  //cross foot of the tables' relations
  var line3 = av.g.line( mainline2X1-20,  mainline2Y1,  mainline2X1,  mainline2Y1-10,{opacity: 100, "stroke-width": 2});
  var line4 = av.g.line( mainline2X1-20,  mainline2Y1, mainline2X1,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  //two vertical lines of the tables' relations
  //vertical line beside table project
  //var line5 = av.g.line( mainline2X1-20,  mainline2Y1-10, mainline2X1-20,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
  //vertical line beside table employee
  var line6= av.g.line( mainline2X1-335,  mainline2Y1-10, mainline2X1-335,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  var lab=av.label(interpret("<span style='color:red;'> Works at </span>"), {left: ((mainline2X1-mainline2X2)+60), top: mainline2Y1- 50 });
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
  // hide all of the rows of matrix 2 and show all rows of matrix3 knowing that the two rows are of the same length
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx1._arrays[i].hide();
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
  //NoEmpProB++;
  y1=arrayTop+(30*((proNo)+1));
  y2=arrayTop+(30*((empNo)+1));
  cy=arrayTop+(30*((proNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  matrx3._arrays[empNo].highlight();
  matrx2._arrays[proNo].highlight(0);
  matrx2._arrays[proNo].highlight(1);
  arr_values[arrFullProIndex] = proNo;
  arrFullProIndex++;
  av.step();

  // Slide 4  
  av.umsg(interpret("sc4").bold().big());
  circle.show();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  line1.show();
  matrx3._arrays[empNo].value(3,"B");
  av.step();
  
  //slide 5
  av.umsg(interpret("sc5").bold().big());
  matrx2._arrays[proNo].unhighlight(0);
  matrx2._arrays[proNo].unhighlight(1);
  matrx3._arrays[empNo].unhighlight();
  circle.hide();
  line1.hide();
  empNo=4;
  proNo=3;
  matrx2._arrays[proNo].highlight(0);
  matrx2._arrays[proNo].highlight(1);
  matrx3._arrays[empNo].highlight();

  y1=arrayTop+(30*((proNo)+1));
  y2=arrayTop+(30*((empNo)+1));
  cy=arrayTop+(30*((proNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

  // Slide 6 
  av.umsg(interpret("sc5").bold().big());
  circle.show();
  line1.show();
  matrx3._arrays[empNo].value(3,"C");
  av.step();

  // Slide 7
  av.umsg(interpret("sc6").bold().big());
  matrx2._arrays[proNo].unhighlight(0);
  matrx2._arrays[proNo].unhighlight(1);
  matrx3._arrays[empNo].unhighlight();
  circle.hide();
  line1.hide();
  proNo=2;
  empNo=6;
  matrx2._arrays[proNo].highlight(0);
  matrx2._arrays[proNo].highlight(1);
  matrx3._arrays[empNo].highlight();
  y1=arrayTop+(30*((proNo)+1));
  y2=arrayTop+(30*((empNo)+1));
  cy=arrayTop+(30*((proNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

  // Slide 8 
  av.umsg(interpret("sc6").bold().big());
 circle.show();
 line1.show();
 matrx3._arrays[empNo].value(3,"B");
  av.step();

 // Slide 9
  av.umsg(interpret("sc7").bold().big());
  matrx2._arrays[proNo].unhighlight(0);
  matrx2._arrays[proNo].unhighlight(1);
  matrx3._arrays[empNo].unhighlight();
  circle.hide();
  line1.hide();
  proNo=3;
  empNo=2;
  matrx2._arrays[proNo].highlight(0);
  matrx2._arrays[proNo].highlight(1);
  matrx3._arrays[empNo].highlight();
  y1=arrayTop+(30*((proNo)+1));
  y2=arrayTop+(30*((empNo)+1));
  cy=arrayTop+(30*((proNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();
 
 // Slide 10
  av.umsg(interpret("sc7").bold().big());
  circle.show();
  line1.show();
  matrx3._arrays[empNo].value(3,"C");
  av.step();
 
//slide 11
  av.umsg(interpret("sc8").bold().big());
  matrx2._arrays[proNo].unhighlight(0);
  matrx2._arrays[proNo].unhighlight(1);
  matrx3._arrays[empNo].unhighlight();
  circle.hide();
  line1.hide();
  proNo=2;
  empNo=1;
  matrx2._arrays[proNo].highlight(0);
  matrx2._arrays[proNo].highlight(1);
  matrx3._arrays[empNo].highlight();
  y1=arrayTop+(30*((proNo)+1));
  y2=arrayTop+(30*((empNo)+1));
  cy=arrayTop+(30*((proNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

//slide 12
av.umsg(interpret("sc8").bold().big());
circle.show();
line1.show();
matrx3._arrays[empNo].value(3,"B");
  av.step();

//slide 13
av.umsg(interpret("sc9").bold().big());
matrx2._arrays[proNo].unhighlight(0);
matrx2._arrays[proNo].unhighlight(1);
matrx3._arrays[empNo].unhighlight();
circle.hide();
line1.hide();
proNo=1;
empNo=3;
matrx2._arrays[proNo].highlight(0);
matrx2._arrays[proNo].highlight(1);
matrx3._arrays[empNo].highlight();
y1=arrayTop+(30*((proNo)+1));
y2=arrayTop+(30*((empNo)+1));
cy=arrayTop+(30*((proNo)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
circle.hide();
line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

   //slide 14
   av.umsg(interpret("sc9").bold().big());
   circle.show();
   line1.show();
   matrx3._arrays[empNo].value(3,"A");
   av.step();

   //slide 15
   av.umsg(interpret("Finally this is the logical ERD of the relation").bold().big());
   matrx2._arrays[proNo].unhighlight(0);
   matrx2._arrays[proNo].unhighlight(1);
   matrx3._arrays[empNo].unhighlight();
   circle.hide();
   line1.hide();
   // hide all of the rows of matrix 3 and show all rows of matrix 1 knowing that the two rows are of the same length
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx1._arrays[i].show();
  matrx3._arrays[i].hide();
  }  
  for (var i=0; i < themMatrix2.length; i++)
  {
  matrx2._arrays[i].hide();
  matrx2Copy._arrays[i].show();
  }  
  // is the starting point of the matrix2Copy "the left point of it" as shown in its definition above
  mainline2X1=arrayLeft-arrayGap-30;
  // main that represents the two tables' relations
  line2.movePoints([[0,mainline2X1 ,mainline2Y1 ], [1,mainline2X2 ,mainline2Y2]]);
  line2.show();
  //cross foot of the tables' relations
  line3.movePoints([[0,mainline2X1-20 ,mainline2Y1 ], [1,mainline2X1 ,mainline2Y1-10]]);
  line3.show();
  line4.movePoints([[0,mainline2X1-20 ,mainline2Y1 ], [1,mainline2X1 ,mainline2Y1+10]]);
  line4.show();
  //two vertical lines of the tables' relations
  //vertical line beside table employee
  line6.movePoints([[0,mainline2X1-arrayGap+80 ,mainline2Y1-10 ], [1,mainline2X1-arrayGap+80,mainline2Y1+10]]);
  line6.show();
  var lab2=av.label(interpret("<span style='color:red;'> Works at </span>"), {left: ((mainline2X1-mainline2X2)+180), top: mainline2Y1-40 });
  lab2.css({"font-weight": "bold", "font-size": 15});
   av.step();

   // slide 16
   av.umsg(interpret("Here is the corresponding physical relational schema diagram where new column representing the relation is added to the employee entity in the database schema").bold().big());
   ERDlab.show();
  SCHlab.show();
  empSchlab.show();
  proSchlab.show();
  empSchemaArr._arrays[0].show();
  proSchemaArr._arrays[0].show();
  av.recorded();

});
