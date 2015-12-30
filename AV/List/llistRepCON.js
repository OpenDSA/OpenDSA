// Written by Jun Yang and Cliff Shaffer
// Diagram showing the linked list concept
$(document).ready(function() {
  "use strict";
  var av = new JSAV("llistRepCON", {animationMode: "none"});
  var l = av.ds.list({nodegap: 30});
  l.addFirst("").addFirst("").addFirst("");
  l.layout();
  av.displayInit();
  av.recorded();
});
