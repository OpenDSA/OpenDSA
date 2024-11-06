$(document).ready(function() {
  "use strict";
  var av = new JSAV("FibrtTreeCON");
  var fibtree = av.ds.tree({nodegap: 20});
  var val;
  
  fibtree.root("7");
  val = "7" + "<br>" + "13" ;
  fibtree.root().value(val);

  fibtree.root().addChild("6");
  val = "6" + "<br>" + "8" ;
  fibtree.root().child(0).value(val);

  fibtree.root().addChild("5");
  val = "5" + "<br>" + "5" ;
  fibtree.root().child(1).value(val);

  fibtree.root().child(0).addChild("6");
  val = "5" + "<br>" + "5" ;
  fibtree.root().child(0).child(0).value(val);

  fibtree.root().child(0).addChild("5");
  val = "4" + "<br>" + "3" ;
  fibtree.root().child(0).child(1).value(val);

  fibtree.root().child(0).child(0).addChild("5");
  val = "4" + "<br>" + "3" ;
  fibtree.root().child(0).child(0).child(0).value(val);

  fibtree.root().child(0).child(0).addChild("4");
  val = "3" + "<br>" + "2" ;
  fibtree.root().child(0).child(0).child(1).value(val);

  fibtree.root().child(0).child(0).child(0).addChild("3");
  val = "3" + "<br>" + "2" ;
  fibtree.root().child(0).child(0).child(0).child(0).value(val);

  fibtree.root().child(0).child(0).child(0).addChild("2");
  val = "2" + "<br>" + "1" ;
  fibtree.root().child(0).child(0).child(0).child(1).value(val);

  fibtree.root().child(0).child(0).child(0).child(0).addChild("2");
  val = "2" + "<br>" + "1" ;
  fibtree.root().child(0).child(0).child(0).child(0).child(0).value(val);

  fibtree.root().child(0).child(0).child(0).child(0).addChild("1");
  val = "1" + "<br>" + "1" ;
  fibtree.root().child(0).child(0).child(0).child(0).child(1).value(val);

  fibtree.layout();
  av.displayInit();
  av.recorded();
});
