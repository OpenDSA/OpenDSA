/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Two Coloring Proof
$(document).ready(function () {
  var av_name = "TwoColoringProofCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av;
  var leftAlign = 150;
  var topAlign = 100;
  var set;
  
  av = new JSAV(av_name);
  set = av.g.set();

  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
  $(".avcontainer").on("jsav-message", function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });
	
  //Slide 1
  av.umsg("Let's see how we can get a visual intuition about the previous proof");
  av.displayInit();
  
  //Slide 2   
  av.umsg("<b><u>For the base case: </u></b> We have only a single infinite line. This line splits the plane into two regions.");   
  var baseCaseLine = av.g.line(leftAlign, topAlign, leftAlign + 350, topAlign,{"stroke-width": 3});  
  var baseCaseLabel1 = av.label("Region 1",  {"top": topAlign - 75, "left": leftAlign + 400}).css
  ({'font-size': '16px', "text-align": "center"});
  var baseCaseLabel2 =  av.label("Region 2",  {"top": topAlign + 25 , "left": leftAlign + 400}).css
  ({'font-size': '16px', "text-align": "center"});
  av.step();

  //Slide 3
  av.umsg("<br><br>One region can be colored black and the other white to get a valid two-coloring", {"preserve": true});
  var baseCaseRect = av.g.rect(leftAlign, topAlign, 350, 50).css({"fill": "gray"});
  av.step();

  //Slide 4
  topAlign = 50;
  baseCaseRect.hide();
  baseCaseLine.hide();
  baseCaseLabel1.hide();
  baseCaseLabel2.hide();
  av.umsg("<b><u>For the inductive hypothesis:</u></b> We have that the set of regions formed by $n−1$ infinite lines can be two-colored.");
  av.step();

  //Slide 5
  av.umsg("<br><br> <b><u>To prove the theorem for $\\textbf{n}$</u></b>, consider the set of regions formed by the $n−1$ lines remaining when any one of the $n$ lines is removed. Here we assume $n = 4$. So we have $3$ infinite lines", {"preserve": true});
  av.g.line(leftAlign + 50, topAlign + 20, leftAlign + 250, topAlign + 220, {"stroke-width": 3});
  av.g.line(leftAlign + 0, topAlign + 80, leftAlign + 350, topAlign + 80, {"stroke-width": 3});
  av.g.line(leftAlign + 300, topAlign + 20, leftAlign + 100, topAlign + 220, {"stroke-width": 3});
  av.step();

  //Slide 6
  av.umsg("By the induction hypothesis, this set of regions can be two-colored");
  var p1 = av.g.polyline([[leftAlign + 60, topAlign + 30], [leftAlign + 110, topAlign + 80], [leftAlign + 30, topAlign + 80]]).css({"fill": "gray"});
  var p2 = av.g.polyline([[leftAlign + 110, topAlign + 80], [leftAlign + 240, topAlign + 80], [leftAlign + 175, topAlign + 145]]).css({"fill": "gray"});
  var p3 = av.g.polyline([[leftAlign + 240, topAlign + 80], [leftAlign + 330, topAlign + 80], [leftAlign + 290, topAlign + 30]]).css({"fill": "gray"});
  var p4 = av.g.polyline([[leftAlign + 175, topAlign + 145], [leftAlign + 230, topAlign + 200], [leftAlign + 120, topAlign + 200]]).css({"fill": "gray"});
  av.step();

  //Slide 7
  av.umsg("Now, put the n'th line back.");
  av.g.line(leftAlign + 0, topAlign + 165, leftAlign + 350, topAlign + 165, {"stroke-width": 3});
  av.step();

  //Slide 8
  av.umsg("<br><br>This splits the plane into two half-planes, each of which (independently) has a valid two-coloring inherited from the two-coloring of the plane with $n−1$ lines", {"preserve": true});
  var plane1 = av.label("Half Plane 1",  {"top": topAlign + 75, "left": leftAlign + 400}).css
  ({'font-size': '16px', "text-align": "center"});
  var plane2 = av.label("Half Plane 2",  {"top": topAlign + 175, "left": leftAlign + 400}).css
  ({'font-size': '16px', "text-align": "center"});
  var planeRect1 = av.g.rect(leftAlign + 0, topAlign + 165, 350, 55).css({"fill": "green", "opacity": 0.1});
  var planeRect2 = av.g.rect(leftAlign + 0, topAlign + 20, 350, 145).css({"fill": "blue", "opacity": 0.1});
  av.step();

  //Slide 9
  av.umsg("The regions newly split by the n'th line violate the rule for a two-coloring");
  planeRect1.hide();
  planeRect2.hide();
  av.step();

  //Slide 10
  av.umsg("If we take all regions on one side of the n'th line (say half plane 2) and reverse their coloring, we will end up having all the regions splitted by the n'th line properly two colored.")
  p4.hide();
  planeRect1.show();
  planeRect1.css({"fill": "green", "opacity": 0.1});
  var p5 = av.g.polyline([[leftAlign + 175, topAlign + 145], [leftAlign + 195, topAlign + 165], [leftAlign + 155, topAlign + 165]]).css({"fill": "gray"});
  var p6;
  var p7;
  av.step();

  //Slide 11
  av.umsg("<br><br> Thus, the entire plan now is two colored.", {"preserve": true});
  plane1.hide();
  plane2.hide();
  planeRect1.hide();
  av.recorded();
});
