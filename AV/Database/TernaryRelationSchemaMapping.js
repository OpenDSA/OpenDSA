/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationSchemaMapping";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter; 
  var av = new JSAV(av_name);
  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=250;
  var arrayTop=100;

  
  arrayLeft+=arrayWidth+arrayGap;
  arrayLeft+=arrayWidth+arrayGap;

var line1 = av.g.line(arrayLeft-90-45,  arrayTop-90+20,  arrayLeft-290+110,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
var line2 = av.g.line(arrayLeft-90+45,  arrayTop-90+20,  arrayLeft,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
var line3 = av.g.line(arrayLeft-90,  arrayTop-70+25,  arrayLeft-90,  arrayTop-20,{opacity: 100, "stroke-width": 2});
var line4 = av.g.line(arrayLeft-300,  arrayTop+70,  arrayLeft-150,  arrayTop+70,{opacity: 100,"arrow-end":"classic-wide-long","stroke-width": 2});

  line1.hide();
  line2.hide();
  line3.hide();
  line4.hide();

  // Slide 1
  av.umsg(interpret("<span style='color:red;'>Mapping Ternary Relationship To Physical Relational Schema</span>").bold().big());
  av.displayInit(1);
  av.step();

//slide 2
av.umsg(interpret("<span style='color:red;'>Ternary Relationship Cardinalities</span>").bold().big());

var TCardLab1=av.label("<span style='color:darkblue;'>* Many TO many TO many</span> =<span style='color:red;'> N:M:P</span>", {left: arrayLeft-750, top: arrayTop-120 });
TCardLab1.css({"font-weight": "bold", "font-size": 18});  

   var Card1Rect1=av.g.rect(arrayLeft-290, arrayTop-90, 110, 30, {"stroke-width": 3});
   var Card1Rect1Lab=av.label("<span style='color:blue;'>Doctor</span>", {left:arrayLeft-270, top: arrayTop-105});
   Card1Rect1Lab.css({"font-weight": "bold", "font-size": 16});
   var Card1Rect2=av.g.rect(arrayLeft, arrayTop-90, 110, 30, {"stroke-width": 3});
   var Card1Rect2Lab=av.label("<span style='color:blue;'>Patient</span>", {left:arrayLeft+20, top: arrayTop-105});
   Card1Rect2Lab.css({"font-weight": "bold", "font-size": 16});
   var Card1Rect3=av.g.rect(arrayLeft-140, arrayTop-20, 110, 30, {"stroke-width": 3});
   var Card1Rect3Lab=av.label("<span style='color:blue;'>Medicine</span>", {left:arrayLeft-120, top: arrayTop-35});
   Card1Rect3Lab.css({"font-weight": "bold", "font-size": 16});
   var polygonCard1 = av.g.polyline([[arrayLeft-90, arrayTop-70-25],
    [arrayLeft-90+45, arrayTop-70],
    [arrayLeft-90, arrayTop-70+25],
    [arrayLeft-90-45, arrayTop-70],
    [arrayLeft-90, arrayTop-70-25]],
   {"stroke-width": 3, stroke: "black"});
   var polygonCard1Lab=av.label("<span style='color:blue;'>treat</span>", {left:arrayLeft-107, top: arrayTop-70-25});
  //left horizontal line
   //var line1 = av.g.line(arrayLeft-90-45,  arrayTop-90+20,  arrayLeft-290+110,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
   line1.show();
   var Line1Lab=av.label("<span style='color:red;'>N</span>", {left:arrayLeft-295+120, top:  arrayTop-123+20});
   Line1Lab.css({"font-weight": "bold", "font-size": 14});
   //right horizontal line
  // var line2 = av.g.line(arrayLeft-90+45,  arrayTop-90+20,  arrayLeft,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
  line2.show();
   var Line2Lab=av.label("<span style='color:red;'>M</span>", {left:arrayLeft-17, top:  arrayTop-123+20});
   Line2Lab.css({"font-weight": "bold", "font-size": 14});
   //vertical line line  
  // var line3 = av.g.line(arrayLeft-90,  arrayTop-70+25,  arrayLeft-90,  arrayTop-20,{opacity: 100, "stroke-width": 2});
  line3.show();
   var Line3Lab=av.label("<span style='color:red;'>P</span>", {left:arrayLeft-85, top:  arrayTop-50});
   Line3Lab.css({"font-weight": "bold", "font-size": 14});
   var TCard1Lab1=av.label("<span style='color:darkred;'>How to read this relation:</span>", {left: arrayLeft-730, top: arrayTop-80 });
   TCard1Lab1.css({"font-weight": "bold", "font-size": 16}); 
  
   av.step();

  //slide 3

   var TCard1Lab9=av.label("<span style='color:green;'>Bridge Example Table:", {left: arrayLeft-140, top: arrayTop+80});
   TCard1Lab9.css({"font-weight": "bold", "font-size": 18});
   var TCard1Lab10=av.label("Bridge", {left: arrayLeft-140, top: arrayTop+130});
   TCard1Lab10.css({"font-weight": "bold", "font-size": 15});
   var ExampleMatrix1 = [["Dr.ali","mona","brufin"],["Dr.ali","mona","c-vit"],["Dr.Rasha","mona","brufin"],["Dr.ali","Kahled","c-vit"],["Dr.ali","dina","c-vit"]];
   var Exmatrx1= av.ds.matrix(ExampleMatrix1, {style: "table", top: arrayTop+150, left: arrayLeft-140 });
   for(i=0;i<ExampleMatrix1.length;i++)
   Exmatrx1._arrays[i].hide(); 
   var TCard1Lab2=av.label("<span style='color:darkred;'>- a given doctor can treats a given patient with many different medicines.</span>", {left: arrayLeft-730, top: arrayTop-50 });
   TCard1Lab2.css({"font-weight": "bold", "font-size": 16});
   Card1Rect1.css({stroke: "red", "stroke-width":4});
   Card1Rect2.css({stroke: "red", "stroke-width":4});
   line3.css({stroke: "red", "stroke-width":4});
   Exmatrx1._arrays[0].show();
   Exmatrx1._arrays[1].show();
   Exmatrx1._arrays[0].highlight(0);
   Exmatrx1._arrays[1].highlight(0);
   Exmatrx1._arrays[0].highlight(1);
   Exmatrx1._arrays[1].highlight(1);
   Exmatrx1._arrays[1].value(2,"<span style='color:blue;'>c-vit</span>");
   Exmatrx1._arrays[0].value(2,"<span style='color:red;'>brufin</span>");
   av.step();

   //slide 4
   Card1Rect1.css({stroke: "black", "stroke-width":3});
   Card1Rect3.css({stroke: "red", "stroke-width":4});
   Exmatrx1._arrays[1].value(2,"<span style='color:black;'>c-vit</span>");
   Exmatrx1._arrays[0].value(2,"<span style='color:black;'>brufin</span>");
   line3.css({stroke: "black", "stroke-width":2});
   line1.css({stroke: "red", "stroke-width":4});
   var TCard1Lab3=av.label("<span style='color:darkred;'>- a given medicine can be written to  a given patient by many doctors.</span>", {left: arrayLeft-730, top: arrayTop-30 });
   TCard1Lab3.css({"font-weight": "bold", "font-size": 16});
   Exmatrx1._arrays[2].show();
   Exmatrx1._arrays[1].unhighlight(0);
   Exmatrx1._arrays[1].unhighlight(1);
   Exmatrx1._arrays[2].highlight(1);
   Exmatrx1._arrays[2].highlight(2);
   Exmatrx1._arrays[0].unhighlight(0);
   Exmatrx1._arrays[0].highlight(2);
   Exmatrx1._arrays[0].value(0,"<span style='color:red;'>Dr.ali</span>");
   Exmatrx1._arrays[2].value(0,"<span style='color:blue;'>Dr.Rasha</span>");
   av.step();

   //slide 5
   Card1Rect2.css({stroke: "black", "stroke-width":3});
   Card1Rect1.css({stroke: "red", "stroke-width":4});
   line1.css({stroke: "black", "stroke-width":2});
   line2.css({stroke: "red", "stroke-width":4});
   Exmatrx1._arrays[0].value(0,"<span style='color:black;'>Dr.ali</span>");
   Exmatrx1._arrays[2].value(0,"<span style='color:black;'>Dr.Rasha</span>");
   var TCard1Lab4=av.label("<span style='color:darkred;'>- a given doctor can describe the same medicine for many patients.</span>", {left: arrayLeft-730, top: arrayTop-10 });
   TCard1Lab4.css({"font-weight": "bold", "font-size": 16});
   Exmatrx1._arrays[0].unhighlight(1);
   Exmatrx1._arrays[0].unhighlight(2);
   Exmatrx1._arrays[2].unhighlight(1);
   Exmatrx1._arrays[2].unhighlight(2);

   Exmatrx1._arrays[3].show();
   Exmatrx1._arrays[4].show();
   Exmatrx1._arrays[3].highlight(0);
   Exmatrx1._arrays[4].highlight(0);
   Exmatrx1._arrays[3].highlight(2);
   Exmatrx1._arrays[4].highlight(2);
   Exmatrx1._arrays[1].highlight(0);
   Exmatrx1._arrays[1].highlight(2);
   Exmatrx1._arrays[1].value(1,"<span style='color:red;'>mona</span>");
   Exmatrx1._arrays[3].value(1,"<span style='color:blue;'>Khaled</span>");
   Exmatrx1._arrays[4].value(1,"<span style='color:green;'>dina</span>");
   av.step();

   //slide 6
   Card1Rect1.css({stroke: "black", "stroke-width":3});
   Card1Rect3.css({stroke: "black", "stroke-width":3});
   line2.css({stroke: "black", "stroke-width":2});
   Exmatrx1._arrays[1].value(1,"<span style='color:black;'>mona</span>");
   Exmatrx1._arrays[3].value(1,"<span style='color:black;'>Khaled</span>");
   Exmatrx1._arrays[4].value(1,"<span style='color:black;'>dina</span>");
   var TCard1Lab5=av.label("<span style='color:darkred;'>BUT:</span> <span style='color:darkblue;'>the same doctor treates the same patient with the same medicine <u>only once</u></span>", {left: arrayLeft-730, top: arrayTop+20 });
   TCard1Lab5.css({"font-weight": "bold", "font-size": 16});
   var TCard1Lab6=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>DID+PID+MID</u> are all composite primary key <u>(PK)</u></span>", {left: arrayLeft-730, top: arrayTop+40 });
   TCard1Lab6.css({"font-weight": "bold", "font-size": 16});
   //var line4 = av.g.line(arrayLeft-300,  arrayTop+70,  arrayLeft-150,  arrayTop+70,{opacity: 100,"arrow-end":"classic-wide-long","stroke-width": 2});
   line4.show();
   var TCard1Lab7=av.label("<span style='color:darkgreen;'><i>Their occurence never repeated.</i></span>", {left: arrayLeft-140, top: arrayTop+40 });
   TCard1Lab7.css({"font-weight": "bold", "font-size": 16});
   Exmatrx1._arrays[3].unhighlight();
   Exmatrx1._arrays[4].unhighlight();
   Exmatrx1._arrays[1].unhighlight();
   av.step();

   //slide 7
   var TCard1Lab8=av.label("<span style='color:green;'>The corresponding physical relational schema:", {left: arrayLeft-750, top: arrayTop+80});
   TCard1Lab8.css({"font-weight": "bold", "font-size": 18});
   var DocSchlab=av.label(interpret("Doctor"), {left: arrayLeft-730, top: arrayTop+105 });
   DocSchlab.css({"font-weight": "bold", "font-size": 15});
   var DocSchema = [["DID (PK)","D-att1","D-att2"]];
   var DocSchemaArr= av.ds.matrix(DocSchema, {style: "table", top: arrayTop+125, left: arrayLeft-730});
   DocSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
   var PatSchlab=av.label(interpret("Patient"), {left: arrayLeft-730, top: arrayTop+160 });
   PatSchlab.css({"font-weight": "bold", "font-size": 15});
   var PatSchema = [["PID (PK)","P-att1","P-att2"]];
   var PatSchemaArr= av.ds.matrix(PatSchema, {style: "table", top: arrayTop+180, left: arrayLeft-730});
   PatSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
   var MedSchlab=av.label(interpret("Medicine"), {left: arrayLeft-730, top: arrayTop+220 });
   MedSchlab.css({"font-weight": "bold", "font-size": 15});
   var MedSchema = [["MID (PK)","M-att1","M-att2"]];
   var MedSchemaArr= av.ds.matrix(MedSchema, {style: "table", top: arrayTop+240, left: arrayLeft-730});
   MedSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
   var BrdgSchlab=av.label(interpret("Bridge"), {left: arrayLeft-730, top: arrayTop+275 });
   BrdgSchlab.css({"font-weight": "bold", "font-size": 15});
   var BridgeSchema = [["MID","DID","PID"]];
   var BridgeSchemaArr= av.ds.matrix(BridgeSchema, {style: "table", top: arrayTop+300, left: arrayLeft-730});
   BridgeSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
   BridgeSchemaArr._arrays[0].css([1], {"text-decoration": "underline"});
   BridgeSchemaArr._arrays[0].css([2], {"text-decoration": "underline"});
   av.step();

   //slide 8
   Line1Lab.hide();
   Line2Lab.hide();
   Line3Lab.hide();
   line4.hide();
   TCardLab1.hide();
   Card1Rect1.hide();
   Card1Rect1Lab.hide();
   Card1Rect2.hide();
   Card1Rect2Lab.hide();
   Card1Rect3.hide();
   Card1Rect3Lab.hide();
   polygonCard1.hide();
   polygonCard1Lab.hide();
   for(i=0;i<ExampleMatrix1.length;i++)
   Exmatrx1._arrays[i].hide();
TCard1Lab2.hide()
TCard1Lab3.hide()
TCard1Lab4.hide()
TCard1Lab5.hide()
TCard1Lab6.hide()
TCard1Lab7.hide()
TCard1Lab8.hide()
TCard1Lab9.hide()
TCard1Lab10.hide()
DocSchlab.hide()
DocSchemaArr._arrays[0].hide()
PatSchlab.hide()
 PatSchemaArr._arrays[0].hide()
MedSchlab.hide()
MedSchemaArr._arrays[0].hide()
BrdgSchlab.hide()
BridgeSchemaArr._arrays[0].hide()

   var TCardLab2=av.label("<span style='color:darkblue;'>* One TO many TO many</span> =<span style='color:red;'> 1:N:M</span>", {left: arrayLeft-750, top: arrayTop-120 });
  TCardLab2.css({"font-weight": "bold", "font-size": 18});  

   var Card2Rect1=av.g.rect(arrayLeft-290, arrayTop-90, 110, 30, {"stroke-width": 3});
   var Card2Rect1Lab=av.label("<span style='color:blue;'>Student</span>", {left:arrayLeft-270, top: arrayTop-105});
   Card2Rect1Lab.css({"font-weight": "bold", "font-size": 16});
   var Card2Rect2=av.g.rect(arrayLeft, arrayTop-90, 110, 30, {"stroke-width": 3});
   var Card2Rect2Lab=av.label("<span style='color:blue;'>Course</span>", {left:arrayLeft+20, top: arrayTop-105});
   Card2Rect2Lab.css({"font-weight": "bold", "font-size": 16});
   var Card2Rect3=av.g.rect(arrayLeft-140, arrayTop-20, 110, 30, {"stroke-width": 3});
   var Card2Rect3Lab=av.label("<span style='color:blue;'>Instructor</span>", {left:arrayLeft-120, top: arrayTop-35});
   Card2Rect3Lab.css({"font-weight": "bold", "font-size": 16});
   var polygonCard2 = av.g.polyline([[arrayLeft-90, arrayTop-70-25],
    [arrayLeft-90+45, arrayTop-70],
    [arrayLeft-90, arrayTop-70+25],
    [arrayLeft-90-45, arrayTop-70],
    [arrayLeft-90, arrayTop-70-25]],
   {"stroke-width": 3, stroke: "black"});
   var polygonCard2Lab=av.label("<span style='color:blue;'>teach</span>", {left:arrayLeft-107, top: arrayTop-70-25});
  //left horizontal line
   //var line1 = av.g.line(arrayLeft-90-45,  arrayTop-90+20,  arrayLeft-290+110,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
   line1.show();
   var Line1Lab=av.label("<span style='color:red;'>N</span>", {left:arrayLeft-295+120, top:  arrayTop-123+20});
   Line1Lab.css({"font-weight": "bold", "font-size": 14});
   //right horizontal line
  // var line2 = av.g.line(arrayLeft-90+45,  arrayTop-90+20,  arrayLeft,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
  line2.show();
   var Line2Lab=av.label("<span style='color:red;'>M</span>", {left:arrayLeft-17, top:  arrayTop-123+20});
   Line2Lab.css({"font-weight": "bold", "font-size": 14});
   //vertical line line  
  // var line3 = av.g.line(arrayLeft-90,  arrayTop-70+25,  arrayLeft-90,  arrayTop-20,{opacity: 100, "stroke-width": 2});
  line3.show();
   var Line3Lab=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-85, top:  arrayTop-50});
   Line3Lab.css({"font-weight": "bold", "font-size": 14});
   var TCard1Lab1=av.label("<span style='color:darkred;'>How to read this relation:</span>", {left: arrayLeft-730, top: arrayTop-80 });
   TCard1Lab1.css({"font-weight": "bold", "font-size": 16});
  
   av.step();

   //slide 9

   var TCard2Lab9=av.label("<span style='color:green;'>Bridge Example Table:", {left: arrayLeft-140, top: arrayTop+100});
   TCard2Lab9.css({"font-weight": "bold", "font-size": 18});
   var TCard2Lab10=av.label("Bridge", {left: arrayLeft-140, top: arrayTop+130});
   TCard2Lab10.css({"font-weight": "bold", "font-size": 15});
   var ExampleMatrix2 = [["Dr.ali","C++","morad"],["Dr.ali","C++","dina"],["Dr.ali","C++","jody"],["Dr.ali","java","jody"],["Dr.kareem","java","dina"]];
   var Exmatrx2= av.ds.matrix(ExampleMatrix2, {style: "table", top: arrayTop+150, left: arrayLeft-140 });
   for(i=0;i<ExampleMatrix2.length;i++)
   Exmatrx2._arrays[i].hide(); 
   var TCard2Lab2=av.label("<span style='color:darkred;'>- A given instructor can teach a given course for multiple students.</span>", {left: arrayLeft-730, top: arrayTop-50 });
   TCard2Lab2.css({"font-weight": "bold", "font-size": 16});
   Card2Rect2.css({stroke: "red", "stroke-width":4});
   Card2Rect3.css({stroke: "red", "stroke-width":4});
   line1.css({stroke: "red", "stroke-width":4});
   Exmatrx2._arrays[0].show();
   Exmatrx2._arrays[1].show();
   Exmatrx2._arrays[2].show();
   Exmatrx2._arrays[0].highlight(0);
   Exmatrx2._arrays[0].highlight(1);
   Exmatrx2._arrays[1].highlight(0);
   Exmatrx2._arrays[1].highlight(1);
   Exmatrx2._arrays[2].highlight(0);
   Exmatrx2._arrays[2].highlight(1);
   Exmatrx2._arrays[0].value(2,"<span style='color:red;'>morad</span>");
   Exmatrx2._arrays[1].value(2,"<span style='color:blue;'>dina</span>");
   Exmatrx2._arrays[2].value(2,"<span style='color:green;'>jody</span>");
  
   av.step();

   //slide 10
