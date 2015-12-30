// Written by Jun Yang and Cliff Shaffer
// Initial state of a linked list when using a header node
$(document).ready(function() {
  "use strict";
  var av = new JSAV("llistInitCON", {animationMode: "none"});
  var l = av.ds.list({nodegap: 30, top: 45, left: 367});
  l.addFirst("null").addFirst("null");
  l.layout();
  av.pointer("head", l.get(0));
  av.pointer("curr", l.get(1), {anchor: "left top",
                                myAnchor: "right bottom", left: 15});
  av.pointer("tail", l.get(1), {anchor: "right top",
                                myAnchor: "left bottom", left: -10});
  l.get(1).addVLine();
  av.displayInit();
  av.recorded();
});
