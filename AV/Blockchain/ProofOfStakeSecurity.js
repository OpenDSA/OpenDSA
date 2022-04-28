/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "ProofOfStakeSecurity";
  var av = new JSAV(av_name);
  
  var topMargin = 50;
  var leftMargin = 390;
  let leftAdding = 54;
  var blocktop = 17;

  var graph = av.ds.graph({visible: true, left: -10, top: blocktop, height: 300, width: 300});

  av.umsg("We will now analyze a security threat to Proof of Stake using the visualization below. The most common security threat is that of double spending.");

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
  av.umsg("In this case, V3, shown in red, has successfully accumulated a majority ownership of all staked tokens. V3 can now independently approve blocks without the need for other validators to agree.");
  val3.removeClass('bluenode');
  val3.addClass('rednode');
  av.step();

  // Slide 3
  av.umsg("As a majority holder, V3 will soon be selected to propose the next block. It will begin to do so in a normal fashion; however, it will include a malicious transaction within the block.")
 
  var v3Block = av.ds.list({"left": "165px", "top":"185px", nodegap: 10}).addFirst("V3 Block");

  av.step();

  // Slide 4
  av.umsg("Lets say that prior to this block, thin node 1 had sent $500 to thin node 2. That transaction was included in the previous block, Blk 2.");
  const aTobEdge = graph.addEdge(a, b).addClass("orangeedge");


  av.step();

  // Slide 5
  av.umsg("V3 will now attempt to include a new transaction in the latest block that re-spends, or double spends, the same $500 by sending it from thin node 1 to thin node 4.");
  const aTodEdge = graph.addEdge(a, d).addClass("orangeedge");

  av.step();

  // Slide 6
  av.umsg("This transaction would normally be a clear red flag for validators to deny this block from being added to the chain. In fact, validators V1 and V2 will vote against this block.");
  a.hide();
  b.hide();
  c.hide();
  d.hide();
  aTobEdge.hide();
  aTodEdge.hide();
  val1.addClass('topLeftSpot')
  val2.addClass('topRightSpot')
  val3.addClass('proposalSpot')
  v3Block.addClass('deadCenterBlock');

  av.step();

  // Slide 7
  av.umsg("Despite V1 and V2 recognizing the illegitimacy of this block, they do not have sufficient staked currency to outweigh the voting power of V3.");
  
  
  var rect1 = av.g.set();
  rect1.push(av.g.rect(400, 100 + 50, 50, 200));
  rect1.css({fill: "gray"});
  
  av.label("Block Voting", {before: rect1, left: 325, top: -7}); //TODO: Fix label so that it displays correctly next to the rectangle
  
  var rect2 = av.g.set();
  rect2.push(av.g.rect(400, 100 + 50, 50, 50));
  rect2.css({fill: "gray"});
  rect1.css({fill: "red"});
  av.step();

  // Slide 8
  av.umsg("The block will be appended to the chain and V3 will have successfully allowed thin node 1 to double spend its funds.");
  v3Block.hide();
  blockchain.hide();
  
  var blockchainUpdated = av.ds.list({top: blocktop + 0, left: "550px", nodegap: 10});
  blockchainUpdated.addFirst("V3 Block").addFirst("Blk 2").addFirst("Blk 1");
  blockchainUpdated.layout({updateTop: false});
  
  av.step();
  

  av.recorded();
});

