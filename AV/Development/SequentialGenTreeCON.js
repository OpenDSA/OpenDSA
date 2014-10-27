/*global ODSA */
"use strict";
// General tree construction from a sequential representation
$(document).ready(function () {
  var av_name = "SequentialGenTreeCON";
  var av = new JSAV(av_name);
  var temp1;
  var arr = av.ds.array(['R','A','C',')','D',')','E',')',')','B','F',')',')',')']);
  arr.highlight(0);
  var bt = av.ds.tree({visible: true, nodegap: 35});
  bt.root('R');
  var rt = bt.root();
  var a = bt.newNode('A');
  var b = bt.newNode('B');
  var c = bt.newNode('C');
  var d = bt.newNode('D');
  var e = bt.newNode('E');
  var f = bt.newNode('F');

  rt.addChild(a);
  rt.addChild(b);
  b.addChild(f);
  a.addChild(c);
  a.addChild(d);
  a.addChild(e);

  bt.layout();
  a.hide(); 
  b.hide();
  
  //Slide 1
  av.umsg("R is the root node");
    bt.layout();

  //var ptr = av.pointer("rt", bt.root(), {anchor: "center top", top: -10});

  av.displayInit();

  //Slide 2
  av.umsg("A represents the first child of R");
  a.show({recursive:false});
  bt.layout();
  arr.highlight(1);
  arr.unhighlight(0);
  av.step();

  //Slide 3

  av.umsg("C represents the left child of the previous character.");
  c.show();
  bt.layout();
  arr.highlight(2);
  arr.unhighlight(1);
  av.step();

  //Slide 4
  av.umsg("The next token ')' means this is the end of the child list for C.");
  arr.highlight(3);
  arr.unhighlight(2);
  av.step();

  //Slide 5
  av.umsg("Continue adding children to A. D is the next child.");
  d.show();
  bt.layout();
  arr.highlight(4);
  arr.unhighlight(3);
  av.step();

  //Slide 6
  av.umsg("The next token ')' means this is the end of the child list for D.");
  arr.highlight(5);
  arr.unhighlight(4);
  av.step(); 

  //Slide 7
  av.umsg("Continue adding children to A. E is the next child.");
  e.show();
  bt.layout();
  arr.highlight(6);
  arr.unhighlight(5);
  av.step();

  //Slide 8
  av.umsg("The next token ')' means this is the end of the child list for E.");
  arr.highlight(7);
  arr.unhighlight(6);
  av.step();

  //Slide 9
  av.umsg("The next token ')' means this is the end of the child list for A.");
  arr.highlight(8);
  arr.unhighlight(7);
  av.step();

  //Slide 10
  av.umsg("Add the next child 'B' to the root.");
  b.show({recursive:false});
  bt.layout();
  arr.highlight(9);
  arr.unhighlight(8);
  av.step();


  //Slide 11
  av.umsg("The next character 'F' will be the first (and only) child of B");
  f.show();
  bt.layout();
  arr.highlight(10);
  arr.unhighlight(9);
  av.step();

  //Slide 12
  av.umsg("The next token ')' means this is the end of the child list for F.");
  arr.highlight(11);
  arr.unhighlight(10);
  av.step();

  //Slide 13
  av.umsg("The next token ')' means this is the end of the child list for B.");
  arr.highlight(12);
  arr.unhighlight(11);
  av.step();

  //Slide 14
  av.umsg("The next token ')' means this is the end of the child list for R.");
  arr.highlight(13);
  arr.unhighlight(12);
  av.step();

  av.umsg("We have just constructed a general tree from a sequential representation!")
  av.recorded();

});
