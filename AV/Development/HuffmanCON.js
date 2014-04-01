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
  var t = av.ds.bintree({nodegap: 25});
  var r = t.root("19");
  var tl = new timeline(av, 40, 350, 500, 0, 65);
  t.layout();

  av.umsg("To demonstrate to characteristics of a tree, we will display this on a number line. We first insert 19.");
  av.displayInit();

  // step 1
  av.umsg("19 is now displayed on the numberline. Notice the numberline is split at 19");
  var split1 = tl.add_value(19, "19");
  split1.highlight();
  av.step();

  // step 2
  av.umsg("We now add 14 to the tree. A split is made at 14.");
  tl.add_value(14, "14");
  r.left("14");
  r.left().highlight();
  t.layout();
  av.step();

  // step 3
  av.umsg("9 is added to the tree.");
  tl.add_value(9, "9");
  r.left().left("9");
  r.left().unhighlight();
  r.left().left().highlight();
  t.layout();
  av.step();

  // step 4
  av.umsg("Now 50 is added. As before, we split at 50.");
  tl.add_value(50, "50");
  r.right("50");
  r.left().left().unhighlight();
  r.right().highlight();
  t.layout();
  av.step();

  // step 5
  av.umsg("Now 54 is added.");
  tl.add_value(54, "54");
  r.right().right("54");
  r.right().unhighlight();
  r.right().right().highlight();
  t.layout();
  av.step();

  // step 6
  av.umsg("Now we add 63.");
  tl.add_value(63, "63");
  r.right().right().right("63");
  r.right().right().unhighlight();
  r.right().right().right().highlight();
  t.layout();
  av.step();

  // step 7
  av.umsg("Now add 12.");
  tl.add_value(12, "12");
  r.left().left().right("12");
  r.right().right().right().unhighlight()
  r.left().left().right().highlight();
  t.layout();
  av.step();

  // step 8
  av.umsg("Now add 17 and note the corresponding split.");
  tl.add_value(17, "17");
  r.left().right("17");
  r.left().left().right().unhighlight();
  r.left().right().highlight();
  t.layout();
  av.step();

  // step 9
  av.umsg("Now add 56.");
  tl.add_value(56, "56");
  r.right().right().right().left("56");
  r.left().right().unhighlight();
  r.right().right().right().left().highlight();
  t.layout();
  av.step();

  // step 10
  av.umsg("Now add 59.");
  tl.add_value(59, "59");
  r.right().right().right().left().right("59");
  r.right().right().right().left().unhighlight();
  r.right().right().right().left().right().highlight();
  t.layout();
  av.step();

  // step 11
  av.umsg("Our last number to add is 23.");
  tl.add_value(23, "23");
  r.right().left("23");
  r.right().right().right().left().right().unhighlight();
  r.right().left().highlight();
  t.layout();
  av.step();

  // cleanup
  av.recorded();

}(jQuery));

function split (av, x, x1, y, label) {
  this.x = x;
  this.label = label;

  this.rec = av.g.rect(x + x1, y - 25, 2, 50, {fill: "red", "stroke-width": 0});
  this.label = av.label(label, {left: x + x1 - 4, top: y - 45});

  this.highlight = function () {
    // this.rec.css("background-color:black");
  };
}

/* Timeline Constructor */
function timeline(av, x, y, len, min, max) { 
  
  // make line
  av.g.rect(x, y, len, 3, {fill: "black", "stroke-width": 0});
  // arrows
  av.g.polyline([[x, y + 11], [x, y - 9], [x - 10, y + 1]], 
    {"stroke-width": 0, fill: "black"});
  av.g.polyline([[x + len, y + 11], [x + len, y - 9], [x + 10 + len, y + 1]], 
    {"stroke-width": 0, fill: "black"});

  this.add_line = function (x1, label) {
    return new split (av, x, x1, y, label);
  };

  this.add_value = function (val, label) {
    var range = max - min;
    var pxPerInc = len / range;
    var pos = pxPerInc * val;
    return this.add_line(pos, label);
  };
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