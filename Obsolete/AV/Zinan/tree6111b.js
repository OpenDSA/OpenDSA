$(document).ready(function() {
    "use strict";
    var av_name = "tree6111b";
    var av = new JSAV(av_name, {animationMode: "none"});
    // Setup the tree
    var tree6111b = av.ds.tree({nodegap: 15});
    tree6111b.root("E");
    tree6111b.root().addChild("E").addChild("*").addChild("E");
    tree6111b.root().child(0).addChild("E").addChild("+").addChild("E");
    tree6111b.root().child(0).child(0).addChild("I").child(0).addChild("a");
    tree6111b.root().child(0).child(2).addChild("I").child(0).addChild("b");
    tree6111b.root().child(2).addChild("I").child(0).addChild("a");
    tree6111b.layout();
    av.displayInit();
    av.recorded();
  });
  