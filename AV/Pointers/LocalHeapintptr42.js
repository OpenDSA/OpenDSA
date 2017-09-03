/*global JSAV, document */
// Written by Sushma Mandava
//variable xPositionLocalRectangles controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "LocalHeapintptr42";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      code = config.code;
  var pseudo = av.code(code[0]);
  pseudo.element.css({
    position: "absolute",
    top: 10,
    left: -10
  });
  pseudo.hide();
  var xPositionLocalRectangles = 440;
  var yPositionLocal1 = 60;
  var xPositionHeapRectangles = xPositionLocalRectangles + 160;
  var length1 = 100;
  var width = 30;

  // Slide 1
  av.umsg("Here is a simple example that allocates an Employee object block in the heap, and then deallocates it.");
  pseudo.show();
  av.displayInit();

  av.umsg("The example shows the state of memory at three different times during the execution of this code.");
  av.step();

  // drawEmplyeeObject(av, 50, 100, 3, ["asd", "50000000000000000000000000000", "a"], ["name", "salary", "aaaaaaaaaaaaaaaaaa"],false,false);
  av.umsg("The stack and heap are shown separately in the drawing—a drawing for code which uses stack and heap memory" +
          " needs to distinguish between the two areas to be accurate since the rules which govern the two areas are so" +
          " different.");
  av.label("Local", {top: 0, left: xPositionLocalRectangles + 20});
  av.label("Heap", {top: 0, left: xPositionLocalRectangles + 200});
  av.g.line((xPositionLocalRectangles + 130), 0, (xPositionLocalRectangles + 130),
            140, {"stroke-width": 3, stroke: "gray"});
  av.step();
  av.umsg("In this case, the lifetime of the local variable empPtr is totally separate from the lifetime of " +
          "the heap block, and the drawing needs to reflect that difference.");
  av.step();
  av.umsg("This line of code allocates local pointer to a local variable (but not its pointee)");
  pseudo.setCurrentLine(3);

  av.g.rect(xPositionLocalRectangles, yPositionLocal1, length1, width, {"stroke-width": 2});
  av.label("empPtr", {top: yPositionLocal1 - (width / 2), left: xPositionLocalRectangles - 55});
  //creating the x's
  var x1 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 23, xPositionLocalRectangles + 27, yPositionLocal1 + 8, {"stroke-width": 2});
  var x2 = av.g.line(xPositionLocalRectangles + 16, yPositionLocal1 + 8, xPositionLocalRectangles + 27, yPositionLocal1 + 23, {"stroke-width": 2});

  var x3 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 23, xPositionLocalRectangles + 53, yPositionLocal1 + 8, {"stroke-width": 2});
  var x4 = av.g.line(xPositionLocalRectangles + 41, yPositionLocal1 + 8, xPositionLocalRectangles + 53, yPositionLocal1 + 23, {"stroke-width": 2});

  var x5 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 23, xPositionLocalRectangles + 77, yPositionLocal1 + 8, {"stroke-width": 2});
  var x6 = av.g.line(xPositionLocalRectangles + 66, yPositionLocal1 + 8, xPositionLocalRectangles + 77, yPositionLocal1 + 23, {"stroke-width": 2});

  //gray line in the middle

  var ptline = av.g.line(xPositionLocalRectangles + 80, yPositionLocal1 + (width / 2), xPositionLocalRectangles + 150,
                         yPositionLocal1 + (width / 2),
                         {"arrow-end": "classic-wide-long", "stroke-width": 2});
  ptline.hide();
  av.step();
  av.umsg(" Before using \"new\", \"empPtr\" is uninitialized and does not have a pointee. At this point \"empPtr\" is \"null\"" +
          "  in the same sense as discussed in Section 1.");
  av.step();
  av.umsg("As before, dereferencing such an uninitialized reference is common, but catastrophic error (it raises a" +
          "\"NullPointerException\"). This error will crash immediately, unless there is specific code to handle this exception.");
  av.step();
  pseudo.setCurrentLine(7);
  av.umsg("The call to new allocates a block of space in the heap. In this example, the program stores the pointer " +
          "to the block in the local variable empPtr. The block is the \"pointee\" and empPtr is its reference.");
  x1.hide();
  x2.hide();
  x3.hide();
  x4.hide();
  x5.hide();
  x6.hide();
  ptline.show();
  var heapRectangle = av.g.rect(xPositionHeapRectangles, yPositionLocal1, length1, width * 2, {"stroke-width": 2});
  var label1 = av.label("Sam", {top: yPositionLocal1 - 10, left: xPositionHeapRectangles + 40});
  var label2 = av.label("1000", {top: yPositionLocal1 + width/2 , left: xPositionHeapRectangles + 40});
  av.step();
  av.umsg("In this state, the pointer may be dereferenced safely to manipulate the pointee.");
  // Slide 5
  av.step();

  pseudo.setCurrentLine(9);
  av.umsg("Deallocateing heap block makes the pointer equals to null. This will let the garbage collection to know that " +
          "this object is unused and it must be cleared from the heap. ");
  heapRectangle.hide();
  label1.hide();
  label2.hide();
  ptline.css({stroke: "gray"});
  av.step();
  av.umsg("The programmer must remember not to use the pointer after the pointee has been deallocated " +
          "(this is why the pointer is shown in gray).");
  av.step();
  pseudo.setCurrentLine(11);
  av.umsg("When the function exits, its local variable empPtr will be automatically deallocated by the garbage collecter.");
  av.recorded();

});
