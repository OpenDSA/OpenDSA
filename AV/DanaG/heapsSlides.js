$(document).ready(function() {
  "use strict";
  var av_name = "heapSlides";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;   
  var av = new JSAV(av_name);
  var bt1Top = 10;
  var bt1Left = 50;

  //Slide 1
  av.umsg(interpret("This is the first text. The first tree should appear."));
  var bt1 = av.ds.binarytree({nodegap: 15, left: bt1Left, top: bt1Top});
  av.displayInit();
  bt1.root("1");
  var rt1 = bt1.root();
  rt1.left("2");
  rt1.left.left("4");
  rt1.left.right("5");
  rt1.right("3");
  rt1.right.left("6");
  rt1.right.left("7");