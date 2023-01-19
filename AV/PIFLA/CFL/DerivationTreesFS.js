$(document).ready(function () {
  "use strict";
  var av_name = "DerivationTreesFS";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("We have covered how to derive a string by using sentential forms. Now we a more visual derivation method.<br/><br/><b>Derivation Trees</b> (also known as <b>parse trees</b>) represent a derivation, but do not show the order in which the productions were applied.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("start"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("children"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("leaf"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("nonleaf"));
  av.step();

  // Frame 6
  av.umsg("For example, a rule $A\\rightarrow a_1a_2a_3…a_n$, where $A\\in V$,$a_i\\in(T\\cup V\\cup \\{\\lambda \\}$) can be shown as:");
  var label = av.label("...", {left: 400, top: 93});
  var label2 = av.label("$A$", {left: 355, top: 4});
  var label3 = av.label("$a_1$", {left: 230, top: 93});
  var label4 = av.label("$a_2$", {left: 295, top: 93});
  var label5 = av.label("$a_3$", {left: 360, top: 93});
  var label6 = av.label("$a_n$", {left: 440, top: 93});
  var c = av.g.circle(360, 28, 17);
  var c1 = av.g.circle(235, 120, 17);
  var c2 = av.g.circle(300, 120, 17);
  var c3 = av.g.circle(365, 120, 17);
  var c4 = av.g.circle(445, 120, 17);
  var l1 = av.g.line(360, 45, 235, 103);
  var l2 = av.g.line(360, 45, 300, 103);
  var l3 = av.g.line(360, 45, 365, 103);
  var l4 = av.g.line(360, 45, 445, 103);
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("partial"));
  c.hide();
  c1.hide();
  c2.hide();
  c3.hide();
  c4.hide();
  l1.hide();
  l2.hide();
  l3.hide();
  l4.hide();
  label.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();

  var tr = av.ds.tree({nodegap: 15});
  var root_s_1 = tr.root("S");
  var A_1 = tr.newNode("A");
  var A_2 = tr.newNode("A");
  var a_1 = tr.newNode("a");
  var a_2 = tr.newNode("a");
  var B_1 = tr.newNode("B");
  var c_1 = tr.newNode("c");
  var r1 = root_s_1.addChild(A_1);
  var r2 = root_s_1.addChild(c_1);
  var r3 = root_s_1.addChild(B_1);
  A_1.addChild(a_1);
  A_1.addChild(A_2);
  A_1.addChild(a_2);

  tr.layout();
  av.step();


  // Frame 8
  av.umsg(Frames.addQuestion("partialder"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("yield"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("fullorpart"));
  A_2.addChild(tr.newNode("$\\lambda$"));
  B_1.addChild(tr.newNode("$\\lambda$"));
  tr.layout();
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("lastyield"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("inlang"));
  av.step();
  
  // Frame 13
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
