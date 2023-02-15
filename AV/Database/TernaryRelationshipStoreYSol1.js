/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "TernaryRelationshipStoreYSol1";
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

//ConMtrxUPCardLabAlternative of value 1 is the alternative of ConMtrxUPCardLab of value M fore store Y second solution
var ConMtrxUPCardLabAlternative=av.label("<span style='color:blue;'>1</span>", {left: 720, top:150 });
ConMtrxUPCardLabAlternative.css({"font-weight": "bold", "font-size": 15});
ConMtrxUPCardLabAlternative.hide();

var Bdg1MtrxDwnCardLab=av.label("<span style='color:blue;'>1</span>", {left: 720, top:213 });
Bdg1MtrxDwnCardLab.css({"font-weight": "bold", "font-size": 15});
Bdg1MtrxDwnCardLab.hide();

var StoreYsol1Analysis=av.label("<span style='color:blue;'>Store Y First & Second Solution Analysis</span>", {left: 330, top: arrayTop-60 });
StoreYsol1Analysis.css({"font-weight": "bold", "font-size": 28});

var SolutionType1=av.label("<span style='color:red;'>First sol.:</span><span style='color:blue;'>One (N:M:P) Ternary relationship, between (country/distributor/product) including price as a relationship attribute</span>", {left: 70, top: arrayTop+40 });
SolutionType1.css({"font-weight": "bold", "font-size": 20});

var SolutionType2=av.label("<span style='color:red;'>Second sol.:</span><span style='color:blue;'>One (1:N:M) Ternary relationship, between (country/distributor/product) including price as a relationship attribute</span>", {left: 70, top: arrayTop+120 });
SolutionType2.css({"font-weight": "bold", "font-size": 20});

var comment=av.label("<span style='color:red;'>Note:</span> The difference between these two solutions is the <span style='color:blue;'> '1' </span> cardinality connecting <span style='color:blue;'>country</span> to the ternary relationship.</span>", {left: 70, top: arrayTop+200 });
comment.css({"font-weight": "bold", "font-size": 20});

