/*global ODSA, setPointer */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// Diagram showing the doubly linked list
$(document).ready(function () {
  var av = new JSAV('dlistDiagramCON');
  // Relative offsets
  var leftMargin = 160;
  var topMargin = 30;
  // JSAV list
  var l = av.ds.dlist({nodegap: 30, center: false, left: leftMargin, top: topMargin});
  l.addFirst("null").addFirst(15).addFirst(12).addFirst(23).addFirst(20).addFirst("null");
  l.layout();
  setPointer("head", l.get(0));
  setPointer("curr", l.get(2));
  setPointer("tail", l.get(5));
  l.get(0).addSlash("left");
  l.get(5).addSlash();
  l.get(2).addVLine();
});
