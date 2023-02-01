/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationship";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

 // var theArray1 = ["", "", "", ""];
 // var theArray2 = ["", "", "", ""];
 // var theArray3 = ["", "", "", ""];
  
  var av = new JSAV(av_name);

   //vertical array min.width=80 in insertionsortCON.css


   //some attributes controlling entities matrices
  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=250;
  var arrayTop=50;

  //some attributes controlling entities crows foot notation rectangles in porblem solving
  var rowNo=1;
  var NotationVerGaps=60;
 var  NotationHorGaps=0;
 var LabelLeft=5;
 var pY=5;




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
  var Prob1Label=av.label("<span style='color:blue;'>Store X: (global competition)</span>", {left: arrayLeft, top: arrayTop-70 });
  Prob1Label.css({"font-weight": "bold", "font-size": 16});

  var Prob1Statment=av.label("Store X has a lot of distributors to sell their several products around the world. The store's policy states that each distributor is allowed to sell the store’s products in each country. And also multiple distributors are allowed to sell products in the same country. In this case each distributor can set different price for each product type.", {left: arrayLeft+20, top: arrayTop-45 });
  Prob1Statment.css({"font-weight": "bold", "font-size": 16});

  var Prob2Label=av.label("<span style='color:blue;'>Store Y: (exclusive distributor)</span>", {left: arrayLeft, top: arrayTop+45});
  Prob2Label.css({"font-weight": "bold", "font-size": 16});

  var Prob2Statment=av.label("Store Y has a lot of distributors to sell their several products around the world. The store's policy states that each country has only one distributor who sells all the store’s products exclusively. A distributor is permitted to distribute in many countries. The price of each product is set differently for each country.", {left: arrayLeft+20, top: arrayTop+70 });
  Prob2Statment.css({"font-weight": "bold", "font-size": 16});


  //definning Matrix as a table
  var Mtrix1Lab=av.label("Distributer", {left: arrayLeft, top: arrayTop-25 });
  Mtrix1Lab.css({"font-weight": "bold", "font-size": 16});
  Mtrix1Lab.hide();
  var themMatrix1 = [["Dist-id","Dist-name"],[1,"Ahmed"],[2,"ali"],[3,"adel"],[4,"hany"],[5,"wael"]];
  var matrx1= av.ds.matrix(themMatrix1, {style: "table", top: arrayTop, left: arrayLeft });

   //definning distributer symbol in crows foot notation as a table
   //var Mtrix1Lab=av.label("Distributer", {left: arrayLeft, top: arrayTop-25 });
   //Mtrix1Lab.css({"font-weight": "bold", "font-size": 16});
   //Mtrix1Lab.hide();
  /* var Darr = ["Distributer","Dist-id","Dist-name"];
   var DtsArr= av.ds.array(Darr, {style: "table", top: arrayTop, left: arrayLeft, layout: "vertical"});
   DtsArr.css([1], {"text-decoration": "underline"});
   DtsArr.css([0], {"font-weight": "bold", "font-size": 16}); */
   
  
  


  arrayLeft+=arrayWidth+arrayGap;
  var Mtrix2Lab=av.label("Country", {left: arrayLeft, top: arrayTop-25 });
  Mtrix2Lab.css({"font-weight": "bold", "font-size": 16});
  Mtrix2Lab.hide();
  var themMatrix2 =[["Country-id","Coun-name"],["A","Egypt"],["B","USA"],["C","KSA"],["D","UK"],["E","China"]];
  var matrx2= av.ds.matrix(themMatrix2, {style: "table", top: arrayTop, left: arrayLeft });
  
  arrayLeft+=arrayWidth+arrayGap;
  var Mtrix3Lab=av.label("Product", {left: arrayLeft, top: arrayTop-25 });
  Mtrix3Lab.css({"font-weight": "bold", "font-size": 16});
  Mtrix3Lab.hide();
  var themMatrix3 =[["Pro-id","Pro-name"],["F512","blinder"],["G920","drier"],["K344","Fridge"],["Z212","mixer"],["Z302","watch"]];
  var matrx3= av.ds.matrix(themMatrix3, {style: "table", top: arrayTop, left: arrayLeft });
 
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

//Relations' lines named with names of connecting tables
//"dirstributor under vertical line" its coordinates depandes on coordinates and dimensions of dirstributor,note: tables defenitions are in slides 25 & 26
var DUndVerLine = av.g.line(60+(NotationHorGaps*2)+350,  (pY-40)+(NotationVerGaps*rowNo)+35,  60+(NotationHorGaps*2)+350,  (pY-40)+(NotationVerGaps*rowNo)+130,{opacity: 100, "stroke-width": 2});
DUndVerLine.hide();

//"country left horizontal line" its coordinates depandes on coordinates and dimensions of country,note: tables defenitions are in slides 25 & 26
var CLeftHorLine = av.g.line(60+(NotationHorGaps*2)+350+145,  (pY-40)+(NotationVerGaps*rowNo)+130,  60+(NotationHorGaps*2)-50+400,  (pY-40)+(NotationVerGaps*rowNo)+130,{opacity: 100, "stroke-width": 2});
CLeftHorLine.hide();

//"dirstributor Bridge horizontal line" its coordinates depandes on coordinates and dimensions of dirstributor,note: tables defenitions are in slides 25 & 26
var DBHorLine = av.g.line(60+(NotationHorGaps*2)-50+60+485,  (pY-60)+(NotationVerGaps*rowNo)+30,  103+(NotationHorGaps*2)+350,  (pY-60)+(NotationVerGaps*rowNo)+30,{opacity: 100, "stroke-width": 2});
DBHorLine.hide();

//" Bridge Product horizontal line" its coordinates depandes on coordinates and dimensions of dirstributor,note: tables defenitions are in slides 25 & 26
var BPHorLine = av.g.line(60+(NotationHorGaps*2)-50+60+685,  (pY-60)+(NotationVerGaps*rowNo)+30,  LabelLeft+(NotationHorGaps*2)-50+700,  (pY-60)+(NotationVerGaps*rowNo)+30,{opacity: 100, "stroke-width": 2});
BPHorLine.hide();

//"product under vertical line" its coordinates depandes on coordinates and dimensions of dirstributor,note: tables defenitions are in slides 25 & 26
var PUndVerLine = av.g.line(LabelLeft+(NotationHorGaps*2)-50+850,  (pY-40)+(NotationVerGaps*rowNo)+35,  LabelLeft+(NotationHorGaps*2)-50+850,  (pY-40)+(NotationVerGaps*rowNo)+130,{opacity: 100, "stroke-width": 2});
PUndVerLine.hide();

//"distributor 2nd table up vertical line" its coordinates depandes on coordinates and dimensions of dirstributor,note: tables defenitions are in slides 25 & 26
var D2upVerLine = av.g.line(LabelLeft+(NotationHorGaps*2)-50+850,  (pY-40)+(NotationVerGaps*rowNo)+35,  LabelLeft+(NotationHorGaps*2)-50+850,  (pY-40)+(NotationVerGaps*rowNo)+105,{opacity: 100, "stroke-width": 2});
D2upVerLine.hide();

//"country right horizontal line" its coordinates depandes on coordinates and dimensions of country,note: tables defenitions are in slides 25 & 26
var CrightHorLine = av.g.line(60+(NotationHorGaps*2)+350+245,  (pY-40)+(NotationVerGaps*rowNo)+130,  LabelLeft+(NotationHorGaps*2)-50+850,  (pY-40)+(NotationVerGaps*rowNo)+130,{opacity: 100, "stroke-width": 2});
CrightHorLine.hide();

//"distributor 2nd table left horizontal line" its coordinates depandes on coordinates and dimensions of country,note: tables defenitions are in slides 25 & 26
var D2LeftHorLine = av.g.line(60+(NotationHorGaps*2)+350+245,  (pY-40)+(NotationVerGaps*rowNo)+130,  LabelLeft+(NotationHorGaps*2)-50+800,  (pY-40)+(NotationVerGaps*rowNo)+130,{opacity: 100, "stroke-width": 2});
D2LeftHorLine.hide();

//"Bridge 1 and bridge 2 country vertical line" its coordinates depandes on coordinates and dimensions of country,note: tables defenitions are in slides 25 & 26
var BCVerLine = av.g.line(60+(NotationHorGaps*2)+350+190,  (pY-40)+(NotationVerGaps*rowNo)+105,  60+(NotationHorGaps*2)+350+190,  (pY-40)+(NotationVerGaps*rowNo)+45,{opacity: 100, "stroke-width": 2});
BCVerLine.hide();

//"Bridge 3 country vertical line" its coordinates depandes on coordinates and dimensions of country,note: tables defenitions are in slides 25 & 26
var B3CVerLine = av.g.line(60+(NotationHorGaps*2)+350+190,  (pY-40)+(NotationVerGaps*rowNo)+105,  60+(NotationHorGaps*2)+350+190,  (pY-40)+(NotationVerGaps*rowNo)+60,{opacity: 100, "stroke-width": 2});
B3CVerLine.hide();

//Relations cardinalities first letter refers to table name B bridge c country d distributor p product next to letter is direction up,down, left or right
var Cup=av.label("<span style='color:blue;'>1</span>", {left: 60+(NotationHorGaps*2)+350+195, top: (pY-40)+(NotationVerGaps*rowNo)+70 });
Cup.css({"font-weight": "bold", "font-size": 15});
Cup.hide();

var Bdown=av.label("<span style='color:blue;'>M</span>", {left: 60+(NotationHorGaps*2)+350+195, top: (pY-40)+(NotationVerGaps*rowNo)+30 });
Bdown.css({"font-weight": "bold", "font-size": 15});
Bdown.hide();

var B3downM=av.label("<span style='color:blue;'>M</span>", {left: 60+(NotationHorGaps*2)+350+195, top: (pY-40)+(NotationVerGaps*rowNo)+45 });
B3downM.css({"font-weight": "bold", "font-size": 15});
B3downM.hide();

