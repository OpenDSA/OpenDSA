/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "ChenVsCrossFootDerivedAtt";
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

   var labCrows=av.label(interpret("<span style='color:red;'> Crow’s Foot Notation </span>"), {left: LabelLeft+(NotationHorGaps*colNo), top:labelTop, record: false });
   labCrows.css({"font-weight": "bold", "font-size": 20});

   var RelLine = av.g.line(LabelLeft+(NotationHorGaps*2)+25, pY, LabelLeft+(NotationHorGaps*colNo)+215, pY, {opacity: 100, "stroke-width": 2});
   RelLine.hide();
   var PKLineCrows=av.g.line(0,0,0,0);
   var PKLineTableCrows=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var PKAttLine=av.g.line(0,0,0,0);
   var stdLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var CorLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var AttstretLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var Attcityline=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var AttBuldgLabLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var ccodeLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var cnameLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var choursLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var sidPkLine=av.g.line(0,0,0,0, {opacity: 100});
   var ccodePkLine=av.g.line(0,0,0,0, {opacity: 100});
   var PKLinecorsCrows=av.g.line(0,0,0,0, {opacity: 100});
   var ComAtt1elpsLine=av.g.line(0,0,0,0, {opacity: 100});
   var ComAtt2elpsLine=av.g.line(0,0,0,0, {opacity: 100});
   var ComAtt3elpsLine=av.g.line(0,0,0,0, {opacity: 100});
   var PKLinecorsTableCrows=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var RegRelLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
   var SnameLine=av.g.line(0,0,0,0 , {opacity: 100, "stroke-width": 2});
  var SIDlLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
  var ageLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
  ageLine.hide();
  var bdateLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
  bdateLine.hide();
  SnameLine.hide();
  SIDlLine.hide();
   ComAtt1elpsLine.hide();
   ComAtt2elpsLine.hide();
   ComAtt3elpsLine.hide();
   PKAttLine.hide();
   PKLineCrows.hide();
   PKLineTableCrows.hide();
   stdLine.hide();
   CorLine.hide();
   AttstretLine.hide();
   Attcityline.hide();
   sidPkLine.hide();
   AttBuldgLabLine.hide();
   ccodeLine.hide();
   ccodePkLine.hide();
   cnameLine.hide();
   choursLine.hide();
   PKLinecorsCrows.hide();
   PKLinecorsTableCrows.hide();
   RegRelLine.hide();
   //var EntityCrowsRec=av.g.rect(xPositionBigRectangles, yPositionBig1, lengthBig, widthBig);

   // Slide 1
   av.umsg(("Derived attribute definition & notation: <span style='color:red;'>derived attribute</span> is the attribute that its value can be calculated or derived from a value of one or more attributes in the database.").bold().big());
   av.displayInit(1);
   av.step();

//slide 2
av.umsg(("Here is the chen's derived attribute symbol").bold().big());
  var LabCompAtSym=av.label(interpret("<span style='color:green;'> Derived Attribute</span>"), {left: LabelLeft, top: pY-50 });
  LabCompAtSym.css({"font-weight": "bold", "font-size": 20});
  var CompAttelips1=av.g.ellipse(LabelLeft+385, pY+10 , 100, 25, {"stroke-width": 3});
  CompAttelips1.addClass("dashed");
  var CompAttLab=av.label(("<span style='color:blue;'> Derived Att. </span>"), {left: LabelLeft+340, top:pY-15 });
av.step();

//slide 3
av.umsg(("Here is the coresponding crow's foot derived attribute symbol").bold().big());
colNo=3;
var CompAttCrowsREc=av.g.rect(LabelLeft+(NotationHorGaps*2), pY-20, 220, 210, {"stroke-width": 3});
var CompAttCrowsREc2=av.g.rect(LabelLeft+(NotationHorGaps*2), pY-20, 220, 60, {"stroke-width": 3});
var CompAttCrowsLab=av.label(("<span style='color:red;'>Entity</span>"), {left: LabelLeft+(NotationHorGaps*2)+75, top:pY-30});
CompAttCrowsLab.css({"font-weight": "bold", "font-size": 20});
var CompAttCrowsLab1=av.label(interpret("<span style='color:red;'>Derived Att.</span>"), {left: LabelLeft+(NotationHorGaps*2)+10, top:(pY-60)+(NotationVerGaps*rowNo)});
//CompAttCrowsLab1.css({"font-weight": "bold", "font-size": 18});
av.step();

//slide 4
av.umsg(("using age attribute as an example for derived attribute").bold().big());
CompAttelips1.hide();
//CompAttelips2.hide();
CompAttCrowsREc.hide();
CompAttCrowsREc2.hide();
CompAttCrowsLab.hide();
CompAttCrowsLab1.hide();
CompAttLab.hide();
var CompPhoneAttLab=av.label(("<span style='color:blue;'> age</span>"), {left: LabelLeft+365, top:pY-15 });
//CompPhoneAttLab.css({"font-weight": "bold", "font-size": 20});
   CompAttelips1=av.g.ellipse(LabelLeft+385, pY+10 , 80, 25, {"stroke-width": 3});
   CompAttelips1.addClass("dashed");
   //CompAttelips2=av.g.ellipse(LabelLeft+385, pY+10 , 105, 30, {"stroke-width": 3});
av.step();

// slide 5
CompAttCrowsREc.show();
CompAttCrowsREc2.show();
var CompPhoneCrowsLab=av.label(("<span style='color:red;'>Student</span>"), {left: LabelLeft+(NotationHorGaps*2)+60, top:pY-30});
CompPhoneCrowsLab.css({"font-weight": "bold", "font-size": 20});
var CompPhoneCrowsLab1=av.label(interpret("<span style='color:red;'>age</span>"), {left: LabelLeft+(NotationHorGaps*2)+15, top:(pY-60)+(NotationVerGaps*rowNo)});
CompPhoneCrowsLab1.css({"font-size": 19});
av.step();

