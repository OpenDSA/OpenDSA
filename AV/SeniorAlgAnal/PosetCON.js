// Written by Yuhui Lyu and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "PosetCON";
  var av = new JSAV(av_name);
  var xoffset = 50;
  var yoffset = 10;
  var gr = av.ds.graph({width: 400, height: 450, layout: "manual", directed: false});
  gr.addNode("A", {left: xoffset + 0, top: yoffset + 0});
  gr.addNode("B", {left: xoffset + 50, top: yoffset + 0});
  var c = gr.addNode("C", {left: xoffset + 100, top: yoffset + 0});
  var d = gr.addNode("D", {left: xoffset + 150, top: yoffset + 0});
  var e = gr.addNode("E", {left: xoffset + 200, top: yoffset + 0});
  var f = gr.addNode("F", {left: xoffset + 250, top: yoffset + 0});
  var g = gr.addNode("G", {left: xoffset + 300, top: yoffset + 0});

  // Slide 1
  av.umsg("Initially, we have seven objects, whose names are A through G. We know nothing at the start about the value of each object. So we initially put them all on the same level, and they are unconnected from each other.");
  av.displayInit();

  // Slide 2
  gr.removeNode(d);
  d = gr.addNode("D", {left: xoffset + 50, top: yoffset + 80});
  gr.addEdge(c, d);
  gr.layout();
  av.umsg("For whatever reason, we decide to Compare C with D. We find that C is smaller than D. We represent this knowledge by connecting them with a line, and we put C above D. As a result, there are six partial orders left (since C and D are combined into a single parital order).");
  av.step();

  // Slide 3
  gr.removeNode(e);
  e = gr.addNode("E", {left: xoffset + 150, top: yoffset + 80});
  gr.addEdge(e, c);
  av.umsg("Next, we decide to compare C with E, and we happen to find that C has a value less than E. Represent this with a line from C to E, with C above E. Note that while we still know that C is less than D, we don't know anything about how D and E compare to each other. Now there are 5 separate partial orders.");
  gr.layout();
  av.step();

  // Slide 4
  gr.removeNode(f);
  f = gr.addNode("F", {left: xoffset + 150, top: yoffset + 160});
  gr.addEdge(f, e);
  gr.layout();
  av.umsg("Next we decide to compare E with F, and we find that E is less than F. So we draw a line between E and F, with E above F. Of course, this means that C is also less than F. Now there are 4 partial orders.");
  av.step();

  // Slide 5
  gr.removeNode(g);
  g = gr.addNode("G", {left: xoffset + 200, top: yoffset + 0});
  gr.addEdge(g, e);
  gr.layout();
  av.umsg("Next we decide to compare E with G, and we find that the value for G happens to be less than the value for E. So we draw a line connecting G to E, with G above E. We don't know anything about how C and G compare. Of course, we now know that G is less than F. Now there are 3 partial orders.");
  av.recorded();
});
