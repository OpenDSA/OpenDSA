/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationshipStoreYSol3";
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
var DMtrxDwnLine = av.g.line(480, 135,  480, 280,{opacity: 100, "stroke-width": 2});
DMtrxDwnLine.hide();
var DMtrxDwnCardLab=av.label("<span style='color:blue;'>M</span>", {left: 483, top:120 });
DMtrxDwnCardLab.css({"font-weight": "bold", "font-size": 15});
DMtrxDwnCardLab.hide();
//var DistConBdgMtrxUpCardLab=av.label("<span style='color:blue;'>M</span>", {left: 483, top:165 });
//DistConBdgMtrxUpCardLab.css({"font-weight": "bold", "font-size": 15});
//DistConBdgMtrxUpCardLab.hide();

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
var DistConBdgMtrxRgtLine = av.g.line(480, 280,  690, 280,{opacity: 100, "stroke-width": 2});
DistConBdgMtrxRgtLine.hide();
var ConMtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 680, top:245 });
ConMtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
ConMtrxLeftCardLab.hide();
//var DistConBdgMtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 595, top:245 });
//DistConBdgMtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
//DistConBdgMtrxRgtCardLab.hide();

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
var Bdg1DistMtrxHorLine = av.g.line(620, 90,  560, 90,{opacity: 100, "stroke-width": 2});
Bdg1DistMtrxHorLine.hide();
var DistMtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 605, top:55 });
DistMtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
DistMtrxRgtCardLab.hide();
var Bdg1MtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 563, top:55 });
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

// to lines forming X sign to get rid of redundant relation distributor/product bridge
var WronSignRedundantRelation1 = av.g.line(910, 190,  1050, 350,{opacity: 100, "stroke-width": 4, "stroke":"red"});
WronSignRedundantRelation1.hide();

var WronSignRedundantRelation2 = av.g.line(1050, 190,  910, 350,{opacity: 100, "stroke-width": 4, "stroke":"red"});
WronSignRedundantRelation2.hide();

var StoreXsol3Analysis=av.label("<span style='color:blue;'>Store Y Third & Forth Solutions Analysis</span>", {left: 350, top: arrayTop-60 });
StoreXsol3Analysis.css({"font-weight": "bold", "font-size": 28});

var SolutionType=av.label("<span style='color:blue;'>- Three Binary relationships, 1:M (distributor/country) , N:M (distributor/product) & N:M (country/product) including price relationships</span>", {left: 70, top: arrayTop+60 });
SolutionType.css({"font-weight": "bold", "font-size": 22});

var SolutionType1=av.label("<span style='color:blue;'>- Two Binary relationships, 1:M (distributor/country) & N:M (country/product) including price relationships</span>", {left: 70, top: arrayTop+145 });
SolutionType1.css({"font-weight": "bold", "font-size": 22});

