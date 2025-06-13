/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Quick Sort Worst Case

// Title: Quicksort Worst Case Analysis Slideshow
// Author: Mohammed Farghally; Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Quicksort
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing a visual proof for the worst-case cost of Quicksort. */

$(document).ready(function() {
  "use strict";
  var av_name = "QuickSortWorstCaseCON";
  // Load the config object with interpreter
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg(interpret("Slide 1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("Slide 2"));
  av.g.rect(100, 0, 400, 30);
  av.label("$n$",  {top: "-8px", left: "300px"}).addClass("mediumLabel");
  av.step();

  // Slide 3
  av.umsg(interpret("Slide 3"));
  av.g.rect(100, 80, 400, 30);
  av.g.rect(100, 80, 20, 30);
  av.label("|------------------------------------  $> A[pivot]$  -----------------------------------|",  {top: "40px", left: "120px"}).addClass("mediumLabel2");
  av.label("pivot",  {top: "76px", left: "98px"}).addClass("smallLabel rotated");
  av.label("$n-1$",  {top: "71px", left: "270px"}).addClass("mediumLabel");
  av.label("$n-1$",  {top: "67px", left: "600px"}).addClass("mediumLabel");
  av.label(interpret("lab1"),  {top: "-17px", left: "580px"}).addClass("mediumLabel");
  av.step();

  // Slide 4
  av.umsg(interpret("Slide 4"));
  av.g.rect(120, 160, 380, 30);
  av.g.rect(120, 160, 20, 30);
  av.label("|---------------------------------- $> A[pivot]$  ---------------------------------|",  {top: "120px", left: "140px"}).addClass("mediumLabel2");
  av.label("pivot",  {top: "156px", left: "118px"}).addClass("smallLabel rotated");
  av.label("$n-2$",  {top: "151px", left: "290px"}).addClass("mediumLabel");
  av.label("$n-2$",  {top: "147px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 5
  av.umsg(interpret("Slide 5"));
  av.g.rect(140, 240, 360, 30);
  av.g.rect(140, 240, 20, 30);
  av.label("|-------------------------------  $> A[pivot]$  -------------------------------|",  {top: "200px", left: "160px"}).addClass("mediumLabel2");
  av.label("pivot",  {top: "236px", left: "138px"}).addClass("smallLabel rotated");
  av.label("$n-3$",  {top: "231px", left: "300px"}).addClass("mediumLabel");
  av.label("$n-3$",  {top: "227px", left: "600px"}).addClass("mediumLabel");
  av.step();

  // Slide 6
  av.umsg(interpret("Slide 6"));
  av.label("............",  {top: "285px", left: "460px"}).addClass("largeLabel rotated");
  av.label("............",  {top: "275px", left: "600px"}).addClass("largeLabel rotated");
  av.g.rect(460, 365, 40, 30);
  av.g.rect(460, 365, 20, 30);
  av.label("pivot",  {top: "360px", left: "458px"}).addClass("smallLabel rotated");
  av.label("$1$",  {top: "356px", left: "485px"}).addClass("mediumLabel");
  av.label("$1$",  {top: "352px", left: "620px"}).addClass("mediumLabel");
  av.step();

  // Slide 7
  av.umsg(interpret("Slide 7"));
  av.label("|------------------- $n-1$ -------------------|",
  {top: "200px", left: "550px"}).css({"font-size": "16px", "text-align": "center"}).addClass("rotated");
  av.step();

  // Slide 8
  av.umsg(interpret("Slide 8"));
  av.recorded();
});
