/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "One-to-oneBinary";
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
 
  var themMatrix3 = [["con-name","area","Population","Language","cap-id(FK)"],["Egypt","102m.Km^2","100million","Arabic",""],["USA","9.83m.Km^2","307million","English",""],["UK","242,000Km^2","65million","English",""]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix1 = [["con-name","area","Population","Language"],["Egypt","102m.Km^2","100million","Arabic"],["USA","9.83m.Km^2","307million","English"],["UK","242,000Km^2","65million","English"]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });

  var ERDlab=av.label(interpret("<span style='color:blue;'> Logical ER-Diagram </span>"), {left: arrayLeft, top: arrayTop-40 });
  ERDlab.css({"font-weight": "bold", "font-size": 20});
  ERDlab.hide();

  //To put the physical schema under the table county you should change the array top (top of entity country) with value schmaOffsitBottom=arrayTop+(30*4)+70;
  // where 30 is the cell higth in the matrix and 4 is the number of rows in country table and 70 is extra gap between schema lable and table county
  var schmaOffsitBottom=arrayTop+(30*4)+70;
  var SCHlab=av.label(interpret("<span style='color:blue;'> physical schema Diagram </span>"), {left: arrayLeft, top: schmaOffsitBottom-40 });
  SCHlab.css({"font-weight": "bold", "font-size": 20});
  SCHlab.hide();
  var conSchlab=av.label(interpret("Contry"), {left: arrayLeft, top: schmaOffsitBottom });
  conSchlab.css({"font-weight": "bold", "font-size": 15});
  conSchlab.hide();
  var conSchema = [["con-name","con-area","Population","Language","cap-id(FK)"]];
  var conSchemaArr= av.ds.matrix(conSchema, {style: "table", top: schmaOffsitBottom+20, left: arrayLeft});
  conSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  conSchemaArr._arrays[0].hide();
  
  var capSchlab=av.label(interpret("Capital"), {left: arrayLeft, top: schmaOffsitBottom+70 });
  capSchlab.css({"font-weight": "bold", "font-size": 15});
  capSchlab.hide();
  var capSchema = [["Cap-name","Cap-area","Cap-population"]];
  var capSchemaArr= av.ds.matrix(capSchema, {style: "table", top: schmaOffsitBottom+90, left: arrayLeft});
  capSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
  capSchemaArr._arrays[0].hide();
  
  arrayLeft+=arrayWidth+arrayGap;
  arrayLeft+=arrayWidth+arrayGap;
  
  var themMatrix2 =[["Cap-name","area","population"],["London","1572km^2","8.4million"],["Washington","184827km^2","681million"],["cairo","3085km^2","21million"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });

  var themMatrix2Copy =[["Cap-name","area","population"],["London","1572km^2","8.4million"],["Washington","184827km^2","681million"],["cairo","3085km^2","21million"]];
  var matrx2Copy= av.ds.matrix(themMatrix2Copy, {style: "table", top: arrayTop, left: arrayLeft-90 });
  for (var i=0; i < themMatrix2Copy.length; i++)
  {
  matrx2Copy._arrays[i].hide();
  } 

 
  // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  matrx2._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2,3,4], {"font-weight": "bold", "color": "black"});
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
  var mainline2X2=290+85;
  var mainline2Y2=mainline2Y1; 

  // main that represents the two tables' relations
  var line2 = av.g.line(mainline2X1,  mainline2Y1, mainline2X2,  mainline2Y2, {opacity: 100, "stroke-width": 2});
  //two vertical lines of the tables' relations
  //vertical line beside table capital
  var line5 = av.g.line( mainline2X1-20,  mainline2Y1-10, mainline2X1-20,  mainline2Y1+10, {opacity: 100, "stroke-width": 2});
  //vertical line beside table country
  var line6= av.g.line( mainline2X1-250,  mainline2Y1-10, mainline2X1-250,  mainline2Y1+10, {opacity: 100, "stroke-width": 2}); 
  var lab=av.label(interpret("<span style='color:red;'> Has </span>"), {left: ((mainline2X1-mainline2X2)+215), top: mainline2Y1- 50 });
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
  var conNo=0;
  var capNo=0;
  var cx=arrayLeft+48;
  var cy=arrayTop+(30*((conNo)+1));
  var cRadius=15;
  var x1=cx;
  var y1=arrayTop+(30*((conNo)+1));
  var x2=350+95;
  var y2=arrayTop+(30*((capNo)+1));
  var elRX=0;
  var elRy=0;

  var circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  var ellipse =av.g.ellipse(cx,cy ,elRX ,elRy, {stroke: "red","stroke-width": 2});
  ellipse.hide();
  var line1 = av.g.line(0,0, 0,  0, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  line1.hide();
  av.umsg(interpret("sc1").bold().big());

  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  av.displayInit(1);

  //slide 2
  line2.hide();
  //line3.hide();
  //line4.hide();
  line5.hide();
  line6.hide();
  lab.hide();
  av.umsg(interpret("sc2").bold().big());
  // hide all of the rows of matrix 2 and show all rows of matrix3 knowing that the two rows are of the same length
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx1._arrays[i].hide();
  matrx3._arrays[i].show();
  }  
  y1=arrayTop+(30*((conNo)+1));
  y2=arrayTop+(30*((capNo)+1));
  cy=arrayTop+(30*((conNo)+1));
  elRX=35;
  elRy=15;
  ellipse=av.g.ellipse(cx,cy ,elRX ,elRy, {stroke: "red","stroke-width": 2});
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  line1.show();
  av.step();

  // Slide 3
  av.umsg(interpret("sc3").bold().big());
  ellipse.hide();
  line1.hide();
  conNo=1;
  capNo=3;
  //NoEmpProB++;
  y1=arrayTop+(30*((capNo)+1));
  y2=arrayTop+(30*((conNo)+1));
  cy=arrayTop+(30*((capNo)+1));
  //circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  ellipse=av.g.ellipse(cx,cy ,elRX ,elRy, {stroke: "red","stroke-width": 2});
  ellipse.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  matrx3._arrays[conNo].highlight();
  matrx2._arrays[capNo].highlight(0);
  matrx2._arrays[capNo].highlight(1);
  //arr_values[arrFullProIndex] = capNo;
  //arrFullProIndex++;
  av.step();

  // Slide 4  
  av.umsg(interpret("sc3").bold().big());
  ellipse.show();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  line1.show();
  matrx3._arrays[conNo].value(4,"Cairo");
  av.step();
  
 
  //slide 5
  av.umsg(interpret("sc4").bold().big());
  matrx2._arrays[capNo].unhighlight(0);
  matrx2._arrays[capNo].unhighlight(1);
  matrx3._arrays[conNo].unhighlight();
  ellipse.hide();
  line1.hide();
  conNo=3;
  capNo=1;
  matrx2._arrays[capNo].highlight(0);
  matrx2._arrays[capNo].highlight(1);
  matrx3._arrays[conNo].highlight();

  y1=arrayTop+(30*((capNo)+1));
  y2=arrayTop+(30*((conNo)+1));
  cy=arrayTop+(30*((capNo)+1));
  ellipse=av.g.ellipse(cx,cy ,elRX ,elRy, {stroke: "red","stroke-width": 2});
  ellipse.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

  // Slide 6 
  av.umsg(interpret("sc4").bold().big());
  ellipse.show();
  line1.show();
  matrx3._arrays[conNo].value(4,"London");
  av.step();

  // Slide 7
  av.umsg(interpret("sc5").bold().big());
  matrx2._arrays[capNo].unhighlight(0);
  matrx2._arrays[capNo].unhighlight(1);
  matrx3._arrays[conNo].unhighlight();
  ellipse.hide();
  line1.hide();
  capNo=2;
  conNo=2;
  matrx2._arrays[capNo].highlight(0);
  matrx2._arrays[capNo].highlight(1);
  matrx3._arrays[conNo].highlight();
  y1=arrayTop+(30*((capNo)+1));
  y2=arrayTop+(30*((conNo)+1));
  cy=arrayTop+(30*((capNo)+1));
  ellipse=av.g.ellipse(cx,cy ,elRX ,elRy, {stroke: "red","stroke-width": 2});
  ellipse.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

  // Slide 8 
  av.umsg(interpret("sc5").bold().big());
 ellipse.show();
 line1.show();
 matrx3._arrays[conNo].value(4,"Washington");
 av.step();

 //slide 9
 av.umsg(interpret("Finally this is the logical ERD of the relation").bold().big());
 ellipse.hide();
 line1.hide();
 matrx2._arrays[capNo].unhighlight(0);
  matrx2._arrays[capNo].unhighlight(1);
  matrx3._arrays[conNo].unhighlight();
 /* for (var i=0; i < themMatrix2.length; i++)
  {
  matrx2._arrays[i].hide();
  matrx2Copy._arrays[i].show();
  }  */
  mainline2X2+=90;
  // main that represents the two tables' relations
  line2.movePoints([[0,mainline2X1,mainline2Y1 ], [1,mainline2X2 ,mainline2Y2]]);
  line2.show();
  //two vertical lines of the tables' relations
  //vertical line beside table capital
  line5.movePoints([[0,mainline2X1-10,mainline2Y1-10 ], [1,mainline2X1-10 ,mainline2Y1+10]]);
  line5.show();
  //vertical line beside table country
  line6.movePoints([[0,mainline2X1-170,mainline2Y1-10], [1,mainline2X1-170 ,mainline2Y1+10]]);
  line6.show(); 
  var lab2=av.label(interpret("<span style='color:red;'> Has </span>"), {left: ((mainline2X1-mainline2X2)+330), top: mainline2Y1- 50 });
  lab2.css({"font-weight": "bold", "font-size": 20});


