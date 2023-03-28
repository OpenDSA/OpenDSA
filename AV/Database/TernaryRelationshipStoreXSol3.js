/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationshipStoreXSol3";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
  var av = new JSAV(av_name);

   //some attributes controlling entities matrices
  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=250;
  var arrayTop=50;

//lines connecting matrices in slide 35 so Mtrx referes to matrix not rectangles like above Lines
//each line here has its two cardinality labels below itself

//original country matrix line down connecting it to distributor/country bridge
var DMtrxDwnLine = av.g.line(480, 135,  480, 195,{opacity: 100, "stroke-width": 2});
DMtrxDwnLine.hide();
var DMtrxDwnCardLab=av.label("<span style='color:blue;'>1</span>", {left: 483, top:120 });
DMtrxDwnCardLab.css({"font-weight": "bold", "font-size": 15});
DMtrxDwnCardLab.hide();
var DistConBdgMtrxUpCardLab=av.label("<span style='color:blue;'>M</span>", {left: 483, top:165 });
DistConBdgMtrxUpCardLab.css({"font-weight": "bold", "font-size": 15});
DistConBdgMtrxUpCardLab.hide();

//original product matrix line down connecting it to distributor/country bridge //&&&&&&&&&&&&
var ProdMtrxDwnLine = av.g.line(980, 135,  980, 195,{opacity: 100, "stroke-width": 2});
ProdMtrxDwnLine.hide();
var prodMtrxDwnCardLab=av.label("<span style='color:blue;'>1</span>", {left: 980, top:120 });
prodMtrxDwnCardLab.css({"font-weight": "bold", "font-size": 15});
prodMtrxDwnCardLab.hide();
var DistProdBdgMtrxUpCardLab=av.label("<span style='color:blue;'>M</span>", {left: 980, top:165 });
DistProdBdgMtrxUpCardLab.css({"font-weight": "bold", "font-size": 15});
DistProdBdgMtrxUpCardLab.hide();

//line connecting distributor to original distributor/country bridge
var DistConBdgMtrxRgtLine = av.g.line(593, 280,  690, 280,{opacity: 100, "stroke-width": 2});
DistConBdgMtrxRgtLine.hide();
var ConMtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 680, top:245 });
ConMtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
ConMtrxLeftCardLab.hide();
var DistConBdgMtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 595, top:245 });
DistConBdgMtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
DistConBdgMtrxRgtCardLab.hide();

//line connecting distributor to original distributor/product bridge//*************** */
var DistProdBdgMtrxLeftLine = av.g.line(830, 280,  910, 280,{opacity: 100, "stroke-width": 2});
DistProdBdgMtrxLeftLine.hide();
var DistMtrxRgtCardLab2=av.label("<span style='color:blue;'>1</span>", {left: 835, top:245 });
DistMtrxRgtCardLab2.css({"font-weight": "bold", "font-size": 15});
DistMtrxRgtCardLab2.hide();
var DistProdBdgMtrxLeftCardLab=av.label("<span style='color:blue;'>M</span>", {left: 897, top:245 });
DistProdBdgMtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
DistProdBdgMtrxLeftCardLab.hide();

//line connecting country to original bridge 1 (product/country bridge with price)
var Bdg1DistMtrxHorLine = av.g.line(620, 90,  530, 90,{opacity: 100, "stroke-width": 2});
Bdg1DistMtrxHorLine.hide();
var DistMtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 605, top:55 });
DistMtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
DistMtrxRgtCardLab.hide();
var Bdg1MtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 533, top:55 });
Bdg1MtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxLeftCardLab.hide();

//line connecting product to original bridge 1 (product/country bridge with price)
var Bdg1ProdMtrxHorLine = av.g.line(835, 90,  910, 90,{opacity: 100, "stroke-width": 2});
Bdg1ProdMtrxHorLine.hide();
var ProdMtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 900, top:55 });
ProdMtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
ProdMtrxLeftCardLab.hide();
var Bdg1MtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 835, top:55 });
Bdg1MtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxRgtCardLab.hide();

var StoreXsol3Analysis=av.label("<span style='color:blue;'>Store X Third Solution Analysis</span>", {left: 350, top: arrayTop-60 });
StoreXsol3Analysis.css({"font-weight": "bold", "font-size": 28});

var SolutionType=av.label("<span style='color:blue;'>Three Binary relationships, (distributor/country) , (distributor/product) & (country/product) including price relationships</span>", {left: 70, top: arrayTop+40 });
SolutionType.css({"font-weight": "bold", "font-size": 22});

