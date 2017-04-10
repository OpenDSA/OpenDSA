/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Two Coloring Proof
//variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "garbageDisposalCON";
  var xPosition = 200;
  var yPosition = 100;
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  // Slide 1
  av.umsg("This slide show will explain Java Garbage Collection");
  av.displayInit();
  av.step();
  av.umsg("Garbage collection is a mechanism that is frequently invoked by the Java Virtual Machine to get ride of the unused heap memory objects.");
  av.step();
  av.umsg("Objects are unreferenced when they: ");
  av.label("1-become null 3-anonymous objects", {top: yPosition, left: xPosition});
  av.label("2-assigned to other reference", {top: yPosition + 20, left: xPosition});
  av.label("3-anonymous objects", {top: yPosition + 40, left: xPosition});
  av.recorded();
});
