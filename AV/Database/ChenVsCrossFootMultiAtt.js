/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "ChenVsCrossFootMultiAtt";
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
  var PhoneLine=av.g.line(0,0,0,0, {opacity: 100, "stroke-width": 2});
  PhoneLine.hide();
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
   av.umsg(("Multivalued attribute notations in chen vs. crow's foot models").bold().big());
   av.displayInit(1);
   av.step();

//slide 2
av.umsg(("Here is the chen's Multivalued attribute symbol").bold().big());
  var LabCompAtSym=av.label(("<span style='color:green;'> Multivalued Attribute</span>"), {left: LabelLeft, top: pY-50 });
  LabCompAtSym.css({"font-weight": "bold", "font-size": 20});
  var CompAttelips1=av.g.ellipse(LabelLeft+385, pY+10 , 100, 25, {"stroke-width": 3});
  var CompAttelips2=av.g.ellipse(LabelLeft+385, pY+10 , 105, 30, {"stroke-width": 3});
  var CompAttLab=av.label(("<span style='color:blue;'> Multivalue Att. </span>"), {left: LabelLeft+330, top:pY-15 });
  
av.step();

//slide 3
av.umsg(("Here is the coresponding crow's foot Multivalued attribute symbol").bold().big());
colNo=3;
var CompAttCrowsREc=av.g.rect(LabelLeft+(NotationHorGaps*2), pY-20, 220, 210, {"stroke-width": 3});
var CompAttCrowsREc2=av.g.rect(LabelLeft+(NotationHorGaps*2), pY-20, 220, 60, {"stroke-width": 3});
var CompAttCrowsLab=av.label(("<span style='color:red;'>Entity</span>"), {left: LabelLeft+(NotationHorGaps*2)+75, top:pY-30});
CompAttCrowsLab.css({"font-weight": "bold", "font-size": 20});
var CompAttCrowsLab1=av.label(("<span style='color:red;'>{Multivalued Att.}</span>"), {left: LabelLeft+(NotationHorGaps*2), top:(pY-60)+(NotationVerGaps*rowNo)});
//CompAttCrowsLab1.css({"font-weight": "bold", "font-size": 18});
av.step();

//slide 4
av.umsg(("Using attribute phone number as an example for Multivalued attribute").bold().big());
CompAttelips1.hide();
CompAttelips2.hide();
CompAttCrowsREc.hide();
CompAttCrowsREc2.hide();
CompAttCrowsLab.hide();
CompAttCrowsLab1.hide();
CompAttLab.hide();
var CompPhoneAttLab=av.label(("<span style='color:blue;'> Phone No.</span>"), {left: LabelLeft+350, top:pY-15 });
//CompPhoneAttLab.css({"font-weight": "bold", "font-size": 20});
   CompAttelips1=av.g.ellipse(LabelLeft+385, pY+10 , 100, 25, {"stroke-width": 3});
   CompAttelips2=av.g.ellipse(LabelLeft+385, pY+10 , 105, 30, {"stroke-width": 3});
av.step();

// slide 5
CompAttCrowsREc.show();
CompAttCrowsREc2.show();
var CompPhoneCrowsLab=av.label(("<span style='color:red;'>Student</span>"), {left: LabelLeft+(NotationHorGaps*2)+60, top:pY-30});
CompPhoneCrowsLab.css({"font-weight": "bold", "font-size": 20});
var CompPhoneCrowsLab1=av.label(("<span style='color:red;'>{Phone No.}</span>"), {left: LabelLeft+(NotationHorGaps*2), top:(pY-60)+(NotationVerGaps*rowNo)});
//CompPhoneCrowsLab1.css({"font-weight": "bold", "font-size": 18});
av.step();

