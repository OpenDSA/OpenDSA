/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationshipStoreXSol4";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

  
  var av = new JSAV(av_name);
  
   //some attributes controlling entities matrices
  var arrayWidth=120;
  var arrayLeft=60;
  var arrayGap=250;
  var arrayTop=50;

//line connecting distributor to original bridge (product/country/distributor including price
var Bdg1DistMtrxHorLine = av.g.line(560, 90,  480, 90,{opacity: 100, "stroke-width": 2});
Bdg1DistMtrxHorLine.hide();
var DistMtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 540, top:55 });
DistMtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
DistMtrxRgtCardLab.hide();
var Bdg1MtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 485, top:55 });
Bdg1MtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxLeftCardLab.hide();

//line connecting product to original bridge (product/country/distributor including price
var Bdg1ProdMtrxHorLine = av.g.line(845, 90,  910, 90,{opacity: 100, "stroke-width": 2});
Bdg1ProdMtrxHorLine.hide();
var ProdMtrxLeftCardLab=av.label("<span style='color:blue;'>1</span>", {left: 900, top:55 });
ProdMtrxLeftCardLab.css({"font-weight": "bold", "font-size": 15});
ProdMtrxLeftCardLab.hide();
var Bdg1MtrxRgtCardLab=av.label("<span style='color:blue;'>M</span>", {left: 845, top:55 });
Bdg1MtrxRgtCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxRgtCardLab.hide();

//line connecting country to original bridge (product/country/distributor including price
var Bdg1ConMtrxVerLine = av.g.line(720, 165,  720, 245,{opacity: 100, "stroke-width": 2});
Bdg1ConMtrxVerLine.hide();
var ConMtrxUPCardLab=av.label("<span style='color:blue;'>M</span>", {left: 720, top:150 });
ConMtrxUPCardLab.css({"font-weight": "bold", "font-size": 15});
ConMtrxUPCardLab.hide();
var Bdg1MtrxDwnCardLab=av.label("<span style='color:blue;'>1</span>", {left: 720, top:213 });
Bdg1MtrxDwnCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxDwnCardLab.hide();

var StoreXsol4Analysis=av.label("<span style='color:blue;'>Store X Forth Solution Analysis</span>", {left: 350, top: arrayTop-60 });
StoreXsol4Analysis.css({"font-weight": "bold", "font-size": 28});

var SolutionType=av.label("<span style='color:blue;'>One Ternary relationship, (distributor/country/product) including price as a relationship attribute</span>", {left: 70, top: arrayTop+40 });
SolutionType.css({"font-weight": "bold", "font-size": 22});

