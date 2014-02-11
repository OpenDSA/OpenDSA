(function ($) {
  console.log("BEGIN");
  var av = new JSAV("DecodeExample");
  av.umsg("Here is a Huffman tree for C, D, E, K, L, M, N.");

  var t = av.ds.bintree();
  var r = t.root();

  // constructs tree
  r.left("E");
  r.right("").right("").right("").right("").right("M");
  r.right().left("").left("U");
  r.right().left().right("D");
  r.right().right().left("L");
  r.right().right().right().left("C");
  r.right().right().right().right().left("");
  r.right().right().right().right().left().left("Z");
  r.right().right().right().right().left().right("K");

  // then adds edge labels
  r.edgeToLeft().label("0");
  r.edgeToRight().label("1");
  r.right().edgeToLeft().label("0");
  r.right().left().edgeToLeft().label("0");
  r.right().left().edgeToRight().label("1");
  r.right().edgeToRight().label("1");
  r.right().right().edgeToLeft().label("0");
  r.right().right().edgeToRight().label("1");
  r.right().right().right().edgeToLeft().label("0");
  r.right().right().right().edgeToRight().label("1");
  r.right().right().right().right().edgeToRight().label("1");
  r.right().right().right().right().edgeToLeft().label("0");
  r.right().right().right().right().left().edgeToLeft().label("0");
  r.right().right().right().right().left().edgeToRight().label("1");

  // initial display
  t.layout();
  av.displayInit();

  // ========= STEPS =========

  // First Step
  av.umsg("To decode the string '111\n101' we begin at the root.");
  av.step();

  // second step
  av.umsg("Since first digit is a 1, go right.");
  av.step();

  // third
  av.umsg("Second digit is also a 1 so go right again.");
  av.step();

  // fourth
  av.umsg("Go right again.");
  av.step();

  // fifth
  av.umsg("Another 1, so go right again.");
  av.step();

  // sixth
  av.umsg("The next digit is a 0, so go left.");
  av.step();

  // seventh
  av.umsg("The last digit is a 1, so go right.");
  av.step();

  // eight
  av.umsg("We've now decoded '111101' and reached a value of \"K\".");
  av.step();

  // cleanup
  av.recorded();
  console.log("END");
}(jQuery));

(function ($) {
  console.log("BEGIN");
  var av = new JSAV("finalHuffmanTree");
  var circOpt = {fill:"white"};

  // edges
  // level 0 to 1
  av.g.line(200, 20, 150, 70);
  av.g.line(200, 20, 250, 70);
  // level 1 to 2
  av.g.line(250, 70, 180, 120);
  av.g.line(250, 70, 320, 120);
  // level 2 to 3
  av.g.line(180, 120, 140, 170);
  av.g.line(180, 120, 220, 170);
  av.g.line(320, 120, 280, 170);
  av.g.line(320, 120, 360, 170);
  // level 3 to 4
  av.g.line(360, 170, 320, 220);
  av.g.line(360, 170, 400, 220);
  // level 4 to 5
  av.g.line(400, 220, 440, 270);
  av.g.line(400, 220, 360, 270);
  // level 5 to 6
  av.g.line(440, 270, 480, 320);

  // root
  av.g.circle(200, 20, 19, circOpt);
  // level 1
  av.g.circle(150, 70, 19, circOpt);  // root.left
  av.g.circle(250, 70, 19, circOpt);  // root.right
  // level 2
  av.g.circle(180, 120, 19, circOpt); // root.right.left
  av.g.circle(320, 120, 19, circOpt); // root.right.right
  // level 3
  av.g.circle(140, 170, 19, circOpt); // root.right.left.left
  av.g.circle(220, 170, 19, circOpt); // root.right.left.right
  av.g.circle(280, 170, 19, circOpt); // root.right.right.left
  av.g.circle(360, 170, 19, circOpt); // root.right.right.right
  // level 4
  av.g.circle(320, 220, 19, circOpt); // root.right.right.right.left
  av.g.circle(400, 220, 19, circOpt); // root.right.right.right.right
  // level 5
  av.g.circle(440, 270, 19, circOpt); // root.right.right.right.right.right.right
  av.g.circle(360, 270, 19, circOpt); // root.right.right.right.right.right.left  
  // level 6   
  av.g.circle(480, 320, 19, circOpt);

}(jQuery));