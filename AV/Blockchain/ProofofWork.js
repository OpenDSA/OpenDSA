/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
    "use strict";
    var av_name = "ProofOfWork";
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;                   // get the code object
    var av = new JSAV(av_name);
    
    var topMargin = 50;
    var leftMargin = 235;
    var blockchain = av.ds.list({top: topMargin, left: leftMargin});
    var graph = av.ds.graph({visible: true});

    // this code is the starting state of the graph
    graph.css({"font-size": "12px"});
    const a = graph.addNode('1', { "left": "10%", "bottom":"90%"});
    const b = graph.addNode('2', {"right": "90%", "left":"10%", "top":"90%"});
    const c = graph.addNode('3', {"left": "90%", "bottom":"90%"});
    const d = graph.addNode('4', {"right": "10%", "bottom":"10%", "top":"90%", "left":"90%"});
    graph.addEdge(a,b);
    graph.addEdge(a,c);
    graph.addEdge(a,d);
    graph.addEdge(b,c);
    graph.addEdge(b,d);
    graph.addEdge(c,d);

    graph.layout();
  
    // Slide 1
    av.umsg(interpret("sc1"));

    //enter  code here

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

    const aBlock = graph.addNode("Block", {"left":"40%", "top":"40%"});
    const aEdge = graph.addEdge(a,aBlock);
    graph.layout();

    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));
   
    const dBlock = graph.addNode("Block", {"left":"60%", "right":"60%", "bottom":"40%", "top":"60%"});
    const dEdge = graph.addEdge(d,dBlock);
    graph.layout();

    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    // hide previous graph
    a.hide();
    b.hide();
    c.hide();
    d.hide();
    aBlock.hide();
    dBlock.hide();
    aEdge.hide();
    dEdge.hide();

    // start blockchain
    blockchain.addFirst("Blk 2").addFirst("Blk 1");
    let node1Block = blockchain.newNode("Node 1");
    let node4Block = blockchain.newNode("Node 4");

    let node1Arrow = av.g.line(leftMargin + 122, topMargin + 31,
                                leftMargin + 168, topMargin - 5,
                                {"arrow-end": "classic-wide-long",
                                opacity: 0, "stroke-width": 2});

    let forkMargin = 168;
    node1Block.css({top: topMargin-100, left: forkMargin});
    node4Block.css({top: topMargin, left: forkMargin});
    // let node1 = blockchain.get(1).next();
    blockchain.get(1).next(node4Block);
    // node4Block.next(node1);
    node1Arrow.show();
    blockchain.layout({updateTop: false});

    av.step();
    
    // Slide 4
    av.umsg(interpret("sc5"));
    
    av.step();

    av.umsg(interpret("sc6"));

    av.step();

    av.recorded();
  });
  