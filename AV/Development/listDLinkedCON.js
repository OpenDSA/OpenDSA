"use strict";
// Move curr around the Linked list
(function ($) {
  var jsav = new JSAV("DLlistInsertCON");
  // Relative offsets
  var leftMargin = 210;
  var topMargin = 25;
  // JSAV list
  var l = jsav.ds.dlist({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
  function setPointer(name, obj){
    var pointer = jsav.pointer(name, obj,{visible: true, // visible by default
                          // positioned 20px above the object pointed to
                          anchor: "left top",
                          myAnchor: "right bottom",
                          left: 20,
                          top: "70px" });
    return pointer;
  }
  setPointer("head", l.get(0));
  setPointer("curr", l.get(2));
  setPointer("tail", l.get(5));
  jsav.displayInit();
  var node = l.newNode("new");
  node.css({top: 50, left: 187});
  node.next(l.get(2));
  l.get(2).prev(node);
  l.get(1).next(node);
  node.prev(l.get(1));
  jsav.step();
  l.layout({updateTop: false});
  jsav.step();
  l.layout();
  jsav.recorded();

  
}(jQuery));
