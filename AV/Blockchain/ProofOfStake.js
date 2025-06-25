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

  av.umsg("The white nodes on perimeter of the graph represent 'thin nodes', essentially just users of the Ethereum network. The blue interior nodes represent the set of validator nodes that were selected to be part of the validation committee. A singular validator for the current block has not yet been selected. You will notice the validator nodes vary in size, this is done in proportion to how much each validator is staking. The bigger nodes represent a validator who has staked more tokens.");

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
  av.umsg("The validator for the current block has now been selected as shown in yellow. This validator is responsible for generating and proposing the next block.");
  val3.addClass('yellownode');
  av.step();

  // Slide 3
  av.umsg("The selected validator node will now assemble transactions into a block. These transactions are publicly visible to all nodes on the network.")
  const av3Edge = graph.addEdge(a, val3).addClass("orangeedge");
  const bv3Edge = graph.addEdge(b, val3).addClass("orangeedge");
  const cv3Edge = graph.addEdge(c, val3).addClass("orangeedge");
  const dv3Edge = graph.addEdge(d, val3).addClass("orangeedge");

  av.step();

  // Slide 4
  av.umsg("The selected validator node has now assembled enough transactions to propose a new block.");
  av3Edge.hide();
  bv3Edge.hide();
  cv3Edge.hide(); 
  dv3Edge.hide();
  
  var v3Block = av.ds.list({"left": "165px", "top":"185px", nodegap: 10}).addFirst("V3 Block");

  av.step();

  // Slide 5
  av.umsg("The selected validator node will now begin to broadcast the new block to the network so that the validation committee can begin voting.");
  a.hide();
  b.hide();
  c.hide();
  d.hide();
  val1.addClass('topLeftSpot')
  val2.addClass('topRightSpot')
  val3.addClass('proposalSpot')
  v3Block.addClass('deadCenterBlock');


  av.step();

  // Slide 6
  av.umsg("All other committee members nodes will now vote with their staked currency on whether or not to approve the block proposed by V3. It is important to note that the committee members have voting power in proportion to their amount of staked currency.");
  
  
  var rect1 = av.g.set();
  rect1.push(av.g.rect(400, 100 + 50, 50, 200));
  rect1.css({fill: "gray"});
  
  av.label("Block Voting", {before: rect1, left: 325, top: -7}); //TODO: Fix label so that it displays correctly next to the rectangle
  av.step(); 

  // Slide 7
  av.umsg("A majority of staked currency from non-validator nodes has voted in-favor of this block and thus, the block will be appended to the chain.");
  
  var rect2 = av.g.set();
  rect2.push(av.g.rect(400, 100 + 50, 50, 50));
  rect2.css({fill: "gray"});
  rect1.css({fill: "blue"});
  av.step(); 

  v3Block.hide();
  blockchain.hide();
  
  var blockchainUpdated = av.ds.list({top: blocktop + 0, left: "550px", nodegap: 10});
  blockchainUpdated.addFirst("V3 Block").addFirst("Blk 2").addFirst("Blk 1");
  blockchainUpdated.layout({updateTop: false});

  av.recorded();
});

