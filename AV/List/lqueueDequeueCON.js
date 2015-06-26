/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// List Queue dequeue method.
$(document).ready(function () {

  // Helper function for drawing arrow around the node
  function arrowAround(node, options) {
    var av = node.jsav;
    var arrow;
    var nodeWidth = node.element.outerWidth();
    var nodeHeight = node.element.outerHeight();
    var nodegap = 40;
    var nextnode = node.next();
    if (nextnode) {
      nodegap = nextnode.element.offset().left - node.element.offset().left - nodeWidth;
    }
    var left = node.element.offset().left - av.container.find(".jsavcanvas:first").offset().left;
    var top = node.element.offset().top - av.container.find(".jsavcanvas:first").offset().top;
    var opts = $.extend({leftOffset: nodegap / 2,
                       rightOffset: nodegap / 2, topOffset: 15,
                       nodeGap: nodegap, nodeWidth: nodeWidth,
                       nodeHeight: nodeHeight}, options);

    arrow = av.g.polyline([[left - opts.nodeGap - 6, top + opts.nodeHeight / 2],
                           [left - opts.leftOffset, top + opts.nodeHeight / 2],
                           [left - opts.leftOffset, top - opts.topOffset],
                           [left + opts.nodeWidth + opts.rightOffset, top - opts.topOffset],
                           [left + opts.nodeWidth + opts.rightOffset, top + opts.nodeHeight / 2],
                           [left + opts.nodeWidth + opts.nodeGap + 1, top + opts.nodeHeight / 2]],
                          {"arrow-end": "classic-wide-long", "stroke-width": 2, "stroke-dasharray": "-"});
    return arrow;
  }

  var av_name = "lqueueDequeueCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code);

  var leftMargin = 10;
  var topMargin = 50;
  var labelIt = av.label("it", {left: leftMargin + 20, top: topMargin + 55});
  var arrIt = av.ds.array([" "], {left: leftMargin + 30, top: topMargin + 50});
  var list = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(30).addFirst(21).addFirst(3).addFirst("null");
  list.layout();
  var slash1 = list.get(3).addTail();
  var slash2 = list.get(2).addTail();
  slash2.hide();

  var frontP = av.pointer("front", list.get(0));
  var rearP = av.pointer("rear", list.get(3));

  // Slide 1
  pseudo.setCurrentLine("sig");
  av.umsg(interpret("av_c1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("av_c2"));
  pseudo.setCurrentLine("empty");
  av.step();

  // Slide 3
  av.umsg(interpret("av_c3"));
  var node1 = list.get(1).highlight();
  av.effects.copyValue(node1, arrIt, 0);
  arrIt.highlight();
  pseudo.setCurrentLine("copy");
  av.step();

  // Slide 4
  node1.unhighlight();
  av.umsg(interpret("av_c4"));
  arrIt.unhighlight();
  var dashLine = arrowAround(list.get(1));
  pseudo.setCurrentLine("setNext");
  list.get(0).edgeToNext().hide();
  av.step();

  // Slide 5
  list.remove(1);
  list.get(0).edgeToNext().show();
  dashLine.hide();
  slash1.hide();
  slash2.show();
  list.layout();
  av.step();

  // Slide 6
  av.umsg(interpret("av_c6"));
  list.get(1).highlight();
  pseudo.setCurrentLine("endcheck");
  av.step();

  // Slide 7
  av.umsg(interpret("av_c7"));
  list.get(1).unhighlight();
  pseudo.setCurrentLine("size");
  av.step();

  // Slide 8
  av.umsg(interpret("av_c8"));
  arrIt.highlight();
  pseudo.setCurrentLine("return");
  av.recorded();
});
