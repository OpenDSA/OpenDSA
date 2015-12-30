// Written by Jun Yang and Cliff Shaffer
// List diagram with header and tailer nodes added
$(document).ready(function() {
  "use strict";
  var av = new JSAV("llistHeaderCON", {animationMode: "none"});
  var l = av.ds.list({nodegap: 30, top: 40, left: 180});
  l.addFirst("null").addFirst(15).addFirst(12).addFirst(10).addFirst(23).addFirst(20).addFirst("null");
  l.layout();
  av.pointer("head", l.get(0));
  av.pointer("curr", l.get(3));
  av.pointer("tail", l.get(6));
  l.get(3).addVLine();
  av.displayInit();
  av.recorded();
});
