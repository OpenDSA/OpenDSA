/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// List Queue dequeue method.
$(document).ready(function() {
  "use strict";
  // Helper function for drawing arrow around the node
  function arrowAround(node, options) {
    var lav = node.jsav;
    var arrow;
    var nodeWidth = node.element.outerWidth();
    var nodeHeight = node.element.outerHeight();
    var nodegap = 40;
    var nextnode = node.next();
    if (nextnode) {
      nodegap = nextnode.element.offset().left - node.element.offset().left - nodeWidth;
    }
    var left = node.element.offset().left - lav.container.find(".jsavcanvas:first").offset().left;
    var topp = node.element.offset().top - lav.container.find(".jsavcanvas:first").offset().top;
    var opts = $.extend({leftOffset: nodegap / 2,
                       rightOffset: nodegap / 2, topOffset: 15,
                       nodeGap: nodegap, nodeWidth: nodeWidth,
                       nodeHeight: nodeHeight}, options);

    arrow = lav.g.polyline([[left - opts.nodeGap - 6, topp + opts.nodeHeight / 2],
                            [left - opts.leftOffset, topp + opts.nodeHeight / 2],
                            [left - opts.leftOffset, topp - opts.topOffset],
                            [left + opts.nodeWidth + opts.rightOffset, topp - opts.topOffset],
                            [left + opts.nodeWidth + opts.rightOffset, topp + opts.nodeHeight / 2],
                            [left + opts.nodeWidth + opts.nodeGap + 1, topp + opts.nodeHeight / 2]],
                           {"arrow-end": "classic-wide-long", "stroke-width": 2, "stroke-dasharray": "-"});
    return arrow;
  }

  var av_name = "lqueueDequeueCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);

  var leftMargin = 10;
  var topMargin = 50;
  av.label("it", {left: leftMargin + 20, top: topMargin + 55});
  var arrIt = av.ds.array([" "], {left: leftMargin + 30, top: topMargin + 50});
  var list = av.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(30).addFirst(21).addFirst(3).addFirst("null");
  list.layout();

  av.pointer("front", list.get(0));
  av.pointer("rear", list.get(3));

  // Slide 1
  av.umsg(interpret("sc1"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  pseudo.setCurrentLine("empty");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  var node1 = list.get(1).highlight();
  av.effects.copyValue(node1, arrIt, 0);
  arrIt.highlight();
  pseudo.setCurrentLine("copy");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  node1.unhighlight();
  arrIt.unhighlight();
  var dashLine = arrowAround(list.get(1));
  pseudo.setCurrentLine("setNext");
  list.get(0).edgeToNext().hide();
  av.step();

  // Slide 5
  list.remove(1);
  list.get(0).edgeToNext().show();
  dashLine.hide();
  list.layout();
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  list.get(1).highlight();
  pseudo.setCurrentLine("endcheck");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  list.get(1).unhighlight();
  pseudo.setCurrentLine("size");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  arrIt.highlight();
  pseudo.setCurrentLine("return");
  av.recorded();
});
