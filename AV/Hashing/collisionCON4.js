$(document).ready(function () {
  "use strict";

// Convenience function for setting another type of highlight
// (will be used for showing which elements will be compared during sort)
var setBlue = function (arr, index) {
  arr.css(index, {"background-color": "#ddf" });
};

// Convenience function for setting another type of highlight
// (will be used for showing which elements will be compared during sort)
var setRed = function (arr, index) {
  arr.css(index, {"background-color": "#fdd" });
};

  var empty = [];
  var permarray = [0, 3, 1, 4, 9, 7, 6, 2, 5, 8];
  empty.length = 10;
  var av = new JSAV("collisionCON4");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});
  var perm = av.ds.array(permarray, {indexed: true, visible: false});

  // Slide 1
  av.umsg("First recall what happens with linear probing by steps of 2. Say that one record hashes to slot 4, and another hashes to slot 6.");
  arr.value(4, 104);
  arr.value(6, 936);
  av.displayInit();

  // Slide 2
  av.umsg("Consider the probe sequence extending out of slot 4: It would visit 6, then 8, then 0, then 2.");
  arr.highlight([6, 8, 0, 2]);
  av.step();

  // Slide 3
  av.umsg("The probe sequence extending out of slot 6 visits 8, then 0, then 2, then 4.");
  arr.highlight(4);
  av.step();

  // Slide 4
  av.umsg("In other words, once the two probe sequences join, they move together, leading to a form of clustering.");
  av.step();

  // Slide 5
  av.umsg("In contrast, consider what happens with pseudo-random probing. Consider a record that hashes to slot 3, and another that hashes to slot 6.");
  arr.unhighlight([0, 2, 4, 6, 8]);
  arr.value(4, "");
  arr.value(6, "");
  perm.show();
  setBlue(arr, 3);
  setBlue(arr, 6);
  av.step();

  // Slide 6
  av.umsg("The probe sequence extending out of slot 3 first goes to slot 3 + 3 = 6...");
  arr.highlight(6);
  av.step();

  // Slide 7
  av.umsg("... and then to slot 3 + 1 = 4...");
  arr.highlight(4);
  av.step();

  // Slide 8
  av.umsg("... and next to slot 3 + 4 = 7.");
  arr.highlight(7);
  av.step();

  // Slide 9
  av.umsg("However, the probe sequence extending out of slot 6 first goes to slot 6 + 3 = 9...");
  arr.unhighlight(7);
  setRed(arr, 9);
  av.step();

  // Slide 10
  av.umsg("... and then to slot (6 + 1) % 7...");
  setRed(arr, 7);
  av.step();

  // Slide 11
  av.umsg("... and next to slot (6 + 4) % 10 = 0. So you can see that the two trails, while they might meet occasionally, do not follow along together.");
  setRed(arr, 0);
  av.recorded();
});
