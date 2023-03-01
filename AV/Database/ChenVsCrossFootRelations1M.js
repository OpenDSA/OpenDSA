/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "ChenVsCrossFootRelations1M";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);

   
   var LabelLeft=70;
   var labelTop=-25;
   var NotationHorGaps=250;
   var NotationVerGaps=80;
   var pX= LabelLeft+NotationHorGaps+70;
   var pY= labelTop+NotationVerGaps;
   var rowNo=1;
   var colNo=1;

   var labCardinality=av.label("Here all <span style='color:blue;'> One-to-Many </span> relationship combinations with <span style='color:blue;'> all participation alternatives </span>", {left: LabelLeft+100, top: labelTop });
   labCardinality.css({"font-weight": "bold", "font-size": 20});

   //var labCardinalitydef=av.label(interpret("<span style='color:blue;'> Cardinality definition </span>"), {left: LabelLeft+NotationHorGaps*colNo, top: labelTop });
   //labCardinalitydef.css({"font-weight": "bold", "font-size": 20});
   
   var labChen=av.label(interpret("<span style='color:blue;'> Chen Notation </span>"), {left: LabelLeft+NotationHorGaps*colNo, top: labelTop });
   labChen.css({"font-weight": "bold", "font-size": 20});
   labChen.hide();

   colNo=2;
   var labMinMax=av.label(interpret("<span style='color:purple;'> (Min-Max) Notation </span>"), {left: LabelLeft+NotationHorGaps*colNo-10, top: labelTop });
   labMinMax.css({"font-weight": "bold", "font-size": 20});
   labMinMax.hide();

   colNo=3;
   var labCrows=av.label(interpret("<span style='color:red;'> Crow’s Foot Notation </span>"), {left: LabelLeft+(NotationHorGaps*colNo), top:labelTop });
   labCrows.css({"font-weight": "bold", "font-size": 20});
   labCrows.hide();

   var RelLine = av.g.line(LabelLeft+(NotationHorGaps*2)+25, pY, LabelLeft+(NotationHorGaps*colNo)+215, pY, {opacity: 100, "stroke-width": 2});
   RelLine.hide();
   var PKLineCrows=av.g.line(0,0,0,0);
   var PKLineTableCrows=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var PKAttLine=av.g.line(0,0,0,0);
   var stdLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var CorLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var snameLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var sidLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var sbdateLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var ccodeLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var cnameLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var choursLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var sidPkLine=av.g.line(0,0,0,0, {opacity: 100});
   var ccodePkLine=av.g.line(0,0,0,0, {opacity: 100});
   var PKLinecorsCrows=av.g.line(0,0,0,0, {opacity: 100});
   var PKLinecorsTableCrows=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var RegRelLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenLft4=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenLft42=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenRht4=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otochenLft4.hide();
   otochenLft42.hide();
   otochenRht4.hide();
   var otochenLft3=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenLft32=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenRht3=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenRht32=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otochenLft3.hide();
   otochenLft32.hide();
   otochenRht3.hide();
   otochenRht32.hide();
   var otochenLft=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenRht=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var otochenRht2=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otochenLft.hide();
   var otochenLft2=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otochenLft2.hide();
   var otochenRht2=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otochenRht2.hide();
   var otochenRht22=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otochenRht22.hide();
   var otoMinLft4=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoMinLft4.hide();
   var otoMinLft=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoMinLft.hide();
   var otoMinLft2=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoMinLft2.hide();
   var otoMinLft3=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoMinLft3.hide();
   var otoCrowsLft3=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoCrowsLft3.hide();
   var CrowsoneRyt3=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneRyt3.hide();
   var CrowsoneRyt31=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneRyt31.hide();
   var CrowsoneLft3=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneLft3.hide();
   var CrowsoneLft31=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneLft31.hide();

   var otoCrowsLft4=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoCrowsLft4.hide();
   var CrowsoneRyt4=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneRyt4.hide();
   var CrowsoneLft4=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneLft4.hide();
   var CrowsoneLft41=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneLft41.hide();

   var otoCrowsLft=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoCrowsLft.hide();
   var CrowsoneRyt=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneRyt.hide();
   var CrowsoneRyt1=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneRyt1.hide();
   var CrowsoneLft=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneLft.hide();
   var CrowsoneLft1=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneLft1.hide();
   var otoCrowsLft2=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   otoCrowsLft2.hide();
   var CrowsoneRyt2=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneRyt2.hide();
   var CrowsoneLft2=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   CrowsoneLft2.hide();
   otochenRht.hide();
   otochenRht2.hide();
   PKAttLine.hide();
   PKLineCrows.hide();
   PKLineTableCrows.hide();
   stdLine.hide();
   CorLine.hide();
   snameLine.hide();
   sidLine.hide();
   sidPkLine.hide();
   sbdateLine.hide();
   ccodeLine.hide();
   ccodePkLine.hide();
   cnameLine.hide();
   choursLine.hide();
   PKLinecorsCrows.hide();
   PKLinecorsTableCrows.hide();
   RegRelLine.hide();
   //var EntityCrowsRec=av.g.rect(xPositionBigRectangles, yPositionBig1, lengthBig, widthBig);

   //manyTomanySymbol in each relation in crow's foot notation names mTom: means many to mant R:right L:left number:1,2,3 or 4 refers to the row containing the relation
   var mTom1Lup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom1Lup.hide();
   var mTom1Rup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom1Rup.hide();
   var mTom2Lup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom2Lup.hide();
   var mTom2Rup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom2Rup.hide();
   var mTom3Lup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom3Lup.hide();
   var mTom3Rup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom3Rup.hide();
   var mTom4Lup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom4Lup.hide();
   var mTom4Rup=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom4Rup.hide();

   var mTom1Ldwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom1Ldwn.hide();
   var mTom1Rdwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom1Rdwn.hide();
   var mTom2Ldwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom2Ldwn.hide();
   var mTom2Rdwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom2Rdwn.hide();
   var mTom3Ldwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom3Ldwn.hide();
   var mTom3Rdwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom3Rdwn.hide();
   var mTom4Ldwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom4Ldwn.hide();
   var mTom4Rdwn=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   mTom4Rdwn.hide();

   // Slide 1
   //av.umsg(interpret("sc1").bold().big());
   av.displayInit(1);
   av.step();

   // Slide 2
   //av.umsg(interpret("sc1").bold().big());
   labCardinality.hide();
   //labCardinalitydef.hide();
   labChen.show();
   labCrows.show();
   labMinMax.show();
   av.step();

  //slide 3
  av.umsg("Here is the chen's relation symbol".bold().big());
  var LabRSym=av.label(interpret("(opt) <span style='color:green;'> one-to-many</span> (man) "), {left: LabelLeft-50, top: pY-50 });
  LabRSym.css({"font-weight": "bold", "font-size": 20});
  var polygon = av.g.polyline([[pX+10, pY-30],
   [pX+10+60, pY],
   [pX+10, pY+30],
   [pX+10-60, pY],
   [pX+10, pY-30]],
  {"stroke-width": 3, stroke: "black"});
  var Relchenlab=av.label("<span style='color:blue;'> R </span>", {left: pX+10-5, top:pY-35 });
  Relchenlab.css({"font-weight": "bold", "font-size": 20});
  otochenLft.movePoints([[0,pX+10-120,pY],[1,pX+10-60, pY]]);
  otochenRht.movePoints([[0,pX+7+60, pY-2],[1,pX+70+60,pY-2]]);
  otochenRht2.movePoints([[0,pX+7+60, pY+2],[1,pX+70+60,pY+2]]);
  otochenLft.show();
  otochenRht.show();
  otochenRht2.show();
  var otolabL=av.label("<span style='color:blue;'> M </span>", {left: pX+110-20, top:pY-40 });
  var otolabR=av.label("<span style='color:blue;'> 1 </span>", {left: pX+10-20-90, top:pY-40 });
  av.step();

  //slide 4
  av.umsg("Here is the min-max relation symbol".bold().big());
  var RelMinlab=av.label("<span style='color:blue;'> R </span>", {left: pX+270-20, top:pY-50 });
  RelMinlab.css({"font-weight": "bold", "font-size": 20});
  otoMinLft.movePoints([[0,pX+45+120,pY],[1,pX+80+300, pY]]);
  var otolabL1=av.label("<span style='color:blue;'> (0,M) </span>", {left: pX+47+120, top:pY-40 });
  var otolabR1=av.label("<span style='color:blue;'> (1,1) </span>", {left: pX+30+300, top:pY-40 });
  otoMinLft.show();
  av.step();

  //slide 5
  av.umsg("Here is the crow's foot relation symbol".bold().big());
  var RelCrowslab=av.label("<span style='color:blue;'> R </span>", {left: pX+345+200-20, top:pY-50 });
  RelCrowslab.css({"font-weight": "bold", "font-size": 20});
  otoCrowsLft.movePoints([[0,pX+75+360,pY],[1,pX+75+580, pY]]);
  CrowsoneLft.movePoints([[0,pX+90+360,pY-10],[1,pX+90+360, pY+10]]);
  //mTom1Ldwn.movePoints([[0,pX+90+360,pY],[1,pX+75+360, pY+10]]);
  //mTom1Lup.movePoints([[0,pX+90+360,pY],[1,pX+75+360, pY-10]]);
 // mTom1Ldwn.show();
 // mTom1Lup.show();
  CrowsoneRyt.movePoints([[0,pX+60+580,pY-10],[1,pX+60+580, pY+10]]);
  mTom1Rup.movePoints([[0,pX+60+580,pY],[1,pX+75+580, pY-10]]);
  mTom1Rdwn.movePoints([[0,pX+60+580,pY],[1,pX+75+580, pY+10]]);
  mTom1Rup.show();
  mTom1Rdwn.show();
  CrowsoneLft.show();
  CrowsoneRyt.show();
  //CrowsoneLft1.movePoints([[0,pX+95+360,pY-10],[1,pX+95+360, pY+10]]);
  //CrowsoneRyt1.movePoints([[0,pX+55+580,pY-10],[1,pX+55+580, pY+10]]);
  CrowsoneLft1.show();
  //CrowsoneRyt1.show();
  otoCrowsLft.show();
  av.step();

  //slide 6
  av.umsg("Here is the chen's relation symbol".bold().big());
  var LabRSym2=av.label(interpret("(opt) <span style='color:green;'> one-to-many</span> (opt) "), {left: LabelLeft-50, top: pY+60 });
  LabRSym2.css({"font-weight": "bold", "font-size": 20});
  var polygon2 = av.g.polyline([[pX+10, pY+80],
   [pX+10+60, pY+110],
   [pX+10, pY+140],
   [pX+10-60, pY+110],
   [pX+10, pY+80]],
  {"stroke-width": 3, stroke: "black"});
  var Relchenlab2=av.label("<span style='color:blue;'> R </span>", {left: pX+10-5, top:pY+75 });
  Relchenlab2.css({"font-weight": "bold", "font-size": 20});
  otochenLft2.movePoints([[0,pX+10-120,pY+110],[1,pX+10-60, pY+110]]);
  otochenRht22.movePoints([[0,pX+7+60, pY+110],[1,pX+70+60,pY+110]]);
 // otochenRht22.movePoints([[0,pX+7+60, pY+2+110],[1,pX+70+60,pY+2+110]]);
  otochenLft2.show();
  otochenRht22.show();
 // otochenRht22.show();
  var otolabL2=av.label("<span style='color:blue;'> M </span>", {left: pX+110-20, top:pY+70 });
  var otolabR2=av.label("<span style='color:blue;'> 1 </span>", {left: pX+10-20-90, top:pY+70 });
  av.step();

  //slide 7
  av.umsg("Here is the min-max relation symbol".bold().big());
  var RelMinlab2=av.label("<span style='color:blue;'> R </span>", {left: pX+270-20, top:pY+60 });
  RelMinlab2.css({"font-weight": "bold", "font-size": 20});
  otoMinLft2.movePoints([[0,pX+45+120,pY+110],[1,pX+80+300, pY+110]]);
  var otolabL12=av.label("<span style='color:blue;'> (0,M) </span>", {left: pX+47+120, top:pY+70 });
  var otolabR12=av.label("<span style='color:blue;'> (0,1) </span>", {left: pX+30+300, top:pY+70 });
  otoMinLft2.show();
  av.step();

  //slide 8
  av.umsg("Here is the crow's foot relation symbol".bold().big());
  var RelCrowslab2=av.label("<span style='color:blue;'> R </span>", {left: pX+345+200-20, top:pY+60 });
  RelCrowslab2.css({"font-weight": "bold", "font-size": 20});
  otoCrowsLft2.movePoints([[0,pX+75+360,pY+110],[1,pX+75+580, pY+110]]);
  CrowsoneLft2.movePoints([[0,pX+90+360,pY+100],[1,pX+90+360, pY+120]]);
  //mTom2Lup.movePoints([[0,pX+90+360,pY+110],[1,pX+75+360, pY+100]]);
  //mTom2Ldwn.movePoints([[0,pX+90+360,pY+110],[1,pX+75+360, pY+120]]);
  //mTom2Lup.show();
  //mTom2Ldwn.show();
 // CrowsoneRyt2.movePoints([[0,pX+60+580,pY+100],[1,pX+60+580, pY+120]]);
  mTom2Rup.movePoints([[0,pX+60+580,pY+110],[1,pX+75+580, pY+100]]);
  mTom2Rdwn.movePoints([[0,pX+60+580,pY+110],[1,pX+75+580, pY+120]]);
  mTom2Rup.show();
  mTom2Rdwn.show();
  CrowsoneLft2.show();
  CrowsoneRyt2.show();
  otoCrowsLft2.show();
  //CrowsoneLft1.movePoints([[0,pX+95+360,pY-10],[1,pX+95+360, pY+10]]);
  //CrowsoneRyt1.movePoints([[0,pX+55+580,pY-10],[1,pX+55+580, pY+10]]);
  //CrowsoneLft1.show();
 // CrowsoneRyt1.show();
  av.step();

  //slide 9
  av.umsg("Here is the chen's relation symbol".bold().big());
  var LabRSym3=av.label(interpret("(man) <span style='color:green;'> one-to-many</span> (man)"), {left: LabelLeft-50, top: pY+170 });
  LabRSym3.css({"font-weight": "bold", "font-size": 20});
  var polygon3 = av.g.polyline([[pX+10, pY+190],
   [pX+10+60, pY+220],
   [pX+10, pY+250],
   [pX+10-60, pY+220],
   [pX+10, pY+190]],
  {"stroke-width": 3, stroke: "black"});
  var Relchenlab3=av.label("<span style='color:blue;'> R </span>", {left: pX+10-5, top:pY+185 });
  Relchenlab3.css({"font-weight": "bold", "font-size": 20});
  otochenLft3.movePoints([[0,pX+10-120,pY-2+220],[1,pX+10-60, pY-2+220]]);
  otochenLft32.movePoints([[0,pX+10-120,pY+2+220],[1,pX+10-60, pY+2+220]]);
  otochenRht3.movePoints([[0,pX+7+60, pY-2+220],[1,pX+70+60,pY-2+220]]);
  otochenRht32.movePoints([[0,pX+7+60, pY+2+220],[1,pX+70+60,pY+2+220]]);
  otochenLft3.show();
  otochenLft32.show();
  otochenRht3.show();
  otochenRht32.show();
  var otolabL3=av.label("<span style='color:blue;'> M </span>", {left: pX+110-20, top:pY+180 });
  var otolabR3=av.label("<span style='color:blue;'> 1 </span>", {left: pX+10-20-90, top:pY+180 });
  av.step();

  //slide 10
  av.umsg("Here is the min-max relation symbol".bold().big());
  var RelMinlab3=av.label("<span style='color:blue;'> R </span>", {left: pX+270-20, top:pY+170 });
  RelMinlab3.css({"font-weight": "bold", "font-size": 20});
  otoMinLft3.movePoints([[0,pX+45+120,pY+220],[1,pX+80+300, pY+220]]);
  var otolabL13=av.label("<span style='color:blue;'> (1,M) </span>", {left: pX+47+120, top:pY+180 });
  var otolabR13=av.label("<span style='color:blue;'> (1,1) </span>", {left: pX+30+300, top:pY+180 });
  otoMinLft3.show();
  av.step();

  //slide 11
  av.umsg("Here is the crow's foot relation symbol".bold().big());
  var RelCrowslab3=av.label("<span style='color:blue;'> R </span>", {left: pX+345+200-20, top:pY+170 });
  RelCrowslab3.css({"font-weight": "bold", "font-size": 20});
  otoCrowsLft3.movePoints([[0,pX+75+360,pY+220],[1,pX+75+580, pY+220]]);
  otoCrowsLft3.show();
  CrowsoneLft3.movePoints([[0,pX+90+360,pY+210],[1,pX+90+360, pY+230]]);
 // mTom3Lup.movePoints([[0,pX+90+360,pY+220],[1,pX+75+360, pY+210]]);
 // mTom3Ldwn.movePoints([[0,pX+90+360,pY+220],[1,pX+75+360, pY+230]]);
 // mTom3Lup.show();
 // mTom3Ldwn.show();
  CrowsoneRyt3.movePoints([[0,pX+60+580,pY+210],[1,pX+60+580, pY+230]]);
  mTom3Rup.movePoints([[0,pX+60+580,pY+220],[1,pX+75+580, pY+210]]);
  mTom3Rdwn.movePoints([[0,pX+60+580,pY+220],[1,pX+75+580, pY+230]]);
  mTom3Rup.show();
  mTom3Rdwn.show();
  CrowsoneLft31.movePoints([[0,pX+95+360,pY+210],[1,pX+95+360, pY+230]]);
 // CrowsoneRyt31.movePoints([[0,pX+55+580,pY+210],[1,pX+55+580, pY+230]]);
  CrowsoneLft3.show();
  CrowsoneRyt3.show();
  CrowsoneLft31.show();
 // CrowsoneRyt31.show();
  av.step();

  //slide 12
  av.umsg("Here is the chen's relation symbol".bold().big());
  var LabRSym4=av.label(interpret("(man) <span style='color:green;'> one-to-many</span> (opt)"), {left: LabelLeft-50, top: pY+280 });
  LabRSym4.css({"font-weight": "bold", "font-size": 20});
  var polygon4 = av.g.polyline([[pX+10, pY+300],
   [pX+10+60, pY+330],
   [pX+10, pY+360],
   [pX+10-60, pY+330],
   [pX+10, pY+300]],
  {"stroke-width": 3, stroke: "black"});
  var Relchenlab4=av.label("<span style='color:blue;'> R </span>", {left: pX+10-5, top:pY+295 });
  Relchenlab4.css({"font-weight": "bold", "font-size": 20});
  otochenLft4.movePoints([[0,pX+10-120,pY-2+330],[1,pX+10-60, pY-2+330]]);
  otochenLft42.movePoints([[0,pX+10-120,pY+2+330],[1,pX+10-60, pY+2+330]]);
  otochenRht4.movePoints([[0,pX+7+60, pY+330],[1,pX+70+60,pY+330]]);
  //otochenRht42.movePoints([[0,pX+7+60, pY+2+330],[1,pX+70+60,pY+2+330]]);
  otochenLft4.show();
  otochenLft42.show();
  otochenRht4.show();
 // otochenRht42.show();
  var otolabL4=av.label("<span style='color:blue;'> M </span>", {left: pX+110-20, top:pY+290 });
  var otolabR4=av.label("<span style='color:blue;'> 1 </span>", {left: pX+10-20-90, top:pY+290 });
  av.step();

  //slide 13
  av.umsg("Here is the min-max relation symbol".bold().big());
  var RelMinlab4=av.label("<span style='color:blue;'> R </span>", {left: pX+270-20, top:pY+280 });
  RelMinlab4.css({"font-weight": "bold", "font-size": 20});
  otoMinLft4.movePoints([[0,pX+45+120,pY+330],[1,pX+80+300, pY+330]]);
  var otolabL14=av.label("<span style='color:blue;'> (1,M) </span>", {left: pX+47+120, top:pY+290 });
  var otolabR14=av.label("<span style='color:blue;'> (0,1) </span>", {left: pX+30+300, top:pY+290 });
  otoMinLft4.show();
  av.step();

  //slide 14
  av.umsg("Here is the crow's foot relation symbol".bold().big());
  var RelCrowslab4=av.label("<span style='color:blue;'> R </span>", {left: pX+345+200-20, top:pY+280 });
  RelCrowslab4.css({"font-weight": "bold", "font-size": 20});
  otoCrowsLft4.movePoints([[0,pX+75+360,pY+330],[1,pX+75+580, pY+330]]);
  otoCrowsLft4.show();
  CrowsoneLft4.movePoints([[0,pX+90+360,pY+320],[1,pX+90+360, pY+340]]);
  //mTom4Lup.movePoints([[0,pX+90+360,pY+330],[1,pX+75+360, pY+320]]);
  //mTom4Ldwn.movePoints([[0,pX+90+360,pY+330],[1,pX+75+360, pY+340]]);
  //mTom4Lup.show();
  //mTom4Ldwn.show();
  //CrowsoneRyt4.movePoints([[0,pX+60+580,pY+320],[1,pX+60+580, pY+340]]);
  mTom4Rup.movePoints([[0,pX+60+580,pY+330],[1,pX+75+580, pY+320]]);
  mTom4Rdwn.movePoints([[0,pX+60+580,pY+330],[1,pX+75+580, pY+340]]);
  mTom4Rup.show();
  mTom4Rdwn.show();
  CrowsoneLft41.movePoints([[0,pX+95+360,pY+320],[1,pX+95+360, pY+340]]);
 // CrowsoneRyt41.movePoints([[0,pX+55+580,pY+320],[1,pX+55+580, pY+340]]);
  CrowsoneLft4.show();
  //CrowsoneRyt4.show();
  CrowsoneLft41.show();
  //CrowsoneRyt41.show();
  av.recorded();


  /*//slide 3
  av.umsg(interpret("Here is the coresponding crow's foot relation symbol").bold().big());
  var Relcrowslab=av.label(interpret("<span style='color:red;'> R </span>"), {left: LabelLeft+(NotationHorGaps*colNo)+100, top:pY-50 });
  Relcrowslab.css({"font-weight": "bold", "font-size": 20});
  RelLine.show();
  av.step();

  //slide 4
  av.umsg(interpret("Here is the coresponding crow's foot relation symbol").bold().big());
  var LabEnSym=av.label(interpret("<span style='color:green;'> Entity Symbol </span>"), {left: LabelLeft, top: (pY-50)+(NotationVerGaps*rowNo) });
  LabEnSym.css({"font-weight": "bold", "font-size": 20});
  var EntityChenRec=av.g.rect(pX-60, (pY-30)+(NotationVerGaps*rowNo), 120, 40, {"stroke-width": 3});
  var labEnChen=av.label(interpret("<span style='color:blue;'>E-name</span>"), {left: pX-45, top:(pY-45)+(NotationVerGaps*rowNo)});
  labEnChen.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 5
  av.umsg(interpret("Here is the coresponding crow's foot relation symbol").bold().big());
  colNo=3;
  var EntityCrowRec=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-30)+(NotationVerGaps*rowNo), 120, 40, {"stroke-width": 3});
  var labEnCrows=av.label(interpret("<span style='color:red;'>E-name</span>"), {left: LabelLeft+(NotationHorGaps*2)+65, top:(pY-45)+(NotationVerGaps*rowNo)});
  labEnCrows.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 6
  av.umsg(interpret("Here is the coresponding crow's foot relation symbol").bold().big());
  rowNo=2;
  colNo=2;
  var LabAttSym=av.label(interpret("<span style='color:green;'> Attribute Symbol </span>"), {left: LabelLeft, top: (pY-50)+(NotationVerGaps*rowNo) });
  LabAttSym.css({"font-weight": "bold", "font-size": 20});
  var Attellipse =av.g.ellipse(pX,(pY-10)+(NotationVerGaps*rowNo) ,70 ,25, {"stroke-width": 3});
  var AttChenLab=av.label(interpret("<span style='color:blue;'>Att-1</span>"), {left: pX-30, top:(pY-45)+(NotationVerGaps*rowNo)});
  AttChenLab.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 7
  av.umsg(interpret("Here is the coresponding crow's foot relation symbol").bold().big());
  colNo=3;
  var EntityChenRecAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 110, {"stroke-width": 3});
  var EntityChenRecAtt2=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 40, {"stroke-width": 3});
  var AttCrowsLab=av.label(interpret("<span style='color:red;'>Entity</span>"), {left: LabelLeft+(NotationHorGaps*2)+80, top:(pY-65)+(NotationVerGaps*rowNo)});
  AttCrowsLab.css({"font-weight": "bold", "font-size": 20});
  var AttCrowsLab1=av.label(interpret("<span style='color:red;'>Att-1</span>"), {left: LabelLeft+(NotationHorGaps*2)+60, top:(pY-30)+(NotationVerGaps*rowNo)});
  AttCrowsLab1.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab2=av.label(interpret("<span style='color:red;'>Att-2</span>"), {left: LabelLeft+(NotationHorGaps*2)+60, top:(pY-10)+(NotationVerGaps*rowNo)});
  AttCrowsLab2.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab3=av.label(interpret("<span style='color:red;'>Att-3</span>"), {left: LabelLeft+(NotationHorGaps*2)+60, top:(pY+10)+(NotationVerGaps*rowNo)});
  AttCrowsLab3.css({"font-weight": "bold", "font-size": 18});
  av.step();

  //slide 8
  av.umsg(interpret("Here is the coresponding crow's foot relation symbol").bold().big());
  rowNo=3;
  colNo=2;
  var LabPkSym=av.label(interpret("<span style='color:green;'> Primary Key Symbol </span>"), {left: LabelLeft, top: (pY-50)+(NotationVerGaps*rowNo) });
  LabPkSym.css({"font-weight": "bold", "font-size": 20});
  var PKAttellipse =av.g.ellipse(pX,(pY-10)+(NotationVerGaps*rowNo) ,70 ,25, {"stroke-width": 3});
  var PKAttChenLab=av.label(interpret("<span style='color:blue;'>Attribute</span>"), {left: pX-40, top:(pY-45)+(NotationVerGaps*rowNo)});
  PKAttChenLab.css({"font-weight": "bold", "font-size": 18});
  PKAttLine.movePoints([[0,pX-35, (pY)+(NotationVerGaps*rowNo)],[1, pX+50,(pY)+(NotationVerGaps*rowNo)]]);
  PKAttLine.show();
  av.step();

  //slide 9
  av.umsg(interpret("Here is the coresponding crow's foot relation symbol").bold().big());
  colNo=3;
  var PkAttCrowRec=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo)+30, 120, 125, {"stroke-width": 3});
  var PkAttCrowRec2=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo)+30, 120, 30, {"stroke-width": 3});
  var PkAttCrowRec3=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo)+30+30, 120, 30, {"stroke-width": 3});
  var AttCrowsLab7=av.label(interpret("<span style='color:red;'>Entity</span>"), {left: LabelLeft+(NotationHorGaps*2)+80, top:(pY-65)+(NotationVerGaps*rowNo)+30});
  AttCrowsLab7.css({"font-weight": "bold", "font-size": 20});
  var AttCrowsLab4=av.label(interpret("<span style='color:red;'>Att-1</span>"), {left: LabelLeft+(NotationHorGaps*2)+85, top:(pY-30)+(NotationVerGaps*rowNo)+20});
  AttCrowsLab4.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab5=av.label(interpret("<span style='color:red;'>Att-2</span>"), {left: LabelLeft+(NotationHorGaps*2)+85, top:(pY-10)+(NotationVerGaps*rowNo)+30});
  AttCrowsLab5.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab6=av.label(interpret("<span style='color:red;'>Att-3</span>"), {left: LabelLeft+(NotationHorGaps*2)+85, top:(pY+10)+(NotationVerGaps*rowNo)+30});
  AttCrowsLab6.css({"font-weight": "bold", "font-size": 18});
  PKLineCrows.movePoints([[0, LabelLeft+(NotationHorGaps*2)+85, (pY-30)+(NotationVerGaps*rowNo)+63], [1, LabelLeft+(NotationHorGaps*2)+140, (pY-30)+(NotationVerGaps*rowNo)+63]]);
  PKLineTableCrows.movePoints([[0,LabelLeft+(NotationHorGaps*2)+80,(pY-50)+(NotationVerGaps*rowNo)+60],[1,LabelLeft+(NotationHorGaps*2)+80,(pY-50)+(NotationVerGaps*rowNo)+155]]);
  PKLineCrows.show();
  PKLineTableCrows.show();
  var PKcrowsLab=av.label(interpret("<span style='color:red;'>PK</span>"), {left: LabelLeft+(NotationHorGaps*2)+50, top:(pY-30)+(NotationVerGaps*rowNo)+30});
  PKcrowsLab.css({"font-weight": "bold", "font-size": 14});
  av.step();

  //slide 10
  LabRSym.hide();
 Relchenlab.hide();
  Relcrowslab.hide();
 RelLine.hide();
  LabEnSym.hide();
  EntityChenRec.hide();
  EntityCrowRec.hide();
  polygon.hide();
 labEnChen.hide();
  labEnCrows.hide();
  LabAttSym.hide();
 AttChenLab.hide();
  AttCrowsLab.hide();
  AttCrowsLab1.hide();
  AttCrowsLab2.hide();
  AttCrowsLab3.hide();
  AttCrowsLab4.hide();
  AttCrowsLab5.hide();
  AttCrowsLab6.hide();
  AttCrowsLab7.hide();
  Attellipse.hide();
  PKAttellipse.hide();
  LabPkSym.hide();
  EntityChenRecAtt.hide();
  EntityChenRecAtt2.hide();
  PkAttCrowRec.hide();
  PkAttCrowRec2.hide();
  PkAttCrowRec3.hide();
  PKAttChenLab.hide();
  PKAttLine.hide();
  PKLineCrows.hide();
  PKLineTableCrows.hide();
  PKcrowsLab.hide();
  labChen.hide();
  labCrows.hide();
  var ProblemLab=av.label(interpret("<span style='color:green;'> Assume Having two entities one representing student with his name, id and birthdate while the other representing courses studied by each student, course detailes are code, name and hours, Draw two ER-diagrams for this relation one using chen model and another using crow's foot notation do not forget showing the corresponding physical schema diagram </span>"), {left: LabelLeft-20, top: pY-60 });
  ProblemLab.css({"font-weight": "bold", "font-size": 20});
  //av.umsg(interpret("Assume Having two entities one representing student with his name, id and birthdate while the other representing courses studied by each student, course detailes are code, name and hours, Draw two ER-diagrams for this relation one using chen model and another using crow's foot notation o not forget showing the corresponding physical schema diagram").bold().big());
  av.step();

//slide 11
ProblemLab.hide();
colNo=2;
var LabelLeftChen=LabelLeft;
var NotationHorGapsChen=NotationHorGaps+280;
labChen=av.label(interpret("<span style='color:blue;'> Chen Notation </span>"), {left: LabelLeftChen+100, top: labelTop });
labChen.css({"font-weight": "bold", "font-size": 20});

av.umsg(interpret("Here is the Student entity representation using Chen notation").bold().big());
var EntityChenRecStu=av.g.rect(LabelLeftChen-70, pY+115 , 120, 40, {"stroke-width": 3});
   var StudEntLab=av.label(interpret("<span style='color:blue;'> Student </span>"), {left: LabelLeftChen-60, top:pY+100 });
   StudEntLab.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 12
av.umsg(interpret("Adding attributes name, ID and birthdate to student entity").bold().big());
var StdId =av.g.ellipse(LabelLeftChen-35,pY ,60 ,25, {"stroke-width": 3});
   var StdIdLab=av.label(interpret("<span style='color:blue;'> SID </span>"), {left: LabelLeftChen-60, top:pY-30});
   sidLine.movePoints([[0,LabelLeftChen-30,pY+115],[1,LabelLeftChen-60,pY+25]]);
   sidLine.show();
   var StdName =av.g.ellipse(LabelLeftChen+20,pY+60 ,60 ,25, {"stroke-width": 3});
   var StdNameLab=av.label(interpret("<span style='color:blue;'> Sname </span>"), {left: LabelLeftChen-10, top:pY+30 });
   snameLine.movePoints([[0,LabelLeftChen+10,pY+115],[1,LabelLeftChen+20,pY+60+25]]);
   snameLine.show();
   var StdBdate =av.g.ellipse(LabelLeftChen+120,pY ,60 ,25, {"stroke-width": 3});
   var StdBdateLab=av.label(interpret("<span style='color:blue;'> B-date </span>"), {left: LabelLeftChen+90, top:pY-30});
   sbdateLine.movePoints([[0,LabelLeftChen+40,pY+115],[1,LabelLeftChen+120,pY+25]]);
   sbdateLine.show();
   av.step();

   //slide 13
   av.umsg(interpret("Here is the corresponding Student entity representation in crow's foot notation").bold().big());
   labCrows=av.label(interpret("<span style='color:red;'> Crow’s Foot Notation </span>"), {left: LabelLeftChen+NotationHorGapsChen, top:labelTop });
   labCrows.css({"font-weight": "bold", "font-size": 20});
   var CrowRecStd1=av.g.rect(LabelLeft+(NotationHorGaps*2)-80, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 125, {"stroke-width": 3});
  var CrowRecStd2=av.g.rect(LabelLeft+(NotationHorGaps*2)-80, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 30, {"stroke-width": 3});
  var CrowRecStd3=av.g.rect(LabelLeft+(NotationHorGaps*2)-80, (pY-50)+(NotationVerGaps*rowNo)-220+30, 120, 30, {"stroke-width": 3});
  var stdCrowlab=av.label(interpret("<span style='color:red;'>Student</span>"), {left: LabelLeft+(NotationHorGaps*2)+65-130, top:(pY-65)+(NotationVerGaps*rowNo)+25-250});
  stdCrowlab.css({"font-weight": "bold", "font-size": 20});
  PKLineTableCrows.movePoints([[0,LabelLeft+(NotationHorGaps*2)+80-130,(pY-50)+(NotationVerGaps*rowNo)+60-250],[1,LabelLeft+(NotationHorGaps*2)+80-130,(pY-50)+(NotationVerGaps*rowNo)+155-250]]);
  PKLineTableCrows.show();
  av.step();

  //slide 14
  av.umsg(interpret("Then adding attributes to student entity using crow's foot notation").bold().big());
  var sidCrowLab=av.label(interpret("<span style='color:red;'>SID</span>"), {left: LabelLeft+(NotationHorGaps*2)+85-130, top:(pY-30)+(NotationVerGaps*rowNo)+20-250});
  sidCrowLab.css({"font-weight": "bold", "font-size": 18});
  var snameCrowLab=av.label(interpret("<span style='color:red;'>Sname</span>"), {left: LabelLeft+(NotationHorGaps*2)+85-130, top:(pY-10)+(NotationVerGaps*rowNo)+30-250});
  snameCrowLab.css({"font-weight": "bold", "font-size": 18});
  var sbdateCrowLab=av.label(interpret("<span style='color:red;'>B-date</span>"), {left: LabelLeft+(NotationHorGaps*2)+85-130, top:(pY+10)+(NotationVerGaps*rowNo)+30-250});
  sbdateCrowLab.css({"font-weight": "bold", "font-size": 18});
  av.step();

  //slide 15
  av.umsg(interpret("Now, representing course entity with its attributes using chen notation").bold().big());
  var EntityChenRecCor=av.g.rect(pX-90, pY-35+150, 120, 40, {"stroke-width": 3});
   var CorEntLab=av.label(interpret("<span style='color:blue;'> Course </span>"), {left: pX-75, top:pY-50+150 });
   CorEntLab.css({"font-weight": "bold", "font-size": 20});
   var CorCode =av.g.ellipse(pX-110,pY-35+50 ,60 ,25, {"stroke-width": 3});
   var CorCodeLab=av.label(interpret("<span style='color:blue;'> Code </span>"), {left: pX-140, top:pY-35+20 });
   ccodeLine.movePoints([[0,pX-80,pY-35+150],[1,pX-120,pY-35+50+25 ]]);
   ccodeLine.show();
   var CorName =av.g.ellipse(pX-90+60,pY-35+100 ,60 ,25, {"stroke-width": 3});
   var CorNameLab=av.label(interpret("<span style='color:blue;'> Cname </span>"), {left: pX-90+30, top:pY-35+70 });
   cnameLine.movePoints([[0,pX-30,pY-35+150],[1,pX-90+60,pY-35+100+25]]);
   cnameLine.show();
   var CorHours =av.g.ellipse(pX-70+110,pY-35+50 ,60 ,25, {"stroke-width": 3});
   var CorHoursLab=av.label(interpret("<span style='color:blue;'> Hours </span>"), {left: pX-70+80, top:pY-35+20 });
   choursLine.movePoints([[0,pX+10,pY-35+150],[1,pX-70+130,pY-35+50+25]]);
   choursLine.show();
   av.step();

   //slide 16
   av.umsg(interpret("Then, the corresponding representation of course entity with its attributes by crow's foot notation").bold().big());
   var CrowReccor1=av.g.rect(LabelLeft+(NotationHorGaps*2)+200, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 125, {"stroke-width": 3});
   var CrowReccor2=av.g.rect(LabelLeft+(NotationHorGaps*2)+200, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 30, {"stroke-width": 3});
   var CrowReccor3=av.g.rect(LabelLeft+(NotationHorGaps*2)+200, (pY-50)+(NotationVerGaps*rowNo)-220+30, 120, 30, {"stroke-width": 3});
   var corCrowlab=av.label(interpret("<span style='color:red;'>Course</span>"), {left: LabelLeft+(NotationHorGaps*2)+65-130+280, top:(pY-65)+(NotationVerGaps*rowNo)+25-250});
   corCrowlab.css({"font-weight": "bold", "font-size": 20});
   var ccodeCrowLab=av.label(interpret("<span style='color:red;'>Code</span>"), {left: LabelLeft+(NotationHorGaps*2)+85-130+280, top:(pY-30)+(NotationVerGaps*rowNo)+20-250});
   ccodeCrowLab.css({"font-weight": "bold", "font-size": 18});
   var cnameCrowLab=av.label(interpret("<span style='color:red;'>Cname</span>"), {left: LabelLeft+(NotationHorGaps*2)+85-130+280, top:(pY-10)+(NotationVerGaps*rowNo)+30-250});
   cnameCrowLab.css({"font-weight": "bold", "font-size": 18});
   var choursCrowLab=av.label(interpret("<span style='color:red;'>Hours</span>"), {left: LabelLeft+(NotationHorGaps*2)+85-130+280, top:(pY+10)+(NotationVerGaps*rowNo)+30-250});
   choursCrowLab.css({"font-weight": "bold", "font-size": 18});
   
  PKLinecorsTableCrows.movePoints([[0,LabelLeft+(NotationHorGaps*2)+80-130+280,(pY-50)+(NotationVerGaps*rowNo)+60-250],[1,LabelLeft+(NotationHorGaps*2)+80-130+280,(pY-50)+(NotationVerGaps*rowNo)+155-250]]);
  
  PKLinecorsTableCrows.show();
  av.step();

  //slide 17
  av.umsg(interpret("Identifying primary keys (underline PK attributes)for entities (as SID for Student & C-cOde for course entities) in Chen notation").bold().big());
  sidPkLine.movePoints([[0,LabelLeftChen-60,pY+10],[1,LabelLeftChen-18,pY+10]]);
   sidPkLine.show();
  ccodePkLine.movePoints([[0,pX-140,pY-35+60],[1,pX-87,pY-35+60]]);
   ccodePkLine.show(); 
   av.step();

   //slide 18
   av.umsg(interpret("Identifying primary keys for entities in Crow's foot notation").bold().big());
   PKLineCrows.movePoints([[0, LabelLeft+(NotationHorGaps*2)+85-130, (pY-30)+(NotationVerGaps*rowNo)+63-250], [1, LabelLeft+(NotationHorGaps*2)+128-130, (pY-30)+(NotationVerGaps*rowNo)+63-250]]);
  PKLineCrows.show();
  var PKstdcrowsLab=av.label(interpret("<span style='color:red;'>PK</span>"), {left: LabelLeft+(NotationHorGaps*2)+50-130, top:(pY-30)+(NotationVerGaps*rowNo)+30-250});
  PKstdcrowsLab.css({"font-weight": "bold", "font-size": 14});
  PKLinecorsCrows.movePoints([[0, LabelLeft+(NotationHorGaps*2)+85-130+280, (pY-30)+(NotationVerGaps*rowNo)+63-250], [1, LabelLeft+(NotationHorGaps*2)+128-130+300, (pY-30)+(NotationVerGaps*rowNo)+63-250]]);
  PKLinecorsCrows.show();
  var PKcorcrowsLab=av.label(interpret("<span style='color:red;'>PK</span>"), {left: LabelLeft+(NotationHorGaps*2)+50-130+280, top:(pY-30)+(NotationVerGaps*rowNo)+30-250});
  PKcorcrowsLab.css({"font-weight": "bold", "font-size": 14});
  av.step();

  //slide 19
  av.umsg(interpret("Register relation in chen notation").bold().big());
  stdLine.movePoints([[0,LabelLeftChen-70+120,labelTop+80+150],[1,LabelLeftChen+170-60,labelTop+80+150]]);
   stdLine.show();
   var polygonRegister = av.g.polyline([[LabelLeftChen+170, labelTop+80-30+150],
    [LabelLeftChen+170+60, labelTop+80+150],
    [LabelLeftChen+170, labelTop+80+30+150],
    [LabelLeftChen+170-60, labelTop+80+150],
    [LabelLeftChen+170, labelTop+80-30+150]],
   {"stroke-width": 3, stroke: "black"});
   CorLine.movePoints([[0,LabelLeftChen+170+60,labelTop+80+150],[1, pX-90,labelTop+80+150]]);
   CorLine.show();
   var RelchenReg=av.label(interpret("<span style='color:blue;'> Register </span>"), {left:labelTop+210+30, top:labelTop+45+150 });
   RelchenReg.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 20
   av.umsg(interpret("Corrsponding Register relation in crow's foot notation").bold().big());
   RegRelLine.movePoints([[0,LabelLeft+(NotationHorGaps*2)-80+120,(pY-50)+(NotationVerGaps*rowNo)-220+80],[1,LabelLeft+(NotationHorGaps*2)+200,(pY-50)+(NotationVerGaps*rowNo)-220+80]]);
   RegRelLine.show(); 
   var regRelLab=av.label(interpret("<span style='color:red;'>Register</span>"), {left: LabelLeft+(NotationHorGaps*2)-80+160, top:(pY-50)+(NotationVerGaps*rowNo)-220+30});
   regRelLab.css({"font-weight": "bold", "font-size": 18});
   av.step();

   //slide 21
   av.umsg(interpret("The physical relational schema diagram corresponding to both Chen & crow's foot notations").bold().big());
   labCrows=av.label(interpret("<span style='color:green;'> Physical Relational schema </span>"), {left: LabelLeftChen, top:labelTop+300});
   labCrows.css({"font-weight": "bold", "font-size": 20});
   var studSchlab=av.label(interpret("Student"), {left: LabelLeftChen, top: labelTop+350 });
   studSchlab.css({"font-weight": "bold", "font-size": 15});
   //studSchlab.hide();
   var studSchema = [["SID","Sname","B-date"]];
   var studSchemaArr= av.ds.matrix(studSchema, {style: "table", top: labelTop+300+70, left: LabelLeftChen});
   studSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
   //studSchemaArr._arrays[0].hide();
   
   var corSchlab=av.label(interpret("Course"), {left: LabelLeftChen, top: labelTop+300+120 });
   corSchlab.css({"font-weight": "bold", "font-size": 15});
  // corSchlab.hide();
   var corSchema = [["C-code","Cname","Hours"]];
   var corSchemaArr= av.ds.matrix(corSchema, {style: "table", top: labelTop+300+140, left: LabelLeftChen});
   corSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
   //corSchemaArr._arrays[0].hide();
  av.recorded();*/


});