Card2Rect2.css({stroke: "black", "stroke-width":3});
Card2Rect3.css({stroke: "red", "stroke-width":4});
Card2Rect1.css({stroke: "red", "stroke-width":4});
line1.css({stroke: "black", "stroke-width":2});
line2.css({stroke: "red", "stroke-width":4});
Exmatrx2._arrays[0].value(2,"<span style='color:black;'>morad</span>");
   Exmatrx2._arrays[1].value(2,"<span style='color:black;'>dina</span>");
   Exmatrx2._arrays[2].value(2,"<span style='color:black;'>jody</span>");
var TCard2Lab3=av.label("<span style='color:darkred;'>- A given instructor can teach a given student many courses.</span>", {left: arrayLeft-730, top: arrayTop-30 });
TCard2Lab3.css({"font-weight": "bold", "font-size": 16});
Exmatrx2._arrays[3].show();
Exmatrx2._arrays[1].unhighlight(0);
Exmatrx2._arrays[1].unhighlight(1);
Exmatrx2._arrays[0].unhighlight(0);
Exmatrx2._arrays[0].unhighlight(1);
Exmatrx2._arrays[2].unhighlight(1);
Exmatrx2._arrays[2].highlight(0);
Exmatrx2._arrays[2].highlight(2);
Exmatrx2._arrays[3].highlight(0);
Exmatrx2._arrays[3].highlight(2);
Exmatrx2._arrays[2].value(1,"<span style='color:red;'>C++</span>");
Exmatrx2._arrays[3].value(1,"<span style='color:blue;'>java</span>");