var Note=av.label("<span style='color:red;'>NOTE:</span> only Store Y dataset records that reveal solution bugs will be examined for time saving", {left: 70, top: arrayTop+280 });
Note.css({"font-weight": "bold", "font-size": 18});

  // Slide 1
  av.umsg(interpret("Here are the problems' statments").bold().big());
  av.displayInit(1);
 av.step();

  //slide 2
  StoreXsol3Analysis.hide();
  SolutionType.hide();
  SolutionType1.hide();
  Note.hide();
  var theDataSetY =  [["Country","Product","Distributer","Price"],["Egypt","TV","ali","3000"],["Egypt","watch","ali","5000"],["UK","blender","ali","2500"],["UK","watch","ali","2300"],["USA","TV","adam","4500"],["USA","watch","adam","4700"],["USA","blender","adam","2000"],["lebanon","TV","morad","4000"],["lebanon","blender","morad","3000"]];
  av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store Y solutions</span> to determine the correct one. <br> <br><span style='color:blue;'> <u>Store Y third sol. analysis:</u></span> ").bold().big());
  var RealDataSetY= av.ds.matrix(theDataSetY, {style: "table", top: 0, left: 20 });
  var sate1X1st=av.label("These are tables representing third solution relations, try to fill tables with records in <br> dataset to see weather these relations are correct or not.", {left: 20, top:325 });
  sate1X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=0; i < theDataSetY.length; i++)
  {
   RealDataSetY._arrays[i].css([0,1,2,3], {"font-size": 12});
   RealDataSetY._arrays[i].show();

  }
  var DistributorMatrixLab=av.label("<span style='color:blue;'>Distributor</span>", {left: 690, top:215 });
  DistributorMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theDistributorArrays = [["D-no","D-name"],["d1","ali"],["d2","adam"],["d3","tarek"]];
  var theDistributorMatrix= av.ds.matrix(theDistributorArrays, {style: "table", top: 230, left: 690 });
  theDistributorMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistributorMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  //var DistConBrdgMatrixLab=av.label("<span style='color:blue;'></span>", {left: 390, top:-15 });
  //DistConBrdgMatrixLab.css({"font-weight": "bold", "font-size": 14});
  //var theDistConBrdgArrays = [["D-no","c-no"],["",""],["",""],["",""],["",""]];
  //var theDistConBrdgMatrix= av.ds.matrix(theDistConBrdgArrays, {style: "table", top: 180, left: 450 });
  //theDistConBrdgMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  //theDistConBrdgMatrix._arrays[0].css([0,1], {"text-decoration": "underline"});

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

  var CountryMatrixLab=av.label("<span style='color:blue;'>Country</span>", {left: 350, top:-15 });
  CountryMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theCountryArrays = [["C-no","c-name", "d-no"],["c1","Egypt", ""],["c2","USA", ""],["c3","UK", ""]];
  var theCountryMatrix= av.ds.matrix(theCountryArrays, {style: "table", top: 0, left: 350 });
  theCountryMatrix._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  theCountryMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  var ProductMatrixLab=av.label("<span style='color:blue;'>Product</span>", {left: 910, top:-15 });
  ProductMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theProductArrays = [["p-no","p-name"],["p1","TV"],["p2","Watch"],["p3","blender"]];
  var theProductMatrix= av.ds.matrix(theProductArrays, {style: "table", top: 0, left: 910 });
  theProductMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theProductMatrix._arrays[0].css([0], {"text-decoration": "underline"});
  DMtrxDwnLine.show();
  DMtrxDwnCardLab.show();
 // DistConBdgMtrxUpCardLab.show();
  DistConBdgMtrxRgtLine.show();
  ConMtrxLeftCardLab.show();
 // DistConBdgMtrxRgtCardLab.show();
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
  var sate2X1st=av.label("In this solution inserting for example first dataset record requires inserting </br>in three different tables.", {left: 20, top:325 });
  sate2X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetY._arrays[1].highlight();
  av.step();

  //slide 4
  sate2X1st.hide();
  var sate3X1st=av.label("As <span style='color:green;'>(ali)</span> is the distributor of <span style='color:blue;'>(egypt)</span> </br>So ali's id <span style='color:green;'>(d1)</span> should be inserted in country table as a <span style='color:green;'>foreign key</span>, to represent </br> distributor/country <span style='color:green;'>(1:M)</span> relation.", {left: 20, top:315 });
  sate3X1st.css({"font-weight": "bold", "font-size": 16});
  theCountryMatrix._arrays[1].value(2,"<span style='color:red;'>d1</span>");
  theDistributorMatrix._arrays[1].highlight();
  theCountryMatrix._arrays[1].highlight();
  var FKPOinter = av.pointer("<span style='color:red;'><b>FK of distributor</b></span>",theCountryMatrix._arrays[2].index(2), {right: 150, top: 270});
  av.step();

  //slide 5
  sate3X1st.hide();
  FKPOinter.hide();
  var sate4X1st=av.label("To specify that <span style='color:green;'>TV</span> is the product that ali sells in <span style='color:green;'>Egypt</span> with <span style='color:green;'>price=3000</span> </br> Fill in <span style='color:blue;'>(country/product)</span> bridge as shown.", {left: 20, top:315 });
  sate4X1st.css({"font-weight": "bold", "font-size": 16});
  theProductMatrix._arrays[1].highlight();
  theBridge2Matrix._arrays[1].value(0,"<span style='color:red;'>c1</span>");
  theBridge2Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
  theBridge2Matrix._arrays[1].value(2,"<span style='color:red;'>3000</span>");
  av.step();

  //slide 6
  sate4X1st.hide();
  var sate5X1st=av.label("<span style='color:green;'>who sells TV in Egypt?</span> <span style='color:blue;'>(ali)</span> </br>So last step is to fill in <span style='color:green;'>(distributor/product)</span> bridge.", {left: 20, top:315 });
  sate5X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[1].value(0,"<span style='color:red;'>d1</span>");
  theBridge1Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
  av.step();

  //slide 7
  theBridge1Matrix._arrays[1].unhighlight();
  sate5X1st.hide();
  var sate6X1st=av.label("All other dataset records should be inserted in the same way as done with first record. </br> <span style='color:red;'>But the problem here</span> is that <span style='color:green;'>no constraints exist</span> to ensure <span style='color:green;'>data integrity</span></br> Assume that user entered a wrong data while filling in (distributor/product) bridge", {left: 20, top:315 });
  sate6X1st.css({"font-weight": "bold", "font-size": 16});
  var redundantRelationConflict =av.g.ellipse(980,240,65,15, {"stroke-width": 3,"stroke":"red" });
  theBridge1Matrix._arrays[1].value(0,"");
  theBridge1Matrix._arrays[1].value(1,"");
  av.step();

 //slide 8
 sate6X1st.hide();
 var sate7X1st=av.label("Assume for any reason that <span style='color:green;'>(id=d2)</span> is inserted for ali instead of <span style='color:green;'>(d1)</span> in the </br> (distributor/product) for last step of representing first dataset recod.", {left: 20, top:325 });
 sate7X1st.css({"font-weight": "bold", "font-size": 16});
 theBridge1Matrix._arrays[1].value(0,"<span style='color:red;'>d2</span>");
  theBridge1Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
 av.step();  

 //slide 9
 redundantRelationConflict.hide();
 sate7X1st.hide();
 var sate8X1st=av.label("<span style='color:green;'>Unfortunately,</span> the design will not recognize this data conflict. </br> <span style='color:green;'>d-no</span> in <span style='color:blue;'>(distributor/product)</span> bridge should be equal to <span style='color:green;'>d-no (FK)</span> in <span style='color:blue;'>country table</span></br> This design allows <span style='color:red;'>data corruption</span>.", {left: 20, top:315 });
 sate8X1st.css({"font-weight": "bold", "font-size": 16});
 var DnoCountry =av.g.ellipse(530,60,15,15, {"stroke-width": 3,"stroke":"red"});
 var DnoBridge =av.g.ellipse(945,240,15,15, {"stroke-width": 3,"stroke":"red"});
 var DnoCountryPOinter = av.pointer("<span style='color:red;'><b>value conflict</b></span>",theCountryMatrix._arrays[2].index(2), {left: 100, top: 270});
 var DnoBridgePOinter = av.pointer("<span style='color:red;'><b>value conflict</b></span>",theBridge1Matrix._arrays[2].index(0), {right: 150, top: 100});
 av.step();

 //slide 10
 DnoCountryPOinter.hide();
 DnoBridgePOinter.hide();
 DnoCountry.hide();
 DnoBridge.hide();
 sate8X1st.hide();
 var sate9X1st=av.label("<span style='color:green;'>Redundant relationships</span> is the drawback of this design </br>The redundancy is in distributor/product direct relation, this relation is indirectly exists </br>in the design through the country entity </br> To illustrate this concept dataset was hidened.", {left: 20, top:290 });
 sate9X1st.css({"font-weight": "bold", "font-size": 16});
 theCountryMatrix._arrays[1].unhighlight();
 theDistributorMatrix._arrays[1].unhighlight();
 theProductMatrix._arrays[1].unhighlight();
 theBridge1Matrix._arrays[1].value(0,"");
  theBridge1Matrix._arrays[1].value(1,"");
 for (var i=0; i < theDataSetY.length; i++)
  {
   RealDataSetY._arrays[i].hide();
  }
 theBridge2Matrix._arrays[2].value(0,"<span style='color:red;'>c1</span>");
 theBridge2Matrix._arrays[2].value(1,"<span style='color:red;'>p2</span>");
 theBridge2Matrix._arrays[2].value(2,"<span style='color:red;'>5000</span>");
 av.step();

 //slide 11
 theDistributorMatrix._arrays[1].unhighlight();
 theBridge1Matrix._arrays[2].unhighlight();
 sate9X1st.hide();
 var sate10X1st=av.label("The selected part in the design <span style='color:green;'>(1:M) relation</span> between <span style='color:green;'>(country & distributor)</span> means , </br> <b>Each country is associated with only one distributor</b>.", {left: 20, top:325 });
 sate10X1st.css({"font-weight": "bold", "font-size": 16});
 var OneMRelationCDPart =av.g.ellipse(450,170,100,170, {"stroke-width": 3,"stroke":"red"});
 av.step();

