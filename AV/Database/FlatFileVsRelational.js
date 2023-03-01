/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "FlatFileVsRelational";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

 // var theArray1 = ["", "", "", ""];
 // var theArray2 = ["", "", "", ""];
 // var theArray3 = ["", "", "", ""];
  
  var av = new JSAV(av_name);

   //vertical array min.width=80 in insertionsortCON.css

  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=200;
  var arrayTop=0;

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
  var themMatrix1 = [["emp-id","emp-name"," emp-salary", "Dep-name", "Dep-Boss", "Dep-phone"],[201,"ali","2000", "sales", "john", "291684"],[101,"adel","3000", "sales", "john", "291684"],[202,"mona","2500", "sales", "john", "291684"],[403,"layla","2300","Transport", "Hala", "291800"],[507,"Ahmed","4200","Transport", "Hala", "291800"],[309,"Alia","3200","HR", "walid", "291760"],[508,"Rokaya","4000","HR", "walid", "291760"],[709,"Hanya","2500","HR", "walid", "291760"]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });
 
  //arrayLeft+=arrayWidth+arrayGap+75;
  var themMatrix2 =[["emp-id","emp-name"," emp-salary", "Dep-name"],[201,"ali","2000", "sales"],[101,"adel","3000", "sales"],[202,"mona","2500", "sales"],[403,"layla","2300","Transport"],[507,"Ahmed","4200","Transport"],[309,"Alia","3200","HR"],[508,"Rokaya","4000","HR"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: 50, left: arrayLeft });
  
  arrayLeft+=arrayWidth+arrayGap+100;
  var themMatrix3 =[["Dep-name", "Dep-Boss", "Dep-phone"],["sales", "john", "291684"],["Transport", "Hala", "291800"],["HR", "walid", "291760"]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: 50, left: arrayLeft });
 
 // to make first row of attributes names in each table in bold
  matrx1._arrays[0].css([0,1,2,3,4,5], {"font-weight": "bold", "color": "black"});
  matrx2._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  matrx3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

// to underline primary keys in all tables
//matrx1._arrays[0].css([0], {"text-decoration": "underline"});
matrx2._arrays[0].css([0], {"text-decoration": "underline"});
matrx3._arrays[0].css([0], {"text-decoration": "underline"});

