/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationshipStoreXSol2";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

 // var theArray1 = ["", "", "", ""];
 // var theArray2 = ["", "", "", ""];
 // var theArray3 = ["", "", "", ""];
  
  var av = new JSAV(av_name);

   //vertical array min.width=80 in insertionsortCON.css


   //some attributes controlling entities matrices
   //some attributes controlling entities matrices
  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=250;
  var arrayTop=50;

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

var StoreXsol2Analysis=av.label("<span style='color:blue;'>Store X Second Solution Analysis</span>", {left: 350, top: arrayTop-60 });
StoreXsol2Analysis.css({"font-weight": "bold", "font-size": 28});

var SolutionType=av.label("<span style='color:blue;'>Two Binary relaionships, (distributor/country) & (distributor/product) including price relationships</span>", {left: 70, top: arrayTop+40 });
SolutionType.css({"font-weight": "bold", "font-size": 22});

var Note=av.label("<span style='color:red;'>NOTE:</span> only Store X dataset records that reveal solution bugs will be examined for time saving", {left: 70, top: arrayTop+140 });
Note.css({"font-weight": "bold", "font-size": 18});



  // Slide 1
  av.umsg(interpret("Here are the problems' statments").bold().big());
  av.displayInit(1);
  av.step();

  //slide 2
  StoreXsol2Analysis.hide();
  SolutionType.hide();
  Note.hide();
  var theDataSetX = [["Country","Product","Distributer","Price"],["Egypt","watch","ali","3000"],["Egypt","TV","ali","5000"],["Egypt","Watch","adam","2500"],["Egypt","blender","tarek","2300"],["USA","TV","adam","4500"],["USA","watch","ali","4700"],["USA","blender","tarek","2000"],["UK","TV","adam","4000"],["UK","blender","adam","3000"]];
 
  av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store X solutions</span> to determine the correct one. <br> <span style='color:red;'>----->By analysing each solution according to the previously given datasets.</span><br><span style='color:blue;'> <u>Store X Second sol. analysis:</u></span> ").bold().big());
  var RealDataSetX= av.ds.matrix(theDataSetX, {style: "table", top: 0, left: 20 });
  var sate1X1st=av.label("These are tables representing second solution relations, try to fill tables with records in <br> dataset to see weather these relations can represent all records in dataset or not.<br> ", {left: 20, top:320 });
  sate1X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=0; i < theDataSetX.length; i++)
  {
   RealDataSetX._arrays[i].css([0,1,2,3], {"font-size": 12});
   RealDataSetX._arrays[i].show();
   //RealDataSetX._arrays[i].show();

  }
  var DistributorMatrixLab=av.label("<span style='color:blue;'>Distributor</span>", {left: 390, top:-15 });
  DistributorMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theDistributorArrays = [["D-no","D-name"],["d1","ali"],["d2","adam"],["d3","tarek"]];
  var theDistributorMatrix= av.ds.matrix(theDistributorArrays, {style: "table", top: 0, left: 390 });
  theDistributorMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistributorMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  
  var theDistConBrdgArrays = [["D-no","c-no"],["",""],["",""],["",""]];
  var theDistConBrdgMatrix= av.ds.matrix(theDistConBrdgArrays, {style: "table", top: 180, left: 450 });
  theDistConBrdgMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistConBrdgMatrix._arrays[0].css([0,1], {"text-decoration": "underline"});

  
  var Bridge1MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 620, top:-15 });
  Bridge1MatrixLab.css({"font-weight": "bold", "font-size": 14});
  var Bridge1MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 620, top:-15 });
  Bridge1MatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theBridge1Arrays = [["d-no","p-no","price"],["","",""],["","",""],["","",""]];
  var theBridge1Matrix= av.ds.matrix(theBridge1Arrays, {style: "table", top: 0, left: 620 });
  theBridge1Matrix._arrays[0].css([0,1,2], {"font-weight": "bold", "color": "black"});
  theBridge1Matrix._arrays[0].css([0,1], {"text-decoration": "underline"});
  Bridge1MatrixLab.hide();
 

  var CountryMatrixLab=av.label("<span style='color:blue;'>Country</span>", {left: 690, top:215 });
  CountryMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theCountryArrays = [["C-no","c-name"],["c1","Egypt"],["c2","USA"],["c3","UK"]];
  var theCountryMatrix= av.ds.matrix(theCountryArrays, {style: "table", top: 230, left: 690 });
  theCountryMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theCountryMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  var ProductMatrixLab=av.label("<span style='color:blue;'>Product</span>", {left: 910, top:-15 });
  ProductMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theProductArrays = [["p-no","p-name"],["p1","Watch"],["p2","TV"],["p3","blender"]];
  var theProductMatrix= av.ds.matrix(theProductArrays, {style: "table", top: 0, left: 910 });
  theProductMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theProductMatrix._arrays[0].css([0], {"text-decoration": "underline"});
  DMtrxDwnLine.show();
  DMtrxDwnCardLab.show();
  DistConBdgMtrxUpCardLab.show();
  DistConBdgMtrxRgtLine.show();
  ConMtrxLeftCardLab.show();
  DistConBdgMtrxRgtCardLab.show();
 // Bdg1ConMtrxVerLine.show();
 Bdg1DistMtrxHorLine.show();
 DistMtrxRgtCardLab.show();
 Bdg1MtrxLeftCardLab.show();
  ProdMtrxLeftCardLab.show();
  Bdg1MtrxRgtCardLab.show();
  Bdg1ProdMtrxHorLine.show();
  av.step();

  //slide 3
  sate1X1st.hide();
  var sate2X1st=av.label("To represent information given in the above highlighted record which says that:<br> <span style='color:blue;'>ali</span> with no.<span style='color:red;'>d1</span>  distributes at <span style='color:blue;'>egypt</span> with id <span style='color:red;'>c1</span>", {left: 20, top:310 });
  sate2X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[1].highlight();
  av.step();

  //slide 4
  theDistributorMatrix._arrays[1].highlight();
  theCountryMatrix._arrays[1].highlight();
  theDistConBrdgMatrix._arrays[1].value(0,"<span style='color:red;'>d1</span>");
  theDistConBrdgMatrix._arrays[1].value(1,"<span style='color:red;'>c1</span>");
  sate2X1st.hide();
  var sate3X1st=av.label("this relation between <span style='color:blue;'>ali & egypt</span> represented by:<br> inserting their numbers in <span style='color:red;'>Distributor/Country bridge</span>", {left: 20, top:310 });
  sate3X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

   //slide 5
   theCountryMatrix._arrays[1].unhighlight();
   theProductMatrix._arrays[1].highlight();
   sate3X1st.hide();
   var sate4X1st=av.label("<span style='color:blue;'>ali sells in egypt</span> product <span style='color:blue;'>watch</span> with id <span style='color:red;'>(p1)</span> with <span style='color:blue;'>price</span> <span style='color:red;'>3000</span> <br> according to Store X second sol.<br> we have <span style='color:red;'>distributor/product</span> relation including <span style='color:blue;'>price</span>", {left: 20, top:310 });
   sate4X1st.css({"font-weight": "bold", "font-size": 16});
   av.step();

    //slide 6
  theBridge1Matrix._arrays[1].value(0,"<span style='color:red;'>d1</span>");
  theBridge1Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
  theBridge1Matrix._arrays[1].value(2,"<span style='color:red;'>3000</span>");
  sate4X1st.hide();
  var sate5X1st=av.label("Then Fill <span style='color:red;'>Distributor/product</span> with this data", {left: 20, top:310 });
  sate5X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 7
  RealDataSetX._arrays[1].unhighlight();
  RealDataSetX._arrays[2].highlight();
  theDistributorMatrix._arrays[1].unhighlight();
  theProductMatrix._arrays[1].unhighlight();
  sate5X1st.hide();
  var sate6X1st=av.label("Record 2 in dataset will be <span style='color:red;'>skipped</span> for time saving as it <span style='color:red;'>doesn't</span> reveal solution bugs", {left: 20, top:310 });
  sate6X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 8
  RealDataSetX._arrays[2].unhighlight();
  RealDataSetX._arrays[3].highlight();
  sate6X1st.hide();
  theDistConBrdgMatrix._arrays[2].value(0,"<span style='color:red;'>d2</span>");
  theDistConBrdgMatrix._arrays[2].value(1,"<span style='color:red;'>c1</span>");
  theDistributorMatrix._arrays[2].highlight();
  theCountryMatrix._arrays[1].highlight();
  var sate7X1st=av.label("<span style='color:green;'>Next record</span> in dataset, different distributor <span style='color:blue;'>adam</span> <span style='color:red;'>(d2)</span> also sells the  same product</br> <span style='color:blue;'>watch</span> in <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span> as distributor ali<br> <span style='color:red;'>adam/egypt</span> added in <span style='color:red;'>distributor/country</span> bridge.", {left: 20, top:310 });
  sate7X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[2].highlight();
  av.step();

  //slide 9
  sate7X1st.hide();
  theProductMatrix._arrays[1].highlight();
  theDistributorMatrix._arrays[2].highlight();
  theCountryMatrix._arrays[1].unhighlight();
  var sate8X1st=av.label("<span style='color:green;'>pay attention:</span> that adam sell watches in egypt with different price than ali </br><span style='color:red;'>adam (d2)/watch (p1) with price 2500</span> added to</br> <span style='color:blue;'>distributor/product</span> bridge.", {left: 20, top:310 });
  sate8X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[2].unhighlight();
  theBridge1Matrix._arrays[2].value(0,"<span style='color:red;'>d2</span>");
  theBridge1Matrix._arrays[2].value(1,"<span style='color:red;'>p1</span>");
  theBridge1Matrix._arrays[2].value(2,"<span style='color:red;'>2500</span>");
  theBridge1Matrix._arrays[2].highlight();
  av.step();

  //slide 10
  sate8X1st.hide();
  RealDataSetX._arrays[6].highlight();
  RealDataSetX._arrays[3].unhighlight();
  theProductMatrix._arrays[1].unhighlight();
  theDistributorMatrix._arrays[2].unhighlight();
  theBridge1Matrix._arrays[2].unhighlight();
  var sate9X1st=av.label("<span style='color:green;'>Skip records 4,5</span> jump to record 6 where</br> the same distributor <span style='color:blue;'>ali (d1)</span> sells the same product <span style='color:blue;'>watch (p1)</span> in different country</br> <span style='color:blue;'>USA (c2)</span>", {left: 20, top:310 });
  sate9X1st.css({"font-weight": "bold", "font-size": 16});
  theDistributorMatrix._arrays[1].highlight();
  theCountryMatrix._arrays[2].highlight();
  av.step();
 
  //slide 11
  sate9X1st.hide();
  var sate10X1st=av.label("add <span style='color:red;'>ali/USA</span> relation in <span style='color:blue;'>distributor/country</span> bridge.", {left: 20, top:310 });
  sate10X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[3].value(0,"<span style='color:red;'>d1</span>");
  theDistConBrdgMatrix._arrays[3].value(1,"<span style='color:red;'>c2</span>");
  theDistConBrdgMatrix._arrays[3].highlight();
  av.step();

  //slide 12
  sate10X1st.hide();
  var sate11X1st=av.label("Now it's time to add  <span style='color:red;'>ali/watch</span> relation in <span style='color:blue;'>distributor/product</span> bridge</br> with the <span style='color:blue;'>new price=4700</span> of USA.", {left: 20, top:310 });
  sate11X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[3].unhighlight();
  theCountryMatrix._arrays[2].unhighlight();
  theProductMatrix._arrays[1].highlight();
  theBridge1Matrix._arrays[3].value(0,"<span style='color:red;'>d1</span>");
  theBridge1Matrix._arrays[3].value(1,"<span style='color:red;'>p1</span>");
  theBridge1Matrix._arrays[3].value(2,"<span style='color:red;'>4700</span>");
  theBridge1Matrix._arrays[3].highlight();
  av.step();

  //slide 13
  sate11X1st.hide();
  var sate12X1st=av.label("<span style='color:red;'>Is this possible?</span> .", {left: 20, top:310 });
  sate12X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 14
  sate12X1st.hide();
  var sate13X1st=av.label("<span style='color:red;'>No, it's not possible</span> as it results in <span style='color:blue;'>primary key redundancy</span> as shown above.", {left: 20, top:310 });
  sate13X1st.css({"font-weight": "bold", "font-size": 16});
  var PK1ellipse =av.g.ellipse(685,120,65,15, {"stroke-width": 3});
  var PK2ellipse =av.g.ellipse(685,60,65,15, {"stroke-width": 3});
  var Errorpointer = av.pointer("<span style='color:red;'><b>EEROR 1</b> </br> primary key repition</br> not allowed</span>",theBridge1Matrix._arrays[3].index(1), {left: 200, top: 250});
  var aliEgyptPricepointer = av.pointer("<span style='color:blue;'>ali's watch price for Egypt</span>",theBridge1Matrix._arrays[1].index(2), {left: 140, top: 150});
  var aliUSAtPricepointer = av.pointer("<span style='color:green;'>ali's watch price for USA</span>",theBridge1Matrix._arrays[3].index(2), {left: 55, top: 120});
  theBridge1Matrix._arrays[1].value(2,"<span style='color:blue;'>3000</span>");
  theBridge1Matrix._arrays[3].value(2,"<span style='color:green;'>4700</span>");
  av.step();

  //slide 15
  sate13X1st.hide();
  var sate14X1st=av.label("<span style='color:red;'>Error 1:</span> only <span style='color:blue;'>one price per product</span> is set for each distributor </br> contradicting Store x requirement that allows distributors to set different prices for </br>a given product in different countries .", {left: 20, top:310 });
  sate14X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 16
  sate14X1st.hide();
  var sate15X1st=av.label("<span style='color:green;'>Next,</span> put highlighted record in store X dataset in <span style='color:red;'>relational tables here</span> .", {left: 20, top:310 });
  sate15X1st.css({"font-weight": "bold", "font-size": 16});
   PK1ellipse.hide();
   PK2ellipse.hide();
   Errorpointer.hide();
   aliEgyptPricepointer.hide();
   aliUSAtPricepointer.hide();
   theBridge1Matrix._arrays[1].value(2,"<span style='color:red;'>3000</span>");
   theBridge1Matrix._arrays[3].value(2," "); 
   theBridge1Matrix._arrays[3].value(0," ");
   theBridge1Matrix._arrays[3].value(1," ");
   theBridge1Matrix._arrays[3].unhighlight();
   theDistributorMatrix._arrays[1].unhighlight();
   theProductMatrix._arrays[1].unhighlight();
   RealDataSetX._arrays[6].unhighlight();
   RealDataSetX._arrays[8].highlight();
   theDistConBrdgMatrix._arrays[3].value(0," ");
   theDistConBrdgMatrix._arrays[3].value(1," ");
  av.step();

  //slide 17
  theDistConBrdgMatrix._arrays[3].value(0,"<span style='color:red;'>d2</span>");
   theDistConBrdgMatrix._arrays[3].value(1,"<span style='color:red;'>c3</span>");
  sate15X1st.hide();
  var sate16X1st=av.label("<span style='color:blue;'>(adam/UK)</span> = <span style='color:red;'>(d2/c3)</span> inserted in <span style='color:blue;'>(distributor/Contry)</span> bridge.  .", {left: 20, top:310 });
  sate16X1st.css({"font-weight": "bold", "font-size": 16});
  theCountryMatrix._arrays[3].highlight();
  theDistributorMatrix._arrays[2].highlight();
  theDistConBrdgMatrix._arrays[3].highlight();
  av.step();

  //slide 18
  sate16X1st.hide();
  var sate17X1st=av.label("<span style='color:blue;'>(adam/TV)</span> = <span style='color:red;'>(d2/p2)</span> inserted in <span style='color:blue;'>(distributor/product)</span> bridge with <span style='color:blue;'>price=4000</span>.", {left: 20, top:310 });
  sate17X1st.css({"font-weight": "bold", "font-size": 16});
  theCountryMatrix._arrays[3].unhighlight();
  theDistConBrdgMatrix._arrays[3].unhighlight();
  theProductMatrix._arrays[2].highlight();
  theBridge1Matrix._arrays[3].value(0,"<span style='color:red;'>d2</span>");
  theBridge1Matrix._arrays[3].value(1,"<span style='color:red;'>p2</span>");
  theBridge1Matrix._arrays[3].value(2,"<span style='color:red;'>4000</span>");
  theBridge1Matrix._arrays[3].highlight();
  av.step();

  //slide 19
  for (var i=0; i < theDataSetX.length; i++)
   {
    RealDataSetX._arrays[i].hide();
   }
   theDistributorMatrix._arrays[2].unhighlight();
   theBridge1Matrix._arrays[3].unhighlight();
   theProductMatrix._arrays[2].unhighlight();
  sate17X1st.hide();
  var sate18X1st=av.label("If we hide store X dataset,</br><span style='color:red;'>Error 2:</span> second solution ERD design is <span style='color:blue;'>insufficient</span> </br>to convey all right information existing in store x dataset.", {left: 20, top:310 });
  sate18X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 20
  sate18X1st.hide();
  var sate19X1st=av.label("From <span style='color:blue;'>(distributor/product)</span> table we can know for example that, </br>distributor <span style='color:red;'>d2 (adam)</span> sells two products <span style='color:blue;'>p1 & p2 (watch/TV)</span></br>(i.e. from this bridge we can know which products each distributor sells).", {left: 20, top:310 });
  sate19X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge1Matrix._arrays[2].highlight(0);
  theBridge1Matrix._arrays[2].highlight(1);
  theBridge1Matrix._arrays[3].highlight(0);
  theBridge1Matrix._arrays[3].highlight(1);
  av.step();

  //slide 21
  sate19X1st.hide();
  var sate20X1st=av.label("From <span style='color:blue;'>(distributor/contry)</span> we can know for example that, the same </br>distributor <span style='color:red;'>d2 (adam)</span> sells products in two contries <span style='color:blue;'>c1 & c3 (Egypt/UK)</span></br>(i.e. from this bridge we can know who sells products in each country).", {left: 20, top:310 });
  sate20X1st.css({"font-weight": "bold", "font-size": 16});
  theDistConBrdgMatrix._arrays[2].highlight();
  theDistConBrdgMatrix._arrays[3].highlight();
  av.step();

  //slise 22
  sate20X1st.hide();
  var sate21X1st=av.label("But we <span style='color:red;'>cann't know</span> which product adam sells in which country </br><span style='color:blue;'>Does adam sell TVs in egypt?</span></br><span style='color:blue;'>Does adam sell watches in egypt?</span> <i> the same confusion is also for UK</i>.", {left: 20, top:310 });
  sate21X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

   //slise 23
   sate21X1st.hide();
   var sate22X1st=av.label("The <span style='color:red;'>conclusion</span> is that the <span style='color:blue;'>(country/product) relation </span> <span style='color:red;'>is missed</span> in this solution.", {left: 20, top:310 });
   sate22X1st.css({"font-weight": "bold", "font-size": 16});
   av.step();

  av.recorded();
});
