$(document).ready(function() {
  "use strict";
  var av_name = "PDACFLFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  var emptystring = String.fromCharCode(955);
  var grammar = "[[\"S\",\"→\",\"aSA\"],\
                    [\"S\",\"→\",\"aAA\"],\
                    [\"S\",\"→\",\"b\"],\
                    [\"A\",\"→\",\"bBBB\"],\
                    [\"B\",\"→\",\"b\"]]";
  var grammerArray = JSON.parse(grammar);
  var grammarMAtrix = new GrammarMatrix(av, grammerArray, {left: 0, top: 135, style: "table"});
  grammarMAtrix.hide();

  //Frame 1
  av.umsg("Now we will examine the relationship between NPDAs and CFLs. We will see that NPDAs can represent the class of CFLs.");
  av.displayInit();

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
  av.umsg("Theorem: For any CFL $L$ without $\\lambda$, $\\exists$ a NPDA $M$ such that $L = L(M)$.<br/>To prove that we need to find a method to convert the NPDA to a CFG.<br/>Given a ($\\lambda$ free) CFL $L$, there exists a CFG $G$ such that $L=L(G)$.<br/>We also know that there exists $G'$ in GNF, such that $L(G) = L(G').$<br/><br/>Before going into the details of the proof, let's seen an overview. The approach takes advantage of the special properties of GNF. Since every production starts with a terminal symbol, the LHS will be the value at the top of the stack, the terminal in the RHS will be the input letter, and the zero or more variables following the terminal in the RHS will be put onto the stack.<br/><br/>That should be pretty easy, and hopefully this gives you an idea of why GNF is useful!");
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("q13"));
  grammarMAtrix.show();
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q16"));
  var PDA = new av.ds.PDA({width: 300, height: 300, top: 200, left: 0, emptystring: lambda, editable: true});
  PDA.enableDragging();
  var q0 = PDA.newNode("q0", {left:20, top: 250});
  var q1 = PDA.newNode("q1", {left:150, top: 250});
  var qf = PDA.newNode("qf", {left:280, top: 250});
  toggleInitial(PDA, q0);
  toggleFinal(PDA, qf);
  PDA.layout();
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
  av.umsg("This is the resulting NPDA for the CFG.");
  PDA.addEdge(q1, qf,{weight: emptystring + ',z:' + 'z'});
  PDA.layout();

  av.step();

  //Frame 26
  av.umsg("Let us trace a string that is in $L(G)$ and show that the PDA will accept it.");
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
  var stack = new av.ds.array(["", "", "","","","Z"], {left: 400, top: 90, indexed: false, layout: "vertical"});
  var stackLabel = av.label("PDA Stack", {left:380, top: 280});
  var tape = new av.ds.array(["a", "b", "b", "b","b", "b"], {left: 80, top: 40, indexed: false});
  var tapeLabel = av.label("Input Tape", {left:0, top: 40});
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