av.step();

 //slide 10
 av.umsg(interpret("Here is the corresponding physical relational schema diagram where new column representing the relation is added to the country entity in the database schema").bold().big());
   ERDlab.show();
  SCHlab.show();
  conSchlab.show();
  capSchlab.show();
  conSchemaArr._arrays[0].show();
  capSchemaArr._arrays[0].show();
 av.recorded();



 /*// Slide 9
  av.umsg(interpret("sc7").bold().big());
  matrx2._arrays[capNo].unhighlight(0);
  matrx2._arrays[capNo].unhighlight(1);
  matrx3._arrays[conNo].unhighlight();
  circle.hide();
  line1.hide();
  capNo=3;
  conNo=2;
  matrx2._arrays[capNo].highlight(0);
  matrx2._arrays[capNo].highlight(1);
  matrx3._arrays[conNo].highlight();
  y1=arrayTop+(30*((capNo)+1));
  y2=arrayTop+(30*((conNo)+1));
  cy=arrayTop+(30*((capNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();
 
 // Slide 10
  av.umsg(interpret("sc7").bold().big());
  circle.show();
  line1.show();
  matrx3._arrays[conNo].value(3,"C");
  av.step();
 
//slide 11
  av.umsg(interpret("sc8").bold().big());
  matrx2._arrays[capNo].unhighlight(0);
  matrx2._arrays[capNo].unhighlight(1);
  matrx3._arrays[conNo].unhighlight();
  circle.hide();
  line1.hide();
  capNo=2;
  conNo=1;
  matrx2._arrays[capNo].highlight(0);
  matrx2._arrays[capNo].highlight(1);
  matrx3._arrays[conNo].highlight();
  y1=arrayTop+(30*((capNo)+1));
  y2=arrayTop+(30*((conNo)+1));
  cy=arrayTop+(30*((capNo)+1));
  circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
  circle.hide();
  line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

//slide 12
av.umsg(interpret("sc8").bold().big());
circle.show();
line1.show();
matrx3._arrays[conNo].value(3,"B");
  av.step();

//slide 13
av.umsg(interpret("sc9").bold().big());
matrx2._arrays[capNo].unhighlight(0);
matrx2._arrays[capNo].unhighlight(1);
matrx3._arrays[conNo].unhighlight();
circle.hide();
line1.hide();
capNo=1;
conNo=3;
matrx2._arrays[capNo].highlight(0);
matrx2._arrays[capNo].highlight(1);
matrx3._arrays[conNo].highlight();
y1=arrayTop+(30*((capNo)+1));
y2=arrayTop+(30*((conNo)+1));
cy=arrayTop+(30*((capNo)+1));
circle=av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
circle.hide();
line1.movePoints([[0, x1, y1], [1, x2, y2]]);
  av.step();

   //slide 14
   av.umsg(interpret("sc9").bold().big());
   circle.show();
   line1.show();
   matrx3._arrays[conNo].value(3,"A");
   av.step();

   //slide 15
   av.umsg(interpret("Finally this is the logical ERD of the relation").bold().big());
   matrx2._arrays[capNo].unhighlight(0);
   matrx2._arrays[capNo].unhighlight(1);
   matrx3._arrays[conNo].unhighlight();
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
  //line3.movePoints([[0,mainline2X1-20 ,mainline2Y1 ], [1,mainline2X1 ,mainline2Y1-10]]);
  //line3.show();
  //line4.movePoints([[0,mainline2X1-20 ,mainline2Y1 ], [1,mainline2X1 ,mainline2Y1+10]]);
  //line4.show();
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
  conSchlab.show();
  capSchlab.show();
  conSchemaArr._arrays[0].show();
  capSchemaArr._arrays[0].show();
  av.recorded();*/

});