//slide 12
OneMRelationCDPart.hide();
sate10X1st.hide();
var sate11X1st=av.label("While this part of the design relates each <span style='color:green;'>country</span> to all <span style='color:green;'>its products</span>.", {left: 20, top:325 });
sate11X1st.css({"font-weight": "bold", "font-size": 16});
var MMRelationCPPart =av.g.ellipse(700,75,400,70, {"stroke-width": 3,"stroke":"red"});
av.step();

//slide 13
MMRelationCPPart.hide();
sate11X1st.hide();
var sate12X1st=av.label("<span style='color:green;'>For Exapmle:</span> By looking at first record in country table  we know </br> that Ali is the sole distributor in Egypt (c1) through <span style='color:green;'>FK (d-no=d1)</span>.", {left: 20, top:325 });
  sate12X1st.css({"font-weight": "bold", "font-size": 16});
  theCountryMatrix._arrays[1].highlight();
  theDistributorMatrix._arrays[1].highlight();
  DnoCountry.show();
av.step();

//slide 14
theDistributorMatrix._arrays[1].unhighlight();
DnoCountry.hide();
sate12X1st.hide();
var sate13X1st=av.label("And from <span style='color:green;'>first & second record in (country/product)</span> bridge, we know that </br><span style='color:blue;'>TVs (p1) & watches (p2) are sold in Egypt (c1)</span>.", {left: 20, top:325 });
sate13X1st.css({"font-weight": "bold", "font-size": 16});
theCountryMatrix._arrays[1].unhighlight();
theBridge2Matrix._arrays[1].highlight();
theBridge2Matrix._arrays[2].highlight();
av.step();

