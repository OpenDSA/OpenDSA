//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes5CON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var pseudo = av.code(code[0]);
  pseudo.hide();
  var linkedListStartPositionX = 450;
  var linkedListStartPositionY = 50;

  // Slide 1
  av.umsg("Consider we have the following list.");
  var list = av.ds.list({nodegap: 30, center: false, left: linkedListStartPositionX, top: linkedListStartPositionY});
  list.addLast(20).addLast(30).addLast(10).addLast(5);
  var head = av.pointer("head", list.get(0));
  list.layout();
  av.displayInit();

  // Slide 2
  av.umsg("To add a new <tt>Link</tt> to the chain, we need to create it first.");
  pseudo.show();
  pseudo.setCurrentLine(1);
  var newNode = list.newNode("8");
  newNode.css({
    top: 0,
    left: -80
  });
  var newLink = av.pointer("newLink", newNode,{anchor:"center bottom", myAnchor:"right top",top:-5, left:-35, arrowAnchor: "center bottom"});
  newNode.highlight();
  av.step();

  // Slide 3
  av.umsg("To add this <tt>Link</tt> to the head of the chain, we need to make the its <tt>next</tt> field point to the head node.");
  pseudo.setCurrentLine(2);
  list.addFirst(newNode);
  list.layout();
  av.step();

  // Slide 4
  av.umsg("Now, the new <tt>Link</tt> is the first node in the chain, so we set <tt>head</tt> to point to it.");
  pseudo.setCurrentLine(3);
  head.target(newNode);
  list.layout();
  newNode.unhighlight();
  av.recorded();
});
