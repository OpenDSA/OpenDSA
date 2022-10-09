/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "min-maxNotation";
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
   var labConstraint=av.label("<span style='color:red;'>Min-Max Notation</span>", {left: midPage+30, top: labelTop });
   labConstraint.css({"font-weight": "bold", "font-size": 26});

   var lineCard = av.g.line(lineCardPartX1, lineCardY1, lineCardX2, lineCardY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   lineCard.hide();
   
   var labCardinality=av.label("<span style='color:blue;'> Note1: </span>", {left:lineCardX2-400, top: lineCardY2-25 });
   labCardinality.css({"font-weight": "bold", "font-size": 24});
   labCardinality.hide();

   var linePart = av.g.line(lineCardPartX1, lineCardY1, linePartX2, lineCardY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   linePart.hide();

   colNo=2;
   var labParticipation=av.label("<span style='color:green;'>Participation </span> determines minimum occurrences of relationship between entities ", {left:lineCardX2-325, top: lineCardY2-20});
   labParticipation.css({"font-weight": "bold", "font-size": 22});
   labParticipation.hide();

   var labCardinality2=av.label("<span style='color:blue;'> Note2: </span>", {left:lineCardX2-400, top: lineCardY2-25+50 });
   labCardinality2.css({"font-weight": "bold", "font-size": 24});
   labCardinality2.hide();

   var labParticipation2=av.label("<span style='color:green;'>Cardinality </span> determines maximum occurrences of relationship between entities", {left: lineCardX2-325, top: lineCardY2-20+50});
   labParticipation2.css({"font-weight": "bold", "font-size": 22});
   labParticipation2.hide();

   var labCardinality3=av.label("<span style='color:blue;'> Note3: </span>", {left:lineCardX2-400, top: lineCardY2-25+50+50 });
   labCardinality3.css({"font-weight": "bold", "font-size": 24});
   labCardinality3.hide();

   var labParticipation3=av.label("<span style='color:green;'>Participation sign (single/double Line)  position </span> is placed beside <span style='color:green;'> the entity that we are determining its participation</span>", {left: lineCardX2-325, top: lineCardY2-20+50+50});
   labParticipation3.css({"font-weight": "bold", "font-size": 22});
   labParticipation3.hide();

   var labCardinality4=av.label("<span style='color:blue;'> Note4: </span>", {left:lineCardX2-400, top: lineCardY2-25+50+50+80 });
   labCardinality4.css({"font-weight": "bold", "font-size": 24});
   labCardinality4.hide();

   var labParticipation4=av.label("<span style='color:green;'>Cardinality sign (1/M) position </span> is placed beside <span style='color:green;'> the related entity to that we are determining its cardinality</span>", {left: lineCardX2-325, top: lineCardY2-20+50+50+80});
   labParticipation4.css({"font-weight": "bold", "font-size": 22});
   labParticipation4.hide();

   //var labParticipation4=av.label("<span style='color:green;'>So</span> cardinality and participation can be expreseed using another notation called <span style='color:purple;'>(min-max) notation</span> will be discussed here later", {left: lineCardX2-325, top: lineCardY2-20+50+50+70});
  // labParticipation4.css({"font-weight": "bold", "font-size": 22});
  // labParticipation4.hide();

   var ExampleLab=av.label("<span style='color:red;'>Example Demonstrating previous notes:</span>", {left: lineCardX2-400, top: labelTop-5 });
   ExampleLab.css({"font-weight": "bold", "font-size": 26});
   ExampleLab.hide();

   var ExampleProbLab=av.label("Assume having a faculty database that consists of two entities one representing faculty doctors and the other representing courses they teach. In which each doctor can teach any number of courses but he may not teach any course, while each course must be teached by only one doctor at most and no course can exist without a doctor to teach it.", {left: lineCardX2-400, top: labelTop +50});
   ExampleProbLab.css({"font-weight": "bold", "font-size": 22});
   ExampleProbLab.hide();

   var ExampleProbLabCont=av.label("<span style='color:blue;'>Draw the logical ER-Diagram</span> using the <span style='color:purple;'>chen notation</span> don't forget showing the cardinality and participation constraints. Then substitute these constraints with the corresponding <span style='color:purple;'>(min,max) notation)</span>", {left: lineCardX2-400, top: labelTop +50+165});
   ExampleProbLabCont.css({"font-weight": "bold", "font-size": 22});
   ExampleProbLabCont.hide();

   var DocCarLine= av.g.line(LabelLeft+300,labelTop+250, lineCardX2-100,labelTop +160, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   DocCarLine.hide();

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

   var ProbEx1Line2Par = av.g.line(pX2+230+50, pY2-35,LabelLeft+450+300, pY2-35, {opacity: 100, "stroke-width": 2});
   ProbEx1Line2Par.hide();


   var ProbEx1Line3 = av.g.line(LabelLeft+500,labelTop+170,LabelLeft+180,  labelTop+110, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line3.hide();

   var ProbEx1Line4 = av.g.line(LabelLeft+400,labelTop+270,LabelLeft+215,  labelTop+120, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line4.hide();

   var ProbEx1Line5 = av.g.line(LabelLeft+480,labelTop+265,LabelLeft+720 ,labelTop+100, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line5.hide();

   var ProbEx1Line6 = av.g.line(LabelLeft+480,labelTop+265,LabelLeft+800 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line6.hide();

   //var ProbEx1Line7 = av.g.line(LabelLeft+460,labelTop+260,pX-335,pY-275, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   //ProbEx1Line7.hide();

   //var ProbEx1Line8 = av.g.line(LabelLeft+310,labelTop+290,LabelLeft+800 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   //ProbEx1Line8.hide();

   var ProbEx1Line9 = av.g.line(LabelLeft+180,labelTop+255,LabelLeft+710 ,labelTop+100, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line9.hide();
   
   var ProbEx1Line10 = av.g.line(LabelLeft+460,labelTop+260,pX-335,pY-275, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line10.hide();

   var ProbEx1Line11 = av.g.line(LabelLeft+180,labelTop+255,LabelLeft+720 ,labelTop+110, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line11.hide();

   var ProbEx1Line12 = av.g.line(LabelLeft+180,labelTop+260,LabelLeft+160, labelTop+120, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line12.hide();

   var ProbEx1Line13 = av.g.line(LabelLeft+180,labelTop+260,LabelLeft+160, labelTop+120, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line13.hide();

   var ProbEx1Line14 = av.g.line(LabelLeft+350,labelTop+210,LabelLeft+750 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line14.hide();

   var ProbEx1Line15 = av.g.line(LabelLeft+280,labelTop+210,LabelLeft+750 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line15.hide();

   var ProbEx1Line16 = av.g.line(LabelLeft+460,labelTop+260,pX-335,pY-275, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line16.hide();

  

   // Slide 1
   av.umsg("");
   av.displayInit(1);
   //av.step();

   // Slide 2
   av.umsg("");
   //lineCard.show();
   labCardinality.show();
   labParticipation.show();
   av.step();

   //slide 3
   //linePart.show();
   labCardinality2.show();
   labParticipation2.show();
   av.step();

   //slide 4
   labCardinality3.show();
   labParticipation3.show();
   av.step();

   //slide 5
   labCardinality4.show();
   labParticipation4.show();
   av.step();

   //slide 6
   //av.umsg("Here is the doctor/course entities connected via Teach relatioship using Chen notation <br> Try to apply relationship constraints(Cardinality/Participation)".bold().big());
   //ExampleProbLab.hide();
   //ExampleProbLabCont.hide();
   labConstraint.hide()
   labCardinality.hide();
   labCardinality2.hide();
   labCardinality3.hide();
   labCardinality4.hide();
   labParticipation.hide();
   labParticipation2.hide();
   labParticipation3.hide();
   labParticipation4.hide();
   //labConstraint.hide();
   ExampleLab.show();
   var Entity1RectEx1=av.g.rect(LabelLeft+100, labelTop+40+30, 130, 50, {"stroke-width": 3});
   var Entity1LabEx1=av.label("<span style='color:blue;'>Docotor</span>", {left:LabelLeft+125, top: labelTop+60});
   Entity1LabEx1.css({"font-weight": "bold", "font-size": 20});
   var Entity2RecEx1=av.g.rect(LabelLeft+450+300, labelTop+40+30, 130, 50, {"stroke-width": 3});
   var Entity2LabEx1=av.label("<span style='color:blue;'>Course</span>", {left:LabelLeft+460+320, top: labelTop+60});
   Entity2LabEx1.css({"font-weight": "bold", "font-size": 20});
   var polygonEx1 = av.g.polyline([[pX2+230, pY2-70],
    [pX2+230+60, pY2-40],
    [pX2+230, pY2-10],
    [pX2+230-60, pY2-40],
    [pX2+230, pY2-70]],
   {"stroke-width": 3, stroke: "black"});
   var RelLabEx1=av.label("<span style='color:blue;'>Teach</span>", {left:pX2+245-45, top: pY2-75});
   RelLabEx1.css({"font-weight": "bold", "font-size": 20});
   var ExampleMsign=av.label("<span style='color:red;'>M</span>", {left: LabelLeft+450+260, top:pY2-85 });
   ExampleMsign.css({"font-weight": "bold", "font-size": 20});
   var Example1sign=av.label("<span style='color:red;'>1</span>", {left: LabelLeft+260, top:pY2-85 });
   Example1sign.css({"font-weight": "bold", "font-size": 20});
   ProbEx1Line1.show();
   ProbEx1Line2.show();
   ProbEx1Line2Par.show();
   var theEntity2matrixEx1 =[[" ", "Participation","Cardinality"],["Doctor", "",""],["Course", " ",""]];
   var MatrixEntity2Ex1= av.ds.matrix(theEntity2matrixEx1, {style: "table", top: labelTop+160, left: LabelLeft+700 });
   av.step();

   //slide 7
   DocCarLine.hide();
   DocCarLine.movePoints([[0,LabelLeft+370,labelTop+280],[1,LabelLeft+450+270, pY2-40]]);
   DocCarLine.show();
   var ExampleLabSol=av.label("<span style='color:blue;'>To find <span style='color:blue;'>Doctor entity</span> Cardiality:</span>", {left: lineCardX2-400, top: labelTop+200 });
   ExampleLabSol.css({"font-weight": "bold", "font-size": 22});
   var ExampleLabSolCont=av.label("USE <span style='color:red;'>(Note 4):</span> Which says that <span style='color:green;'>(Doctor entity cardinliaty)</span> is beside its related entity (Course) then Doctor Cardinlity is <span style='color:red;'>(M)</span>", {left: lineCardX2-400, top: labelTop+260 });
   ExampleLabSolCont.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 8
   MatrixEntity2Ex1._arrays[1].highlight(2);
   MatrixEntity2Ex1._arrays[1].value(2,"M");
   av.step();

   //slide 9
   ExampleLabSol.hide();
   ExampleLabSolCont.hide();
   DocCarLine.hide();
   DocCarLine.movePoints([[0,LabelLeft+370,labelTop+280],[1,LabelLeft+270, pY2-40]]);
   DocCarLine.show();
   var ExampleLabSol=av.label("<span style='color:blue;'>To find <span style='color:blue;'>Course entity</span> Cardiality:</span>", {left: lineCardX2-400, top: labelTop+200 });
   ExampleLabSol.css({"font-weight": "bold", "font-size": 22});
   var ExampleLabSolCont=av.label("USE <span style='color:red;'>(Note 4):</span> Which says that <span style='color:green;'>(Course entity cardinliaty)</span> is beside its related entity (Doctor) then Course Cardinlity is <span style='color:red;'>(1)</span>", {left: lineCardX2-400, top: labelTop+260 });
   ExampleLabSolCont.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 10
   MatrixEntity2Ex1._arrays[1].unhighlight(2);
   MatrixEntity2Ex1._arrays[2].highlight(2);
   MatrixEntity2Ex1._arrays[2].value(2,"1");
   av.step();

//slide 11
ExampleLabSol.hide();
   ExampleLabSolCont.hide();
DocCarLine.hide();
DocCarLine.movePoints([[0,LabelLeft+400,labelTop+280],[1,LabelLeft+300, pY2-40]]);
DocCarLine.show();
var ExampleLabSol=av.label("<span style='color:blue;'>To find <span style='color:blue;'>Doctor entity</span> Participation:</span>", {left: lineCardX2-400, top: labelTop+200 });
ExampleLabSol.css({"font-weight": "bold", "font-size": 22});
var ExampleLabSolCont=av.label("USE <span style='color:red;'>(Note 3):</span> Which says that <span style='color:green;'>(Doctor entity Participation)</span> is beside doctor entity itself then Doctor Participation is <span style='color:red;'>single line = optional = partial participation = a doctor may not participate in relation, then minimum doctor participation in relation = 0</span>", {left: lineCardX2-400, top: labelTop+260 });
ExampleLabSolCont.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 12
MatrixEntity2Ex1._arrays[2].unhighlight(2);
MatrixEntity2Ex1._arrays[1].highlight(1);
MatrixEntity2Ex1._arrays[1].value(1,"0");
av.step();

//slide 13
MatrixEntity2Ex1._arrays[1].unhighlight(1);
ExampleLabSol.hide();
ExampleLabSolCont.hide();
DocCarLine.hide();
DocCarLine.movePoints([[0,LabelLeft+370,labelTop+280],[1,LabelLeft+450+270, pY2-40]]);
DocCarLine.show();
var ExampleLabSol=av.label("<span style='color:blue;'>To find <span style='color:blue;'>Course entity</span> Participation:</span>", {left: lineCardX2-400, top: labelTop+200 });
ExampleLabSol.css({"font-weight": "bold", "font-size": 22});
var ExampleLabSolCont=av.label("USE <span style='color:red;'>(Note 3):</span> Which says that <span style='color:green;'>(Course entity Participation)</span> is beside Course entity itself then Course Participation is <span style='color:red;'>double line = mandatory = total participation = each course should participate in relation at least once, then minimum doctor participation in relation = 1</span>", {left: lineCardX2-400, top: labelTop+260 });
ExampleLabSolCont.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 14
MatrixEntity2Ex1._arrays[2].unhighlight(2);
MatrixEntity2Ex1._arrays[2].highlight(1);
MatrixEntity2Ex1._arrays[2].value(1,"1");
av.step();

//slide 15
ExampleLabSolCont.hide();
var ExampleLabMinMax=av.label("<span style='color:red;'>To express the same <span style='color:blue;'>participation & cardinality</span> values</span> <span style='color:blue;'>using Min-Max notation</span>", {left: lineCardX2-400, top: labelTop+250 });
ExampleLabMinMax.css({"font-weight": "bold", "font-size": 22});
DocCarLine.hide();
ExampleLabSol.hide();
MatrixEntity2Ex1._arrays[2].unhighlight(1);
av.step();

//slide 16
var ExampleLabSolCont=av.label("First <span style='color:red;'>by using (Note 1):</span>  <span style='color:green;'>Participation denotes the minimum occurrences of relation</span> ", {left: lineCardX2-400, top: labelTop+300 });
ExampleLabSolCont.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 17
var ExampleLabSolContmin=av.label(" <span style='color:red;'>Then:</span>  <span style='color:green;'>Participation in matrix will be substituted by min</span> ", {left: lineCardX2-400, top: labelTop+350 });
ExampleLabSolContmin.css({"font-weight": "bold", "font-size": 20});
MatrixEntity2Ex1._arrays[0].highlight(1);
MatrixEntity2Ex1._arrays[0].value(1,"min");
av.step();

//slide 18
ExampleLabSolContmin.hide();
ExampleLabMinMax.hide();
ExampleLabSolCont.hide();
MatrixEntity2Ex1._arrays[0].unhighlight(1);
var ExampleLabSolCont=av.label("Second <span style='color:red;'>by using (Note 2):</span>  <span style='color:green;'>Cardinality denotes the maximum occurrences of relation</span> ", {left: lineCardX2-400, top: labelTop+300 });
ExampleLabSolCont.css({"font-weight": "bold", "font-size": 20});
av.step();


//slide 19
var ExampleLabSolContmax=av.label(" <span style='color:red;'>Then:</span>  <span style='color:green;'>cardinality in matrix will be substituted by max</span> ", {left: lineCardX2-400, top: labelTop+350 });
ExampleLabSolContmax.css({"font-weight": "bold", "font-size": 20});
MatrixEntity2Ex1._arrays[0].highlight(2);
MatrixEntity2Ex1._arrays[0].value(2,"max");
av.step();

//slide 20
ExampleLabSolCont.hide();
ExampleLabSolContmax.hide();
var ExampleDocminmax=av.label("<span style='color:red;'>From the matrix: </span>", {left: lineCardX2-400, top: labelTop+300 });
ExampleDocminmax.css({"font-weight": "bold", "font-size": 20});
MatrixEntity2Ex1._arrays[0].unhighlight(2);
av.step();

//slide 21
var ExampleLabSolDocminmax=av.label(" <span style='color:red;'>Doctor (min,max) Notation</span> = <span style='color:blue;'>(0,M)</span> ", {left: lineCardX2-400, top: labelTop+350 });
ExampleLabSolDocminmax.css({"font-weight": "bold", "font-size": 20});
MatrixEntity2Ex1._arrays[1].highlight();
av.step();

//slide 22
MatrixEntity2Ex1._arrays[1].unhighlight();
var ExampleLabSolCorminmax=av.label(" <span style='color:red;'>Course (min,max) Notation</span> = <span style='color:blue;'>(1,1)</span> ", {left: lineCardX2-400, top: labelTop+400 });
ExampleLabSolCorminmax.css({"font-weight": "bold", "font-size": 20});
MatrixEntity2Ex1._arrays[2].highlight();
av.step();

//slide 23
for(i=0;i<theEntity2matrixEx1.length;i++)
MatrixEntity2Ex1._arrays[i].hide();
ExampleDocminmax.hide();
ExampleLabSolDocminmax.hide();
ExampleLabSolCorminmax.hide();
MatrixEntity2Ex1._arrays[2].unhighlight();
var ExampleDocminmax=av.label("<span style='color:red;'>To put (min,max) notation on the ER-diagram: </span>", {left: lineCardX2-400, top: labelTop+200 });
ExampleDocminmax.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 24
var ExampleLabFirst=av.label("<span style='color:red;'>First:</span> remove all participation & cardinality signs from the diagram as shown", {left: lineCardX2-400, top: labelTop+250 });
ExampleLabFirst.css({"font-weight": "bold", "font-size": 20});
ProbEx1Line2Par.hide();
ExampleMsign.hide();
Example1sign.hide();
av.step();

//slide 25
var ExampleLabSecond=av.label("<span style='color:red;'>Second:</span> put the (min,max) notation of each entity beside itself as shown in the diagram above", {left: lineCardX2-400, top: labelTop+300 });
ExampleLabSecond.css({"font-weight": "bold", "font-size": 20});
   var Exampledocminmaxsign=av.label("<span style='color:red;'>(0,M)</span>", {left: LabelLeft+250, top:pY2-85 });
   Exampledocminmaxsign.css({"font-weight": "bold", "font-size": 20});
   var Examplecorminmaxsign=av.label("<span style='color:red;'>(1,1)</span>", {left: LabelLeft+450+250, top:pY2-85 });
Examplecorminmaxsign.css({"font-weight": "bold", "font-size": 20});
av.recorded();
});
