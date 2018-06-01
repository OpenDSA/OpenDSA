// Show how to decode the word "DEED"
/*global ODSA */
$(document).ready(function() {
  "use strict";

  var av_name = "huffmanDecodeCON";
  var config = ODSA.UTILS.loadConfig(
        {av_name: av_name, json_path: "/AV/Binary/huffman.json"}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);

  var t = construct_tree(av);
  var r = t.root();

  // Slide 1
  av.umsg(interpret("av_c8"));
  t.layout();
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c9"));
  av.step();

  // Slide 3
  av.umsg(interpret("av_c10") + interpret("av_c11"));
  r.highlight();
  av.step();

  // Slide 4
  av.umsg(interpret("av_c10") + interpret("av_c12"));
  r.right().highlight();
  av.step();

  // Slide 5
  av.umsg(interpret("av_c10") + interpret("av_c13"));
  r.right().left().highlight();
  av.step();

  // Slide 6
  av.umsg(interpret("av_c10") + interpret("av_c14"));
  r.right().left().right().highlight();
  av.step();

  // Slide 7
  av.umsg(interpret("av_c10") + interpret("av_c15"));
  av.step();

  // Slide 8
  av.umsg(interpret("av_c10") + interpret("av_c16"));
  r.right().unhighlight();
  r.right().left().unhighlight();
  r.right().left().right().unhighlight();
  av.step();

  // Slide 9
  av.umsg(interpret("av_c10") + interpret("av_c17"));
  r.left().highlight();
  av.step();

  // Slide 10
  av.umsg(interpret("av_c10") + interpret("av_c18"));
  av.step();

  // Slide 11
  r.left().unhighlight();
  av.umsg(interpret("av_c10") + interpret("av_c19"));
  av.step();

  // Slide 12
  av.umsg(interpret("av_c10") + interpret("av_c20"));
  r.left().highlight();
  av.step();

  // Slide 13
  av.umsg(interpret("av_c10") + interpret("av_c21"));
  r.left().unhighlight();
  av.step();

  // Slide 14
  av.umsg(interpret("av_c10") + interpret("av_c22"));
  r.right().highlight();
  av.step();

  // Slide 15
  av.umsg(interpret("av_c10") + interpret("av_c23"));
  r.right().left().highlight();
  av.step();

  // Slide 16
  av.umsg(interpret("av_c10") + interpret("av_c22"));
  r.right().left().right().highlight();
  av.step();

  // Slide 17
  av.umsg(interpret("av_c24"));
  av.recorded();


  // Constructs the standard tree used in the slideshow
  function construct_tree(theav) {
    var theTree = theav.ds.binarytree({nodegap: 25});
    var rt = theTree.root("");

    // constructs tree
    rt.left("E<br>120");
    rt.right("").right("").right("").right("").right("M<br>24");
    rt.right().left("").left("U<br>37");
    rt.right().left().right("D<br>42");
    rt.right().right().left("L<br>42");
    rt.right().right().right().left("C<br>32");
    rt.right().right().right().right().left("");
    rt.right().right().right().right().left().left("Z<br>2");
    rt.right().right().right().right().left().right("K<br>7");

    // Add more classes for leaf nodes for css styling
    rt.left().addClass("huffmanleaf");
    rt.right().right().right().right().right().addClass("huffmanleaf");
    rt.right().left().left().addClass("huffmanleaf");
    rt.right().left().right().addClass("huffmanleaf");
    rt.right().right().left().addClass("huffmanleaf");
    rt.right().right().right().left().addClass("huffmanleaf");
    rt.right().right().right().right().left().left().addClass("huffmanleaf");
    rt.right().right().right().right().left().right().addClass("huffmanleaf");

    // Add edge labels
    rt.edgeToLeft().label("0");
    rt.edgeToRight().label("1");
    rt.right().edgeToLeft().label("0");
    rt.right().left().edgeToLeft().label("0");
    rt.right().left().edgeToRight().label("1");
    rt.right().edgeToRight().label("1");
    rt.right().right().edgeToLeft().label("0");
    rt.right().right().edgeToRight().label("1");
    rt.right().right().right().edgeToLeft().label("0");
    rt.right().right().right().edgeToRight().label("1");
    rt.right().right().right().right().edgeToRight().label("1");
    rt.right().right().right().right().edgeToLeft().label("0");
    rt.right().right().right().right().left().edgeToLeft().label("0");
    rt.right().right().right().right().left().edgeToRight().label("1");

    return theTree;
  }
});