av.step();

//slide 11
Exmatrx2._arrays[3].value(0,"<span style='color:blue;'>Dr.ali</span>");
Card2Rect3.css({stroke: "black", "stroke-width":3});
Card2Rect2.css({stroke: "red", "stroke-width":4});
line2.css({stroke: "black", "stroke-width":2});
line3.css({stroke: "red", "stroke-width":4});
Exmatrx2._arrays[2].value(1,"<span style='color:black;'>C++</span>");
Exmatrx2._arrays[3].value(1,"<span style='color:black;'>java</span>");
var TCard2Lab4=av.label("<span style='color:darkred;'>- Each student can learn each course by only one instructor.</span>", {left: arrayLeft-730, top: arrayTop-10 });
TCard2Lab4.css({"font-weight": "bold", "font-size": 16});
Exmatrx2._arrays[3].unhighlight(0);
Exmatrx2._arrays[3].unhighlight(2);
Exmatrx2._arrays[2].unhighlight(0);
Exmatrx2._arrays[2].unhighlight(2);

//Exmatrx2._arrays[3].show();
Exmatrx2._arrays[4].show();
Exmatrx2._arrays[3].highlight(1);
//Exmatrx2._arrays[4].highlight(0);
Exmatrx2._arrays[3].highlight(2);
//Exmatrx2._arrays[4].highlight(2);
//Exmatrx2._arrays[1].highlight(0);
//Exmatrx2._arrays[1].highlight(2);
av.step();

 //slide 12
 //Exmatrx2._arrays[3].value(0,"<span style='color:black;'>Dr.ali</span>");
 //Exmatrx2._arrays[3].unhighlight(1);
 //Exmatrx2._arrays[3].unhighlight(2);
 //Exmatrx2._arrays[1].value(1,"<span style='color:black;'>mona</span>");
 //Exmatrx2._arrays[3].value(1,"<span style='color:black;'>Khaled</span>");
 //Exmatrx2._arrays[4].value(1,"<span style='color:black;'>dina</span>");
 var TCard2Lab5=av.label("<span style='color:darkred;'>Notice:</span> <span style='color:darkblue;'>the same student <u>cann't</u> learn the same course with <u>more than one doctor</u> </span>", {left: arrayLeft-730, top: arrayTop+20 });
 TCard2Lab5.css({"font-weight": "bold", "font-size": 16});
 var TCard2Lab6=av.label("<span style='color:darkred;'>which means that:</span> the occurrence of student course combination is unique & couldn't be repeated</span> <span style='color:green;'> \t\t\t <i> as shown in bridge example</i></span>", {left: arrayLeft-730, top: arrayTop+40 });
 TCard2Lab6.css({"font-weight": "bold", "font-size": 16});
 var TCard2Lab7=av.label("<span style='color:darkred;'>AS:</span> always <span style='color:green;'>(student/course)</span> specific instance leads to <u>only one doctor </u>", {left: arrayLeft-730, top: arrayTop+60 });
 TCard2Lab7.css({"font-weight": "bold", "font-size": 16});
 var TCard2Lab8=av.label("<span style='color:darkred;'>i.e.:</span> <span style='color:green;'>SID+CID ---->> DID</span>", {left: arrayLeft-730, top: arrayTop+80 });
 TCard2Lab8.css({"font-weight": "bold", "font-size": 16});
 var TCard2Lab11=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>SID+CID</u> are the composite primary key <u>(PK)</u></span>", {left: arrayLeft-730, top: arrayTop+100 });
 TCard2Lab11.css({"font-weight": "bold", "font-size": 16});
 //var line4 = av.g.line(arrayLeft-300,  arrayTop+70,  arrayLeft-150,  arrayTop+70,{opacity: 100,"arrow-end":"classic-wide-long","stroke-width": 2});
 //line4.show();
 //var TCard2Lab7=av.label("<span style='color:darkgreen;'><i>Their occurence never repeated.</i></span>", {left: arrayLeft-140, top: arrayTop+40 });
 //TCard2Lab7.css({"font-weight": "bold", "font-size": 16});
 //Exmatrx2._arrays[3].unhighlight();
 //Exmatrx2._arrays[4].unhighlight();
 //Exmatrx2._arrays[1].unhighlight();
 av.step();

 //slide 13
 TCard2Lab5.hide();
 TCard2Lab6.hide();
 TCard2Lab7.hide();
 TCard2Lab8.hide();
 //TCard2Lab9.hide();
 TCard2Lab11.hide();
 var TCard2Lab8updateLoc=av.label("<span style='color:darkred;'>AS:</span> <span style='color:darkblue;'>SID+CID ---->> DID</span>", {left: arrayLeft-730, top: arrayTop+30 });
 TCard2Lab8updateLoc.css({"font-weight": "bold", "font-size": 16});
 var TCard2Lab11updateLoc=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>SID+CID</u> are the composite primary key <u>(PK)</u></span>", {left: arrayLeft-730, top: arrayTop+55 });
 TCard2Lab11updateLoc.css({"font-weight": "bold", "font-size": 16});
 Exmatrx2._arrays[3].unhighlight();
 Exmatrx2._arrays[3].value(0,"<span style='color:black;'>Dr.ali</span>");
 Card2Rect1.css({stroke: "black", "stroke-width":3});
 Card2Rect2.css({stroke: "black", "stroke-width":3});
 line3.css({stroke: "black", "stroke-width":2});
 var TCard2Lab12=av.label("<span style='color:green;'>The corresponding physical relational schema:", {left: arrayLeft-750, top: arrayTop+80});
 TCard2Lab12.css({"font-weight": "bold", "font-size": 18});
 var StudSchlab=av.label(interpret("Student"), {left: arrayLeft-730, top: arrayTop+105 });
 StudSchlab.css({"font-weight": "bold", "font-size": 15});
 var StudSchema = [["SID (PK)","S-att1","S-att2"]];
 var StudSchemaArr= av.ds.matrix(StudSchema, {style: "table", top: arrayTop+125, left: arrayLeft-730});
 StudSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var CorSchlab=av.label(interpret("Course"), {left: arrayLeft-730, top: arrayTop+160 });
 CorSchlab.css({"font-weight": "bold", "font-size": 15});
 var CorSchema = [["CID (PK)","C-att1","C-att2"]];
 var CorSchemaArr= av.ds.matrix(CorSchema, {style: "table", top: arrayTop+180, left: arrayLeft-730});
 CorSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var InstSchlab=av.label(interpret("Instructor"), {left: arrayLeft-730, top: arrayTop+220 });
 InstSchlab.css({"font-weight": "bold", "font-size": 15});
 var InstSchema = [["DID (PK)","D-att1","D-att2"]];
 var InstSchemaArr= av.ds.matrix(InstSchema, {style: "table", top: arrayTop+240, left: arrayLeft-730});
 InstSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var BrdgSchlab=av.label(interpret("Bridge"), {left: arrayLeft-730, top: arrayTop+275 });
 BrdgSchlab.css({"font-weight": "bold", "font-size": 15});
 var BridgeSchema = [["SID","CID","DID"]];
 var BridgeSchemaArr= av.ds.matrix(BridgeSchema, {style: "table", top: arrayTop+300, left: arrayLeft-730});
 BridgeSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 BridgeSchemaArr._arrays[0].css([1], {"text-decoration": "underline"});
 //BridgeSchemaArr._arrays[0].css([2], {"text-decoration": "underline"});
 av.step();

  //slide 14
  Line1Lab.hide();
  Line2Lab.hide();
  Line3Lab.hide();
  //line4.hide();
  TCardLab2.hide();
  Card2Rect1.hide();
  Card2Rect1Lab.hide();
  Card2Rect2.hide();
  Card2Rect2Lab.hide();
  Card2Rect3.hide();
  Card2Rect3Lab.hide();
  polygonCard2.hide();
  polygonCard2Lab.hide();
  for(i=0;i<ExampleMatrix2.length;i++)
  Exmatrx2._arrays[i].hide();
  TCard2Lab8updateLoc.hide();
  TCard2Lab11updateLoc.hide();
