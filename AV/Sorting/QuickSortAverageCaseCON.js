/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Average Case

// Title: Quicksort Average Case Analysis Slideshow
// Author: Mohammed Farghally; Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Quicksort
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a visual proof for the average-case cost of Quicksort. */

$(document).ready(function() {
  "use strict";
  var av_name = "QuickSortAverageCaseCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret("Slide 1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("Slide 2"));
  av.g.rect(220, 50, 400, 30);
  av.label("|-------------------------------------  $n$  -----------------------------------|",  {top: "80px", left: "225px"}).addClass("mediumLabel");
  var pivot = av.g.rect(330, 50, 30, 30);
  var piv = av.label("pivot", {top: "45px", left: "331px"}).addClass("smallLabel");
  var index = av.label("$k$", {top: "15px", left: "338px"}).addClass("mediumLabel");
  av.step();

  // Slide 3
  av.umsg(interpret("Slide 3"));
  var right_side = av.label("|----------------  $n-1-k$  ---------------|",  {top: "15px", left: "370px"}).addClass("mediumLabel");
  var left_side = av.label("|--------- $k$ ---------|", {top: "15px", left: "225px"}).addClass("mediumLabel2");
  av.step();

  // Slide 4
  av.umsg(interpret("Slide 4_1"));
  av.umsg(interpret("Slide 4_2"));
  pivot.hide();
  pivot = av.g.rect(220, 50, 30, 30);
  index.hide();
  index = av.label("k = 0", {top: "20px", left: "220px"}).addClass("smallLabel");
  piv.hide();
  piv = av.label("pivot", {top: "45px", left: "221px"}).addClass("smallLabel");
  right_side.hide();
  left_side.hide();
  right_side = av.label("|-------------------------------  $n-1$  -----------------------------|",  {top: "15px", left: "255px"}).addClass("mediumLabel");
  av.step();

  // Slide 5
  av.umsg(interpret("Slide 5"));
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("k = 1");
  right_side.hide();
  right_side = av.label("|----------------------------  $n-2$  --------------------------|",  {top: "15px", left: "285px"}).addClass("mediumLabel");
  left_side = av.label("$1$", {top: "15px", left: "230px"}).addClass("mediumLabel2");
  av.step();

  // Slide 6
  av.umsg(interpret("Slide 6"));
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("k = 2");
  right_side.hide();
  right_side = av.label("|-------------------------  $n-3$  -----------------------|",  {top: "15px", left: "315px"}).addClass("mediumLabel");
  left_side.hide();
  left_side = av.label("|--- $2$ ---|", {top: "15px", left: "225px"}).addClass("mediumLabel2");
  av.step();

  // Slide 7
  av.umsg(interpret("Slide 7"));
  pivot.translate(30, 0);
  piv.translate(30, 0);
  index.translate(30, 0);
  index.text("k = 3");
  right_side.hide();
  right_side = av.label("|----------------------  $n-4$  ---------------------|",  {top: "15px", left: "345px"}).addClass("mediumLabel");
  left_side.hide();
  left_side = av.label("|------- $3$ -------|", {top: "15px", left: "225px"}).addClass("mediumLabel2");
  av.step();

  // Slide 8
  av.umsg(interpret("Slide 8"));
  pivot.hide();
  pivot = av.g.rect(330, 50, 30, 30);
  piv.hide();
  piv = av.label("pivot", {top: "45px", left: "331px"}).addClass("smallLabel");
  index.hide();
  index = av.label("$k$", {top: "15px", left: "337px"}).addClass("mediumLabel");
  right_side.hide();
  left_side.hide();
  right_side = av.label("|----------------  $n-1-k$  ---------------|",  {top: "15px", left: "370px"}).addClass("mediumLabel");
  left_side = av.label("|--------- $k$ ---------|", {top: "15px", left: "225px"}).addClass("mediumLabel2");
  av.step();

  // Slide 9
  av.umsg(interpret("Slide 9"));
  var eqn = av.label("$$\\frac{1}{n}\\displaystyle\\sum_{k=0}^{n-1}[T(k)+T(n-1-k)]$$",  {top: "-38px", left: "0px"}).addClass("largeLabel");
  av.step();

  // Slide 10
  av.umsg(interpret("Slide 10"));
  av.step();

  // Slide 11
  av.umsg(interpret("Slide 11"));
  eqn.hide();
  eqn = av.label("$$T(n) = cn + \\frac{1}{n}\\displaystyle\\sum_{k=0}^{n-1}[T(k)+T(n-1-k)]$$",  {top: "-36px", left: "0px"}).addClass("largeLabel");
  av.step();

  // Slide 12
  av.umsg(interpret("Slide 12"));
  av.recorded();
});
