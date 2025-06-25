/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "ProofOfWorkFraud";
  var av = new JSAV(av_name);
  
  var topMargin = 50;
  var leftMargin = 390;
  let leftAdding = 54;
  var blocktop = 17;

  var blockchain = av.ds.list({top: blocktop + 0, left: "550px", nodegap: 10});
  var blockchain2 = av.ds.list({top: blocktop + 50, left: "550px", nodegap: 10});
  var blockchain3 = av.ds.list({top: blocktop + 100, left: "550px", nodegap: 10});
  var blockchain4 = av.ds.list({top: blocktop + 150, left: "550px", nodegap: 10});
  
  var graph = av.ds.graph({visible: true, left: -10, top: blocktop });

  // this code is the starting state of the graph
  graph.css({"font-size": "12px"});
  const a = graph.addNode('1', { "left": "200px", "bottom":"700px"});
  const g = graph.addNode('2', {"left": "200px", "top":"300px"});

  const m1 = graph.addNode('M1', {"left": "150px",   "top":"100px"});
  const m2 = graph.addNode('M2', {"left": "250px",   "top":"200px"});
  const m3 = graph.addNode('M3', {"left": "150px",    "top":"200px"});
  const m4 = graph.addNode('M4', {"left": "250px",   "top":"100px"});

  const f1 = graph.addNode('F1', {"left": "125px",  "top":"150px"});
  const f2 = graph.addNode('F2', {"left": "175px",  "top":"150px"});
  const f3 = graph.addNode('F3', {"left": "225px",  "top":"150px"});
  const f4 = graph.addNode('F4', {"left": "275px",  "top":"150px"});


  const f1Chain = graph.addNode('F1', {"left": "500px", "top":blocktop - 10});
  const f2Chain = graph.addNode('F2', {"left": "500px","top":blocktop + 40});
  const f3Chain = graph.addNode('F3', {"left": "500px", "top":blocktop + 90});
  const f4Chain = graph.addNode('F4', {"left": "500px", "top":blocktop + 140});

  m1.addClass('brownnode')
  m2.addClass('brownnode')
  m3.addClass('brownnode')
  m4.addClass('brownnode')

  f1.addClass('bluenode')
  f2.addClass('bluenode')
  f3.addClass('bluenode')
  f4.addClass('bluenode')
  f1Chain.addClass('bluenode')
  f2Chain.addClass('bluenode')
  f3Chain.addClass('bluenode')
  f4Chain.addClass('bluenode')
  
  av.g.line(450, 10, 450, 300);

  graph.addClass('backward'); //move the graph behind the new proposed blocks
  graph.layout();
  
  //-----------------------------------------------
  // Slide 1
  av.umsg("Let's simplify the network to suggest there are only 2 thin nodes. We still have 4 independent mining nodes M1-M4 and 4 independent full nodes F1-F4.");

  blockchain.addFirst("Blk 2").addFirst("Blk 1");
  blockchain2.addFirst("Blk 2").addFirst("Blk 1");
  blockchain3.addFirst("Blk 2").addFirst("Blk 1");
  blockchain4.addFirst("Blk 2").addFirst("Blk 1");

  let forkMargin = 163; //the distance we want in the fork

  blockchain.layout({updateTop: false});
  blockchain2.layout({updateTop: false});
  blockchain3.layout({updateTop: false});
  blockchain4.layout({updateTop: false});

  av.displayInit();
  
  //-----------------------------------------------
  // Slide 2
  av.umsg("Each of the mining nodes will still maintain its own bundle of transactions A1-A4.");
  var m1Bundle = av.ds.list({"left": "40px",   "top":"60px", nodegap: 10}).addFirst("A1");
  var m2Bundle = av.ds.list({"left": "360px",   "top":"280px", nodegap: 10}).addFirst("A2");
  var m3Bundle = av.ds.list({"left": "40px",   "top":"280px", nodegap: 10}).addFirst("A3");
  var m4Bundle = av.ds.list({"left": "360px",   "top":"60px", nodegap: 10}).addFirst("A4");

  av.step();
  
  //-----------------------------------------------
  // Slide 3
  av.umsg("The primary difference in this example will be the assumption that both Mining Node 4 (M4) and Full Node 4 (F4) are under the control of a malicious actor. This means someone has deliberately instructed these nodes to operate in a disruptive manner that does not follow the consensus protocol of the network.");
  m4.removeClass("brownnode");
  m4.addClass("rednode");
  f4.removeClass("bluenode");
  f4.addClass("rednode");
  
  av.step();
  
  //-----------------------------------------------
  // Slide 4
  av.umsg("To begin, M3 and M4 both reach valid solutions and propose them to the network simultaneously.");
  const m3f1Edge = graph.addEdge(m3,f1).addClass("greenedge");
  f1.removeClass("bluenode");
  f1.addClass("greennode");
  
  const f1f2Edge = graph.addEdge(f1, f2).addClass("greenedge");
  f2.removeClass("bluenode");
  f2.addClass("greennode");

  const m4f4Edge = graph.addEdge(m4,f4).addClass("rededge");
  
  const f4f3Edge = graph.addEdge(f4, f3).addClass("rededge");
  f3.removeClass("bluenode");
  f3.addClass("rednode");
  
  av.step();

  //-----------------------------------------------
  // Slide 5
  av.umsg("We now see 2 separate chains believed to be true by F1, F2 and F3, F4 respectively. It is important to note that individually, both of these chains are valid! The issue is that BOTH chains cannot coexist.");
  m3f1Edge.hide();
  f1f2Edge.hide();
  m4f4Edge.hide();
  f4f3Edge.hide();

  blockchain.hide();
  var blockchain1_1 = av.ds.list({top: blocktop, left: "550px", nodegap: 10});
  blockchain1_1.addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain1_1.layout({updateTop: false});
  f1Chain.removeClass("bluenode");
  f1Chain.addClass("greennode");

  blockchain2.hide();
  var blockchain2_1 = av.ds.list({top: blocktop + 50, left: "550px", nodegap: 10});
  blockchain2_1.addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain2_1.layout({updateTop: false});
  f2Chain.removeClass("bluenode");
  f2Chain.addClass("greennode");

  blockchain3.hide();
  var blockchain3_1 = av.ds.list({top: blocktop + 100, left: "550px", nodegap: 10});
  blockchain3_1.addFirst("A4").addFirst("Blk2").addFirst("Blk1");
  blockchain3_1.layout({updateTop: false});
  f3Chain.removeClass("bluenode");
  f3Chain.addClass("rednode");

  blockchain4.hide();
  var blockchain4_1 = av.ds.list({top: blocktop + 150, left: "550px", nodegap: 10});
  blockchain4_1.addFirst("A4").addFirst("Blk2").addFirst("Blk1");
  blockchain4_1.layout({updateTop: false});
  f4Chain.removeClass("bluenode");
  f4Chain.addClass("rednode");
  av.step();

  //-----------------------------------------------
  // Slide 6
  av.umsg("Due to the decentralized nature of Proof-Of-Work, it is statistically improbable for a single mining node to win two block challenges back to back before another node also comes up with a successful solution. With that in mind, let's say that M1 proposes a valid solution to the next block.");
  //Repaint the Bundles
  m1Bundle.hide();
  m2Bundle.hide();
  m3Bundle.hide();
  m4Bundle.hide();

  var m1BundleB = av.ds.list({"left": "40px",   "top":"60px", nodegap: 10}).addFirst("B1");
  var m2BundleB = av.ds.list({"left": "360px",   "top":"280px", nodegap: 10}).addFirst("B2");
  var m3BundleB = av.ds.list({"left": "40px",   "top":"280px", nodegap: 10}).addFirst("B3");
  var m4BundleB = av.ds.list({"left": "360px",   "top":"60px", nodegap: 10}).addFirst("B4");

  const m1f1Edge = graph.addEdge(m1,f1).addClass("greenedge");
  f1f2Edge.show();
  av.step();

  //-----------------------------------------------
  // Slide 7
  av.umsg("F1 and F2 are now one block ahead in the chain than F3 and F4. Lets pretend that in the latest block, B1 there exists a transaction where thin node 1 paid thin node 2. As the chain stands currently, F1 and F2 believe that thin node 1 has paid thin node 2. F3 and F4 have no record of this transaction taking place.");
  m1f1Edge.hide();
  f1f2Edge.hide();

  blockchain1_1.hide();
  var blockchain1_2 = av.ds.list({top: blocktop, left: "550px", nodegap: 10});
  blockchain1_2.addFirst("B1").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain1_2.layout({updateTop: false});
  f1Chain.removeClass("bluenode");
  f1Chain.addClass("greennode");

  blockchain2_1.hide();
  var blockchain2_2 = av.ds.list({top: blocktop + 50, left: "550px", nodegap: 10});
  blockchain2_2.addFirst("B1").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain2_2.layout({updateTop: false});
  f2Chain.removeClass("bluenode");
  f2Chain.addClass("greennode");

  av.step();

  //-----------------------------------------------
  // Slide 8
  av.umsg("It is entirely possible that the same malicious actors controlling M4 and F4 also have ownership of the wallet belonging to thin node 1. This means it would be in their best interest to rid the blockchain of evidence of such a transaction ever occurring as they would be able to get their money back AFTER the fact.");
  g.addClass("rednode");

  av.step();

  //-----------------------------------------------
  // Slide 9
  av.umsg("Mining nodes now recognize that a solution has already been proposed for the block height B and they will begin working on a solution for the next block level (C). M4 has deliberately decided to continue working on a solution to a block (B4) despite knowing this block height has already been solved. There is no incentive for non-fraudulent miners to continue working on this block as full nodes will reject future solutions after one has already been accepted.");
  g.removeClass("rednode");
  //Repaint the Bundles
  m1BundleB.hide();
  m2BundleB.hide();
  m3BundleB.hide();

  var m1BundleC = av.ds.list({"left": "40px",   "top":"60px", nodegap: 10}).addFirst("C1");
  var m2BundleC = av.ds.list({"left": "360px",   "top":"280px", nodegap: 10}).addFirst("C2");
  var m3BundleC = av.ds.list({"left": "40px",   "top":"280px", nodegap: 10}).addFirst("C3");

  //const m1f1Edge = graph.addEdge(m1,f1).addClass("greenedge");
  //f1f2Edge.show();
  

  av.step();

  //-----------------------------------------------
  // Slide 10
  av.umsg("The solution, B1, has since propagated throughout the network to F3. F4, due to its malicious design, has decided to reject the solution B1 and await a valid solution from M4.");
  const f2f3Edge = graph.addEdge(f2,f3).addClass("greenedge");
  f3.removeClass("rednode");
  f3.addClass("greennode");

  blockchain3_1.hide();
  var blockchain3_2 = av.ds.list({top: blocktop + 100, left: "550px", nodegap: 10});
  blockchain3_2.addFirst("B1").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain3_2.layout({updateTop: false});
  f3Chain.removeClass("rednode");
  f3Chain.addClass("greennode");

  av.step();

  //-----------------------------------------------
  // Slide 11
  av.umsg("M4 finally reaches a solution for the block, B4. This solution is accepted by F4. The malicious actors have deliberately decided to exclude the transaction from node 1 to 2 in their block B4. This means in the eyes of F4, node 1 never paid node 2.");
  f2f3Edge.hide();
  m4f4Edge.show();

  blockchain4_1.hide();
  var blockchain4_2 = av.ds.list({top: blocktop + 150, left: "550px", nodegap: 10});
  blockchain4_2.addFirst("B4").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain4_2.layout({updateTop: false});
  f3Chain.removeClass("rednode");
  f3Chain.addClass("greennode");
  

  av.step();

  //-----------------------------------------------
  // Slide 12
  m4f4Edge.hide();
  av.umsg("Meanwhile, M2 has already reached a solution to the NEXT block (C)! All legitimate full nodes will accept this solution and continue to grow the size of the chain.");
  
  const m2f3Edge = graph.addEdge(m2,f3).addClass("greenedge");
  f2f3Edge.show();
  f1f2Edge.show();

  blockchain1_2.hide();
  var blockchain1_3 = av.ds.list({top: blocktop, left: "550px", nodegap: 10});
  blockchain1_3.addFirst("C2").addFirst("B1").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain1_3.layout({updateTop: false});

  blockchain2_2.hide();
  var blockchain2_3 = av.ds.list({top: blocktop + 50, left: "550px", nodegap: 10});
  blockchain2_3.addFirst("C2").addFirst("B1").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain2_3.layout({updateTop: false});

  blockchain3_2.hide();
  var blockchain3_3 = av.ds.list({top: blocktop + 100, left: "550px", nodegap: 10});
  blockchain3_3.addFirst("C2").addFirst("B1").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain3_3.layout({updateTop: false});

  av.step();

  //-----------------------------------------------
  // Slide 13
  m4f4Edge.hide();
  av.umsg("The state of whatever chain maintained by F4 becomes irrelevant to the rest of the network. No nodes will consider this chain valid as there is another chain with more proof of work in it. In a proof of work system, truth lies in whatever protocol is followed by the majority of nodes.");
  f2f3Edge.hide();
  f1f2Edge.hide();
  m2f3Edge.hide();

  av.recorded();
});

