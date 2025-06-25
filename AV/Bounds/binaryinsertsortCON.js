/*global JSAV, document */
// Written by Cliff Shaffer

// Title: Binary Insertion Sort Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Binary Insertion Sort
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow introducing the concept of using binary search to find the insert location of the next record during Insertion Sort. Used to introduce the Ford and Johnson sort. */

$(document).ready(function() {
  "use strict";
  var av_name = "binaryinsertsortCON";
  var av = new JSAV(av_name);
  var xoffset = 280;
  var yoffset = 10;
  var radius = 5;
  var circProp = {"stroke-width": 1};
  
  // Slide 1
  av.umsg("Consider a different organization for the comparisons that we might do. First we compare the first and second element, and the third and fourth elements. The two winners are then compared, yielding a binomial tree. We can view this as a (sorted) chain of three elements, with element A hanging off from the root.");
  var c1 = av.g.circle(20 + xoffset, 0 + yoffset, radius, circProp);
  var c2 = av.g.circle(20 + xoffset, 25 + yoffset, radius, circProp);
  var c3 = av.g.circle(45 + xoffset, 25 + yoffset, radius, circProp);
  var c3 = av.g.circle(45 + xoffset, 50 + yoffset, radius, circProp);
  var labA = av.label("A", {visible: true, left: 0 + xoffset, top: 0 + yoffset});
  var l1 = av.g.line(20 + xoffset, 5 + yoffset, 20 + xoffset, 20 + yoffset);
  var l2 = av.g.line(24 + xoffset, 4 + yoffset, 42 + xoffset, 20 + yoffset);
  var l3 = av.g.line(45 + xoffset, 30 + yoffset, 45 + xoffset, 45 + yoffset);
  av.displayInit();
  av.step();
  
  // Slide 2
  av.umsg("If we then insert element B into the sorted chain of three elements, we will end up with one of the two posets shown on the right side, at a cost of two comparisons.");
  
  var l1 = av.g.line(60 + xoffset, 25 + yoffset, 80 + xoffset, 25 + yoffset, {"stroke-width": 2, "arrow-start": "classic-wide-long"});
  var c2 = av.g.circle(100 + xoffset, 25 + yoffset, radius, circProp);
  var labB = av.label("B", {visible: true, left: 95 + xoffset, top: 20 + yoffset});
  var a1 = av.g.line(120 + xoffset, 20 + yoffset, 140 + xoffset, 20 + yoffset);
  var a2 = av.g.line(120 + xoffset, 30 + yoffset, 140 + xoffset, 30 + yoffset);
  var a3 = av.g.line(135 + xoffset, 15 + yoffset, 145 + xoffset, 25 + yoffset);
  var a4 = av.g.line(145 + xoffset, 25 + yoffset, 135 + xoffset, 35 + yoffset);

  xoffset = xoffset + 150;
  yoffset = yoffset + 25;

  av.g.circle(20 + xoffset, -25 + yoffset, radius, circProp);
  av.g.line(20 + xoffset, -20 + yoffset, 20 + xoffset, -5 + yoffset);
  av.g.circle(20 + xoffset, 0 + yoffset, radius, circProp);
  av.g.circle(20 + xoffset, 25 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 25 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 50 + yoffset, radius, circProp);
  av.label("A", {visible: true, left: 0 + xoffset, top: 0 + yoffset});
  av.g.line(20 + xoffset, 5 + yoffset, 20 + xoffset, 20 + yoffset);
  av.g.line(24 + xoffset, 4 + yoffset, 42 + xoffset, 20 + yoffset);
  av.g.line(45 + xoffset, 30 + yoffset, 45 + xoffset, 45 + yoffset);

  av.label("or", {visible: true, left: 70 + xoffset, top: -20 + yoffset});

  xoffset = xoffset + 100;
  yoffset = yoffset - 25;
  
  av.g.circle(20 + xoffset, 0 + yoffset, radius, circProp);
  av.g.circle(20 + xoffset, 25 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 25 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 50 + yoffset, radius, circProp);
  av.label("A", {visible: true, left: 0 + xoffset, top: 0 + yoffset});
  av.g.line(20 + xoffset, 5 + yoffset, 20 + xoffset, 20 + yoffset);
  av.g.line(24 + xoffset, 4 + yoffset, 42 + xoffset, 20 + yoffset);
  av.g.line(45 + xoffset, 30 + yoffset, 45 + xoffset, 45 + yoffset);
  av.g.circle(45 + xoffset, 75 + yoffset, radius, circProp);
  av.g.line(45 + xoffset, 55 + yoffset, 45 + xoffset, 70 + yoffset);
  av.step();
  
  // Slide 3
  av.umsg("We can then merge A into the chain, for a cost of two comparisons (because we already know that it is smaller then either one or two elements, we are actually merging it into a list of two or three elements). Thus, the total number of comparisons needed to sort the five elements is at most seven instead of eight.");
  av.recorded();
});
