$(document).ready(function() {
  "use strict";
  var av_name = "PosetSlideCON";
  var av = new JSAV(av_name);
  var xoffset = 50;
  var yoffset = 80;
  var gr = av.ds.graph({width: 400, height: 450, layout: "manual", directed: false});
  var a = gr.addNode("A", {"left": xoffset + 0, "top": yoffset + 0});
  var b = gr.addNode("B", {"left": xoffset + 50, "top": yoffset + 0});
  var c = gr.addNode("C", {"left": xoffset + 100, "top": yoffset + 0});
  var d = gr.addNode("D", {"left": xoffset + 150, "top": yoffset + 0});
  var e = gr.addNode("E", {"left": xoffset + 200, "top": yoffset + 0});
  var f = gr.addNode("F", {"left": xoffset + 250, "top": yoffset + 0});
  var g = gr.addNode("G", {"left": xoffset + 300, "top": yoffset + 0});
  

  av.umsg("Let n = 7, there are 7 elements in the list L.");
  av.displayInit();
  // We are now starting a new slide (#2)
  av.umsg("..which means there are 7 separate partial orders.");
  av.step();
  // We are now starting a new slide (#3)
  av.umsg("Compare C with D, which combines them together and generates a new partial order CD(D is greater than C). Now there are 6 partial orders left.");
  gr.removeNode(d);
  var d = gr.addNode("D", {"left": xoffset + 50, "top": yoffset + 80});
  gr.addEdge(c, d);
  gr.layout();

  av.step();
  // We are now starting a new slide (#4)
  av.umsg("Compare C with E, which combines CD and E together and generates a new partial order CDE(E is greater than C). Now there are 5 partial orders.");
  gr.removeNode(e);
  var e = gr.addNode("E", {"left": xoffset + 150, "top": yoffset + 80});
  gr.addEdge(e, c);
  gr.layout();

  av.step();
  // We are now starting a new slide (#5)
  av.umsg("Compare E with F, which combines CDE and F together and and generates a new partial order CDEF(F is greater than E). Now there are 4 partial orders.");
  gr.removeNode(f);
  var f = gr.addNode("F", {"left": xoffset + 150, "top": yoffset + 160});
  gr.addEdge(f, e);
  gr.layout();

  av.step();
  // We are now starting a new slide (#6)
  av.umsg("Compare E with G, which combines CDEF and G together and and generates a new partial order CDEFG(E is greater than G). Now there are 3 partial orders.");
  gr.removeNode(g);
  var g = gr.addNode("G", {"left": xoffset + 200, "top": yoffset + 0});
  gr.addEdge(g, e);
  gr.layout();
  
  av.recorded();
});
