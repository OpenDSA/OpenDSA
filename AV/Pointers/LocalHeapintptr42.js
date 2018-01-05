/*global JSAV, document */
// Written by Sushma Mandava
//variable xPositionLocalRectangles controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "LocalHeapintptr42";
  var av;
  av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;            // get the code object
  var pseudo = av.code(code[0]);
  var xPositionLocalRectangles = 440;
  var yPositionLocal1 = 60;
  var xPositionHeapRectangles = xPositionLocalRectangles + 160;
  var length1 = 100;
  var width = 30;

  // Slide 1
  av.umsg("In this example we will first allocate an Employee object block in the heap, and then deallocate it.");
  av.displayInit();

  // Slide 2
  av.umsg("The example shows the state of both the local stack and the heap at three different times during the execution of this code. For example, the lifetime of the local variable empPtr is totally separate from the lifetime of any object that it references.");
  av.label("Local", {top: 0, left: xPositionLocalRectangles + 20});
  av.label("Heap", {top: 0, left: xPositionLocalRectangles + 200});
  av.g.line((xPositionLocalRectangles + 130), 0,
            (xPositionLocalRectangles + 130), 140,
            {"stroke-width": 3, stroke: "gray"});
  av.step();

  // Slide 3
  av.umsg("The highlighted line allocates a local reference variable (but not its pointee). Before using <tt>new</tt>, <tt>empPtr</tt> is uninitialized and does not have a pointee. At this point <tt>empPtr</tt> has a value of <tt>null</tt>.");
  pseudo.highlight(2);
  var empptrBox = av.g.rect(xPositionLocalRectangles, yPositionLocal1, length1, width,
                            {"stroke-width": 2});
  var empptrLabel = av.label("empPtr", {top: yPositionLocal1 - (width / 2),
                                        left: xPositionLocalRectangles - 55});
  //creating the x's
  var x1 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 23,
                     xPositionLocalRectangles + 27, yPositionLocal1 + 8,
                     {"stroke-width": 2});
  var x2 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 8,
                     xPositionLocalRectangles + 27, yPositionLocal1 + 23,
                     {"stroke-width": 2});
  var x3 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 23,
                     xPositionLocalRectangles + 53, yPositionLocal1 + 8,
                     {"stroke-width": 2});
  var x4 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 8,
                     xPositionLocalRectangles + 53, yPositionLocal1 + 23,
                     {"stroke-width": 2});
  var x5 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 23,
                     xPositionLocalRectangles + 77, yPositionLocal1 + 8,
                     {"stroke-width": 2});
  var x6 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 8,
                     xPositionLocalRectangles + 77, yPositionLocal1 + 23,
                     {"stroke-width": 2});
  av.step();

  // Slide 4
  av.umsg("Dereferencing such an uninitialized reference is a common, but catastrophic, error. It raises a <tt>NullPointerException</tt>. This error will crash the program immediately, unless there is specific code to handle this exception.");
  av.step();

  // Slide 5
  av.umsg("A call to <tt>new</tt> allocates an object in the heap. In this example, the program stores the reference to the new Employee object in the local variable <tt>empPtr</tt>. The object is the  \"pointee\", and <tt>empPtr</tt> is its reference.");
  var ptline = av.g.line(xPositionLocalRectangles + 80, yPositionLocal1 + (width / 2),
                         xPositionLocalRectangles + 150, yPositionLocal1 + (width / 2),
                         {"arrow-end": "classic-wide-long", "stroke-width": 2});
  pseudo.unhighlight(2);
  pseudo.highlight(4);
  x1.hide();
  x2.hide();
  x3.hide();
  x4.hide();
  x5.hide();
  x6.hide();
  var heapRectangle = av.g.rect(xPositionHeapRectangles, yPositionLocal1, length1, width * 2,
                                {"stroke-width": 2});
  av.step();

  // Slide 6
  av.umsg("In this state, <tt>empPtr</tt> may be dereferenced safely to manipulate the pointee. We add values for the Employee's name and salary fields.");
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  pseudo.highlight(6);
  var label1 = av.label("Sam", {top: yPositionLocal1 - 10, left: xPositionHeapRectangles + 40});
  var label2 = av.label("1000", {top: yPositionLocal1 + width/2 , left: xPositionHeapRectangles + 40});
  av.step();

  // Slide 7
  av.umsg("Setting the value for the only reference to an object will make that object available for garbage collection.");
  pseudo.unhighlight(5);
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  x1.show();
  x2.show();
  x3.show();
  x4.show();
  x5.show();
  x6.show();
  heapRectangle.addClass("silver");
  label1.addClass("silver");
  label2.addClass("silver");
  ptline.hide();
  av.step();

  // Slide 8
  pseudo.unhighlight(7);
  pseudo.highlight(8);
  av.umsg("When the function exits, its local variable <tt>empPtr</tt> will be automatically deallocated by the garbage collecter.");
  x1.addClass("silver");
  x2.addClass("silver");
  x3.addClass("silver");
  x4.addClass("silver");
  x5.addClass("silver");
  x6.addClass("silver");
  empptrLabel.addClass("silver");
  empptrBox.addClass("silver");
  av.recorded();
});
