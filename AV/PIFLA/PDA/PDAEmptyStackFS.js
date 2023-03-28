$(document).ready(function() {
  "use strict";
  var av_name = "PDAEmptyStackFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  var url = "../../../AV/OpenFLAP/machines/PDA/EmptyStack.jff";
  var PDA = new av.ds.PDA({width: 500, height: 200, left:-20, url: url});
  var q0 = PDA.getNodeWithValue("q0");
  var q1 = PDA.getNodeWithValue("q1");
  var q2 = PDA.getNodeWithValue("q2");
  var q3 = PDA.getNodeWithValue("q3");
  var q4 = PDA.getNodeWithValue("q4");
  PDA.hide();

  // Frame 1
  av.umsg("PDAs, like DFAs and NFAs, can accept a string based on being in a final state once the string has been processed. Unsurprisingly, this is referred to as Final State acceptance, and it ignores the contents of the stack when it makes the decision about whether to accept. However, there is a second type of acceptance that PDAs might use. We will call this Empty Stack acceptance.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("different"));
  av.step();
  
  // Frame 3
  av.umsg(Frames.addQuestion("p"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("pfinal"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("w"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("Z"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("language"));
  PDA.show();
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("aabccc"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("a1machine"));
  var tape = new av.ds.array(["a", "a", "b", "c","c","c"], {left: 80, top: 150, indexed: false});
  var tapeLabel = av.label("Input Tape", {left:0, top:155});
  var stack = new av.ds.array(["", "", "","", "Z"], {left: 400, top: 150, indexed: false, layout: "vertical"});
  var stackLabel = av.label("PDA Stack", {left: 380, top: 300});
  tape.highlight(0);
  q0.highlight();
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("a1stack"));
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("a2machine"));
  tape.unhighlight(0);
  q0.unhighlight();
  tape.highlight(1);
  q1.highlight();
  stack.value(3, "0");
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("a2stack"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("b1machine"));
  tape.unhighlight(1);
  tape.highlight(2);
  stack.value(2, "0");
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("b1stack"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("c1machine"));
  tape.unhighlight(2);
  q1.unhighlight();
  tape.highlight(3);
  q2.highlight();
  stack.value(1, "0");
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("c1stack"));
  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("c2machine"));
  tape.unhighlight(3);
  q2.unhighlight();
  tape.highlight(4);
  q3.highlight();
  stack.value(1, "");
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("c2stack"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("c3machine"));
  tape.unhighlight(4);
  tape.highlight(5);
  stack.value(2, "");
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("c3stack"));
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("aabcccend"));
  tape.unhighlight(5);
  stack.value(3, "");
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("aabcccstack"));
  q3.unhighlight();
  q4.highlight();
  av.step();

  // Frame 23
  av.umsg(Frames.addQuestion("accept"));
  stack.value(4, "");
  av.step();

  // Frame 24
  av.umsg("The string $aabccc$ is accepted by the PDA using Empty Stack acceptance.<br/><br/>Now let's see another example. What happens when the input is $aabc$?");
  q4.unhighlight();
  q4.addClass('accepted');
  av.step();

  // Frame 25
  av.umsg(Frames.addQuestion("aabcaccept"));
  tape.hide();
  tapeLabel.hide();
  q4.removeClass('accepted');
  av.step();

  // Frame 26
  av.umsg(Frames.addQuestion("aabca1machine"));
  q0.highlight();
  var tape2 = new av.ds.array(["a", "a", "b", "c"], {left: 80, top: 150, indexed: false});
  tapeLabel.show();
  tape2.highlight(0);
  stack.value(4, "Z");
  stack.show();
  av.step();

  // Frame 27
  av.umsg(Frames.addQuestion("aabca1stack"));
  av.step();

  // Frame 28
  av.umsg(Frames.addQuestion("aabca2machine"));
  tape2.unhighlight(0);
  q0.unhighlight();
  tape2.highlight(1);
  q1.highlight();
  stack.value(3, "0");
  av.step();

  // Frame 29
  av.umsg(Frames.addQuestion("aabca2stack"));
  av.step();

  // Frame 30
  av.umsg(Frames.addQuestion("aabcb1machine"));
  tape2.unhighlight(1);
  tape2.highlight(2);
  stack.value(2, "0");
  av.step();

  // Frame 31
  av.umsg(Frames.addQuestion("aabcb1stack"));
  av.step();

  // Frame 32
  av.umsg(Frames.addQuestion("aabcc1machine"));
  tape2.unhighlight(2);
  q1.unhighlight();
  tape2.highlight(3);
  q2.highlight();
  stack.value(1, "0");
  av.step();

  // Frame 33
  av.umsg(Frames.addQuestion("aabcc1stack"));
  av.step();

  // Frame 34
  av.umsg(Frames.addQuestion("reject"));
  tape2.unhighlight(3);
  q2.unhighlight();
  tape.highlight(4);
  q3.highlight();
  stack.value(1, "");
  av.step();

  // Frame 35
  av.umsg("The PDA rejects this string.");
  q3.unhighlight();
  q3.addClass("rejected");
  av.step();

  // Frame 36
  av.umsg("Congratulations! Frameset completed.");
  PDA.hide();
  stack.hide();
  tape2.hide();
  tapeLabel.hide();
  stackLabel.hide();
  av.recorded();
});
