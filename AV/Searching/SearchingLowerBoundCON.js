/*global ODSA */
// Written by Cliff Shaffer, March 2025
// Sorting Lower Bound
$(document).ready(function() {
  "use strict";
  var av = new JSAV("SearchingLowerBoundCON", {animationMode: "none"});

  var left = 100;
  var top = 10;

  var bt1 = av.ds.binarytree({nodegap: 15, left: left, top: top});
  var rt = bt1.root("0-7<br>3");
  var curr = rt.left("0-2<br>1");
  curr.left("0");
  curr.right("2");
  curr = rt.right("4-7<br>5");
  curr.left("4")
  curr = curr.right("6-7<br>6");
  curr.right("7");
  bt1.layout();

  av.label("<", {top: top + 40, left: left + 70});
  av.label(">", {top: top + 40, left: left + 160});
  av.label("<", {top: top + 105, left: left + 20});
  av.label(">", {top: top + 105, left: left + 80});
  av.label("<", {top: top + 105, left: left + 150});
  av.label(">", {top: top + 105, left: left + 210});
  av.label(">", {top: top + 165, left: left + 235});
  
  var bt2 = av.ds.binarytree({nodegap: 15, left: left + 400, top: top});
  rt = bt2.root("0-6<br>3");
  curr = rt.left("0-2<br>1");
  curr.left("0");
  curr.right("2");
  curr = rt.right("4-6<br>5");
  curr.left("4")
  curr.right("6");
  bt2.layout();

  av.label("<", {top: top + 40, left: left + 470});
  av.label(">", {top: top + 40, left: left + 560});
  av.label("<", {top: top + 105, left: left + 420});
  av.label(">", {top: top + 105, left: left + 480});
  av.label("<", {top: top + 105, left: left + 550});
  av.label(">", {top: top + 105, left: left + 610});

  av.displayInit();
  av.recorded();
});

