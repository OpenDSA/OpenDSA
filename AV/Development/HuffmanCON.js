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