var Note=av.label("<span style='color:red;'>NOTE:</span> only Store X dataset records that reveal solution bugs will be examined for time saving", {left: 70, top: arrayTop+140 });
Note.css({"font-weight": "bold", "font-size": 18});

  // Slide 1
  av.umsg(interpret("Here are the problems' statments").bold().big());
  av.displayInit(1);
 av.step();

  //slide 2
  StoreXsol3Analysis.hide();
  SolutionType.hide();
  Note.hide();
  var theDataSetX = [["Country","Product","Distributer","Price"],["Egypt","TV","ali","3000"],["Egypt","watch","ali","5000"],["Egypt","blender","adam","2500"],["Egypt","blender","tarek","2300"],["USA","TV","adam","4500"],["USA","watch","ali","4700"],["USA","blender","tarek","2000"],["UK","TV","adam","4000"],["UK","blender","adam","3000"]];
  av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store X solutions</span> to determine the correct one. <br> <span style='color:red;'>----->By analysing each solution according to the previously given datasets.</span><br><span style='color:blue;'> <u>Store X third sol. analysis:</u></span> ").bold().big());
  var RealDataSetX= av.ds.matrix(theDataSetX, {style: "table", top: 0, left: 20 });
  var sate1X1st=av.label("These are tables representing third solution relations, try to fill tables with records in <br> dataset to see weather these relations can represent all records in dataset or not.<br> ", {left: 20, top:325 });
  sate1X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=0; i < theDataSetX.length; i++)
  {
   RealDataSetX._arrays[i].css([0,1,2,3], {"font-size": 12});
   RealDataSetX._arrays[i].show();

  }
  var DistributorMatrixLab=av.label("<span style='color:blue;'>Distributor</span>", {left: 690, top:215 });
  DistributorMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theDistributorArrays = [["D-no","D-name"],["d1","ali"],["d2","adam"],["d3","tarek"]];
  var theDistributorMatrix= av.ds.matrix(theDistributorArrays, {style: "table", top: 230, left: 690 });
  theDistributorMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistributorMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  //var DistConBrdgMatrixLab=av.label("<span style='color:blue;'></span>", {left: 390, top:-15 });
  //DistConBrdgMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theDistConBrdgArrays = [["D-no","c-no"],["",""],["",""],["",""],["",""]];
  var theDistConBrdgMatrix= av.ds.matrix(theDistConBrdgArrays, {style: "table", top: 180, left: 450 });
  theDistConBrdgMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistConBrdgMatrix._arrays[0].css([0,1], {"text-decoration": "underline"});

  var theBridge1Arrays = [["d-no","p-no"],["",""],["",""],["",""],["",""]];
  var theBridge1Matrix= av.ds.matrix(theBridge1Arrays, {style: "table", top: 180, left: 910 });
  theBridge1Matrix._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  theBridge1Matrix._arrays[0].css([0,1], {"text-decoration": "underline"});
 

  var Bridge2MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 620, top:-15 });
  Bridge2MatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theBridge2Arrays = [["c-no","p-no","price"],["","",""],["","",""],["","",""],["","",""],["","",""]];
  var theBridge2Matrix= av.ds.matrix(theBridge2Arrays, {style: "table", top: 0, left: 620 });
  theBridge2Matrix._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  theBridge2Matrix._arrays[0].css([0,1], {"text-decoration": "underline"});

  var CountryMatrixLab=av.label("<span style='color:blue;'>Country</span>", {left: 390, top:-15 });
  CountryMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theCountryArrays = [["C-no","c-name"],["c1","Egypt"],["c2","USA"],["c3","UK"]];
  var theCountryMatrix= av.ds.matrix(theCountryArrays, {style: "table", top: 0, left: 390 });
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
 Bdg1DistMtrxHorLine.show();
 DistMtrxRgtCardLab.show();
 Bdg1MtrxLeftCardLab.show();
  ProdMtrxLeftCardLab.show();
  Bdg1MtrxRgtCardLab.show();
  Bdg1ProdMtrxHorLine.show();
  DistProdBdgMtrxLeftLine.show();
  DistMtrxRgtCardLab2.show();
  DistProdBdgMtrxLeftCardLab.show();
  prodMtrxDwnCardLab.show();
  ProdMtrxDwnLine.show();
  DistProdBdgMtrxUpCardLab.show();
  av.step();

  //slide 3
  sate1X1st.hide();
  var sate2X1st=av.label("Insert first record in store X dataset in solution three relational tables.", {left: 20, top:325 });
  sate2X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[1].highlight();
  av.step();

  //slide 4
  sate2X1st.hide();
  var sate3X1st=av.label("<span style='color:green;'>Hightligth</span> first record basic Information <span style='color:blue;'>(ali/ egypt/ TV)</span> </br>in the main tables <span style='color:red;'>(distributor/ country/ product)</span>.", {left: 20, top:325 });
  sate3X1st.css({"font-weight": "bold", "font-size": 16});
  theProductMatrix._arrays[1].highlight();
  theDistributorMatrix._arrays[1].highlight();
  theCountryMatrix._arrays[1].highlight();
  av.step();

  //slide 5
  sate3X1st.hide();
  var sate4X1st=av.label("<span style='color:green;'>Use</span> <span style='color:blue;'>(distributor/country)</span> bridge to express </br><span style='color:red;'>(ali (d1)/ egypt (c1))</span> relation.", {left: 20, top:325 });
  sate4X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[1].value(0,"<span style='color:red;'>d1</span>");
  theDistConBrdgMatrix._arrays[1].value(1,"<span style='color:red;'>c1</span>");
  theDistConBrdgMatrix._arrays[1].highlight();
  theProductMatrix._arrays[1].unhighlight();
  av.step();

  //slide 6
  sate4X1st.hide();
  var sate5X1st=av.label("<span style='color:green;'>Then</span> use <span style='color:blue;'>(distributor/product)</span> bridge to express </br><span style='color:red;'>(ali (d1)/ TV (p1))</span> relation.", {left: 20, top:325 });
  sate5X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[1].value(0,"<span style='color:red;'>d1</span>");
  theBridge1Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
  theBridge1Matrix._arrays[1].highlight();
  theProductMatrix._arrays[1].highlight();
  theDistConBrdgMatrix._arrays[1].unhighlight();
  theCountryMatrix._arrays[1].unhighlight();
  av.step();

  //slide 7
  theBridge1Matrix._arrays[1].unhighlight();
  sate5X1st.hide();
  var sate6X1st=av.label("<span style='color:green;'>Finally for first record representation: Insert in</span> <span style='color:blue;'>(country/product)</span> bridge </br> Values <span style='color:red;'>(egypt (c1)/ TV (p1) & price=3000</span>.", {left: 20, top:325 });
  sate6X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge2Matrix._arrays[1].value(0,"<span style='color:red;'>c1</span>");
  theBridge2Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
  theBridge2Matrix._arrays[1].value(2,"<span style='color:red;'>3000</span>");
  theBridge2Matrix._arrays[1].highlight();
  theDistributorMatrix._arrays[1].unhighlight();
  theCountryMatrix._arrays[1].highlight();
  av.step();

 //slide 8
 sate6X1st.hide();
 var sate7X1st=av.label("Insert second record in store X dataset in relational tables where <span style='color:blue;'>ali</span> <span style='color:red;'>(d1)</span> </br> sells <span style='color:blue;'>watches</span> <span style='color:red;'>(p2)</span> in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span>.", {left: 20, top:325 });
 sate7X1st.css({"font-weight": "bold", "font-size": 16});
 RealDataSetX._arrays[2].highlight();
 RealDataSetX._arrays[1].unhighlight();
 theCountryMatrix._arrays[1].unhighlight();
 theBridge2Matrix._arrays[1].unhighlight();
 theProductMatrix._arrays[1].unhighlight();
 av.step();  

 //slide 9
 sate7X1st.hide();
 var sate8X1st=av.label("<span style='color:red;'>(ali (d1)/ egypt (c1))</span> relation already exists in </br><span style='color:blue;'>(distributor/country)</span> bridge from <span style='color:green;'>previous record</span>.", {left: 20, top:325 });
 sate8X1st.css({"font-weight": "bold", "font-size": 16});
 theDistConBrdgMatrix._arrays[1].highlight();
 av.step();

 //slide 10
 sate8X1st.hide();
 var sate9X1st=av.label("<span style='color:green;'>Then</span> use <span style='color:blue;'>(distributor/product)</span> bridge to express </br><span style='color:red;'>(ali (d1)/ watch (p2))</span> relation.", {left: 20, top:325 });
 sate9X1st.css({"font-weight": "bold", "font-size": 16});
 theBridge1Matrix._arrays[2].value(0,"<span style='color:red;'>d1</span>");
 theBridge1Matrix._arrays[2].value(1,"<span style='color:red;'>p2</span>");
 theBridge1Matrix._arrays[2].highlight();
 theProductMatrix._arrays[2].highlight();
 theDistConBrdgMatrix._arrays[1].unhighlight();
 theCountryMatrix._arrays[1].unhighlight();
 theDistributorMatrix._arrays[1].highlight();
 av.step();

 //slide 11
 theDistributorMatrix._arrays[1].unhighlight();
 theBridge1Matrix._arrays[2].unhighlight();
 sate9X1st.hide();
 var sate10X1st=av.label("<span style='color:green;'>Finally for second record representation: Insert in</span> <span style='color:blue;'>(country/product)</span> bridge </br> Values <span style='color:red;'>(egypt (c1)/ TV (p1) & price=5000</span>.", {left: 20, top:325 });
 sate10X1st.css({"font-weight": "bold", "font-size": 16});
 theBridge2Matrix._arrays[2].value(0,"<span style='color:red;'>c1</span>");
 theBridge2Matrix._arrays[2].value(1,"<span style='color:red;'>p2</span>");
 theBridge2Matrix._arrays[2].value(2,"<span style='color:red;'>5000</span>");
 theBridge2Matrix._arrays[2].highlight();
 theDistributorMatrix._arrays[1].unhighlight();
 theCountryMatrix._arrays[1].highlight();
 av.step();

