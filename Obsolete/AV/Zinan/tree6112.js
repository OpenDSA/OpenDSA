$(document).ready(function() {
    "use strict";
    var av_name = "tree6112";
    var av = new JSAV(av_name, {animationMode: "none"});
    // Setup the tree
    var tree6112 = av.ds.tree({nodegap: 15});
    tree6112.root("E");
    tree6112.root().addChild("E").addChild("+").addChild("T");
    tree6112.root().child(0).addChild("T").child(0).addChild("F").child(0).addChild("I").child(0).addChild("a");
    tree6112.root().child(2).addChild("T").addChild("*").addChild("F");
    tree6112.root().child(2).child(0).addChild("F").child(0).addChild("I").child(0).addChild("b");
    tree6112.root().child(2).child(2).addChild("I").child(0).addChild("a");
    tree6112.layout();
    av.displayInit();
    av.recorded();
  });
  