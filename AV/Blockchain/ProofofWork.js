/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
    "use strict";
    var av_name = "ProofOfWork";
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;                   // get the code object
    var av = new JSAV(av_name);
    
    
    var graph = av.ds.graph();
    var topMargin = 50;
    var leftMargin = 235;
    var blockchain = av.ds.list({top: topMargin, left: leftMargin});

    // this code is the starting state of the graph
    graph.css({"font-size": "12px"});
    graph.addNode('hello');
    graph.layout();
  
    // Slide 1
    av.umsg(interpret("sc1"));

    //enter  code here

    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    

    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));
   

    av.step();
    graph.hide();

    // Slide 4
    av.umsg(interpret("sc4"));
    
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
    blockchain.layout({updateTop: false})
    av.step();
    
    // Slide 4
    av.umsg(interpret("sc5"));
    
    av.step();

    av.umsg(interpret("sc6"));

    av.step();

    av.recorded();
  });
  