//slide 12
sate10X1st.hide();
var sate11X1st=av.label("Insert third record in store X dataset in relational tables where <span style='color:blue;'>adam</span> <span style='color:red;'>(d2)</span> </br> sells <span style='color:blue;'>blender</span> <span style='color:red;'>(p3)</span> in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span>.", {left: 20, top:325 });
sate11X1st.css({"font-weight": "bold", "font-size": 16});
RealDataSetX._arrays[3].highlight();
RealDataSetX._arrays[2].unhighlight();
theCountryMatrix._arrays[1].unhighlight();
theBridge2Matrix._arrays[2].unhighlight();
theProductMatrix._arrays[2].unhighlight();
av.step();

//slide 13
sate11X1st.hide();
var sate12X1st=av.label("<span style='color:green;'>Use</span> <span style='color:blue;'>(distributor/country)</span> bridge to express </br><span style='color:red;'>(adam (d2)/ egypt (c1))</span> relation.", {left: 20, top:325 });
  sate12X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[2].value(0,"<span style='color:red;'>d2</span>");
  theDistConBrdgMatrix._arrays[2].value(1,"<span style='color:red;'>c1</span>");
  theDistConBrdgMatrix._arrays[2].highlight();
  theCountryMatrix._arrays[1].highlight();
  theDistributorMatrix._arrays[2].highlight();
