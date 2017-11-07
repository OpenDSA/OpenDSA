//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes4CON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var pseudo = av.code(code[0]);

  var leftMargin = 155;
  var topMargin = 38;
  var dashline = av.g.polyline([[leftMargin + 186, topMargin + 32],
                                [leftMargin + 210, topMargin + 32],
                                [leftMargin + 210, topMargin + 3],
                                [leftMargin + 280, topMargin + 3],
                                [leftMargin + 280, topMargin + 32],
                                [leftMargin + 320, topMargin + 32]],
                               {"arrow-end": "classic-wide-long",
                                opacity: 0, "stroke-width": 2,
                                "stroke-dasharray": "-"});
  dashline.hide();
  var linkedListStartPositionX = 300;
  var linkedListStartPositionY = 40;

  // Slide 1
  av.umsg("Let's start with our original list again.");
  var list = av.ds.list({left: linkedListStartPositionX,
                         top:linkedListStartPositionY});
  list.addLast(20).addLast(30).addLast(10).addLast(5);
  var head = av.pointer("head", list.get(0));
  list.layout();
  av.displayInit();

  // Slide 2
  av.umsg("We will see how to remove the second node in the list. Begin by creating a <tt>Link</tt> reference named <tt>q</tt> to point to it.");
  pseudo.show();
  pseudo.setCurrentLine(1);
  var q = av.pointer("q", list.get(1));
  av.step();

  // Slide 3
  av.umsg("To safely remove a <tt>Link</tt>, we must be sure that the chain will not break when we remove the node. We need to make the <tt>next</tt> field of <tt>head</tt> reference the value <tt>q</tt>'s <tt>next</tt> field, instead of referencing <tt>q</tt> itself.");
  pseudo.setCurrentLine(2);
  list.get(0).edgeToNext().hide();
  dashline.show();
  av.step();

  // Slide 4
  av.umsg("Now the second <tt>Link</tt> the one with 10 in its <tt>data</tt> field. The chain remains connected. The <tt>Link</tt> with 30 in its <tt>data</tt> field no longer has anything to do with our list. If nothing else is referencing it, then (eventually) Java's garbage collector will reclaim it.");
  pseudo.setCurrentLine(3);
  q.target(list.get(2));
  list.get(1).edgeToNext().hide();
  av.recorded();
});
