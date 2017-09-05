//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes2CON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var pseudo = av.code(code[0]);
  var linkedListStartPositionX = 500;
  var linkedListStartPositionY = 50;

  // Slide 1
  av.umsg("Now lets see how to construct that original chain of <tt>Link</tt> nodes");
  av.displayInit();

  // Slide 2
  av.umsg("This line creates an empty <tt>Link</tt>, referenced by <tt>head</tt>.");
  var list = av.ds.list({top:linkedListStartPositionY, left:linkedListStartPositionX});
  pseudo.setCurrentLine(1);
  list.addFirst("null");
  var head = av.pointer("head", list.get(0));
  list.layout();
  av.step();

  // Slide 3
  av.umsg("The next line sets the data field of our new <tt>Link</tt> to be 20.");
  pseudo.setCurrentLine(2);
  list.get(0).value(20);
  av.step();

  // Slide 4
  av.umsg("The third line both creates the next <tt>Link</tt> object, and sets its value. As you can see, we can set the element value directly in the constructor. But remember that a <tt>Link</tt> stores an <tt>Object</tt>, not a primitive");
  pseudo.setCurrentLine(3);
  list.addLast(30);
  list.layout();
  av.step();

  // Slide 5
  av.umsg("Now we create the third <tt>Link</tt> object.");
  pseudo.setCurrentLine(4);
  list.addLast(10);
  list.layout();
  av.step();

  // Slide 6
  av.umsg("It can get tiresome to chain all the \"next\" fields from the head. Instead of using a lot of \".next\", we can define a reference to a node and use it to chain a new node in the next");
  pseudo.setCurrentLine(5);
  var temp = av.pointer("temp", list.get(2));
  av.step();

  // Slide 7
  av.umsg("This could make adding <tt>Link</tt> nodes easier than chaining through all the \"next\" fields");
  pseudo.setCurrentLine(6);
  list.addLast(5);
  list.layout();
  av.recorded();
});
