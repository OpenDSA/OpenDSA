/*global ODSA */
"use strict";
// Written by Jun Yang and Cliff Shaffer
// List Queue dequeue method.
$(document).ready(function () {

  // Helper function for drawing arrow around the node
  function arrowAround(node, options) {
    var jsav = node.jsav;
    var arrow;
    var nodeWidth = node.element.outerWidth();
    var nodeHeight = node.element.outerHeight();
    var nodegap = 40;
    var nextnode = node.next();
    if (nextnode) {
      nodegap = nextnode.element.offset().left - node.element.offset().left - nodeWidth;
    }
    var left = node.element.offset().left - jsav.container.find(".jsavcanvas:first").offset().left;
    var top = node.element.offset().top - jsav.container.find(".jsavcanvas:first").offset().top;
    var opts = $.extend({leftOffset: nodegap / 2,
                       rightOffset: nodegap / 2, topOffset: 15,
                       nodeGap: nodegap, nodeWidth: nodeWidth,
                       nodeHeight: nodeHeight}, options);

    arrow = jsav.g.polyline([[left - opts.nodeGap - 6, top + opts.nodeHeight / 2],
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
  var jsav = new JSAV(av_name);
  var pseudo = jsav.code(code);

  var leftMargin = 10;
  var topMargin = 50;
  var labelIt = jsav.label("it", {left: leftMargin - 5, top: topMargin + 55}).hide();
  var arrIt = jsav.ds.array([" "], {left: leftMargin + 30, top: topMargin + 50}).hide();
  var list = jsav.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(30)
      .addFirst(21)
      .addFirst(3)
      .addFirst("null");
  list.layout();

  var frontP = jsav.pointer("front", list.get(0));
  var rearP = jsav.pointer("rear", list.get(3));
  pseudo.highlight(3);
  jsav.umsg("First check that the Queue is not empty.");
  jsav.displayInit();

  jsav.umsg("Store dequeued value.");
  labelIt.show();
  arrIt.show();
  jsav.effects.copyValue(list.get(1), arrIt, 0);
  arrIt.highlight();
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.step();

  jsav.umsg("Advance front to point to the new link node.");
  arrIt.unhighlight();
  var dashLine = arrowAround(list.get(1));
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  list.get(0).edgeToNext().hide();
  jsav.step();

  list.remove(1);
  list.get(0).edgeToNext().show();
  dashLine.hide();
  list.layout();
  jsav.step();

  jsav.umsg("Check that the next node of <code>front</code> is not empty.");
  list.get(1).highlight();
  pseudo.unhighlight(5);
  pseudo.highlight(6);
  jsav.step();

  jsav.umsg("Decrease the size by 1.");
  list.get(1).unhighlight();
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  jsav.step();

  jsav.umsg("Return the dequeued value.");
  arrIt.highlight();
  pseudo.unhighlight(7);
  pseudo.highlight(8);
  jsav.step();
  jsav.recorded();
});
