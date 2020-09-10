$(document).ready(function() {
  "use strict";
  var av_name = "PDACFLFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;
  var emptystring = String.fromCharCode(955);
  var grammar = "[[\"S\",\"→\",\"aSA\"],\
                    [\"S\",\"→\",\"aAA\"],\
                    [\"S\",\"→\",\"b\"],\
                    [\"A\",\"→\",\"bBBB\"],\
                    [\"B\",\"→\",\"b\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammarMAtrix = new GrammarMatrix(av, grammerArray, {left: 0, top:150, style: "table"});
  grammarMAtrix.hide();

  //Frame 1
  av.umsg("Now we want to show that NPDA’s and CFG both represent CFL’s. Show that we can take any CFG and construct a NPDA and vice versa.");
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
  av.umsg("Theorem: For any CFL $L$ not containing $\\lambda$, $\\exists$ a NPDA $M$ such that $L=L(M)$.");
  av.step();

  //Frame 8
  av.umsg("Theorem: For any CFL $L$ not containing $\\lambda$, $\\exists$ a NPDA $M$ such that $L=L(M)$.<br/>To prove that we need to find a method to sketch the NPDA form a CFG.");
  av.step();

  //Frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //Frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //Frame 12
  av.umsg("Theorem: For any CFL $L$ not containing $\\lambda$, $\\exists$ a NPDA $M$ such that $L=L(M)$.<br/>To prove that we need to find a method to sketch the NPDA form a CFG.<br/>Given ($\\lambda$ free) CFL $L$, $\\exists$ CFG $G$ such that $L=L(G)$.<br/>$\\exists$ $G\\prime$ in GNF, such that $L(G) = L(G\\prime)$<br>Before going deep into the proof, the idea is that, since every production will be starting with a letter. The LHS will be the value of the top of the stack, the terminal in the RHS will be the input letter, and the Zero or more variables following the terminal will be the stack operation");
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("q13"));
  grammarMAtrix.show();
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  var PDA = new av.ds.PDA({width: 300, height: 300, top: 250, left: 0, emptystring: lambda, editable: true});
  PDA.enableDragging();
  var q0 = PDA.newNode("q0", {left:20, top: 250});
  var q1 = PDA.newNode("q1", {left:150, top: 250});
  var qf = PDA.newNode("qf", {left:280, top: 250});
  av.step();

  //Frame 15
  av.umsg(Frames.addQuestion("q15"));
  toggleInitial(PDA, q0);
  PDA.layout();
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  toggleFinal(PDA, qf);
  av.step();

  //Frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //Frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //Frame 19
  av.umsg(Frames.addQuestion("q19"));
  PDA.addEdge(q0, q1,{weight: emptystring + ',Z:' + 'SZ'});
  PDA.layout();

  grammarMAtrix.highlight(0);
  av.step();

  //Frame 20
  av.umsg(Frames.addQuestion("q20"));
  PDA.addEdge(q1, q1,{weight: 'a' + ',S:' + 'SA'});
  PDA.layout();

  grammarMAtrix.unhighlight(0);
  grammarMAtrix.highlight(1);
  av.step();

  //Frame 21
  av.umsg(Frames.addQuestion("q21"));
  PDA.addEdge(q1, q1,{weight: 'a' + ',S:' + 'AA'});
  PDA.layout();

  grammarMAtrix.unhighlight(1);
  grammarMAtrix.highlight(2);
  av.step();

  //Frame 22
  av.umsg(Frames.addQuestion("q22"));
  PDA.addEdge(q1, q1,{weight: 'b' + ',S:' + emptystring});
  PDA.layout();

  grammarMAtrix.unhighlight(2);
  grammarMAtrix.highlight(3);
  av.step();

  //Frame 23
  av.umsg(Frames.addQuestion("q23"));
  PDA.addEdge(q1, q1,{weight: 'b' + ',A:' + 'BBB'});
  PDA.layout();

  grammarMAtrix.unhighlight(3);
  grammarMAtrix.highlight(4);
  av.step();

  //Frame 24
  av.umsg(Frames.addQuestion("q24"));
  PDA.addEdge(q1, q1,{weight: 'b' + ',B:' + emptystring});
  PDA.layout();

  grammarMAtrix.unhighlight(4);
  av.step();

  //Frame 25
  av.umsg("This is the resulting NFA for the CFG.");
  PDA.addEdge(q1, qf,{weight: emptystring + ',z:' + 'z'});
  PDA.layout();

  av.step();

  //Frame 26
  av.umsg("Let us trace a string that is in $L(G)$ and show that the PDA will accept it. Of course, showing that a string in $L(G)$ is accepted by the PDA, but we need to see how the PDA will accept the string");
  av.step();

  //Frame 27
  av.umsg(Frames.addQuestion("q27"));
  av.step();

  //Frame 28
  av.umsg(Frames.addQuestion("q28"));
  av.step();
  //Frame 29
  av.umsg(Frames.addQuestion("q29"));
  av.step();

  //Frame 30
  av.umsg(Frames.addQuestion("q30"));
  av.step();

  //Frame 31
  av.umsg(Frames.addQuestion("q31"));
  av.step();

  //Frame 32
  av.umsg(Frames.addQuestion("q32"));
  av.step();

  //Frame 33
  av.umsg(Frames.addQuestion("q33"));
  av.step();

  //Frame 34
  av.umsg(Frames.addQuestion("q34"));
  var stack = new av.ds.array(["", "", "","","","Z"], {left: 400, top: 400, indexed: false, layout: "vertical"});
  var stackLabel = av.label("PDA Stack", {left:400, top:600});
  var tape = new av.ds.array(["a", "b", "b", "b","b", "b"], {left: 80, top: 350, indexed: false});
  var tapeLabel = av.label("Input Tape", {left:0, top:355});
  q0.highlight();
  av.step();

  //Frame 35
  av.umsg(Frames.addQuestion("q35"));
  stack.value(4, "S");
  q0.unhighlight();
  q1.highlight();
  tape.highlight(0);
  av.step();

  //Frame 36
  av.umsg(Frames.addQuestion("q36"));
  stack.value(4, "A");
  stack.value(3, "S");
  tape.unhighlight(0);
  tape.highlight(1);
  av.step();

  //Frame 37
  av.umsg(Frames.addQuestion("q37"));
  stack.value(3, "");
  tape.unhighlight(1);
  tape.highlight(2);
  av.step();

  //Frame 38
  av.umsg(Frames.addQuestion("q38"));
  stack.value(4, "B");
  stack.value(3, "B");
  stack.value(2, "B");
  tape.unhighlight(2);
  tape.highlight(3);
  av.step();

  //Frame 39
  av.umsg(Frames.addQuestion("q39"));
  stack.value(2, "");
  tape.unhighlight(3);
  tape.highlight(4);
  av.step();

  //Frame 40
  av.umsg(Frames.addQuestion("q40"));
  stack.value(3, "");
  tape.unhighlight(4);
  tape.highlight(5);
  av.step();

  //Frame 41
  av.umsg(Frames.addQuestion("q41"));
  stack.value(4, "");
  tape.unhighlight(5);
  av.step();

  //Frame 42
  av.umsg("The string is also accepted by the NPDA");
  stack.hide();
  stackLabel.hide();
  tape.hide();
  tapeLabel.hide();
  q1.unhighlight();
  qf.highlight();
  av.recorded();
});