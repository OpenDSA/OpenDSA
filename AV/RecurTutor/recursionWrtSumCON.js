/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Four versions for writing sum recursively
$(document).ready(function() {
  "use strict";
  var av = new JSAV("recursionWrtSumCON");

  // Slide 1
  av.umsg("Here are a few variations on how to solve the sum problem recursively.");
  av.displayInit();
  av.step();

  // Slide 2
  av.umsg("Here is the first one.");
  var labela = av.label("First Version", {left: 30, top: 0});
  var pseudo = av.code({url: "../../../SourceCode/Java/RecurTutor/WrtSumV1.java",
                        lineNumbers: false, top: 25, left: 30});
  pseudo.highlight(3);
  pseudo.highlight(6);
  av.step();

  // Slide 3
  av.umsg("Some people like a more verbose style. Here each part explicitly sets the value for <code>result</code>, and it is returned at the end.");
  var labelb = av.label("Second Version", {left: 450, top: 0});
  var pseudo2 = av.code({url: "../../../SourceCode/Java/RecurTutor/WrtSumV2.java",
                         lineNumbers: false, top: 25, left:450});
  pseudo2.highlight(3);
  pseudo2.highlight(6);
  pseudo2.highlight(8);
  av.step();

  // Slide 4
  av.umsg("There is no real need to declare the variable <code>smallResult</code>. Declaring a local variable to store the result of the recursive call might help you in the beginning. First you get the solution to the smaller problem, and then you use that small solution to solve the bigger problem.");
  var labelc = av.label("Third Version", {left: 30, top: 225});
  var pseudo3 = av.code({url: "../../../SourceCode/Java/RecurTutor/WrtSumV3.java",
                         lineNumbers: false, top: 250 , left: 30});
  pseudo3.highlight(3);
  pseudo3.highlight(5);
  av.step();

  // Slide 5
  av.umsg("Once you gain more experience you won't need to use that intermediate variable.");
  av.step();

  // Slide 6
  av.umsg("You also do not need an <code>else</code> clause when the <code>if</code> ends in a <code>return</code> statement.");
  var labeld = av.label("Fourth Version", {left: 450, top: 225});

  var pseudo4 = av.code({url: "../../../SourceCode/Java/RecurTutor/WrtSumV4.java",
                         lineNumbers: false, left: 450, top: 250});
  pseudo4.highlight(3);
  pseudo4.highlight(5);
  av.recorded();
});
