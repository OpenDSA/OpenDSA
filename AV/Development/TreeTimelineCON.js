/*
 * This is the AV for the timeline visulization for showing how a tree (NOT trie)
 * splits space. 
 */
(function ($) {
  var av = new JSAV("TreeTimelineCON");
  var t = av.ds.binarytree({nodegap: 25});
  var r = t.root("36");
  t.layout();
  var tl = new timeline(av, 49, 325, 500, 0, 70, 10);
  
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
  r.left().right().left("23");
  r.right().right().right().left().right().css({"background-color": unhighlight_background_color, "color": "black"});
  r.left().right().left().css({"background-color": highlight_background_color, "color": "white"});
  t.layout();
  av.step();

  // step 12
  av.umsg("We have reached our final tree and corresponding number line.")
  split23.css({"fill": unhighlight_background_split_color});
  r.left().right().left().css({"background-color": unhighlight_background_color, "color": "black"});
  t.layout();
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
