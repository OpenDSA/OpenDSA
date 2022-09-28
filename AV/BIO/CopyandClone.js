/*global ODSA */
// Written by Jun Yang and Cliff Shaffer
// Show off the data members
$(document).ready(function() {
    "use strict";
    var av_name = "CopyandClone";
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter,       // get the interpreter
        code = config.code;                   // get the code object
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]);
  
    //variables for making rectangles
    var width = 40;
    var length = 80;
    var xPosRect = 30;
    var yPosRect = 30;
  
    //arrow variables
    var shallowCopyEmployeeArrow = av.g.line(125, 175, xPosRect + 60, yPosRect + 48,
              {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    var secondEmployeeArrow = av.g.line(xPosRect + 670, yPosRect + 45, xPosRect + 692, yPosRect,
              {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    var deepCopyEmployee = av.g.line(xPosRect + 670, yPosRect + 45 + 107, xPosRect + 692, yPosRect + 107,
             {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    var line = av.g.line(50, 110, xPosRect + 25, yPosRect + 48,
             {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    line.hide();
  
    //Slide 1
    av.umsg("Let's look at an example to see the difference between shallow and deep copying.");
    shallowCopyEmployeeArrow.hide();
    secondEmployeeArrow.hide();
    deepCopyEmployee.hide();
    av.step();
    
    // Slide 2
    av.displayInit();
    av.umsg("First let's create an list A[] with name field ziad,50. This is referenced by <tt>firstEmployee</tt>.");
    pseudo.highlight(1);
    var sam = av.label("ziad,50", {top: 25, left: 50});
    sam.show();
    av.g.rect(xPosRect, yPosRect, length, width);
    av.label("list1", {top: 100, left: 10});
    line.show();
    av.step();
  
    // Slide 3
    av.umsg("Then let's 'shallow copy' by creating a new list named <tt>B</tt>, and making it also reference the same <tt>A</tt> list that <tt>A</tt> references.");
    pseudo.unhighlight(1);
    pseudo.highlight(2);
    av.label("B", {top: 165, left: 21});
    shallowCopyEmployeeArrow.show();
    av.step();
  
    // Slide 4
    av.umsg("Now, update the Employee object's name as \"Amr\", which shallowCopyEmployee is pointing to.");
    
    pseudo.unhighlight(2);
    pseudo.highlight(3);
    sam.hide();
    var Amr = av.label("Amr", {top: 25, left: 50});
    Amr.show();
    av.step();
  
    // Slide 4
    av.umsg("If you print out the name of list A, you will see that the name of list is now Amr, 50  not ziad, 50.");
    pseudo.unhighlight(3);
    pseudo.highlight(4);
    av.step();
  
    // Slide 5
    av.umsg("Now, let's create another list object, referneced by X. Set the name of this list to be  Omar,200.");
    pseudo.unhighlight(4);
    pseudo.highlight(5);
    av.g.rect(xPosRect + 700, yPosRect - 27, length, width);
    secondEmployeeArrow.show();
    av.label("Omar,200", {top: 0, left: 746});
    av.label("X", {top: 57, left: 700});
    av.step();

    //Slide 6
    pseudo.unhighlight(5);
    av.umsg("Then we create another <tt>list</tt> object, referenced by <tt>Y</tt>.");
    pseudo.highlight(6);
    av.g.rect(xPosRect + 700, yPosRect + 80, length, width);
    deepCopyEmployee.show();
    av.label("Y", {top: 58 + 107, left: 695});
    av.step();
  
    // Slide 7
    av.umsg("After that, copy the name of the list object referenced by X and set that name into the object referenced by Y. So you deep-copied the contents of <tt>X</tt>'s object.");
    var pat = av.label("Omar,200", {top: 107, left: 746});
    pat.show();
    av.step();
  
    // Slide 8
    av.umsg("Now, let's set the name of the list [0]object referenced by <tt>Y</tt> to 'Zain'.");
    pseudo.unhighlight(6);
    pseudo.highlight(7);
    pat.hide();
    av.label("Zain,200", {top: 107, left: 746});
    av.step();
  
    // Slide 9
    av.umsg("Finally, if you print the name of <tt>X[0]</tt>, it is still 'Omar'. Changing <tt>Y</tt>'s name did not affect <tt>X</tt>'s name.");
    pseudo.unhighlight(7);
    pseudo.highlight(8);
    av.recorded();
    //av.label("Prints: \"Patrice\"", {top: 185, left: 700});

  });
  
  