TCard2Lab2.hide();
TCard2Lab3.hide();
TCard2Lab4.hide();
TCard2Lab5.hide();
TCard2Lab6.hide();
TCard2Lab7.hide();
TCard2Lab8.hide();
TCard2Lab9.hide();
TCard2Lab10.hide();
TCard2Lab12.hide();
StudSchlab.hide();
StudSchemaArr._arrays[0].hide();
CorSchlab.hide();
CorSchemaArr._arrays[0].hide();
InstSchlab.hide();
InstSchemaArr._arrays[0].hide();
BrdgSchlab.hide();
BridgeSchemaArr._arrays[0].hide();

  var TCardLab3=av.label("<span style='color:darkblue;'>* One TO one TO many</span> =<span style='color:red;'> 1:1:M</span>", {left: arrayLeft-750, top: arrayTop-120 });
 TCardLab3.css({"font-weight": "bold", "font-size": 18});  

  var Card3Rect1=av.g.rect(arrayLeft-290, arrayTop-90, 110, 30, {"stroke-width": 3});
  var Card3Rect1Lab=av.label("<span style='color:blue;'>Project</span>", {left:arrayLeft-270, top: arrayTop-105});
  Card3Rect1Lab.css({"font-weight": "bold", "font-size": 16});
  var Card3Rect2=av.g.rect(arrayLeft, arrayTop-90, 110, 30, {"stroke-width": 3});
  var Card3Rect2Lab=av.label("<span style='color:blue;'>Equipment</span>", {left:arrayLeft+20, top: arrayTop-105});
  Card3Rect2Lab.css({"font-weight": "bold", "font-size": 16});
  var Card3Rect3=av.g.rect(arrayLeft-140, arrayTop-20, 110, 30, {"stroke-width": 3});
  var Card3Rect3Lab=av.label("<span style='color:blue;'>Employee</span>", {left:arrayLeft-120, top: arrayTop-35});
  Card3Rect3Lab.css({"font-weight": "bold", "font-size": 16});
  var polygonCard3= av.g.polyline([[arrayLeft-90, arrayTop-70-25],
   [arrayLeft-90+45, arrayTop-70],
   [arrayLeft-90, arrayTop-70+25],
   [arrayLeft-90-45, arrayTop-70],
   [arrayLeft-90, arrayTop-70-25]],
  {"stroke-width": 3, stroke: "black"});
  var polygonCard3Lab=av.label("<span style='color:blue;'>work</span>", {left:arrayLeft-107, top: arrayTop-70-25});
 //left horizontal line
  //var line1 = av.g.line(arrayLeft-90-45,  arrayTop-90+20,  arrayLeft-290+110,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
  line1.show();
  var Line1Lab=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-295+120, top:  arrayTop-123+20});
  Line1Lab.css({"font-weight": "bold", "font-size": 14});
  //right horizontal line
 // var line2 = av.g.line(arrayLeft-90+45,  arrayTop-90+20,  arrayLeft,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
 line2.show();
  var Line2Lab=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-17, top:  arrayTop-123+20});
  Line2Lab.css({"font-weight": "bold", "font-size": 14});
  //vertical line line  
 // var line3 = av.g.line(arrayLeft-90,  arrayTop-70+25,  arrayLeft-90,  arrayTop-20,{opacity: 100, "stroke-width": 2});
 line3.show();
  var Line3Lab=av.label("<span style='color:red;'>M</span>", {left:arrayLeft-85, top:  arrayTop-50});
  Line3Lab.css({"font-weight": "bold", "font-size": 14});
  var TCard1Lab1=av.label("<span style='color:darkred;'>How to read this relation:</span>", {left: arrayLeft-730, top: arrayTop-80 });
  TCard1Lab1.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 15
  var TCard3Lab14=av.label("<span style='color:green;'>Bridge Example Table:", {left: arrayLeft-140, top: arrayTop+100});
  TCard3Lab14.css({"font-weight": "bold", "font-size": 18});
  var TCard3Lab13=av.label("Bridge", {left: arrayLeft-140, top: arrayTop+130});
  TCard3Lab13.css({"font-weight": "bold", "font-size": 15});
  var ExampleMatrix3 = [["Construction","adel","Mixer"],["Construction","adam","Mixer"],["Construction","khaled","Mixer"],["Road","ali","truck"],["sewage","ahmed","bulldozer"],["elctricity","samy","crane"]];
  var Exmatrx3= av.ds.matrix(ExampleMatrix3, {style: "table", top: arrayTop+150, left: arrayLeft-140 });
  for(i=0;i<ExampleMatrix3.length;i++)
  Exmatrx3._arrays[i].hide(); 
  var TCard3Lab2=av.label("<span style='color:darkred;'>- Many employees can work with the same equipment on the same project.</span>", {left: arrayLeft-730, top: arrayTop-50 });
  TCard3Lab2.css({"font-weight": "bold", "font-size": 16});
  Card3Rect2.css({stroke: "red", "stroke-width":4});
  Card3Rect1.css({stroke: "red", "stroke-width":4});
  line3.css({stroke: "red", "stroke-width":4});
  Exmatrx3._arrays[0].show();
  Exmatrx3._arrays[1].show();
  Exmatrx3._arrays[2].show();
  Exmatrx3._arrays[0].highlight(0);
  Exmatrx3._arrays[0].highlight(2);
  Exmatrx3._arrays[1].highlight(0);
  Exmatrx3._arrays[1].highlight(2);
  Exmatrx3._arrays[2].highlight(0);
  Exmatrx3._arrays[2].highlight(2);
  Exmatrx3._arrays[0].value(1,"<span style='color:red;'>adel</span>");
  Exmatrx3._arrays[1].value(1,"<span style='color:blue;'>adam</span>");
  Exmatrx3._arrays[2].value(1,"<span style='color:green;'>Khaled</span>");
  av.step();

 //slide 16
 Card3Rect2.css({stroke: "black", "stroke-width":3});
 Card3Rect3.css({stroke: "red", "stroke-width":4});
 //Card2Rect1.css({stroke: "red", "stroke-width":4});
 line3.css({stroke: "black", "stroke-width":2});
 line2.css({stroke: "red", "stroke-width":4});
 Exmatrx2._arrays[0].value(2,"<span style='color:black;'>morad</span>");
    Exmatrx2._arrays[1].value(2,"<span style='color:black;'>dina</span>");
    Exmatrx2._arrays[2].value(2,"<span style='color:black;'>jody</span>");
 var TCard3Lab15=av.label("<span style='color:darkred;'>- A given employee can work in a given project with only one equipment.</span>", {left: arrayLeft-730, top: arrayTop-30 });
 TCard3Lab15.css({"font-weight": "bold", "font-size": 16});
  Exmatrx3._arrays[0].highlight(0);
  Exmatrx3._arrays[0].highlight(1);
  Exmatrx3._arrays[0].unhighlight(2);
  Exmatrx3._arrays[1].unhighlight();
  Exmatrx3._arrays[2].unhighlight();
  Exmatrx3._arrays[0].value(2,"<span style='color:red;'>Mixer</span>");
  Exmatrx3._arrays[0].value(1,"<span style='color:black;'>adel</span>");
  Exmatrx3._arrays[1].value(1,"<span style='color:black;'>adam</span>");
  Exmatrx3._arrays[2].value(1,"<span style='color:black;'>Khaled</span>");
  var TCard3Lab5=av.label("<span style='color:darkred;'>Notice:</span> <span style='color:darkblue;'>the value of each <span style='color:green;'><i>(project/employee)</i></span> instance <u>cann't be repeated</u> according to that relation meaning</span>", {left: arrayLeft-730, top: arrayTop-10 });
 TCard3Lab5.css({"font-weight": "bold", "font-size": 16});
 var TCard3Lab6=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>PID+EID</u> is a candidate composite primary key</span>", {left: arrayLeft-730, top: arrayTop+10 });
 TCard3Lab6.css({"font-weight": "bold", "font-size": 16});
 var TCard3Lab7=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>PID+EID ---->> EQID</span>", {left: arrayLeft-730, top: arrayTop+30 });
 TCard3Lab7.css({"font-weight": "bold", "font-size": 16});