//slide 15
sate13X1st.hide();
var sate14X1st=av.label("Then logically we can conclude that ali is the only distributor of tvs and watches</br> without need to use the direct distributor/product relation.", {left: 20, top:325 });
sate14X1st.css({"font-weight": "bold", "font-size": 16});
theBridge2Matrix._arrays[1].unhighlight();
theBridge2Matrix._arrays[2].unhighlight();
theCountryMatrix._arrays[1].highlight();
theProductMatrix._arrays[1].highlight();
theDistributorMatrix._arrays[1].highlight();
av.step();

//slide 16
sate14X1st.hide();
var sate15X1st=av.label("So we should git rid of the useless redundant distributor/product relation.", {left: 20, top:325 });
sate15X1st.css({"font-weight": "bold", "font-size": 16});
theCountryMatrix._arrays[1].unhighlight();
theProductMatrix._arrays[1].unhighlight();
theDistributorMatrix._arrays[1].unhighlight();
RealDataSetY._arrays[1].unhighlight();
for (var i=0; i < theDataSetY.length; i++)
  {
   RealDataSetY._arrays[i].show();
  }
  WronSignRedundantRelation1.show();
  WronSignRedundantRelation2.show();
av.step();

//slide 17
WronSignRedundantRelation1.hide();
WronSignRedundantRelation2.hide();
av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store Y solutions</span> to determine the correct one. <br> <span style='color:orange;'>Pay attention as the forth design is the correct solution </span> <br><span style='color:blue;'> <u>Store Y forth sol. analysis:</u></span> ").bold().big());
sate15X1st.hide();
var sate16X1st=av.label("<span style='color:green;'>The new effecient solution after removing the redundant relation is here</span>.", {left: 20, top:325 });
  sate16X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=0; i < theBridge1Arrays.length; i++)
  {
   theBridge1Matrix._arrays[i].hide();
  }
  ProdMtrxDwnLine.hide();
  prodMtrxDwnCardLab.hide();
  DistProdBdgMtrxUpCardLab.hide();
  DistProdBdgMtrxLeftLine.hide();
  DistMtrxRgtCardLab2.hide();
  DistProdBdgMtrxLeftCardLab.hide();
 // StoreXsol3Analysis.hide();
