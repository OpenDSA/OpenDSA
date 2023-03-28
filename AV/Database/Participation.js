/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "Participation";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);

   
   var LabelLeft=70;
   var labelTop=-30;
   var midPage=420;
   var NotationHorGaps=250;
   var NotationVerGaps=80;
   var pY=labelTop+370;
   var pX=LabelLeft+580;
   var pX2=LabelLeft+200+50;
   var pY2=labelTop+140;
   var rowNo=1;
   var colNo=1;
   var lineCardPartX1=570;
   var lineCardY1=labelTop+60;
   var lineCardX2=lineCardPartX1-100;
   var linePartX2=lineCardPartX1+100;
   var lineCardY2=80;
   var labConstraint=av.label("<span style='color:red;'>Relationship Constraint</span>", {left: midPage, top: labelTop });
   labConstraint.css({"font-weight": "bold", "font-size": 26});

   var lineCard = av.g.line(lineCardPartX1, lineCardY1, lineCardX2, lineCardY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   lineCard.hide();
   
   var labCardinality=av.label("<span style='color:blue;'> Cardinality </span>", {left:lineCardX2-100, top: lineCardY2-20 });
   labCardinality.css({"font-weight": "bold", "font-size": 22});
   labCardinality.hide();

   var linePart = av.g.line(lineCardPartX1, lineCardY1, linePartX2, lineCardY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   linePart.hide();

   colNo=2;
   var labParticipation=av.label("<span style='color:blue;'> Participation </span>", {left: linePartX2, top: lineCardY2-20});
   labParticipation.css({"font-weight": "bold", "font-size": 22});
   labParticipation.hide();

   var Entity1Line=av.g.line(pX+10-60, pY,pX+10-60-101,pY, {opacity: 100, "stroke-width": 2});
   Entity1Line.hide();
   var Entity2Line=av.g.line(pX+10+60, pY,LabelLeft+750, pY, {opacity: 100, "stroke-width": 2});
   Entity2Line.hide();

   var ProbSol1Line = av.g.line(LabelLeft+650,labelTop+275,LabelLeft+300, labelTop+345, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbSol1Line.hide();

   var ProbSol2Line = av.g.line(LabelLeft+630,labelTop+275,LabelLeft+360, labelTop+390, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbSol2Line.hide();

   var ProbSol3Line = av.g.line(LabelLeft+500,labelTop+300,LabelLeft+360, labelTop+390, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbSol3Line.hide();

   var ProbSol4Line = av.g.line(LabelLeft+900,labelTop+300,LabelLeft+850,  labelTop+400, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbSol4Line.hide();

   var ProbEx1Line1 = av.g.line(pX2+230-60, pY2-40,LabelLeft+230, pY2-40, { opacity: 100, "stroke-width": 2});
   ProbEx1Line1.hide();
   var ProbEx1Line2 = av.g.line(pX2+230+60, pY2-40,LabelLeft+450+300, pY2-40, {opacity: 100, "stroke-width": 2});
   ProbEx1Line2.hide();

   var ProbEx1Line2Par = av.g.line(pX2+230+55, pY2-35,LabelLeft+450+300, pY2-35, {opacity: 100, "stroke-width": 2});
   ProbEx1Line2Par.hide();
   var ProbEx1Line1Par = av.g.line(pX2+230-55, pY2-35,LabelLeft+230, pY2-35, { opacity: 100, "stroke-width": 2});
   ProbEx1Line1Par.hide();
   

   var ProbEx1Line3 = av.g.line(LabelLeft+500,labelTop+170,LabelLeft+180,  labelTop+110, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line3.hide();

   var ProbEx1Line4 = av.g.line(LabelLeft+400,labelTop+230,LabelLeft+215,  labelTop+120, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line4.hide();

   var ProbEx1Line5 =  av.g.line(LabelLeft+460,labelTop+260,pX-290,pY-275, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line5.hide();

   var ProbEx1Line6 = av.g.line(LabelLeft+480,labelTop+265,LabelLeft+800 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line6.hide();

   var ProbEx1Line7 = av.g.line(LabelLeft+480,labelTop+265,LabelLeft+720 ,labelTop+120, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line7.hide();

   var ProbEx1Line8 = av.g.line(LabelLeft+310,labelTop+290,LabelLeft+800 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line8.hide();

   var ProbEx1Line9 = av.g.line(LabelLeft+620,labelTop+300,LabelLeft+710 ,labelTop+100, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line9.hide();
   
   var ProbEx1Line10 = av.g.line(LabelLeft+620,labelTop+295,pX-290,pY-275, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line10.hide();

   var ProbEx1Line11 = av.g.line(LabelLeft+620,labelTop+300,LabelLeft+720 ,labelTop+115, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line11.hide();

   var ProbEx1Line12 = av.g.line(LabelLeft+180,labelTop+260,LabelLeft+160, labelTop+120, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line12.hide();

   var ProbEx1Line13 = av.g.line(LabelLeft+180,labelTop+260,LabelLeft+160, labelTop+120, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line13.hide();

   var ProbEx1Line14 = av.g.line(LabelLeft+350,labelTop+210,LabelLeft+750 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line14.hide();

   var ProbEx1Line15 = av.g.line(LabelLeft+280,labelTop+210,LabelLeft+750 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line15.hide();

   var ProbEx1Line16 = av.g.line(LabelLeft+545,labelTop+300,pX-335,pY-260, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line16.hide();

   // Slide 1
   av.umsg("");
   av.displayInit(1);
   //av.step();

   // Slide 2
   av.umsg("");
   lineCard.show();
   labCardinality.show();
   av.step();

   //slide 3
   linePart.show();
   labParticipation.show();
   av.step();

   //slide 4
   av.umsg(interpret("What is the meaning of<span style='color:blue;'> Participation </span>?").bold().big());
   lineCard.hide();
   labCardinality.hide();
   linePart.hide();
   labParticipation.hide();
   labConstraint.hide();
   var labCardDefTitle=av.label("<span style='color:blue;'> Participation </span>", {left:LabelLeft-30, top: labelTop});
   labCardDefTitle.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 5
   var labCardDef1=av.label("It tells us whether the relationship is <span style='color:green;'>important</span> or <span style='color:green;'>not</span> ?", {left:LabelLeft-30, top: labelTop+40});
   labCardDef1.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 6
   var labCardDef2=av.label("identifies if all instances of an entity should <span style='color:green;'> participate in the relationship or not</span>.", {left:LabelLeft-30, top: labelTop+80});
   labCardDef2.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 7
   var labCardDef3=av.label("determines <span style='color:green;'> minimum number </span> of times an instance of one entity can be associated with an instance in the related entity.", {left:LabelLeft-30, top: labelTop+120});
   labCardDef3.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 8
   var labCardType=av.label("<span style='color:blue;'> Participation Types </span>", {left:LabelLeft-30, top: labelTop+200});
   labCardType.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 9
   var labCarType1=av.label("<span style='color:green;'>[Optional]=(Partial participation)</span>", {left:LabelLeft-30, top: labelTop+260});
   labCarType1.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 10
   var labCarType2=av.label("<span style='color:green;'>[Mandatory]=(Total participation)</span>", {left:LabelLeft-30, top: labelTop+360});
   labCarType2.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 11
   //var labCarType3=av.label("<span style='color:green;'>[many-to-many]</span>", {left:LabelLeft, top: labelTop+450});
   //labCarType3.css({"font-weight": "bold", "font-size": 20});
   //av.step();

   //slide 11
   var Entity1Rect=av.g.rect(LabelLeft+300, labelTop+350, 130, 50, {"stroke-width": 3});
   var Entity1Lab=av.label("<span style='color:blue;'>Entity1</span>", {left:LabelLeft+330, top: labelTop+340});
   Entity1Lab.css({"font-weight": "bold", "font-size": 20});
   var Entity2Rect=av.g.rect(LabelLeft+750, labelTop+350, 130, 50, {"stroke-width": 3});
   var Entity2Lab=av.label("<span style='color:blue;'>Entity2</span>", {left:LabelLeft+780, top: labelTop+340});
   Entity2Lab.css({"font-weight": "bold", "font-size": 20});
   var polygon = av.g.polyline([[pX+10, pY-30],
    [pX+10+60, pY],
    [pX+10, pY+30],
    [pX+10-60, pY],
    [pX+10, pY-30]],
   {"stroke-width": 3, stroke: "black"});
   var RelLab=av.label("<span style='color:blue;'>R</span>", {left:LabelLeft+585, top: labelTop+335});
   RelLab.css({"font-weight": "bold", "font-size": 20});
   var ProblemLab=av.label("<span style='color:red;'>In such relation, How to determine participation type</span>", {left:LabelLeft+300, top: labelTop+270});
   ProblemLab.css({"font-weight": "bold", "font-size": 20});
   var ProblemQmarkLab=av.label("<span style='color:red;'>??</span>", {left:LabelLeft+800, top: labelTop+230});
   ProblemQmarkLab.css({"font-weight": "bold", "font-size": 40});
   Entity1Line.show();
   Entity2Line.show();
   av.step();

   //slide 12
   ProblemLab.hide();
   ProblemQmarkLab.hide();
   var ProblemSolLab1=av.label("<span style='color:green;'>First,</span> You <span style='color:red;'>shouldn't</span> think about the <span style='color:blue;'>entity</span> itself</span>", {left:LabelLeft+300, top: labelTop+230});
   ProblemSolLab1.css({"font-weight": "bold", "font-size": 20});
   ProbSol1Line.show();
   av.step();

   //slide 13
   labCarType1.hide();
   labCarType2.hide();
   ProblemSolLab1.hide();
   Entity1Lab.hide();
   Entity1Rect.hide();
   Entity2Lab.hide();
   Entity2Rect.hide();
   ProbSol1Line.hide();
   ProbSol2Line.show();
   var ProblemSolLab2=av.label("<span style='color:bule;'>You <span style='color:red;'>should</span> think about <span style='color:blue;'>each instance (record)</span> inside that entity (Entity1)</span>", {left:LabelLeft+300, top: labelTop+230});
   ProblemSolLab2.css({"font-weight": "bold", "font-size": 20});
   var Entity1LabA=av.label("Entity1", {left:LabelLeft+155, top: labelTop+310});
   Entity1LabA.css({"font-weight": "bold", "font-size": 20});
   var theEntity1matrix =[["A1", "A2", "A3"],["", "", ""],["", "", ""],["", "", ""]];
   var MatrixEntity1= av.ds.matrix(theEntity1matrix, {style: "table", top: labelTop+340, left: LabelLeft+155 });
   MatrixEntity1._arrays[1].highlight();
   var Entity2LabA=av.label("Entity2", {left:LabelLeft+750, top: labelTop+310});
   Entity2LabA.css({"font-weight": "bold", "font-size": 20});
   var theEntity2matrix =[["A1", "A2"],["", ""],["", ""],["", ""]];
   var MatrixEntity2= av.ds.matrix(theEntity2matrix, {style: "table", top: labelTop+340, left: LabelLeft+750 });
   av.step();

   //slide 14
   ProblemSolLab2.hide();
   ProbSol2Line.hide();
   ProbSol3Line.show();
   var ProblemSolLab3=av.label("<span style='color:green;'>Second,</span> ask yourself <span style='color:red;'>ِِِِAre all instances of entity1 should participate in this relation ?</span> OR <span style='color:red;'>ِِِِwaht is the minimum number of instances in entity2 can be related with each instance in entity1 ?</span>", {left:LabelLeft+300, top: labelTop+230});
   ProblemSolLab3.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 15
   ProblemSolLab3.hide();
   ProbSol3Line.hide();
   ProbSol4Line.show();
   var ProblemSolLab4=av.label("<span style='color:green;'>Third,</span> ask the same question from the other side of relation <span style='color:red;'>Are all instances of entity2 should participate in this relation ?</span> ", {left:LabelLeft+300, top: labelTop+230});
   ProblemSolLab4.css({"font-weight": "bold", "font-size": 20});
   MatrixEntity1._arrays[1].unhighlight();
   MatrixEntity2._arrays[1].highlight();
   av.step();

   //slide 16
   av.umsg(interpret("How to <span style='color:blue;'>determine participation constraint</span> of a relation?").bold().big());
   labCardDefTitle.hide();
   labCardDef1.hide();
   labCardDef2.hide();
   labCardDef3.hide();
   labCardType.hide();
   labCarType1.hide();
   labCarType2.hide();
   //labCarType3.hide();
   polygon.hide();
   Entity1Line.hide();
   Entity2Line.hide();
   for(i=0;i<theEntity1matrix.length;i++)
   MatrixEntity1._arrays[i].hide();
   for(i=0;i<theEntity1matrix.length;i++)
   MatrixEntity2._arrays[i].hide();
   ProbSol4Line.hide();
   ProblemSolLab4.hide();
   Entity1LabA.hide();
   Entity2LabA.hide();
   RelLab.hide();
   var labExample=av.label(" <span style='color:red;'> Ex1: </span> Assume having the below relationship <span style='color:red;'> (Has)</span> between <span style='color:blue;'> Depatment & Employee </span> entities", {left:LabelLeft, top:labelTop });
   labExample.css({"font-weight": "bold", "font-size": 22});
   var Entity1RectEx1=av.g.rect(LabelLeft+100, labelTop+40+30, 130, 50, {"stroke-width": 3});
   var Entity1LabEx1=av.label("<span style='color:blue;'>Department</span>", {left:LabelLeft+110, top: labelTop+60});
   Entity1LabEx1.css({"font-weight": "bold", "font-size": 20});
   var Entity2RecEx1=av.g.rect(LabelLeft+450+300, labelTop+40+30, 130, 50, {"stroke-width": 3});
   var Entity2LabEx1=av.label("<span style='color:blue;'>Employee</span>", {left:LabelLeft+460+300, top: labelTop+60});
   Entity2LabEx1.css({"font-weight": "bold", "font-size": 20});
   var polygonEx1 = av.g.polyline([[pX2+230, pY2-70],
    [pX2+230+60, pY2-40],
    [pX2+230, pY2-10],
    [pX2+230-60, pY2-40],
    [pX2+230, pY2-70]],
   {"stroke-width": 3, stroke: "black"});
   var RelLabEx1=av.label("<span style='color:blue;'>Has</span>", {left:pX2+245-30, top: pY2-75});
   RelLabEx1.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line1.show();
   ProbEx1Line2.show();
   av.step();

   //slide 17
   var Ex1CardLab=av.label("<span style='color:red;'>To determine cardinality Type:</span>", {left:LabelLeft, top: labelTop+120});
   Ex1CardLab.css({"font-weight": "bold", "font-size": 20});
   var ProblemSolEx1Lab1=av.label("<span style='color:green;'>First,</span> You <span style='color:red;'>shouldn't</span> think about the <span style='color:blue;'>Department Entity</span> itself</span>", {left:LabelLeft+110, top: labelTop+150});
   ProblemSolEx1Lab1.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line3.show();
   av.step();

   //slide 18
   Ex1CardLab.hide();
   ProblemSolEx1Lab1.hide();
   ProbEx1Line3.hide();
   Entity1RectEx1.hide();
   Entity1LabEx1.hide();
   Entity2RecEx1.hide();
   Entity2LabEx1.hide();
   var ProblemEx1SolLab2=av.label("<span style='color:bule;'>You <span style='color:red;'>should</span> think about <span style='color:blue;'>each depatment instance (record)</span> inside Department entity</span>",  {left:LabelLeft+110, top: labelTop+210});
   ProblemEx1SolLab2.css({"font-weight": "bold", "font-size": 20});
   var Entity1Ex1LabA=av.label("Department", {left:LabelLeft+55, top: labelTop+30});
   Entity1Ex1LabA.css({"font-weight": "bold", "font-size": 18});
   var theEntity1matrixEx1 =[["DID", "Dname", "D-floor"],["A","production","3rd"],["B","sales","1st"],["C","transport","2nd"]];
   var MatrixEntity1Ex1= av.ds.matrix(theEntity1matrixEx1, {style: "table", top: labelTop+60, left: LabelLeft-45 });
   MatrixEntity1Ex1._arrays[1].highlight();
   var Entity2Ex1LabA=av.label("Employee", {left:LabelLeft+800, top: labelTop+30});
   Entity2Ex1LabA.css({"font-weight": "bold", "font-size": 18});
   var theEntity2matrixEx1 =[["EID", "E-name"],["200", "ali"],["201", "mona"],["202","mai"]];
   var MatrixEntity2Ex1= av.ds.matrix(theEntity2matrixEx1, {style: "table", top: labelTop+60, left: LabelLeft+750 });
   ProbEx1Line4.show();
   av.step();

   // slide 19
   ProblemEx1SolLab2.hide();
   var ProblemEx1SolLab3=av.label("<span style='color:green;'>Second,</span> ask yourself <span style='color:red;'>Can any department instance (e.g. production dep.) in the department entity be empty of employees?</span><span style='color:blue;'>(i.e. have no employees)</span> ",{left:LabelLeft+40, top: labelTop+210});
   ProblemEx1SolLab3.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab3Cont1=av.label("<span style='color:green;'>OR",{left:LabelLeft+480, top: labelTop+250});
   ProblemEx1SolLab3Cont1.css({"font-weight": "bold", "font-size": 26});
   var ProblemEx1SolLab3Cont2=av.label("ask yourself <span style='color:red;'>What is the</span> <span style='color:blue;'>minimum number</span>  <span style='color:red;'>of employees can production department have?</span> <span style='color:blue;'>(Zero or more)</span>",{left:LabelLeft+40, top: labelTop+310});
   ProblemEx1SolLab3Cont2.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab4Cont1=av.label("<span style='color:green;'>OR",{left:LabelLeft+480, top: labelTop+370});
   ProblemEx1SolLab4Cont1.css({"font-weight": "bold", "font-size": 26});
   var ProblemEx1SolLab5Cont2=av.label("ask yourself <span style='color:red;'>Are</span> <span style='color:blue;'>all instances of depatment entity</span>  <span style='color:red;'>should participate in the relationship and at least have one employee?</span>",{left:LabelLeft+40, top: labelTop+430});
   ProblemEx1SolLab5Cont2.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 20
   ProblemEx1SolLab4Cont1.hide();
   ProblemEx1SolLab5Cont2.hide();
   ProblemEx1SolLab3.hide();
   ProblemEx1SolLab3Cont1.hide();
   ProblemEx1SolLab3Cont2.hide();
   var ProblemEx1SolLab4=av.label("<span style='color:green;'>IF the answers are:</span> <span style='color:green;'>*YES*</span> any department instance (e.g. production dep.) can be empty of employees <span style='color:blue;'>(i.e. have no employees)</span> ",{left:LabelLeft+40, top: labelTop+210});
   ProblemEx1SolLab4.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab5=av.label("<span style='color:green;'>And",{left:LabelLeft+480, top: labelTop+250});
   ProblemEx1SolLab5.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab6=av.label("<span style='color:Green;'>*ZERO*</span> is the <span style='color:red;'>minimum number</span>  <span style='color:red;'>of employees can any department have</span>",{left:LabelLeft+40, top: labelTop+310});
   ProblemEx1SolLab6.css({"font-weight": "bold", "font-size": 20});
   ProblemEx1SolLab7=av.label("<span style='color:green;'>And",{left:LabelLeft+480, top: labelTop+370});
   ProblemEx1SolLab7.css({"font-weight": "bold", "font-size": 20});
   ProblemEx1SolLab8=av.label("<span style='color:green;'>*NO,*</span> <span style='color:red;'>Not all instances of depatment entity should participate in the (Has) relationship</span>",{left:LabelLeft+40, top: labelTop+430});
   ProblemEx1SolLab8.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 21
   ProblemEx1SolLab8.hide();
   ProblemEx1SolLab7.hide();
   ProblemEx1SolLab4.hide();
   ProblemEx1SolLab5.hide();
   ProblemEx1SolLab6.hide();
   ProbEx1Line4.hide();
   var ProblemEx1SolLab7=av.label("<span style='color:red;'>Then:</span> Patricipation Type of department enitity in relationship (Has) is <span style='color:green;'> [Optional]</span>",{left:LabelLeft+110, top: labelTop+240});
   ProblemEx1SolLab7.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab8=av.label("<span style='color:red;'>Denoted with:</span> <span style='color:green;'>Single line connecting department entity with relationship (Has) </span> as shown in the diagram here ",{left:LabelLeft+110, top: labelTop+265});
   ProblemEx1SolLab8.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab9=av.label("<span style='color:green;'>$[Optional]$</span> $=$ <span style='color:green;'>$Partial$ $participation$ $of$ $department$ $entity$ $instances$ $in$ $relationship$ $(Has)$ </span>",{left:LabelLeft+110, top: labelTop+350});
   ProblemEx1SolLab9.css({"font-weight": "bold", "font-size": 24});
   var ProblemEx1SolLab10Par=av.label("<span style='color:red;'>Because:</span> some departments may have zero employees so it will not participate in that relationship </span>",{left:LabelLeft+110, top: labelTop+420});
   ProblemEx1SolLab10Par.css({"font-weight": "bold", "font-size": 24});
   ProbEx1Line5.show();
   av.step();

   //slide 22
   ProblemEx1SolLab10Par.hide();
   ProblemEx1SolLab7.hide();
   ProblemEx1SolLab8.hide();
   ProblemEx1SolLab9.hide();
   ProbEx1Line5.hide();
   var ProblemEx1SolLab10=av.label("<span style='color:green;'>Third,</span> ask yourself <span style='color:red;'>Are all employees should at least work at one department?</span>",{left:LabelLeft+110, top: labelTop+250});
   ProblemEx1SolLab10.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab10Cont=av.label("<span style='color:green;'>OR",{left:LabelLeft+530, top: labelTop+290});
   ProblemEx1SolLab10Cont.css({"font-weight": "bold", "font-size": 26});
   var ProblemEx1SolLab10Cont2=av.label("ask yourself <span style='color:red;'>What is the </span><span style='color:green;'>minimum number</span> of departments can <span style='color:green;'>each employee</span> <span style='color:red;'>works at it?</span><span style='color:blue;'>(zero or more)</span>",{left:LabelLeft+110, top: labelTop+350});
   ProblemEx1SolLab10Cont2.css({"font-weight": "bold", "font-size": 20});
   MatrixEntity1Ex1._arrays[1].unhighlight();
   MatrixEntity2Ex1._arrays[1].highlight();
   ProbEx1Line6.show();
   av.step();

   //slide 23
   ProblemEx1SolLab10.hide();
   ProblemEx1SolLab10Cont.hide();
   ProblemEx1SolLab10Cont2.hide();
   var ProblemEx1SolLab11=av.label("<span style='color:green;'>IF the answer is</span> <span style='color:red;'>*YES* </span> each employee should at least works at one department (more than zero) <span style='color:blue;'>(i.e. no employee can stay without belonging to a department) </span>",{left:LabelLeft+110, top: labelTop+240});
   ProblemEx1SolLab11.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line6.hide();
   ProbEx1Line8.show();
   av.step();

   //slide 24
   ProbEx1Line8.hide();
   ProblemEx1SolLab11.hide();
   ProbEx1Line6.hide();
   var ProblemEx1SolLab14=av.label("<span style='color:red;'>Then:</span> Patricipation Type of employee enitity in relationship (Has) is <span style='color:green;'> [Mandatory]</span>",{left:LabelLeft+110, top: labelTop+240});
   ProblemEx1SolLab14.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab15=av.label("<span style='color:red;'>Denoted with:</span> <span style='color:green;'>Double lines connecting employee entity with relationship (Has) </span> as shown in the diagram here ",{left:LabelLeft+110 , top:labelTop+270});
   ProblemEx1SolLab15.css({"font-weight": "bold", "font-size": 22});
   var ProblemEx1SolLab9Par=av.label("<span style='color:green;'>$[Mandatory]$</span> $=$ <span style='color:green;'>$Total$ $participation$ $of$ $all$ $instances$ $of$ $employee$ $entity$ $in$ $(Has)$ $relationship$  </span>",{left:LabelLeft+110, top: labelTop+350});
   ProblemEx1SolLab9Par.css({"font-weight": "bold", "font-size": 24});
   var ProblemEx1SolLab11Par=av.label("<span style='color:red;'>Because:</span> each employee should at least works at one department so all employee's entity instances totaly participate in that relationship </span>",{left:LabelLeft+110, top: labelTop+420});
   ProblemEx1SolLab11Par.css({"font-weight": "bold", "font-size": 24});
   ProbEx1Line7.show();
   ProbEx1Line2Par.show();
   av.step();

   //slide 25
   ProblemEx1SolLab9Par.hide();
   ProblemEx1SolLab11Par.hide();
   ProblemEx1SolLab14.hide();
   ProbEx1Line7.hide();
   ProbEx1Line2Par.hide();
   var labExample2=av.label("<span style='color:red;'> Ex2:</span> Demonstrating Participation constraint of <span style='color:Red;'>[Marry] relationship</span>", {left:LabelLeft, top:labelTop });
   labExample2.css({"font-weight": "bold", "font-size": 22});
   labExample.hide();
   ProblemEx1SolLab15.hide();
   for(i=0;i<theEntity1matrixEx1.length;i++)
   MatrixEntity1Ex1._arrays[i].hide();
   for(i=0;i<theEntity2matrixEx1.length;i++)
   MatrixEntity2Ex1._arrays[i].hide();
   Entity1Ex1LabA.hide();
   Entity2Ex1LabA.hide();
   RelLabEx1.hide();
   var RelLabEx2=av.label("<span style='color:blue;'>Marry</span>", {left:pX2+245-40, top: pY2-75});
   RelLabEx2.css({"font-weight": "bold", "font-size": 20});
   var Entity1RectEx2=av.g.rect(LabelLeft+100, labelTop+40+30, 130, 50, {"stroke-width": 3});
   var Entity1LabEx2=av.label("<span style='color:blue;'>Male</span>", {left:LabelLeft+140, top: labelTop+60});
   Entity1LabEx2.css({"font-weight": "bold", "font-size": 20});
   var Entity2RecEx2=av.g.rect(LabelLeft+450+300, labelTop+40+30, 130, 50, {"stroke-width": 3});
   var Entity2LabEx2=av.label("<span style='color:blue;'>Female</span>", {left:LabelLeft+460+320, top: labelTop+60});
   Entity2LabEx2.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 26
   var ProblemEx1SolLab17=av.label("<span style='color:Red;'>As</span> ",{left:LabelLeft+110, top: labelTop+170});
   ProblemEx1SolLab17.css({"font-weight": "bold", "font-size": 26});
   var ProblemEx1SolLab18=av.label("Some males <span style='color:Red;'>may get married</span> and the other <span style='color:Red;'>not</span> so marriage for males is an <span style='color:green;'>optional relation</span>",{left:LabelLeft+110, top: labelTop+220});
   ProblemEx1SolLab18.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx1SolLab19=av.label("(i.e. the  <span style='color:Red;'>minimum number</span> of females the male can marry is <span style='color:Red;'>zero</span>",{left:LabelLeft+110, top: labelTop+270});
   ProblemEx1SolLab19.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line13.show();
   av.step();

   //slide 27
   ProblemEx1SolLab17.hide();
   ProblemEx1SolLab18.hide();
   ProblemEx1SolLab19.hide();
   var ProblemEx1SolLab19=av.label("<span style='color:green;'>Then</span>",{left:LabelLeft+110, top: labelTop+180});
   ProblemEx1SolLab19.css({"font-weight": "bold", "font-size": 24});
   var ProblemEx1SolLab20=av.label(" Male entity will have <span style='color:green;'>Partial [optional] participation</span> in marry relationship",{left:LabelLeft+110, top: labelTop+230});
   ProblemEx1SolLab20.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx2SolLab9=av.label("Denoted in the Chen model here with that:<span style='color:red;'>Single line</span>",{left:LabelLeft+110 , top: labelTop+270});
   ProblemEx2SolLab9.css({"font-weight": "bold", "font-size": 22});
   ProbEx1Line10.show();
   ProbEx1Line13.hide();
   av.step();

   //slide 28
   ProblemEx2SolLab9.hide();
   ProblemEx1SolLab19.hide();
   ProblemEx1SolLab20.hide();
   ProbEx1Line10.hide();
   var ProblemEx1SolLab21=av.label("<span style='color:green;'>The other side of females</span> is the same case, every female <span style='color:red;'>may or may not</span> get married from a male instance",{left:LabelLeft+110, top: labelTop+180});
   ProblemEx1SolLab21.css({"font-weight": "bold", "font-size": 22});
   var ProblemEx1SolLab21Par=av.label("The <span style='color:red;'> minimum number</span> of males any female can get married to equals <span style='color:red;'>ZERO</span>",{left:LabelLeft+110, top: labelTop+260});
   ProblemEx1SolLab21Par.css({"font-weight": "bold", "font-size": 22});
   ProbEx1Line14.show();
   av.step();

   //slide 29
   ProblemEx1SolLab21Par.hide();
   ProblemEx2SolLab9.show();
   ProbEx1Line14.hide();
   ProblemEx1SolLab21.hide();
   var ProblemEx1SolLab22=av.label(" So also female participation is <span style='color:green;'> Partial [Optional]</span>",{left:LabelLeft+110, top: labelTop+230});
   ProblemEx1SolLab22.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line9.show();
   av.step();

   //slide 30
   ProblemEx2SolLab9.hide();
   ProblemEx1SolLab22.hide();
   ProbEx1Line9.hide();
   RelLabEx2.hide();
   labExample2.hide();
   Entity1LabEx2.hide();
   Entity2LabEx2.hide();
   ProblemEx2SolLab9.hide();
   var labExample3=av.label("Ex3: Determining participation constraint in <span style='color:red;'> Earn </span> relationship", {left:LabelLeft, top:labelTop });
   labExample3.css({"font-weight": "bold", "font-size": 22});
   var RelLabEx3=av.label("<span style='color:blue;'>Earn</span>", {left:pX2+245-35, top: pY2-75});
   RelLabEx3.css({"font-weight": "bold", "font-size": 20});
   var Entity1LabEx3=av.label("<span style='color:blue;'>employee</span>", {left:LabelLeft+120, top: labelTop+60});
   Entity1LabEx3.css({"font-weight": "bold", "font-size": 20});
   var Entity2LabEx3=av.label("<span style='color:blue;'>payroll</span>", {left:LabelLeft+460+320, top: labelTop+60});
   Entity2LabEx3.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 31
   var ProblemEx1SolLab24=av.label("<span style='color:green;'>AS</span>",{left:LabelLeft+110, top: labelTop+180});
   ProblemEx1SolLab24.css({"font-weight": "bold", "font-size": 26});
   var ProblemEx1SolLab25=av.label("ALL employees <span style='color:Red;'>must get paid</span> their salaries (i.e. no employee can stay without participating in earn payroll relationship)",{left:LabelLeft+110, top: labelTop+230});
   ProblemEx1SolLab25.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line12.show();
   av.step();

   // slide 32
   ProblemEx1SolLab24.hide();
   ProblemEx1SolLab25.hide();
   var ProblemEx3SolLab1=av.label("<span style='color:green;'>So</span>",{left:LabelLeft+110, top: labelTop+180});
   ProblemEx3SolLab1.css({"font-weight": "bold", "font-size": 24});
   var ProblemEx3SolLab2=av.label(" Employee entity makes a <span style='color:Red;'> [Mandatory] Total</span> Participation relationship",{left:LabelLeft+110, top: labelTop+230});
   ProblemEx3SolLab2.css({"font-weight": "bold", "font-size": 20});
   var ProblemEx2SolLab9Par=av.label("Denoted in the Chen model here with that:<span style='color:red;'>Double lines</span>",{left:LabelLeft+110 , top: labelTop+270});
   ProblemEx2SolLab9Par.css({"font-weight": "bold", "font-size": 22});
   ProbEx1Line16.show();
   ProbEx1Line12.hide();
   ProbEx1Line1Par.show();
   av.step();

   //slide 33
   ProblemEx2SolLab9Par.hide();
   ProblemEx3SolLab1.hide();
   ProblemEx3SolLab2.hide();
   ProbEx1Line16.hide();
   var ProblemEx3SolLab4=av.label("<span style='color:green;'>Also</span> <span style='color:red;'>each payroll instance</span> in the payroll entity must be devoted for <span style='color:red;'>at least one</span> specific employee",{left:LabelLeft+110, top: labelTop+180});
   ProblemEx3SolLab4.css({"font-weight": "bold", "font-size": 24});
   var ProblemEx3SolLab4Par=av.label("<span style='color:green;'>(i.e.,)</span> No salary without an employee",{left:LabelLeft+110, top: labelTop+250});
   ProblemEx3SolLab4Par.css({"font-weight": "bold", "font-size": 24});
   ProbEx1Line15.show();
   av.step();

   //slide 34
   ProblemEx3SolLab4Par.hide();
   ProbEx1Line2Par.show();
   ProblemEx2SolLab9Par.show();
   ProblemEx3SolLab4.hide();
   ProbEx1Line15.hide();
   var ProblemEx3SolLab5=av.label("<span style='color:green;'>So</span>",{left:LabelLeft+110, top: labelTop+180});
   ProblemEx3SolLab5.css({"font-weight": "bold", "font-size": 24});
   var ProblemEx3SolLab6=av.label(" Paryoll entity has a <span style='color:Red;'>[Mandatory] total</span> participation in (Earn) relationship ",{left:LabelLeft+110, top: labelTop+230});
   ProblemEx3SolLab6.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line11.show();
   av.recorded();

  

  /*//slide 3
  av.umsg(interpret("Here is the chen's relation symbol").bold().big());
  var LabRSym=av.label(interpret("(opt) <span style='color:green;'> one-to-one</span> (man) "), {left: LabelLeft-30, top: pY-50 });
  LabRSym.css({"font-weight": "bold", "font-size": 20});
  var polygon = av.g.polyline([[pX+10, pY-30],
   [pX+10+60, pY],
   [pX+10, pY+30],
   [pX+10-60, pY],
   [pX+10, pY-30]],
  {"stroke-width": 3, stroke: "black"});
  var Relchenlab=av.label(interpret("<span style='color:blue;'> R </span>"), {left: pX+10-20, top:pY-35 });
  Relchenlab.css({"font-weight": "bold", "font-size": 20});
  otochenLft.movePoints([[0,pX+10-120,pY],[1,pX+10-60, pY]]);
  otochenRht.movePoints([[0,pX+7+60, pY-2],[1,pX+70+60,pY-2]]);
  otochenRht2.movePoints([[0,pX+7+60, pY+2],[1,pX+70+60,pY+2]]);
  otochenLft.show();
  otochenRht.show();
  otochenRht2.show();
  var otolabL=av.label(interpret("<span style='color:blue;'> 1 </span>"), {left: pX+110-20, top:pY-40 });
  var otolabR=av.label(interpret("<span style='color:blue;'> 1 </span>"), {left: pX+10-20-90, top:pY-40 });
  av.step();

  //slide 4
  var RelMinlab=av.label(interpret("<span style='color:blue;'> R </span>"), {left: pX+270-20, top:pY-50 });
  RelMinlab.css({"font-weight": "bold", "font-size": 20});
  otoMinLft.movePoints([[0,pX+45+120,pY],[1,pX+80+300, pY]]);
  var otolabL1=av.label(interpret("<span style='color:blue;'> (0,1) </span>"), {left: pX+47+120, top:pY-40 });
  var otolabR1=av.label(interpret("<span style='color:blue;'> (1,1) </span>"), {left: pX+30+300, top:pY-40 });
  otoMinLft.show();
  av.step();

  //slide 5
  var RelCrowslab=av.label(interpret("<span style='color:blue;'> R </span>"), {left: pX+345+200-20, top:pY-50 });
  RelCrowslab.css({"font-weight": "bold", "font-size": 20});
  otoCrowsLft.movePoints([[0,pX+75+360,pY],[1,pX+75+580, pY]]);
  CrowsoneLft.movePoints([[0,pX+90+360,pY-10],[1,pX+90+360, pY+10]]);
  CrowsoneRyt.movePoints([[0,pX+60+580,pY-10],[1,pX+60+580, pY+10]]);
  CrowsoneLft.show();
  CrowsoneRyt.show();
  CrowsoneLft1.movePoints([[0,pX+95+360,pY-10],[1,pX+95+360, pY+10]]);
  CrowsoneRyt1.movePoints([[0,pX+55+580,pY-10],[1,pX+55+580, pY+10]]);
  CrowsoneLft1.show();
  CrowsoneRyt1.show();
  otoCrowsLft.show();
  av.recorded();*/

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