av.step();

//slide 17
Card3Rect1.css({stroke: "black", "stroke-width":3});
Card3Rect2.css({stroke: "red", "stroke-width":4});
//Card2Rect1.css({stroke: "red", "stroke-width":4});
line2.css({stroke: "black", "stroke-width":2});
line1.css({stroke: "red", "stroke-width":4});
Exmatrx3._arrays[0].value(2,"<span style='color:black;'>Mixer</span>");
var TCard3Lab8=av.label("<span style='color:darkred;'>- A given employee using a specific equipment can only works in one project.</span>", {left: arrayLeft-730, top: arrayTop+50 });
TCard3Lab8.css({"font-weight": "bold", "font-size": 16});
Exmatrx3._arrays[3].show();
 Exmatrx3._arrays[3].highlight(2);
 Exmatrx3._arrays[3].highlight(1);
 Exmatrx3._arrays[0].unhighlight();
 Exmatrx3._arrays[0].value(2,"<span style='color:black;'>Mixer</span>");
 Exmatrx3._arrays[3].value(0,"<span style='color:red;'>Road</span>");
 var TCard3Lab9=av.label("<span style='color:darkred;'>Notice:</span> <span style='color:darkblue;'>the value of each <span style='color:green;'><i>(employee/equipment)</i></span> instance <u>cann't be repeated</u> according to that relation meaning</span>", {left: arrayLeft-730, top: arrayTop+70 });