var Note=av.label("<span style='color:red;'>NOTE:</span> The problem with Store Y proposed solutions is not that they hinder dataset Y records representation but they don't prevent faulty data as shown here in the visualization", {left: 70, top: arrayTop+290 });
Note.css({"font-weight": "bold", "font-size": 16});

  // Slide 1
  av.umsg(interpret("").bold().big());
  av.displayInit(1);
  av.step();

  //slide 2
  SolutionType1.hide();
  SolutionType2.hide();
  comment.hide();
  StoreYsol1Analysis.hide();
  Note.hide();
  var theDataSetY = [["Country","Product","Distributer","Price"],["Egypt","TV","ali","3000"],["Egypt","watch","ali","5000"],["UK","blender","ali","2500"],["UK","watch","ali","2300"],["USA","TV","adam","4500"],["USA","watch","adam","4700"],["USA","blender","adam","2000"],["lebanon","TV","morad","4000"],["lebanon","blender","morad","3000"]];
  av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store Y solutions</span> to determine the correct one. <br> <span style='color:red;'>----->By analysing each solution according to the previously given datasets.</span><br><span style='color:blue;'> <u>Store Y First sol. analysis:</u></span> ").bold().big());
  var RealDataSetY= av.ds.matrix(theDataSetY, {style: "table", top: 0, left: 20 });
  var sate1X1st=av.label("These are tables representing first solution relations, try to fill tables with records <br> in dataset.<br> ", {left: 20, top:320 });
  sate1X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=0; i < theDataSetY.length; i++)
  {
    RealDataSetY._arrays[i].css([0,1,2,3], {"font-size": 12});
    RealDataSetY._arrays[i].show();

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
  var sate2X1st=av.label("<span style='color:red;'>Try Adding</span> <span style='color:green;'>Records 1</span> in Store Y dataset to solution tables here.", {left: 20, top:310 });
  sate2X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetY._arrays[1].highlight();
  av.step();

   //slide 4
   sate2X1st.hide();
   var sate3X1st=av.label("<span style='color:red;'>In which</span> Distributor: <span style='color:blue;'>ali</span> sells Product: <span style='color:blue;'>TV</span> in country: <span style='color:blue;'>Egypt</span> with price:<span style='color:blue;'>3000</span>.", {left: 20, top:310 });
   sate3X1st.css({"font-weight": "bold", "font-size": 16});
   theDistributorMatrix._arrays[1].highlight();
   theCountryMatrix._arrays[1].highlight();
   theProductMatrix._arrays[1].highlight();
   av.step();

   //slide 5
   sate3X1st.hide();
   var sate4X1st=av.label("<span style='color:red;'>Then</span> all these data will be added to the <span style='color:green;'>Bridge</span>.", {left: 20, top:310 });
   sate4X1st.css({"font-weight": "bold", "font-size": 16});
   theBridge3Matrix._arrays[1].value(0,"<span style='color:red;'>c1</span>");
   theBridge3Matrix._arrays[1].value(1,"<span style='color:red;'>p1</span>");
   theBridge3Matrix._arrays[1].value(2,"<span style='color:red;'>d1</span>");
   theBridge3Matrix._arrays[1].value(3,"<span style='color:red;'>3000</span>");
   av.step();

   //slide 6
   sate4X1st.hide();
   var sate5X1st=av.label("<span style='color:red;'>IF</span> you try adding <span style='color:green;'>all</span> dataset records in the bridge, it will be added <span style='color:green;'>SUCCESSFULLY</span></br><span style='color:red;'>BUT</span> this solution <span style='color:green;'>remains a FAULTY solution</span></br><span style='color:red;'>AS</span> It <span style='color:green;'>doesn't prevent</span> adding <span style='color:green;'>erroneous</span> data to the brigde.", {left: 20, top:310 });
   sate5X1st.css({"font-weight": "bold", "font-size": 16});
   theDistributorMatrix._arrays[1].unhighlight();
   theCountryMatrix._arrays[1].unhighlight();
   theProductMatrix._arrays[1].unhighlight();
   for (var i=1; i < theDataSetY.length; i++)
  {
    RealDataSetY._arrays[i].highlight();
  }
   av.step();

  //slide 7
  sate5X1st.hide();
  var sate6X1st=av.label("<span style='color:red;'>For Example:</span> try to add this record <span style='color:blue;'>(Egypt, TV, adam, 2500)</span> in the bridge", {left: 20, top:310 });
  sate6X1st.css({"font-weight": "bold", "font-size": 16});
  for (var i=1; i < theDataSetY.length; i++)
  {
    RealDataSetY._arrays[i].unhighlight();
  }
  theDistributorMatrix._arrays[2].highlight();
  theCountryMatrix._arrays[1].highlight();
  theProductMatrix._arrays[1].highlight();
  av.step();

  //slide 8
  sate6X1st.hide();
  var sate7X1st=av.label("<span style='color:green;'>Here is the fault</span> It is also added <span style='color:blue;'>successfully</span> which is <span style='color:red;'>logically wrong</span></br><span style='color:red;'>As</span> It allows multiple distributors (ali & adam) to sell the same product (tv) in the </br>same country (Egypt) </br>Which is <span style='color:red;'>against</span> store Y policy that dedicates only one distributor for each country to sell all products of that country.", {left: 20, top:295 });
  sate7X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge3Matrix._arrays[2].highlight();
  theBridge3Matrix._arrays[2].value(0,"<span style='color:red;'>c1</span>");
  theBridge3Matrix._arrays[2].value(1,"<span style='color:red;'>p1</span>");
  theBridge3Matrix._arrays[2].value(2,"<span style='color:red;'>d2</span>");
  theBridge3Matrix._arrays[2].value(3,"<span style='color:red;'>2500</span>");
  var Errorpointer = av.pointer("<span style='color:red;'><b>EEROR </b> </br> Logically wrong record</br>should not be added</span>",theBridge3Matrix._arrays[3].index(2), {left: 200, top: 250});
  av.step();

 //slide 9
 av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store Y solutions</span> to determine the correct one. <br> <span style='color:orange;'>----->PAY ATTENTION: switching for the second solution of the '1' cardinality</span><br><span style='color:blue;'> <u>Store Y Second sol. analysis:</u></span> ").bold().big());
 Errorpointer.hide();
 sate7X1st.hide();
 var sate8X1st=av.label("The <span style='color:red;'>differences</span> between first and this second solutions in store Y is: </br> <b>-</b> <span style='color:blue;'> '1' cardinality</span> of country entity to the ternary relationship</br> <b>-</b> <span style='color:blue;'>(c-no)</span> isn't part of the bridge composit primary key because of the one cardinality.", {left: 20, top:310 });
 sate8X1st.css({"font-weight": "bold", "font-size": 16});
 for (var i=1; i <=2; i++)
 {
  for (var y=1; y<=3; y++)
  {
    theBridge3Matrix._arrays[i].value(y," ");
    theBridge3Matrix._arrays[i].unhighlight();
  }
 }
 theDistributorMatrix._arrays[2].unhighlight();
 theCountryMatrix._arrays[1].unhighlight();
 theProductMatrix._arrays[1].unhighlight();
 ConMtrxUPCardLab.hide();
 ConMtrxUPCardLabAlternative.show();
 //for (var i=1; i < theBridge3Arrays.length; i++)
 // {
  //  theBridge3Matrix._arrays[i].hide();
 // }
  //var Bridge3MatrixLab=av.label("<span style='color:blue;'>Bridge</span>", {left: 560, top:-15 });
  //Bridge3MatrixLab.css({"font-weight": "bold", "font-size": 14});
  theBridge3Arrays = [["p-no","d-no","c-no","price"],["","","",""],["","","",""],["","","",""],["","","",""]];
  theBridge3Matrix= av.ds.matrix(theBridge3Arrays, {style: "table", top: 0, left: 560 });
  theBridge3Matrix._arrays[0].css([0,1,2,3], {"font-weight": "bold", "color": "black"});
  theBridge3Matrix._arrays[0].css([0,1], {"text-decoration": "underline"});
  var PKpointer = av.pointer("<span style='color:red;'><b>(C-no)</b> is not part of PK</span>",theBridge3Matrix._arrays[1].index(2), {left: 200, top: 250});
  var card1= av.g.circle(725,175 ,10 , {stroke: "red","stroke-width": 2});
  av.step();

  //slide 10
  av.umsg(interpret("4- Discuss pros and cons of all possible <span style='color:blue;'>Store Y solutions</span> to determine the correct one.<br><span style='color:blue;'> <u>Store Y Second sol. analysis:</u></span> ").bold().big());
  PKpointer.hide();
  card1.hide();
  sate8X1st.hide();
  var sate9X1st=av.label("If we try adding some selected records from dataset in the solution design here, </br> <span style='color:blue;'>For example</span> dataset's first record added as shown in the bridge here</br> <span style='color:blue;'>Where</span> distributor ali who is dedicated for egypt country according to store Y policy sells TV.", {left: 20, top:310 });
  sate9X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetY._arrays[1].highlight();
  theDistributorMatrix._arrays[1].highlight();
  theCountryMatrix._arrays[1].highlight();
  theProductMatrix._arrays[1].highlight();
  theBridge3Matrix._arrays[1].value(0,"<span style='color:red;'>p1</span>");
   theBridge3Matrix._arrays[1].value(1,"<span style='color:red;'>d1</span>");
   theBridge3Matrix._arrays[1].value(2,"<span style='color:red;'>c1</span>");
   theBridge3Matrix._arrays[1].value(3,"<span style='color:red;'>3000</span>");
  av.step();

 //slide 11
 sate9X1st.hide();
 var sate10X1st=av.label("<span style='color:red;'>Then:</span> Adding second record as shown</br><span style='color:red;'>Where</span> Egypt's distributor (ali) sells another product watch </br><span style='color:red;'>also,</span> done successfully without physical or logical errors.", {left: 20, top:310 });
 sate10X1st.css({"font-weight": "bold", "font-size": 16});
 RealDataSetY._arrays[1].unhighlight();
  RealDataSetY._arrays[2].highlight();
 theProductMatrix._arrays[1].unhighlight();
 theProductMatrix._arrays[2].highlight();
 //theBridge3Matrix._arrays[2].highlight();
 theBridge3Matrix._arrays[2].value(0,"<span style='color:red;'>p2</span>");
   theBridge3Matrix._arrays[2].value(1,"<span style='color:red;'>d1</span>");
   theBridge3Matrix._arrays[2].value(2,"<span style='color:red;'>c1</span>");
   theBridge3Matrix._arrays[2].value(3,"<span style='color:red;'>5000</span>");
 av.step();

  //slide 12
  sate10X1st.hide();
  var sate11X1st=av.label("Adding third record </br><span style='color:red;'>Notice:</span> the same distributor ali who distributes in egypt sells in other country (UK)</br><span style='color:red;'>Which is</span> allowed in store Y policy that the same distributor sells in different countries.", {left: 20, top:310 });
  sate11X1st.css({"font-weight": "bold", "font-size": 16});
  RealDataSetY._arrays[2].unhighlight();
  RealDataSetY._arrays[3].highlight();
  //theDistributorMatrix._arrays[1].unhighlight();
// theCountryMatrix._arrays[1].unhighlight();
 theProductMatrix._arrays[3].highlight();
 theProductMatrix._arrays[2].unhighlight();
 //theBridge3Matrix._arrays[3].highlight();
 theCountryMatrix._arrays[1].unhighlight();
 theCountryMatrix._arrays[3].highlight();
 theBridge3Matrix._arrays[3].value(0,"<span style='color:red;'>p3</span>");
   theBridge3Matrix._arrays[3].value(1,"<span style='color:red;'>d1</span>");
   theBridge3Matrix._arrays[3].value(2,"<span style='color:red;'>c3</span>");
   theBridge3Matrix._arrays[3].value(3,"<span style='color:red;'>2500</span>");
  av.step();

 //slide 13
 sate11X1st.hide();
 var sate12X1st=av.label("Try adding forth record </br><span style='color:red;'>where</span> UK's distributor (ali) sells another product watch in UK </br><span style='color:red;'>Which is</span> allowed in store Y policy that the same distributor sells in different countries.", {left: 20, top:310 });
 sate12X1st.css({"font-weight": "bold", "font-size": 16});
 RealDataSetY._arrays[3].unhighlight();
 RealDataSetY._arrays[4].highlight();
 theProductMatrix._arrays[2].highlight();
 theProductMatrix._arrays[3].unhighlight();
 theBridge3Matrix._arrays[4].value(0,"<span style='color:red;'>p2</span>");
 theBridge3Matrix._arrays[4].value(1,"<span style='color:red;'>d1</span>");
 theBridge3Matrix._arrays[4].value(2,"<span style='color:red;'>c3</span>");
 theBridge3Matrix._arrays[4].value(3,"<span style='color:red;'>2300</span>");
 av.step();

 //slide 14
 sate12X1st.hide();
 var sate13X1st=av.label("<span style='color:red;'>PHYSICAL ERROR</span> </br>In this solution design both (d-id & p-id) are composite PK that can not be repeated</br><span style='color:blue;'>But</span> ali previously sold watch in egypt <i><span style='color:green;'>(record 2 in bridge)</span>-----> (PK repetition)", {left: 20, top:310 });
 sate13X1st.css({"font-weight": "bold", "font-size": 16});
 theBridge3Matrix._arrays[0].highlight(0);
 theBridge3Matrix._arrays[0].highlight(1);
 theBridge3Matrix._arrays[2].highlight(0);
 theBridge3Matrix._arrays[2].highlight(1);
 theBridge3Matrix._arrays[4].highlight(0);
 theBridge3Matrix._arrays[4].highlight(1);
 theProductMatrix._arrays[2].unhighlight();
 theCountryMatrix._arrays[3].unhighlight();
 theDistributorMatrix._arrays[1].unhighlight();
 av.step();

  //slide 15
  sate13X1st.hide();
  var sate14X1st=av.label("<span style='color:red;'>PHYSICAL ERROR</span> </br><span style='color:red;'>So</span> that design is faulty as it doesn't fulfill store y requirements </br>that allows same distributor to sell in different countries & by the way he may sell the same product in those countries.", {left: 20, top:310 });
  sate14X1st.css({"font-weight": "bold", "font-size": 16});
  var ErrorPk= av.pointer("<span style='color:red;'><b>Physical EEROR:</b> PK repetition</span>",theBridge3Matrix._arrays[3].index(1), {left: 200, top: 230});
  var ErrorPkrepeate= av.pointer("",theBridge3Matrix._arrays[4].index(1), {left: 230, top: 200});
  av.step();

  //slide 16
  ErrorPk.hide();
  ErrorPkrepeate.hide();
  theBridge3Matrix._arrays[0].unhighlight(0);
 theBridge3Matrix._arrays[0].unhighlight(1);
 theBridge3Matrix._arrays[2].unhighlight(0);
 theBridge3Matrix._arrays[2].unhighlight(1);
 theBridge3Matrix._arrays[4].unhighlight(0);
 theBridge3Matrix._arrays[4].unhighlight(1);
 RealDataSetY._arrays[4].unhighlight();
 RealDataSetY._arrays[1].highlight(0);
 RealDataSetY._arrays[1].highlight(2);
 RealDataSetY._arrays[2].highlight(0);
 RealDataSetY._arrays[2].highlight(2);
 theBridge3Matrix._arrays[4].value(0,"");
 theBridge3Matrix._arrays[4].value(1,"");
 theBridge3Matrix._arrays[4].value(2,"");
 theBridge3Matrix._arrays[4].value(3," ");
  sate14X1st.hide();
  var sate15X1st=av.label("<span style='color:red;'> This solution</span> also results in a <span style='color:red;'> Logical Error </span> </br> Assume adding a faulty record as <span style='color:blue;'> (adam ,Egypt, TV, 1500) </span>, this is wrong data as </br>Egypt already has an execlusive distributor (ali) in the dataset.", {left: 20, top:310 });
  sate15X1st.css({"font-weight": "bold", "font-size": 16});
  theProductMatrix._arrays[1].highlight();
 theCountryMatrix._arrays[1].highlight();
 theDistributorMatrix._arrays[2].highlight();
  av.step();

  //slide 17
  sate15X1st.hide();
  var sate16X1st=av.label("<span style='color:red;'>Unfortunately </span> the record is added SUCCESSFULLY which is <span style='color:blue;'>WRONG</span></br><span style='color:blue;'>Now</span> (ali & adam both distribute in Egypt)</span>, <span style='color:blue;'>contradicting</span> store's Y policy of one </br> execlusive distributor for each country.", {left: 20, top:310 });
  sate16X1st.css({"font-weight": "bold", "font-size": 16});
  theBridge3Matrix._arrays[4].value(0,"<span style='color:red;'>p1</span>");
 theBridge3Matrix._arrays[4].value(1,"<span style='color:red;'>d2</span>");
 theBridge3Matrix._arrays[4].value(2,"<span style='color:red;'>c1</span>");
 theBridge3Matrix._arrays[4].value(3,"<span style='color:red;'>1500</span>");
 ErrorPkrepeate= av.pointer("<span style='color:red;'>Logically Wrong record </br> should not be added</span>",ConMtrxUPCardLabAlternative, {left: 210, top: 200});
 RealDataSetY._arrays[1].unhighlight(0);
 RealDataSetY._arrays[1].unhighlight(2);
 RealDataSetY._arrays[2].unhighlight(0);
 RealDataSetY._arrays[2].unhighlight(2);
 theProductMatrix._arrays[1].unhighlight();
 theCountryMatrix._arrays[1].unhighlight();
 theDistributorMatrix._arrays[2].unhighlight();
 theBridge3Matrix._arrays[1].highlight(1);
 theBridge3Matrix._arrays[1].highlight(2);
 theBridge3Matrix._arrays[2].highlight(1);
 theBridge3Matrix._arrays[2].highlight(2);
 theBridge3Matrix._arrays[4].highlight(1);
 theBridge3Matrix._arrays[4].highlight(2);
 var adamPointer= av.pointer("<span style='color:blue;'>d2=adam </br> c1=Egypt</span>",ConMtrxUPCardLabAlternative, {left: 210, top: 100});
 var aliEgyptPointer= av.pointer("<span style='color:blue;'>d1=ali </br> c1=Egypt</span>",theBridge3Matrix._arrays[2].index(1), {left: 0, top: 155});
  av.step();

  av.recorded();
});
