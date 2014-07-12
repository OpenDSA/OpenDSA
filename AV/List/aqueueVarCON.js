// Show the AQueue code.
(function ($) {
  var jsav = new JSAV("aqueueVarCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AQueue.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AQueue1 *** */",
                       endBefore: "/* *** ODSAendTag: AQueue1 *** */"});
  jsav.umsg("Member <code>queueArray</code> holds the queue elements,");
  pseudo.highlight(6);
  jsav.displayInit();
  pseudo.unhighlight(6);
  pseudo.highlight(9);
  jsav.umsg("and as usual, the queue constructor allows an optional parameter to set the maximum size of the queue.");
  jsav.step();
  pseudo.unhighlight(9);
  pseudo.highlight(10);
  jsav.umsg("The array as created is actually large enough to hold one element more than the queue will allow, so that empty queues can be distinguished from full queues.");
  jsav.step();
  pseudo.unhighlight(10);
  pseudo.highlight(3);
  jsav.umsg("Member <code>maxSize</code> is used to control the circular motion of the queue (it is the base for the modulus operator).");
  jsav.step();
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  jsav.umsg("Member <code>rear</code> is set to the position of the current rear element, while front is the position of the current front element.");
  jsav.recorded();
}(jQuery));
