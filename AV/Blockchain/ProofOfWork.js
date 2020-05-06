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
    var blockchain = av.ds.list({top: topMargin, left: leftMargin, nodegap: 10});
    var graph = av.ds.graph({visible: true, left: -10, bottom: 5});

    // this code is the starting state of the graph
    graph.css({"font-size": "12px"});
    const a = graph.addNode('1', { "left": "10%", "bottom":"90%"});
    const b = graph.addNode('2', {"right": "90%", "left":"10%", "top":"90%"});
    const c = graph.addNode('3', {"left": "55%", "bottom":"90%"});
    const d = graph.addNode('4', {"bottom":"10%", "top":"90%", "left":"55%"});
    graph.addEdge(a,b);
    graph.addEdge(a,c);
    graph.addEdge(a,d);
    graph.addEdge(b,c);
    graph.addEdge(b,d);
    graph.addEdge(c,d);
    av.g.line(300, 10, 300, 220);

    graph.layout();
  
    // Slide 1
    av.umsg(interpret("sc1"));

    blockchain.addFirst("Blk 2").addFirst("Blk 1");
    
    // let node4Block = blockchain.newNode("Node 4");

    let forkMargin = 163; //the distance we want in the fork

    blockchain.layout({updateTop: false});

    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    
    graph.removeEdge(a,b);
    graph.removeEdge(a,c);
    graph.removeEdge(a,d);
    graph.removeEdge(b,c);
    graph.removeEdge(b,d);
    graph.removeEdge(c,d);
    graph.layout();

    const aBlock = graph.addNode("Block", {"left":"33%", "top":"40%"});
    const aEdge = graph.addEdge(a,aBlock);
    aBlock.addClass('greennode');
    aEdge.addClass('greenedge');

    let node1Block = blockchain.newNode("Node 1");
    
    node1Block.css({top: 0, left: leftAdding * 2});
    node1Block.addClass('greenBlock');

    a.addClass('greennode');
    graph.layout({updateTop: false});
    blockchain.layout();

    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));

    graph.removeNode(aBlock);
    graph.removeEdge(aEdge);
    const dBlock = graph.addNode("Block", {"left":"33%", "top":"40%"});
    const dEdge = graph.addEdge(d,dBlock);

    d.addClass('rednode');
    dBlock.addClass('rednode');
    dEdge.addClass('rededge');

    let node4Block = blockchain.newNode("Node 4");
    
    // node 4 arrow
    // subtracting 15 because the start of the auto-gen arrows are about 15 pixels    
    let node1Arrow = av.g.line(leftMargin + leftAdding*2 - 15, topMargin + 31,
        leftMargin + leftAdding*2 + 10, topMargin ,
        {"arrow-end": "classic-wide-long",
        opacity: 0, "stroke-width": 2});

    // move node 1 block up
    node1Block.css({top: topMargin, left: leftAdding * 2});

    // add node 4 block and move it down
    node4Block.css({top: topMargin-100, left: leftAdding * 2});
    node4Block.addClass('redBlock');
    
    graph.layout({updateTop: false, updateLeft: false});
    blockchain.layout({updateTop: false});

    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));

    graph.removeNode(dBlock);
    graph.removeEdge(dEdge);
    
    graph.layout();

    // start blockchain
    
    blockchain.get(1).next(node1Block);
    node1Arrow.show();
    blockchain.layout({updateTop: false});

    av.step();
    
    // Slide 5
    av.umsg(interpret("sc5"));

    // graph
    const bBlock = graph.addNode("Block", {"left":"33%", "top":"40%"});
    const bEdge = graph.addEdge(b,bBlock);

    b.addClass('bluenode');
    bBlock.addClass('bluenode');
    bEdge.addClass('blueedge');
    graph.layout();

    // blockchain
    let node2Block = blockchain.newNode("Node 2");
    node2Block.css({top: topMargin});
    node2Block.addClass('blueBlock');
    blockchain.get(2).next(node2Block);
    blockchain.layout({updateTop: false});

    av.step();
    // Slide 6
    av.umsg(interpret("sc6"));
    // graph


    graph.removeNode(bBlock);
    graph.removeEdge(bEdge);

    const cBlock = graph.addNode("Block", {"left":"33%", "top":"30%"});
    const cEdge = graph.addEdge(c,cBlock);

    c.addClass('orangenode');
    cBlock.addClass('orangenode');
    cEdge.addClass('orangeedge');

    const red2 = graph.addNode("Block", {"left":"33%", "top":"50%"});
    const red2edge = graph.addEdge(d,red2);

    red2.addClass('rednode');
    red2edge.addClass('rededge');
    graph.layout();

    let node4Arrow = av.g.line(leftMargin + leftAdding*3 - 12, topMargin - 17,
        leftMargin + leftAdding*3 + 2, topMargin - 17,
        {"arrow-end": "classic-wide-long",
        opacity: 0, "stroke-width": 2});
    
    let node3Block = blockchain.newNode("Node 3");
    let node4aBlock = blockchain.newNode("Node 4\'");

    node4aBlock.css({top: topMargin-100, left: forkMargin});
    node3Block.css({top: topMargin})
    node4aBlock.addClass('redBlock')
    node3Block.addClass('orangeBlock');
    node2Block.next(node3Block);
    node4Block.next(node4aBlock);
    node4Arrow.show();
    blockchain.layout({updateTop: false});
    

    av.step();
    // // Slide 7
    av.umsg(interpret("sc7"));

    graph.removeNode(cBlock);
    graph.removeEdge(cEdge);

    graph.removeNode(red2);
    graph.removeEdge(red2edge);

    const eBlock = graph.addNode("Block", {"left":"33%", "top":"30%"});
    const eEdge = graph.addEdge(a,eBlock);

    eBlock.addClass('greennode');
    eEdge.addClass('greenedge');

    const fBlock = graph.addNode("Block", {"left":"33%", "top":"50%"});
    const fEdge = graph.addEdge(b,fBlock);

    fBlock.addClass('bluenode');
    fEdge.addClass('blueedge');

    graph.layout();

    let node2aBlock = blockchain.newNode("Node 2\'");
    let node1aBlock = blockchain.newNode("Node 1\'");
    
    node2aBlock.css({top: topMargin});
    node1aBlock.css({top: topMargin});
    node2aBlock.addClass('blueBlock');
    node1aBlock.addClass('greenBlock');
    node3Block.next(node2aBlock);
    node2aBlock.next(node1aBlock);
    blockchain.layout({updateTop: false});

    av.step();

    av.umsg(interpret("sc8"));

    node1Arrow.hide();
    node4Arrow.hide();
    node4Block.hide();
    node4aBlock.hide();
    blockchain.layout();

    av.recorded();
  });
  