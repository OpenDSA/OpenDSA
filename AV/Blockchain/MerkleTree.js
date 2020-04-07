/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
    "use strict";
    var av_name = "MerkleTree";
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
    
    h1234.addClass("invisnode");
    h1234.edgeToLeft().hide();
    h1234.edgeToRight().hide();

    h12.addClass("invisnode");
    h12.edgeToLeft().hide();
    h12.edgeToRight().hide();
    
    h34.addClass("invisnode");
    h34.edgeToLeft().hide();
    h34.edgeToRight().hide();

    h1.addClass("invisnode");
    h1.edgeToLeft().hide();
    h1.edgeToRight().hide();

    h2.addClass("invisnode");
    h2.edgeToLeft().hide();
    h2.edgeToRight().hide();

    h3.addClass("invisnode");
    h3.edgeToLeft().hide();
    h3.edgeToRight().hide();

    h4.addClass("invisnode");
    h4.edgeToLeft().hide();
    h4.edgeToRight().hide();

    bt.layout();
  
    // Slide 1
    av.umsg(interpret("sc1"));
    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    h1.removeClass("invisnode");
    h2.removeClass("invisnode");
    h3.removeClass("invisnode");
    h4.removeClass("invisnode");
    h1.edgeToLeft().show();
    h2.edgeToLeft().show();
    h3.edgeToLeft().show();
    h4.edgeToLeft().show();
    av.step();

    // Slide 3
    av.umsg(interpret("sc3"));
    h12.removeClass("invisnode");
    h12.edgeToLeft().show();
    h12.edgeToRight().show();
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    h34.removeClass("invisnode");
    h34.edgeToLeft().show();
    h34.edgeToRight().show();
    av.step();
    
    // Slide 4
    av.umsg(interpret("sc5"));
    h1234.removeClass("invisnode");
    h1234.edgeToLeft().show();
    h1234.edgeToRight().show();
    av.step();

    av.recorded();
  });
  