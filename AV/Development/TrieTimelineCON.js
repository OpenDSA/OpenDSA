// Timeline visulization showing how a trie (NOT tree) splits space.
(function ($) {

  var av = new JSAV("TrieTimelineCON");
  var t = av.ds.binarytree({nodegap: 25});
  var r = t.root("");
  r.addClass("huffmanleaf");
  var tl = new timeline(av, 49, 325, 500, 0, 64, 10);

  var ht1 = 40;
  var hts = 105; // height of split

  // colors for animation
  var highlight_background_color = "#2B44CF";       // blue
  var highlight_text_color = "white";               // white
  var unhighlight_background_color = "white";       // white
  var unhighlight_background_split_color = "black"; // black
  var split_color = "#3BC423";                      // green

  av.umsg("To demonstrate to characteristics of a trie, we will display this on a number line. We start with an emtpy trie.");
  t.layout(); // multiple layout() calls to fix off center tree issue
  av.displayInit();

  // step 1
  av.umsg("First we add 38 to the trie. There is no split required.");
  r.value(38);
  var split38 = tl.add_value(38, "38", ht1, {label_top: true});
  fillpair(r, split38, highlight_background_color);
  av.step();

  // step 2
  av.umsg("We now add 19. A single split is required to split the timeline in half at a value of 32.");
  r.value(32);
  r.removeClass("huffmanleaf");
  r.left(19);
  r.left().addClass("huffmanleaf");
  r.right(38);
  r.right().addClass("huffmanleaf");
  var split32 = tl.add_value(32, "32", hts); // huffman split (not value)
  var split19 = tl.add_value(19, "19", ht1, {label_top: true}); // val split
  fillpair(split19, r.left(), highlight_background_color); // fill the value inserted
  fillpair(split32, r, split_color);  // fill the split inserted
  split38.css({"fill": "black"});
  t.layout();
  av.step();

  // step 3 -- add 7
  av.umsg("We now want to add 7. This requires a single split at a value of 16.");
  r.left().removeClass("huffmanleaf");
  r.left(16);
  r.left().left(7);
  r.left().left().addClass("huffmanleaf");
  r.left().right(19);
  r.left().right().addClass("huffmanleaf");
  var split16 = tl.add_value(16, "16", hts); // the huffman split
  var split7 =  tl.add_value(7, "7", ht1, {label_top: true}); // the value split
  fillpair(split16, r.left(), split_color);
  fillpair(split7, r.left().left(), highlight_background_color);
  split19.css({"fill": "black"});
  t.layout();
  av.step();

  // step 4 -- add 45 first split
  av.umsg("We now want to add 45. This requires two splits. The first split is at value 48.");
  r.right(48);
  r.right().removeClass("huffmanleaf");
  r.right().left(38);
  r.right().left().addClass("huffmanleaf");
  r.right().right("");
  r.right().right().addClass("huffmanleaf");
  var split48 = tl.add_value(48, "48", hts); // the huffman split
  fillpair(split48, r.right(), split_color);
  split7.css({"fill": "black"});
  r.left().left().css({"background-color": "white"})
  t.layout();
  av.step();

  // step 5 -- add second split
  av.umsg("We now try again to add 45. This brings us to the leaf node of 38 which requires another split at 40.");
  r.right().left(40);
  r.right().left().left(38);
  r.right().left().removeClass("huffmanleaf");
  //  r.right().left().left().addClass("huffmanleaf");
  var split40 = tl.add_value(40, "40", hts); // the huffman split
  fillpair(split40, r.right().left(), split_color);
  t.layout();
  r.right().left().left().addClass("huffmanleaf");
  av.step();

  // step 6 -- finally add 45
  av.umsg("We can now add 45 since it falls to the right of the split at 40.");
  r.right().left().right(45);
  r.right().left().right().addClass("huffmanleaf");
  var split45 = tl.add_value(45, "45", ht1, {"label_top": true}); // the value split
  fillpair(split45, r.right().left().right(), highlight_background_color);
  t.layout();
  av.step();

  // step 7 -- try to add 50
  av.umsg("Now we try to add 50. Following the internal nodes, we reach the empty leaf node.");
  r.right().right(50);
  r.right().left().right().css({"background-color": "white"})
  var split50 = tl.add_value(50, "50", ht1, {"label_top": true}); // the value split
  fillpair(split50, r.right().right(), highlight_background_color);
  split45.css({"fill": "black"});
  av.step();

  // cleanup
  av.recorded();

}(jQuery));

function fillpair(node, split, color)
{
  node.css({"fill": color});
  node.css({"background-color": color});
  split.css({"background-color": color});
  split.css({"fill": color});
}

function split (av, x, x1, y, label, height, top) {

  var label_ht = y - (height/2) - 20;
  if (top) { label_ht = y + (height/2) + 5};

  this.x = x;
  this.label = label;

  this.rec = av.g.rect(x + x1, y - (height / 2), 2, height, {fill: "red", "stroke-width": 0});
  this.label = av.label(label, {left: x + x1 - 9, top: label_ht});

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
  this.add_line = function (x1, label, height, top) {
    return new split (av, x, x1, y, label, height, top);
  };

  /* Inserts a split at the numebr 'val' with label 'label' and
   * height 'height'.
   *
   * Returns: The split obejct.
   */
  this.add_value = function (val, label, height, prop) {

    var top = false;
    if (typeof(prop) != 'undefined' && typeof(prop.label_top) != 'undefined') { top = true; }

    var range = max - min;
    var pxPerInc = (len - buffer * 2) / range; // 5px buff on each inner side of arrow
    var pos = pxPerInc * val; // add 5 because must account for 5 px buffer
    return this.add_line(pos, label, height, top);
  };
}
