var jsav = new JSAV("container");
var tree6111a = jsav.ds.tree();
tree6111a.root("E");
tree6111a.root().addChild("E").addChild("+").addChild("E");
tree6111a.root().child(0).addChild("I").child(0).addChild("a");
tree6111a.root().child(2).addChild("E").addChild("*").child(0).addChild("I").child(0).addChild("b");
tree6111a.root().child(2).addChild("E").child(2).addChild("I").child(0).addChild("a");
tree6111a.layout();

var tree6111b = jsav.ds.tree();
tree6111b.root("E");
tree6111b.root().addChild("E").addChild("*").addChild("E");
tree6111b.root().child(0).addChild("E").addChild("+").addChild("E");
tree6111b.root().child(0).child(0).addChild("I").child(0).addChild("a");
tree6111b.root().child(0).child(2).addChild("I").child(0).addChild("b");
tree6111b.root().child(2).addChild("I").child(0).addChild("a");
tree6111b.layout();

var tree6112 = jsav.ds.tree();
tree6112.root("E");
tree6112.root().addChild("E").addChild("+").addChild("T");
tree6112.root().child(0).addChild("T").child(0).addChild("F").child(0).addChild("I").child(0).addChild("a");
tree6112.root().child(2).addChild("T").addChild("*").addChild("F");
tree6112.root().child(2).child(0).addChild("F").child(0).addChild("I").child(0).addChild("b");
tree6112.root().child(2).child(2).addChild("I").child(0).addChild("a");
tree6112.layout();
