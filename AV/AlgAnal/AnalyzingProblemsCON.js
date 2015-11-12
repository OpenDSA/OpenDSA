/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Upper Bounds definition
$(document).ready(function () {
  var av_name = "AnalyzingProblemsCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  var top = 0;
  var left = 150;
  var yLength = 400;
  var xLength = 450;
  var numPoints = 5;
  var i;
  
  // Slide 1
  av.umsg(interpret("Slide 1"));
  
  //Draw the axis
  var axis = av.g.polyline([[left, top], [left, top + yLength], [left + xLength, top + yLength]]);
  var xLabel = av.label("Input of Size $n$",  {"top": top + yLength - 10, "left": left + xLength + 10}).css
  ({'font-size': '16px', "text-align": "center"});
  var yLabel = av.label("Cost",  {"top": top - 20, "left": left - 75}).css
  ({'font-size': '16px', "text-align": "center"});
  var origin = av.label("$(0,0)$",  {"top": top + yLength - 10, "left": left - 20}).css
  ({'font-size': '16px', "text-align": "center"});

  //Draw the points
  var points = [];
  for(i = 0; i < numPoints; i++){
    points.push(av.label("*",  {"top": Math.floor((Math.random() * 300) + top), 
                                "left": Math.floor((Math.random() * 400) + left)}));
  }
  av.displayInit();

  //Slide 2
  av.umsg(interpret("Slide 2"), {preserve: true});
  
  //Getting the highest point
  var maxIndex = 0;
  for(i = 1; i < numPoints; i++){
    if(points[i].options.top < points[maxIndex].options.top){
      maxIndex = i;
    }
  }
  points[maxIndex].css({"color": "red"});
  
  var worstInputLine = av.g.line(points[maxIndex].options.left + 5, points[maxIndex].options.top + 35,
                                      points[maxIndex].options.left + 5, top + yLength).addClass("dashed");

  var worstCostLine = av.g.line(points[maxIndex].options.left - 5, points[maxIndex].options.top + 20,
                                      left, points[maxIndex].options.top + 20).addClass("dashed");

  var worstInput = av.label("Worst Case Input",  {"top": top + yLength - 10, 
    "left": points[maxIndex].options.left}).css({'font-size': '12px', "text-align": "center", "color":"red"});

  var worstCost = av.label("Worst Case Cost",  {"top": points[maxIndex].options.top + 10, 
    "left": left - 100}).css({'font-size': '12px', "text-align": "center", "color":"red"});
  

  av.step();

  //Slide 3
  av.umsg(interpret("Slide 3"));
  for(i = 0; i < numPoints; i++){
    points[i].hide();
  }
  axis.hide();
  worstInputLine.hide();
  worstCostLine.hide();
  worstInput.hide();
  worstCost.hide();
  xLabel.hide();
  yLabel.hide();
  origin.hide();
  av.step();

  //Slide 4
  //Draw 4 smaller versions of the previous graph
  av.umsg(interpret("Slide 4"), {preserve: true});
  
  var leftSpace = 0;
  var topSpace = 0;
  axis = [];
  worstInputLine = [];
  worstCostLine = [];
  worstInput = [];
  worstCost = [];
  xLabel = [];
  yLabel = [];
  origin = [];
  points = [[]];
  yLength = 150;
  xLength = 200;
  numPoints = 5;
  var highestPoints = [];
  

  for(i = 0; i < 4; i++){
    if(i === 1){
      leftSpace += 350;
    }
    if(i === 2){
      leftSpace -= 350;
      topSpace += 250;
    }
    if(i === 3){
      leftSpace += 350;
    }
    points[i] = [];
    top = 10 + topSpace;
    left = 150 + leftSpace;
    //Draw the axis
    axis.push(av.g.polyline([[left, top], [left, top + yLength], [left + xLength, top + yLength]]));
    xLabel.push(av.label("Input of Size $n$",  {"top": top + yLength - 5, "left": left + xLength + 10}).css
    ({'font-size': '12px', "text-align": "center"}));
    yLabel.push(av.label("Cost",  {"top": top - 15, "left": left - 50}).css
    ({'font-size': '12px', "text-align": "center"}));
    origin.push(av.label("$(0,0)$",  {"top": top + yLength - 10, "left": left - 20}).css
    ({'font-size': '12px', "text-align": "center"}));

    //Draw the points
    for(var k = 0; k < numPoints; k++){
      points[i][k] = av.label("*",  {"top": Math.floor((Math.random() * 75) + top), 
                                "left": Math.floor((Math.random() * 120) + left)});
    }
 
    //Getting the highest point
    maxIndex = 0;
    for(var j = 1; j < numPoints; j++){
      if(points[i][j].options.top < points[i][maxIndex].options.top){
        maxIndex = j;
      }
    }
    points[i][maxIndex].css({"color": "red"});
    highestPoints[i] = points[i][maxIndex];
    highestPoints[i].top = top;
  
    worstInputLine.push(av.g.line(points[i][maxIndex].options.left + 5, points[i][maxIndex].options.top + 35,
                                      points[i][maxIndex].options.left + 5, top + yLength).addClass("dashed"));

    worstCostLine.push(av.g.line(points[i][maxIndex].options.left - 5, points[i][maxIndex].options.top + 20,
                                      left, points[i][maxIndex].options.top + 20).addClass("dashed"));

    worstInput.push(av.label("Worst Case Input",  {"top": top + yLength - 10, 
    "left": points[i][maxIndex].options.left}).css({'font-size': '10px', "text-align": "center", "color":"red"}));

    worstCost.push(av.label("Worst Case Cost",  {"top": points[i][maxIndex].options.top + 10, 
    "left": left - 100}).css({'font-size': '10px', "text-align": "center", "color":"red"}));
  }
  av.step();

  //Slide 5
  av.umsg(interpret("Slide 5"));

  //Finding the lowest highest point
  var minIndex = 0;
  for(i = 1; i < 4; i++){
    if((highestPoints[i].options.top - highestPoints[i].top) > 
      (highestPoints[minIndex].options.top - highestPoints[minIndex].top)){
      minIndex = i;
    }
  }  
  //highestPoints[minIndex].css({"color":"blue"});
  av.g.circle(highestPoints[minIndex].options.left + 2, highestPoints[minIndex].options.top + 20, 10, {stroke: "green"});

  av.step();

  av.recorded();
});
