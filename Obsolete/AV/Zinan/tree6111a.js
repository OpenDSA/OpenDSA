$(document).ready(function() {
    "use strict";
    var av_name = "tree6111a";
    var av = new JSAV(av_name, {animationMode: "none"});
    // Setup the tree
    var tree6111a = av.ds.tree({nodegap: 15});
    tree6111a.root("E");
    tree6111a.root().addChild("E").addChild("+").addChild("E");
    tree6111a.root().child(0).addChild("I").child(0).addChild("a");
    tree6111a.root().child(2).addChild("E").addChild("*").child(0).addChild("I").child(0).addChild("b");
    tree6111a.root().child(2).addChild("E").child(2).addChild("I").child(0).addChild("a");
    tree6111a.layout();
    av.displayInit();
    av.recorded();
  });
  