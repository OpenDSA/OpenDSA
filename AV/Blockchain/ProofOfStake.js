/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "ProofOfStake";
  var av = new JSAV(av_name);
  
  var topMargin = 50;
  var leftMargin = 390;
  let leftAdding = 54;
  var blocktop = 17;

  var graph = av.ds.graph({visible: true, left: -10, top: blocktop, height: 300, width: 300});

  av.umsg("The white nodes on perimeter of the graph represent thin nodes while the blue interior nodes represent validator nodes. A Validator for the current block has not yet been selected.");

  // Thin Nodes
  graph.css({"font-size": "12px"});
  const a = graph.addNode('1', { "left": "200px", "bottom":"700px"});
  const b = graph.addNode('2', {"left": "100px", "top":"150px"});
  const c = graph.addNode('3', {"left": "200px", "top":"300px"});
  const d = graph.addNode('4', {"left": "300px", "top":"150px"});


  // Validator Nodes
  const val1 = graph.addNode('V1', {"left": "150px", "top":"100px"});
  const val2 = graph.addNode('V2', {"left": "250px", "top":"100px"});
  const val3 = graph.addNode('V3', {"left": "200px", "top":"150px"});
  val1.addClass('bluenode');
  val2.addClass('bluenode');
  val3.addClass('bluenode');
  av.displayInit();

  // Slide 2
  av.umsg("The Validator for the current block has now been selected as shown in yellow.");
  val1.addClass('yellownode');
  av.step();

  // Slide 3
  av.umsg("The selected validator node will now begin to collect transactions that are broadcasted by thin nodes until it has assembled enough to propose a new block.")
  const av1Edge = graph.addEdge(a, val1).addClass("orangeedge");
  const bv1Edge = graph.addEdge(b, val1).addClass("orangeedge");
  const cv1Edge = graph.addEdge(c, val1).addClass("orangeedge");
  const dv1Edge = graph.addEdge(d, val1).addClass("orangeedge");

  av.step();

  // Slide 4
  av.umsg("The selected validator node has now assembled enough transactions to propose a new block.");
  av1Edge.hide();
  bv1Edge.hide();
  cv1Edge.hide(); 
  dv1Edge.hide();
  
  var v1Block = av.ds.list({"left": "175px", "top":"100px", nodegap: 10}).addFirst("V1 Block");

  av.step();

  // Slide 5
  av.umsg("The selected validator node will now begin to broadcast the new block to the network.");
  a.hide();
  b.hide();
  c.hide();
  d.hide();

  //TODO: Animate V1 moving lower beneath V2 and V3 while the V1 Block sits between them
  // V2          V3
  //    V1 Block
  //       V1


  av.step();

  // Slide 6
  av.umsg("All non-validator nodes will now vote with their staked currency on the legitimacy and validity of the proposed block by V1.");
  //TODO: Find a way to animate / visualize a pie chart and/or a multi-color slider progress bar
  av.step(); 

  // Slide 7
  av.umsg("A majority of staked currency from non-validator nodes has voted in-favor of this block and thus, the block gets appended.");

  av.recorded();
});