var Note=av.label("<span style='color:red;'>NOTE:</span> only Store X dataset records that may reveal solution bugs will be examined to cover all possible test cases.", {left: 70, top: arrayTop+140 });
Note.css({"font-weight": "bold", "font-size": 18});

  // Slide 1
  av.umsg(interpret("Here are the problems' statments").bold().big());
  av.displayInit(1);
  av.step();

  //slide 2
  SolutionType.hide();
  StoreXsol4Analysis.hide();
  Note.hide();
  var theDataSetX = [["Country","Product","Distributer","Price"],["Egypt","TV","ali","3000"],["Egypt","watch","ali","5000"],["Egypt","blender","adam","2500"],["Egypt","blender","tarek","2300"],["USA","TV","adam","4500"],["USA","watch","ali","4700"],["USA","blender","tarek","2000"],["UK","TV","adam","4000"],["UK","blender","adam","3000"]];
  av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store X solutions</span> to determine the correct one. <br> <span style='color:red;'>----->By analysing each solution according to the previously given datasets.</span><br><span style='color:blue;'> <u>Store X Forth sol. analysis:</u></span> ").bold().big());
  var RealDataSetX= av.ds.matrix(theDataSetX, {style: "table", top: 0, left: 20 });
  var sate1X1st=av.label("These are tables representing forth solution relations, try to fill tables with records <br> in dataset to see weather these relations can represent all records in dataset or not.<br> ", {left: 20, top:320 });
  sate1X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=0; i < theDataSetX.length; i++)
  {
   RealDataSetX._arrays[i].css([0,1,2,3], {"font-size": 12});
   RealDataSetX._arrays[i].show();

  }
  var DistributorMatrixLab=av.label("<span style='color:blue;'>Distributor</span>", {left: 340, top:-15 });
  DistributorMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theDistributorArrays = [["D-no","D-name"],["d1","ali"],["d2","adam"],["d3","tarek"]];
  var theDistributorMatrix= av.ds.matrix(theDistributorArrays, {style: "table", top: 0, left: 340 });
  theDistributorMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theDistributorMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  var Bridge3MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 560, top:-15 });
  Bridge3MatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theBridge3Arrays = [["c-no","p-no","d-no","price"],["","","",""],["","","",""],["","","",""],["","","",""]];
  var theBridge3Matrix= av.ds.matrix(theBridge3Arrays, {style: "table", top: 0, left: 560 });
  theBridge3Matrix._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  theBridge3Matrix._arrays[0].css([0,1,2], {"text-decoration": "underline"});

  var CountryMatrixLab=av.label("<span style='color:blue;'>Country</span>", {left: 660, top:215 });
  CountryMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theCountryArrays = [["C-no","c-name"],["c1","Egypt"],["c2","USA"],["c3","UK"]];
  var theCountryMatrix= av.ds.matrix(theCountryArrays, {style: "table", top: 230, left: 660 });
  theCountryMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theCountryMatrix._arrays[0].css([0], {"text-decoration": "underline"});

  var ProductMatrixLab=av.label("<span style='color:blue;'>Product</span>", {left: 910, top:-15 });
  ProductMatrixLab.css({"font-weight": "bold", "font-size": 14});
  var theProductArrays = [["p-no","p-name"],["p1","TV"],["p2","Watch"],["p3","blender"]];
  var theProductMatrix= av.ds.matrix(theProductArrays, {style: "table", top: 0, left: 910 });
  theProductMatrix._arrays[0].css([0,1], {"font-weight": "bold", "color": "black"});
  theProductMatrix._arrays[0].css([0], {"text-decoration": "underline"});
 Bdg1DistMtrxHorLine.show();
 DistMtrxRgtCardLab.show();
 Bdg1MtrxLeftCardLab.show();
  ProdMtrxLeftCardLab.show();
  Bdg1MtrxRgtCardLab.show();
  Bdg1ProdMtrxHorLine.show();
  Bdg1ConMtrxVerLine.show();
  ConMtrxUPCardLab.show();
  Bdg1MtrxDwnCardLab.show();
  av.step();

  //slide 3
  sate1X1st.hide();
  var sate2X1st=av.label("<span style='color:green;'>Records 2,3,4 & 6</span> in Store X dataset will be inserted in relational tables here, <br> As they cover all possible test cases that made problems in the pervious </br>suggested three solutions.", {left: 20, top:310 });
  sate2X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

   //slide 4
   sate2X1st.hide();
   var sate3X1st=av.label("<span style='color:green;'>Two records</span> having different sellers for the same product in the same country </br>each seller sets his own price <span style='color:blue;'>(e.g. records 3 & 4)</span>.", {left: 20, top:310 });
   sate3X1st.css({"font-weight": "bold", "font-size": 16});
   RealDataSetX._arrays[3].highlight();
   RealDataSetX._arrays[4].highlight();
   av.step();

   //slide 5
   sate3X1st.hide();
   var sate4X1st=av.label("<span style='color:green;'>And the other two records</span> for the same seller selling the same product in </br>two different countries & the price is set differently according to the country</br> <span style='color:blue;'>(e.g. records 2 & 6)</span>.", {left: 20, top:310 });
   sate4X1st.css({"font-weight": "bold", "font-size": 16});
   RealDataSetX._arrays[3].unhighlight();
   RealDataSetX._arrays[4].unhighlight();
   RealDataSetX._arrays[2].highlight();
   RealDataSetX._arrays[6].highlight();
   av.step();

   //slide 6
   sate4X1st.hide();
   var sate5X1st=av.label("<span style='color:green;'>Inserting record 2 data</span> in relational tables where:</br><span style='color:blue;'>ali</span> <span style='color:red;'>(d1)</span> distributes <span style='color:blue;'>watches</span> <span style='color:blue;'>(p2)</span> in country <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span>.", {left: 20, top:310 });
   sate5X1st.css({"font-weight": "bold", "font-size": 16});
   RealDataSetX._arrays[6].unhighlight();
   theDistributorMatrix._arrays[1].highlight();
   theProductMatrix._arrays[2].highlight();
   theCountryMatrix._arrays[1].highlight();
   av.step();

  //slide 7
  sate5X1st.hide();
  var sate6X1st=av.label("Inserting Ids of distributor, country & product in the bridge of ternary relationship</br> along with the <span style='color:blue;'>price=5000</span>.", {left: 20, top:310 });
  sate6X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge3Matrix._arrays[1].value(0,"<span style='color:red;'>c1</span>");
  theBridge3Matrix._arrays[1].value(1,"<span style='color:red;'>p2</span>");
  theBridge3Matrix._arrays[1].value(2,"<span style='color:red;'>d1</span>");
  theBridge3Matrix._arrays[1].value(3,"<span style='color:red;'>5000</span>");
  av.step();

  //slide 8
  sate6X1st.hide();
  var sate7X1st=av.label("<span style='color:green;'>Inserting record 3 data</span> in relational tables where:</br><span style='color:blue;'>adam</span> <span style='color:red;'>(d2)</span> distributes <span style='color:blue;'>blender</span> <span style='color:blue;'>(p3)</span> in country <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span>.", {left: 20, top:310 });
  sate7X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[2].unhighlight();
  RealDataSetX._arrays[3].highlight();
  theDistributorMatrix._arrays[1].unhighlight();
  theProductMatrix._arrays[2].unhighlight();
  theCountryMatrix._arrays[1].unhighlight();
  theDistributorMatrix._arrays[2].highlight();
  theProductMatrix._arrays[3].highlight();
  theCountryMatrix._arrays[1].highlight();
  av.step();

 //slide 9
 sate7X1st.hide();
 var sate8X1st=av.label("Inserting Ids of distributor, country & product in the bridge of ternary relationship</br> along with the <span style='color:blue;'>price=2500</span>.", {left: 20, top:310 });
 sate8X1st.css({"font-weight": "bold", "font-size": 16});
 theBridge3Matrix._arrays[2].value(0,"<span style='color:red;'>c1</span>");
 theBridge3Matrix._arrays[2].value(1,"<span style='color:red;'>p3</span>");
 theBridge3Matrix._arrays[2].value(2,"<span style='color:red;'>d2</span>");
 theBridge3Matrix._arrays[2].value(3,"<span style='color:red;'>2500</span>");
 av.step();

  //slide 10
  sate8X1st.hide();
  var sate9X1st=av.label("<span style='color:green;'>Inserting record 4 data</span> in relational tables where:</br><span style='color:blue;'>tarek</span> <span style='color:red;'>(d3)</span> distributes <span style='color:blue;'>blender</span> <span style='color:blue;'>(p3)</span> in country <span style='color:blue;'>egypt</span> <span style='color:red;'>(c1)</span>.", {left: 20, top:310 });
  sate9X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[3].unhighlight();
  RealDataSetX._arrays[4].highlight();
  theDistributorMatrix._arrays[2].unhighlight();
  theDistributorMatrix._arrays[3].highlight();
  av.step();

 //slide 11
 sate9X1st.hide();
 var sate10X1st=av.label("Inserting Ids of distributor, country & product in the bridge of ternary relationship</br> along with the <span style='color:blue;'>price=2300</span>.", {left: 20, top:310 });
 sate10X1st.css({"font-weight": "bold", "font-size": 16});
 theBridge3Matrix._arrays[3].value(0,"<span style='color:red;'>c1</span>");
 theBridge3Matrix._arrays[3].value(1,"<span style='color:red;'>p3</span>");
 theBridge3Matrix._arrays[3].value(2,"<span style='color:red;'>d3</span>");
 theBridge3Matrix._arrays[3].value(3,"<span style='color:red;'>2300</span>");
 av.step();

  //slide 12
  sate10X1st.hide();
  var sate11X1st=av.label("<span style='color:green;'>Inserting record 6 data</span> in relational tables where:</br><span style='color:blue;'>ali</span> <span style='color:red;'>(d1)</span> distributes <span style='color:blue;'>watches</span> <span style='color:blue;'>(p2)</span> in country <span style='color:blue;'>USA</span> <span style='color:red;'>(c2)</span>.", {left: 20, top:310 });
  sate11X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetX._arrays[4].unhighlight();
  RealDataSetX._arrays[6].highlight();
  theDistributorMatrix._arrays[3].unhighlight();
  theDistributorMatrix._arrays[1].highlight();
  theCountryMatrix._arrays[1].unhighlight();
  theCountryMatrix._arrays[2].highlight();
  theProductMatrix._arrays[3].unhighlight();
  theProductMatrix._arrays[2].highlight();
  av.step();

 //slide 13
 sate11X1st.hide();
 var sate12X1st=av.label("Inserting Ids of distributor, country & product in the bridge of ternary relationship</br> along with the <span style='color:blue;'>price=4700</span>.", {left: 20, top:310 });
 sate12X1st.css({"font-weight": "bold", "font-size": 16});
 theBridge3Matrix._arrays[4].value(0,"<span style='color:red;'>c2</span>");
 theBridge3Matrix._arrays[4].value(1,"<span style='color:red;'>p2</span>");
 theBridge3Matrix._arrays[4].value(2,"<span style='color:red;'>d1</span>");
 theBridge3Matrix._arrays[4].value(3,"<span style='color:red;'>4700</span>");
 av.step();

 //slide 14
 sate12X1st.hide();
 var sate13X1st=av.label("<span style='color:green;'>As proved here</span> This is the <span style='color:red;'> best (correct)</span> solution</br> It overcomes all difficulties of the pervious suggested solutions</br> It can represent all different test cases as required by store X.", {left: 20, top:310 });
 sate13X1st.css({"font-weight": "bold", "font-size": 16});
 av.step();

  //slide 15
  sate13X1st.hide();
  var sate14X1st=av.label("<span style='color:green;'>Without</span> any <span style='color:blue;'> primary key redundancy </span> OR <span style='color:blue;'> untraceable data </span>.", {left: 20, top:310 });
  sate14X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 16
  sate14X1st.hide();
  var sate15X1st=av.label("<span style='color:green;'> The basic idea </span> of this solution lies in  <span style='color:green;'> store X requiement </span> which is: </br><span style='color:blue;'> The price </span>  is determined according to all three factors (country, distributor & product).", {left: 20, top:310 });
  sate15X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  //slide 17
  sate15X1st.hide();
  var sate16X1st=av.label("<span style='color:red;'>When any one of these factors <span style='color:blue;'>changes</span>, the price may <span style='color:blue;'>vary</span>.", {left: 20, top:310 });
  sate16X1st.css({"font-weight": "bold", "font-size": 16});
  av.step();

  av.recorded();
});
