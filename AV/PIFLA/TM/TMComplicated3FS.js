// Title: Composition of Turing Machines
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Turing Machine
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow the formal conepts that support composition of Turing machines, which is a necessary step to building more complicated machines. */

$(document).ready(function () {
  "use strict";

  var av_name = "TMComplicated3FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var xStart = 150;
  var yStart = 160;
  var xleft = 0;
  var curvy1 = av.g.path(["M", 110 + xleft, 65,
             "C", 100 + xleft, 35,
             150 + xleft, 35,
             120 + xleft, 65].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  var curvy2 = av.g.path(["M", 110 + xleft, 65 + yStart,
             "C", 100 + xleft, 35 + yStart,
             150 + xleft, 35 + yStart,
             120 + xleft, 65 + yStart].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});

  curvy1.hide();
  curvy2.hide();

  // Frame 1
  av.umsg("While Turing machines might be able to do powerful things, when operating at the individual state level it can get rather difficult and tedious to program them. In fact, it might feel in some ways like writing machine code or assembly language.<br/><br/>The secret to success in modern software development is to build up more powerful tools, especially by packaging behavior together and manipulating the packages through specific interfaces.<br/><br/>We can hope to build up similar capability with Turing Machines.")
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("lemma"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("yield"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("step1"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("meaning1"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("step2"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("meaning2"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("meaning3"));
  av.step();

  // Frame 9
  av.umsg("How do we benifit from observing that?. A Turing machine can do a series of computations on the input string and each computation passes the result to the next computation. This means that Turing machine computations can be combined into larger machines. Suppose we have a Turing Machine $M$ that will call another TM $M_2$:<br/> &bull; $M$ prepares a string as input to $M_2$.<br/>&bull; $M$ passes control to $M_2$ with the I/O head at the end of the input.<br/> &bull; $M$ retrieves control when $M_2$ has completed.<br/><br/>Of course 'passes control' just means to change to the right state.");
  av.step();
  
  // Frame 10
  av.umsg("Think about any programming language. When we write a program we can write lines of code that do all what we need. However, a programming language also provides us with a number of predefined functions/methods to help us reduce the amount of code that we need to write.");
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("sigma"));
  av.step();
  
  // Frame 12
  av.umsg(Frames.addQuestion("move"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("not"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("multi"));
  av.step();

  // Frame 15
  av.umsg("Here are some of the most basic machines and notation that we will use to build more complex machines.<br/>&bull; $|\\Sigma|$ symbol-writing machines (in other words, we need one for each symbol in the input alphabet)): Any given symbol $\\sigma$ has a symbol-writing machine named $\\sigma$.<br/>&bull; Head-moving machines, named $R$, $L$ and $S$, that move the head appropriately.<br/>&bull; Transitions on anything other than (for example) $\\#$ are labeled $\\overline{\\#}$.<br/>&bull; Multiple copies of a machine get a superscript.<br/>&bull; Finally, the start state will be indicated with $>$.")
  av.step();
  
  // Frame 16
  av.umsg(Frames.addQuestion("first"));
  var letter1 = av.label("$>M_1$", {top: yStart + 10, left: xleft + 100});
  var letter2 = av.label("$M_2$", {top: yStart + 10, left: xleft + 200});
  var letter3 = av.label("$M_3$", {top: yStart + 90, left: xleft + 115});
  var letter4 = av.label("$a$", {top: yStart - 5, left: xleft + 160});
  var letter5 = av.label("$b$", {top: yStart + 50, left: xleft + 110});
  // Vertical arrow
  var arrow1 = av.g.line(125 + xleft, yStart + 50, 125 + xleft, yStart + 100,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  var arrow2 = av.g.line(140 + xleft, yStart + 35, 195 + xleft, yStart + 35,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.step();
  
  // Frame 17
  av.umsg(Frames.addQuestion("a"));
  av.step();

  // Frame 18
  av.umsg(Frames.addQuestion("b"));
  av.step();

  // Frame 19
  av.umsg(Frames.addQuestion("find"));
  letter1.hide();
  letter2.hide();
  letter3.hide();
  letter4.hide();
  letter5.hide();
  arrow1.hide();
  arrow2.hide();
  letter1 = av.label("$>R$", {top: 50, left: xleft + 100});
  letter2 = av.label("$\\overline{\\#}$", {top: 0, left: xleft + 115});
  // Curvy line1
  curvy1.show();
  av.step();

  // Frame 20
  av.umsg(Frames.addQuestion("rpound"))
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("emptyM"));
  letter1.hide();
  letter2.hide();
  curvy1.hide();
  letter3 = av.label("$>L$", {top: 50 + yStart, left: xleft + 100});
  letter4 = av.label("$\\overline{\\#}$", {top: 0 + yStart, left: xleft + 115});
  letter5 = av.label("$\\#$", {top: 35 + yStart, left: xleft + 160});
  var letter6 = av.label("$M$", {top: 50 + yStart, left: xleft + 200});
  arrow1 = av.g.line(140 + xleft, 75 + yStart, 195 + xleft, 75 + yStart,
    {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  curvy2.show();
  // Horizontal line
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("lpound"));
  arrow2 = av.g.line(260 + xleft, 10 + yStart, 260 + xleft, 100 + yStart,
    {"stroke-width": 3});

  // Right part
  var letter7 = av.label("$>L_{\\#}$", {top: 50 + yStart, left: xleft + 300});
  var letter8 = av.label("$M$", {top: 50 + yStart, left: xleft + 400});
  // Horizontal arrow
  var arrow3 = av.g.line(340 + xleft, 75 + yStart, 395 + xleft, 75 + yStart,
    {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.step();
    
  // Frame 23
  av.umsg("Copy Machine: Transform # w <u>#</u> into # w # w <u>#</u>.<br><br><br><br><br><br><br><br><br><br/><br/>Shift a string right:<br/><br/><br/><br/><br/><br/><br/><br/>Note the difference between L<sub>#</sub> in the start state of the copy machine (which means move left until seeing the first blank), and L# at the bottom of the shift machine (which means move left and then write a space).");
  letter3.hide();
  letter4.hide();
  letter5.hide();
  letter6.hide();
  letter7.hide();
  letter8.hide();
  arrow1.hide();
  arrow2.hide();
  arrow3.hide();
  
  curvy2.hide();
  // first diagram
  var ytop = 5;
  letter1 = av.label("$R$", {top: 10 + ytop, left: xleft + 120});
  letter2 = av.label("$\\# R^{2}_{\\#} \\sigma L^{2}_{\\#} \\sigma$", {top: 10 + ytop, left: xleft + 200});
  letter3 = av.label("$R_{\\#}$", {top: 90 + ytop, left: xleft + 115});
  letter4 = av.label("$\\overline{\\#}$", {top: -5 + ytop, left: xleft + 160});
  letter5 = av.label("$\\#$", {top: 45 + ytop, left: xleft + 105});
  letter6 = av.label("$>L_{\\#}$", {top: 10 + ytop, left: xleft + 20});
  // Vertical arrow
  arrow1 = av.g.line(125 + xleft, 50 + ytop, 125 + xleft, 100 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  arrow2 = av.g.line(140 + xleft, 35 + ytop, 195 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  arrow3 = av.g.line(60 + xleft, 35 + ytop, 115 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  var arrow4 = av.g.polyline([[xleft + 275, 35 + ytop], [xleft + 295, 35 + ytop],
                 [xleft + 295, 0 + ytop], [xleft + 125, 0 + ytop],
                 [xleft + 125, 25 + ytop]], 
                {"stroke-width": 2, "arrow-end":"classic-wide-long"});


  //second diagram
  ytop = 180;
  letter7 = av.label("$R$", {top: 10 + ytop, left: xleft + 120});
  letter8 = av.label("$L \\sigma R$", {top: 10 + ytop, left: xleft + 200});
  var letter9 = av.label("$L\\#$", {top: 90 + ytop, left: xleft + 115});
  var letter10 = av.label("$\\overline{\\#}$", {top: -5 + ytop, left: xleft + 160});
  var letter11 = av.label("$\\#$", {top: 45 + ytop, left: xleft + 105});
  var letter12 = av.label("$>L_{\\#}$", {top: 10 + ytop, left: xleft + 20});
  // Vertical arrow
  var arrow5 = av.g.line(125 + xleft, 50 + ytop, 125 + xleft, 100 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  var arrow6 = av.g.line(140 + xleft, 35 + ytop, 195 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  var arrow7 = av.g.line(60 + xleft, 35 + ytop, 115 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  var arrow8 = av.g.polyline([[xleft + 235, 35 + ytop], [xleft + 255, 35 + ytop],
                 [xleft + 255, 0 + ytop], [xleft + 125, 0 + ytop],
                 [xleft + 125, 25 + ytop]], 
                {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.step();
  
  // Frame 24
  av.umsg("Congratulations! Frameset completed.");
  letter1.hide();
  letter2.hide();
  letter3.hide();
  letter4.hide();
  letter5.hide();
  letter6.hide();
  letter7.hide();
  letter8.hide();
  letter9.hide();
  letter10.hide();
  letter11.hide();
  letter12.hide();
  arrow1.hide();
  arrow2.hide();
  arrow3.hide();
  arrow4.hide();
  arrow5.hide();
  arrow6.hide();
  arrow7.hide();
  arrow8.hide();
  av.recorded();
});
