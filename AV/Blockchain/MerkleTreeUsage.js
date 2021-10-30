/*global ODSA */
// Inseh1234 slideshow
$(document).ready(function() {
    "use strict";
    var av_name = "MerkleTreeUsage";
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
    var l4 = h1234.right().right().left("X");
    l4.addClass("processing")
    
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
    av.umsg(interpret("We are a customer looking to verify our transaction, shown here as transaction X. It is important to note that we (the client) do not know for sure that this transaction exists within the Merkle tree. That is what we are trying to determine."));
    h1.removeClass("invisnode");
    h2.removeClass("invisnode");
    h3.removeClass("invisnode");
    h4.removeClass("invisnode");
    h1.edgeToLeft().show();
    h2.edgeToLeft().show();
    h3.edgeToLeft().show();
    h4.edgeToLeft().show();
    h12.removeClass("invisnode");
    h12.edgeToLeft().show();
    h12.edgeToRight().show();
    h34.removeClass("invisnode");
    h34.edgeToLeft().show();
    h34.edgeToRight().show();
    h1234.removeClass("invisnode");
    h1234.edgeToLeft().show();
    h1234.edgeToRight().show();
    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("In order to check for our transaction's presence in the block, we will only need to look at H(3) and H(H1+H2)."));
    h12.addClass("greennode")
    h3.addClass("greennode")
    av.step();

    // Slide 4
    av.umsg(interpret("Using the hash of the user supplied transaction, X, in combination with H(H1+H2) and H(3), we can compare the calculated root node to the expected."));
    l4.addClass("greennode");
    h4.addClass("processing");
    av.step();

    //Slide 5
    h34.addClass("processing");
    av.step();

    //Slide 6
    h1234.addClass("processing");
    av.step();
    
    // Slide 5
    av.umsg(interpret("If the calculated Merkle Root matches the Merkle Root stored in the block, then it is proven that the transaction in question exists in that block. Thus, this transaction has been verified while only needing to query 2 other nodes of the tree."));
    h1234.removeClass("processing")
    h34.removeClass("processing")
    h4.removeClass("processing")
    l4.removeClass("processing")
    h1234.addClass("greennode")
    h34.addClass("greennode")
    h4.addClass("greennode")
    l4.addClass("greennode")
    av.step();

    // Slide 6
    av.umsg(interpret("If the calculated Merkle Root does NOT match the Merkle Root stored in the block, then it is proven that the transaction in question DOES NOT exist in that block. Thus, this transaction has NOT been verified. This was performed while only needing to query 2 other nodes of the tree."));
    h1234.removeClass("greennode")
    h34.removeClass("greennode")
    h4.removeClass("greennode")
    l4.removeClass("greennode")
    h1234.addClass("rednode")
    h34.addClass("rednode")
    h4.addClass("rednode")
    l4.addClass("rednode")

    av.recorded();
  });
  