TCard3Lab9.css({"font-weight": "bold", "font-size": 16});
var TCard3Lab10=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>EID+EQID</u> is a candidate composite primary key</span>", {left: arrayLeft-730, top: arrayTop+90 });
TCard3Lab10.css({"font-weight": "bold", "font-size": 16});
var TCard3Lab11=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>EID+EQID ---->> PID</span>", {left: arrayLeft-730, top: arrayTop+110 });
TCard3Lab11.css({"font-weight": "bold", "font-size": 16});
av.step();

//slide 18
Card3Rect3.css({stroke: "black", "stroke-width":3});
Card3Rect2.css({stroke: "black", "stroke-width":4});
line1.css({stroke: "black", "stroke-width":2});
TCard3Lab5.hide();
TCard3Lab6.hide();
TCard3Lab7.hide();
TCard3Lab8.hide();
TCard3Lab9.hide();
TCard3Lab10.hide();
TCard3Lab11.hide();
Exmatrx3._arrays[3].value(0,"<span style='color:black;'>Road</span>");
Exmatrx3._arrays[3].unhighlight();
var TCard3Lab7=av.label("<span style='color:darkred;'>So:</span> <span style='color:darkblue;'>PID+EID ---->> EQID</span>", {left: arrayLeft-730, top: arrayTop-10 });
TCard3Lab7.css({"font-weight": "bold", "font-size": 16});
var TCard3Lab8=av.label("<span style='color:darkred;'>- A given employee using a specific equipment can only works in one project.</span>", {left: arrayLeft-730, top: arrayTop+10 });
TCard3Lab8.css({"font-weight": "bold", "font-size": 16});
var TCard3Lab11=av.label("<span style='color:darkred;'>So:</span> <span style='color:darkblue;'>EID+EQID ---->> PID</span>", {left: arrayLeft-730, top: arrayTop+30 });
TCard3Lab11.css({"font-weight": "bold", "font-size": 16});
var TCard3Lab12=av.label("<span style='color:darkred;'>Finally:</span> The <span style='color:green;'><u>bridge primary Key</u></span> can be one of these two composite candidate keys  <span style='color:darkblue;'>PID+EID</span> <span style='color:green;'>OR</span> <span style='color:darkblue;'>EID+EQID</span> ", {left: arrayLeft-730, top: arrayTop+50 });
TCard3Lab12.css({"font-weight": "bold", "font-size": 16});
av.step();

 //slide 19
 //TCard2Lab5.hide();
 //TCard2Lab6.hide();
 //TCard2Lab7.hide();
 //TCard2Lab8.hide();
 //TCard2Lab9.hide();
 //TCard2Lab11.hide();
 //var TCard2Lab8updateLoc=av.label("<span style='color:darkred;'>AS:</span> <span style='color:darkblue;'>SID+CID ---->> DID</span>", {left: arrayLeft-730, top: arrayTop+30 });
 //TCard2Lab8updateLoc.css({"font-weight": "bold", "font-size": 16});
 //var TCard2Lab11updateLoc=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>SID+CID</u> are the composite primary key <u>(PK)</u></span>", {left: arrayLeft-730, top: arrayTop+55 });
 //TCard2Lab11updateLoc.css({"font-weight": "bold", "font-size": 16});
 //Exmatrx2._arrays[3].unhighlight();
 //Exmatrx2._arrays[3].value(0,"<span style='color:black;'>Dr.ali</span>");
 //Card2Rect1.css({stroke: "black", "stroke-width":3});
 //Card2Rect2.css({stroke: "black", "stroke-width":3});
 //line3.css({stroke: "black", "stroke-width":2});
 //var TCard2Lab12=av.label("<span style='color:green;'>The corresponding physical relational schema:", {left: arrayLeft-750, top: arrayTop+80});
 //TCard2Lab12.css({"font-weight": "bold", "font-size": 18});
 var ProSchlab=av.label(interpret("Project"), {left: arrayLeft-730, top: arrayTop+105 });
 ProSchlab.css({"font-weight": "bold", "font-size": 15});
 var ProSchema = [["PID (PK)","P-att1","P-att2"]];
 var ProSchemaArr= av.ds.matrix(ProSchema, {style: "table", top: arrayTop+125, left: arrayLeft-730});
 ProSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var EquSchlab=av.label(interpret("Equipment"), {left: arrayLeft-730, top: arrayTop+160 });
 EquSchlab.css({"font-weight": "bold", "font-size": 15});
 var EquSchema = [["EQID (PK)","Eq-att1","Eq-att2"]];
 var EquSchemaArr= av.ds.matrix(EquSchema, {style: "table", top: arrayTop+180, left: arrayLeft-730});
 EquSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var EmpSchlab=av.label(interpret("Employee"), {left: arrayLeft-730, top: arrayTop+220 });
 EmpSchlab.css({"font-weight": "bold", "font-size": 15});
 var EmpSchema = [["EID (PK)","E-att1","E-att2"]];
 var EmpSchemaArr= av.ds.matrix(EmpSchema, {style: "table", top: arrayTop+240, left: arrayLeft-730});
 EmpSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var BrdgSchlab=av.label(interpret("Bridge"), {left: arrayLeft-730, top: arrayTop+275 });
 BrdgSchlab.css({"font-weight": "bold", "font-size": 15});
 var BridgeSchema = [["EID","EQID","PID"]];
 var BridgeSchemaArr= av.ds.matrix(BridgeSchema, {style: "table", top: arrayTop+300, left: arrayLeft-730});
 BridgeSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 BridgeSchemaArr._arrays[0].css([1], {"text-decoration": "underline"});
 var pointer1 = av.pointer("<span style='color:red;'><b>1st candidate composite PK</b></span>", BridgeSchemaArr._arrays[0].index(0), {left: 280, top:-15 });
 var pointer2 = av.pointer("", BridgeSchemaArr._arrays[0].index(1), {left: 280, top:-15 });
 //BridgeSchemaArr._arrays[0].css([2], {"text-decoration": "underline"});
 av.step();

 //slide 20
pointer1.hide();
pointer2.hide();
BridgeSchemaArr._arrays[0].hide();
var BridgeSchema2ndKey = [["EID","EQID","PID"]];
var BridgeSchemaArr2ndKey= av.ds.matrix(BridgeSchema2ndKey, {style: "table", top: arrayTop+300, left: arrayLeft-730});
BridgeSchemaArr2ndKey._arrays[0].css([0], {"text-decoration": "underline"});
BridgeSchemaArr2ndKey._arrays[0].css([2], {"text-decoration": "underline"});
pointer1=av.pointer("<span style='color:red;'><b>2nd candidate composite PK</b></span>", BridgeSchemaArr2ndKey._arrays[0].index(0), {left: 280, top:-15 });
pointer2 = av.pointer("", BridgeSchemaArr2ndKey._arrays[0].index(2), {left: 200, top:-15 });
 av.step();

 
  //slide 21
  pointer1.hide();
  pointer2.hide();
  Line1Lab.hide();
  Line2Lab.hide();
  Line3Lab.hide();
  //line4.hide();
  TCardLab2.hide();
  Card3Rect1.hide();
  Card3Rect1Lab.hide();
  Card3Rect2.hide();
  Card3Rect2Lab.hide();
  Card3Rect3.hide();
  Card3Rect3Lab.hide();
  polygonCard3.hide();
  polygonCard3Lab.hide();
  for(i=0;i<ExampleMatrix3.length;i++)
  Exmatrx3._arrays[i].hide();
 // TCard3Lab8updateLoc.hide();
 // TCard3Lab11updateLoc.hide();
