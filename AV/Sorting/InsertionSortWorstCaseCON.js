/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Insertion Sort Worst Case

// Title: Insertion Sort Worst Case Analysis
// Author: Mohammed Farghally; Cliff Shaffer
// Institution: Virginia Tech
// Features: Code Tracing Visualization; Algorithm Analysis Demonstration
// Keyword: Insertion Sort; Worst Case
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing an analysis of Insertion Sort's worst-case behavior and cost. */
 
$(document).ready(function() {
  "use strict";
  var av_name = "InsertionSortWorstCaseCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code; // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]).hide();
  var arr;
  var yoffset = -20;
  var leftAlign = 320;
  var topAlign = 290 + yoffset;
  var rectWidth = 50;
  var rectHeight = 20;
  var labelGap = 5;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.show();
  //  pseudo.css("loops", {"background-color":"#99FF00"});
  pseudo.highlight("loops");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  pseudo.unhighlight("loop2");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("loop1");
  pseudo.highlight("loop2");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  pseudo.unhighlight("loop2");
  arr = av.ds.array([6, 5, 4, 3, 2, 1], {
    left: 10,
    top: 150,
    indexed: true
  });
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arr.swap(0, 1);
  av.g.rect(leftAlign, topAlign, 50, 20);
  av.label("$i=1$", {
    top: 300 + yoffset,
    left: 330
  });
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  arr.swap(1, 2);
  av.g.rect(leftAlign + rectWidth, topAlign, 50, 20);
  av.label("$i=2$", {
    top: 300 + yoffset,
    left: 380
  });
  av.step();

  // Slide 8
  arr.swap(0, 1);
  av.g.rect(leftAlign + rectWidth, topAlign - rectHeight, 50, 20);
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.swap(2, 3);
  av.g.rect(leftAlign + 2 * rectWidth, topAlign, 50, 20);
  av.label("$i=3$", {
    top: 300 + yoffset,
    left: 430
  });
  av.step();

  // Slide 10
  arr.swap(1, 2);
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - rectHeight, 50, 20);
  av.step();

  // Slide 11
  arr.swap(0, 1);
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight, 50, 20);
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  arr.swap(3, 4);
  av.g.rect(leftAlign + 3 * rectWidth, topAlign, 50, 20);
  av.label("$i=4$", {
    top: 300 + yoffset,
    left: 480
  });
  av.step();

  // Slide 13
  arr.swap(2, 3);
  av.g.rect(leftAlign + 3 * rectWidth, topAlign - rectHeight, 50, 20);
  av.step();

  // Slide 14
  arr.swap(1, 2);
  av.g.rect(leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight, 50, 20);
  av.step();

  // Slide 15
  arr.swap(0, 1);
  av.g.rect(leftAlign + 3 * rectWidth, topAlign - 3 * rectHeight, 50, 20);
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  arr.swap(4, 5);
  av.g.rect(leftAlign + 4 * rectWidth, topAlign, 50, 20);
  av.label("$i=5$", {
    top: 300 + yoffset,
    left: 530
  });
  av.step();

  // Slide 17
  arr.swap(3, 4);
  av.g.rect(leftAlign + 4 * rectWidth, topAlign - rectHeight, 50, 20);
  av.step();

  // Slide 18
  arr.swap(2, 3);
  av.g.rect(leftAlign + 4 * rectWidth, topAlign - 2 * rectHeight, 50, 20);
  av.step();

  // Slide 19
  arr.swap(1, 2);
  av.g.rect(leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight, 50, 20);
  av.step();

  // Slide 20
  arr.swap(0, 1);
  av.g.rect(leftAlign + 4 * rectWidth, topAlign - 4 * rectHeight, 50, 20);
  av.step();

  // Slide 21
  av.umsg(interpret("sc21"));
  var rect5 = av.g.rect(310, 260 + yoffset, 268, 1);
  rect5.rotate(-22);

  //Horizontal Line
  av.g.line(leftAlign, 3 * rectHeight + topAlign,
            leftAlign + 2 * rectWidth,
            3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.g.line(leftAlign + 3 * rectWidth,
            3 * rectHeight + topAlign, leftAlign + 5 * rectWidth,
            3 * rectHeight + topAlign,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign, 2.5 * rectHeight + topAlign,
            leftAlign, 3.5 * rectHeight + topAlign);
  av.g.line(leftAlign + 5 * rectWidth, 2.5 * rectHeight + topAlign,
            leftAlign + 5 * rectWidth, 3.5 * rectHeight + topAlign);
  av.label("$n - 1$",
           {top: topAlign + 1.5 * rectHeight,
             left: leftAlign + 2 * rectWidth + labelGap});

  //Vertical Line
  av.g.line(leftAlign + 5.5 * rectWidth, topAlign - rectHeight,
            leftAlign + 5.5 * rectWidth,
            topAlign +  rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});

  av.g.line(leftAlign + 5.5 * rectWidth, topAlign - 2 * rectHeight,
            leftAlign + 5.5 * rectWidth,
            topAlign -  4 * rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign + 5.75 * rectWidth, topAlign + rectHeight,
            leftAlign + 5.25 * rectWidth, topAlign + rectHeight);
  av.g.line(leftAlign + 5.75 * rectWidth, topAlign - 4 * rectHeight,
            leftAlign + 5.25 * rectWidth, topAlign - 4 * rectHeight);
  av.label("$n - 1$",
           {top: topAlign - 3 * rectHeight,
             left: leftAlign + 5 * rectWidth + labelGap});
  av.step();

  // Slide 22
  av.umsg(interpret("sc22_1"));
  av.g.polyline([
    [320, 310 + yoffset],
    [570, 310 + yoffset],
    [570, 210 + yoffset]
  ]).addClass("bigTriangle");
  av.step();
  
  // Slide 23
  av.umsg(interpret("sc22_2"), {
    preserve: true
  });
  av.g.polyline([
    [320, 310 + yoffset],
    [320, 290 + yoffset],
    [370, 290 + yoffset]
  ]).addClass("smallTriangle");
  av.g.polyline([
    [370, 290 + yoffset],
    [370, 270 + yoffset],
    [420, 270 + yoffset]
  ]).addClass("smallTriangle");
  av.g.polyline([
    [420, 270 + yoffset],
    [420, 250 + yoffset],
    [470, 250 + yoffset]
  ]).addClass("smallTriangle");
  av.g.polyline([
    [470, 250 + yoffset],
    [470, 230 + yoffset],
    [520, 230 + yoffset]
  ]).addClass("smallTriangle");
  av.g.polyline([
    [520, 230 + yoffset],
    [520, 210 + yoffset],
    [570, 210 + yoffset]
  ]).addClass("smallTriangle");
  av.step();

  //Slide 23
  av.umsg(interpret("sc23"));
  av.step();

  // Slide 24
  av.umsg(interpret("sc24"));
  av.recorded();
});
