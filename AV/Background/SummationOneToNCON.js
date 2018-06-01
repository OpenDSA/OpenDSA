/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Summation for 1 to N
$(document).ready(function() {
  "use strict";
  var av_name = "SummationOneToNCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av;
  var rectHeight = 25;
  var rectWidth = 50;
  var leftAlign = 300;
  var topAlign = 110;

  av = new JSAV(av_name);

  //Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  //Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  //Slide 3
  av.umsg(interpret("sc3.1"));
  av.umsg(interpret("sc3.2"), {preserve: true});
  var rect1 = av.g.rect(leftAlign, topAlign, rectWidth, rectHeight).addClass("highlight");
  av.label("$i = 1$",  {top: topAlign + 12, left: leftAlign + 10});
  av.step();

  //Slide 4
  av.umsg(interpret("sc4.1"));
  av.umsg(interpret("sc4.2"), {preserve: true});
  rect1.removeClass("highlight");
  var rect21 = av.g.rect(leftAlign + rectWidth, topAlign, rectWidth, rectHeight).addClass("highlight");
  var rect22 = av.g.rect(leftAlign + rectWidth, topAlign - rectHeight, rectWidth, rectHeight).addClass("highlight");
  av.label("$i = 2$",  {top: topAlign + 12, left: leftAlign + rectWidth + 10});
  av.step();

  //Slide 5
  av.umsg(interpret("sc5.1"));
  av.umsg(interpret("sc5.2"), {preserve: true});
  rect21.removeClass("highlight");
  rect22.removeClass("highlight");
  var rect31 = av.g.rect(leftAlign + 2 * rectWidth, topAlign, rectWidth, rectHeight).addClass("highlight");
  var rect32 = av.g.rect(leftAlign + 2 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight).addClass("highlight");
  var rect33 = av.g.rect(leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight).addClass("highlight");
  av.label("$i = 3$",  {top: topAlign + 12, left: leftAlign + 2 * rectWidth + 10});
  av.step();

  //Slide 6
  av.umsg(interpret("sc6.1"));
  av.umsg(interpret("sc6.2"), {preserve: true});
  rect31.removeClass("highlight");
  rect32.removeClass("highlight");
  rect33.removeClass("highlight");
  var rect41 = av.g.rect(leftAlign + 3 * rectWidth, topAlign, rectWidth, rectHeight).addClass("highlight");
  var rect42 = av.g.rect(leftAlign + 3 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight).addClass("highlight");
  var rect43 = av.g.rect(leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight).addClass("highlight");
  var rect44 = av.g.rect(leftAlign + 3 * rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight).addClass("highlight");
  av.label("$i = 4$",  {top: topAlign + 12, left: leftAlign + 3 * rectWidth + 10});
  av.step();

  //Slide 7
  av.umsg(interpret("sc7.1"));
  av.umsg(interpret("sc7.2"), {preserve: true});
  rect41.removeClass("highlight");
  rect42.removeClass("highlight");
  rect43.removeClass("highlight");
  rect44.removeClass("highlight");
  var rect51 = av.g.rect(leftAlign + 4 * rectWidth, topAlign, rectWidth, rectHeight).addClass("highlight");
  var rect52 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight).addClass("highlight");
  var rect53 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight).addClass("highlight");
  var rect54 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight).addClass("highlight");
  var rect55 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - 4 * rectHeight, rectWidth, rectHeight).addClass("highlight");
  av.label("$i = 5$",  {top: topAlign + 12, left: leftAlign + 4 * rectWidth + 10});
  av.step();

  //Slide 8
  av.umsg(interpret("sc8"));
  rect51.removeClass("highlight");
  rect52.removeClass("highlight");
  rect53.removeClass("highlight");
  rect54.removeClass("highlight");
  rect55.removeClass("highlight");
  av.g.line(leftAlign + 0.25 * rectWidth, topAlign + 2.25 * rectHeight,
            leftAlign + 2.25 * rectWidth, topAlign + 2.25 * rectHeight,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.label("$n$",
           {top: topAlign + rectHeight,
             left: leftAlign + 2.35 * rectWidth});
  av.g.line(leftAlign + 2.75 * rectWidth, topAlign + 2.25 * rectHeight,
            leftAlign + 4.75 * rectWidth, topAlign + 2.25 * rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign + 5.25 * rectWidth, topAlign - 3.75 * rectHeight,
            leftAlign + 5.25 * rectWidth, topAlign - 1.75 * rectHeight,
            {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  av.label("$n$",
           {top: topAlign - 2.35 * rectHeight,
             left: leftAlign + 5.15 * rectWidth});
  av.g.line(leftAlign + 5.25 * rectWidth, topAlign - 0.75 * rectHeight,
            leftAlign + 5.25 * rectWidth, topAlign + rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.step();

  //Slide 9
  av.umsg(interpret("sc9"));
  av.g.line(leftAlign, topAlign + rectHeight, leftAlign + 5 * rectWidth, topAlign - 4 * rectHeight);
  av.g.polyline(
    [[leftAlign, topAlign + rectHeight],
      [leftAlign + 5 * rectWidth, topAlign - 4 * rectHeight],
      [leftAlign + 5 * rectWidth, topAlign + rectHeight]]).css({fill: "blue", opacity: 0.2});
  av.step();

  //Slide 10
  av.umsg(interpret("sc10"), {preserve: true});
  av.g.polyline([[leftAlign, topAlign + rectHeight],
    [leftAlign, topAlign],
    [leftAlign + rectWidth, topAlign]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + rectWidth, topAlign],
    [leftAlign + rectWidth, topAlign - rectHeight],
    [leftAlign + 2 * rectWidth, topAlign - rectHeight]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + 2 * rectWidth, topAlign - rectHeight],
    [leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight],
    [leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight],
    [leftAlign + 3 * rectWidth, topAlign - 3 * rectHeight],
    [leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight]]).addClass("smallTriangle");
  av.g.polyline([[leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight],
    [leftAlign + 4 * rectWidth, topAlign - 4 * rectHeight],
    [leftAlign + 5 * rectWidth, topAlign - 4 * rectHeight]]).addClass("smallTriangle");
  av.step();

  //Slide 11
  av.umsg(interpret("sc11"));
  av.step();

  //Slide 12
  av.umsg(interpret("sc12"));
  av.recorded();
});
