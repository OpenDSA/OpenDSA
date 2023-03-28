/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "ChenVsCrossFoot";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);

   
   var LabelLeft=100;
   var labelTop=-25;
   var NotationHorGaps=300;
   var NotationVerGaps=100;
   var pX= LabelLeft+NotationHorGaps+80;
   var pY= labelTop+NotationVerGaps;
   var rowNo=1;
   var colNo=1;
   
   var labChen=av.label(interpret("<span style='color:blue;'> Chen Notation </span>"), {left: LabelLeft+NotationHorGaps*colNo, top: labelTop });
   labChen.css({"font-weight": "bold", "font-size": 20});

   colNo=2;

   var labCrows=av.label(interpret("<span style='color:red;'> Crow’s Foot Notation </span>"), {left: LabelLeft+(NotationHorGaps*colNo), top:labelTop });
   labCrows.css({"font-weight": "bold", "font-size": 20});

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
   

   // Slide 1
   av.umsg(("Chen notation Vs. Crow's foot notation for ERD representaion").bold().big());
   av.displayInit(1);
   av.step();

  //slide 2
  av.umsg(("Here is the chen's relation symbol").bold().big());
  var LabRSym=av.label(interpret("<span style='color:green;'> Relation Symbol </span>"), {left: LabelLeft, top: pY-50 });
  LabRSym.css({"font-weight": "bold", "font-size": 20});
  var polygon = av.g.polyline([[pX, pY-30],
   [pX+60, pY],
   [pX, pY+30],
   [pX-60, pY],
   [pX, pY-30]],
  {"stroke-width": 3, stroke: "black"});
  var Relchenlab=av.label("<span style='color:blue;'> R </span>", {left: pX-10, top:pY-35 });
  Relchenlab.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 3
  av.umsg(("Here is the coresponding crow's foot relation symbol").bold().big());
  var Relcrowslab=av.label("<span style='color:red;'> R </span>", {left: LabelLeft+(NotationHorGaps*colNo)+110, top:pY-50 });
  Relcrowslab.css({"font-weight": "bold", "font-size": 20});
  RelLine.show();
  av.step();

  //slide 4
  av.umsg(("Entity symbol represenation in chen notation").bold().big());
  var LabEnSym=av.label(interpret("<span style='color:green;'> Entity Symbol </span>"), {left: LabelLeft, top: (pY-50)+(NotationVerGaps*rowNo) });
  LabEnSym.css({"font-weight": "bold", "font-size": 20});
  var EntityChenRec=av.g.rect(pX-60, (pY-30)+(NotationVerGaps*rowNo), 120, 40, {"stroke-width": 3});
  var labEnChen=av.label("<span style='color:blue;'>E-name</span>", {left: pX-45, top:(pY-45)+(NotationVerGaps*rowNo)});
  labEnChen.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 5
  av.umsg(("Here is the coresponding crow's foot Entity symbol").bold().big());
  colNo=3;
  var EntityCrowRec=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-30)+(NotationVerGaps*rowNo), 120, 40, {"stroke-width": 3});
  var labEnCrows=av.label("<span style='color:red;'>E-name</span>", {left: LabelLeft+(NotationHorGaps*2)+65, top:(pY-45)+(NotationVerGaps*rowNo)});
  labEnCrows.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 6
  av.umsg(("Chen symbol notation for Simple atomic ERD attribute").bold().big());
  rowNo=2;
  colNo=2;
  var LabAttSym=av.label(interpret("<span style='color:green;'> Attribute Symbol </span>"), {left: LabelLeft, top: (pY-50)+(NotationVerGaps*rowNo) });
  LabAttSym.css({"font-weight": "bold", "font-size": 20});
  var Attellipse =av.g.ellipse(pX,(pY-10)+(NotationVerGaps*rowNo) ,70 ,25, {"stroke-width": 3});
  var AttChenLab=av.label("<span style='color:blue;'>Att-1</span>", {left: pX-25, top:(pY-45)+(NotationVerGaps*rowNo)});
  AttChenLab.css({"font-weight": "bold", "font-size": 20});
  av.step();

  //slide 7
  av.umsg(("Here is the coresponding crow's foot for simple atomic symbol").bold().big());
  colNo=3;
  var EntityChenRecAtt=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 110, {"stroke-width": 3});
  var EntityChenRecAtt2=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo), 120, 40, {"stroke-width": 3});
  var AttCrowsLab=av.label("<span style='color:red;'>Entity</span>", {left: LabelLeft+(NotationHorGaps*2)+80, top:(pY-65)+(NotationVerGaps*rowNo)});
  AttCrowsLab.css({"font-weight": "bold", "font-size": 20});
  var AttCrowsLab1=av.label("<span style='color:red;'>Att-1</span>", {left: LabelLeft+(NotationHorGaps*2)+60, top:(pY-30)+(NotationVerGaps*rowNo)});
  AttCrowsLab1.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab2=av.label("<span style='color:red;'>Att-2</span>", {left: LabelLeft+(NotationHorGaps*2)+60, top:(pY-10)+(NotationVerGaps*rowNo)});
  AttCrowsLab2.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab3=av.label("<span style='color:red;'>Att-3</span>", {left: LabelLeft+(NotationHorGaps*2)+60, top:(pY+10)+(NotationVerGaps*rowNo)});
  AttCrowsLab3.css({"font-weight": "bold", "font-size": 18});
  av.step();

  //slide 8
  av.umsg(("primary key attribute symbol in Chen notation").bold().big());
  rowNo=3;
  colNo=2;
  var LabPkSym=av.label(interpret("<span style='color:green;'> Primary Key Symbol </span>"), {left: LabelLeft, top: (pY-50)+(NotationVerGaps*rowNo) });
  LabPkSym.css({"font-weight": "bold", "font-size": 20});
  var PKAttellipse =av.g.ellipse(pX,(pY-10)+(NotationVerGaps*rowNo) ,70 ,25, {"stroke-width": 3});
  var PKAttChenLab=av.label("<span style='color:blue;'>Attribute</span>", {left: pX-40, top:(pY-45)+(NotationVerGaps*rowNo)});
  PKAttChenLab.css({"font-weight": "bold", "font-size": 18});
  PKAttLine.movePoints([[0,pX-40, (pY)+(NotationVerGaps*rowNo)],[1, pX+40,(pY)+(NotationVerGaps*rowNo)]]);
  PKAttLine.show();
  av.step();

  //slide 9
  av.umsg(("primary key attribute symbol in Crow's foot notation").bold().big());
  colNo=3;
  var PkAttCrowRec=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo)+30, 120, 125, {"stroke-width": 3});
  var PkAttCrowRec2=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo)+30, 120, 30, {"stroke-width": 3});
  var PkAttCrowRec3=av.g.rect(LabelLeft+(NotationHorGaps*2)+50, (pY-50)+(NotationVerGaps*rowNo)+30+30, 120, 30, {"stroke-width": 3});
  var AttCrowsLab7=av.label("<span style='color:red;'>Entity</span>", {left: LabelLeft+(NotationHorGaps*2)+80, top:(pY-65)+(NotationVerGaps*rowNo)+30});
  AttCrowsLab7.css({"font-weight": "bold", "font-size": 20});
  var AttCrowsLab4=av.label("<span style='color:red;'>Att-1</span>", {left: LabelLeft+(NotationHorGaps*2)+85, top:(pY-30)+(NotationVerGaps*rowNo)+20});
  AttCrowsLab4.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab5=av.label("<span style='color:red;'>Att-2</span>", {left: LabelLeft+(NotationHorGaps*2)+85, top:(pY-10)+(NotationVerGaps*rowNo)+30});
  AttCrowsLab5.css({"font-weight": "bold", "font-size": 18});
  var AttCrowsLab6=av.label("<span style='color:red;'>Att-3</span>", {left: LabelLeft+(NotationHorGaps*2)+85, top:(pY+10)+(NotationVerGaps*rowNo)+30});
  AttCrowsLab6.css({"font-weight": "bold", "font-size": 18});
  PKLineCrows.movePoints([[0, LabelLeft+(NotationHorGaps*2)+85, (pY-30)+(NotationVerGaps*rowNo)+63], [1, LabelLeft+(NotationHorGaps*2)+130, (pY-30)+(NotationVerGaps*rowNo)+63]]);
  PKLineTableCrows.movePoints([[0,LabelLeft+(NotationHorGaps*2)+80,(pY-50)+(NotationVerGaps*rowNo)+60],[1,LabelLeft+(NotationHorGaps*2)+80,(pY-50)+(NotationVerGaps*rowNo)+155]]);
  PKLineCrows.show();
  PKLineTableCrows.show();
  var PKcrowsLab=av.label("<span style='color:red;'>PK</span>", {left: LabelLeft+(NotationHorGaps*2)+50, top:(pY-30)+(NotationVerGaps*rowNo)+30});
  PKcrowsLab.css({"font-weight": "bold", "font-size": 14});
  av.step();

  //slide 10
  av.umsg(("Example for practicing ER diagram drawing").bold().big());
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