TCard3Lab2.hide();
TCardLab3.hide();
//TCard3Lab4.hide();
TCard3Lab5.hide();
TCard3Lab6.hide();
TCard3Lab7.hide();
TCard3Lab8.hide();
TCard3Lab9.hide();
TCard3Lab10.hide();
TCard3Lab11.hide();
TCard3Lab12.hide();
TCard3Lab13.hide();
TCard3Lab14.hide();
TCard3Lab15.hide();
EmpSchlab.hide();
EmpSchemaArr._arrays[0].hide();
ProSchlab.hide();
ProSchemaArr._arrays[0].hide();
EquSchlab.hide();
EquSchemaArr._arrays[0].hide();
BrdgSchlab.hide();
BridgeSchemaArr._arrays[0].hide();
BridgeSchemaArr2ndKey.hide();
  var TCardLab4=av.label("<span style='color:darkblue;'>* One TO one TO one</span> =<span style='color:red;'> 1:1:1</span>", {left: arrayLeft-750, top: arrayTop-120 });
 TCardLab4.css({"font-weight": "bold", "font-size": 18});  

  var Card4Rect1=av.g.rect(arrayLeft-290, arrayTop-90, 110, 30, {"stroke-width": 3});
  var Card4Rect1Lab=av.label("<span style='color:blue;'>Husband</span>", {left:arrayLeft-270, top: arrayTop-105});
  Card4Rect1Lab.css({"font-weight": "bold", "font-size": 16});
  var Card4Rect2=av.g.rect(arrayLeft, arrayTop-90, 110, 30, {"stroke-width": 3});
  var Card4Rect2Lab=av.label("<span style='color:blue;'>Wife</span>", {left:arrayLeft+20, top: arrayTop-105});
  Card4Rect2Lab.css({"font-weight": "bold", "font-size": 16});
  var Card4Rect3=av.g.rect(arrayLeft-140, arrayTop-20, 110, 30, {"stroke-width": 3});
  var Card4Rect3Lab=av.label("<span style='color:blue;'>House</span>", {left:arrayLeft-120, top: arrayTop-35});
  Card4Rect3Lab.css({"font-weight": "bold", "font-size": 16});
  var polygonCard4= av.g.polyline([[arrayLeft-90, arrayTop-70-25],
   [arrayLeft-90+45, arrayTop-70],
   [arrayLeft-90, arrayTop-70+25],
   [arrayLeft-90-45, arrayTop-70],
   [arrayLeft-90, arrayTop-70-25]],
  {"stroke-width": 3, stroke: "black"});
  var polygonCard4Lab=av.label("<span style='color:blue;'>have</span>", {left:arrayLeft-107, top: arrayTop-70-25});
 //left horizontal line
  //var line1 = av.g.line(arrayLeft-90-45,  arrayTop-90+20,  arrayLeft-290+110,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
  line1.show();
  var Line1Lab=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-295+120, top:  arrayTop-123+20});
  Line1Lab.css({"font-weight": "bold", "font-size": 14});
  //right horizontal line
 // var line2 = av.g.line(arrayLeft-90+45,  arrayTop-90+20,  arrayLeft,  arrayTop-90+20,{opacity: 100, "stroke-width": 2});
 line2.show();
  var Line2Lab=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-17, top:  arrayTop-123+20});
  Line2Lab.css({"font-weight": "bold", "font-size": 14});
  //vertical line line  
 // var line3 = av.g.line(arrayLeft-90,  arrayTop-70+25,  arrayLeft-90,  arrayTop-20,{opacity: 100, "stroke-width": 2});
 line3.show();
  var Line3Lab=av.label("<span style='color:red;'>1</span>", {left:arrayLeft-85, top:  arrayTop-50});
  Line3Lab.css({"font-weight": "bold", "font-size": 14});
  var TCard1Lab1=av.label("<span style='color:darkred;'>How to read this relation:</span>", {left: arrayLeft-730, top: arrayTop-80 });
  TCard1Lab1.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 22
  var TCard4Lab14=av.label("<span style='color:green;'>Bridge Example Table:", {left: arrayLeft-140, top: arrayTop+100});
  TCard4Lab14.css({"font-weight": "bold", "font-size": 18});
  var TCard4Lab13=av.label("Bridge", {left: arrayLeft-140, top: arrayTop+130});
  TCard4Lab13.css({"font-weight": "bold", "font-size": 15});
  var ExampleMatrix4 = [["adel","mona","B12"],["adam","sally","C8"],["mostafa","sarah","B7"]];
  var Exmatrx4= av.ds.matrix(ExampleMatrix4, {style: "table", top: arrayTop+150, left: arrayLeft-140 });
  for(i=0;i<ExampleMatrix4.length;i++)
  Exmatrx4._arrays[i].hide(); 
  var TCard4Lab2=av.label("<span style='color:darkred;'>- Any particular couple of husband and wife can only have one house at most.</span>", {left: arrayLeft-730, top: arrayTop-50 });
  TCard4Lab2.css({"font-weight": "bold", "font-size": 16});
  Card4Rect2.css({stroke: "red", "stroke-width":4});
  Card4Rect1.css({stroke: "red", "stroke-width":4});
  line3.css({stroke: "red", "stroke-width":4});
  Exmatrx4._arrays[0].show();
  //Exmatrx3._arrays[1].show();
  //Exmatrx3._arrays[2].show();
  Exmatrx4._arrays[0].highlight(0);
  Exmatrx4._arrays[0].highlight(1);
  Exmatrx4._arrays[0].value(2,"<span style='color:red;'>B12</span>");
  //Exmatrx3._arrays[1].value(1,"<span style='color:blue;'>adam</span>");
  //Exmatrx3._arrays[2].value(1,"<span style='color:green;'>Khaled</span>");
  av.step();

  //slide 23
  var TCard4Lab3=av.label("<span style='color:darkred;'>Notice:</span> <span style='color:darkblue;'>the value of each <span style='color:green;'><i>(Husband/wife)</i></span> instance <u>is unique</u> as each couple cann't own more than one house.</span>", {left: arrayLeft-730, top: arrayTop-10 });
  TCard4Lab3.css({"font-weight": "bold", "font-size": 16});
  var TCard4Lab4=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>HID+WID</u> is a candidate composite primary key</span>", {left: arrayLeft-730, top: arrayTop+13 });
  TCard4Lab4.css({"font-weight": "bold", "font-size": 16});
  var TCard4Lab5=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>HID+WID ---->> HouID</span>", {left: arrayLeft-730, top: arrayTop+35 });
  TCard4Lab5.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 24
 Card4Rect2.css({stroke: "black", "stroke-width":3});
 Card4Rect3.css({stroke: "red", "stroke-width":4});
 //Card2Rect1.css({stroke: "red", "stroke-width":4});
 line3.css({stroke: "black", "stroke-width":2});
 line2.css({stroke: "red", "stroke-width":4});
 Exmatrx4._arrays[0].value(2,"<span style='color:black;'>B12</span>");
 var TCard4Lab6=av.label("<span style='color:darkred;'>- A given husband can only live in his owned house with only one wife.</span>", {left: arrayLeft-730, top: arrayTop+60 });
 TCard4Lab6.css({"font-weight": "bold", "font-size": 16});
  Exmatrx4._arrays[0].unhighlight();
  Exmatrx4._arrays[1].show();
  Exmatrx4._arrays[1].highlight(0);
  Exmatrx4._arrays[1].highlight(2);
  Exmatrx4._arrays[1].value(1,"<span style='color:red;'>sally</span>");
  av.step();

  //slide 25
  var TCard4Lab7=av.label("<span style='color:darkred;'>Notice:</span> <span style='color:darkblue;'>the value of each <span style='color:green;'><i>(Husband/House)</i></span> instance <u>cann't be repeated</u> according to that relation meaning</span>", {left: arrayLeft-730, top: arrayTop+85 });
  TCard4Lab7.css({"font-weight": "bold", "font-size": 16});
 var TCard4Lab8=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>HID+HouID</u> is a candidate composite primary key</span>", {left: arrayLeft-730, top: arrayTop+105 });
 TCard4Lab8.css({"font-weight": "bold", "font-size": 16});
 var TCard4Lab9=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>HID+HouID ---->> WID</span>", {left: arrayLeft-730, top: arrayTop+125 });
 TCard4Lab9.css({"font-weight": "bold", "font-size": 16});