var B3down1=av.label("<span style='color:blue;'>1</span>", {left: 60+(NotationHorGaps*2)+350+195, top: (pY-40)+(NotationVerGaps*rowNo)+45 });
B3down1.css({"font-weight": "bold", "font-size": 15});
B3down1.hide();

var BLeft=av.label("<span style='color:blue;'>M</span>", {left: 60+(NotationHorGaps*2)-60+50+485, top: (pY-50)+(NotationVerGaps*rowNo)-15 });
BLeft.css({"font-weight": "bold", "font-size": 15});
BLeft.hide();

var Bright=av.label("<span style='color:blue;'>M</span>", {left: LabelLeft+(NotationHorGaps*2)-50+705, top: (pY-50)+(NotationVerGaps*rowNo)-15 });
Bright.css({"font-weight": "bold", "font-size": 15});
Bright.hide();

var Dright=av.label("<span style='color:blue;'>1</span>", {left: 103+(NotationHorGaps*2)+355, top: (pY-50)+(NotationVerGaps*rowNo)-15 });
Dright.css({"font-weight": "bold", "font-size": 15});
Dright.hide();

var PLeft=av.label("<span style='color:blue;'>1</span>", {left: LabelLeft+(NotationHorGaps*2)-50+785, top: (pY-50)+(NotationVerGaps*rowNo)-15 });
PLeft.css({"font-weight": "bold", "font-size": 15});
PLeft.hide();

var CLeft=av.label("<span style='color:blue;'>N</span>", {left: 60+(NotationHorGaps*2)+350+130, top: (pY-40)+(NotationVerGaps*rowNo)+95 });
CLeft.css({"font-weight": "bold", "font-size": 15});
CLeft.hide();

var Cright=av.label("<span style='color:blue;'>N</span>", {left: 60+(NotationHorGaps*2)+350+250, top: (pY-40)+(NotationVerGaps*rowNo)+95 });
Cright.css({"font-weight": "bold", "font-size": 15});
Cright.hide();

var Ddown=av.label("<span style='color:blue;'>M</span>", {left: 65+(NotationHorGaps*2)+350, top: (pY-40)+(NotationVerGaps*rowNo)+20 });
Ddown.css({"font-weight": "bold", "font-size": 15});
Ddown.hide();

var Pdown=av.label("<span style='color:blue;'>M</span>", {left: LabelLeft+5+(NotationHorGaps*2)-50+850, top: (pY-40)+(NotationVerGaps*rowNo)+20 });
Pdown.css({"font-weight": "bold", "font-size": 15});
Pdown.hide();

var D2Left=av.label("<span style='color:blue;'>M</span>", {left: LabelLeft+(NotationHorGaps*2)-50+783, top: (pY-40)+(NotationVerGaps*rowNo)+95 });
D2Left.css({"font-weight": "bold", "font-size": 15});
D2Left.hide();

var D2Left1=av.label("<span style='color:blue;'>1</span>", {left: LabelLeft+(NotationHorGaps*2)-50+783, top: (pY-40)+(NotationVerGaps*rowNo)+95 });
D2Left1.css({"font-weight": "bold", "font-size": 15});
D2Left1.hide();

var D2Up=av.label("<span style='color:blue;'>N</span>", {left: LabelLeft+(NotationHorGaps*2)-50+853, top: (pY-40)+(NotationVerGaps*rowNo)+70 });
D2Up.css({"font-weight": "bold", "font-size": 15});
D2Up.hide();

//lines connecting matrices in slide 35 so Mtrx referes to matrix not rectangles like above Lines
//each line here has its two cardinality labels below itself

//original distributor matrix line down connecting it to distributor/country bridge
var DMtrxDwnLine = av.g.line(480, 135,  480, 195,{opacity: 100, "stroke-width": 2});
DMtrxDwnLine.hide();
var DMtrxDwnCardLab=av.label("<span style='color:blue;'>1</span>", {left: 483, top:120 });
DMtrxDwnCardLab.css({"font-weight": "bold", "font-size": 15});
DMtrxDwnCardLab.hide();
var DistConBdgMtrxUpCardLab=av.label("<span style='color:blue;'>M</span>", {left: 483, top:165 });
DistConBdgMtrxUpCardLab.css({"font-weight": "bold", "font-size": 15});
DistConBdgMtrxUpCardLab.hide();

//line connecting country to original distributor/country bridge
var DistConBdgMtrxRgtLine = av.g.line(593, 280,  690, 280,{opacity: 100, "stroke-width": 2});
DistConBdgMtrxRgtLine.hide();
var ConMtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 680, top:245 });
ConMtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
ConMtrxLeftCardLab.hide();
var DistConBdgMtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 595, top:245 });
DistConBdgMtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
DistConBdgMtrxRgtCardLab.hide();

//line connecting country to original bridge 1 (product/country bridge with price)
var Bdg1ConMtrxVerLine = av.g.line(765, 165,  765, 245,{opacity: 100, "stroke-width": 2});
Bdg1ConMtrxVerLine.hide();
var ConMtrxUPCardLab=av.label("<span style='color:blue;'>M</span>", {left: 767, top:150 });
ConMtrxUPCardLab.css({"font-weight": "bold", "font-size": 15});
ConMtrxUPCardLab.hide();
var Bdg1MtrxDwnCardLab=av.label("<span style='color:blue;'>1</span>", {left: 767, top:213 });
Bdg1MtrxDwnCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxDwnCardLab.hide();

//line connecting product to original bridge 1 (product/country bridge with price)
var Bdg1ProdMtrxHorLine = av.g.line(825, 90,  910, 90,{opacity: 100, "stroke-width": 2});
Bdg1ProdMtrxHorLine.hide();
var ProdMtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 900, top:55 });
ProdMtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
ProdMtrxLeftCardLab.hide();
var Bdg1MtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 825, top:55 });
Bdg1MtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxRgtCardLab.hide();

  // Slide 1
  av.umsg(interpret("Here are the problems' statments").bold().big());
  // hide all of the empty rows
  for (var i=0; i < themMatrix2.length; i++)
  {
    matrx1._arrays[i].hide();
    matrx2._arrays[i].hide();
    matrx3._arrays[i].hide();
  }
  av.displayInit(1);
  //Prob1Label.hide();
  //Prob1Statment.hide();
  //Prob2Label.hide();
  //Prob2Statment.hide();
  
//cx=(mainline1X1+((mainline1X2-mainline1X1)/2));
//cy= (mainline1Y1+((mainline1Y2-mainline1Y1)/2));
//cRadius=(mainline1X2-mainline1X1)/2;
//av.g.circle(cx,cy ,cRadius , {stroke: "red","stroke-width": 2});
av.step();

//slide 2
av.umsg(interpret("General steps for solving both problems of store X and store Y").bold().big());
  Prob1Label.hide();
  Prob1Statment.hide();
  Prob2Label.hide();
  Prob2Statment.hide();
  var step1=av.label("<span style='color:blue;'>1- Defining main entities and their attributes</span>", {left: 60, top: arrayTop-70 });
  step1.css({"font-weight": "bold", "font-size": 16});
  var step2=av.label("<span style='color:blue;'>2- Determine any additional (i.e. relational attributes) to be added to solution</span>", {left: 60, top: arrayTop-40 });
  step2.css({"font-weight": "bold", "font-size": 16});
  var step3=av.label("<span style='color:blue;'>3- Identify example dataset containing all cases defined in the problem specification</span>", {left: 60, top: arrayTop-10 });
  step3.css({"font-weight": "bold", "font-size": 16});
  var noteA=av.label("<span style='color:red;'><i>Note:</i></span><span style='color:green;'> Some detailed attributes are removed from example dataset for illustration</span>", {left: 80, top: arrayTop+10 });
  noteA.css({"font-weight": "bold", "font-size": 16});
  var step4=av.label("<span style='color:blue;'>4- Discuss pros and cons of all possible solutions to determine the correct one</span>", {left: 60, top: arrayTop+35 });
  step4.css({"font-weight": "bold", "font-size": 16});
  var noteB=av.label("<span style='color:red;'><i>Note:</i></span><span style='color:green;'> All suggested solutions will be tested by using example dataset defined in step 3</span>", {left: 80, top: arrayTop+55 });
  noteB.css({"font-weight": "bold", "font-size": 16});
av.step();


