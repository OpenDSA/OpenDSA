/*
 * Shows how to decode the string '11101' to reach the character "K".
 */
(function ($) {
  var av = new JSAV("HuffmanCon2");
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

/*
 * A static image of the huffman tree. This is used for a "dgm" not an "ss"
 */
(function ($) {
  var av = new JSAV("HuffmanCon5");
  var t = construct_tree(av);
  var r = t.root("");

  // initial display
  t.layout();
}(jQuery));

/*
 * Shows how we derived a code of '11111' for the character "M"
 * in the given huffman tree.
 */
(function ($) {
  var av = new JSAV("HuffmanCon4");
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

/*
 * Shows an example huffman tree and shows how to decode the word "DEED"
 * using that tree.
 */
(function ($) {
  var av = new JSAV("HuffmanCon3");
  
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

/* 
 * Constructs the standard tree used in HuffmanCon1 - HuffmanCon5
 * AVs in this file.
 */
function construct_tree(av) {

  var t = av.ds.binarytree({nodegap: 25});
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


/*
 * This is the AV for the timeline visulization for showing how a tree (NOT trie)
 * splits space. 
 */
(function ($) {
  var av = new JSAV("TreeTimeline");
  var t = av.ds.binarytree({nodegap: 25});
  var r = t.root("36");
  t.layout();
  var tl = new timeline(av, 40, 325, 500, 0, 65, 10);
  
  // These vars correspond the the height of each line corresponding
  // to the level of the tree. For example, ht1 is the height of the
  // split (on the timeline) for a node in the first level of the 
  // tree (the root node). To make the split longer, increase the
  // value of ht1 and so on.
  var ht1 = 95;
  var ht2 = 80;
  var ht3 = 65;
  var ht4 = 50;
  var ht5 = 35;
  var ht6 = 20;

  // colors for animation
  var highlight_background_color = "#2B44CF";
  var highlight_text_color = "white";
  var unhighlight_background_color = "white";
  var unhighlight_background_split_color = "black";

  av.umsg("To demonstrate to characteristics of a tree, we will display this on a number line. We first insert 36.");
  t.layout(); // multiple layout() calls to fix off center tree issue
  av.displayInit();
  t.layout();
  // step 1
  av.umsg("36 is now displayed on the numberline. Notice the numberline is split at 36");
  var split36 = tl.add_value(36, "36", ht1);
  r.css({"background-color": highlight_background_color, "color": "white"});
  split36.css({"fill": highlight_background_color});
  av.step();

  // step 2
  av.umsg("We now add 18 to the tree. A split is made at 18.");
  var split18 = tl.add_value(18, "18", ht2);
  split18.css({"fill": highlight_background_color});
  r.left("18");
  r.left().css({"background-color": highlight_background_color, "color": "white"});
  r.css({"background-color": unhighlight_background_color, "color": "black"});
  split36.css({"fill": unhighlight_background_split_color});
  t.layout();
  av.step();

  // step 3
  av.umsg("9 is added to the tree.");
  var split9 = tl.add_value(9, "<div id='ninelabel'>9</div>", ht3);
  split9.css({"fill": highlight_background_color});
  split18.css({"fill": unhighlight_background_split_color});
  r.left().left("9");
  r.left().css({"background-color": unhighlight_background_color, "color": "black"});
  r.left().left().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 4
  av.umsg("Now 43 is added. As before, we split at 43.");
  var split43 = tl.add_value(43, "43", ht2);
  split43.css({"fill": highlight_background_color});
  split9.css({"fill": unhighlight_background_split_color});
  r.right("43");
  r.left().left().css({"background-color": unhighlight_background_color, "color": "black"});
  r.right().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 5
  av.umsg("Now 50 is added.");
  var split50 = tl.add_value(50, "50", ht3);
  split50.css({"fill": highlight_background_color});
  split43.css({"fill": unhighlight_background_split_color});
  r.right().right("50");
  r.right().css({"background-color": unhighlight_background_color, "color": "black"});
  r.right().right().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 6
  av.umsg("Now we add 63.");
  var split63 = tl.add_value(63, "63", ht4);
  split63.css({"fill": highlight_background_color});
  split50.css({"fill": unhighlight_background_split_color});
  r.right().right().right("63");
  r.right().right().css({"background-color": unhighlight_background_color, "color": "black"});
  r.right().right().right().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 7
  av.umsg("Now add 12.");
  var split12 = tl.add_value(12, "12", ht4);
  split12.css({"fill": highlight_background_color});
  split63.css({"fill": unhighlight_background_split_color});
  r.left().left().right("12");
  r.right().right().right().css({"background-color": unhighlight_background_color, "color": "black"})
  r.left().left().right().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 8
  av.umsg("Now add 30 and note the corresponding split.");
  var split30 = tl.add_value(30, "30", ht3);
  split30.css({"fill": highlight_background_color});
  split12.css({"fill": unhighlight_background_split_color});
  r.left().right("30");
  r.left().left().right().css({"background-color": unhighlight_background_color, "color": "black"});
  r.left().right().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 9
  av.umsg("Now add 55.");
  var split55 = tl.add_value(55, "55", ht5);
  split55.css({"fill": highlight_background_color});
  split30.css({"fill": unhighlight_background_split_color});
  r.right().right().right().left("55");
  r.left().right().css({"background-color": unhighlight_background_color, "color": "black"});
  r.right().right().right().left().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 10
  av.umsg("Now add 59.");
  var split59 = tl.add_value(59, "59", ht6);
  split59.css({"fill": highlight_background_color});
  split55.css({"fill": unhighlight_background_split_color});
  r.right().right().right().left().right("59");
  r.right().right().right().left().css({"background-color": unhighlight_background_color, "color": "black"});
  r.right().right().right().left().right().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 11
  av.umsg("Our last number to add is 23.");
  var split23 = tl.add_value(23, "23", ht3);
  split23.css({"fill": highlight_background_color});
  split59.css({"fill": unhighlight_background_split_color});
  r.right().left("23");
  r.right().right().right().left().right().css({"background-color": unhighlight_background_color, "color": "black"});
  r.right().left().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 12
  av.umsg("We have reached our final tree and corresponding number line.")
  split23.css({"fill": unhighlight_background_split_color});
  r.right().left().css({"background-color": unhighlight_background_color, "color": "black"});
  t.layout();
  av.step();

  // cleanup
  av.recorded();

}(jQuery));

/*
 * This is the AV for the timeline visulization for showing how a tree (NOT trie)
 * splits space. 
 */
(function ($) {
  var av = new JSAV("TrieTimeline");
  var t = new window.tree.Bintree(av, 10, 0, 50);

  av.umsg("We first insert 36.");
  av.displayInit();

  t.insert(50);
  t.insert(60);

  t.layout();
  av.step();

  // cleanup
  av.recorded();

}(jQuery));

function split (av, x, x1, y, label, height) {
  this.x = x;
  this.label = label;

  this.rec = av.g.rect(x + x1, y - (height / 2), 2, height, {fill: "red", "stroke-width": 0});
  this.label = av.label(label, {left: x + x1 - 9, top: y - (height/2) - 20});

  this.highlight = function () {
    this.rec.css({"fill": "#2B44CF"});
  };

  this.unhighlight = function () {
    this.rec.css({"fill": "red"});
  };

  this.css = function (css) {
    this.rec.css(css);
  }
}

/* Timeline Constructor */
function timeline(av, x, y, len, min, max, inc) { 
  
  var buffer = 15; // 15 px buffer on each inside edge of arrow

  // make line
  av.g.rect(x, y, len, 3, {fill: "black", "stroke-width": 0});
  // arrows
  av.g.polyline([[x, y + 11], [x, y - 9], [x - 10, y + 1]], 
    {"stroke-width": 0, fill: "black"});
  av.g.polyline([[x + len, y + 11], [x + len, y - 9], [x + 10 + len, y + 1]], 
    {"stroke-width": 0, fill: "black"});

  // first and last tick marks
  av.g.rect(x + buffer, y - 6, 1, 16, {fill: "black", "stroke-width":0});
  av.g.rect(x + len - buffer, y - 6, 1, 15, {fill: "black", "stroke-width":0});

  // labels under those tick marks
  var firstLab = av.label(min, {"left": x + buffer - 3, "top": y + 7});
  firstLab.css({"font-size": 13});

  var secLab = av.label(max, {"left": x - buffer - 5 + len, "top": y + 7});
  secLab.css({"font-size": 13});
  /* 
   * Splits the timeline at 'x1' pixels from the rigth side with a line with 
   * label 'label' and height 'height'.
   *
   * Returns: The split object.
   */
  this.add_line = function (x1, label, height) {
    return new split (av, x, x1, y, label, height);
  };

  /* Inserts a split at the numebr 'val' with label 'label' and 
   * height 'height'.
   *
   * Returns: The split obejct. 
   */
  this.add_value = function (val, label, height) {
    var range = max - min;
    var pxPerInc = (len - buffer * 2) / range; // 5px buff on each inner side of arrow
    var pos = pxPerInc * val; // add 5 because must account for 5 px buffer
    return this.add_line(pos, label, height);
  };
}
