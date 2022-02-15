/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
  "use strict";
  var av_name = "ProofOfWorkConsensus";
  var av = new JSAV(av_name);
  
  var topMargin = 50;
  var leftMargin = 390;
  let leftAdding = 54;
  var blocktop = 17;

  var blockchain = av.ds.list({top: blocktop + 0, left: "550px", nodegap: 10});
  var blockchain2 = av.ds.list({top: blocktop + 50, left: "550px", nodegap: 10});
  var blockchain3 = av.ds.list({top: blocktop + 100, left: "550px", nodegap: 10});
  var blockchain4 = av.ds.list({top: blocktop + 150, left: "550px", nodegap: 10});
  
  var graph = av.ds.graph({visible: true, left: -10, top: blocktop, height: 375, width: 425 });

  // this code is the starting state of the graph
  graph.css({"font-size": "12px"});
  const a = graph.addNode('1', { "left": "200px", "bottom":"700px"});
  const d = graph.addNode('2', {"left": "25px", "top":"150px"});
  const g = graph.addNode('3', {"left": "200px", "top":"300px"});
  const j = graph.addNode('4', {"left": "375px",  "top":"150px"});

/*  const a = graph.addNode('1', { "left": "200px", "bottom":"700px"});
  const b = graph.addNode('2', {"left": "150px", "top":"50px"});
  const c = graph.addNode('3', {"left": "100px", "top":"100px"});
  const d = graph.addNode('4', {"left": "50px", "top":"150px"});
  const e = graph.addNode('5', {"left": "100px", "top":"200px"});
  const f = graph.addNode('6', {"left": "150px", "top":"250px"});
  const g = graph.addNode('7', {"left": "200px", "top":"300px"});
  const h = graph.addNode('8', {"left": "250px",  "top":"250px"});
  const i = graph.addNode('9', {"left": "300px",  "top":"200px"});
  const j = graph.addNode('10', {"left": "350px",  "top":"150px"});
  const k = graph.addNode('11', {"left": "300px",  "top":"100px"});
  const l = graph.addNode('12', {"left": "250px", "top":"50px"}); */

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
  av.umsg("The Consensus Process Begins just as above, nodes propagate transactions to be added to the chain");

  blockchain.addFirst("Blk 2").addFirst("Blk 1");
  blockchain2.addFirst("Blk 2").addFirst("Blk 1");
  blockchain3.addFirst("Blk 2").addFirst("Blk 1");
  blockchain4.addFirst("Blk 2").addFirst("Blk 1");

  let forkMargin = 163; //the distance we want in the fork

  blockchain.layout({updateTop: false});
  blockchain2.layout({updateTop: false});
  blockchain3.layout({updateTop: false});
  blockchain4.layout({updateTop: false});
  
  g.addClass("orangenode");
  const gm2Edge = graph.addEdge(g,m2).addClass("orangeedge");
  const gm3Edge = graph.addEdge(g,m3).addClass("orangeedge");
  const gf2Edge = graph.addEdge(g,f2).addClass("orangeedge");
  const gf3Edge = graph.addEdge(g,f3).addClass("orangeedge");

  av.displayInit();
  
  //-----------------------------------------------
  // Slide 2
  av.umsg("Transactions continue to propagate throughout the network via each node that receives them in transmission.");
  const m2f1Edge = graph.addEdge(m2, f1).addClass("orangeedge");
  const m2f2Edge = graph.addEdge(m2, f2).addClass("orangeedge");
  const m3f3Edge = graph.addEdge(m3, f3).addClass("orangeedge");
  const m3f4Edge = graph.addEdge(m3, f4).addClass("orangeedge");


  const f1m1Edge = graph.addEdge(f1, m1).addClass("orangeedge");
  const f2m1Edge = graph.addEdge(f2, m1).addClass("orangeedge");
  const f3m4Edge = graph.addEdge(f3, m4).addClass("orangeedge");
  const f4m4Edge = graph.addEdge(f4, m4).addClass("orangeedge");
  
  av.step();
  
  //-----------------------------------------------
  // Slide 3
  av.umsg("As shown below, each mining node now maintains its own ledger of unconfirmed transactions denoted A1-A4. It is important to recognize that each mining node will have slightly different ledgers of unconfirmed transactions as not all transactions are propagated at the same speed across the network.");
  gm2Edge.hide();
  gm3Edge.hide();
  gf2Edge.hide();
  gf3Edge.hide();
  m2f1Edge.hide();
  m2f2Edge.hide();
  m3f3Edge.hide();
  m3f4Edge.hide();
  f1m1Edge.hide();
  f2m1Edge.hide();
  f3m4Edge.hide();
  f4m4Edge.hide();

  g.removeClass("orangenode");
  
  var m1Bundle = av.ds.list({"left": "40px",   "top":"60px", nodegap: 10}).addFirst("A1");
  var m2Bundle = av.ds.list({"left": "360px",   "top":"280px", nodegap: 10}).addFirst("A2");
  var m3Bundle = av.ds.list({"left": "40px",   "top":"280px", nodegap: 10}).addFirst("A3");
  var m4Bundle = av.ds.list({"left": "360px",   "top":"60px", nodegap: 10}).addFirst("A4");
  
  av.step();
  
  //-----------------------------------------------
  // Slide 4
  av.umsg("M1 now has arrived at a valid solution which it proposes to the full node, F2. Because this is the first solution to be proposed and it is valid, the solution is accepted by F2 and begins to get propagated throughout the network. Notice how the state of F2's chain has been updated but the other full nodes still have the original chain. Currently this network lacks consensus.");
  // Be more specific about what a valid solution is
  f2m1Edge.removeClass("orangeedge");
  f2m1Edge.addClass("yellowedge");
  f2m1Edge.show();

  f2.removeClass("bluenode");
  f2.addClass("yellownode");

  f2Chain.removeClass("bluenode");
  f2Chain.addClass("yellownode");

  // @TODO:
  // Is there a way to just append to existing chain rather than hiding it and making a copy?
  blockchain2.hide();
  var blockchain2_1 = av.ds.list({top: blocktop + 50, left: "550px", nodegap: 10});
  blockchain2_1.addFirst("A1").addFirst("Blk2").addFirst("Blk1");
  blockchain2_1.layout({updateTop: false});
  

  av.step();

  //-----------------------------------------------
  // Slide 5
  av.umsg("At this point, it is entirely possible and very likely that another mining node will propose a second valid solution to the network. This block also contains valid transactions; however, it is a slightly different bundle than what was proposed by M1. See below as M3 proposes A3 as the next block to be appended.");
  m3f3Edge.removeClass("orangeedge");
  m3f3Edge.addClass("purpleedge");
  m3f3Edge.show();
  f3.removeClass("bluenode");
  f3.addClass("purplenode");
  f3Chain.removeClass("bluenode");
  f3Chain.addClass("purplenode");

  blockchain3.hide();
  var blockchain3_1 = av.ds.list({top: blocktop + 100, left: "550px", nodegap: 10});
  blockchain3_1.addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain3_1.layout({updateTop: false});
  av.step()


  //-----------------------------------------------
  // Slide 6
  av.umsg("These conflicting chains will propagate to other nodes and now there are two separate versions of the blockchain in the network. The network is lacking consensus.");
  
  const f3f4Edge = graph.addEdge(f3, f4).addClass("purpleedge");
  const f1f2Edge = graph.addEdge(f1, f2).addClass("yellowedge");

  f4.removeClass("bluenode");
  f4.addClass("purplenode");
  f4Chain.removeClass("bluenode");
  f4Chain.addClass("purplenode");
  f1.removeClass("bluenode");
  f1.addClass("yellownode");
  f1Chain.removeClass("bluenode");
  f1Chain.addClass("yellownode");

  blockchain.hide();
  var blockchain1_1 = av.ds.list({top: blocktop + 0, left: "550px", nodegap: 10});
  blockchain1_1.addFirst("A1").addFirst("Blk2").addFirst("Blk1");
  blockchain1_1.layout({updateTop: false});


  blockchain4.hide();
  var blockchain4_1 = av.ds.list({top: blocktop + 150, left: "550px", nodegap: 10});
  blockchain4_1.addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain4_1.layout({updateTop: false});
  av.step()

  //-----------------------------------------------
  // Slide 7
  av.umsg("As time goes on, more transactions are broadcast and eventually a mining node will arrive at a solution for the next block! Shown below, M4 has just proposed a valid block to the chain.");
  
  //Hide Edges
  f1f2Edge.hide();
  f2m1Edge.hide();
  m3f3Edge.hide();
  f3f4Edge.hide();

  //Repaint the Bundles
  m1Bundle.hide();
  m2Bundle.hide();
  m3Bundle.hide();
  m4Bundle.hide();

  var m1BundleB = av.ds.list({"left": "50px",   "top":"70px", nodegap: 10}).addFirst("B1");
  var m2BundleB = av.ds.list({"left": "350px",   "top":"270px", nodegap: 10}).addFirst("B2");
  var m3BundleB = av.ds.list({"left": "50px",   "top":"270px", nodegap: 10}).addFirst("B3");
  var m4BundleB = av.ds.list({"left": "350px",   "top":"70px", nodegap: 10}).addFirst("B4");


  m4.removeClass("brownnode");
  m4.addClass("greennode");
  f4m4Edge.removeClass("orangeedge");
  f4m4Edge.addClass("greenedge")
  f4m4Edge.show();
  f4.removeClass("purplenode");
  f4.addClass("greennode");


  blockchain4_1.hide();
  var blockchain4_2 = av.ds.list({top: blocktop + 150, left: "550px", nodegap: 10});
  blockchain4_2.addFirst("B4").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain4_2.layout({updateTop: false});

  f4Chain.removeClass("purplenode");
  f4Chain.addClass("greennode");

  av.step()

  //-----------------------------------------------
  // Slide 8
  av.umsg("Because M4 had the same copy of the chain as F4, the proposed block is valid from the perspective of F4; however, that same block would be considered INVALID by F1 and F2.");
  f4m4Edge.hide();
  f3f4Edge.removeClass("purpleedge");
  f3f4Edge.addClass("greenedge");
  f3f4Edge.show();
  f3.removeClass("purplenode");
  f3.addClass("greennode");


  blockchain3_1.hide();
  var blockchain3_2 = av.ds.list({top: blocktop + 100, left: "550px", nodegap: 10});
  blockchain3_2.addFirst("B4").addFirst("A3").addFirst("Blk2").addFirst("Blk1");
  blockchain3_2.layout({updateTop: false});
  f3Chain.removeClass("purplenode");
  f3Chain.addClass("greennode");
  av.step()

  //-----------------------------------------------
  // Slide 10
  av.umsg("For a short period of time, it is possible that both chains continue to propagate; however, one chain will always grow larger faster than the other. Over the course of ~6 blocks, the full nodes will surrender their beliefs and subscribe the the chain with the greatest proof of work.");
  f3f4Edge.hide();
  f1.removeClass("yellownode");
  f2.removeClass("yellownode");
  f1.addClass("greennode");
  f2.addClass("greennode");
  

  blockchain1_1.hide();
  var blockchain1_2 = av.ds.list({top: blocktop + 0, left: "550px", nodegap: 10});
  blockchain1_2.addFirst("B4").addFirst("A1").addFirst("Blk2").addFirst("Blk1");
  blockchain1_2.layout({updateTop: false});

  blockchain2_1.hide();
  var blockchain2_2 = av.ds.list({top: blocktop + 50, left: "550px", nodegap: 10});
  blockchain2_2.addFirst("B4").addFirst("A1").addFirst("Blk2").addFirst("Blk1");
  blockchain2_2.layout({updateTop: false});

  f1Chain.removeClass("yellownode");
  f2Chain.removeClass("yellownode");
  f1Chain.addClass("greennode");
  f2Chain.addClass("greennode");

  av.recorded();
});