av.step();

//slide 14
sate12X1st.hide();
var sate13X1st=av.label("<span style='color:green;'>Then</span> use <span style='color:blue;'>(distributor/product)</span> bridge to express </br><span style='color:red;'>(adam (d2)/ blender (p3))</span> relation.", {left: 20, top:325 });
sate13X1st.css({"font-weight": "bold", "font-size": 16});
theBridge1Matrix._arrays[3].value(0,"<span style='color:red;'>d2</span>");
theBridge1Matrix._arrays[3].value(1,"<span style='color:red;'>p3</span>");
theBridge1Matrix._arrays[3].highlight();
theProductMatrix._arrays[3].highlight();
theDistConBrdgMatrix._arrays[2].unhighlight();
theCountryMatrix._arrays[1].unhighlight();
theDistributorMatrix._arrays[2].highlight();
av.step();

//slide 15
theDistributorMatrix._arrays[2].unhighlight();
theBridge1Matrix._arrays[3].unhighlight();
sate13X1st.hide();
var sate14X1st=av.label("<span style='color:green;'>Finally for third record representation: Insert in</span> <span style='color:blue;'>(country/product)</span> bridge </br> Values <span style='color:red;'>(egypt (c1)/ blender (p3) & price=2500</span>.", {left: 20, top:325 });
sate14X1st.css({"font-weight": "bold", "font-size": 16});
theBridge2Matrix._arrays[3].value(0,"<span style='color:red;'>c1</span>");
theBridge2Matrix._arrays[3].value(1,"<span style='color:red;'>p3</span>");
theBridge2Matrix._arrays[3].value(2,"<span style='color:red;'>2500</span>");
theBridge2Matrix._arrays[3].highlight();
theDistributorMatrix._arrays[2].unhighlight();
theCountryMatrix._arrays[1].highlight();
av.step();

//slide 16
sate14X1st.hide();
var sate15X1st=av.label("Insert forth record in store X dataset in relational tables where <span style='color:blue;'>tarek</span> <span style='color:red;'>(d3)</span> </br> sells <span style='color:blue;'>blender</span> <span style='color:red;'>(p3)</span> in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span>.", {left: 20, top:325 });
sate15X1st.css({"font-weight": "bold", "font-size": 16});
RealDataSetX._arrays[4].highlight();
RealDataSetX._arrays[3].unhighlight();
theCountryMatrix._arrays[1].unhighlight();
theBridge2Matrix._arrays[3].unhighlight();
theProductMatrix._arrays[3].unhighlight();
av.step();

