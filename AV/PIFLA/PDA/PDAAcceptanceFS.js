$(document).ready(function() {
  "use strict";
  var av_name = "PDAAcceptanceFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("A DFA or NFA accepts a string if and only if it is in a final state when it completes processing the string. A given PDA might use one of two different definitions for string acceptance. A PDA might operate under the defintion that it accepts a string if and only if it is in a final state after completing processing the string, like a DFA or NFA. The other definition is that the stack is empty when the string has been processed.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("gamma"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("Z"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("p"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("lambda"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("stack"));
  av.step();
  
  // Frame 7
  av.umsg(Frames.addQuestion("irrelevant"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("language"));
  var url = "../../../AV/OpenFLAP/machines/PDA/PDAExample1.jff";
  var PDA = new av.ds.PDA({width: 500, top: 20, height: 200, left: 0, url: url});
  var q0 = PDA.getNodeWithValue("q0");
  var q1 = PDA.getNodeWithValue("q1");
  var q2 = PDA.getNodeWithValue("q2");
  var q3 = PDA.getNodeWithValue("q3");
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("aaabbb"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("memory"));
  var tape = new av.ds.array(["a", "a", "a", "b","b","b"], {left: 80, top: 150, indexed: false});
  var tapeLabel = av.label("Input Tape", {left: 0, top: 155});
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("a1machine"));
  var stack = new av.ds.array(["", "", "","", "Z"], {left: 400, top: 150, indexed: false, layout: "vertical"});
  var stackLabel = av.label("PDA Stack", {left: 400, top: 300});
  tape.highlight(0);
  q0.highlight();
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("a1stack"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("a2machine"));
  tape.unhighlight(0);
  q0.unhighlight();
  tape.highlight(1);
  q1.highlight();
  stack.value(3, "a");
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("a2stack"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("a3machine"));
  tape.unhighlight(1);
  tape.highlight(2);
  stack.value(2, "a");
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("a3stack"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("b1machine"));
  stack.value(1, "a");
  tape.unhighlight(2);
  tape.highlight(3);
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("b1stack"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("b2machine"));
  stack.value(1, "");
  q1.unhighlight();
  q2.highlight();
  tape.unhighlight(3);
  tape.highlight(4);
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("b2stack"));
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("b3machine"));
  stack.value(2, "");
  tape.unhighlight(4);
  tape.highlight(5);
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("b3stack"));
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("emptystring"));
  stack.value(3, "");
  tape.unhighlight(5);
  av.step();

  // Frame 24
  av.umsg(Frames.addQuestion("emptystack"));
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("final"));
  stack.hide();
  stackLabel.hide();
  q3.highlight();
  q2.unhighlight();
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("ignorestack"));
  q3.addClass('accepted');
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("reject"));
  tape.hide();
  q3.unhighlight();
  q3.removeClass('accepted');
  var tape2 = new av.ds.array(["a", "b", "a", "b"], {left: 80, top: 150, indexed: false});
  av.step();

  // Frame 28
  av.umsg(Frames.addQuestion("ababa1machine"));
  q0.highlight();
  tape2.highlight(0);
  stack.show();
  stackLabel.show();
  av.step();

  // Frame 29
  av.umsg(Frames.addQuestion("ababa1stack"));
  av.step();

  // Frame 30
  av.umsg(Frames.addQuestion("ababb1machine"));
  tape2.unhighlight(0);
  tape2.highlight(1);
  q0.unhighlight();
  q1.highlight();
  stack.value(3, "a");
  av.step();

  // Frame 31
  av.umsg(Frames.addQuestion("ababb1stack"));
  q1.unhighlight();
  q2.highlight();
  av.step();

  // Frame 32
  av.umsg(Frames.addQuestion("ababa2machine"));
  stack.value(3, "");
  tape2.unhighlight(1);
  tape2.highlight(2);
  av.step();

  // Frame 33
  av.umsg(Frames.addQuestion("hang"));
  av.step();

  // Frame 34
  av.umsg("So we see that this PDA can properly reject strings.");
  q2.unhighlight();
  q3.addClass('rejected');
  av.step();

  // Frame 35
  av.umsg("Congratulations! Frameset completed.");
  stack.hide();
  PDA.hide();
  stackLabel.hide();
  tape2.hide();
  tapeLabel.hide();
  av.recorded();
});
