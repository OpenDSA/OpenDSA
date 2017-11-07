//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes3CON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var pseudo = av.code(code[0]);
  pseudo.hide();
  var linkedListStartPositionX = 320;
  var linkedListStartPositionY = 40;

  // Slide 1
  av.umsg("Let's start again with our original series of <tt>Link</tt> nodes.");
  var list = av.ds.list({left: linkedListStartPositionX, top:linkedListStartPositionY});
  list.addLast(20).addLast(30).addLast(10).addLast(5);
  var head = av.pointer("head", list.get(0),{anchor:"center bottom", myAnchor:"right top",top:0, left:-35, arrowAnchor: "center bottom"});
  list.layout();
  av.displayInit();

  // Slide 2
  av.umsg("First we create a new <tt>Link</tt> reference that points to the same node referenced by <tt>head</tt>.");
  pseudo.show();
  pseudo.setCurrentLine(1);
  var curr = av.pointer("curr", list.get(0));
  av.step();

  // Slide 3
  av.umsg("Now we start the loop.  We can now repeatedly use the <tt>next</tt> fields to loop through the chain of <tt>Link</tt> nodes.");
  pseudo.setCurrentLine(2);
  av.step();

  // Slide 4
  av.umsg("Iterate to the next node");
  pseudo.setCurrentLine(3);
  curr.target(list.get(1));
  av.step();

  // Slide 5
  av.umsg("This loop will continue till <tt>curr</tt> is <tt>null</tt>.");
  pseudo.setCurrentLine(2);
  av.step();

  // Slide 6
  pseudo.setCurrentLine(3);
  curr.target(list.get(2));
  av.step();

  // Slide 7
  pseudo.setCurrentLine(2);
  av.step();

  // Slide 8
  pseudo.setCurrentLine(3);
  curr.target(list.get(3));
  av.step();

  // Slide 9
  av.umsg("And here we are. Now <tt>curr</tt> points to a <tt>Link</tt> with a <tt>null</tt> value in its <tt>next</tt> field. So this loop stops.");
  pseudo.setCurrentLine(2);
  av.recorded();
});
