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
  av.umsg(interpret("av_c1"));
  av.displayInit();

  //Slide 2
  av.umsg(interpret("av_c2"));
  av.step();

  //Slide 3
  av.umsg(interpret("av_c3.1"));
  av.umsg(interpret("av_c3.2"), {preserve: true});
  var rect1 = av.g.rect(leftAlign, topAlign, rectWidth, rectHeight).css({"fill":"red"});
  av.label("$i = 1$",  {top: topAlign + 12, left: leftAlign + 10});
  av.step();

  //Slide 4
  av.umsg(interpret("av_c4.1"));
  av.umsg(interpret("av_c4.2"), {preserve: true});
  rect1.css({"fill":"none"});
  var rect21 = av.g.rect(leftAlign + rectWidth, topAlign, rectWidth, rectHeight).css({"fill":"red"});
  var rect22 = av.g.rect(leftAlign + rectWidth, topAlign - rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  av.label("$i = 2$",  {top: topAlign + 12, left: leftAlign + rectWidth + 10});
  av.step();

  //Slide 5
  av.umsg(interpret("av_c5.1"));
  av.umsg(interpret("av_c5.2"), {preserve: true});
  rect21.css({"fill":"none"});
  rect22.css({"fill":"none"});
  var rect31 = av.g.rect(leftAlign + 2 * rectWidth, topAlign, rectWidth, rectHeight).css({"fill":"red"});
  var rect32 = av.g.rect(leftAlign + 2 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  var rect33 = av.g.rect(leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  av.label("$i = 3$",  {top: topAlign + 12, left: leftAlign + 2 * rectWidth + 10});
  av.step();

  //Slide 6
  av.umsg(interpret("av_c6.1"));
  av.umsg(interpret("av_c6.2"), {preserve: true});
  rect31.css({"fill":"none"});
  rect32.css({"fill":"none"});
  rect33.css({"fill":"none"});
  var rect41 = av.g.rect(leftAlign + 3 * rectWidth, topAlign, rectWidth, rectHeight).css({"fill":"red"});
  var rect42 = av.g.rect(leftAlign + 3 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  var rect43 = av.g.rect(leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  var rect44 = av.g.rect(leftAlign + 3 * rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  av.label("$i = 4$",  {top: topAlign + 12, left: leftAlign + 3 * rectWidth + 10});
  av.step();

  //Slide 7
  av.umsg(interpret("av_c7.1"));
  av.umsg(interpret("av_c7.2"), {preserve: true});
  rect41.css({"fill":"none"});
  rect42.css({"fill":"none"});
  rect43.css({"fill":"none"});
  rect44.css({"fill":"none"});
  var rect51 = av.g.rect(leftAlign + 4 * rectWidth, topAlign, rectWidth, rectHeight).css({"fill":"red"});
  var rect52 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  var rect53 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  var rect54 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  var rect55 = av.g.rect(leftAlign + 4 * rectWidth, topAlign - 4 * rectHeight, rectWidth, rectHeight).css({"fill":"red"});
  av.label("$i = 5$",  {top: topAlign + 12, left: leftAlign + 4 * rectWidth + 10});
  av.step();

  //Slide 8
  av.umsg(interpret("av_c8"));
  rect51.css({"fill":"none"});
  rect52.css({"fill":"none"});
  rect53.css({"fill":"none"});
  rect54.css({"fill":"none"});
  rect55.css({"fill":"none"});
  av.label("|---------------- $n$ ------------------|",
           {top: topAlign + 25, left: leftAlign + 20}).css({"font-size": "16px", "text-align": "center"});
  av.label("|------- $n$ -------|",
           {top: topAlign - 60, left: leftAlign + 5 * rectWidth - 35}).css({"font-size": "16px", "text-align": "center"}).addClass("rotated");
  av.step();

  //Slide 9
  av.umsg(interpret("av_c9"));
  av.g.line(leftAlign, topAlign + rectHeight, leftAlign + 5 * rectWidth, topAlign - 4 * rectHeight);
  av.g.polyline([[leftAlign, topAlign + rectHeight],
                 [leftAlign + 5 * rectWidth, topAlign - 4 * rectHeight],
                 [leftAlign + 5 * rectWidth, topAlign + rectHeight]]).css({fill: "blue", opacity: 0.2});
  av.step();

  //Slide 10
  av.umsg(interpret("av_c10"), {preserve: true});
  av.g.polyline([[leftAlign, topAlign + rectHeight],
                 [leftAlign, topAlign],
                 [leftAlign + rectWidth, topAlign]]).css({fill: "green", opacity: 0.2});
  av.g.polyline([[leftAlign + rectWidth, topAlign],
                 [leftAlign + rectWidth, topAlign - rectHeight],
                 [leftAlign + 2 * rectWidth, topAlign - rectHeight]]).css({fill: "green", opacity: 0.2});
  av.g.polyline([[leftAlign + 2 * rectWidth, topAlign - rectHeight],
                 [leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight],
                 [leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight]]).css({fill: "green", opacity: 0.2});
  av.g.polyline([[leftAlign + 3 * rectWidth, topAlign - 2 * rectHeight],
                 [leftAlign + 3 * rectWidth, topAlign - 3 * rectHeight],
                 [leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight]]).css({fill: "green", opacity: 0.2});
  av.g.polyline([[leftAlign + 4 * rectWidth, topAlign - 3 * rectHeight],
                 [leftAlign + 4 * rectWidth, topAlign - 4 * rectHeight],
                 [leftAlign + 5 * rectWidth, topAlign - 4 * rectHeight]]).css({fill: "green", opacity: 0.2});
  av.step();

  //Slide 11
  av.umsg(interpret("av_c11"));
  av.step();

  //Slide 12
  av.umsg(interpret("av_c12"));
  av.recorded();
});
