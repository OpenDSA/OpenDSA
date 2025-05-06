//Written by Nabanita Maji and Cliff Shaffer, Spring 2015
/*global ODSA */
$(document).ready(function () {
  "use strict";
  var av_name = "circuitSATtoSATCON";

  $(".avcontainer").on("jsav-message" ,  function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]);
  });
  $(".avcontainer").on("jsav-updatecounter" ,  function(){
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset" , MathJax.Hub]); });

  var av = new JSAV(av_name);

  var x,y,r; var gatelabel = new Array(7);
  var label1, label2, label3, label4, label5, label6, label7, label8,label9,label10;

  // Slide 1
  av.umsg("<br><b>Reduction of Circuit SAT to SAT </b>");
  label1 = av.label("This slideshow presents how to reduce an input instance "+
                    " to the Circuit-SAT problem to an equivalent instance to the SAT problem in polynomial time."
                    +"<br><br>We start by giving some background."
                    ,{top:0});
  av.displayInit();
  av.step();

  // Slide 2
  label1.hide();
  var board = newCircuit();
  av.umsg("<br><b>Background</b>");
  label1 = av.label("The reduction shown in this slideshow relies heavily on the following identity:<br><br> 'If and only if' (denoted by $\\leftrightarrow$) is a "+
                    "boolean operator that follows the following truth table. <br><br>Let C = "
                    +"A $\\leftrightarrow$ B",{left:0,top:-10});

  var data = [["A","B","C"],
              ["T","T","T"],
              ["T","F","F"],
              ["F","T","F"],
              ["F","F","T"] ];

  var table1 = new av.ds.matrix(data,{style:"table",left:20,top:130});

  for(var i=0;i<3;i++)
    table1.addClass(0,i,"headerrow");


  label2 = av.label("A$\\leftrightarrow$B is equivalent to $(\\overline{A} + B)\\cdot"+
                    "(A + \\overline{B}) \\cdots\\cdots$ <b>Identity 1</b>.<br/><br>Check each line of the truth table to convince yourself that this is true.",{left:200,top:160});
  av.step();

  // Slide 3
  label1.hide(); label2.hide();table1.hide();
  label1=av.label("We will also use the following laws of boolean logic.", {top:-10});

  label2 = av.label("<b> Distributive Law</b>",{left:10,top:60});
  label3 = av.label("$A\\cdot (B + C) = A\\cdot B + A\\cdot C$",{left:40,top:80});
  label4 = av.label("$ A + B\\cdot C = (A+B)\\cdot (A+C)$",{left:40,top:100});
  label5 = av.label("<b> DeMorgan's Law</b>",{left:10,top:140});
  label6 = av.label("$ \\overline{A \\cdot B} = \\overline{A} + \\overline{B}$",{left:40,top:165});
  label7 = av.label("$ \\overline{A + B} = \\overline{A}\\cdot\\overline{B}$",{left:40,top:185});
  av.step();

  // Slide 4
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();

  av.umsg("<br><b>Reduction of Circuit-Satisfiability to SAT</b>");
  label1=av.label("Our reduction takes the following steps:" +
                  "<br><br>1. Assign a variable $x_i$ for each input signal of a circuit." +
                  "<br><br>2. Assign a variable (say $x_o$) for each output wire of a gate."
                  +"<br><br>3. Set up an 'if and only if' formula for each gate."
                  +" <br>&nbsp;&nbsp;&nbsp;&nbsp;(Recall from an earlier slide: 'If and only if' can be expressed as a conjuntion of clauses.)"
                  +"<br>&nbsp;&nbsp;&nbsp;&nbsp;Let ${\\phi}_k$ be the formula for "+
                  "the $k$<sup>th</sup> gate."+
                  "<br><br>4. Let $x_O$ be the final output wire of the "+
                  "circuit."+
                  "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;The CNF formula is " +
                  "$x_{o,f} \\cdot {\\phi}_1 \\cdot {\\phi}_2 \\cdots$ ",{left:0,top:-10});
  av.step();

  // Slide 5
  label1.hide();
  av.umsg("<br><b>Reduction for a NOT gate</b>");
  var notgate=board.addGate(av,"not",400,50,30);
  notgate.addClass("gatefocus");

  label1 = av.label("x1",{left:350,top:10});
  label2 = av.label("x2",{left:450,top:10});
  av.step();

  // Slide 6
  label3 = av.label("The reduced CNF formula: $\\phi$  = ($x_2 \\leftrightarrow"
                    +"\\overline{x_1}$)",{left:50,top:100});
  av.step();

  // Slide 7
  label7 = av.label(" = $(\\overline{x_2} + \\overline{x_1})\\cdot(x_2 + \\overline{\\overline{x_1}})$"
                    +" [Using Identity 1 (refer to slide 2)]",{left:240,top:130});
  label4 = av.label(" = $(\\overline{x_1} + \\overline{x_2})\\cdot(x_1 + x_2)$" +
                    " which is a conjunction of clauses.",{left:240,top:160});
  av.step();

  // Slide 8
  label5 = av.label("Note: Since $x_2$ is the output of NOT on $x_1$,"
                    +" $(x_2 \\leftrightarrow \\overline{x_1})$ (i.e. $\\phi$) is always True.",
                    {left:100,top:200});
  av.step();

  // Slide 9
  label6 = av.label("<b>A NOT gate can be reduced to a CNF formula in "+
                    "polynomial time</b>", {left: 100, top: 300});
  av.step();

  // Slide 10
  board.hide(notgate);
  label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
  label6.hide();label7.hide();
  av.umsg("<br><b>Reduction for an AND gate</b>");
  var andgate=board.addGate(av,"and",400,50,30);
  andgate.addClass("gatefocus");

  label1 = av.label("x1",{left:335,top:7});
  label2 = av.label("x2",{left:335,top:38});
  label3 = av.label("x3",{left:450,top:22});
  av.step();

  // Slide 11
  label4 = av.label("The reduced CNF formula $\\phi$  = ($x_3 \\leftrightarrow$"
                    +"$x_1 \\cdot x_2$)",{left:50,top:100});
  av.step();

  // Slide 12
  label5 = av.label(" = $( x_3 + \\overline{x_1 \\cdot x_2} )\\cdot(\\overline{x_3} + "+
                    "x_1 \\cdot x_2)$  &nbsp;&nbsp;[Using Identity 1]",{left:240,top:130});
  label8 = av.label(" = $(x_3 + \\overline{x_1} + \\overline{x_2})"+
                    "\\cdot(\\overline{x_3} + x_1 \\cdot x_2)$  &nbsp;&nbsp;[Using De Morgan's Law]",{left:240,top:160});
  label6 = av.label(" = $(\\overline{x_1} + \\overline{x_2} + x_3  )\\cdot"+
                    "(\\overline{x_3} + x_1)\\cdot(\\overline{x_3} + x_2)$ &nbsp;&nbsp;[Using Distributive Law]"+
                    "<br><br>&nbsp;&nbsp;&nbsp; which is a conjunction of clauses."
                    ,{left:240,top:190});
  av.step();

  // Slide 13
  label7 = av.label("Note: &nbsp; Since $x_3$ is the output of AND on $x_1$"
                    +" and $x_2$, $(x_3 \\leftrightarrow x_1\\cdot x_2)$ (i.e. $\\phi$) is always True."
                    ,{left:100,top:280});
  av.step();

  // Slide 14
  label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
  label6.hide(); label7.hide();label8.hide();
  av.umsg("<br><b>Reduction for an AND gate with 3 inputs.</b>");
  andgate["input"][1].show();

  label1 = av.label("x1",{left:335,top:7});
  label2 = av.label("x2",{left:335,top:22});
  label3 = av.label("x3",{left:335,top:38});
  label4 = av.label("x4",{left:450,top:22});
  av.step();

  // Slide 15
  label5 = av.label("The reduced CNF formula $\\phi$  = ($x_4 \\leftrightarrow$"
                    +"$x_1 \\cdot x_2 \\cdot x_3$)",{left:50,top:100});
  av.step();

  // Slide 16
  label6 = av.label(" = $(x_4 + \\overline{x_1\\cdot x_2\\cdot x_3})\\cdot(\\overline{x_4}+"
                    +"x_1\\cdot x_2\\cdot x_3)$ &nbsp;&nbsp;[Using Identity 1]",{left:240,top:130});
  label10 = av.label(" = $(x_4 + \\overline{x_1} + \\overline{x_2}+ "+
                     "\\overline{x_3})\\cdot(\\overline{x_4}+x_1\\cdot x_2\\cdot x_3)$"
                     +" &nbsp;&nbsp;[Using De Morgan's Law]",{left:240,top:160});
  label7 = av.label(" = $(x_4 + \\overline{x_1} + \\overline{x_2}+ "+
                    "\\overline{x_3})\\cdot(\\overline{x_4} + x_1)\\cdot(\\overline{x_4} + x_2)\\cdot("+
                    "\\overline{x_4} +x_3)$ [Using Distributive Law]" +
                    "<br><br>&nbsp;&nbsp;&nbsp; which is a conjunction"
                    +" of clauses.",{left:240,top:190});
  av.step();

  // Slide 17
  label8 = av.label("Note: &nbsp; Since $x_4$ is the output of AND on $x_1$"
                    +" $x_2$ and $x_3$, $(x_4 \\leftrightarrow x_1\\cdot x_2\\cdot x_3)$ (i.e. $\\phi$) is always True."
                    ,{left:70,top:280});
  av.step();

  // Slide 18
  label9 = av.label("<b>An AND gate with any number of input wires"+
                    " can be reduced to a similar CNF formula<br> in polynomial time.</b>",
                    {left:50,top:320});
  av.step();

  // Slide 19
  board.hide(andgate);
  label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
  label6.hide(); label7.hide();label8.hide();label9.hide();label10.hide();
  av.umsg("<br><b>Reduction for OR gate.</b>");
  var orgate=board.addGate(av,"or",400,50,30);
  orgate.addClass("gatefocus");
  label1 = av.label("x1",{left:320,top:7});
  label2 = av.label("x2",{left:320,top:38});
  label3 = av.label("x3",{left:450,top:22});
  av.step();

  // Slide 20
  label4 = av.label("The reduced CNF formula $\\phi$  = ($x_3 \\leftrightarrow$"
                    +"$(x_1 + x_2)$)",{left:50,top:100});
  av.step();

  // Slide 21
  label5 = av.label(" = $(x_3 + (\\overline{x_1+x_2}))\\cdot(\\overline{x_3}+"
                    +"(x_1+x_2))$  &nbsp;&nbsp;[Using Identity 1]",{left:240,top:130});
  label6 = av.label(" = $(x_3 + \\overline{x_1}\\cdot\\overline{x_2})"
                    +"\\cdot(\\overline{x_3}+x_1+x_2)$ &nbsp;&nbsp;[Using De Morgan's Law]",{left:240,top:160});
  label7 = av.label(" = $(x_3 + \\overline{x_1})\\cdot(x_3 + \\overline{x_2})"+
                    "\\cdot(\\overline{x_3} + x_1 + x_2)$ &nbsp;&nbsp;[Using Distributive Law]"+
                    "<br><br>&nbsp;&nbsp;&nbsp; which is a conjunction of clauses."
                    ,{left:240,top:190});
  av.step();

  // Slide 22
  label8 = av.label("Note: &nbsp; Since $x_3$ is the output of OR on $x_1$"
                    +" and $x_2$, $(x_4 \\leftrightarrow (x_1+x_2))$ (i.e. $\\phi$) is always True."
                    ,{left:100,top:280});
  av.step();

  // Slide 23
  label1.hide();label2.hide();label3.hide();label4.hide();label5.hide();
  label6.hide(); label7.hide();label8.hide();
  orgate["input"][1].show();

  label1 = av.label("x1",{left:320,top:7});
  label2 = av.label("x2",{left:320,top:22});
  label3 = av.label("x3",{left:320,top:38});
  label4 = av.label("x4",{left:450,top:22});
  av.step();

  // Slide 24
  label5 = av.label("The reduced CNF formula $\\phi$  = ($x_4 \\leftrightarrow$"
                    +"$(x_1 + x_2 + x_3)$)",{left:50,top:100});
  av.step();

  // Slide 25
  label6 = av.label(" = $(x_4 + (\\overline{x_1+x_2+x_3}))\\cdot(\\overline{x_4}+"
                    +"(x_1+x_2+x_3))$  &nbsp;&nbsp;[Using Identity 1]",{left:240,top:130});
  label7 = av.label(" = $(x_4 + \\overline{x_1}\\cdot\\overline{x_2}\\cdot\\overline"
                    +"{x_3})\\cdot(\\overline{x_4}+x_1+x_2+x_3)$ &nbsp;&nbsp;[Using De Morgan's Law]",{left:240,top:160});
  label8 = av.label(" = $(x_4 + \\overline{x_1})\\cdot(x_4 + \\overline{x_2})\\cdot"+
                    "(x_4 +\\overline{x_3})\\cdot(\\overline{x_4} + x_1 + x_2 + x_3)$ [Using Distributive Law]"+
                    "<br><br>&nbsp;&nbsp;&nbsp; which is a conjunction of clauses."
                    ,{left:240,top:190});

  av.step();

  // Slide 26
  label9 = av.label("Since $x_4$ is the output of OR on $x_1$"
                    +" $x_2$ and $x_3$, $(x_4 \\leftrightarrow (x_1+x_2+x_3))$ (i.e. $\\phi$) is always True."
                    ,{left:70,top:280});
  av.step();

  // Slide 27
  label10 = av.label("<b>An OR gate with any number of input wires"+
                     " can be reduced to a similar CNF formula<br> in polynomial time</b>",
                     {left:50,top:320});
  av.step();

  // Slide 28
  board.hide(orgate);
  label1.hide();
  label2.hide();
  label3.hide();
  label4.hide();
  label5.hide();
  label6.hide();
  label7.hide();
  label8.hide();
  label9.hide();
  label10.hide();

  av.umsg("<br><br><b>Reduction of Circuit-Satisfiability to SAT</b>");

  label1=av.label("As we saw, each gate in the circuit (with $n$ gates) can be reduced to a CNF "+
                  "formula $\\phi$ in polynomial time."+
                  "<br><br>If $x_O$ is the variable corresponding to the "
                  +"final output of the circuit, and ${\\phi}_k$ is the CNF formula for "
                  +"gate $k$, <br>the circuit can be reduced to the CNF formula : <br><br>$x_O"
                  +"\\cdot {\\phi}_1 \\cdot {\\phi}_2 \\cdots {\\phi}_n$.",{left:0,top:5});

  av.step();

  // Slide 29
  label1.hide();
  av.umsg("<br><b>Example Circuit</b>");
  x = 100; y = 20; r = 25;

  var x1pos = [x-50,y-0.4*r];
  var x2pos = [x-50,y+0.4*r];
  var x3pos = [x-50,y+150];

  board.addSignals(["x1","x2","x3"]);
  var xlabel1 =av.label("x1",{left:20,top:-15});
  var xlabel2 = av.label("x2",{left:20,top:5});
  var xlabel3 = av.label("x3",{left:20,top:y+125});
  var gate1=board.addGate(av,"not",x,y+150,r);
  gatelabel[0] = av.label("A",{left:x-7,top:y+125});

  x+=100;
  var gate2=board.addGate(av,"or",x,y,r);
  gatelabel[1] =  av.label("B",{left:x-7,top:y-25});

  x+=50;
  var gate3=board.addGate(av,"not",x,y+75,r);
  gatelabel[2] = av.label("C",{left:x-7,top:y+50});

  var gate4=board.addGate(av,"and",x,y+150,r);
  gate4.input[1].show();
  gate4.input[1].removeClass("invisible");
  gatelabel[3] =
    av.label("D",{left:x-7,top:y+125});

  x+=100;
  var gate5=board.addGate(av,"or",x,y+37,r);
  gatelabel[4] = av.label("E",{left:x-7,top:y+12});

  var gate6=board.addGate(av,"or",x,y+112,r);
  gatelabel[5] = av.label("F",{left:x-7,top:y+87});

  x+=100;
  var gate7=board.addGate(av,"and",x,y+140,r);
  gate7.input[1].show();
  gate7.input[1].removeClass("invisible");
  gatelabel[6] =  av.label("G",{left:x-7,top:y+115});


  //connect gates
  board.inputToGate(av,"x1",x1pos,gate2,0,[]);
  board.inputToGate(av,"x1",x1pos,gate4,0,[[x1pos[0]+100,x1pos[1]],
                                           [x1pos[0]+100,y+150-0.4*r]]);
  board.addBranchPoint(av,x1pos[0]+100,x1pos[1]);
  board.inputToGate(av,"x2",x2pos,gate4,2,[[x2pos[0]+110,x2pos[1]],
                                           [x2pos[0]+110,y+150+0.4*r]]);
  board.addBranchPoint(av,x2pos[0]+110,x2pos[1]);
  board.inputToGate(av,"x2",x2pos,gate2,2,[]);
  board.inputToGate(av,"x3",x3pos,gate1,0,[]);


  board.connectGates(av,gate1,gate4,1,[]);
  board.connectGates(av,gate1,gate3,0,[[x3pos[0]+120,x3pos[1]],
                                       [x1pos[0]+120,y+75]]);
  board.addBranchPoint(av,x3pos[0]+120,x3pos[1]);

  var startpt = gate2.endpoints[gate2.endpoints.length - 1].slice(0);
  var endpt= gate5.endpoints[0].slice(0);
  board.connectGates(av,gate2,gate5,0,[[(endpt[0] + startpt[0])/2,
                                        startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]);

  startpt = gate3.endpoints[gate3.endpoints.length - 1].slice(0);

  endpt = gate5.endpoints[2].slice(0);
  board.connectGates(av,gate3,gate5,2,[[(endpt[0] + startpt[0])/2,
                                        startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]);
  board.addBranchPoint(av,(endpt[0] + startpt[0])/2,startpt[1]);

  endpt = gate6.endpoints[0].slice(0);

  board.connectGates(av,gate3,gate6,0,[[(endpt[0] + startpt[0])/2,
                                        startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]);

  startpt = gate4.endpoints[gate4.endpoints.length - 1].slice(0);

  endpt = gate7.endpoints[2].slice(0);
  board.connectGates(av,gate4,gate7,2,[]);

  endpt = gate6.endpoints[2].slice(0);

  board.connectGates(av,gate4,gate6,2,[[(endpt[0] + startpt[0])/2,
                                        startpt[1]],[(endpt[0] + startpt[0])/2,endpt[1]]]);
  board.addBranchPoint(av,(endpt[0] + startpt[0])/2,startpt[1]);

  startpt = gate6.endpoints[gate6.endpoints.length - 1].slice(0);
  endpt = gate7.endpoints[1].slice(0);
  board.connectGates(av,gate6,gate7,1,[[endpt[0]-10,startpt[1]],
                                       [endpt[0]-10,endpt[1]]]);

  startpt = gate5.endpoints[gate5.endpoints.length - 1].slice(0);
  endpt = gate7.endpoints[0].slice(0);

  board.connectGates(av,gate5,gate7,0,[[endpt[0],startpt[1]]]);

  var numlabels = new Array(10);

  numlabels[0] = av.label("x4",{left:130,top:135});
  numlabels[1] = av.label("x5",{left:235,top:-15});
  numlabels[2] = av.label("x6",{left:280,top:58});
  numlabels[3] = av.label("x7",{left:275,top:135});
  numlabels[4] = av.label("x8",{left:385,top:22});
  numlabels[5] = av.label("x9",{left:385,top:95});
  numlabels[6] = av.label("x10",{left:490,top:130});

  av.step();

  // Slide 30
  numlabels[6].addClass("outputcolor");
  var labels = new Array(15);
  label1 = av.label("This circuit can be reduced to ",{left:0,top:200});
  labels[0] = av.label("<b>$x_{10}$</b>",{left:0,top:230}).addClass("outputcolor").addClass("font125");
  av.step();

  // Slide 31
  gate1.addClass("gatecolor1");
  labels[1] = av.label("$\\cdot$",{left:25,top:230}).addClass("font125");
  labels[2] = av.label("($x_4 \\leftrightarrow \\overline{x_3}$)",{left:30,top:230}).addClass("labelcolor1").addClass("font125");
  av.step();

  // Slide 32
  gate2.addClass("gatecolor2");
  labels[3] = av.label("$\\cdot$",{left:115,top:230}).addClass("font125");
  labels[4] = av.label("($x_5 \\leftrightarrow (x_1 + x_2)$)",{left:120,top:230}).addClass("labelcolor2").addClass("font125");
  av.step();

  // Slide 33
gate3.addClass("gatecolor3");
  labels[5] = av.label("$\\cdot$",{left:265,top:230}).addClass("font125");
  labels[6] = av.label("($x_6 \\leftrightarrow \\overline{x_4}$)",{left:270,top:230}).addClass("labelcolor3").addClass("font125");
  av.step();

  // Slide 34
  gate4.addClass("gatecolor4");
  labels[7] = av.label("$\\cdot$",{left:355,top:230}).addClass("font125");
  labels[8] = av.label("($x_7 \\leftrightarrow (x_1.x_2.x_4)$)",{left:360,top:230}).addClass("labelcolor4").addClass("font125");
  av.step();

  // Slide 35
  gate5.addClass("gatecolor5");
  labels[9] = av.label("$\\cdot$",{left:520,top:230}).addClass("font125");
  labels[10] = av.label("($x_8 \\leftrightarrow (x_5+x_6)$)",{left:525,top:230}).addClass("labelcolor5").addClass("font125");
  av.step();

  // Slide 36
  gate6.addClass("gatecolor6");
  labels[11] = av.label("$\\cdot$",{left:675,top:230}).addClass("font125");
  labels[12] = av.label("($x_9 \\leftrightarrow (x_7+x_6)$)",{left:0,top:250}).addClass("labelcolor6").addClass("font125");
  av.step();

  // Slide 37
  gate7.addClass("gatecolor7");
  labels[13] = av.label("$\\cdot$",{left:148,top:250}).addClass("font125");
  labels[14] = av.label("($x_{10} \\leftrightarrow (x_7.x_8.x_9)$)",{left:155,top:250}).addClass("labelcolor7").addClass("font125");
  av.step();

  // Slide 38
  var labels2 = new Array(15);
  label2 = av.label("=",{left:-5,top:285});
  var x=10;
  labels2[0] = av.label("<b>$x_{10}$</b>",{left:x+0,top:280}).addClass("outputcolor").addClass("font125");
  labels2[1] = av.label("$\\cdot$",{left:x+25,top:280}).addClass("font125");
  labels2[2] = av.label("$(\\overline{x_3} + \\overline{x_4})\\cdot(x_3+x_4)$",{left:x+30,top:280}).addClass("labelcolor1").addClass("font125");
  labels2[3] = av.label("$\\cdot$",{left:x+200,top:280}).addClass("font125");
  labels2[4] = av.label("$(x_5 + \\overline{x_1})\\cdot(x_5 + \\overline{x_2})\\cdot(\\overline{x_5} + x_1 + x_2)$",{left:x+205,top:280}).addClass("labelcolor2").addClass("font125");
  labels2[5] = av.label("$\\cdot$",{left:x+510,top:280}).addClass("font125");
  labels2[6] = av.label("$(\\overline{x_4} + \\overline{x_6})\\cdot(x_4+x_6)$",{left:x+515,top:280}).addClass("labelcolor3").addClass("font125");
  labels2[7] = av.label("$\\cdot$",{left:x+690,top:280}).addClass("font125");
  labels2[8] = av.label("<br>$(x_7 + \\overline{x_1} + \\overline{x_2}+ "+
                        "\\overline{x_4})\\cdot(\\overline{x_7} + x_1)\\cdot(\\overline{x_7} + x_2)\\cdot("+
                        "\\overline{x_7} +x_4)$",{left:x+0,top:280}).addClass("labelcolor4").addClass("font125");
  labels2[9] = av.label("<br>$\\cdot$",{left:x+440,top:280}).addClass("font125");
  labels2[10] = av.label("<br>$(x_8 + \\overline{x_5})\\cdot(x_8 + \\overline{x_6})\\cdot(\\overline{x_8} + x_5 + x_6)$",{left:x+445,top:280}).addClass("labelcolor5").addClass("font125");
  labels2[11] = av.label("<br>$\\cdot$",{left:x+755,top:280}).addClass("font125");
  labels2[12] = av.label("<br><br>$(x_9 + \\overline{x_7})\\cdot(x_9 + \\overline{x_6})\\cdot(\\overline{x_9} + x_7 + x_6)$",{left:x+0,top:280}).addClass("labelcolor6").addClass("font125");
  labels2[13] = av.label("<br><br>$\\cdot$",{left:x+310,top:280}).addClass("font125");
  labels2[14] = av.label("<br><br>$(x_{10} + \\overline{x_7} + \\overline{x_8}+ "+
                         "\\overline{x_9})\\cdot(\\overline{x_{10}} + x_7)\\cdot(\\overline{x_{10}} + x_8)\\cdot("+
                         "\\overline{x_{10}} +x_9)$",{left:x+315,top:280}).addClass("labelcolor7").addClass("font125");

  label3 = av.label("<b> Note: This CNF expression can be constructed in polynomial time.</b>",{left:0,top:375});
  av.step();

  // Slide 39
  board.hide();
  for(i in gatelabel)
    gatelabel[i].hide();
  for(i in numlabels)
    numlabels[i].hide();
  for(i in labels){
    labels[i].hide();
    labels2[i].hide();
  }
  xlabel1.hide();
  xlabel2.hide();
  xlabel3.hide();
  label1.hide(); label2.hide();label3.hide();
  av.umsg("<br><br><b>SAT and Circuit Satisfiability</b>");

  label1=av.label("The reduced CNF formula for a circuit with $n$ gates is of the $x_{o,f} \\cdot {\\phi}_1 \\cdot {\\phi}_2 \\cdots$ where $\\phi_k$ is the CNF formula <br>corresponding to the $k^{th}$gate."+
                  "<br><br><b>1. If the circuit is satisfiable</b>"+
                  "<br><br>The gates in a circuit perform a well defined function causing the $\\phi_k$ formulae to be aways True.<br> "+
                  "Since the circuit is satisfiable, its final output $X_O$ evaluates to True. "
                  +"<br>Hence with all clauses satisfied, the reduced CNF formula also evaluates to True."+
                  "<br><br><b>The CNF formula is satisfiable.</b>",{left:0,top:-10});
  av.step();

  // Slide 40
  label2=av.label("<br><br><b>2. If the CNF formula is satisfiable</b>"+
                  "<br><br> For the CNF formula to be satisfiable, all the clauses must be True. "
                  +"<br>Hence all the 'if and only if' formulae of the form i$\\phi_k$ will also need to be True."+
                  "<br> This preserves the functionality of all corresponding gates in the circuit. "+
                  "<br>Also the output $X_O$ is True."+
                  "<br><br><b>Hence the circuit is satisfiable.</b>",{left:0,top:180});
  av.recorded();

});
