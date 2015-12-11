/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Common Misunderstandings example graph
$(document).ready(function() {
  "use strict";
  var av_name = "MisunderstandingsGraphCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var topAlign = 0;
  var left = 150;
  var yLength = 400;
  var xLength = 450;
  var slide = 1;

  // Slide 1
  av.umsg(interpret("Slide " + (slide++)));
  av.displayInit();

  //Slide 2
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  //Drawing the axis
  var axis = av.g.polyline([[left, topAlign], [left, topAlign + yLength], [left + xLength, topAlign + yLength]]);
  var xLabel = av.label("$n$",  {top: topAlign + yLength - 10, left: left + xLength + 10}).addClass("largeLabel");
  var yLabel = av.label(interpret("lab1"),  {top: topAlign - 20, left: left - 50}).addClass("largeLabel");
  var origin = av.label("$(0,0)$",  {top: topAlign + yLength - 10, left: left - 20}).addClass("largeLabel");
  av.step();

  //Slide 3
  av.umsg(interpret("Slide " + (slide++)));
  //Draw the diagonal line
  var diagonal  = av.g.line(left, topAlign + yLength, left + xLength - 100, topAlign + 100);
  av.step();

  //Slide 4
  av.umsg(interpret("Slide " + (slide++)));
  xLabel.text(interpret("lab2"));
  diagonal.hide();
  av.step();

  //Slide 5
  av.umsg(interpret("Slide " + (slide++)));
  var firstPosition = av.label("*",  {top: topAlign + yLength - 35, left: left + 50}).addClass("largePoint");
  av.step();

  //Slide 6
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  var secondPosition = av.label("*",  {top: topAlign + yLength - 35, left: left + 150}).addClass("largePoint");
  av.step();

  //Slide 7
  av.umsg(interpret("Slide " + (slide++)));
  var costTwenty = av.label("20",  {top: topAlign + 150, left: left - 30}).addClass("largeLabel");
  var markTwenty = av.label("_",  {top: topAlign + 148, left: left - 5}).addClass("largeLabel");
  var firstPositionCost = av.label("*",  {top: topAlign + 150, left: left + 50}).addClass("largePoint colored");
  var secondPositionCost = av.label("*",  {top: topAlign + 150, left: left + 150}).addClass("largePoint colored");
  av.step();

  //Slide 8
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  var horizontalLine = av.g.line(left, topAlign + 185, left + xLength - 100, topAlign + 185);
  av.step();

  //Slide 9
  av.umsg(interpret("Slide " + (slide++)));
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
  av.umsg(interpret("Slide " + (slide++)));
  axis.show();
  xLabel.show();
  yLabel.show();
  origin.show();
  av.step();

  //Slide 11
  av.umsg(interpret("Slide " + (slide++)));
  firstPosition.show();
  av.step();

  //Slide 12
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  firstPositionCost = av.label("*",  {top: topAlign + 340, left: left + 50}).addClass("largePoint colored");
  var markFirstPositionCost =  av.label("_",  {top: topAlign + 338, left: left - 5}).addClass("largeLabel");
  var costOne = av.label("1",  {top: topAlign + 340, left: left - 30}).addClass("largeLabel");
  av.step();

  //Slide 13
  av.umsg(interpret("Slide " + (slide++)));
  secondPosition.show();
  av.step();

  //Slide 14
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  secondPositionCost = av.label("*",  {top: topAlign + 290, left: left + 150}).addClass("largePoint colored");
  var markSecondPositionCost =  av.label("_",  {top: topAlign + 288, left: left - 5}).addClass("largeLabel");
  var costTwo = av.label("2",  {top: topAlign + 290, left: left - 30}).addClass("largeLabel");
  av.step();

  //Slide 15
  av.umsg(interpret("Slide " + (slide++)));
  diagonal = av.g.line(left, topAlign + yLength, left + xLength, topAlign + 190);
  markTwenty = av.label("_",  {top: topAlign + 98, left: left - 5}).addClass("largeLabel");
  costTwenty = av.label("20",  {top: topAlign + 100, left: left - 30}).addClass("largeLabel");
  av.step();

  //Slide 16
  av.umsg(interpret("Slide " + (slide++)));
  xLabel.hide();
  xLabel = av.label("$n$",  {top: topAlign + yLength - 10, left: left + xLength + 10}).addClass("largeLabel");
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
  av.umsg(interpret("Slide " + (slide++)));
  av.step();

  //Slide 18
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  axis.hide();
  xLabel.hide();
  yLabel.hide();
  origin.hide();
  markFirstPositionCost.hide();
  left = 50;
  yLength = 150;
  xLength = 150;
  topAlign = 50;
  var leftSpace = xLength + 100;
  axis = av.g.polyline([[left, topAlign], [left, topAlign + yLength], [left + xLength, topAlign + yLength]]);
  xLabel = av.label("$n$",  {top: topAlign + yLength - 10, left: left + xLength + 10}).addClass("largeLabel");
  yLabel = av.label(interpret("lab1"),  {top: topAlign - 20, left: left - 50}).addClass("largeLabel");
  costOne = av.label("1",  {top: topAlign + yLength - 50, left: left - 20}).addClass("largeLabel");
  av.label("_",  {top: topAlign + yLength - 57, left: left - 5}).addClass("largeLabel");
  horizontalLine = av.g.line(left, topAlign + yLength - 20, left + xLength - 20, topAlign + yLength - 20);
  av.step();

  //Slide 19
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  axis = av.g.polyline([[left + leftSpace, topAlign], [left + leftSpace, topAlign + yLength], [left + xLength + leftSpace, topAlign + yLength]]);
  xLabel = av.label("$n$",  {top: topAlign + yLength - 10, left: left + xLength + leftSpace + 10}).addClass("largeLabel");
  yLabel = av.label(interpret("lab1"),  {top: topAlign - 20, left: left + leftSpace - 50}).addClass("largeLabel");
  av.label("*",  {top: topAlign + yLength - 25, left: left + leftSpace + 50}).addClass("largeLabel");
  av.label("$i$",  {top: topAlign + yLength - 10, left: left + leftSpace + 50}).addClass("largeLabel");
  av.label("$i$",  {top: topAlign + 50, left: left + leftSpace - 20}).addClass("largeLabel");
  av.label("_",  {top: topAlign + 48, left: left + leftSpace - 5}).addClass("largeLabel");
  av.label("$*$",  {top: topAlign + 50, left: left + leftSpace + 50}).addClass("mediumPoint colored");
  diagonal = av.g.line(left + leftSpace, topAlign + yLength, left + leftSpace + 100, topAlign + yLength - 130);
  av.step();

  //Slide 20
  av.umsg(interpret("Slide " + (slide++)), {preserve: true});
  leftSpace = 2 * xLength + 200;
  axis = av.g.polyline([[left + leftSpace, topAlign], [left + leftSpace, topAlign + yLength], [left + xLength + leftSpace, topAlign + yLength]]);
  xLabel = av.label("$n$",  {top: topAlign + yLength - 10, left: left + xLength + leftSpace + 10}).addClass("largeLabel");
  yLabel = av.label(interpret("lab1"),  {top: topAlign - 20, left: left + leftSpace - 50}).addClass("largeLabel");
  av.label("*",  {top: topAlign + yLength - 25, left: left + leftSpace + 50}).addClass("largeLabel");
  av.label("$i$",  {top: topAlign + yLength - 10, left: left + leftSpace + 50}).addClass("largeLabel");
  av.label("$i/2$",  {top: topAlign + 85, left: left + leftSpace - 35}).addClass("largeLabel");
  av.label("_",  {top: topAlign + 83, left: left + leftSpace - 5}).addClass("largeLabel");
  av.label("$*$",  {top: topAlign + 85, left: left + leftSpace + 50}).addClass("mediumPoint colored");
  diagonal = av.g.line(left + leftSpace, topAlign + yLength, left + leftSpace + 130, topAlign + yLength - 85);
  av.step();

  //Slide 21
  av.umsg(interpret("Slide " + (slide++)));
  av.recorded();
});