//  var notification=av.label("<span style='color:orange;'>Pay attention as the forth design is the correct solution </span>", {left: 350, top: arrayTop-30 });
//  notification.css({"font-weight": "bold", "font-size": 28});
 // var StoreXsol4Analysis=av.label("<span style='color:blue;'>Store Y forth Solution Analysis</span>", {left: 350, top: arrayTop-60 });
 // StoreXsol4Analysis.css({"font-weight": "bold", "font-size": 28});
av.step();

//slide 18
//notification.hide();
sate16X1st.hide();
var sate17X1st=av.label("Continue inserting dataset records here to ensure <span style='color:green;'>solution correctness</span> </br> In dataset third record as distributor ali also sells in uk</br> ali's id inserted in FK feild at UK record in country table.", {left: 20, top:315 });
sate17X1st.css({"font-weight": "bold", "font-size": 16});
RealDataSetY._arrays[3].highlight();
theCountryMatrix._arrays[3].value(2,"<span style='color:red;'>d1</span>");
theCountryMatrix._arrays[3].highlight();
theDistributorMatrix._arrays[1].highlight();
av.step();

//slide 19
sate17X1st.hide();
var sate18X1st=av.label("As ali sells <span style='color:green;'>blenders with price=2500 </span> in <span style='color:blue;'>UK</span>  </br> Then insert <span style='color:red;'>UK-id (c3) & blender-id (p3)</span> in <span style='color:red;'>(product/country)</span> bridge.", {left: 20, top:325 });
sate18X1st.css({"font-weight": "bold", "font-size": 16});
theBridge2Matrix._arrays[3].value(0,"<span style='color:red;'>c3</span>");
theBridge2Matrix._arrays[3].value(1,"<span style='color:red;'>p3</span>");
theBridge2Matrix._arrays[3].value(2,"<span style='color:red;'>2500</span>");
//theBridge2Matrix._arrays[4].highlight();
//theDistributorMatrix._arrays[3].unhighlight();
theProductMatrix._arrays[3].highlight();
av.step();

//slide 20
sate18X1st.hide();
var sate19X1st=av.label("While inserting dataset forth record skip <span style='color:red;'>first step (adding distributor id as</br> a FK in country table)</span> because UK has only one exclusive distributor ali whose</br> id <span style='color:blue;'>is already added</span> at previous record insertion process </i>(record 3 in dataset)</i>.", {left: 20, top:305 });
sate19X1st.css({"font-weight": "bold", "font-size": 16});
RealDataSetY._arrays[4].highlight();
RealDataSetY._arrays[3].unhighlight();
theProductMatrix._arrays[3].unhighlight();
  //var aliEgyptPricepointer = av.pointer("<span style='color:blue;'>adam's blender price for Egypt</span>",theBridge2Matrix._arrays[3].index(2), {left: 140, top: 150});
 // var aliUSAtPricepointer = av.pointer("<span style='color:green;'>tarek's blender price for Egypt</span>",theBridge2Matrix._arrays[4].index(2), {left: 55, top: 120});
