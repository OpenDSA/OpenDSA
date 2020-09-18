$(document).ready(function() {
  "use strict";
  var av_name = "PDAEmptyStackAcceptanceFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;
  var url = "../../../AV/PIExample/PDA/machines/EmptyStack.jff";
  var PDA = new av.ds.PDA({width: 500, height: 200, left:-20, url: url});
  var q0 = PDA.getNodeWithValue("q0");
  var q1 = PDA.getNodeWithValue("q1");
  var q2 = PDA.getNodeWithValue("q2");
  var q3 = PDA.getNodeWithValue("q3");
  var q4 = PDA.getNodeWithValue("q4");
  PDA.hide();

  //Frame 1
  av.umsg("As we said before, PDAs have 2 different types of language acceptance.");
  av.displayInit();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  
  //Frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //Frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //Frame 8
  av.umsg(Frames.addQuestion("q8"));
  PDA.show();
  av.step();

  //Frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //Frame 10
  av.umsg(Frames.addQuestion("q10"));
  var tape = new av.ds.array(["a", "a", "b", "c","c","c"], {left: 80, top: 300, indexed: false});
  var tapeLabel = av.label("Input Tape", {left:0, top:305});
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("q11"));
  var stack = new av.ds.array(["", "", "","", "Z"], {left: 400, top: 300, indexed: false, layout: "vertical"});
  var stackLabel = av.label("PDA Stack", {left:400, top:450});
  tape.highlight(0);
  q0.highlight();
  av.step();

  //Frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("q13"));
  tape.unhighlight(0);
  q0.unhighlight();
  tape.highlight(1);
  q1.highlight();
  stack.value(3, "0");
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //Frame 15
  av.umsg(Frames.addQuestion("q15"));
  tape.unhighlight(1);
  tape.highlight(2);
  stack.value(2, "0");
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //Frame 17
  av.umsg(Frames.addQuestion("q17"));
  tape.unhighlight(2);
  q1.unhighlight();
  tape.highlight(3);
  q2.highlight();
  stack.value(1, "0");
  av.step();

  //Frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //Frame 19
  av.umsg(Frames.addQuestion("q19"));
  tape.unhighlight(3);
  q2.unhighlight();
  tape.highlight(4);
  q3.highlight();
  stack.value(1, "");
  av.step();

  //Frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //Frame 21
  av.umsg(Frames.addQuestion("q21"));
  tape.unhighlight(4);
  tape.highlight(5);
  stack.value(2, "");
  av.step();

  //Frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //Frame 23
  av.umsg(Frames.addQuestion("q23"));
  tape.unhighlight(5);
  stack.value(3, "");
  av.step();

  //Frame 24
  av.umsg(Frames.addQuestion("q24"));
  q3.unhighlight();
  q4.highlight();
  av.step();

  //Frame 25
  av.umsg(Frames.addQuestion("q25"));
  q4.addClass('accepted');
  tape.hide();
  tapeLabel.hide();
  q4.unhighlight();
  av.step();

  //Frame 26
  av.umsg(Frames.addQuestion("q26"));
  q0.highlight();
  q4.removeClass('accepted');
  var tape2 = new av.ds.array(["a", "a", "b", "c"], {left: 80, top: 300, indexed: false});
  tapeLabel.show();
  tape2.highlight(0);
  stack.show();
  av.step();

  //Frame 27
  av.umsg(Frames.addQuestion("q27"));
  
  av.step();

  //Frame 28
  av.umsg(Frames.addQuestion("q28"));
  tape2.unhighlight(0);
  q0.unhighlight();
  tape2.highlight(1);
  q1.highlight();
  stack.value(3, "0");
  av.step();

  //Frame 29
  av.umsg(Frames.addQuestion("q29"));
  
  av.step();

  //Frame 30
  av.umsg(Frames.addQuestion("q30"));
  tape2.unhighlight(1);
  tape2.highlight(2);
  stack.value(2, "0");
  av.step();

  //Frame 31
  av.umsg(Frames.addQuestion("q31"));
  
  av.step();

  //Frame 32
  av.umsg(Frames.addQuestion("q32"));
  tape2.unhighlight(2);
  q1.unhighlight();
  tape2.highlight(3);
  q2.highlight();
  stack.value(1, "0");
  av.step();

  //Frame 33
  av.umsg(Frames.addQuestion("q33"));
  
  av.step();

  //Frame 34
  av.umsg(Frames.addQuestion("q34"));
  tape2.unhighlight(3);
  q2.unhighlight();
  tape.highlight(4);
  q3.highlight();
  stack.value(1, "");
  av.step();

  //Frame 35
  av.umsg("Exactly. The PDA will reject the string because the stack is not empty.");
  q3.unhighlight();
  av.recorded();
});