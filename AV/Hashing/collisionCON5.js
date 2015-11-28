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
  empty.length = 10;
  var av = new JSAV("collisionCON5");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});

  av.umsg("Under quadratic probing, two keys with different home positions will have diverging probe sequences. Consider a value that hashes to slot 5. Its probe sequence is 5, then 5 + 1 = 6, then 5 + 4 = 9, then (5 + 9) % 10 = 4, and so on.");
  setBlue(arr, 5);
  arr.highlight([6, 9, 4]);
  av.displayInit();

  av.umsg("A key that hashes to slot 6 will instead follow a probe sequence that goes first to slot 6 + 1 = 7, then slot (6 + 4) % 10 = 0, and then (6 + 9) % 10 = 5.");
  setBlue(arr, 6);
  setRed(arr, 7);
  setRed(arr, 0);
  setRed(arr, 5);
  av.step();

  av.umsg("Thus, even though the key hashing to slot 5 will next hit the home slot of the key that hashes to slot 6, their probe sequences diverge after that.");
  av.recorded();
});
