"use strict";
// Diagram showing the linked list concept
(function ($) {
  $(document).ready(function () {
    var jsav = new JSAV('llistRepCON', { 'animationMode': 'none' });
    var l = jsav.ds.list({ 'nodegap': 30 });
    l.addFirst('').addFirst('').addFirst('');
    l.get(2).addTail({ left: 477 });
    l.layout();
  });
}(jQuery));
