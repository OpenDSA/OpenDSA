/*global ODSA */
// Written by Jieun Chon

$(document).ready(function() {
  "use strict";
  var av = new JSAV("ReduceSimpPCON", {animationMode: "none"});

  //x-axis
  av.g.line(0, 450, 840, 450, {"stroke-width": 2});

  //y-axis
  av.g.line(410, 30, 410, 460, {"stroke-width": 2});

  var step = 40;
  var x1 = 370;
  var x2 = 450;
  var y = 50;

  //draw y-axis lines
  for(i = 0; i < 10; i++){
    av.g.line(400, y, 420, y, {"stroke-width": 0.8});
    y += step;
  }

  //draw x-axis lines
  for(i = 0; i < 10; i++){
    av.g.line(x1, 440, x1, 460, {"stroke-width": 0.8});
    av.g.line(x2, 440, x2, 460, {"stroke-width": 0.8});
    x1 -= step;
    x2 += step
  }


  //x-axis labels
  av.label("-3", {left: 285, top: 450});
  av.label("0",  {left: 405, top: 450});
  av.label("2",  {left: 485, top: 450});
  av.label("5",  {left: 605, top: 450});
  av.label("10", {left: 800, top: 450});

  //y-axis labels
  av.label("1", {left: 380, top: 385});
  av.label("2", {left: 380, top: 345});
  av.label("3", {left: 380, top: 305});
  av.label("9", {left: 380, top: 65});

  //(10, 0) to (-3,9)
  av.g.line(810, 450, 280, 72, {"stroke-width": 3, stroke:"blue"});

  //(-3,9) to (0, 100)
  av.g.line(280, 72, 410, 50, {"stroke-width": 3, stroke:"blue"});

  //(0, 100) to (2, 96)
  av.g.line(410, 50, 490, 58, {"stroke-width": 3, stroke:"blue"});

  //(2, 96) to (5, 75)
  av.g.line(490, 58, 610, 103, {"stroke-width": 3, stroke:"blue"});

  //(5, 75) to (10, 0)
  av.g.line(610, 103, 810, 450, {"stroke-width": 3, stroke:"blue"});

  //point labels and points
  av.label("(-3, $\\sqrt{91}$)", {left: 260, top: 20});
  av.label("(2, $\\sqrt{96}$)", {left: 490, top: 15});
  av.label("(5, $\\sqrt{75}$)", {left: 620, top: 70});

  av.g.circle(280, 72, 5, {fill: 'black'});  // -3,  91
  av.g.circle(410, 50, 5, {fill: 'black'});  //  0, 100
  av.g.circle(490, 58, 5, {fill: 'black'});  //  2,  96
  av.g.circle(610, 103, 5, {fill: 'black'}); //  5,  75
  av.g.circle(810, 450, 5, {fill: 'black'}); // 10,   0
  //formula for y
  // var y = 450 - Math.sqrt(400 - Math.pow((x - 410), 2));

var poly = "M 10, 450 A 50 50 0 1 1 810 450";
av.g.path(poly, {"stroke-width": 1, stroke: "gray"});


  av.displayInit();
	av.recorded();

});
