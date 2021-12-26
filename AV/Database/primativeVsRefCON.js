/*global JSAV, document */
// Written by Cliff Shaffer
// Based on earlier material written by Sushma Mandava and Milen John
// variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "primativeVsRefCON";
  var av = new JSAV(av_name);
  var xPosition = 150;
  var yPositionR1 = 15;
  var yPositionR2 = 115;
  var length1 = 100;
  var width = 30;
  var pointerArrow = av.g.line(xPosition + 180, yPositionR1 + 3,
                               xPosition + 300, yPositionR1 + 3,  
                               {"arrow-end": "classic-wide-long",
                                opacity: 100, "stroke-width": 2});
  pointerArrow.hide();

  // Slide 1
  av.umsg("Simple <tt>int</tt> and <tt>float</tt> variables operate pretty intuitively. They are like a box that can store a single value such as 42 or 50.0. Visually, a simple variable can be viewed as a box with its current value shown inside.");
  var int = av.label('<tt>intnum</tt>', {top: -10, left: 160})
  var num = av.label('<tt>50</tt>', {top: -10, left: 255}); 
  var double = av.label('<tt>floatnum</tt>', {top: -10, left: 405}) 
  var doubleNum = av.label('<tt>50.0</tt>', {top: -10, left: 510})
  var rect = av.g.rect(xPosition + 70, yPositionR1 - 13, length1, width);
  var rect1 = av.g.rect(xPosition + 330, yPositionR1 - 13, length1, width);
  av.step();
  av.displayInit();

  // Slide 2
  av.umsg("These data types are called primitive data types because they don't need a reference.");
  av.step()
  
  // Slide 3
  av.umsg("A reference variable works a little differently. It does not store a simple value directly. Instead, a reference variable stores a <span style='color:red;'>reference</span> to some <span style='color:red;'>object</span>. The object that the reference refers to is sometimes known as its <span style='color:red;'>pointee</span>");
  int.hide();
  num.hide();
  double.hide();
  doubleNum.hide();
  rect.hide();
  rect1.hide();
  av.step();

  // Slide 4
  av.umsg("The reference variable (here called <tt>empRef</tt>) is shown as a box that contains the beginning of a directed line, which leads to its pointee (an <tt>Employee</tt> object, shown as the box storing two fields: the string value 'John' and the integer value '1000').");
  pointerArrow.show();
  var int = av.label('<tt>empRef</tt>', {top: -10, left: 190})
  av.g.rect(xPosition + 100, yPositionR1 - 13, length1, width);
  av.g.rect(xPosition + 300, yPositionR1 - 13, length1, width+12);
  av.label('<tt>John</tt>', {top: -10, left: 485}); 
  av.label('<tt>1000</tt>', {top: 5, left: 485}); 
  av.step();

  // Slide 5
  av.umsg("So <tt>empRef</tt> is the reference and the <tt>Employee</tt> object is its pointee.");
  av.step();

  // Slide 6
  av.umsg("What is stored inside of <tt>empRef</tt>? Its value is <b>not</b> an <tt>Employee</tt> object. Its value is only a reference to an <tt>Employee</tt> object. We show that here using the arrow.");

  av.recorded();
});