//slide 6
av.umsg(("Example demonstrating derived attribute").bold().big());
CompAttCrowsREc.hide();
CompAttCrowsREc2.hide();
labChen.hide();
labCrows.hide();
LabCompAtSym.hide();
CompPhoneAttLab.hide();
CompAttelips1.hide();
//CompAttelips2.hide();
CompPhoneCrowsLab.hide();
CompPhoneCrowsLab1.hide();
var ProblemLab=av.label(("<span style='color:green;'> Assume Having Student entitiy with attributes name, id, birthdate and age where age is a derived attribute as its value can be calculated from the birthdate attribute so how to physically represent the derived age attribute in the schema diagram </span>"), {left: LabelLeft-20, top: pY-60 });
  ProblemLab.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 7
av.umsg(("the corresponding physical relational schema diagram. <span style='color:red;'>Note:</span> derived attribute <span style='color:red;'>isn't included</span> in physical schema as its value can be calculated from Birthdate attribute inside the application program so as to save memory (not to waste memory with redundant data) ").bold().big());
CompAttCrowsREc.show();
CompAttCrowsREc2.show();
ProblemLab.hide();
labChen.show();
labCrows.show();
LabCompAtSym.show();
CompPhoneAttLab=av.label(("<span style='color:blue;'> age</span>"), {left: LabelLeft+310, top:pY-25});
CompPhoneAttLab.show();
CompAttelips1=av.g.ellipse(LabelLeft+330, pY , 60, 25, {"stroke-width": 3});
CompAttelips1.addClass("dashed");
var Attsbdateelps =av.g.ellipse(LabelLeft+480, pY ,60 ,25, {"stroke-width": 3});
  var labbdateChen=av.label(("<span style='color:blue;'>birthdate</span>"), {left: LabelLeft+445, top:pY-25});
  // CompAttelips2=av.g.ellipse(LabelLeft+385, pY+10 , 65, 30, {"stroke-width": 3});
CompAttelips1.show();
//CompAttelips2.show();
CompPhoneCrowsLab.show();
//CompPhoneCrowsLab1.show();
var AttCrowsLabId=av.label(("<span style='color:red;'>SID</span>"),  {left: LabelLeft+(NotationHorGaps*2)+20, top:(pY-60)+(NotationVerGaps*rowNo)});
  //AttCrowsLab2.css({"font-weight": "bold", "font-size": 18});
 var AttCrowsLabNmae=av.label(("<span style='color:red;'>Sname</span>"),  {left: LabelLeft+(NotationHorGaps*2)+20, top:(pY-35)+(NotationVerGaps*rowNo)});
 var AttCrowsLabbdate=av.label(("<span style='color:red;'>birthdate</span>"),  {left: LabelLeft+(NotationHorGaps*2)+20, top:(pY-5)+(NotationVerGaps*rowNo)});
 var AttCrowsLabage=av.label(interpret("<span style='color:red;'>age</span>"),  {left: LabelLeft+(NotationHorGaps*2)+20, top:(pY+25)+(NotationVerGaps*rowNo)});
var studSchlab=av.label(("Student"), {left: LabelLeft, top: labelTop+350 });
studSchlab.css({"font-weight": "bold", "font-size": 15});
//studSchlab.hide();
var studSchema = [["SID","Sname","birthdate"]];
var studSchemaArr= av.ds.matrix(studSchema, {style: "table", top: labelTop+300+70, left: LabelLeft});
studSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
//studSchemaArr._arrays[0].hide();


var EntityStdRec=av.g.rect(LabelLeft+340, pY+190 , 110, 35, {"stroke-width": 3});
  var labStdChen=av.label(("<span style='color:blue;'>Student</span>"), {left: LabelLeft+350, top:pY+170 });
  labStdChen.css({"font-weight": "bold", "font-size": 20});
  var Attsnamegelps =av.g.ellipse(LabelLeft+80+440,pY+65 ,60 ,25, {"stroke-width": 3});
  var labSnameChen=av.label(("<span style='color:blue;'>Sname</span>"), {left: LabelLeft+490, top:pY+40 });
 // labSnameChen.css({"font-weight": "bold", "font-size": 20});
  var AttsIDelps =av.g.ellipse(LabelLeft-100+350,pY+65 ,60 ,25, {"stroke-width": 3});
  var labIDChen=av.label(("<span style='color:blue;'>SID</span>"), {left: LabelLeft-100+330, top:pY+30 });
  //labIDChen.css({"font-weight": "bold", "font-size": 20});
 //  SnameLine=av.g.line(LabelLeft+450, pY+190 ,LabelLeft+120+440,pY+90 , {opacity: 100, "stroke-width": 2});
  // AAddLine=av.g.line(LabelLeft+400, pY+190 ,LabelLeft+400, pY+165, {opacity: 100, "stroke-width": 2});
  SnameLine.movePoints([[0,LabelLeft+450,pY+190],[1,LabelLeft+70+440,pY+92 ]]);
  SIDlLine.movePoints([[0,LabelLeft+360, pY+190] ,[1,LabelLeft-100+380,pY+90 ]]);
  ageLine.movePoints([[0,LabelLeft+390, pY+190] ,[1,LabelLeft+335, pY+23]]);
  bdateLine.movePoints([[0,LabelLeft+420, pY+190] ,[1,LabelLeft+445, pY+23]]);
  bdateLine.show();
  SnameLine.show();
  SIDlLine.show();
  ageLine.show();
av.recorded();
});
