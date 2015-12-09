/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Two Coloring Proof
$(document).ready(function() {
  "use strict";
  var av_name = "TwoColoringProofCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;
  var av;
  var leftAlign = 150;
  var topAlign = 10;

  av = new JSAV(av_name);

  // Put these here so that the lines will appear on top.
  // This would be better handled by proper use of z-index.
  var p1 = av.g.polyline([[leftAlign + 60, topAlign + 30], [leftAlign + 110, topAlign + 80], [leftAlign + 30, topAlign + 80]]).addClass("highlight");
  p1.hide();
  var p2 = av.g.polyline([[leftAlign + 110, topAlign + 80], [leftAlign + 240, topAlign + 80], [leftAlign + 175, topAlign + 145]]).addClass("highlight");
  p2.hide();
  var p3 = av.g.polyline([[leftAlign + 240, topAlign + 80], [leftAlign + 330, topAlign + 80], [leftAlign + 290, topAlign + 30]]).addClass("highlight");
  p3.hide();
  var p4 = av.g.polyline([[leftAlign + 175, topAlign + 145], [leftAlign + 230, topAlign + 200], [leftAlign + 120, topAlign + 200]]).addClass("highlight");
  p4.hide();
  var p5 = av.g.polyline([[leftAlign + 175, topAlign + 145], [leftAlign + 195, topAlign + 165], [leftAlign + 155, topAlign + 165]]).addClass("highlight");
  p5.hide();
  var p6 = av.g.polyline([[leftAlign + 155, topAlign + 165], [leftAlign + 85, topAlign + 165], [leftAlign + 105, topAlign + 212.5]]).addClass("highlight");
  p6.hide();
  var p7 = av.g.polyline([[leftAlign + 195, topAlign + 165], [leftAlign + 275, topAlign + 165], [leftAlign + 240, topAlign + 210]]).addClass("highlight");
  p7.hide();

  // Slide 1
  av.umsg(interpret("sc1"));
  var baseCaseLine = av.g.line(leftAlign, topAlign + 50, leftAlign + 350, topAlign + 50).addClass("thickLine");
  var baseCaseLabel1 = av.label(interpret("lab1"),  {top: topAlign - 25, left: leftAlign + 400}).addClass("largeLabel");
  var baseCaseLabel2 =  av.label(interpret("lab2"),  {top: topAlign + 75, left: leftAlign + 400}).addClass("largeLabel");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"), {preserve: true});
  var baseCaseRect = av.g.rect(leftAlign, topAlign + 50, 350, 50).addClass("highlight");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  baseCaseRect.hide();
  baseCaseLine.hide();
  baseCaseLabel1.hide();
  baseCaseLabel2.hide();
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"), {preserve: true});
  av.g.line(leftAlign + 50, topAlign + 20, leftAlign + 250, topAlign + 220).addClass("thickLine");
  av.g.line(leftAlign + 0, topAlign + 80, leftAlign + 350, topAlign + 80).addClass("thickLine");
  av.g.line(leftAlign + 300, topAlign + 20, leftAlign + 100, topAlign + 220).addClass("thickLine");
  var l4 = av.g.line(leftAlign + 0, topAlign + 165, leftAlign + 350, topAlign + 165).addClass("thickLine");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"), {preserve: true});
  l4.hide();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  p1.show();
  p2.show();
  p3.show();
  p4.show();
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  var nLine = av.label(interpret("lab3"),  {top: topAlign + 135, left: leftAlign + 400}).css({"font-size": "16px", "text-align": "center"});
  l4.show();
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"), {preserve: true});
  var plane1 = av.label(interpret("lab4"),  {top: topAlign + 75, left: leftAlign + 400}).addClass("largeLabel");
  var plane2 = av.label(interpret("lab5"),  {top: topAlign + 175, left: leftAlign + 400}).addClass("largeLabel");
  var planeRect1 = av.g.rect(leftAlign + 0, topAlign + 165, 350, 55).css({fill: "green", opacity: 0.1});
  var planeRect2 = av.g.rect(leftAlign + 0, topAlign + 20, 350, 145).css({fill: "blue", opacity: 0.1});
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  planeRect1.hide();
  planeRect2.hide();
  plane1.hide();
  plane2.hide();
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  plane1.show();
  plane2.show();
  planeRect1.show();
  planeRect1.css({fill: "green", opacity: 0.1});
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"), {preserve: true});
  p4.hide();
  p5.show();
  p6.show();
  p7.show();
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  plane1.hide();
  plane2.hide();
  nLine.hide();
  planeRect1.hide();
  av.recorded();
});
