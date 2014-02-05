"use strict";

/* Static image of incorrect huffman trie */
(function ($) {
  var av = new JSAV("InvalidTree");
  var t = av.ds.bintree();
  t.root("");
  
  // -------- left side --------
  // set nodes
  t.root().left("V");
  t.root().left().left("I1");
  t.root().left().right("I2");
  // hide I1 node
  t.root().left().left().hide();
  t.root().left().edgeToLeft().show();
  // hide I2 node
  t.root().left().right().hide();
  t.root().left().edgeToRight().show();
  
  // -------- right side --------
  // set nodes
  t.root().right("U");
  t.root().right().left(20);
  t.root().right().right("X");
  t.root().right().right().left("V");
  t.root().right().right().right(20);
  // Hide first 20
  t.root().right().left().hide();
  t.root().right().edgeToLeft().show();
  // Hide V
  t.root().right().right().left().hide();
  t.root().right().right().edgeToLeft().show();
  // Hide second 20
  t.root().right().right().right().hide();
  t.root().right().right().edgeToRight().show();

  t.layout();

  // top line
  var line = av.g.line(183, 57, 231, 8);

  var recProp = {"stroke": "black", "stroke-width": 1, "opacity": 1, "fill": "white", "text": "Hi"};
  av.g.rect(11, 228, 45, 45, recProp);
  av.g.rect(99, 228, 44, 44, recProp);
  
  console.log("poly");
  av.g.polygon([[221, 228], [199, 272], [243, 272]], recProp);
  av.g.polygon([[266, 315], [245, 359], [289, 359]], recProp);
  av.g.polygon([[331, 315], [310, 359], [354, 359]], recProp);
  console.log("poly");

}(jQuery));