// slide 3
av.umsg(interpret("1- Defining main entities and their attributes").bold().big());
step1.hide();
step2.hide();
step3.hide();
step4.hide();
noteA.hide();
noteB.hide();
var DistEntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 90, {"stroke-width": 3});
  var DistEntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 30, {"stroke-width": 3});
  var DistLab=av.label("<span style='color:red;'>Distributor</span>", {left: 60+(NotationHorGaps*2)+13, top:(pY-65)+(NotationVerGaps*rowNo)});
  DistLab.css({"font-weight": "bold", "font-size": 16});
  var DistAtt1=av.label("<span style='color:red;'>d_no.</span>", {left: 60+(NotationHorGaps*2)+10, top:(pY-30)+(NotationVerGaps*rowNo)});
  DistAtt1.css({ "font-size": 16,"text-decoration": "underline"});
  var DistAtt2=av.label("<span style='color:red;'>d_name</span>", {left: 60+(NotationHorGaps*2)+10, top:(pY-10)+(NotationVerGaps*rowNo)});
  DistAtt2.css({"font-size": 16});
  NotationHorGaps=NotationHorGaps+100;
  var ContEntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 90, {"stroke-width": 3});
  var ContEntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 30, {"stroke-width": 3});
  var ContLab=av.label("<span style='color:red;'>Country</span>", {left: 60+(NotationHorGaps*2)+13, top:(pY-65)+(NotationVerGaps*rowNo)});
  ContLab.css({"font-weight": "bold", "font-size": 16});
  var ContAtt1=av.label("<span style='color:red;'>C_no.</span>", {left: 60+(NotationHorGaps*2)+10, top:(pY-30)+(NotationVerGaps*rowNo)});
  ContAtt1.css({ "font-size": 16,"text-decoration": "underline"});
  var ContAtt2=av.label("<span style='color:red;'>C_name</span>", {left: 60+(NotationHorGaps*2)+10, top:(pY-10)+(NotationVerGaps*rowNo)});
  ContAtt2.css({"font-size": 16});
  NotationHorGaps=NotationHorGaps+100;
  var ProdEntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 90, {"stroke-width": 3});
  var ProdEntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 30, {"stroke-width": 3});
  var ProdLab=av.label("<span style='color:red;'>Product</span>", {left: 60+(NotationHorGaps*2)+13, top:(pY-65)+(NotationVerGaps*rowNo)});
  ProdLab.css({"font-weight": "bold", "font-size": 16});
  var ProdAtt1=av.label("<span style='color:red;'>P_no.</span>", {left: 60+(NotationHorGaps*2)+10, top:(pY-30)+(NotationVerGaps*rowNo)});
  ProdAtt1.css({ "font-size": 16,"text-decoration": "underline"});
  var ProdAtt2=av.label("<span style='color:red;'>P_name</span>", {left: 60+(NotationHorGaps*2)+10, top:(pY-10)+(NotationVerGaps*rowNo)});
  ProdAtt2.css({"font-size": 16});
  av.step();

  //slide 4
  DistEntityRecLab.hide();
  DistEntityRecLabAtt.hide();
  DistLab.hide();
  DistAtt1.hide();
  DistAtt2.hide();
  ContEntityRecLab.hide();
  ContEntityRecLabAtt.hide();
  ContLab.hide();
  ContAtt1.hide();
  ContAtt2.hide();
  ProdEntityRecLab.hide();
  ProdEntityRecLabAtt.hide();
  ProdLab.hide();
  ProdAtt1.hide();
  ProdAtt2.hide();
  av.umsg(interpret("2- Determine any additional (i.e. relational attributes) to be added to solution").bold().big());
  var PriceRElAttLabel=av.label("<span style='color:blue;'>As mentioned in both problems of store X and store Y specifications:</span>", {left: 60, top: arrayTop-70 });
  PriceRElAttLabel.css({"font-weight": "bold", "font-size": 16});
  var PriceStoreX=av.label("<span style='color:red;'><u>Store X problem states that</u></span><span style='color:blue;'><i> In this case each distributor can set different price for each product type.</i></span>", {left: 60, top: arrayTop-40 });
  PriceStoreX.css({"font-weight": "bold", "font-size": 16});
  var PriceStoreY=av.label("<span style='color:red;'><u>Store Y problem states that</u></span><span style='color:blue;'><i> The price of each product is set differently for each country.</i></span>", {left: 60, top: arrayTop-10 });
  PriceStoreY.css({"font-weight": "bold", "font-size": 16});
  var Conlusion=av.label("<span style='color:red;'><u>Then:</u></span> <span style='color:purple;'><u>price</u></span> should be a <i><span style='color:purple;'>relational attribute</span></i> as its value depends on more that one entity or the relation between entities as stated in both problems (<span style='color:red;'>e.g.</span>  price value for a product is determined by specific distributor for specific country) </span>", {left: 60, top: arrayTop+20 });
  Conlusion.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 5
  PriceRElAttLabel.hide();
  PriceStoreX.hide();
  PriceStoreY.hide();
  Conlusion.hide();
  av.umsg(interpret("3-Identifying example dataset illustrating which product sold by whom in which country with a specific price").bold().big());
  var StoreXDatasetLab=av.label("<span style='color:blue;'>Store X test dataset Example:</span>", {left: 60, top:-20 });
  StoreXDatasetLab.css({"font-weight": "bold", "font-size": 16});
  var theDataSetX = [["Country","Product","Distributer","Price"],["Egypt","TV","ali","3000"],["Egypt","watch","ali","5000"],["Egypt","blender","adam","2500"],["Egypt","blender","tarek","2300"],["USA","TV","adam","4500"],["USA","watch","ali","4700"],["USA","blender","tarek","2000"],["UK","TV","adam","4000"],["UK","blender","adam","3000"]];
  var RealDataSetX= av.ds.matrix(theDataSetX, {style: "table", top: 0, left: 60 });
  RealDataSetX._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  var StoreYDatasetLab=av.label("<span style='color:blue;'>Store Y test dataset Example:</span>", {left: 600, top:-20 });
  StoreYDatasetLab.css({"font-weight": "bold", "font-size": 16});
  var theDataSetY = [["Country","Product","Distributer","Price"],["Egypt","TV","ali","3000"],["Egypt","watch","ali","5000"],["UK","blender","ali","2500"],["UK","watch","ali","2300"],["USA","TV","adam","4500"],["USA","watch","adam","4700"],["USA","blender","adam","2000"],["lebanon","TV","morad","4000"],["lebanon","blender","morad","3000"]];
  var RealDataSetY= av.ds.matrix(theDataSetY, {style: "table", top: 0, left: 600 });
  RealDataSetY._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  var Note1Lab=av.label("<span style='color:red;'><u>Note1:</u></span>", {left: 500, top: arrayTop+260 });
  Note1Lab.css({"font-weight": "bold", "font-size": 24});
  
  
  Mtrix1Lab.hide();
  Mtrix2Lab.hide();
  Mtrix3Lab.hide();
   // hide all of the empty rows
   for (var i=0; i < themMatrix2.length; i++)
   {
     matrx1._arrays[i].hide();
     matrx2._arrays[i].hide();
     matrx3._arrays[i].hide();
   }
  av.step();

  //slide 6
  Note1Lab.hide();
  var Note1=av.label("<span style='color:red;'><u>Note1:</u></span> Certain technical attributes <i>(such as the product number, distributor number)</i> have been omitted from these datasets to keep it clear and simple", {left: 60, top: arrayTop+260 });
  Note1.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 7
  Note1.hide();
  var Note2Lab=av.label("<span style='color:red;'><u>Note2:</u></span>", {left: 500, top: arrayTop+260 });
  Note2Lab.css({"font-weight": "bold", "font-size": 24});
  av.step();

  //slide 8
  Note2Lab.hide();
  var Note2=av.label("<span style='color:red;'><u>Note2:</u></span> This data will be used for testing suggested solutions <i>(<span style='color:red;'>i.e.</span> The correct solution for each store is the one that can represent & retrive all information in the store's dataset given here)</i>", {left: 60, top: arrayTop+260 });
  Note2.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 9
  Note2.hide();
  var Note3Lab=av.label("<span style='color:red;'><u>Note3:</u></span>", {left: 500, top: arrayTop+260 });
  Note3Lab.css({"font-weight": "bold", "font-size": 24});
  av.step();

  //slide 10
  Note3Lab.hide();
  var Note3=av.label("<span style='color:red;'><u>Note3:</u></span> There is a difference between the datasets' of stores X and Y, which represents the two different policies of the stores according to their specifications given in the problem", {left: 60, top: arrayTop+260 });
  Note3.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 11
  Note3.hide();
  var Note4Lab=av.label("<span style='color:red;'><u>Note4:</u></span>", {left: 500, top: arrayTop+260 });
  Note4Lab.css({"font-weight": "bold", "font-size": 24});
  av.step();

  //slide 12
  Note4Lab.hide();
  var Note4=av.label("<span style='color:red;'><u>Note4:</u></span> The dataset of store X reflects its policy where each country has many distributors and each distributor can sell different  products in many countries with different  prices determined by him.<span style='color:red;'><i> (as shown in stores X dataset above)</i></span>", {left: 60, top: arrayTop+260 });
  Note4.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 13
  Note4.hide();
  var ExampleStoreXdata=av.label("<span style='color:red;'><u>For Example IN store X:</u></span> <span style='color:green;'> USA country</span> has three different distributors <i>(adam, ali, tarek)</i> .<span style='color:red;'><i> (as shown in stores X dataset above)</i></span>", {left: 60, top: arrayTop+260 });
  ExampleStoreXdata.css({"font-weight": "bold", "font-size": 16});
  //to highlight egypt country with three different distributors
  RealDataSetX._arrays[5].highlight(0);
  RealDataSetX._arrays[6].highlight(0);
  RealDataSetX._arrays[7].highlight(0);
  var DistXEllipse=av.g.ellipse(310,210 ,25 ,50, {"stroke-width": 3, "stroke":"red"});
  av.step();

  //slide 14
  ExampleStoreXdata.hide();
  var Note4Cont=av.label("<span style='color:red;'><u>Note4Continue:</u></span> while store Y policy is assigning only one distributor for each country, but each distributor can sell products in many countries, prices of same products differ according to each country.<span style='color:red;'><i> (as shown in stores Y dataset above)</i></span>", {left: 60, top: arrayTop+260 });
  Note4Cont.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 15
  Note4Cont.hide();
  var ExampleStoreYdata=av.label("<span style='color:red;'><u>But in Store Y Example:</u></span> Each country <span style='color:green;'>(e.g. USA)</span> <u>must have only one distributor</u> for all the product sold there <span style='color:green;'>(e.g. adam)</span>.<span style='color:red;'><i> (as shown in stores Y dataset above)</i></span>", {left: 60, top: arrayTop+260 });
  ExampleStoreYdata.css({"font-weight": "bold", "font-size": 16});
 //to highlight egypt country with three different distributors
 RealDataSetY._arrays[5].highlight(0);
 RealDataSetY._arrays[6].highlight(0);
 RealDataSetY._arrays[7].highlight(0);
 var DistYEllipse=av.g.ellipse(850,210 ,25 ,50, {"stroke-width": 3, "stroke":"red"});
  av.step();

   //slide 16
   ExampleStoreYdata.hide();
   DistYEllipse.hide();
   DistXEllipse.hide();
   var ExampleStoreXdataCont1=av.label("<span style='color:red;'><u>And In store X:</u></span> <span style='color:green;'>distributor adam</span> works for three different countries <i>(Egypt, USA, UK)</i> .<span style='color:red;'><i> (as shown in stores X dataset above)</i></span>", {left: 60, top: arrayTop+260 });
   ExampleStoreXdataCont1.css({"font-weight": "bold", "font-size": 16});
   RealDataSetX._arrays[5].unhighlight(0);
   RealDataSetX._arrays[6].unhighlight(0);
   RealDataSetX._arrays[7].unhighlight(0);
   RealDataSetY._arrays[5].unhighlight(0);
 RealDataSetY._arrays[6].unhighlight(0);
 RealDataSetY._arrays[7].unhighlight(0);
   //to highlight distributor adam
   RealDataSetX._arrays[3].highlight(2);
   RealDataSetX._arrays[5].highlight(2);
   RealDataSetX._arrays[8].highlight(2);
   var cellSteps=3;
   var cellhight=15;
   var contry1ellipse=av.g.ellipse(95,120 ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   var contry2ellipse=av.g.ellipse(95,120+((cellSteps+1)*cellhight) ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   cellSteps=9;
   var contry3ellipse=av.g.ellipse(95,120+((cellSteps+1)*cellhight) ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   av.step();

   //slide 17
   ExampleStoreXdataCont1.hide();
   var ExampleStoreYdataCont1=av.label("<span style='color:red;'><u>And also In store Y:</u></span> distributor can work in many countries (e.g.) <span style='color:green;'>distributor ali</span> works for two countries <i>(Egypt, UK)</i>.<span style='color:red;'><i> (as shown in stores Y dataset above)</i></span>", {left: 60, top: arrayTop+260 });
   ExampleStoreYdataCont1.css({"font-weight": "bold", "font-size": 16});
   RealDataSetY._arrays[3].highlight(2);
   RealDataSetY._arrays[2].highlight(2);
   DistYEllipse=av.g.ellipse(635,105 ,25 ,35, {"stroke-width": 3, "stroke":"red"});
   av.step();

   //slide 18
   ExampleStoreYdataCont1.hide();
   contry1ellipse.hide();
   contry2ellipse.hide();
   contry3ellipse.hide();
   DistYEllipse.hide();
   RealDataSetY._arrays[3].unhighlight(2);
   RealDataSetY._arrays[2].unhighlight(2);
   var ExampleStoreXdataCont2=av.label("<span style='color:red;'><u>Finally In store X :</u></span> <span style='color:green;'>Prices</span> for same product <span style='color:green;'> (as TV)</span>are set differently by different distributors in different countries.   <span style='color:red;'><i> (as shown in stores X dataset above)</i></span>", {left: 60, top: arrayTop+260 });
   ExampleStoreXdataCont2.css({"font-weight": "bold", "font-size": 16});
   RealDataSetX._arrays[1].highlight(0);
   RealDataSetX._arrays[1].highlight(1);
   RealDataSetX._arrays[5].highlight(0);
   RealDataSetX._arrays[5].highlight(1);
   RealDataSetX._arrays[8].highlight(0);
   RealDataSetX._arrays[8].highlight(1);
   RealDataSetX._arrays[1].value(3,"<span style='color:red;'>3000 </span>");
   RealDataSetX._arrays[5].value(3,"<span style='color:red;'>4500 </span>");
   RealDataSetX._arrays[8].value(3,"<span style='color:red;'>4000</span>");
   //to highlight distributor adam
   RealDataSetX._arrays[3].unhighlight(2);
   RealDataSetX._arrays[5].unhighlight(2);
   RealDataSetX._arrays[8].unhighlight(2);
   var cellSteps=3;
   var cellhight=15;
   contry1ellipse=av.g.ellipse(310,60 ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   contry2ellipse=av.g.ellipse(310,120+((cellSteps+1)*cellhight) ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   cellSteps=9;
   contry3ellipse=av.g.ellipse(310,120+((cellSteps+1)*cellhight) ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   av.step();

   //slide 19
   ExampleStoreXdataCont2.hide();
   var Ex1=av.label("<span style='color:red;'><u>Dataset shows that:</u></span> <span style='color:green;'> ali sold TV in Egypt with 3000</span>", {left: 60, top: arrayTop+260 });
   Ex1.css({"font-weight": "bold", "font-size": 15});
   var Ex2=av.label("<span style='color:red;'><u>And:</u></span> <span style='color:green;'> adam sold the same TV in USA with 4500</span>", {left: 60, top: arrayTop+280 });
   Ex2.css({"font-weight": "bold", "font-size": 15});
   var Ex3=av.label("<span style='color:red;'><u>And also:</u></span> <span style='color:green;'> The same distributor adam sold the same TV in other different country UK with different price 4000</span>", {left: 60, top: arrayTop+300 });
   Ex3.css({"font-weight": "bold", "font-size": 15});
   av.step();

   //slide 20
   RealDataSetX._arrays[1].unhighlight(0);
   RealDataSetX._arrays[1].unhighlight(1);
   RealDataSetX._arrays[5].unhighlight(0);
   RealDataSetX._arrays[5].unhighlight(1);
   RealDataSetX._arrays[8].unhighlight(0);
   RealDataSetX._arrays[8].unhighlight(1);
   Ex1.hide();
   Ex2.hide();
   Ex3.hide();
   contry1ellipse.hide();
   contry2ellipse.hide();
   contry3ellipse.hide();
   RealDataSetX._arrays[1].value(3,"<span style='color:black;'>3000 </span>");
   RealDataSetX._arrays[5].value(3,"<span style='color:black;'>4500 </span>");
   RealDataSetX._arrays[8].value(3,"<span style='color:black;'>4000</span>");
   var ExampleStoreXdataCont2=av.label("<span style='color:red;'><u>While In store Y policy :</u></span> <span style='color:green;'>Price</span> of product <span style='color:green;'> (as TV)</span> is determined according to the country where the product is sold regardless of who will sell the product as each country has only one distributor.<span style='color:red;'><i> (as shown in stores X dataset above)</i></span>", {left: 60, top: arrayTop+260 });
   ExampleStoreXdataCont2.css({"font-weight": "bold", "font-size": 16});
   var Ex3=av.label("<span style='color:red;'><u>Note:</u></span>  <span style='color:green;'> TV product</span> has three different prices one for <span style='color:green;'>Egypt</span> , one for <span style='color:green;'>USA</span> , and third price for <span style='color:green;'>lebanon</span>", {left: 60, top: arrayTop+305 });
   Ex3.css({"font-weight": "bold", "font-size": 16});
   RealDataSetY._arrays[1].highlight(1);
   RealDataSetY._arrays[5].highlight(1);
   RealDataSetY._arrays[8].highlight(1);
   RealDataSetY._arrays[1].value(3,"<span style='color:red;'>3000 </span>");
   RealDataSetY._arrays[5].value(3,"<span style='color:red;'>4500 </span>");
   RealDataSetY._arrays[8].value(3,"<span style='color:red;'>4000</span>");
   contry1ellipse=av.g.ellipse(635,60 ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   cellSteps=3;
   contry2ellipse=av.g.ellipse(635,120+((cellSteps+1)*cellhight) ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   cellSteps=9;
   contry3ellipse=av.g.ellipse(635,120+((cellSteps+1)*cellhight) ,40 ,15, {"stroke-width": 3, "stroke":"red"});
   av.step();

   //slide 21
   ExampleStoreXdataCont2.hide();
   Ex3.hide();
   RealDataSetY._arrays[5].unhighlight(1);
   RealDataSetY._arrays[8].unhighlight(1);
   RealDataSetY._arrays[5].value(3,"<span style='color:black;'>4500 </span>");
   RealDataSetY._arrays[8].value(3,"<span style='color:black;'>4000</span>");
   contry1ellipse.hide();
   contry2ellipse.hide();
   contry3ellipse.hide();
   var ExampleBothStoresYdata=av.label("<span style='color:red;'><u>In store Y policy :</u></span> each product has <span style='color:green;'>only one price per country</span> as it is only sold by one distributer.<span style='color:red;'><i> ( look at TV in Egypt in store Y dataset above)</i></span>", {left: 60, top: arrayTop+260 });
   ExampleBothStoresYdata.css({"font-weight": "bold", "font-size": 15});
   av.step();

   //slide 22
   var ExampleBothStoresXdata=av.label("<span style='color:red;'><u>The case in store X policy is different :</u></span> each product can has <span style='color:green;'> more than one price per country</span> if it is sold by many distributers in the same country.<span style='color:red;'><i> ( look at blender in Egypt in store X dataset above)</i></span>", {left: 60, top: arrayTop+290 });
   ExampleBothStoresXdata.css({"font-weight": "bold", "font-size": 15});
   RealDataSetX._arrays[3].highlight(1);
   RealDataSetX._arrays[4].highlight(1);
   RealDataSetX._arrays[3].value(3,"<span style='color:red;'>2500 </span>");
   RealDataSetX._arrays[4].value(3,"<span style='color:red;'>2300</span>");
   contry1ellipse=av.g.ellipse(95,135 ,25 ,35, {"stroke-width": 3, "stroke":"red"});
   RealDataSetX._arrays[3].value(2,"<span style='color:blue;'>adam </span>");
   RealDataSetX._arrays[4].value(2,"<span style='color:blue;'>tarek</span>");
   av.step();

   //slide 23
   ExampleBothStoresYdata.hide();
   ExampleBothStoresXdata.hide();
   var Conclusion=av.label("<span style='color:red;'><u>Conclusion & Problem Summary:</u></span>", {left: 420, top: arrayTop+240 });
   Conclusion.css({"font-weight": "bold", "font-size": 19});
   var ConclusionX=av.label("<span style='color:red;'><u>STORE X</u></span>-----> each country ----->many distributors <span style='color:red;'><u>THEN</u></span> <span style='color:green;'>product price</span>-----> based on -----> <span style='color:green;'>(distributor+country)</span> <span style='color:red;'>SO</span> <span style='color:red;'> <span style='color:green;'>many</span> prices/distributor/country", {left: 40, top: arrayTop+270 });
   ConclusionX.css({"font-weight": "bold", "font-size": 15});
   var ConclusionY=av.label("<span style='color:red;'><u>STORE Y</u></span>-----> each country ----->one distributor <span style='color:red;'><u>THEN</u></span> <span style='color:green;'>product price</span>-----> based on -----> <span style='color:green;'>(country)</span> <span style='color:red;'>SO</span> <span style='color:red;'> <span style='color:green;'>one</span> price/country", {left: 40, top: arrayTop+290 });
   ConclusionY.css({"font-weight": "bold", "font-size": 15});
   av.step();

  //slide 24
  av.umsg("");
  RealDataSetX._arrays[3].value(3,"<span style='color:black;'>2500 </span>");
  RealDataSetX._arrays[4].value(3,"<span style='color:black;'>2300</span>");
  contry1ellipse.hide();
  RealDataSetY._arrays[1].value(3,"<span style='color:black;'>3000 </span>");
  RealDataSetX._arrays[3].value(2,"<span style='color:black;'>adam </span>");
  RealDataSetX._arrays[4].value(2,"<span style='color:black;'>tarek</span>");
  RealDataSetX._arrays[3].unhighlight(1);
  RealDataSetX._arrays[4].unhighlight(1);
  RealDataSetY._arrays[1].unhighlight(1);
  Conclusion.hide();
  ConclusionX.hide();
  ConclusionY.hide();
   StoreXDatasetLab.hide();
   StoreYDatasetLab.hide();
 for (var i=0; i < theDataSetY.length; i++)
  {
   RealDataSetX._arrays[i].hide();
   RealDataSetY._arrays[i].hide();
   
  }
  var TryToTHink=av.label("<span style='color:red;'>WARNNING: -----> <span style='color:blue;'>Think</span>, <span style='color:orange;'>Think</span>, <span style='color:green;'>Think</span> alone</span>", {left: 310, top: arrayTop-60 });
  TryToTHink.css({"font-weight": "bold", "font-size": 24});
  var wisdom1=av.label("<span style='color:blue;'>Try to think of answers for both problems & write them down in your paper before jumping to next slide.</span>", {left: 40, top: arrayTop+20 });
  wisdom1.css({"font-weight": "bold", "font-size": 18});

  var wisdom2=av.label("<span style='color:blue;'>Is your solution one of the suggested solutions in the next slide??</span>", {left: 40, top: arrayTop+70 });
  wisdom2.css({"font-weight": "bold", "font-size": 18});

  var wisdom3=av.label("<span style='color:blue;'>If so wait to know weather your solution is right or wrong.</span>", {left: 40, top: arrayTop+120 });
  wisdom3.css({"font-weight": "bold", "font-size": 18});
  av.step();

  //slide 25
  TryToTHink.hide();
  wisdom1.hide();
  wisdom2.hide();
  wisdom3.hide();
  av.umsg(interpret("4- Discuss pros and cons of all possible solutions to determine the correct one").bold().big());

  //store x solutions
  var StoreXsolutions=av.label("<span style='color:red;'><u>STORE X Suggested Solutions</u></span>", {left: 40, top: arrayTop-70+165 });
  StoreXsolutions.css({"font-weight": "bold", "font-size": 15});
 
  //four poosible solutions only one is correct
  var StoreXSecondsol=av.label("<span style='color:red;'>First Sol.:</span> <span style='color:blue;'> Two binary relations</span> <span style='color:green;'>(N:M country/product relation including price attribute)</span> & <span style='color:green;'>(N:M country/distributor)</span>", {left: 40, top: arrayTop-40+165 });
  StoreXSecondsol.css({"font-weight": "bold", "font-size": 14});

  var DistEntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 60, {"stroke-width": 3});
   var DistEntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 20, {"stroke-width": 3});
   var DistLab=av.label("<span style='color:red;'>Distributor</span>", {left: 60+(NotationHorGaps*2)-100, top:(pY-80)+(NotationVerGaps*rowNo)});
   DistLab.css({"font-weight": "bold", "font-size": 14});
   var DistAtt1=av.label("<span style='color:red;'>d_no.</span>", {left: 60+(NotationHorGaps*2)-100, top:(pY-55)+(NotationVerGaps*rowNo)});
   DistAtt1.css({ "font-size": 14,"text-decoration": "underline"});
   var DistAtt2=av.label("<span style='color:red;'>d_name</span>", {left: 60+(NotationHorGaps*2)-100, top:(pY-40)+(NotationVerGaps*rowNo)});
   DistAtt2.css({"font-size": 14});
 
   NotationHorGaps=NotationHorGaps+100;
   var ContEntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15+130, 100, 60, {"stroke-width": 3});
   var ContEntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15+130, 100, 20, {"stroke-width": 3});
   var ContLab=av.label("<span style='color:red;'>Country</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-80)+(NotationVerGaps*rowNo)+130});
   ContLab.css({"font-weight": "bold", "font-size": 14});
   var ContAtt1=av.label("<span style='color:red;'>C_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-55)+(NotationVerGaps*rowNo)+130});
   ContAtt1.css({ "font-size": 14,"text-decoration": "underline"});
   var ContAtt2=av.label("<span style='color:red;'>C_name</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-40)+(NotationVerGaps*rowNo)+130});
   ContAtt2.css({"font-size": 14});

  var Bridge1EntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 70, {"stroke-width": 3});
  var Bridge1EntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 20, {"stroke-width": 3});
  var Bridge1Lab=av.label("<span style='color:red;'>Bridge</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-80)+(NotationVerGaps*rowNo)});
  Bridge1Lab.css({"font-weight": "bold", "font-size": 14});
  var Bridge1Att1=av.label("<span style='color:red;'>C_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-55)+(NotationVerGaps*rowNo)});
  Bridge1Att1.css({ "font-size": 14,"text-decoration": "underline"});
  var Bridge1Att2=av.label("<span style='color:red;'>P_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-40)+(NotationVerGaps*rowNo)});
  Bridge1Att2.css({"font-size": 14,"text-decoration": "underline"});
  var Bridge1Att3=av.label("<span style='color:red;'>Price</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-25)+(NotationVerGaps*rowNo)});
  Bridge1Att3.css({"font-size": 14});

  var Bridge2EntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 70, {"stroke-width": 3});
  Bridge2EntityRecLab.hide();
  var Bridge2EntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 20, {"stroke-width": 3});
  Bridge2EntityRecLabAtt.hide();
  var Bridge2Lab=av.label("<span style='color:red;'>Bridge</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-80)+(NotationVerGaps*rowNo)});
  Bridge2Lab.css({"font-weight": "bold", "font-size": 14});
  Bridge2Lab.hide();
  var Bridge2Att1=av.label("<span style='color:red;'>d_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-55)+(NotationVerGaps*rowNo)});
  Bridge2Att1.css({ "font-size": 14,"text-decoration": "underline"});
  Bridge2Att1.hide();
  var Bridge2Att2=av.label("<span style='color:red;'>P_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-40)+(NotationVerGaps*rowNo)});
  Bridge2Att2.css({"font-size": 14,"text-decoration": "underline"});
  Bridge2Att2.hide();
  var Bridge2Att3=av.label("<span style='color:red;'>Price</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-25)+(NotationVerGaps*rowNo)});
  Bridge2Att3.css({"font-size": 14});
  Bridge2Att3.hide();

  var Bridge3EntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 90, {"stroke-width": 3});
  Bridge3EntityRecLab.hide();
  var Bridge3EntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 20, {"stroke-width": 3});
  Bridge3EntityRecLabAtt.hide();
  var Bridge3Lab=av.label("<span style='color:red;'>Bridge</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-80)+(NotationVerGaps*rowNo)});
  Bridge3Lab.css({"font-weight": "bold", "font-size": 14});
  Bridge3Lab.hide();
  var Bridge3Att1=av.label("<span style='color:red;'>d_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-60)+(NotationVerGaps*rowNo)});
  Bridge3Att1.css({ "font-size": 14,"text-decoration": "underline"});
  Bridge3Att1.hide();
  var Bridge3Att2=av.label("<span style='color:red;'>p_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-45)+(NotationVerGaps*rowNo)});
  Bridge3Att2.css({"font-size": 14,"text-decoration": "underline"});
  Bridge3Att2.hide();
  var Bridge3Att3=av.label("<span style='color:red;'>c_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-30)+(NotationVerGaps*rowNo)});
  Bridge3Att3.css({"font-size": 14,"text-decoration": "underline"});
  Bridge3Att3.hide();
  var Bridge3Att3NotPK=av.label("<span style='color:red;'>c_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-30)+(NotationVerGaps*rowNo)});
  Bridge3Att3NotPK.hide();
  var Bridge3Att4=av.label("<span style='color:red;'>price</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-10)+(NotationVerGaps*rowNo)});
  Bridge3Att4.css({"font-size": 14});
  Bridge3Att4.hide();

  NotationHorGaps=NotationHorGaps+100;
  var ProdEntityRecLab=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 60, {"stroke-width": 3});
  var ProdEntityRecLabAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15, 100, 20, {"stroke-width": 3});
  var ProdLab=av.label("<span style='color:red;'>Product</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-80)+(NotationVerGaps*rowNo)});
  ProdLab.css({"font-weight": "bold", "font-size": 14});
  var ProdAtt1=av.label("<span style='color:red;'>p_no.</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-55)+(NotationVerGaps*rowNo)});
  ProdAtt1.css({ "font-size": 14,"text-decoration": "underline"});
  var ProdAtt2=av.label("<span style='color:red;'>p_name</span>", {left: 60+(NotationHorGaps*2)-90, top:(pY-40)+(NotationVerGaps*rowNo)});
  ProdAtt2.css({"font-size": 14});

  DUndVerLine.show();
  CLeftHorLine.show();
  BCVerLine.show();
  BPHorLine.show();
  Ddown.show();
  CLeft.show();
  Bdown.show();
  Cup.show();
  Bright.show();
  PLeft.show();
  av.step();

  //slide 26
  Bridge1EntityRecLab.hide();
  Bridge1EntityRecLabAtt.hide();
  Bridge1Lab.hide();
  Bridge1Att1.hide();
  Bridge1Att2.hide();
  Bridge1Att3.hide();
  var StoreXThirdsol=av.label("<span style='color:red;'>Second Sol.:</span> <span style='color:blue;'> Two binary relations</span> <span style='color:green;'>(N:M distributor/product relation including price attribute)</span> & <span style='color:green;'>(N:M country/distributor)</span>", {left: 40, top: arrayTop-20 +165});
  StoreXThirdsol.css({"font-weight": "bold", "font-size": 14});
  Bridge2EntityRecLab.show();
  Bridge2EntityRecLabAtt.show();
  Bridge2Lab.show();
  Bridge2Att1.show();
  Bridge2Att2.show();
  Bridge2Att3.show();
  BCVerLine.hide();
  Bdown.hide();
  Cup.hide();
  DBHorLine.show();
  Dright.show();
  BLeft.show();
  av.step();

  //slide 27
  Bridge1EntityRecLab.show();
  Bridge1EntityRecLabAtt.show();
  Bridge1Lab.show();
  Bridge1Att1.show();
  Bridge1Att2.show();
  Bridge1Att3.show();

  Bridge2EntityRecLab.hide();
  Bridge2EntityRecLabAtt.hide();
  Bridge2Lab.hide();
  Bridge2Att1.hide();
  Bridge2Att2.hide();
  Bridge2Att3.hide();
  var StoreXFirstsol=av.label("<span style='color:red;'>Third Sol.:</span> <span style='color:blue;'> Three binary relations</span> <span style='color:green;'> (N:M country/product including price attribute)</span> , <span style='color:green;'>(N:M product/distributor)</span> & <span style='color:green;'>(N:M distributor/country) </span>", {left: 40, top: arrayTop+165 });
  StoreXFirstsol.css({"font-weight": "bold", "font-size": 14});
  var DistEntityRecLabTernary=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15+130, 100, 60, {"stroke-width": 3});
  var DistEntityRecLabAttTernary=av.g.rect(LabelLeft+(NotationHorGaps*2)-50, (pY-50)+(NotationVerGaps*rowNo)-15+130, 100, 20, {"stroke-width": 3});
  var DistLabTernary=av.label("<span style='color:red;'>Distributor</span>", {left:  60+(NotationHorGaps*2)-90, top:(pY-80)+(NotationVerGaps*rowNo)+130});
  DistLabTernary.css({"font-weight": "bold", "font-size": 14});
  var DistAtt1Ternary=av.label("<span style='color:red;'>d_no.</span>", {left:  60+(NotationHorGaps*2)-90, top:(pY-55)+(NotationVerGaps*rowNo)+130});
  DistAtt1Ternary.css({ "font-size": 14,"text-decoration": "underline"});
  var DistAtt2Ternary=av.label("<span style='color:red;'>d_name</span>", {left:  60+(NotationHorGaps*2)-90, top:(pY-40)+(NotationVerGaps*rowNo)+130});
  DistAtt2Ternary.css({"font-size": 14});
  //PUndVerLine.show();
  D2LeftHorLine.show();
  D2upVerLine.show();
  D2Left.show();
  D2Up.show();
  DistEntityRecLab.hide();
  DistEntityRecLabAtt.hide();
  DistLab.hide();
  DistAtt1.hide();
  DistAtt2.hide();
  DBHorLine.hide();
  DUndVerLine.hide();
  CLeftHorLine.hide();
  Ddown.hide();
  CLeft.hide();
  BLeft.hide();
  Dright.hide();
  BCVerLine.show();
  Cright.show();
  Pdown.show();
  Bdown.show();
  Cup.show();
  av.step();

  //slide 28
  Bridge1EntityRecLab.hide();
  Bridge1EntityRecLabAtt.hide();
  Bridge1Lab.hide();
  Bridge1Att1.hide();
  Bridge1Att2.hide();
  Bridge1Att3.hide();

  Bridge3EntityRecLab.show();
  Bridge3EntityRecLabAtt.show();
  Bridge3Lab.show();
  Bridge3Att1.show();
  Bridge3Att2.show();
  Bridge3Att3.show();
  Bridge3Att4.show();

  DistEntityRecLab.show();
  DistEntityRecLabAtt.show();
  DistLab.show();
  DistAtt1.show();
  DistAtt2.show();

  DistEntityRecLabTernary.hide();
  DistEntityRecLabAttTernary.hide();
  DistLabTernary.hide();
  DistAtt1Ternary.hide();
  DistAtt2Ternary.hide();
  D2LeftHorLine.hide();
  D2upVerLine.hide();
  D2Left.hide();
  D2Up.hide();
  Cright.hide();
  Pdown.hide();
  DBHorLine.show();
  Dright.show();
  BLeft.show();
  B3CVerLine.show();
  BCVerLine.hide();
  Bdown.hide();
  B3downM.show();
  var StoreXForthsol=av.label("<span style='color:red;'>Forth Sol.:</span> <span style='color:blue;'> One ternary relation</span> <span style='color:green;'>(N:M:P country/product/distributor relation including price attribute)</span>", {left: 40, top: arrayTop+20+165});
  StoreXForthsol.css({"font-weight": "bold", "font-size": 14});
  av.step();

  //slide 29
  //store y solutions
  var StoreYsolutions=av.label("<span style='color:red;'><u>STORE Y Suggested Solutions</u></span>", {left: 40, top: arrayTop+130+85 });
  StoreYsolutions.css({"font-weight": "bold", "font-size": 15});

  //four poosible solutions only one is correct
  var StoreYSecondsol=av.label("<span style='color:red;'>First Sol.:</span> <span style='color:blue;'> One ternary relation</span> <span style='color:green;'>(N:M:P country/product/distributor relation including price attribute)</span> <span style='color:orange;'><i> (same as store X forth solution)</i></span>", {left: 40, top: arrayTop+170+75 });
  StoreYSecondsol.css({"font-weight": "bold", "font-size": 14});
  av.step();

  //slide 30
  var StoreYThirdsol=av.label("<span style='color:red;'>Second Sol.:</span> <span style='color:blue;'> One ternary relation</span> <span style='color:green;'>(1:N:M country/distributor/product relation including price attribute)</span> <span style='color:orange;'><i> (same as pervious solution except in 1 cardinality)</i></span>", {left: 40, top: arrayTop+190+75 });
  StoreYThirdsol.css({"font-weight": "bold", "font-size": 14});
  Bridge3Att3.hide();
  Bridge3Att3NotPK.show();
  B3downM.hide();
  B3down1.show();
  av.step();

  //slide 31
  var StoreYFirstsol=av.label("<span style='color:red;'>Third Sol.:</span> <span style='color:blue;'> Three binary relations</span> <span style='color:green;'> (N:M country/product including price attribute)</span> , <span style='color:green;'>(N:M product/distributor)</span> & <span style='color:green;'>(1:M distributor/country) </span>", {left: 40, top: arrayTop+210+75 });
  StoreYFirstsol.css({"font-weight": "bold", "font-size": 14});
  Bridge1EntityRecLab.show();
  Bridge1EntityRecLabAtt.show();
  Bridge1Lab.show();
  Bridge1Att1.show();
  Bridge1Att2.show();
  Bridge1Att3.show();

  Bridge3EntityRecLab.hide();
  Bridge3EntityRecLabAtt.hide();
  Bridge3Lab.hide();
  Bridge3Att1.hide();
  Bridge3Att2.hide();
  Bridge3Att3NotPK.hide();
  Bridge3Att4.hide();
  B3down1.hide();
  Bdown.show();
  Pdown.show();
  Cright.show();
  D2Left.hide();

  DBHorLine.hide();
  Dright.hide();
  BLeft.hide();

  B3CVerLine.hide();
  BCVerLine.show();
  

  DistEntityRecLab.hide();
  DistEntityRecLabAtt.hide();
  DistLab.hide();
  DistAtt1.hide();
  DistAtt2.hide();

  DistEntityRecLabTernary.show();
  DistEntityRecLabAttTernary.show();
  DistLabTernary.show();
  DistAtt1Ternary.show();
  DistAtt2Ternary.show();
  D2LeftHorLine.show();
  D2upVerLine.show();
  D2Left1.show();
  D2Up.show();
  av.step();

  //slide 32
   var StoreYForthsol=av.label("<span style='color:red;'>Forth Sol.:</span> <span style='color:blue;'> Two binary relations</span> <span style='color:green;'> (N:M country/product relation including price attribute)</span> & <span style='color:green;'>(1:M distributor/country)</span>", {left: 40, top: arrayTop+230+75 });
   StoreYForthsol.css({"font-weight": "bold", "font-size": 14});
   D2upVerLine.hide();
   D2Up.hide();
   Pdown.hide();
   av.step();

   //slide 33
   StoreXsolutions.hide();
   StoreYsolutions.hide();
   StoreXFirstsol.hide(); 
   StoreXSecondsol.hide();
   StoreXThirdsol.hide();
   StoreXForthsol.hide();
   StoreYFirstsol.hide();
   StoreYSecondsol.hide();
   StoreYThirdsol.hide();
   StoreYForthsol.hide();

   DistEntityRecLabTernary.hide();
   DistEntityRecLabAttTernary.hide();
   DistLabTernary.hide();
   DistAtt1Ternary.hide();
   DistAtt2Ternary.hide();
   D2LeftHorLine.hide();
   D2Left1.hide();
   D2Left1.hide();

   Bridge1EntityRecLab.hide();
   Bridge1EntityRecLabAtt.hide();
   Bridge1Lab.hide();
   Bridge1Att1.hide();
   Bridge1Att2.hide();
   Bridge1Att3.hide();

   ContEntityRecLab.hide();
   ContEntityRecLabAtt.hide();
   ContLab.hide();
   ContAtt1.hide();
   ContAtt2.hide();

  ProdEntityRecLab.hide();
  ProdEntityRecLabAtt.hide();
  ProdLab.hide();
  ProdAtt1.hide();
  ProdAtt2.hide();
  BCVerLine.hide();
  Bdown.hide();
  Cup.hide();
  Cright.hide();
  BPHorLine.hide();
  PLeft.hide();
  Bright.hide();
  var RightSolutions=av.label("<span style='color:red;'>RIGHT SOLUTIONS ARE:</span>", {left: 350, top: arrayTop-60 });
  RightSolutions.css({"font-weight": "bold", "font-size": 28});
  var RightSolutionsX=av.label("<span style='color:green;'>Forth solution for Store X</span>", {left: 380, top: arrayTop-10 });
  RightSolutionsX.css({"font-weight": "bold", "font-size": 22});
  var RightSolutionsY=av.label("<span style='color:Orange;'>Forth solution for Store Y</span>", {left: 380, top: arrayTop+20 });
  RightSolutionsY.css({"font-weight": "bold", "font-size": 22});
  var WHYRightSolutions=av.label("<span style='color:red;'>WHY??</span>", {left: 470, top: arrayTop+70 });
  WHYRightSolutions.css({"font-weight": "bold", "font-size": 28});
  var ImpNote=av.label("<span style='color:green;'><i>NOTE: any N:M relationship in the suggested solutions will be substituted with its corresponding  bridge in the next slides for clear demonstration</i> </span>", {left: 60, top: arrayTop+150 });
  ImpNote.css({"font-weight": "bold", "font-size": 14});
  av.step();

  //slide 34
  RightSolutions.hide();
  RightSolutionsX.hide();
  RightSolutionsY.hide();
  WHYRightSolutions.hide();
  ImpNote.hide();
  var StoreXsol1Analysis=av.label("<span style='color:blue;'>Store X First Solution Analysis</span>", {left: 350, top: arrayTop-60 });
  StoreXsol1Analysis.css({"font-weight": "bold", "font-size": 28});
  av.step();

  //slide 35
  StoreXsol1Analysis.hide();
  av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store X solutions</span> to determine the correct one. <br> <span style='color:red;'>----->By analysing each solution according to the previously given datasets.</span><br><span style='color:blue;'> <u>Store X First sol. analysis:</u></span> ").bold().big());
  RealDataSetX= av.ds.matrix(theDataSetX, {style: "table", top: 0, left: 20 });
  var sate1X1st=av.label("These are tables representing first solution relations, try to fill tables with records in <br> dataset to see weather these relations can represent all records in dataset or not.<br> ", {left: 20, top:320 });
  sate1X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=0; i < theDataSetY.length; i++)
  {
   RealDataSetX._arrays[i].css([0,1,2,3], {"font-size": 12});
   RealDataSetX._arrays[i].show();
   RealDataSetX._arrays[i].show();

  }
  var DistributorMatrixLab=av.label("<span style='color:blue;'>Distributor</span>", {left: 390, top:-15 });
  DistributorMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theDistributorArrays = [["D-no","D-name"],["d1","ali"],["d2","adam"],["d3","tarek"]];
  var theDistributorMatrix= av.ds.matrix(theDistributorArrays, {style: "table", top: 0, left: 390 });
  theDistributorMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistributorMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  //var DistConBrdgMatrixLab=av.label("<span style='color:blue;'></span>", {left: 390, top:-15 });
  //DistConBrdgMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theDistConBrdgArrays = [["D-no","c-no"],["",""],["",""],["",""]];
  var theDistConBrdgMatrix= av.ds.matrix(theDistConBrdgArrays, {style: "table", top: 180, left: 450 });
  theDistConBrdgMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistConBrdgMatrix._arrays[0].css([0,1], {"text-decoration": "underline"});

  var Bridge1MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 610, top:-15 });
  Bridge1MatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theBridge1Arrays = [["c-no","p-no","price"],["","",""],["","",""],["","",""],["","",""]];
  var theBridge1Matrix= av.ds.matrix(theBridge1Arrays, {style: "table", top: 0, left: 610 });
  theBridge1Matrix._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  theBridge1Matrix._arrays[0].css([0,1], {"text-decoration": "underline"});
  
  var Bridge2MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 690, top:-15 });
  Bridge2MatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theBridge2Arrays = [["d-no","p-no","price"],["","",""],["","",""],["","",""]];
  var theBridge2Matrix= av.ds.matrix(theBridge2Arrays, {style: "table", top: 0, left: 690 });
  theBridge2Matrix._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  theBridge2Matrix._arrays[0].css([0,1], {"text-decoration": "underline"});
  Bridge2MatrixLab.hide();
  for (var i=0; i < theBridge2Arrays.length; i++)
  {
   theBridge2Matrix._arrays[i].hide();
  }

  var Bridge3MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 450, top:-15 });
  Bridge3MatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theBridge3Arrays = [["c-no","p-no","d-no","price"],["","","",""],["","","",""],["","","",""]];
  var theBridge3Matrix= av.ds.matrix(theBridge3Arrays, {style: "table", top: 0, left: 450 });
  theBridge3Matrix._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  theBridge3Matrix._arrays[0].css([0,1,2], {"text-decoration": "underline"});
  Bridge3MatrixLab.hide();
  for (var i=0; i < theBridge3Arrays.length; i++)
  {
   theBridge3Matrix._arrays[i].hide();
  }

  var CountryMatrixLab=av.label("<span style='color:blue;'>Country</span>", {left: 690, top:215 });
  CountryMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theCountryArrays = [["C-no","c-name"],["c1","Egypt"],["c2","USA"],["c3","UK"]];
  var theCountryMatrix= av.ds.matrix(theCountryArrays, {style: "table", top: 230, left: 690 });
  theCountryMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theCountryMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  var ProductMatrixLab=av.label("<span style='color:blue;'>Product</span>", {left: 910, top:-15 });
  ProductMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theProductArrays = [["p-no","p-name"],["p1","TV"],["p2","Watch"],["p3","blender"]];
  var theProductMatrix= av.ds.matrix(theProductArrays, {style: "table", top: 0, left: 910 });
  theProductMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theProductMatrix._arrays[0].css([0], {"text-decoration": "underline"});
  DMtrxDwnLine.show();
  DMtrxDwnCardLab.show();
  DistConBdgMtrxUpCardLab.show();
  DistConBdgMtrxRgtLine.show();
  ConMtrxLeftCardLab.show();
  DistConBdgMtrxRgtCardLab.show();
  Bdg1ConMtrxVerLine.show();
  ConMtrxUPCardLab.show();
  Bdg1MtrxDwnCardLab.show();
  ProdMtrxLeftCardLab.show();
  Bdg1MtrxRgtCardLab.show();
  Bdg1ProdMtrxHorLine.show();
  av.step();

  //slide 36
  sate1X1st.hide();
  var sate2X1st=av.label("To represent information given in the above highlighted record which says that:<br> <span style='color:blue;'>ali</span> with no.<span style='color:red;'>d1</span>  distributes at <span style='color:blue;'>egypt</span> with id <span style='color:red;'>c1</span>", {left: 20, top:310 });
  sate2X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[1].highlight();
  av.step();

  //slide 37
  theDistributorMatrix._arrays[1].highlight();
  theCountryMatrix._arrays[1].highlight();
  theDistConBrdgMatrix._arrays[1].value(0,"<span style='color:red;'>d1</span>");
  theDistConBrdgMatrix._arrays[1].value(1,"<span style='color:red;'>c1</span>");
  sate2X1st.hide();
  var sate3X1st=av.label("this relation between <span style='color:blue;'>ali & egypt</span> represented by:<br> inserting their numbers in <span style='color:red;'>Distributor/Country bridge</span>", {left: 20, top:310 });
  sate3X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 38
  theDistributorMatrix._arrays[1].unhighlight();
  theProductMatrix._arrays[1].highlight();
 
  sate3X1st.hide();
  var sate4X1st=av.label("<span style='color:blue;'>ali sells in egypt</span> product <span style='color:blue;'>TV</span> with id <span style='color:red;'>(p1)</span> with <span style='color:blue;'>price</span> <span style='color:red;'>3000</span> <br> according to Store X first sol.<br> we have <span style='color:red;'>country/product</span> relation including <span style='color:blue;'>price</span>", {left: 20, top:310 });
  sate4X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 39
  theBridge1Matrix._arrays[1].value(0,"<span style='color:red;'>c1</span>");
  theBridge1Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
  theBridge1Matrix._arrays[1].value(2,"<span style='color:red;'>3000</span>");
  sate4X1st.hide();
  var sate5X1st=av.label("Then Fill <span style='color:red;'>country/product</span> with this data", {left: 20, top:310 });
  sate5X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 40
  RealDataSetX._arrays[1].unhighlight();
  RealDataSetX._arrays[2].highlight();
  theCountryMatrix._arrays[1].unhighlight();
  theProductMatrix._arrays[1].unhighlight();
  sate5X1st.hide();
  var sate6X1st=av.label("<span style='color:green;'>Next record</span> in dataset, <span style='color:blue;'>ali</span> <span style='color:red;'>(d1)</span> sells watches in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span><br> <span style='color:red;'>ali/egypt</span> relation already exist in <span style='color:red;'>distributor/country</span> bridge.", {left: 20, top:310 });
  sate6X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[1].highlight();
  av.step();

  //slide 41
  sate6X1st.hide();
  var sate7X1st=av.label("But this time he sells, <span style='color:blue;'>watch</span> <span style='color:red;'>(p2)</span> in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span> with <span style='color:red;'>5000</span> L.E.", {left: 20, top:310 });
  sate7X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[1].unhighlight();
  theProductMatrix._arrays[2].highlight();
  theCountryMatrix._arrays[1].highlight();
  av.step();

  //slide 42
  sate7X1st.hide();
  var sate8X1st=av.label("So ADD <span style='color:blue;'>watch/egypt</span> relation in  <span style='color:blue;'>product/country</span> bridge, </br><span style='color:blue;'>watch</span> <span style='color:red;'>(p2)</span> in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span> with <span style='color:red;'>5000</span> L.E.", {left: 20, top:310 });
  sate8X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[2].value(0,"<span style='color:red;'>c1</span>");
  theBridge1Matrix._arrays[2].value(1,"<span style='color:red;'>p2</span>");
  theBridge1Matrix._arrays[2].value(2,"<span style='color:red;'>5000</span>");
  av.step();

  //slide 43
  sate8X1st.hide();
  var sate9X1st=av.label("<span style='color:green;'>Next inserting 3rd record</span> in dataset in relational tables,</br> <span style='color:blue;'>adam</span> <span style='color:red;'>(d2)</span> sells blender in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span>.", {left: 20, top:310 });
  sate9X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[2].unhighlight();
  RealDataSetX._arrays[3].highlight();
  theProductMatrix._arrays[2].unhighlight();
  theDistributorMatrix._arrays[2].highlight();
  av.step();
  

  //slide 44
  sate9X1st.hide();
  var sate10X1st=av.label("<span style='color:blue;'>adam/egypt</span> = <span style='color:red;'>d2/c1</span> inserted in <span style='color:blue;'>distributor/country</span> bridge.", {left: 20, top:310 });
  sate10X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[2].value(0,"<span style='color:red;'>d2</span>");
  theDistConBrdgMatrix._arrays[2].value(1,"<span style='color:red;'>c1</span>");
  av.step();

  //slide 45
  theDistributorMatrix._arrays[2].unhighlight();
  theProductMatrix._arrays[3].highlight();
  sate10X1st.hide();
  var sate11X1st=av.label("As adam sells <span style='color:blue;'>blender</span> in <span style='color:red;'>egypt</span> with <span style='color:blue;'>price=2500</span> </br>Insert this information in <span style='color:red;'>product/country</span> bridge. <i>as shown in bridge here</i>", {left: 20, top:310 });
  sate11X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[3].value(0,"<span style='color:red;'>c1</span>");
  theBridge1Matrix._arrays[3].value(1,"<span style='color:red;'>p3</span>");
  theBridge1Matrix._arrays[3].value(2,"<span style='color:red;'>2500</span>");
  theBridge1Matrix._arrays[3].highlight();
  av.step();

  //slide 46
  sate11X1st.hide();
  var sate12X1st=av.label("<span style='color:green;'>At the 4th record</span> in dataset, a different distributor <span style='color:blue;'>tarek (d3)</span> also sells in <span style='color:red;'>egypt (c1)</span></br> the same product <span style='color:blue;'>blender (p3)</span> but with different  <span style='color:red;'>price=2300</span>  than distributor <span style='color:blue;'>adam</span> </br> in the previous record", {left: 20, top:310 });
  sate12X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[3].unhighlight();
  RealDataSetX._arrays[4].highlight();
  theDistributorMatrix._arrays[3].highlight();
  theBridge1Matrix._arrays[3].unhighlight();
  av.step();

  //slide 47
  sate12X1st.hide();
  var sate13X1st=av.label("Then <span style='color:blue;'>tarek (d3)/egypt (c1)</span> relation added to <span style='color:red;'>distributor/country</span> bridge", {left: 20, top:310 });
  sate13X1st.css({"font-weight": "bold", "font-size": 16});
  theDistributorMatrix._arrays[3].unhighlight();
  theCountryMatrix._arrays[1].unhighlight();
  theDistConBrdgMatrix._arrays[3].value(0,"<span style='color:red;'>d3</span>");
  theDistConBrdgMatrix._arrays[3].value(1,"<span style='color:red;'>c1</span>");
  theDistConBrdgMatrix._arrays[3].highlight();
  av.step();

  // slide 48
  sate13X1st.hide();
  var sate14X1st=av.label(" <span style='color:green;'>The current step:</span> is to represent <span style='color:blue;'>blender/egypt</span> relation </br> with distributor <span style='color:blue;'>tarek's price=2300</span> in the <span style='color:red;'>product/country</span> bridge</br><span style='color:red;'>WHICH IS <u>IMPOSSIBLE</u></span>", {left: 20, top:310 });
  sate14X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[3].unhighlight();
  theProductMatrix._arrays[3].highlight();
  theCountryMatrix._arrays[1].highlight();
  theBridge1Matrix._arrays[4].highlight();
  
  av.step();

  //slide 49
  sate14X1st.hide();
  var sate15X1st=av.label(" <span style='color:blue;'>Adding this information</span> to <span style='color:blue;'>product/country</span> leads to major </br><span style='color:red;'>ERROR <i>(Primary key repitation)</i></span> ", {left: 20, top:310 });
  sate15X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[4].value(0,"<span style='color:red;'>c1</span>");
  theBridge1Matrix._arrays[4].value(1,"<span style='color:red;'>p3</span>");
  theBridge1Matrix._arrays[4].value(2,"<span style='color:red;'>2300</span>");
  var PK1ellipse =av.g.ellipse(685,120,65,15, {"stroke-width": 3});
  var PK2ellipse =av.g.ellipse(685,150,65,15, {"stroke-width": 3});
  var Errorpointer = av.pointer("<span style='color:red;'><b>EEROR 1</b> </br> primary key repition</span>",theBridge1Matrix._arrays[4].index(1), {left: 200, top: 250});
  
  av.step();

  //slide 50
  sate15X1st.hide();
  var sate16X1st=av.label(" <span style='color:red;'>Error 1:</span> this solution cann't represent Store X requirement that: </br> <span style='color:blue;'>*different distributors can set different prices for same product*</span>", {left: 20, top:310 });
  sate16X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[3].value(2,"<span style='color:blue;'>2500</span>");
  theBridge1Matrix._arrays[4].value(2,"<span style='color:green;'>2300</span>");
  var adamPricepointer = av.pointer("<span style='color:blue;'>adam's price</span>",theBridge1Matrix._arrays[3].index(2), {left: 140, top: 150});
  var tarekPricepointer = av.pointer("<span style='color:green;'>tarek's price</span>",theBridge1Matrix._arrays[4].index(2), {left: 50, top: 100});
  av.step();

  //slide 51
  sate16X1st.hide();
  var sate17X1st=av.label(" <span style='color:red;'>Error 2:</span> <span style='color:blue;'>Assume that the dataset is hidden</span></br> Can you answer the question which distributor sells a specific product?</br>(e.g.) Who sells watch?", {left: 20, top:310 });
  sate17X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[3].value(2,"<span style='color:red;'>2500</span>");
  theBridge1Matrix._arrays[4].value(0," ");
  theBridge1Matrix._arrays[4].value(1," ");
  theBridge1Matrix._arrays[4].value(2," ");
  theBridge1Matrix._arrays[4].unhighlight();
  theProductMatrix._arrays[3].unhighlight();
  theProductMatrix._arrays[2].highlight();
  theCountryMatrix._arrays[1].unhighlight();
   adamPricepointer.hide();
   tarekPricepointer.hide();
   Errorpointer.hide();
   PK1ellipse.hide();
   PK2ellipse.hide();
   for (var i=0; i < theDataSetX.length; i++)
   {
    RealDataSetX._arrays[i].hide();
    
   }
  av.step();

  //slide 52
  sate17X1st.hide();
  var sate18X1st=av.label(" <span style='color:red;'>Error 2:</span> <span style='color:blue;'>-By Looking at all tables no direct relation between product & distributor</span></br> -Product has relation only with country </br>", {left: 20, top:310 });
  sate18X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 53
  sate18X1st.hide();
  var sate19X1st=av.label(" <span style='color:red;'>Error 2:</span> <span style='color:blue;'>-From product/country relation bridge:</span></br>-We can conclude that watch(p2) sold in country (c1)", {left: 20, top:310 });
  sate19X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[2].highlight();
  av.step();

  //slide 54
  sate19X1st.hide();
  var sate20X1st=av.label(" <span style='color:red;'>Error 2:</span> <span style='color:blue;'>-From country table we can find that c1 is egypt country</span></br>-this means that watch(p2) sold in egypt </br> So can we use the distributor/country relation to know the watch distributor?", {left: 20, top:310 });
  sate20X1st.css({"font-weight": "bold", "font-size": 16});
  theCountryMatrix._arrays[1].highlight();
  av.step();

  //slide 55
  sate20X1st.hide();
  var sate21X1st=av.label(" <span style='color:red;'>Error 2: <b><u>unfortunately</b></u></span></br> <span style='color:blue;'>-egypt country (c1) has three records in distributor country brigde</span></br>- (i.e.) egypt has relations with all distributors (d1,d2,d3) because all of them sell different products in egypt.", {left: 20, top:310 });
  sate21X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[1].highlight();
  theDistConBrdgMatrix._arrays[2].highlight();
  theDistConBrdgMatrix._arrays[3].highlight();
  av.step();

  //slide 56
  sate21X1st.hide();
  var sate22X1st=av.label(" <span style='color:red;'>Error 2: <b><u>HERE IS THE PROBLEM</b></u></span></br> <span style='color:blue;'>-In this solution we can know the products sold in each country,</br> and also who are the distributors of each country,</br> but we cann't link the distributors with the products they sell</span>", {left: 20, top:290 });
  sate22X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 57
  sate22X1st.hide();
  var sate23X1st=av.label(" <span style='color:red;'><b><u>Store X solution 1 Cons</b></u></span></br> <span style='color:red;'><b><u>ERROR 1:</b></u></span> For each pair (country/product) only one price is set</br> <span style='color:red;'><b><u>ERROR 2:</b></u></span> the distributor of a product in a country is <b><u>untraceable</b></u>", {left: 20, top:310 });
  sate23X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[1].unhighlight();
  theDistConBrdgMatrix._arrays[2].unhighlight();
  theDistConBrdgMatrix._arrays[3].unhighlight();
  theCountryMatrix._arrays[1].unhighlight();
  theBridge1Matrix._arrays[2].unhighlight();
  theProductMatrix._arrays[2].unhighlight();
  av.step();

  av.recorded();
});
