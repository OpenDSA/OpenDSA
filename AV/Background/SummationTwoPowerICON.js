/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Summation of 2^i
$(document).ready(function() {
  "use strict";
  var av_name = "SummationTwoPowerICON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av;
  var rectHeight = 30;
  var rectWidth = 50;
  var leftAlign = 1;
  var topAlign = 30;
  var labelShift = 5;
  var set1; //To hold rectangles of i = 1
  var set2; //To hold rectangles of i = 2
  var set3; //To hold rectangles of i = 3
  var set4; //To hold rectangles of i = 4

  av = new JSAV(av_name);
  set1 = av.g.set();
  set2 = av.g.set();
  set3 = av.g.set();
  set4 = av.g.set();

  //Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  //Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  //Slide 3
  av.umsg(interpret("sc3.1"));
  av.umsg(interpret("sc3.2"), {preserve: true});
  var rect0 = av.g.rect(leftAlign, topAlign, rectWidth, rectHeight).addClass("highlight");
  var label0 = av.label("$i = 0$", {top: topAlign - 0.5 * rectHeight,
                                    left: leftAlign + rectWidth + labelShift});
  av.step();

  //Slide 4
  av.umsg(interpret("sc4.1"));
  av.umsg(interpret("sc4.2"), {preserve: true});
  rect0.removeClass("highlight");
  set1.push(av.g.rect(leftAlign, topAlign + rectHeight, rectWidth, rectHeight));
  set1.push(av.g.rect(leftAlign + rectWidth, topAlign + rectHeight, rectWidth, rectHeight));
  set1.css({fill: "red"});
  var label1 = av.label("$i = 1$", {top: topAlign - 0.5 * rectHeight + rectHeight,
                                    left: leftAlign + 2 * rectWidth + labelShift});
  av.step();

  //Slide 5
  av.umsg(interpret("sc5.1"));
  av.umsg(interpret("sc5.2"), {preserve: true});
  set1.css({fill: "none"});
  set2.push(av.g.rect(leftAlign, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.push(av.g.rect(leftAlign + rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign + 2 * rectHeight, rectWidth, rectHeight));
  set2.css({fill: "red"});
  var label2 = av.label("$i = 2$", {top: topAlign - 0.5 * rectHeight + 2 * rectHeight,
                                    left: leftAlign + 4 * rectWidth + labelShift});
  av.step();

  //Slide 6
  av.umsg(interpret("sc6.1"));
  av.umsg(interpret("sc6.2"), {preserve: true});
  set2.css({fill: "none"});
  set3.push(av.g.rect(leftAlign, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 2 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 3 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 4 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 5 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 6 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.push(av.g.rect(leftAlign + 7 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight));
  set3.css({fill: "red"});
  var label3 = av.label("$i = 3$", {top: topAlign - 0.5 * rectHeight + 3 * rectHeight,
                                    left: leftAlign + 8 * rectWidth + labelShift});
  av.step();

  //Slide 7
  av.umsg(interpret("sc7.1"));
  av.umsg(interpret("sc7.2"), {preserve: true});
  set3.css({fill: "none"});
  set4.push(av.g.rect(leftAlign, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +      rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  2 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  3 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  4 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  5 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  6 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  7 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  8 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign +  9 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 10 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 11 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 12 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 13 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 14 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.push(av.g.rect(leftAlign + 15 * rectWidth, topAlign + 4 * rectHeight, rectWidth, rectHeight));
  set4.css({fill: "red"});
  var label4 = av.label("$i = 4$", {top: topAlign - 0.5 * rectHeight + 4 * rectHeight,
                                    left: leftAlign + 16 * rectWidth + labelShift});
  av.step();

  //Slide 8
  av.umsg(interpret("sc8.1"));
  av.umsg(interpret("sc8.2"), {preserve: true});
  set4.css({fill: "none"});
  label0.hide();
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  av.step();

  //Slide 9
  set2.translate(8 * rectWidth, rectHeight);
  av.step();

  //Slide 10
  set1.translate(12 * rectWidth, 2 * rectHeight);
  av.step();

  //Slide 11
  rect0.translate(14 * rectWidth, 3 * rectHeight);
  av.step();

  //Slide 12
  av.umsg(interpret("sc12"));
  av.label("-1",  {top: topAlign - 0.5 * rectHeight + 3 * rectHeight,
                                     left: leftAlign + 16 * rectWidth + labelShift});
  av.label("|--------------------------------------------------------------------------- $2^4$  ---------------------------------------------------------------------------|",
           {top: topAlign - 0.5 * rectHeight + 2 * rectHeight, left: leftAlign + labelShift});
  av.g.rect(leftAlign + 15 * rectWidth, topAlign + 3 * rectHeight, rectWidth, rectHeight).css({fill: "black"});
  av.step();

  //Slide 13
  av.umsg(interpret("sc13"));
  av.recorded();
});
