$(document).ready(function() {
  "use strict";
  var av_name = "partDeriv1CON";
  var av = new JSAV(av_name, {animationMode: "none"});

  var tr = av.ds.tree({nodegap: 15});
  var root_s_1 = tr.root("s");
  var A_1 = tr.newNode("A");
  var A_2 = tr.newNode("A");
  var a_1 = tr.newNode("a");
  var a_2 = tr.newNode("a");
  var B_1 = tr.newNode("B");
  var c_1 = tr.newNode("c");
  root_s_1.addChild(A_1);
  root_s_1.addChild(c_1);
  root_s_1.addChild(B_1);
  A_1.addChild(a_1);
  A_1.addChild(A_2);
  A_1.addChild(a_2);
  
  tr.layout();
  av.displayInit();
  av.recorded();
});
