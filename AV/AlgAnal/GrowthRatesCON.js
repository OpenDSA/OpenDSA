/*global ODSA */
// Written by Jieun Chon

$(document).ready(function() {
  "use strict";
  var av = new JSAV("GrowthRatesCON", {animationMode: "none"});

  var xStart = 50;
  var yStart1 = 50;
  var xWidth = 510;
  var yHeight = 300;
  var gapBetweenGraphs = 100;

  var xEnd = xStart + xWidth;
  var yEnd1 = yStart1 + yHeight;

  //x-axis 1
  av.g.line(xStart, yEnd1, xEnd, yEnd1, {"stroke-width": 2});

  //y-axis 2
  av.g.line(xStart, yStart1, xStart, yEnd1, {"stroke-width": 2});


  var yStart2 = yEnd1 + gapBetweenGraphs;
  var yEnd2 = yStart2 + yHeight;

  //x-axis 1
  av.g.line(xStart, yEnd2, xEnd, yEnd2, {"stroke-width": 2});

  //y-axis 2
  av.g.line(xStart, yStart2, xStart, yEnd2, {"stroke-width": 2});


  //draw x-asix lines for graph 1
  var stepx1 = xWidth/10;

  var x1 = xStart + stepx1;
  for(i = 0; i < 10; i++){
    av.g.line(x1, yEnd1 - 5, x1, yEnd1, {"stroke-width": 0.8});
    x1 += stepx1;
  }

  //draw x-asix lines for graph 2
  var stepx2 = xWidth/3;
  var x2 = xStart + stepx2;
  for(i = 0; i < 3; i++){
    av.g.line(x2, yEnd2 - 5, x2, yEnd2, {"stroke-width": 0.8});
    x2 += stepx2;
  }

  // draw y-asix lines for graph 1:
  var stepy1 = yHeight/15;
  var y1 = yEnd1 - stepy1;

  for(i = 0; i < 15; i++){
    av.g.line(xStart, y1, xStart + 5, y1, {"stroke-width": 0.8});
    y1 -= stepy1;
  }

  // draw y-asix lines for graph 1:
  var stepy2 = 70;
  var y2 = yEnd2 - stepy2;

  for(i = 0; i < 4; i++){
    av.g.line(xStart, y2, xStart + 5, y2, {"stroke-width": 0.8});
    y2 -= stepy2;
  }

  //x-asix labels

  //plot1
  av.label("0", {left: 30, top: yEnd1});
  av.label("10",  {left: 142, top: yEnd1});
  av.label("20",  {left: 244, top: yEnd1});
  av.label("30",  {left: 346, top: yEnd1});
  av.label("40",  {left: 448, top: yEnd1});
  av.label("50", {left: 550, top: yEnd1});

  //plot2
  av.label("0", {left: 30, top: yEnd2});
  av.label("5",  {left: 215, top: yEnd2});
  av.label("10",  {left: 380, top: yEnd2});
  av.label("15",  {left: 550, top: yEnd2});

  //y-asix labels
  //y-asix plot1 labels
  av.label("200",  {left: 10, top: yEnd1 - 65});
  av.label("400",  {left: 10, top: yEnd1 - 105});
  av.label("600",  {left: 10, top: yEnd1 - 145});
  av.label("800",  {left: 10, top: yEnd1 - 185});
  av.label("1000", {left: 5, top: yEnd1 - 225});
  av.label("1200", {left: 5, top: yEnd1 - 265});
  av.label("1400", {left: 5, top: yEnd1 - 305});


    //y-asix plot2 labels
  var labelY2 = yEnd2;
  av.label("100", {left: 10, top: yEnd2 - 95});
  av.label("200",  {left: 10, top: yEnd2 - 165});
  av.label("300",  {left: 10, top: yEnd2 - 235});
  av.label("400",  {left: 10, top: yEnd2 - 305});


  // stroke-dasharray="5,10,5"
  //horizontal lines
  var squareLine1 = av.g.line(50, yEnd1 - 90, 203, yEnd1 - 90);
  var squareLine2 = av.g.line(50, yEnd1, 203, yEnd1);

  //vertical lines
  var squareLine3 = av.g.line(50,  yEnd1 - 90, 50, yEnd1);
  var squareLine4 = av.g.line(203, yEnd1 - 90, 203, yEnd1);
  squareLine1.addClass("squareLine");
  squareLine2.addClass("squareLine");
  squareLine3.addClass("squareLine");
  squareLine4.addClass("squareLine");


  var line1 = av.g.line(50, yEnd1, xEnd, yEnd1 - 100); //plot1 10n
  var line2 = av.g.line(50, yEnd2, xEnd, yEnd2 - 100); //plot2 10n
  var line3 = av.g.line(50, yEnd1, xEnd, yEnd1 - 200); //plot1 20n
  var line4 = av.g.line(50, yEnd2, xEnd, yEnd2 - 200); //plot2 20n
  line1.addClass("dashLine");
  line2.addClass("dashLine");
  line3.addClass("dashLine");
  line4.addClass("dashLine");


  function drawLine(){
    val cal = 0;
    for(i = 0; i < 500; i++){
        cal = (5 * i * Math.log(i)) / 51;
        av.g.circle(50 + i, yEnd1 - cal, 0.5, {fill: 'black'}
    }
  }

  // drawLine();
  //5nlogn
  // var cal = 0;
  // for(i = 0; i < 500; i++){
  //     cal = (5 * i * Math.log(i)) / 51;
  //     av.g.circle(50 + i, yEnd1 - cal, 0.5, {fill: 'black'});
  //     // av.g.circle(50 + i, yEnd1 - cal, 0.5, {fill: 'black'});
  // }

  // //2(pow(n, 2))
  // for(i = 0; i < 270; i++){
  //     cal = (2 * Math.pow(i, 2)) / 510;
  //     av.g.circle(50 + i, yEnd1 - cal, 0.8, {fill: 'black'});
  // }

  // //2(pow(2, n))
  // for(i = 0; i < 510; i++){
  //     cal = (Math.pow(2, i)) * (0.02);
  //     av.g.circle(50 + (i * 102), yEnd1 - cal, 2, {fill: 'black'});
  // }

  // for(i = 0; i < 510; i++){
  //     var cal = (5 * i * Math.log(i)) / 51;
  //     av.g.circle(50 + i, yEnd1 - cal, 0.5, {fill: 'black'});
  // }

  av.displayInit();
	av.recorded();

});
