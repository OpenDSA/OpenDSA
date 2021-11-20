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


    var blockchain = av.ds.list({top: 0, left: leftMargin, nodegap: 10});
    var blockchain2 = av.ds.list({top: 50, left: leftMargin, nodegap: 10});
    var blockchain3 = av.ds.list({top: 100, left: leftMargin, nodegap: 10});
    var blockchain4 = av.ds.list({top: 150, left: leftMargin, nodegap: 10});
    
    var graph = av.ds.graph({visible: true, left: -10, bottom: 5});

    // this code is the starting state of the graph
    graph.css({"font-size": "12px"});
    const a = graph.addNode('1', { "left": "30%", "bottom":"90%"});
    const b = graph.addNode('2', {"right": "80%", "left":"20%", "top":"10%"});
    const c = graph.addNode('3', {"right": "90%", "left":"10%", "top":"25%"});
    const d = graph.addNode('4', {"right": "95%", "left":"5%", "top":"50%"});
    const e = graph.addNode('5', {"right": "90%", "left":"10%", "top":"75%"});
    const f = graph.addNode('6', {"right": "80%", "left":"20%", "top":"90%"});
    const g = graph.addNode('7', {"right": "70%", "left":"30%", "top":"100%"});
    const h = graph.addNode('8', {"right": "60%", "left":"40%", "top":"90%"});
    const i = graph.addNode('9', {"right": "50%", "left":"50%", "top":"75%"});
    const j = graph.addNode('10', {"right": "45%", "left":"55%", "top":"50%"});
    const k = graph.addNode('11', {"right": "50%", "left":"50%", "top":"25%"});
    const l = graph.addNode('12', {"right": "60%", "left":"40%", "top":"10%"});

    const m1 = graph.addNode('M1', {"right": "80%", "left":"20%", "top":"30%"});
    const m2 = graph.addNode('M2', {"right": "80%", "left":"20%", "top":"70%"});
    const m3 = graph.addNode('M3', {"right": "60%", "left":"40%", "top":"70%"});
    const m4 = graph.addNode('M4', {"right": "60%", "left":"40%", "top":"30%"});

    const f1 = graph.addNode('F1', {"right": "85%", "left":"15%", "top":"50%"});
    const f2 = graph.addNode('F2', {"right": "75%", "left":"25%", "top":"50%"});
    const f3 = graph.addNode('F3', {"right": "65%", "left":"35%", "top":"50%"});
    const f4 = graph.addNode('F4', {"right": "55%", "left":"45%", "top":"50%"});


    const f1Chain = graph.addNode('F1', {"right": "12%", "left":"88%", "top":"5%"});
    const f2Chain = graph.addNode('F2', {"right": "12%", "left":"88%", "top":"30%"});
    const f3Chain = graph.addNode('F3', {"right": "12%", "left":"88%", "top":"55%"});
    const f4Chain = graph.addNode('F4', {"right": "12%", "left":"88%", "top":"80%"});

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
    
    av.g.line(300, 10, 300, 220);

    graph.addClass('backward'); //move the graph behind the new proposed blocks
    graph.layout();
  
    // Slide 1
    av.umsg("Slide 1 text");

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
  
    // Slide 2
    av.umsg("Slide 2 message");
    
    const cEdge = graph.addEdge(e,m2);

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
    b.addClass('greennode');
    c.addClass('greennode');

    av.step();

    // Slide 4a
    av.umsg(interpret("sc4a"));

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
  
