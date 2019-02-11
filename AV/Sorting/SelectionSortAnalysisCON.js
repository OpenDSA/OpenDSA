/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Selection Sort Analysis
$(document).ready(function() {
  "use strict";
  var av_name = "SelectionSortAnalysisCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var arr;
  var arr_values = [];
  var leftAlign = 250;
  var topAlign = 150;
  var rectWidth = 50;
  var rectHeight = 20;
  var topGap = 10;
  var gap = 325;
  var labelGap = 5;

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  for (var i = 0; i < 6; i++) {
    arr_values[i] = parseInt(Math.random() * 20, 10);
  }
  arr = av.ds.array(arr_values, {left: 0, top: 50, indexed: true});
  av.label(interpret("lab1"),  {top: topAlign - 150, left: leftAlign + 25}).addClass("largeLabel");
  av.label(interpret("lab2"),  {top: topAlign - 150, left: leftAlign + gap + 50}).addClass("largeLabel");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  var bigIndex = 0;
  var pointer = av.pointer("Big-index", arr.index(bigIndex));
  arr.addClass(bigIndex, "greenbg");
  av.step();

  // Slide 5
  arr.highlight(1);
  av.label("$i=0$",  {top: topAlign + topGap, left: leftAlign + 7});
  av.g.rect(leftAlign, topAlign, rectWidth, rectHeight);
  av.step();

  // Slide 6
  av.clearumsg();
  if (arr.value(1) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(1));
    bigIndex = 1;
    arr.addClass(1, "greenbg");
  }
  arr.unhighlight(1);
  av.step();

  arr.highlight(2);
  av.g.rect(leftAlign, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 7
  if (arr.value(2) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(2));
    bigIndex = 2;
    arr.addClass(2, "greenbg");
  }
  arr.unhighlight(2);
  av.step();

  arr.highlight(3);
  av.g.rect(leftAlign, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 8
  if (arr.value(3) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(3));
    bigIndex = 3;
    arr.addClass(3, "greenbg");
  }
  arr.unhighlight(3);
  av.step();

  arr.highlight(4);
  av.g.rect(leftAlign, topAlign - 3 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 9
  if (arr.value(4) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(4));
    bigIndex = 4;
    arr.addClass(4, "greenbg");
  }
  arr.unhighlight(4);
  av.step();

  arr.highlight(5);
  av.g.rect(leftAlign, topAlign - 4 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 10
  if (arr.value(5) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(5));
    bigIndex = 5;
    arr.addClass(5, "greenbg");
  }
  arr.unhighlight(5);
  av.step();

  arr.swap(bigIndex, 5);
  arr.removeClass(bigIndex, "greenbg");
  arr.addClass(5, "deemph");
  av.g.rect(leftAlign + gap, topAlign, rectWidth, rectHeight);
  av.label("$i=0$",  {top: topAlign + topGap, left: leftAlign + gap + 7});
  bigIndex = 0;
  pointer.target(arr.index(bigIndex));
  arr.addClass(bigIndex, "greenbg");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  arr.highlight(1);
  av.label("$i=1$",  {top: topAlign + topGap, left: leftAlign + rectWidth + 7});
  av.g.rect(leftAlign + rectWidth, topAlign, rectWidth, rectHeight);
  av.step();

  // Slide 12
  av.clearumsg();
  if (arr.value(1) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(1));
    bigIndex = 1;
    arr.addClass(1, "greenbg");
  }
  arr.unhighlight(1);
  av.step();

  arr.highlight(2);
  av.g.rect(leftAlign + rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 13
  if (arr.value(2) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(2));
    bigIndex = 2;
    arr.addClass(2, "greenbg");
  }
  arr.unhighlight(2);
  av.step();

  arr.highlight(3);
  av.g.rect(leftAlign + rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 14
  if (arr.value(3) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(3));
    bigIndex = 3;
    arr.addClass(3, "greenbg");
  }
  arr.unhighlight(3);
  av.step();

  arr.highlight(4);
  av.g.rect(leftAlign + rectWidth, topAlign - 3 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 15
  if (arr.value(4) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(4));
    bigIndex = 4;
    arr.addClass(4, "greenbg");
  }
  arr.unhighlight(4);
  av.step();

  arr.swap(bigIndex, 4);
  arr.removeClass(bigIndex, "greenbg");
  arr.addClass(4, "deemph");
  av.g.rect(leftAlign + gap + rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i=1$",  {top: topAlign + topGap, left: leftAlign + gap + rectWidth + 7});
  bigIndex = 0;
  pointer.target(arr.index(bigIndex));
  arr.addClass(bigIndex, "greenbg");
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  arr.highlight(1);
  av.label("$i=2$",  {top: topAlign + topGap, left: leftAlign + 2 * rectWidth + 7});
  av.g.rect(leftAlign + 2 * rectWidth, topAlign, rectWidth, rectHeight);
  av.step();

  // Slide 17
  av.clearumsg();
  if (arr.value(1) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(1));
    bigIndex = 1;
    arr.addClass(1, "greenbg");
  }
  arr.unhighlight(1);
  av.step();

  arr.highlight(2);
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 18
  if (arr.value(2) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(2));
    bigIndex = 2;
    arr.addClass(2, "greenbg");
  }
  arr.unhighlight(2);
  av.step();

  arr.highlight(3);
  av.g.rect(leftAlign + 2 * rectWidth, topAlign - 2 * rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 19
  if (arr.value(3) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(3));
    bigIndex = 3;
    arr.addClass(3, "greenbg");
  }
  arr.unhighlight(3);
  av.step();

  arr.swap(bigIndex, 3);
  arr.removeClass(bigIndex, "greenbg");
  arr.addClass(3, "deemph");
  av.g.rect(leftAlign + gap + 2 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i=2$", {top: topAlign + topGap, left: leftAlign + gap + 2 * rectWidth + 7});
  bigIndex = 0;
  pointer.target(arr.index(bigIndex));
  arr.addClass(bigIndex, "greenbg");
  av.step();

  // Slide 20
  av.umsg(interpret("sc20"));
  arr.highlight(1);
  av.label("$i=3$",  {top: topAlign + topGap, left: leftAlign + 3 * rectWidth + 7});
  av.g.rect(leftAlign + 3 * rectWidth, topAlign, rectWidth, rectHeight);
  av.step();

  // Slide 21
  av.clearumsg();
  if (arr.value(1) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(1));
    bigIndex = 1;
    arr.addClass(1, "greenbg");
  }
  arr.unhighlight(1);
  av.step();

  arr.highlight(2);
  av.g.rect(leftAlign + 3 * rectWidth, topAlign - rectHeight, rectWidth, rectHeight);
  av.step();

  // Slide 22
  if (arr.value(2) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(2));
    bigIndex = 2;
    arr.addClass(2, "greenbg");
  }
  arr.unhighlight(2);
  av.step();

  arr.swap(bigIndex, 2);
  arr.removeClass(bigIndex, "greenbg");
  arr.addClass(2, "deemph");
  av.g.rect(leftAlign + gap + 3 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i=3$",  {top: topAlign + topGap, left: leftAlign + gap + 3 * rectWidth + 7});
  bigIndex = 0;
  pointer.target(arr.index(bigIndex));
  arr.addClass(bigIndex, "greenbg");
  av.step();

  // Slide 23
  av.umsg(interpret("sc23"));
  arr.highlight(1);
  av.label("$i=4$",  {top: topAlign + topGap, left: leftAlign + 4 * rectWidth + 7});
  av.g.rect(leftAlign + 4 * rectWidth, topAlign, rectWidth, rectHeight);
  av.step();
  av.clearumsg();
  if (arr.value(1) > arr.value(bigIndex)) {
    arr.removeClass(bigIndex, "greenbg");
    pointer.target(arr.index(1));
    bigIndex = 1;
    arr.addClass(1, "greenbg");
  }
  arr.unhighlight(1);
  av.step();

  arr.swap(bigIndex, 1);
  arr.removeClass(bigIndex, "greenbg");
  arr.addClass(1, "deemph");
  av.g.rect(leftAlign + gap + 4 * rectWidth, topAlign, rectWidth, rectHeight);
  av.label("$i=4$",  {top: topAlign + topGap, left: leftAlign + gap + 4 * rectWidth + 7});
  pointer.hide();
  arr.addClass(0, "deemph");
  av.step();

  // Slide 24
  av.umsg(interpret("sc24"));

  //Horizontal Line (Bubble)
  av.g.line(leftAlign, 3 * rectHeight + topAlign,
            leftAlign + 2 * rectWidth, 3 * rectHeight + topAlign,
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

  //Vertical Line (Bubble)
  av.g.line(leftAlign - 0.5 * rectWidth, topAlign - rectHeight,
            leftAlign - 0.5 * rectWidth, topAlign +  rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign - 0.5 * rectWidth, topAlign - 2 * rectHeight,
            leftAlign - 0.5 * rectWidth, topAlign -  4 * rectHeight,
            {"stroke-width": 2, "arrow-end": "classic-wide-long"});
  av.g.line(leftAlign - 0.75 * rectWidth, topAlign + rectHeight,
            leftAlign - 0.25 * rectWidth, topAlign + rectHeight);
  av.g.line(leftAlign - 0.75 * rectWidth, topAlign - 4 * rectHeight,
            leftAlign - 0.25 * rectWidth, topAlign - 4 * rectHeight);
  av.label("$n - 1$",
           {top: topAlign - 3 * rectHeight,
             left: leftAlign - rectWidth + labelGap});

  //Horizontal Line (Selection)
  leftAlign += gap;
  av.g.line(leftAlign, 3 * rectHeight + topAlign,
            leftAlign + 2 * rectWidth, 3 * rectHeight + topAlign,
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
  av.step();
  av.recorded();
});
