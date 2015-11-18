/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Common Misunderstandings example graph
$(document).ready(function () {
  var av_name = "MisunderstandingsGraphCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var top = 0;
  var left = 150;
  var yLength = 400;
  var xLength = 450;
  var slide = 1;
  
  // Slide 1
  av.umsg(interpret("Slide "+(slide++)));
  av.displayInit(); 

  //Slide 2
  av.umsg(interpret("Slide "+(slide++)), {preserve: true});
  //Drawing the axis
  var axis = av.g.polyline([[left, top], [left, top + yLength], [left + xLength, top + yLength]]);
  var xLabel = av.label("$n$",  {"top": top + yLength - 10, "left": left + xLength + 10}).css
  ({'font-size': '16px', "text-align": "center"});
  var yLabel = av.label("Cost",  {"top": top - 20, "left": left - 50}).css
  ({'font-size': '16px', "text-align": "center"});
  var origin = av.label("$(0,0)$",  {"top": top + yLength - 10, "left": left - 20}).css
  ({'font-size': '16px', "text-align": "center"});
  av.step();

  //Slide 3
  av.umsg(interpret("Slide "+(slide++)));
  //Draw the diagonal line
  var diagonal  = av.g.line(left, top + yLength, left + xLength - 100, top + 100);
  av.step();  

  //Slide 4
  av.umsg(interpret("Slide "+(slide++)));
  xLabel.text("Problem Instance");
  diagonal.hide();
  av.step();

  //Slide 5
  av.umsg(interpret("Slide "+(slide++)));
  var firstPosition = av.label("*",  {"top": top + yLength - 35, "left": left + 50}).css
  ({'font-size': '22px', "text-align": "center"});
  av.step();

  //Slide 6
  av.umsg(interpret("Slide "+(slide++)) , {preserve: true});
  var secondPosition = av.label("*",  {"top": top + yLength - 35, "left": left + 150}).css
  ({'font-size': '22px', "text-align": "center"});
  av.step();

  //Slide 7
  av.umsg(interpret("Slide "+(slide++)));
  var costTwenty = av.label("20",  {"top": top + 150, "left": left - 30}).css
  ({'font-size': '16px', "text-align": "center"});
  var markTwenty = av.label("_",  {"top": top + 148, "left": left - 5}).css
  ({'font-size': '16px', "text-align": "center"});
  var firstPositionCost = av.label("*",  {"top": top + 150, "left": left + 50}).css
  ({'font-size': '22px', "text-align": "center", "color": "red"});
  var secondPositionCost = av.label("*",  {"top": top + 150, "left": left + 150}).css
  ({'font-size': '22px', "text-align": "center", "color": "red"});
  av.step();

  //Slide 8
  av.umsg(interpret("Slide "+(slide++)) , {preserve: true});
  var horizontalLine = av.g.line(left, top + 185, left + xLength - 100, top + 185);
  av.step();

  //Slide 9
  av.umsg(interpret("Slide "+(slide++)));
  axis.hide();
  origin.hide();
  xLabel.hide();
  yLabel.hide();
  costTwenty.hide();
  markTwenty.hide();
  firstPosition.hide();
  secondPosition.hide();
  firstPositionCost.hide();
  secondPositionCost.hide();
  horizontalLine.hide();
  av.step();

  //Slide 10
  av.umsg(interpret("Slide "+(slide++)));
  axis.show();
  xLabel.show();
  yLabel.show();
  origin.show();
  av.step();

  //Slide 11
  av.umsg(interpret("Slide "+(slide++)));
  firstPosition.show();
  av.step();

  //Slide 12
  av.umsg(interpret("Slide "+(slide++)) , {preserve: true});
  firstPositionCost = av.label("*",  {"top": top + 340, "left": left + 50}).css
  ({'font-size': '22px', "text-align": "center", "color": "red"});
  var markFirstPositionCost =  av.label("_",  {"top": top + 338, "left": left - 5}).css
  ({'font-size': '16px', "text-align": "center"});
  var costOne = av.label("1",  {"top": top + 340, "left": left - 30}).css
  ({'font-size': '16px', "text-align": "center"});
  av.step();

  //Slide 13
  av.umsg(interpret("Slide "+(slide++)));
  secondPosition.show();
  av.step();

  //Slide 14
  av.umsg(interpret("Slide "+(slide++)) , {preserve: true});
  secondPositionCost = av.label("*",  {"top": top + 290, "left": left + 150}).css
  ({'font-size': '22px', "text-align": "center", "color": "red"});
  var markSecondPositionCost =  av.label("_",  {"top": top + 288, "left": left - 5}).css
  ({'font-size': '16px', "text-align": "center"});
  var costTwo = av.label("2",  {"top": top + 290, "left": left - 30}).css
  ({'font-size': '16px', "text-align": "center"});
  av.step();

  //Slide 15
  av.umsg(interpret("Slide "+(slide++)));
  diagonal = av.g.line(left, top + yLength, left + xLength, top + 190);
  markTwenty = av.label("_",  {"top": top + 98, "left": left - 5}).css
  ({'font-size': '16px', "text-align": "center"});
  costTwenty = av.label("20",  {"top": top + 100, "left": left - 30}).css
  ({'font-size': '16px', "text-align": "center"});
  av.step();

  //Slide 16
  av.umsg(interpret("Slide "+(slide++)));
  xLabel.hide();
  xLabel = av.label("$n$",  {"top": top + yLength - 10, "left": left + xLength + 10}).css
  ({'font-size': '16px', "text-align": "center"});
  costTwenty.hide();
  markTwenty.hide();
  firstPosition.hide();
  secondPosition.hide();
  firstPositionCost.hide();
  secondPositionCost.hide();
  diagonal.hide();
  costOne.hide();
  markFirstPositionCost.hide();
  costTwo.hide();
  markSecondPositionCost.hide();
  av.step();

  //Slide 17
  av.umsg(interpret("Slide "+(slide++)));
  av.step();

  //Slide 18
  av.umsg(interpret("Slide "+(slide++)) , {preserve: true});
  axis.hide();
  xLabel.hide();
  yLabel.hide();
  origin.hide();
  markFirstPositionCost.hide();
  left = 50;
  yLength = 150;
  xLength = 150;
  top = 50;
  var leftSpace = xLength + 100;
  axis = av.g.polyline([[left, top], [left, top + yLength], [left + xLength, top + yLength]]);
  xLabel = av.label("$n$",  {"top": top + yLength - 10, "left": left + xLength + 10}).css
  ({'font-size': '16px', "text-align": "center"});
  yLabel = av.label("Cost",  {"top": top - 20, "left": left - 50}).css
  ({'font-size': '16px', "text-align": "center"});
  costOne = av.label("1",  {"top": top + yLength - 50, "left": left - 20}).css
  ({'font-size': '16px', "text-align": "center"});
  var markOne = av.label("_",  {"top": top + yLength - 57, "left": left - 5}).css
  ({'font-size': '16px', "text-align": "center"});
  horizontalLine = av.g.line(left, top + yLength - 20, left + xLength - 20, top + yLength - 20);
  av.step();

  //Slide 19
  av.umsg(interpret("Slide "+(slide++)) , {preserve: true});
  axis = av.g.polyline([[left + leftSpace, top], [left + leftSpace, top + yLength], [left + xLength + leftSpace, top + yLength]]);
  xLabel = av.label("$n$",  {"top": top + yLength - 10, "left": left + xLength + leftSpace + 10}).css
  ({'font-size': '16px', "text-align": "center"});
  yLabel = av.label("Cost",  {"top": top - 20, "left": left + leftSpace - 50}).css
  ({'font-size': '16px', "text-align": "center"});
  var iPosition = av.label("*",  {"top": top + yLength - 25, "left": left + leftSpace + 50}).css
  ({'font-size': '16px', "text-align": "center"});
  var iLabel = av.label("$i$",  {"top": top + yLength - 10, "left": left + leftSpace + 50}).css
  ({'font-size': '16px', "text-align": "center"});
  var iCostLabel = av.label("$i$",  {"top": top + 50, "left": left + leftSpace - 20}).css
  ({'font-size': '16px', "text-align": "center"});
  var iCostMark = av.label("_",  {"top": top + 48, "left": left + leftSpace - 5}).css
  ({'font-size': '16px', "text-align": "center"});
  var iCost = av.label("$*$",  {"top": top + 50, "left": left + leftSpace + 50}).css
  ({'font-size': '16px', "text-align": "center", "color": "red"});
  diagonal = av.g.line(left + leftSpace, top + yLength, left + leftSpace + 100, top + yLength - 130);
  av.step();

  //Slide 20
  av.umsg(interpret("Slide "+(slide++)) , {preserve: true});
  leftSpace = 2 * xLength + 200;
  axis = av.g.polyline([[left + leftSpace, top], [left + leftSpace, top + yLength], [left + xLength + leftSpace, top + yLength]]);
  xLabel = av.label("$n$",  {"top": top + yLength - 10, "left": left + xLength + leftSpace + 10}).css
  ({'font-size': '16px', "text-align": "center"});
  yLabel = av.label("Cost",  {"top": top - 20, "left": left + leftSpace - 50}).css
  ({'font-size': '16px', "text-align": "center"});
  iPosition = av.label("*",  {"top": top + yLength - 25, "left": left + leftSpace + 50}).css
  ({'font-size': '16px', "text-align": "center"});
  iLabel = av.label("$i$",  {"top": top + yLength - 10, "left": left + leftSpace + 50}).css
  ({'font-size': '16px', "text-align": "center"});
  iCostLabel = av.label("$i/2$",  {"top": top + 85, "left": left + leftSpace - 35}).css
  ({'font-size': '16px', "text-align": "center"});
  iCostMark = av.label("_",  {"top": top + 83, "left": left + leftSpace - 5}).css
  ({'font-size': '16px', "text-align": "center"});
  iCost = av.label("$*$",  {"top": top + 85, "left": left + leftSpace + 50}).css
  ({'font-size': '16px', "text-align": "center", "color": "red"});
  diagonal = av.g.line(left + leftSpace, top + yLength, left + leftSpace + 130, top + yLength - 85);
  av.step();

  //Slide 21
  av.umsg(interpret("Slide "+(slide++)));
  av.recorded();

});