//pointer arrpws (lines) defined here used in the last slides
var line1 = av.g.line(120, 200, 460, 235, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
var line2 = av.g.line(775, 170,635, 235, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
var line3 = av.g.line(333,  arrayTop,  333,  arrayTop+300  ,{opacity: 100, stroke: "red","stroke-width": 4});
var line6 = av.g.line(580, 200, 700, 100, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
var line7 = av.g.line(580, 200, 700, 300, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
line1.hide();
line2.hide();
line3.hide();
line6.hide();
line7.hide();

  // hide all of the empty rows
  for (var i=0; i < themMatrix2.length; i++)
  {
  matrx2._arrays[i].hide();
  }
  for (var i=0; i < themMatrix3.length; i++)
  {
  matrx3._arrays[i].hide();
  }

  // Slide 1
  av.umsg(interpret("sc1").bold().big());
  
  av.displayInit(1);
  
  //av.g.path('M '+ 55 + ',' + 145 + ' Q' + 300 + ','+ 480 + ' ' + 495 + ',' + 145, {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.step();

 

  // Slide 3
  av.umsg(interpret("sc3").bold().big());
 // var pointer1 = av.pointer("<span style='color:red;'> Warning: </span> Flat file design has a lot of problems as shown in file here <span style='color:red;'> ***** Problems are due to: *****</span> 1- merging all data in the same file 2- file is not physically divided into rows & colums it is just a logical representation", matrx1._arrays[5].index(5), {left: 110, top:-30 });
//pointer1.hide();
 matrx1._arrays[2].highlight(3); 
  matrx1._arrays[2].highlight(4);
  matrx1._arrays[2].highlight(5);
  matrx1._arrays[3].highlight(3); 
  matrx1._arrays[3].highlight(4);
  matrx1._arrays[3].highlight(5);
  matrx1._arrays[5].highlight(3); 
  matrx1._arrays[5].highlight(4);
  matrx1._arrays[5].highlight(5);
  matrx1._arrays[7].highlight(3); 
  matrx1._arrays[7].highlight(4);
  matrx1._arrays[7].highlight(5);
  matrx1._arrays[8].highlight(3); 
  matrx1._arrays[8].highlight(4);
  matrx1._arrays[8].highlight(5);
 var pointer2 = av.pointer(" ", matrx1._arrays[2].index(5), {left: 160, top:90 });
 var pointer3 = av.pointer(" ", matrx1._arrays[3].index(5), {left: 160, top:60 });
 var pointer4 = av.pointer('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+"<span style='color:red;'> Redundant data </span> ", matrx1._arrays[5].index(5), {left: 125, top:0 });
 var pointer5 = av.pointer(" ", matrx1._arrays[7].index(5), {left: 160, top:-60 });
 var pointer6 = av.pointer(" ", matrx1._arrays[8].index(5), {left: 160, top:-90 });
 //av.pointer("No. of employess workinf at sales department=3", matrx1._arrays[3].index(5), {left: 70, top:0 });
 
 av.step();

   // slide 4
  av.umsg(interpret("sc4").bold().big());
  pointer2.hide();
  pointer3.hide();
  pointer4.hide();
  pointer5.hide();
  pointer6.hide();
 var E1= av.g.ellipse(470,105 ,150 , 30, {stroke: "red","stroke-width": 2});
 var E2=av.g.ellipse(470,180 ,150 , 15, {stroke: "red","stroke-width": 2});
 var E3= av.g.ellipse(470,255 ,150 , 30, {stroke: "red","stroke-width": 2});
 var pointer7 = av.pointer("<span style='color:red;'> As sales Department has 3 employees </span>"+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ " <span style='color:blue;'> $then$ $sales$ $depatment$ $details$ $repeated$ $3$ $times$ </span>"+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ " <span style='color:green;'> $one$ $time$ $for$ $each$ $employee$ </span> "+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+"<span style='color:blue;'> Dis-advantage 1:</span>"+"<span style='color:red;'> $Redundancy$ $problem$ $=$ $wasting$ $memory$ </span>", matrx1._arrays[2].index(5), {left: 100, top:0 });
  av.step();

 // slide 5
 //av.umsg(interpret("sc6").bold().big());
 //pointer7.hide();
 //var pointer8 = av.pointer("<span style='color:red;'> $Redundancy$ $problem$ $=$ $wasting$ $memory$  </span>",matrx1._arrays[2].index(5), {left: 100, top:0 });
 //av.step();

// slide 6
av.umsg(interpret("sc5").bold().big());
pointer7.hide();
  matrx1._arrays[2].unhighlight(3); 
  matrx1._arrays[2].unhighlight(4);
  matrx1._arrays[2].unhighlight(5);
  matrx1._arrays[3].unhighlight(3); 
  matrx1._arrays[3].unhighlight(4);
  matrx1._arrays[3].unhighlight(5);
  matrx1._arrays[5].unhighlight(3); 
  matrx1._arrays[5].unhighlight(4);
  matrx1._arrays[5].unhighlight(5);
  matrx1._arrays[7].unhighlight(3); 
  matrx1._arrays[7].unhighlight(4);
  matrx1._arrays[7].unhighlight(5);
  matrx1._arrays[8].unhighlight(3); 
  matrx1._arrays[8].unhighlight(4);
  matrx1._arrays[8].unhighlight(5);
  E1.hide();
  E2.hide();
  E3.hide();
  //var pointer9 = av.pointer("<span style='color:red;'> $Redundancy$ $problem$ $=$ $wasting$ $memory$  </span>",matrx1._arrays[2].index(5), {left: 100, top:0 });
av.step();

// slide 7
av.umsg(interpret("searching for specific employee will be difficult as all file data should be parsed into words and compared to the search name till we reach that employee to get his data (i.e., we cann't search only names)").bold().big());
av.step();
// slide 8
av.umsg(interpret("sc12").bold().big());
var E4= av.g.ellipse(195,210 ,45 , 15, {stroke: "red","stroke-width": 2});
av.step();

// slide 9
av.umsg(interpret("the program should read the first word & then compare it with search key word <span style='color:red;'> If </span> $201==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[1].highlight(0);
av.step();

// slide 10
av.umsg(interpret("<span style='color:red;'> If </span> $ali==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[1].unhighlight(0);
matrx1._arrays[1].highlight(1);
av.step();

// slide 11
av.umsg(interpret("<span style='color:red;'> If </span> $2000==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[1].unhighlight(1);
matrx1._arrays[1].highlight(2);
av.step();
// slide 12
av.umsg(interpret("<span style='color:red;'> If </span> $sales==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[1].unhighlight(2);
matrx1._arrays[1].highlight(3);
av.step();
// slide 13
av.umsg(interpret("<span style='color:red;'> If </span> $john==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[1].unhighlight(3);
matrx1._arrays[1].highlight(4);
av.step();
// slide 14
av.umsg(interpret("<span style='color:red;'> If </span> $291684==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[1].unhighlight(4);
matrx1._arrays[1].highlight(5);
av.step();

// slide 15
av.umsg(interpret("<span style='color:red;'> If </span> $101==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[1].unhighlight(5);
matrx1._arrays[2].highlight(0);
av.step();

// slide 16
av.umsg(interpret("<span style='color:red;'> If </span> $adel==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[2].unhighlight(0);
matrx1._arrays[2].highlight(1);
av.step();

// slide 17
av.umsg(interpret("<span style='color:red;'> If </span> $3000==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[2].unhighlight(1);
matrx1._arrays[2].highlight(2);
av.step();

// slide 18
av.umsg(interpret("<span style='color:red;'> If </span> $sales==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[2].unhighlight(2);
matrx1._arrays[2].highlight(3);
av.step();

// slide 19
av.umsg(interpret("<span style='color:red;'> If </span> $john==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[2].unhighlight(3);
matrx1._arrays[2].highlight(4);
av.step();

// slide 20
av.umsg(interpret("<span style='color:red;'> If </span> $291684==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[2].unhighlight(4);
matrx1._arrays[2].highlight(5);
av.step();
  
// slide 21
av.umsg(interpret("<span style='color:red;'> If </span> $202==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[2].unhighlight(5);
matrx1._arrays[3].highlight(0);
av.step();
// slide 22
av.umsg(interpret("<span style='color:red;'> If </span> $mona==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[3].unhighlight(0);
matrx1._arrays[3].highlight(1);
av.step();
// slide 23
av.umsg(interpret("<span style='color:red;'> If </span> $2500==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[3].unhighlight(1);
matrx1._arrays[3].highlight(2);
av.step();
// slide 24
av.umsg(interpret("<span style='color:red;'> If </span> $sales==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[3].unhighlight(2);
matrx1._arrays[3].highlight(3);
av.step();
// slide 25
av.umsg(interpret("<span style='color:red;'> If </span> $john==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[3].unhighlight(3);
matrx1._arrays[3].highlight(4);
av.step();
// slide 26
av.umsg(interpret("<span style='color:red;'> If </span> $291684==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[3].unhighlight(4);
matrx1._arrays[3].highlight(5);
av.step();

// slide 27
av.umsg(interpret("<span style='color:red;'> If </span> $403==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[3].unhighlight(5);
matrx1._arrays[4].highlight(0);
av.step();
// slide 28
av.umsg(interpret("<span style='color:red;'> If </span> $layla==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[4].unhighlight(0);
matrx1._arrays[4].highlight(1);
av.step();
// slide 29
av.umsg(interpret("<span style='color:red;'> If </span> $2300==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[4].unhighlight(1);
matrx1._arrays[4].highlight(2);
av.step();
// slide 30
av.umsg(interpret("<span style='color:red;'> If </span> $Transport==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[4].unhighlight(2);
matrx1._arrays[4].highlight(3);
av.step();
// slide 31
av.umsg(interpret("<span style='color:red;'> If </span> $Hala==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[4].unhighlight(3);
matrx1._arrays[4].highlight(4);
av.step();
// slide 32
av.umsg(interpret("<span style='color:red;'> If </span> $291800==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[4].unhighlight(4);
matrx1._arrays[4].highlight(5);
av.step();

// slide 33
av.umsg(interpret("<span style='color:red;'> If </span> $507==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[4].unhighlight(5);
matrx1._arrays[5].highlight(0);
av.step();
// slide 34
av.umsg(interpret("<span style='color:red;'> If </span> $Ahmed==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[5].unhighlight(0);
matrx1._arrays[5].highlight(1);
av.step();
// slide 35
av.umsg(interpret("<span style='color:red;'> If </span> $4200==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[5].unhighlight(1);
matrx1._arrays[5].highlight(2);
av.step();
// slide 36
av.umsg(interpret("<span style='color:red;'> If </span> $transport==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[5].unhighlight(2);
matrx1._arrays[5].highlight(3);
av.step();
// slide 37
av.umsg(interpret("<span style='color:red;'> If </span> $Hala==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[5].unhighlight(3);
matrx1._arrays[5].highlight(4);
av.step();
// slide 38
av.umsg(interpret("<span style='color:red;'> If </span> $291800==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[5].unhighlight(4);
matrx1._arrays[5].highlight(5);
av.step();

// slide 39
av.umsg(interpret("<span style='color:red;'> If </span> $309==Alia$ <span style='color:red;'>  NO </span> <span style='color:blue;'> it will continue</span>").bold().big());
matrx1._arrays[5].unhighlight(5);
matrx1._arrays[6].highlight(0);
av.step();

// slide 40
av.umsg(interpret("<span style='color:red;'> If </span> $Alia==Alia$ <span style='color:red;'> YES </span> <span style='color:blue;'> Finally alia is founded after searching every word in the Flat file </span>").bold().big());
matrx1._arrays[6].unhighlight(0);
matrx1._arrays[6].highlight(1);
pointer7.hide();
var pointer9 = av.pointer("<span style='color:blue;'> Dis-advantage 2:</span>"+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "<span style='color:red;'> $Flat$ $Data$ $files$ $=$ $hard$ $search$ $process$ $=$ $wasting$ $time$ </span> ",matrx1._arrays[6].index(1), {left: 500, top:0 });
av.step();

// slide 41
//av.umsg(interpret("sc8").bold().big());

//av.step();

 // Slide 2
 av.umsg(interpret("sc2").bold().big());
 Matrix1ArrayNo=1;
 //Matrix3ArrayNO=3;
 //matrx1.value();
 pointer9.hide();
 
 var pointer1 = av.pointer("<span style='color:red;'> ****** Problems are due to: ******</span>" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ " 1- Merging all (employee & department) data in the same falt file"+ '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ " 2- File is not physically divided into rows & colums it is just a logical representation", matrx1._arrays[3].index(5), {left: 110, top:-30 });
 //many different alternatives to write special charcters
 /*var stringMsg=`string text line 1
// string text line 2`;
 var stringMsg="string text line 1 \
 string text line 2";
 var greeting = "Yo " + 
  "World";
 var pointer1 = av.pointer(greeting, matrx1._arrays[3].index(5), {left: 110, top:-30 });
 var pointer1 = av.pointer(stringMsg, matrx1._arrays[3].index(5), {left: 110, top:-30 });*/
 
 av.step();

// slide 42
av.umsg(interpret("sc7").bold().big());
//pointer1.hide();
//pointer9.hide();
pointer1.hide();
E4.hide();
matrx1._arrays[6].unhighlight(1);
 line3.show();
 av.step();

 // slide 43
av.umsg(interpret("sc9").bold().big());
matrx1.hide();
line3.hide();
 // show all matrix rows
 for (var i=0; i < themMatrix2.length; i++)
 {
 matrx2._arrays[i].show();
 }
 for (var i=0; i < themMatrix3.length; i++)
 {
 matrx3._arrays[i].show();
 }
 var pointer10 = av.pointer('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+ "<span style='color:red;'> Table represents employees </span>",matrx2._arrays[4].index(3), {left: 100, top:50 });
var pointer11 = av.pointer("'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+<span style='color:red;'> Table represents departments </span>",matrx3._arrays[3].index(2), {left: 100, top:50 });
var pointer12 = av.pointer("<span style='color:red;'> Dep-name </span> is the common attribute joining the two tables  ",matrx2._arrays[0].index(3), {left: 5, top:-10 });
var pointer13 = av.pointer(" ",matrx3._arrays[0].index(0), {left: 30, top:-10 });
matrx2._arrays[0].index(3).highlight();
matrx3._arrays[0].index(0).highlight();
av.step();

// slide 44
//av.umsg(interpret("sc10").bold().big());

//av.step();

//slide 45
av.umsg(interpret("sc11").bold().big());
for (var i=0; i < themMatrix2.length; i++)
 {
 matrx2._arrays[i].hide();
 }
 for (var i=0; i < themMatrix3.length; i++)
 {
 matrx3._arrays[i].hide();
 }
 pointer10.hide();
 pointer11.hide();
 pointer12.hide();
 pointer13.hide();
 
var m1=av.ds.matrix(themMatrix1, {style: "table", top: 50, left: 30 });
var m2=av.ds.matrix(themMatrix2, {style: "table", top: -15, left: 700 });
var m3=av.ds.matrix(themMatrix3, {style: "table", top: 250, left: 700 });
// to make first row of attributes names in each table in bold
m1._arrays[0].css([0,1,2,3,4,5], {"font-weight": "bold", "color": "black"});
m2._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
m3._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});

// to underline primary keys in all tables

m2._arrays[0].css([0], {"text-decoration": "underline"});
m3._arrays[0].css([0], {"text-decoration": "underline"});
line6.show();
line7.show();

av.recorded();
 


/*// Slide 42
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