av.umsg(("Here is the Student entity representation using Chen notation").bold().big());
var EntityChenRecStu=av.g.rect(LabelLeftChen-70, pY+115 , 120, 40, {"stroke-width": 3});
   var StudEntLab=av.label("<span style='color:blue;'> Student </span>", {left: LabelLeftChen-50, top:pY+100 });
   StudEntLab.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 12
av.umsg(("Adding attributes name, ID and birthdate to student entity").bold().big());
var StdId =av.g.ellipse(LabelLeftChen-35,pY ,60 ,25, {"stroke-width": 3});
   var StdIdLab=av.label("<span style='color:blue;'> SID </span>", {left: LabelLeftChen-60, top:pY-30});
   sidLine.movePoints([[0,LabelLeftChen-30,pY+115],[1,LabelLeftChen-60,pY+25]]);
   sidLine.show();
   var StdName =av.g.ellipse(LabelLeftChen+20,pY+60 ,60 ,25, {"stroke-width": 3});
   var StdNameLab=av.label("<span style='color:blue;'> Sname </span>", {left: LabelLeftChen-10, top:pY+30 });
   snameLine.movePoints([[0,LabelLeftChen+10,pY+115],[1,LabelLeftChen+20,pY+60+25]]);
   snameLine.show();
   var StdBdate =av.g.ellipse(LabelLeftChen+120,pY ,60 ,25, {"stroke-width": 3});
   var StdBdateLab=av.label("<span style='color:blue;'> B-date </span>", {left: LabelLeftChen+90, top:pY-30});
   sbdateLine.movePoints([[0,LabelLeftChen+40,pY+115],[1,LabelLeftChen+120,pY+25]]);
   sbdateLine.show();
   av.step();

   //slide 13
   av.umsg(("Here is the corresponding Student entity representation in crow's foot notation").bold().big());
   labCrows=av.label(interpret("<span style='color:red;'> Crow’s Foot Notation </span>"), {left: LabelLeftChen+NotationHorGapsChen, top:labelTop });
   labCrows.css({"font-weight": "bold", "font-size": 20});
   var CrowRecStd1=av.g.rect(LabelLeft+(NotationHorGaps*2)-80, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 125, {"stroke-width": 3});
  var CrowRecStd2=av.g.rect(LabelLeft+(NotationHorGaps*2)-80, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 30, {"stroke-width": 3});
  var CrowRecStd3=av.g.rect(LabelLeft+(NotationHorGaps*2)-80, (pY-50)+(NotationVerGaps*rowNo)-220+30, 120, 30, {"stroke-width": 3});
  var stdCrowlab=av.label("<span style='color:red;'>Student</span>", {left: LabelLeft+(NotationHorGaps*2)+65-130, top:(pY-65)+(NotationVerGaps*rowNo)+25-250});
  stdCrowlab.css({"font-weight": "bold", "font-size": 20});
  PKLineTableCrows.movePoints([[0,LabelLeft+(NotationHorGaps*2)+80-130,(pY-50)+(NotationVerGaps*rowNo)+60-250],[1,LabelLeft+(NotationHorGaps*2)+80-130,(pY-50)+(NotationVerGaps*rowNo)+155-250]]);
  PKLineTableCrows.show();
  av.step();

  //slide 14
  av.umsg(("Then adding attributes to student entity using crow's foot notation").bold().big());
  var sidCrowLab=av.label("<span style='color:red;'>SID</span>", {left: LabelLeft+(NotationHorGaps*2)+85-130, top:(pY-30)+(NotationVerGaps*rowNo)+20-250});
  sidCrowLab.css({"font-weight": "bold", "font-size": 18});
  var snameCrowLab=av.label("<span style='color:red;'>Sname</span>", {left: LabelLeft+(NotationHorGaps*2)+85-130, top:(pY-10)+(NotationVerGaps*rowNo)+30-250});
  snameCrowLab.css({"font-weight": "bold", "font-size": 18});
  var sbdateCrowLab=av.label("<span style='color:red;'>B-date</span>", {left: LabelLeft+(NotationHorGaps*2)+85-130, top:(pY+10)+(NotationVerGaps*rowNo)+30-250});
  sbdateCrowLab.css({"font-weight": "bold", "font-size": 18});
  av.step();

  //slide 15
  av.umsg(("Now, representing course entity with its attributes using chen notation").bold().big());
  var EntityChenRecCor=av.g.rect(pX-90, pY-35+150, 120, 40, {"stroke-width": 3});
   var CorEntLab=av.label("<span style='color:blue;'> Course </span>", {left: pX-65, top:pY-50+150 });
   CorEntLab.css({"font-weight": "bold", "font-size": 20});
   var CorCode =av.g.ellipse(pX-110,pY-35+50 ,60 ,25, {"stroke-width": 3});
   var CorCodeLab=av.label("<span style='color:blue;'> Code </span>", {left: pX-140, top:pY-35+20 });
   ccodeLine.movePoints([[0,pX-80,pY-35+150],[1,pX-120,pY-35+50+25 ]]);
   ccodeLine.show();
   var CorName =av.g.ellipse(pX-90+60,pY-35+100 ,60 ,25, {"stroke-width": 3});
   var CorNameLab=av.label("<span style='color:blue;'> Cname </span>", {left: pX-90+30, top:pY-35+70 });
   cnameLine.movePoints([[0,pX-30,pY-35+150],[1,pX-90+60,pY-35+100+25]]);
   cnameLine.show();
   var CorHours =av.g.ellipse(pX-70+110,pY-35+50 ,60 ,25, {"stroke-width": 3});
   var CorHoursLab=av.label("<span style='color:blue;'> Hours </span>", {left: pX-70+80, top:pY-35+20 });
   choursLine.movePoints([[0,pX+10,pY-35+150],[1,pX-70+130,pY-35+50+25]]);
   choursLine.show();
   av.step();

   //slide 16
   av.umsg(("Then, the corresponding representation of course entity with its attributes by crow's foot notation").bold().big());
   var CrowReccor1=av.g.rect(LabelLeft+(NotationHorGaps*2)+200, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 125, {"stroke-width": 3});
   var CrowReccor2=av.g.rect(LabelLeft+(NotationHorGaps*2)+200, (pY-50)+(NotationVerGaps*rowNo)-220, 120, 30, {"stroke-width": 3});
   var CrowReccor3=av.g.rect(LabelLeft+(NotationHorGaps*2)+200, (pY-50)+(NotationVerGaps*rowNo)-220+30, 120, 30, {"stroke-width": 3});
   var corCrowlab=av.label("<span style='color:red;'>Course</span>", {left: LabelLeft+(NotationHorGaps*2)+65-130+280, top:(pY-65)+(NotationVerGaps*rowNo)+25-250});
   corCrowlab.css({"font-weight": "bold", "font-size": 20});
   var ccodeCrowLab=av.label("<span style='color:red;'>Code</span>", {left: LabelLeft+(NotationHorGaps*2)+85-130+280, top:(pY-30)+(NotationVerGaps*rowNo)+20-250});
   ccodeCrowLab.css({"font-weight": "bold", "font-size": 18});
   var cnameCrowLab=av.label("<span style='color:red;'>Cname</span>", {left: LabelLeft+(NotationHorGaps*2)+85-130+280, top:(pY-10)+(NotationVerGaps*rowNo)+30-250});
   cnameCrowLab.css({"font-weight": "bold", "font-size": 18});
   var choursCrowLab=av.label("<span style='color:red;'>Hours</span>", {left: LabelLeft+(NotationHorGaps*2)+85-130+280, top:(pY+10)+(NotationVerGaps*rowNo)+30-250});
   choursCrowLab.css({"font-weight": "bold", "font-size": 18});
  PKLinecorsTableCrows.movePoints([[0,LabelLeft+(NotationHorGaps*2)+80-130+280,(pY-50)+(NotationVerGaps*rowNo)+60-250],[1,LabelLeft+(NotationHorGaps*2)+80-130+280,(pY-50)+(NotationVerGaps*rowNo)+155-250]]);
  PKLinecorsTableCrows.show();
  av.step();

  //slide 17
  av.umsg(("Identifying primary keys (underline PK attributes)for entities (as SID for Student & C-cOde for course entities) in Chen notation").bold().big());
  sidPkLine.movePoints([[0,LabelLeftChen-60,pY+10],[1,LabelLeftChen-18,pY+10]]);
   sidPkLine.show();
  ccodePkLine.movePoints([[0,pX-140,pY-35+60],[1,pX-87,pY-35+60]]);
   ccodePkLine.show(); 
   av.step();

   //slide 18
   av.umsg(("Identifying primary keys for entities in Crow's foot notation").bold().big());
   PKLineCrows.movePoints([[0, LabelLeft+(NotationHorGaps*2)+85-130, (pY-30)+(NotationVerGaps*rowNo)+63-250], [1, LabelLeft+(NotationHorGaps*2)+128-130, (pY-30)+(NotationVerGaps*rowNo)+63-250]]);
  PKLineCrows.show();
  var PKstdcrowsLab=av.label("<span style='color:red;'>PK</span>", {left: LabelLeft+(NotationHorGaps*2)+50-130, top:(pY-30)+(NotationVerGaps*rowNo)+30-250});
  PKstdcrowsLab.css({"font-weight": "bold", "font-size": 14});
  PKLinecorsCrows.movePoints([[0, LabelLeft+(NotationHorGaps*2)+85-130+280, (pY-30)+(NotationVerGaps*rowNo)+63-250], [1, LabelLeft+(NotationHorGaps*2)+128-130+300, (pY-30)+(NotationVerGaps*rowNo)+63-250]]);
  PKLinecorsCrows.show();
  var PKcorcrowsLab=av.label("<span style='color:red;'>PK</span>", {left: LabelLeft+(NotationHorGaps*2)+50-130+280, top:(pY-30)+(NotationVerGaps*rowNo)+30-250});
  PKcorcrowsLab.css({"font-weight": "bold", "font-size": 14});
  av.step();

  //slide 19
  av.umsg(("Register relation in chen notation").bold().big());
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
   var RelchenReg=av.label("<span style='color:blue;'> Register </span>", {left:labelTop+210+40, top:labelTop+45+150 });
   RelchenReg.css({"font-weight": "bold", "font-size": 20});
   av.step();

   //slide 20
   av.umsg(("Corrsponding Register relation in crow's foot notation").bold().big());
   RegRelLine.movePoints([[0,LabelLeft+(NotationHorGaps*2)-80+120,(pY-50)+(NotationVerGaps*rowNo)-220+80],[1,LabelLeft+(NotationHorGaps*2)+200,(pY-50)+(NotationVerGaps*rowNo)-220+80]]);
   RegRelLine.show(); 
   var regRelLab=av.label("<span style='color:red;'>Register</span>", {left: LabelLeft+(NotationHorGaps*2)-80+160, top:(pY-50)+(NotationVerGaps*rowNo)-220+30});
   regRelLab.css({"font-weight": "bold", "font-size": 18});
   av.step();

   //slide 21
   av.umsg(("The physical relational schema diagram corresponding to both Chen & crow's foot notations").bold().big());
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
  av.recorded();


});
