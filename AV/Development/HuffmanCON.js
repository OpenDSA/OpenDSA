(function ($) {
  var av = new JSAV("DecodeExample");
  av.umsg("Here is a Huffman tree for C, D, E, K, L, M, N.");

  var t = construct_tree(av);
  var r = t.root();

  // initial display
  t.layout();
  av.displayInit();


  // ========= STEPS =========

  // First Step
  av.umsg("To decode the string '111101' we begin at the root.");
  r.highlight();
  av.step();

  // second step
  av.umsg("Since first digit is a 1, go right.");
  r.right().highlight();
  av.step();

  // third
  av.umsg("Second digit is also a 1 so go right again.");
  r.right().right().highlight();
  av.step();

  // fourth
  av.umsg("Go right again.");
  r.right().right().right().highlight();
  av.step();

  // fifth
  av.umsg("Another 1, so go right again.");
  r.right().right().right().right().highlight();
  av.step();

  // sixth
  av.umsg("The next digit is a 0, so go left.");
  r.right().right().right().right().left().highlight();
  av.step();

  // seventh
  av.umsg("The last digit is a 1, so go right.");
  r.right().right().right().right().left().right().highlight();
  av.step();

  // eight
  av.umsg("We've now decoded '111101' and reached a value of \"K\".");

  // cleanup
  av.recorded();

}(jQuery));

(function ($) {
  var av = new JSAV("finalHuffmanTree");
  var t = construct_tree(av);
  var r = t.root("");

  // initial display
  t.layout();
}(jQuery));

(function ($) {
  var av = new JSAV("MExample");
  var t = construct_tree(av);
  var r = t.root("");

  t.layout();

  av.umsg("The code for M is '11111'.");
  av.displayInit();

  r.highlight();
  av.umsg("Taking five right branches in the tree brings us to a leaf node containing M.");
  av.step();

  av.umsg("Take the first right branch representing '1'.");
  r.right().highlight();
  av.step();

  av.umsg("Another right branch representing '11'.");
  r.right().right().highlight();
  av.step();

  av.umsg("Another right branch representing '111'.");
  r.right().right().right().highlight();
  av.step();

  av.umsg("Notice that no letter can have a code '111' since our current node is empty.");
  av.step();

  av.umsg("Another right branch representing '1111'.");
  r.right().right().right().right().highlight();
  av.step();

  av.umsg("Taking our fifth right branch, represented by '11111' and reaching a value of \"M\".");
  r.right().right().right().right().right().highlight();
  av.step();

  // initial display
  av.recorded();

}(jQuery));

(function ($) {
  var av = new JSAV("Con1");
  
  var t = construct_tree(av);
  var r = t.root("");

  t.layout();

  av.umsg("The word 'DEED' is represented by '10100101' and the word 'MUCK' is represented by '111111001110111101'.");
  av.displayInit();

  av.umsg("As an example, lets decode the bit string '1011001110111101'");
  av.step();
  
  av.umsg("We always begin at the root.")
  r.highlight();
  av.step();

  av.umsg("Since the first bit it '1' we start by taking a right branch.");
  r.right().highlight();
  av.step();

  av.umsg("Because the next bit is a '0' we take a left branch.");
  r.right().left().highlight();
  av.step();

  av.umsg("We then take another right branch for the third bit '1' and arrive at the lead node corresponding to D.");
  r.right().left().right().highlight();
  av.step();

  av.umsg("Thus, the first letter of the coded word is D");
  av.step();

  av.umsg("We then begin at the root to start processing the next bit in the binary string.");
  r.right().unhighlight();
  r.right().left().unhighlight();
  r.right().left().right().unhighlight();
  av.step();

  av.umsg("To decode the second leter, we make a left branche since the next two bit is '0'.");
  r.left().highlight();
  av.step();

  av.umsg("This leads us to the leaf node E. The second letter is an E.");
  av.step();

  r.left().unhighlight();
  av.umsg("We start at the root for the next bit.");
  av.step();

  av.umsg("Similarly, the next bit is also a 0 which leads us to E again.");
  r.left().highlight();
  av.step();

  av.umsg("We return to the root for the next bit");
  r.left().unhighlight();
  av.step();

  av.umsg("The next bit is a 1 so we branch right.");
  r.right().highlight();
  av.step();

  av.umsg("The next bit is a 0 so we branch left.");
  r.right().left().highlight();
  av.step();

  av.umsg("The next bit is a 1 so branch right");
  r.right().left().right().highlight();
  av.step();

  av.umsg("This leads us to a D which is the final letter of \"DEED\".");

  // initial display
  av.recorded();

}(jQuery));

(function ($) {

  var av = new JSAV("timeline");

  var t = construct_tree(av);
  var r = t.root("");

  t.layout();

  av.umsg("To demonstrate to characteristics of a trie, we will display this on a number line.");
  var tl = new_timeline(av, 60, 450, 450, 0, 100, undefined);
  av.displayInit();

}(jQuery));

function new_timeline(av, x, y, len, min, max, prop) { 
  
  if (prop == undefined) {
    // make line
    av.g.rect(x, y, len, 3, {fill: "black", "stroke-width": 0});
  }
  else {
    // make line
    av.g.rect(x, y, len, 3, prop);
  }

  // arrows
  av.g.polyline([[x, y + 11], [x, y - 9], [x - 10, y + 1]], 
    {"stroke-width": 0, fill: "black"});
  av.g.polyline([[x + len, y + 11], [x + len, y - 9], [x + 10 + len, y + 1]], 
    {"stroke-width": 0, fill: "black"});

  return {x: x, y: y, len: len, min: min, max: max};
}

function timeline_line(av, tl, x, label) {
  av.g.rect(tl.x + x, tl.y - 25, 2, 50, {fill: "red", "stroke-width": 0});
  av.label(label, {left: tl.x + x - 4, top: tl.y - 45});
}

function timeline_value(av, tl, val, label) {
  var range = tl.max - tl.min;
  var pxPerInc = tl.len / range;
  var pos = pxPerInc * val;

  timeline_line(av, tl, pos, label);
}

function construct_tree(av) {

  var t = av.ds.bintree({nodegap: 25});
  var r = t.root("");

  // constructs tree
  r.left("E");
  r.right("").right("").right("").right("").right("M<br>24");
  r.right().left("").left("U<br>37");
  r.right().left().right("D<br>42");
  r.right().right().left("L<br>42");
  r.right().right().right().left("C<br>32");
  r.right().right().right().right().left("");
  r.right().right().right().right().left().left("Z<br>2");
  r.right().right().right().right().left().right("K<br>7");

  // add more classes for leaf nodes for css styling
  r.right().right().right().right().right().addClass("huffmanleaf");
  r.right().left().left().addClass("huffmanleaf");
  r.right().left().right().addClass("huffmanleaf");
  r.right().right().left().addClass("huffmanleaf");
  r.right().right().right().left().addClass("huffmanleaf");
  r.right().right().right().right().left().left().addClass("huffmanleaf");
  r.right().right().right().right().left().right().addClass("huffmanleaf");

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

  return t;
}