av.step();

//slide 26
Card4Rect1.css({stroke: "black", "stroke-width":3});
Card4Rect2.css({stroke: "red", "stroke-width":4});
//Card2Rect1.css({stroke: "red", "stroke-width":4});
line2.css({stroke: "black", "stroke-width":2});
line1.css({stroke: "red", "stroke-width":4});
Exmatrx4._arrays[1].value(1,"<span style='color:black;'>sally</span>");
var TCard4Lab10=av.label("<span style='color:darkred;'>- A given wife can only live in her own house with only one husband.</span>", {left: arrayLeft-730, top: arrayTop+150 });
TCard4Lab10.css({"font-weight": "bold", "font-size": 16});
 Exmatrx4._arrays[1].unhighlight();
 Exmatrx4._arrays[2].show();
 Exmatrx4._arrays[2].highlight(1);
 Exmatrx4._arrays[2].highlight(2);
 Exmatrx4._arrays[2].value(0,"<span style='color:red;'>mostafa</span>");
 av.step();

 //slide 27
 var TCard4Lab11=av.label("<span style='color:darkred;'>Notice:</span> <span style='color:darkblue;'>unique value for each <span style='color:green;'><i>(Wife/House)</i></span> instance <u>as above examples</u></span>", {left: arrayLeft-730, top: arrayTop+175 });
 TCard4Lab11.css({"font-weight": "bold", "font-size": 16});
var TCard4Lab12=av.label("<span style='color:darkred;'>Then:</span> <span style='color:darkblue;'><u>WID+HouID</u> is a candidate composite primary key</span>", {left: arrayLeft-730, top: arrayTop+195 });
TCard4Lab12.css({"font-weight": "bold", "font-size": 16});
var TCard4Lab13=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>WID+HouID ---->> HID</span>", {left: arrayLeft-730, top: arrayTop+215 });
TCard4Lab13.css({"font-weight": "bold", "font-size": 16});
av.step();

//slide 28
Card4Rect2.css({stroke: "black", "stroke-width":3});
Card4Rect3.css({stroke: "black", "stroke-width":3});
line1.css({stroke: "black", "stroke-width":2});
Exmatrx4._arrays[2].unhighlight();
Exmatrx4._arrays[2].value(0,"<span style='color:black;'>mostafa</span>");
TCard4Lab3.hide();
TCard4Lab4.hide();
TCard4Lab5.hide();
TCard4Lab6.hide();
TCard4Lab7.hide();
TCard4Lab8.hide();
TCard4Lab9.hide();
TCard4Lab10.hide();
TCard4Lab11.hide();
TCard4Lab12.hide();
TCard4Lab13.hide();
TCard4Lab5=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>HID+WID ---->> HouID</span>", {left: arrayLeft-730, top: arrayTop-25 });
  TCard4Lab5.css({"font-weight": "bold", "font-size": 16});
  TCard4Lab6=av.label("<span style='color:darkred;'>- A given husband can only live in his owned house with only one wife.</span>", {left: arrayLeft-730, top: arrayTop+5 });
 TCard4Lab6.css({"font-weight": "bold", "font-size": 16});
 TCard4Lab9=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>HID+HouID ---->> WID</span>", {left: arrayLeft-730, top: arrayTop+30 });
 TCard4Lab9.css({"font-weight": "bold", "font-size": 16});
 TCard4Lab10=av.label("<span style='color:darkred;'>- A given wife can only live in her own house with only one husband.</span>", {left: arrayLeft-730, top: arrayTop+60 });
TCard4Lab10.css({"font-weight": "bold", "font-size": 16});
TCard4Lab13=av.label("<span style='color:darkred;'>So:</span> <span style='color:green;'>WID+HouID ---->> HID</span>", {left: arrayLeft-730, top: arrayTop+80 });
TCard4Lab13.css({"font-weight": "bold", "font-size": 16});
av.step();

//slide 29
 var HusSchlab=av.label(interpret("Husband"), {left: arrayLeft-730, top: arrayTop+105 });
 HusSchlab.css({"font-weight": "bold", "font-size": 15});
 var HusSchema = [["HID (PK)","H-att1","H-att2"]];
 var HusSchemaArr= av.ds.matrix(HusSchema, {style: "table", top: arrayTop+125, left: arrayLeft-730});
 HusSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var WFSchlab=av.label(interpret("Wife"), {left: arrayLeft-730, top: arrayTop+160 });
 WFSchlab.css({"font-weight": "bold", "font-size": 15});
 var WFSchema = [["WID (PK)","W-att1","W-att2"]];
 var WFSchemaArr= av.ds.matrix(WFSchema, {style: "table", top: arrayTop+180, left: arrayLeft-730});
 WFSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var HosSchlab=av.label(interpret("House"), {left: arrayLeft-730, top: arrayTop+220 });
 HosSchlab.css({"font-weight": "bold", "font-size": 15});
 var HosSchema = [["HouID (PK)","Hou-att1","Hou-att2"]];
 var HosSchemaArr= av.ds.matrix(HosSchema, {style: "table", top: arrayTop+240, left: arrayLeft-730});
 HosSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 var BrdgSchlab=av.label(interpret("Bridge"), {left: arrayLeft-730, top: arrayTop+275 });
 BrdgSchlab.css({"font-weight": "bold", "font-size": 15});
 var BridgeSchema = [["HID","WID","HouID"]];
 var BridgeSchemaArr= av.ds.matrix(BridgeSchema, {style: "table", top: arrayTop+300, left: arrayLeft-730});
 BridgeSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
 BridgeSchemaArr._arrays[0].css([1], {"text-decoration": "underline"});
 var pointer1 = av.pointer("<span style='color:red;'><b>1st candidate composite PK</b></span>", BridgeSchemaArr._arrays[0].index(0), {left: 280, top:-15 });
 var pointer2 = av.pointer("", BridgeSchemaArr._arrays[0].index(1), {left: 280, top:-15 });
 //BridgeSchemaArr._arrays[0].css([2], {"text-decoration": "underline"});
 av.step();

 //slide 30
pointer1.hide();
pointer2.hide();
BridgeSchemaArr._arrays[0].hide();
var BridgeSchema2ndKey = [["HID","WID","HouID"]];
var BridgeSchemaArr2ndKey= av.ds.matrix(BridgeSchema2ndKey, {style: "table", top: arrayTop+300, left: arrayLeft-730});
BridgeSchemaArr2ndKey._arrays[0].css([0], {"text-decoration": "underline"});
BridgeSchemaArr2ndKey._arrays[0].css([2], {"text-decoration": "underline"});
pointer1=av.pointer("<span style='color:red;'><b>2nd candidate composite PK</b></span>", BridgeSchemaArr2ndKey._arrays[0].index(0), {left: 280, top:-15 });
pointer2 = av.pointer("", BridgeSchemaArr2ndKey._arrays[0].index(2), {left: 200, top:-15 });
av.step();

  //slide 31
pointer1.hide();
pointer2.hide();
BridgeSchemaArr2ndKey._arrays[0].hide();
var BridgeSchema3rdKey = [["HID","WID","HouID"]];
var BridgeSchemaArr3rdKey= av.ds.matrix(BridgeSchema3rdKey, {style: "table", top: arrayTop+300, left: arrayLeft-730});
BridgeSchemaArr3rdKey._arrays[0].css([1], {"text-decoration": "underline"});
BridgeSchemaArr3rdKey._arrays[0].css([2], {"text-decoration": "underline"});
pointer1=av.pointer("<span style='color:red;'><b>3rd candidate composite PK</b></span>", BridgeSchemaArr3rdKey._arrays[0].index(1), {left: 215, top:-15 });
pointer2 = av.pointer("", BridgeSchemaArr3rdKey._arrays[0].index(2), {left: 215, top:-15 });
av.step();


av.recorded();

});
