"use strict";
// Initial state of a linked list when using a header node
(function ($) {
  $(document).ready(function () {
    var av = new JSAV('llistInitCON', { 'animationMode': 'none' });

    // Relative offsets
    var leftMargin = 367;
    var topMargin = 50;

    var l = av.ds.list({ 'nodegap': 30, 'top': 50, left: 367 });
    l.addFirst('null').addFirst('null');
    l.layout();

    var head = setPointerL('head', l.get(0));
    var curr = setPointerL('curr', l.get(1));
    var tail = setPointerR('tail', l.get(1));
    var slash = l.get(1).addTail();
    var bar = l.get(1).addVLine();
    av.recorded();
  });
}(jQuery));
