// Written by Jeffrey Peng, Mostafa Mohammed, and Cliff Shaffer, Fall 2019
// TODO: The Traversor code needs to be moved to the TM library,
// and the TM editor needs to use the same Traversor code.
$(document).ready(function() {
  "use strict";

  var av_name = "TMabct";
  var xStart = 50;
  var yStart = 250;
  var av = new JSAV(av_name);

  av.umsg("Here is the graph form for the machine and the intial state of the input tape and the head.");
  var url = "../../../AV/Yinwen/TMabc.jff";
  av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
  var tm = new av.ds.TM({width: 610, height: 375, left: 50, url: url});
  var trav = new Traversor(tm, av);
  av.displayInit();
  trav.onClickTraverse(["aaaabbcc", "abca", "bbbcc", "ccc", "aacc"]);
  av.recorded();
});
