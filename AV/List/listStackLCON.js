"use strict";
// Helper function for creating a pointer
function setPointer(name, obj) {
  return obj.jsav.pointer(name, obj, {visible: true,
    anchor: "left top",
    myAnchor: "right bottom",
    left: 20,
    top: -20});
}

// LStack Diagram
(function ($) {
  var jsav = new JSAV("LStackDiagramCON");
  // Relative offsets
  var leftMargin = 300;
  var topMargin = 25;
  var list = jsav.ds.list({"nodegap": 30});
  list.css({top : 40});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(23)
      .addFirst(20);
  list.layout();
  jsav.pointer("top", list.get(0));
}(jQuery));

// LStack method push
(function ($) {
  var jsav = new JSAV("LStackPushCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LStackPush *** */",
                       endBefore: "/* *** ODSAendTag: LStackPush *** */"});
  // Relative offsets
  var leftMargin = 20;
  var topMargin = 40;
  var list = jsav.ds.list({"nodegap": 30, left: leftMargin, top: topMargin});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(20);
  list.layout();
  list.get(0).edgeToNext().hide();
  list.get(0).hide();
  var arr = jsav.ds.array([10]);
  arr.hide();
  var topPointer = jsav.pointer("top", list.get(1));
  jsav.umsg("Here is the <code>push</code> operation. First we see the linked stack before <code>push</code>");
  pseudo.highlight(0);
  jsav.displayInit();
  jsav.umsg("Create a new node.");
  var newNode = list.newNode("");
  newNode.css({top : topMargin + 20});
  newNode.highlight();
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();
  jsav.umsg("Set the value of the new node.");
  jsav.effects.copyValue(arr, 0, newNode);
  jsav.step();
  jsav.umsg("Modify the <code>next</code> field of the newly created link node to point to the top of the stack");
  newNode.next(list.get(1));
  list.get(0).next(newNode);
  list.layout({updateTop : false});
  jsav.step();
  jsav.umsg("Then set top to point to the new link node.");
  topPointer.target(list.get(1));
  list.layout();
  jsav.step();
  list.get(1).unhighlight();
  jsav.umsg("Increase stack size by 1.");
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();
  jsav.recorded();
}(jQuery));

// LStack method pop
(function ($) {
  var jsav = new JSAV("LStackPopCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LStackPop *** */",
                       endBefore: "/* *** ODSAendTag: LStackPop *** */"});
  // Relative offsets
  var leftMargin = 10;
  var topMargin = 35;
  var list = jsav.ds.list({"nodegap": 30, left : leftMargin, top : topMargin});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(23)
      .addFirst(20);
  list.layout();
  var arr = jsav.ds.array([10]);
  arr.hide();
  var arrIt = jsav.ds.array([""], {left : leftMargin + 110, top: topMargin + 50});
  var labelIt = jsav.label("it", {left : leftMargin + 90, top: topMargin + 70});
  list.get(0).edgeToNext().hide();
  list.get(0).hide();
  jsav.umsg("Method <code>pop</code> is also quite simple.");
  jsav.displayInit();
  list.get(1).highlight();
  jsav.umsg("<code>pop</code> points to the first node. Since <code>pop</code> is not equal to <code>null</code>, we proceed.");
  var topPointer = setPointer("top", list.get(1));
  list.layout();
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();
  jsav.effects.copyValue(list.get(1), arrIt, 0);
  list.get(1).unhighlight();
  arrIt.highlight(0);
  jsav.umsg(" Variable \"it\" stores the top nodes' value as it is removed from the stack.");
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();
  topPointer.target(list.get(2));
  arrIt.unhighlight();
  list.get(2).highlight();
  jsav.umsg("The stack is updated by setting \"top\" to point to the next link in the stack.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();
  jsav.umsg("Decrease the stack size by 1");
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.step();
  list.get(2).unhighlight();
  arrIt.highlight();
  jsav.umsg("The element value is returned.");
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  jsav.step();
  jsav.recorded();
}(jQuery));


// Diagram showing Two stacks implemented within in a single array.
(function ($) {
  var jsav = new JSAV("LStackTwostacksCON");
  // Relative offsets
  var leftMargin = 180;
  var topMargin = 50;
  var rect = jsav.g.rect(leftMargin, topMargin, 500, 31);
  var line1 = jsav.g.line(leftMargin + 31, topMargin, leftMargin + 31, topMargin + 31);
  var line2 = jsav.g.line(leftMargin + 31 * 2, topMargin, leftMargin + 31 * 2, topMargin + 31);
  for (var i = 0; i < 4; i++) {
    jsav.g.line(leftMargin + 376 + 31 * i, topMargin, leftMargin + 376 + 31 * i,
                topMargin + 31);
  }
  var top1Label = jsav.label("top1", {left : leftMargin + 20, top: topMargin - 40});
  var top1Arrow = jsav.g.line(leftMargin + 30, topMargin - 20, leftMargin + 45,
                              topMargin - 2, {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var top2Label = jsav.label("top2", {left : leftMargin + 376 + 20, top: topMargin - 40});
  var top2Arrow = jsav.g.line(leftMargin + 376 + 30, topMargin - 20,
                              leftMargin + 376 + 15, topMargin - 2,
                              {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var arrow1 = jsav.g.line(leftMargin + 82, topMargin + 16, leftMargin + 82 + 35, topMargin + 16, {'stroke-width' : 2, 'arrow-end' : 'block-wide-long'});
  var arrow2 = jsav.g.line(leftMargin + 356, topMargin + 16,
                           leftMargin + 356 - 35, topMargin + 16,
                           {'stroke-width' : 2, 'arrow-end' : 'block-wide-long'});
  jsav.displayInit();
  jsav.recorded();
}(jQuery));
