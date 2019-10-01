//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes1CON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      code = config.code;             // get the code object
  var pseudo = av.code(code[0]);
  pseudo.hide();
  var linkedListStartPositionX = 350,
      linkedListStartPositionY = 40;
  var arr = av.ds.array([], {left: linkedListStartPositionX + 410, top: linkedListStartPositionY, visible: false});

  // Slide 1
  av.umsg("We'll start with the following four <tt>Link</tt> objects, already connected together, and the first one pointed to by reference variable <tt>head</tt>. By the way, notice that we use a slash through a <tt>Next</tt> field to represent <tt>null</tt>, in the last <tt>Link</tt> here.");
  var list = av.ds.list({left: linkedListStartPositionX, top: linkedListStartPositionY});
  list.addLast(20).addLast(30).addLast(10).addLast(5);
  av.pointer("head", list.get(0), {anchor: "center bottom", myAnchor: "right top",
                                   top: 0, left: -35, arrowAnchor: "center bottom"});
  list.layout();
  av.displayInit();

  // Slide 2
  av.umsg("Now let's see some code to do simple manipulations. This first line declares a new <tt>Link</tt> reference, that points to the same <tt>Link</tt> object already pointed to by <tt>head</tt>.");
  pseudo.show();
  pseudo.setCurrentLine(1);
  av.pointer("p", list.get(0));
  av.step();

  // Slide 3
  av.umsg("The second line declares another <tt>Link</tt> reference that references to the same thing that <tt>head</tt>'s next field points to.");
  pseudo.setCurrentLine(2);
  av.pointer("q", list.get(1));
  av.step();

  // Slide 4
  av.umsg("The third line declares a <tt>Link</tt> reference that references to what <tt>q</tt>'s next field points to.");
  pseudo.setCurrentLine(3);
  av.pointer("r", list.get(2));
  av.step();

  // Slide 5
  av.umsg("Assuming that each of these <tt>Link</tt> objects references an <tt>Integer</tt> object in their <tt>Data</tt> fields, we can retrieve the value of some <tt>Link</tt> object as shown in the fourth line.");
  pseudo.setCurrentLine(4);
  av.label("myVal", {left: linkedListStartPositionX + 360,
                     top: linkedListStartPositionY + 5});
  arr.show();
  av.effects.copyValue(list.get(1), arr, 0);
  av.recorded();
});
