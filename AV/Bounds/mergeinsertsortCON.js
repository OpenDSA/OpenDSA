/*global JSAV, document */
// Written by Cliff Shaffer

// Title: Merge Insertion Sort Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Merge Insertion Sort; Ford and Johnson Sort
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow sketching the Merge Insertion Sort, or Ford and Johnson sort. */

$(document).ready(function() {
  "use strict";
  var av_name = "mergeinsertsortCON";
  var av = new JSAV(av_name);
  var xoffset = 280;
  var yoffset = 10;
  var radius = 5;
  var circProp = {"stroke-width": 1};
  
  // Slide 1
  av.umsg("Let's see an example of doing merge insertion sort on 10 elements. The first step is to do pairwise comparisons on five pairs (costing five comparisons). Then we recursively sort the five winners. The result is the poset shown here.");
  av.g.circle(45 + xoffset, 0 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 25 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 50 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 75 + yoffset, radius, circProp);
  av.g.circle(45 + xoffset, 100 + yoffset, radius, circProp);

  av.g.line(45 + xoffset, 5 + yoffset, 45 + xoffset, 20 + yoffset);
  av.g.line(45 + xoffset, 30 + yoffset, 45 + xoffset, 45 + yoffset);
  av.g.line(45 + xoffset, 55 + yoffset, 45 + xoffset, 70 + yoffset);
  av.g.line(45 + xoffset, 80 + yoffset, 45 + xoffset, 95 + yoffset);

  var c1 = av.g.circle(20 + xoffset, 25 + yoffset, radius, circProp);
  var c2 = av.g.circle(20 + xoffset, 50 + yoffset, radius, circProp);
  var c3 = av.g.circle(20 + xoffset, 75 + yoffset, radius, circProp);
  var c4 = av.g.circle(20 + xoffset, 100 + yoffset, radius, circProp);
  var c5 = av.g.circle(20 + xoffset, 125 + yoffset, radius, circProp);

  var l1 = av.g.line(43 + xoffset, 4 + yoffset, 20 + xoffset, 20 + yoffset);
  var l1 = av.g.line(43 + xoffset, 29 + yoffset, 20 + xoffset, 45 + yoffset);
  var l1 = av.g.line(43 + xoffset, 54 + yoffset, 20 + xoffset, 70 + yoffset);
  var l1 = av.g.line(43 + xoffset, 79 + yoffset, 20 + xoffset, 95 + yoffset);
  var l1 = av.g.line(43 + xoffset, 104 + yoffset, 20 + xoffset, 120 + yoffset);
  av.displayInit();
  av.step();
  
  // Slide 2
  av.umsg("Now we need to fold in the last four elements (labeled 1 to 4). But to guarantee that we will never insert an element into a chain of length$2^i$, we do this in a special order: Element 3, Element 4, Element 1, and finally Element 2.");
  av.label("1", {visible: true, left: 0 + xoffset, top: 0 + yoffset});
  av.label("2", {visible: true, left: 0 + xoffset, top: 25 + yoffset});
  av.label("3", {visible: true, left: 0 + xoffset, top: 50 + yoffset});
  av.label("4", {visible: true, left: 0 + xoffset, top: 75 + yoffset});
  av.step();
  
  // Slide 3
  av.umsg("We already know that Element 3 is greater than Element A, which in turn is greater than the two elements directly above it in the poset. Thus, we can merge Element 3 into the chain of three elements below A. This will cost two comparisons.");
  av.label("A", {visible: true, left: 55 + xoffset, top: 25 + yoffset});
  av.step();

  // Slide 4
  av.umsg("Depending on where Element 3 then ends up in the list, Element 4 will now be inserted into a list of size 2 or 3, costing two comparisons in either case.");
  av.step();

  // Slide 5
  av.umsg("Depending on where Elements 3 and 4 are in the list, Element 1 will now be inserted into a list of size 5, 6, or 7, all of which requires three comparisons to place in sort order.");
  av.step();

  // Slide 6
  av.umsg("Finally, Element 2 will be inserted into a list of size 5, 6, or 7.");  
  av.recorded();
});
