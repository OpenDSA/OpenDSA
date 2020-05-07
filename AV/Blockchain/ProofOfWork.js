/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
    "use strict";
    var av_name = "ProofOfWork";
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;                   // get the code object
    var av = new JSAV(av_name);
    
    var topMargin = 50;
    var leftMargin = 390;
    let leftAdding = 54;
    var topProposal = "-5%";
    var leftProposal = "3.5%";
    let topCenterGraph = "35%";
    let leftCenterGraph = "14%";
    let node4ALeft = "55%";
    let node4ATop = "90%"


    var blockchain = av.ds.list({top: topMargin, left: leftMargin, nodegap: 10});
    var graph = av.ds.graph({visible: true, left: -10, bottom: 5});
    var blockProposal1To3 = av.ds.list({top: topProposal, left: leftProposal});
    var blockProposal1To2 = av.ds.list({top: topProposal, left: leftProposal});
    var blockProposal4To3 = av.ds.list({top: "77%", left: "24.5%"});
    var blockProposal4To2 = av.ds.list({top: "77%", left: "24.5%"});
    var blockProposal2To1 = av.ds.list({top: "77%", left: "3.5%"});
    var blockProposal2To4 = av.ds.list({top: "77%", left: "3.5%"});
    var blockProposal3To1 = av.ds.list({top: "-5%", left: "24.5%"});
    var blockProposal3To4 = av.ds.list({top: "-5%", left: "24.5%"});
    var blockProposal4 = av.ds.list({top: "77%", left: "24.5%"});

    // this code is the starting state of the graph
    graph.css({"font-size": "12px"});
    const a = graph.addNode('1', { "left": "10%", "bottom":"90%"});
    const b = graph.addNode('2', {"right": "90%", "left":"10%", "top":"90%"});
    const c = graph.addNode('3', {"left": "55%", "bottom":"90%"});
    const d = graph.addNode('4', {"bottom":"10%", "top":node4ATop, "left":node4ALeft});
    graph.addEdge(a,b);
    graph.addEdge(a,c);
    // graph.addEdge(a,d);
    // graph.addEdge(b,c);
    graph.addEdge(b,d);
    graph.addEdge(c,d);
    av.g.line(300, 10, 300, 220);

    graph.addClass('backward'); //move the graph behind the new proposed blocks
    graph.layout();
  
    // Slide 1
    av.umsg(interpret("sc1"));

    blockchain.addFirst("Blk 2").addFirst("Blk 1");

    let forkMargin = 163; //the distance we want in the fork

    blockchain.layout({updateTop: false});

    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    
    let blkATo3 = blockProposal1To3.addFirst("Blk A").get(0);
    let blkATo2 = blockProposal1To2.addFirst("Blk A").get(0);
    blkATo3.addClass("greenBlock");
    blkATo2.addClass("greenBlock");

    blockProposal1To3.css({top: "58%", left: "3.5%"});
    blockProposal1To2.css({top: "-5%", left: "20%"});
    graph.layout({updateLeft: false, updateTop: false});

    let node1Block = blockchain.newNode("Blk A");
    
    node1Block.css({top: topMargin-100, left: leftAdding * 2});
    node1Block.addClass('greenBlock');

    a.addClass('greennode');
    graph.layout({updateTop: false});
    blockchain.layout();

    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));

    blockProposal1To3.removeFirst();
    blockProposal1To2.removeFirst();

    let blkBTo3 = blockProposal4To3.addFirst("Blk B").get(0);
    let blkBTo2 = blockProposal4To2.addFirst("Blk B").get(0);
    blkBTo3.addClass("redBlock");
    blkBTo2.addClass("redBlock");

    blockProposal4To3.css({top: "77%", left: "8.5%"});
    blockProposal4To2.css({top: "15%", left: "24.5%"});
    
    graph.layout({updateLeft: false, updateTop: false});

    d.addClass('rednode');

    let node4Block = blockchain.newNode("Blk B");
    
    // node 4 arrow
    // subtracting 15 because the start of the auto-gen arrows are about 15 pixels    
    let node1Arrow = av.g.line(leftMargin + leftAdding*2 - 15, topMargin + 31,
        leftMargin + leftAdding*2 + 10, topMargin ,
        {"arrow-end": "classic-wide-long",
        opacity: 0, "stroke-width": 2});

    // move node 1 block up
    // node1Block.css({top: topMargin, left: leftAdding * 2});

    // add node 4 block and move it down
    node4Block.css({top: topMargin, left: leftAdding * 2});
    node4Block.addClass('redBlock');
    
    graph.layout({updateTop: false, updateLeft: false});
    blockchain.layout({updateTop: false});

    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));

    blockProposal4To3.removeFirst();
    blockProposal4To2.removeFirst();
    
    graph.layout();

    // start blockchain
    blockchain.removeFirst();
    blockchain.removeFirst();
    
    let blockchain1Copy = av.ds.list({top: "0%", left: "45%", nodegap: 10});
    let blockchain4Copy = av.ds.list({top: "65%", left: "45%", nodegap: 10});
    blockchain1Copy.addFirst("Blk 2").addFirst("Blk 1");
    // let blk2For1 = blockchain1Copy.newNode("Blk 2");
    // blockchain1Copy.get(0).next(blk2For1);
    blockchain4Copy.addFirst("Blk 2").addFirst("Blk 1");
    // let blk2For4 = blockchain4Copy.newNode("Blk 2");
    // blockchain4Copy.get(0).next(blk2For4);

    node1Block.hide();
    node4Block.hide();

    let newNode1Block = blockchain1Copy.newNode("Blk A");
    newNode1Block.addClass('greenBlock');
    let newNode4Block = blockchain4Copy.newNode("Blk B");
    newNode4Block.addClass('redBlock');
    
    blockchain1Copy.get(1).next(newNode1Block);
    blockchain4Copy.get(1).next(newNode4Block);

    blockchain1Copy.layout({updateTop: false});
    blockchain4Copy.layout({updateTop: false});

    av.step();
    
    // Slide 5
    av.umsg(interpret("sc5"));

    // graph

    b.addClass('bluenode');
    // bBlock.addClass('bluenode');
    // bEdge.addClass('blueedge');

    // let blockProposal2 = av.ds.list({top: "76%", left: "3.6%"});
    

    let blkCTo4 = blockProposal2To4.addFirst("Blk C").get(0);
    let blkCTo1 = blockProposal2To1.addFirst("Blk C").get(0);
    blkCTo4.addClass("blueBlock");
    blkCTo1.addClass("blueBlock");

    blockProposal2To4.css({top: "77%", left: "20.5%"});
    blockProposal2To1.css({top: "14%", left: "3.5%"});

    // blockProposal2.css({top: topCenterGraph, left: leftCenterGraph});

    graph.layout();

    // blockchain
    let node2Block = blockchain1Copy.newNode("Blk C");
    // node2Block.css({top: topMargin});
    node2Block.addClass('blueBlock');
    blockchain1Copy.get(2).next(node2Block);
    // blockchain.get(2).next(node2Block);
    blockchain1Copy.layout({updateTop: false});

    av.step();
    // Slide 6
    av.umsg(interpret("sc6"));
    // graph

    blockProposal2To4.removeFirst();
    blockProposal2To1.removeFirst();

    let blkETo1 = blockProposal3To1.addFirst("Blk E").get(0);
    let blkETo2 = blockProposal3To4.addFirst("Blk E").get(0);
    blkETo1.addClass("orangeBlock");
    blkETo2.addClass("orangeBlock");

    blockProposal3To1.css({left: "8.5%"});
    blockProposal3To4.css({top: "58%"});

    let blkD = blockProposal4.addFirst("Blk D").get(0);
    blkD.addClass("redBlock");
    blockProposal4.css({top: topCenterGraph, left: leftCenterGraph});

    // graph.removeNode(bBlock);
    // graph.removeEdge(bEdge);
    
    // blockProposal2.removeFirst();

    // const cBlock = graph.addNode("Block", {"left":"33%", "top":"30%"});
    // const cEdge = graph.addEdge(c,cBlock);

    c.addClass('orangenode');
    // cBlock.addClass('orangenode');
    // cEdge.addClass('orangeedge');

    // const red2 = graph.addNode("Block", {"left":"33%", "top":"50%"});
    // const red2edge = graph.addEdge(d,red2);

    // red2.addClass('rednode');
    // red2edge.addClass('rededge');
    graph.layout();

    let node4Arrow = av.g.line(leftMargin + leftAdding*3 - 12, topMargin - 17,
        leftMargin + leftAdding*3 + 2, topMargin - 17,
        {"arrow-end": "classic-wide-long",
        opacity: 0, "stroke-width": 2});
    
    let node3Block = blockchain1Copy.newNode("Blk E");
    let node4aBlock = blockchain4Copy.newNode("Blk D");

    // node4aBlock.css({top: topMargin-100, left: forkMargin});
    // node3Block.css({top: topMargin})
    node4aBlock.addClass('redBlock')
    node3Block.addClass('orangeBlock');
    blockchain1Copy.get(3).next(node3Block);
    blockchain4Copy.get(2).next(node4aBlock);
    // node4Arrow.show();
    blockchain1Copy.layout({updateTop: false});
    blockchain4Copy.layout({updateTop: false});
    

    av.step();
    // // Slide 7
    av.umsg(interpret("sc7"));

    blockProposal3To1.removeFirst();
    blockProposal3To4.removeFirst();
    blockProposal4.removeFirst();

    // graph.removeNode(cBlock);
    // graph.removeEdge(cEdge);

    // graph.removeNode(red2);
    // graph.removeEdge(red2edge);

    // const eBlock = graph.addNode("Block", {"left":"33%", "top":"30%"});
    // const eEdge = graph.addEdge(a,eBlock);

    // eBlock.addClass('greennode');
    // eEdge.addClass('greenedge');

    // const fBlock = graph.addNode("Block", {"left":"33%", "top":"50%"});
    // const fEdge = graph.addEdge(b,fBlock);

    // fBlock.addClass('bluenode');
    // fEdge.addClass('blueedge');

    blockchain4Copy.remove(3);
    blockchain4Copy.remove(2);
    
    let blkAfor4 = blockchain4Copy.newNode("Blk A");
    blkAfor4.addClass("greenBlock");
    let blkCfor4 = blockchain4Copy.newNode("Blk C");
    blkCfor4.addClass("blueBlock");
    let blkEfor4 = blockchain4Copy.newNode("Blk E");
    blkEfor4.addClass("orangeBlock");
    
    blockchain4Copy.get(1).next(blkAfor4);
    blockchain4Copy.get(2).next(blkCfor4);
    blockchain4Copy.get(3).next(blkEfor4);
    blockchain4Copy.layout({updateTop: false});
    
    // graph.layout();

    // let node2aBlock = blockchain.newNode("Blk F");
    // let node1aBlock = blockchain.newNode("Blk G");
    
    // node2aBlock.css({top: topMargin});
    // node1aBlock.css({top: topMargin});
    // node2aBlock.addClass('blueBlock');
    // node1aBlock.addClass('greenBlock');
    // node3Block.next(node2aBlock);
    // node2aBlock.next(node1aBlock);
    // blockchain.layout({updateTop: false});

    av.step();

    av.umsg(interpret("sc8"));

    blockchain4Copy.removeLast();
    blockchain4Copy.removeLast();
    blockchain4Copy.removeLast();
    blockchain4Copy.removeLast();
    blockchain4Copy.removeLast();
    blockchain1Copy.get(2).removeClass("greenBlock");
    blockchain1Copy.get(3).removeClass("blueBlock");
    blockchain1Copy.get(4).removeClass("orangeBlock");
    blockchain1Copy.css({top: "35%"});
    blockchain1Copy.layout({updateLeft: false});

    node1Arrow.hide();
    node4Arrow.hide();
    node4Block.hide();
    node4aBlock.hide();
    blockchain.layout();

    av.recorded();
  });
  