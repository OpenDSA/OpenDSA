// Written by Jeffrey Peng, Mostafa Mohammed, and Cliff Shaffer, Fall 2019
// TODO: The Traversor code needs to be moved to the TM library,
// and the TM editor needs to use the same Traversor code.
$(document).ready(function() {
  "use strict";

  var av_name = "TMabcCON";
  var xStart = 50;
  var yStart = 250;
  var av = new JSAV(av_name);

  var url = "../../../AV/OpenFLAP/machines/TM/TMabc.jff";
  av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. This machine can accept some number of a's followed by some number of b's followed by some number of c's.");
  var tm = new av.ds.TM({width: 610, height: 375, left: 50, url: url});
  var trav = new Traversor(tm, av);
  av.displayInit();
  trav.onClickTraverse(["aaaabbcc", "abca", "bbbcc", "ccc", "aacc"]);
  av.recorded();
});
