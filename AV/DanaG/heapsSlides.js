$(document).ready(function() {
  "use strict";
  var av_name = "heapsSlides";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;   
      code = config.code;
  var av = new JSAV(av_name);
  var bt1Top = 10;
  var bt1Left = 50;
  var bt2Left = 250;
  var bt3Top = 180;

  //Slide 1
  av.umsg(interpret("av_c1"));
  av.displayInit();

  //Slide 2
  av.umsg(interpret("av_c2");
  var bt1 = av.ds.binarytree({nodegap: 15, left: bt1Left, top: bt1Top});
  bt1.root("1");
  var rt1 = bt1.root();
  rt1.left("2");
  rt1.left.left("4");
  rt1.left.right("5");
  rt1.right("3");
  rt1.right.left("6");
  rt1.right.left("7");
  var bt2 = av.ds.binarytree({nodegap: 15, left: bt2Left, top: bt1Top});
  bt2.root("7");
  var rt2 = bt2.root();
  rt2.left("4");
  rt2.left.left("1");
  rt2.left.right("2");
  rt2.right("6");
  rt2.right.left("3");
  rt2.right.left("5");
  av.step();

  //Slide 3
  av.umsg(interpret("av_c3");
  var bt3 = av.ds.binarytree({nodegap: 15, left: bt1Left, top: bt3Top});
  bt3.root("1");
  var rt3 = bt3.root();
  rt3.left("2");
  rt3.left.left("4");
  rt3.left.right("5");
  rt3.right("3");
  rt3.right.left("6");
  rt3.right.left("7");
  var bt4 = av.ds.binarytree({nodegap: 15, left: bt2Left, top: bt3Top});
  bt4.root("7");
  var rt4 = bt4.root();
  rt4.left("5");
  rt4.left.left("4");
  rt4.left.right("2");
  rt4.right("6");
  rt4.right.left("1");
  rt4.right.left("3");
  av.recorded();

});