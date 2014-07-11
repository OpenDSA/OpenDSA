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

// List Queue Introduction.
(function ($) {
  var jsav = new JSAV("LQueueIntroCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LQueue.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LQueue1 *** */",
                       endBefore: "/* *** ODSAendTag: LQueue1 *** */"});
  var leftMargin = 10;
  var topMargin = 50;
  var list = jsav.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(25)
      .addFirst(10)
      .addFirst(5)
      .addFirst("null");
  list.layout();
  var frontP = jsav.pointer("front", list.get(0));
  var rearP = jsav.pointer("rear", list.get(3));
  jsav.umsg("Members <code>front</code> and <code>rear</code> are pointers to the front and rear queue elements, respectively.");
  pseudo.highlight(3);
  pseudo.highlight(4);
  jsav.displayInit();

  jsav.umsg("We will use a header link node, which allows for a simpler implementation of the enqueue operation by avoiding any special cases when the queue is empty.");
  list.get(0).highlight();
  pseudo.unhighlight(3);
  pseudo.unhighlight(4);

  jsav.umsg("On initialization, the front and rear pointers will point to the header node.");
  frontP.target(list.get(0), {left : -10});
  rearP.target(list.get(0), {left: 30});
  list.get(0).edgeToNext().hide();
  list.get(1).edgeToNext().hide();
  list.get(2).edgeToNext().hide();
  list.get(1).hide();
  list.get(2).hide();
  list.get(3).hide();
  pseudo.highlight(13);
  jsav.step();

  jsav.umsg("<code>front</code> will always point to the header node while rear points to the true last link node in the queue.");
  list.get(0).edgeToNext().show();
  list.get(1).edgeToNext().show();
  list.get(2).edgeToNext().show();
  list.get(1).show();
  list.get(2).show();
  list.get(3).show();
  list.get(3).highlight();
  rearP.target(list.get(3), {left: -10});
  pseudo.unhighlight(13);
  pseudo.highlight(3);
  pseudo.highlight(4);
  jsav.step();
  jsav.recorded();
}(jQuery));

// List Queue enqueue method.
(function ($) {
  var jsav = new JSAV("LQueueEnqueueCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LQueue.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LQueueEnqueue *** */",
                       endBefore: "/* *** ODSAendTag: LQueueEnqueue *** */"});
  var leftMargin = 10;
  var topMargin = 40;
  var list = jsav.ds.list({nodegap: 30, left: leftMargin, top: topMargin});
  list.addFirst(30)
      .addFirst(21)
      .addFirst(3)
      .addFirst("null");
  list.layout();
  var frontP = jsav.pointer("front", list.get(0));
  var rearP = jsav.pointer("rear", list.get(3));
  pseudo.highlight(2);
  jsav.displayInit();

  jsav.umsg("Create a new node with value \"it\", which is 10 here.");
  var newNode = list.newNode("10");
  newNode.css({left: leftMargin + 73 * 4, top: topMargin + 30});
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();

  jsav.umsg("The next field of the <code>rear</code> node is assigned to point to the new node.");
  list.get(3).next(newNode);
  list.layout({updateTop: false});
  jsav.step();

  jsav.umsg("Advances <code>rear</code> to point to the new link node.");
  newNode.highlight();
  list.layout();
  rearP.target(list.get(4));
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.step();

  jsav.umsg("Increase <code>size</code> by 1.");
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  jsav.step();
  jsav.recorded();
}(jQuery));

// List Queue dequeue method.
(function ($) {
  var jsav = new JSAV("LQueueDequeueCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LQueue.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LQueueDequeue *** */",
                       endBefore: "/* *** ODSAendTag: LQueueDequeue *** */"});
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
}(jQuery));