av.step();

//slide 21
sate19X1st.hide();
var sate20X1st=av.label("<span style='color:red;'>But</span> the relation between <span style='color:blue;'>UK & watches</span> sold there with price <span style='color:blue;'>2300</span> </br> should be expressed by inserting (c3, p2) Keys in (country/product) bridge.", {left: 20, top:325 });
sate20X1st.css({"font-weight": "bold", "font-size": 16});
theProductMatrix._arrays[2].highlight();
theBridge2Matrix._arrays[4].value(0,"<span style='color:red;'>c3</span>");
theBridge2Matrix._arrays[4].value(1,"<span style='color:red;'>p2</span>");
theBridge2Matrix._arrays[4].value(2,"<span style='color:red;'>2300</span>");
av.step();

//slide 22
sate20X1st.hide();
var sate21X1st=av.label("<span style='color:red;'>Record 5 insertion</span> results shown at diagram where <span style='color:blue;'>USA country</span> linked with distributor </br>adam through adding <span style='color:blue;'>d2 as a FK</span> in the country table. </br> Then add record details of <span style='color:blue;'>USA product & its price</span> in (product/country) bridge.", {left: 20, top:310 });
sate21X1st.css({"font-weight": "bold", "font-size": 16});
RealDataSetY._arrays[5].highlight();
RealDataSetY._arrays[4].unhighlight();
theProductMatrix._arrays[2].unhighlight();
theProductMatrix._arrays[1].highlight();
theCountryMatrix._arrays[3].unhighlight();
theCountryMatrix._arrays[2].highlight();
theDistributorMatrix._arrays[1].unhighlight();
theDistributorMatrix._arrays[2].highlight();
theBridge2Matrix._arrays[5].value(0,"<span style='color:red;'>c2</span>");
theBridge2Matrix._arrays[5].value(1,"<span style='color:red;'>p1</span>");
theBridge2Matrix._arrays[5].value(2,"<span style='color:red;'>4500</span>");
theCountryMatrix._arrays[2].value(2,"<span style='color:red;'>d2</span>");
av.step();

//slide 23
sate21X1st.hide();
var sate22X1st=av.label("<span style='color:red;'>The remaining dataset records</span> shoulld be added in the same way</br> IF new country or distributor founded (e.g. lebanon country, distributor morad) </br> in record 8 & 9 in dataset, their data should be added as new records in main tables (country & distributor).", {left: 20, top:300 });
sate22X1st.css({"font-weight": "bold", "font-size": 16});
theCountryMatrix._arrays[2].unhighlight();
theDistributorMatrix._arrays[2].unhighlight();
theProductMatrix._arrays[1].unhighlight();
RealDataSetY._arrays[5].unhighlight();
RealDataSetY._arrays[6].highlight();
RealDataSetY._arrays[7].highlight();
RealDataSetY._arrays[8].highlight();
RealDataSetY._arrays[9].highlight();
av.step();

//slide 24
sate22X1st.hide();
var sate23X1st=av.label("As proved <span style='color:red;'>forth solution</span> is the correct design for store Y</br> - Effeciently fulfill all store Y requirments </br> - No redundant relations, no data conflict </br> - No violation for primary key constraint or data integrity.", {left: 20, top:295 });
sate23X1st.css({"font-weight": "bold", "font-size": 16});
RealDataSetY._arrays[6].unhighlight();
RealDataSetY._arrays[7].unhighlight();
RealDataSetY._arrays[8].unhighlight();
RealDataSetY._arrays[9].unhighlight();
av.step();

  av.recorded();
});
