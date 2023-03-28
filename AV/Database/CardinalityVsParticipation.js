/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "CardinalityVsParticipation";
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
   var labConstraint=av.label("<span style='color:red;'>Cardinality Vs. Participation</span>", {left: midPage, top: labelTop });
   labConstraint.css({"font-weight": "bold", "font-size": 26});

   var lineCard = av.g.line(lineCardPartX1, lineCardY1, lineCardX2, lineCardY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   lineCard.hide();
   
   var labCardinality=av.label("<span style='color:blue;'> Hint1: </span>", {left:lineCardX2-400, top: lineCardY2-25 });
   labCardinality.css({"font-weight": "bold", "font-size": 24});
   labCardinality.hide();

   var linePart = av.g.line(lineCardPartX1, lineCardY1, linePartX2, lineCardY2, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   linePart.hide();

   colNo=2;
   var labParticipation=av.label("There is <span style='color:green;'>no contradiction</span> between Cardinality and Participation constraints", {left:lineCardX2-325, top: lineCardY2-20});
   labParticipation.css({"font-weight": "bold", "font-size": 22});
   labParticipation.hide();

   var labCardinality2=av.label("<span style='color:blue;'> Hint2: </span>", {left:lineCardX2-400, top: lineCardY2-25+50 });
   labCardinality2.css({"font-weight": "bold", "font-size": 24});
   labCardinality2.hide();

   var labParticipation2=av.label("Both constraints can be <span style='color:green;'>applied together</span> on the same ER-Diagram <span style='color:green;'>simultaneously</span>", {left: lineCardX2-325, top: lineCardY2-20+50});
   labParticipation2.css({"font-weight": "bold", "font-size": 22});
   labParticipation2.hide();

   var labCardinality3=av.label("<span style='color:blue;'> Hint3: </span>", {left:lineCardX2-400, top: lineCardY2-25+50+50 });
   labCardinality3.css({"font-weight": "bold", "font-size": 24});
   labCardinality3.hide();

   var labParticipation3=av.label("<span style='color:green;'>Cardinality</span> is searching for <span style='color:green;'>maximum occurrences</span> of relation while <span style='color:green;'>Participation</span> is searching for the <span style='color:green;'>minimum occurrences</span> of relation", {left: lineCardX2-325, top: lineCardY2-20+50+50});
   labParticipation3.css({"font-weight": "bold", "font-size": 22});
   labParticipation3.hide();

   var labParticipation4=av.label("<span style='color:green;'>So</span> cardinality and participation can be expreseed using another notation called <span style='color:purple;'>(min-max) notation</span> will be discussed here later", {left: lineCardX2-325, top: lineCardY2-20+50+50+70});
   labParticipation4.css({"font-weight": "bold", "font-size": 22});
   labParticipation4.hide();

   var ExampleLab=av.label("<span style='color:red;'>Example:</span>", {left: lineCardX2-400, top: labelTop-5 });
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

   var ProbEx1Line7 = av.g.line(LabelLeft+460,labelTop+260,pX-335,pY-275, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line7.hide();

   var ProbEx1Line8 = av.g.line(LabelLeft+310,labelTop+290,LabelLeft+800 ,labelTop+130, {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
   ProbEx1Line8.hide();

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
   labParticipation4.show();
   av.step();

   //slide 6
   labCardinality.hide();
   labCardinality2.hide();
   labCardinality3.hide();
   labParticipation.hide();
   labParticipation2.hide();
   labParticipation3.hide();
   labParticipation4.hide();
   labConstraint.hide();
   ExampleLab.show();
   ExampleProbLab.show();
   ExampleProbLabCont.show();
   av.step();

   //slide 7
   av.umsg("Here is the doctor/course entities connected via Teach relatioship using Chen notation <br> Try to apply relationship constraints(Cardinality/Participation)".bold().big());
   ExampleProbLab.hide();
   ExampleProbLabCont.hide();
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
   ProbEx1Line1.show();
   ProbEx1Line2.show();
   av.step();

   //slide 8
   var ExampleLabSol=av.label("<span style='color:red;'>To apply cardinality/participation constraint to <span style='color:blue;'>Doctor entity</span> first:</span>", {left: lineCardX2-400, top: labelTop+110 });
   ExampleLabSol.css({"font-weight": "bold", "font-size": 24});
   var ExampleLabSolCont=av.label("<span style='color:red;'>Let's check the <span style='color:blue;'>underlined statment</span> in the problem specification</span>", {left: lineCardX2-400, top: labelTop+150 });
   ExampleLabSolCont.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 9
   var ExampleProbLabStat=av.label("Assume having a faculty database that consists of two entities one representing faculty doctors and the other representing courses they teach. In which <u>each doctor can teach any number of courses but he may not teach any course,</u> while each course must be teached by only one doctor at most and no course can exist without a doctor to teach it.", {left: lineCardX2-400, top: labelTop +200});
   ExampleProbLabStat.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 10
   ExampleLabSol.hide();
   ExampleLabSolCont.hide();
   ExampleProbLabStat.hide();
   var ExampleLabSolAns=av.label("<span style='color:red;'>This means that: </span>", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabSolAns.css({"font-weight": "bold", "font-size": 22});
   var ExampleProbLabStatP1=av.label("<u>each doctor can teach <span style='color:blue;'>(any number)</span> of courses</u> but he may not teach any course", {left: lineCardX2-400, top: labelTop +110});
   ExampleProbLabStatP1.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 11
   DocCarLine.show();
   var ExampleLabSolAnsMode=av.label("<span style='color:red;'>This means that:</span> each doctor instance in the doctor entity can teach many courses at the same time <span style='color:blue;'>=</span> (M) courses <span style='color:blue;'>=</span> max. of relation <span style='color:blue;'>=</span> <span style='color:red;'>Doctors cardinality</span>", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabSolAnsMode.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 12
   DocCarLine.hide();
   DocCarLine.movePoints([[0,LabelLeft+300,labelTop+280],[1,LabelLeft+450+270, pY2-40]]);
   DocCarLine.show();
   var ExampleMsign=av.label("<span style='color:red;'>M</span>", {left: LabelLeft+450+260, top:pY2-85 });
   ExampleMsign.css({"font-weight": "bold", "font-size": 20});
   ExampleLabSolAns.hide();
   ExampleLabSolAnsMode.hide();
   ExampleProbLabStatP1.hide();
   var ExampleLabSolAnsRep=av.label("<span style='color:red;'>To represent Doctor entity cadinality:</span> put (M) sign beside courses entity", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabSolAnsRep.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 13
   ExampleLabSolAnsRep.hide();
   var ExampleProbLabStatP2=av.label("each doctor can teach <span style='color:blue;'>(any number)</span> of courses but <u>he may not teach any course</u>", {left: lineCardX2-400, top: labelTop +110});
   ExampleProbLabStatP2.css({"font-weight": "bold", "font-size": 20});
   DocCarLine.hide();
   DocCarLine.movePoints([[0,LabelLeft+250,labelTop+270],[1,lineCardX2+200,labelTop +160]]);
   DocCarLine.show();
   var ExampleLabDocPar=av.label("<span style='color:red;'>By looking at the rest of the problem statement: </span>", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabDocPar.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 14
   ExampleLabDocPar.hide();
   var ExampleLabDocParCont=av.label("<span style='color:red;'>By looking at the rest of the problem statement:</span> It means that doctor's entity may has some doctors who don't teach any courses", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabDocParCont.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 15
   var ExampleLabDocParnext=av.label("<span style='color:red;'>(i.e.,):</span> doctor can teach no courses <span style='color:blue;'>=</span> zero courses <span style='color:blue;'>=</span> some doctors may not join teach relationship <span style='color:blue;'>=</span> [optional relation] <span style='color:blue;'>=</span> partial participation <span style='color:blue;'>=</span>  min. of relation <span style='color:blue;'>=</span> <span style='color:red;'>Doctors Participation</span>", {left: lineCardX2-400, top: labelTop+330 });
   ExampleLabDocParnext.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 16
   DocCarLine.hide();
   DocCarLine.movePoints([[0,LabelLeft+300,labelTop+280],[1,LabelLeft+270, pY2-40]]);
   DocCarLine.show();
   ExampleProbLabStatP2.hide();
   ExampleLabDocParCont.hide();
   ExampleLabDocParnext.hide();
   var ExampleLabSolAnsCar=av.label("<span style='color:red;'>To represent doctor entity optional Participation:</span> use <span style='color:green;'>single line</span> connecting Doctor entity with Teach relationship", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabSolAnsCar.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 17
   DocCarLine.hide();
   ExampleLabSolAnsCar.hide();
   var Note1Lab=av.label("<span style='color:red;'>Important NOTE:</span> ", {left: lineCardX2-400, top: labelTop+180 });
   Note1Lab.css({"font-weight": "bold", "font-size": 24});
   var Note1ContentA=av.label("<span style='color:red;'>Doctor entity's Cardinality sign:</span>  <span style='color:green;'>M</span> is placed <span style='color:blue;'>beside course entity (i.e., beside the related entity)</span>", {left: lineCardX2-400, top: labelTop+250 });
   Note1ContentA.css({"font-weight": "bold", "font-size": 22});
   var Note1ContentB=av.label("<span style='color:red;'>Doctor entity's Participation sign:</span>  <span style='color:green;'>single line</span> is placed <span style='color:blue;'>beside doctor entity (i.e., beside itself)</span>", {left: lineCardX2-400, top: labelTop+320 });
   Note1ContentB.css({"font-weight": "bold", "font-size": 22});
   var Note1ContentC=av.label("(<span style='color:green;'>Cardinality & Participation</span> of the <span style='color:green;'>same entity</span> are placed in <span style='color:red;'>opposite sides</span>)", {left: lineCardX2-300, top: labelTop+390 });
   Note1ContentC.css({"font-weight": "bold", "font-size": 22});
   av.step();

    //slide 18
    Note1Lab.hide();
    Note1ContentA.hide();
    Note1ContentB.hide();
    Note1ContentC.hide();
    var ExampleLabSolP2=av.label("<span style='color:red;'>Now applying cardinality/participation constraint to <span style='color:blue;'>Course entity</span>:", {left: lineCardX2-400, top: labelTop+110 });
    ExampleLabSolP2.css({"font-weight": "bold", "font-size": 24});
    var ExampleLabSolContP2=av.label("<span style='color:red;'>Let's check the <span style='color:blue;'>underlined statment</span> in the rest of the problem specification</span>", {left: lineCardX2-400, top: labelTop+150 });
    ExampleLabSolContP2.css({"font-weight": "bold", "font-size": 22});
    av.step();

    //slide 19
    var ExampleProbLabStatCont=av.label("Assume having a faculty database that consists of two entities one representing faculty doctors and the other representing courses they teach. In which each doctor can teach any number of courses but he may not teach any course, while <u>each course must be teached by only one doctor at most and no course can exist without a doctor to teach it</u>.", {left: lineCardX2-400, top: labelTop +200});
    ExampleProbLabStatCont.css({"font-weight": "bold", "font-size": 20});
    av.step();

    //slide 20
   ExampleLabSolP2.hide();
   ExampleLabSolContP2.hide();
   ExampleProbLabStat.hide();
   ExampleProbLabStatCont.hide();
   var ExampleLabSolcorP2=av.label("<span style='color:red;'>This means that: </span>", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabSolcorP2.css({"font-weight": "bold", "font-size": 22});
   var ExampleProbLabStatP2=av.label("<u>each course must be teached by only <span style='color:blue;'>(one doctor at most)</span></u> and no course can exist without a doctor to teach it", {left: lineCardX2-400, top: labelTop +110});
   ExampleProbLabStatP2.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 21
   DocCarLine.movePoints([[0,LabelLeft+400,labelTop+280],[1,LabelLeft+450, pY2+20]]);
   DocCarLine.show();
   var ExampleLabSolAnsMode=av.label("<span style='color:red;'>This means that:</span> each specific course instance in the course entity can only has one doctor to teach it (Doctors can not teach the same course), (i.e., each course can has one doctor at maximum) <span style='color:blue;'>=</span> (1) Doctor <span style='color:blue;'>=</span> max. of relation <span style='color:blue;'>=</span> <span style='color:red;'>Course cardinality</span>", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabSolAnsMode.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 22
   DocCarLine.hide();
   DocCarLine.movePoints([[0,LabelLeft+300,labelTop+280],[1,LabelLeft+270, pY2-40]]);
   DocCarLine.show();
   var Example1sign=av.label("<span style='color:red;'>1</span>", {left: LabelLeft+260, top:pY2-85 });
   Example1sign.css({"font-weight": "bold", "font-size": 20});
   ExampleLabSolcorP2.hide();
   ExampleLabSolAnsMode.hide();
   ExampleProbLabStatP2.hide();
   var ExampleLabSolAnsRepCor=av.label("<span style='color:red;'>To represent Course entity cadinality:</span> put (1) sign beside Doctor entity", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabSolAnsRepCor.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 23
   ExampleLabSolAnsRepCor.hide();
   var ExampleProbLabStatP2cor=av.label("each course must be teached by only one doctor at most and <u> no course can exist without a doctor to teach it </u>", {left: lineCardX2-400, top: labelTop +110});
   ExampleProbLabStatP2cor.css({"font-weight": "bold", "font-size": 20});
   DocCarLine.hide();
   DocCarLine.movePoints([[0,LabelLeft+250,labelTop+270],[1,lineCardX2+220,labelTop +160]]);
   DocCarLine.show();
   var ExampleLabDocPar=av.label("<span style='color:red;'>By looking at the rest of the problem statement: </span>", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabDocPar.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 24
   ExampleLabDocPar.hide();
   var ExampleLabCorParCont=av.label("<span style='color:red;'>By looking at the rest of the problem statement:</span> It means that each courses should has at least one doctor to teach it", {left: lineCardX2-400, top: labelTop+250 });
   ExampleLabCorParCont.css({"font-weight": "bold", "font-size": 22});
   av.step();

   //slide 25
   var ExampleLabCorParnext=av.label("<span style='color:red;'>(i.e.,):</span> no courses can be without doctor <span style='color:blue;'>=</span>  at least one doctor needed for each course <span style='color:blue;'>=</span> minimum of relation <span style='color:blue;'>=</span> [mandatory relation] <span style='color:blue;'>=</span> Total participation <span style='color:blue;'>=</span> <span style='color:red;'>Course Participation</span>", {left: lineCardX2-400, top: labelTop+330 });
   ExampleLabCorParnext.css({"font-weight": "bold", "font-size": 22});
   av.step();

    //slide 26
    ProbEx1Line2Par.show();
    DocCarLine.hide();
    DocCarLine.movePoints([[0,LabelLeft+600,labelTop+280],[1,LabelLeft+570, pY2-30]]);
    DocCarLine.show();
    ExampleLabCorParnext.hide();
    ExampleProbLabStatP2cor.hide();
    ExampleLabCorParCont.hide();
    ExampleLabCorParnext.hide();
    var ExampleLabSolCorCar=av.label("<span style='color:red;'>To represent course entity mandatory Participation:</span> use <span style='color:green;'>double line</span> connecting course entity with Teach relationship", {left: lineCardX2-400, top: labelTop+250 });
    ExampleLabSolCorCar.css({"font-weight": "bold", "font-size": 22});
    av.step();

    //slide 27
   DocCarLine.hide();
   ExampleLabCorParnext.hide();
   ExampleLabSolCorCar.hide();
   var Note1Lab=av.label("<span style='color:red;'>Important NOTE:</span> ", {left: lineCardX2-400, top: labelTop+180 });
   Note1Lab.css({"font-weight": "bold", "font-size": 24});
   var Note1ContentA=av.label("<span style='color:red;'>Course entity's Cardinality sign:</span>  <span style='color:green;'>1</span> is placed <span style='color:blue;'>beside Doctor entity (i.e., beside the related entity)</span>", {left: lineCardX2-400, top: labelTop+250 });
   Note1ContentA.css({"font-weight": "bold", "font-size": 22});
   var Note1ContentB=av.label("<span style='color:red;'>Course entity's Participation sign:</span>  <span style='color:green;'>double line</span> is placed <span style='color:blue;'>beside course entity (i.e., beside itself)</span>", {left: lineCardX2-400, top: labelTop+320 });
   Note1ContentB.css({"font-weight": "bold", "font-size": 22});
   var Note1ContentC=av.label("(<span style='color:green;'>Cardinality & Participation</span> of the <span style='color:green;'>same entity</span> are placed in <span style='color:red;'>opposite sides</span>)", {left: lineCardX2-300, top: labelTop+390 });
   Note1ContentC.css({"font-weight": "bold", "font-size": 22});
   av.recorded();
});
