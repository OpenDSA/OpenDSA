$(document).ready(function() {
  "use strict";
  var av_name = "PDAAcceptanceFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;
  
  //Frame 1
  av.umsg("PDAs have 2 different types of language acceptance.");
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
  av.step();

  //Frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //Frame 10
  av.umsg(Frames.addQuestion("q10"));
  var url = "../../../AV/PIExample/PDA/machines/PDAExample1.jff";
  var PDA = new av.ds.PDA({width: 500, height: 200, left:-20, url: url});
  var q0 = PDA.getNodeWithValue("q0");
  var q1 = PDA.getNodeWithValue("q1");
  var q2 = PDA.getNodeWithValue("q2");
  var q3 = PDA.getNodeWithValue("q3");
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //Frame 12
  av.umsg(Frames.addQuestion("q12"));
  var tape = new av.ds.array(["a", "a", "a", "b","b","b"], {left: 80, top: 300, indexed: false});
  var tapeLabel = av.label("Input Tape", {left:0, top:305});
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("q13"));
  var stack = new av.ds.array(["", "", "","", "Z"], {left: 400, top: 300, indexed: false, layout: "vertical"});
  var stackLabel = av.label("PDA Stack", {left:400, top:450});
  tape.highlight(0);
  q0.highlight();
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //Frame 15
  av.umsg(Frames.addQuestion("q15"));
  tape.unhighlight(0);
  q0.unhighlight();
  tape.highlight(1);
  q1.highlight();
  stack.value(3, "a");
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //Frame 17
  av.umsg(Frames.addQuestion("q17"));
  tape.unhighlight(1);
  tape.highlight(2);
  stack.value(2, "a");
  av.step();

  //Frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //Frame 19
  av.umsg(Frames.addQuestion("q19"));
  stack.value(1, "a");
  tape.unhighlight(2);
  tape.highlight(3);
  av.step();

  //Frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //Frame 21
  av.umsg(Frames.addQuestion("q21"));
  stack.value(1, "");
  q1.unhighlight();
  q2.highlight();
  tape.unhighlight(3);
  tape.highlight(4);
  av.step();

  //Frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //Frame 23
  av.umsg(Frames.addQuestion("q23"));
  stack.value(2, "");
  tape.unhighlight(4);
  tape.highlight(5);
  av.step();

  //Frame 24
  av.umsg(Frames.addQuestion("q24"));
  av.step();

  //Frame 25
  av.umsg(Frames.addQuestion("q25"));
  stack.value(3, "");
  tape.unhighlight(5);
  av.step();

  //Frame 26
  av.umsg(Frames.addQuestion("q26"));
  av.step();

  //Frame 27
  av.umsg(Frames.addQuestion("q27"));
  stack.hide();
  stackLabel.hide();
  q3.highlight();
  q2.unhighlight();
  av.step();

  //Frame 28
  av.umsg(Frames.addQuestion("q28"));
  q3.addClass('accepted');
  av.step();

  //Frame 29
  av.umsg(Frames.addQuestion("q28"));
  tape.hide();
  q3.unhighlight();
  
  av.step();

  //Frame 30
  av.umsg(Frames.addQuestion("q30"));
  q0.highlight();
  q3.removeClass('accepted');
  var tape2 = new av.ds.array(["a", "b", "a", "b"], {left: 80, top: 300, indexed: false});
  tape2.highlight(0);
  stack.show();
  stackLabel.show();
  av.step();

  //Frame 31
  av.umsg(Frames.addQuestion("q31"));
  av.step();

  //Frame 32
  av.umsg(Frames.addQuestion("q32"));
  tape2.unhighlight(0);
  tape2.highlight(1);
  q0.unhighlight();
  q1.highlight();
  stack.value(3, "a");
  av.step();

  //Frame 33
  av.umsg(Frames.addQuestion("q33"));
  av.step();

  //Frame 34
  av.umsg(Frames.addQuestion("q34"));
  stack.value(3, "");
  tape2.unhighlight(1);
  tape2.highlight(2);
  av.step();

  //Frame 35
  av.umsg(Frames.addQuestion("q35"));
  av.step();

  //Frame 36
  av.umsg("Exactly. The PDA will reject the string.");
  q3.addClass('rejected');
  stack.hide();
  av.step();
  
  //Frame 37
  av.umsg("In the next module, we will see the second type of PDA acceptance models.");
  PDA.hide();
  stackLabel.hide();
  tape2.hide();
  tapeLabel.hide();
  av.recorded();
});