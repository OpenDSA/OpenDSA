/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "ProofOfStakeConflict";
  var av = new JSAV(av_name);
  
  var topMargin = 50;
  var leftMargin = 390;
  let leftAdding = 54;
  var blocktop = 17;

  var graph = av.ds.graph({visible: true, left: -10, top: blocktop, height: 300, width: 300});

  av.umsg("Take a similar example network as shown below with thin network nodes in white and validator nodes in blue.");

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

  // Blockchain Current State
  var blockchain = av.ds.list({top: blocktop + 0, left: "550px", nodegap: 10});
  blockchain.addFirst("Blk 2").addFirst("Blk 1");
  blockchain.layout({updateTop: false});


  // BUG: THIS IS NOT WORKING FOR RESIZING NODES
  val1.addClass('smallNode');
  val2.addClass('mediumNode');
  val3.addClass('largeNode');

  av.displayInit();

  // Slide 2
  av.umsg("Let us assume that V3, shown in red, has been selected by the network to propose a new block.");
  val3.removeClass('bluenode');
  val3.addClass('rednode');
  av.step();

  // Slide 3
  av.umsg("Despite V3 being selected, the validator node is offline and unable to respond in time to propose a new block.")
  val3.removeClass('rednode');
  val3.addClass('graynode');

  av.step();

  // Slide 4
  av.umsg("In order to encourage and incentivize network participation, there must exist a penalty for misbehaving or unresponsive validator nodes. In this case, the staked coins of V3 will be slashed and the validator node will be removed from the network.");
  val3.hide();

  av.step();

  // Slide 5
  av.umsg("The network will then select a new validator node to propose a the next block and the network can continue to operate.");
  val1.removeClass('bluenode');
  val1.addClass("yellownode");
  av.recorded();
});

