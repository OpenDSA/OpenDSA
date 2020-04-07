/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
    "use strict";
    var av_name = "MerkleTreeVerification";
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter;                   // get the code object
    var av = new JSAV(av_name);
  
    var bt = av.ds.binarytree({visible: true, nodegap: 15});
    bt.css({"font-size": "12px"});
    bt.root("H(H12+H34)");
    var h1234 = bt.root();
    var h12 = h1234.left("H(H1+H2)");
    var h1 = h1234.left().left("H(1)");
    var l1 = h1234.left().left().left("1");
    var h2 = h1234.left().right("H(2)");
    var l2 = h1234.left().right().left("2");

    var h34 = h1234.right("H(H3+H4)");
    var h3 = h1234.right().left("H(3)");
    var h4 = h1234.right().right("H(4)");
    var l3 = h1234.right().left().left("3");
    var l4 = h1234.right().right().left("4");

    bt.layout();
  
    // Slide 1
    av.umsg(interpret("sc1"));
    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    l2.addClass("rednode");
    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));
    h1234.addClass("greennode");
    h1.addClass("greennode");
    h34.addClass("greennode");
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    h2.addClass("processing");
    h2.edgeToLeft().addClass("rededge");
    av.step();
    
    // Slide 5
    av.umsg(interpret("sc5"));
    h12.addClass("processing");
    h12.edgeToLeft().addClass("greenedge");
    h12.edgeToRight().addClass("rededge");
    av.step();

    // Slide 6
    av.umsg(interpret("sc6"));
    h1234.edgeToLeft().addClass("rededge");
    h1234.edgeToRight().addClass("greenedge");
    av.step();

    // Slide 7
    av.umsg(interpret("sc7"));
    h1234.edgeToLeft().removeClass("rededge");
    h1234.edgeToLeft().addClass("greenedge");

    h12.removeClass("processing");
    h12.addClass("greennode");
    h12.edgeToRight().removeClass("rededge");
    h12.edgeToRight().addClass("greenedge");

    h2.removeClass("processing");
    h2.addClass("greennode");
    h2.edgeToLeft().removeClass("rededge");
    h2.edgeToLeft().addClass("greenedge");

    l2.removeClass("rednode");
    l2.addClass("greennode");

    av.step();

    av.recorded();
  });
  