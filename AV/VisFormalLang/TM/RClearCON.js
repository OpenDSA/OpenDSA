// Written by Jeffrey Peng, Mostafa Mohammed, and Cliff Shaffer, Fall 2019
// TODO: The Traversor code needs to be moved to the TM library,
// and the TM editor needs to use the same Traversor code.
$(document).ready(function() {
  "use strict";

  var av_name = "RClearCON";
  var xStart = 100;
  var yStart = 250;
  var av = new JSAV(av_name);

  av.umsg("Here we see a Turing Machine's states and transitions presented in the form of a graph. This machine will accept strings with an even number of a's. In particular, when in state q0, if the current symbol is 'a' it will be converted to '#' and the head moved to the right. If the current symbol is '#', it will remain a '#' and the machine will stop in state q1 (a final state).");

  var url = "../../../AV/OpenFLAP/machines/TM/TMexample1.jff";
  var tm = new av.ds.TM({width: 610, height: 375, left: 50, url: url});
  av.displayInit();

  av.umsg("In this slideshow, we will trace the acceptance or rejection for some strings.");
  av.step();

  var trav = new Traversor(tm, av);
  trav.onClickTraverse(["aaaaa", "aaabaa"]);
  av.recorded();
});