//slide 17
sate15X1st.hide();
var sate16X1st=av.label("<span style='color:green;'>Use</span> <span style='color:blue;'>(distributor/country)</span> bridge to express </br><span style='color:red;'>(tarek (d3)/ egypt (c1))</span> relation.", {left: 20, top:325 });
  sate16X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[3].value(0,"<span style='color:red;'>d3</span>");
  theDistConBrdgMatrix._arrays[3].value(1,"<span style='color:red;'>c1</span>");
  theDistConBrdgMatrix._arrays[3].highlight();
  theCountryMatrix._arrays[1].highlight();
  theDistributorMatrix._arrays[3].highlight();
av.step();

//slide 18
sate16X1st.hide();
var sate17X1st=av.label("<span style='color:green;'>Then</span> use <span style='color:blue;'>(distributor/product)</span> bridge to express </br><span style='color:red;'>(tarek (d3)/ blender (p3))</span> relation.", {left: 20, top:325 });
sate17X1st.css({"font-weight": "bold", "font-size": 16});
theBridge1Matrix._arrays[4].value(0,"<span style='color:red;'>d3</span>");
theBridge1Matrix._arrays[4].value(1,"<span style='color:red;'>p3</span>");
theBridge1Matrix._arrays[4].highlight();
theProductMatrix._arrays[3].highlight();
theDistConBrdgMatrix._arrays[3].unhighlight();
theCountryMatrix._arrays[1].unhighlight();
theDistributorMatrix._arrays[3].highlight();
av.step();

//slide 19
theDistributorMatrix._arrays[3].unhighlight();
theBridge1Matrix._arrays[4].unhighlight();
sate17X1st.hide();
var sate18X1st=av.label("<span style='color:green;'>Finally for forth record representation: Insert in</span> <span style='color:blue;'>(country/product)</span> bridge </br> Values <span style='color:red;'>(egypt (c1)/ blender (p3)</span>, But this time with different <span style='color:red;'>price=2300</span></br> for distributor <span style='color:blue;'>tarek</span>.", {left: 20, top:325 });
sate18X1st.css({"font-weight": "bold", "font-size": 16});
theBridge2Matrix._arrays[4].value(0,"<span style='color:red;'>c1</span>");
theBridge2Matrix._arrays[4].value(1,"<span style='color:red;'>p3</span>");
theBridge2Matrix._arrays[4].value(2,"<span style='color:red;'>2300</span>");
theBridge2Matrix._arrays[4].highlight();
theDistributorMatrix._arrays[3].unhighlight();
theCountryMatrix._arrays[1].highlight();
av.step();

//slide 20
sate18X1st.hide();
var sate19X1st=av.label("<span style='color:red;'>Error: impossible insertion</span> results in <span style='color:blue;'>primary key repetition</span>.", {left: 20, top:325 });
sate19X1st.css({"font-weight": "bold", "font-size": 16});
var PK1ellipse =av.g.ellipse(685,150,65,15, {"stroke-width": 3});
  var PK2ellipse =av.g.ellipse(685,120,65,15, {"stroke-width": 3});
  var Errorpointer = av.pointer("<span style='color:red;'><b>EEROR</b> </br> pK repition</br> not allowed</span>",theBridge2Matrix._arrays[3].index(1), {left: 150, top: 270});
  //var aliEgyptPricepointer = av.pointer("<span style='color:blue;'>adam's blender price for Egypt</span>",theBridge2Matrix._arrays[3].index(2), {left: 140, top: 150});
 // var aliUSAtPricepointer = av.pointer("<span style='color:green;'>tarek's blender price for Egypt</span>",theBridge2Matrix._arrays[4].index(2), {left: 55, top: 120});
av.step();

//slide 21
sate19X1st.hide();
var sate20X1st=av.label("<span style='color:red;'>Error:</span> prices different distributor set for the same product sold in the same country </br><span style='color:blue;'>cann't be represented</span> using this design.", {left: 20, top:325 });
sate20X1st.css({"font-weight": "bold", "font-size": 16});
av.step();

//slide 22
sate20X1st.hide();
var sate21X1st=av.label("<span style='color:red;'>Because</span> <span style='color:blue;'>only one</span> price per (product/country) <span style='color:blue;'>exists</span> in </br> solution 3 desgin <span style='color:blue;'>contradicting</span> store X requirement.", {left: 20, top:325 });
sate21X1st.css({"font-weight": "bold", "font-size": 16});
av.step();

  av.recorded();
});