//slide 6
av.umsg(("Example demonstrating Multivalued attribute").bold().big());
CompAttCrowsREc.hide();
CompAttCrowsREc2.hide();
labChen.hide();
labCrows.hide();
LabCompAtSym.hide();
CompPhoneAttLab.hide();
CompAttelips1.hide();
CompAttelips2.hide();
CompPhoneCrowsLab.hide();
CompPhoneCrowsLab1.hide();
var ProblemLab=av.label(("<span style='color:green;'> Assume Having Student entitiy with attributes name, id and phone no. where phone is a multivalued attribute in which each student can have more than one phone number so how to physically write the coressponding schema diagram </span>"), {left: LabelLeft-20, top: pY-60 });
  ProblemLab.css({"font-weight": "bold", "font-size": 20});
av.step();

//slide 7
av.umsg(("Here is the corresponding physical relational schema <span style='color:red;'>Note:</span> in physical schema multivalued attribute should be separated in other table that is connected to the original table via foreign key").bold().big());
CompAttCrowsREc.show();
CompAttCrowsREc2.show();
ProblemLab.hide();
labChen.show();
labCrows.show();
LabCompAtSym.show();
CompPhoneAttLab.show();
CompAttelips1=av.g.ellipse(LabelLeft+385, pY+10 , 60, 25, {"stroke-width": 3});
   CompAttelips2=av.g.ellipse(LabelLeft+385, pY+10 , 65, 30, {"stroke-width": 3});
CompAttelips1.show();
CompAttelips2.show();
CompPhoneCrowsLab.show();
//CompPhoneCrowsLab1.show();
var AttCrowsLabId=av.label(("<span style='color:red;'>SID</span>"),  {left: LabelLeft+(NotationHorGaps*2)+40, top:(pY-60)+(NotationVerGaps*rowNo)});
  //AttCrowsLab2.css({"font-weight": "bold", "font-size": 18});
 var AttCrowsLabNmae=av.label(("<span style='color:red;'>Sname</span>"),  {left: LabelLeft+(NotationHorGaps*2)+40, top:(pY-35)+(NotationVerGaps*rowNo)});
 var AttCrowsLabPhone=av.label(("<span style='color:red;'>{Phone no.}</span>"),  {left: LabelLeft+(NotationHorGaps*2)+40, top:(pY-5)+(NotationVerGaps*rowNo)});
var studSchlab=av.label(("Student"), {left: LabelLeft, top: labelTop+350 });
studSchlab.css({"font-weight": "bold", "font-size": 15});
//studSchlab.hide();
var studSchema = [["SID","Sname"]];
var studSchemaArr= av.ds.matrix(studSchema, {style: "table", top: labelTop+300+70, left: LabelLeft});
studSchemaArr._arrays[0].css([0], {"text-decoration": "underline"});
//studSchemaArr._arrays[0].hide();

var corSchlab=av.label(("Phone-No."), {left: LabelLeft, top: labelTop+300+120 });
corSchlab.css({"font-weight": "bold", "font-size": 15});
// corSchlab.hide();
var corSchema = [["SID(FK)","phone no."]];
var corSchemaArr= av.ds.matrix(corSchema, {style: "table", top: labelTop+300+140, left: LabelLeft});
corSchemaArr._arrays[0].css([0,1], {"text-decoration": "underline"});

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
  PhoneLine.movePoints([[0,LabelLeft+400, pY+190] ,[1,LabelLeft+385, pY+38]]);
  SnameLine.show();
  SIDlLine.show();
  PhoneLine.show();
av.step();

//slide 8
av.umsg(("In this physical schema representation you can add any other attributes describing the phone number of each student (i.e., the type of phone no. either mobile or home number) because now phone number it is not just an attribute but it is an entity").bold().big());
corSchema = [["SID(FK)","phone no.","type"]];
var corSchemaArr= av.ds.matrix(corSchema, {style: "table", top: labelTop+300+140, left: LabelLeft});
corSchemaArr._arrays[0].css([0,1], {"text-decoration": "underline"});
av.recorded();
});
