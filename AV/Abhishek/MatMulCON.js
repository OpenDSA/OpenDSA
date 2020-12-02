// Written by Abhishek Jha and Cliff Shaffer, Fall 2020
$(document).ready(function() {
  "use strict";
  var av_name = "MatMulCON";
  var av = new JSAV(av_name);
  var val;
  var multree = av.ds.tree({nodegap: 8});

  av.label("$A = 3 \\times 2 $", {left: 0, top: 0});
  av.label("$B = 2 \\times  4$", {left: 90, top: 0});
  av.label("$C = 4 \\times 2$", {left: 190, top: 0});
  av.label("$D = 2 \\times 5$", {left: 270, top: 0});
  av.label("$E = 5 \\times 3$", {left: 0, top: 50});


  // Slide 1
  multree.root("ABCDE");
  val = "ABCDE" + "<br>" + "?" ;
  multree.root().value(val);
  multree.layout();
  av.displayInit();

  // Slide 2
  multree.root().addChild("A(BCDE)");
  val = "A(BCDE)"  + "<br>" + "?" ;
  multree.root().child(0).value(val);
  multree.layout();
  av.step();

  // Slide 3
  multree.root().child(0).addChild("B(CDE)");
  val = "B(CDE)" + "<br>" + "?" ;
  multree.root().child(0).child(0).value(val);

  multree.root().child(0).addChild("(BC)(DE)");
  val = "(BC)(DE)" + "<br>" + "58" ;
  multree.root().child(0).child(1).value(val);

  multree.root().child(0).child(0).addChild("(C(DE)");
  val = "C(DE)" + "<br>" + "54" ;
  multree.root().child(0).child(0).child(0).value(val);

  multree.root().child(0).child(0).addChild("(CD)E");
  val = "(CD)E" + "<br>" + "100" ;
  multree.root().child(0).child(0).child(1).value(val);

  multree.root().child(0).addChild("(BCD)E");
  val = "(BCD)E" + "<br>" + "?" ;
  multree.root().child(0).child(2).value(val);

  multree.root().child(0).child(2).addChild("B(CD)");
  val = "B(CD)" + "<br>" + "36" ;
  multree.root().child(0).child(2).child(0).value(val);

  multree.root().child(0).child(2).addChild("(BC)D");
  val = "(BC)D" + "<br>" + "80" ;
  multree.root().child(0).child(2).child(1).value(val);
  av.step();

  multree.root().addChild("(AB)(CDE)");
  val = "(AB)(CDE)" + "<br>" + "?" ;
  multree.root().child(1).value(val);

  multree.root().child(1).addChild("C(DE)");
  val = "C(DE)" + "<br>" + "54" ;
  multree.root().child(1).child(0).value(val);

  multree.root().child(1).addChild("(CD)E)");
  val = "(CD)E)" + "<br>" + "100" ;
  multree.root().child(1).child(1).value(val);
  av.step();



  // Slide 4
  multree.root().addChild("(ABC)(DE)");
  val = "(ABC)(DE)" + "<br>" + "?" ;
  multree.root().child(2).value(val);
  av.step();

  // Slide 5
  // multree.root().addChild("(ABC)D");
  // val = "(ABC)D" + "<br>" + "?" ;
  // multree.root().child(2).value(val);
  // av.step();

  // Slide 6
  multree.root().child(2).addChild("A(BC)");
  val = "A(BC)" + "<br>" + "28" ;
  multree.root().child(2).child(0).value(val);

  multree.root().child(2).addChild("(AB)C");
  val = "(AB)C" + "<br>" + "48" ;
  multree.root().child(2).child(1).value(val);

  multree.root().addChild("(ABCD)E");
  val = "(ABCD)E" + "<br>" + "?" ;
  multree.root().child(3).value(val);

  multree.root().child(3).addChild("A(BCD)");
  val = "A(BCD)" + "<br>" + "?" ;
  multree.root().child(3).child(0).value(val);

  multree.root().child(3).child(0).addChild("B(CD)");
  val = "B(CD)" + "<br>" + "36" ;
  multree.root().child(3).child(0).child(0).value(val);

  multree.root().child(3).child(0).addChild("(BC)D");
  val = "(BC)D" + "<br>" + "80" ;
  multree.root().child(3).child(0).child(1).value(val);

  multree.root().child(3).addChild("(AB)(CD)");
  val = "(AB)(CD)" + "<br>" + "124" ;
  multree.root().child(3).child(1).value(val);

  multree.root().child(3).addChild("(ABC)D");
  val = "(ABC)D" + "<br>" + "?" ;
  multree.root().child(3).child(2).value(val);

  multree.root().child(3).child(2).addChild("A(BC)");
  val = "A(BC)" + "<br>" + "28" ;
  multree.root().child(3).child(2).child(0).value(val);

  multree.root().child(3).child(2).addChild("(AB)C");
  val = "(AB)C" + "<br>" + "48" ;
  multree.root().child(3).child(2).child(1).value(val);

  av.step();
  val = "B(CDE)" + "<br>" + "78" ;
  multree.root().child(0).child(0).value(val);

  val = "(BCD)E" + "<br>" + "66" ;
  multree.root().child(0).child(2).value(val);

  val = "A(BCDE)"  + "<br>" + "76" ;
  multree.root().child(0).value(val);

  val = "(AB)(CDE)" + "<br>" + "90" ;
  multree.root().child(1).value(val);

  val = "(ABC)(DE)" + "<br>" + "46" ;
  multree.root().child(2).value(val);

  val = "A(BCD)" + "<br>" + "66" ;
  multree.root().child(3).child(0).value(val);

  val = "(ABC)D" + "<br>" + "58" ;
  multree.root().child(3).child(2).value(val);

  val = "(ABCD)E" + "<br>" + "108" ;
  multree.root().child(3).value(val);

  val = "ABCDE" + "<br>" + "46" ;
  multree.root().value(val);



  multree.layout();
  av.step();
  av.recorded();
});
