$(document).ready(function () {
  "use strict";

  var av_name = "TMComplicatedMachine3";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;
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

  //frame 1
  av.umsg("While Turing machines might be able to do powerful things, when operating at the individual state level, it can get rather difficult and tedious to program them. In fact, it might feel in some ways like writing machine code or assembly language.");
  av.displayInit();

  //frame 2
  av.umsg("The secret to success in modern software development is to build up more powerful tools, especially by packaging behavior together and manipulating the packages.<br/>We can hope to build up similar capability with Turing Machines.")
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg("How can we benifit from that?. TM can do a series of computations on the input string and each computation passes the result to the next computation.");
  av.step();

  //frame 11
  av.umsg("This means that Turing machine computations can be combined into larger machines, suppose we a Turing Machine $M$ that will call another TM $M_2$:<br/> &bull; $M$ prepares string as input to $M_2$. <br> &bull; $M$ passes control to $M_2 with I/O head at the end of the input. <br> &bull; $M$ retrieves control when $M_2$ has completed.");
  av.step();
  
  //frame 12
  av.umsg("Think about aby programming language. When we write a program we can write lines of code that do all what we need. However, these programming languages also provides us with a number of predefined functions/methods to help us reduce the amount of written code.");
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();
  
  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg("Here are some basic machines and notation <br> &bull; Start state indicated with >.")
  av.step();
  
  //frame 18
  av.umsg(Frames.addQuestion("q18"));
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
  
  //frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 21
  letter1.hide();
  letter2.hide();
  letter3.hide();
  letter4.hide();
  letter5.hide();
  arrow1.hide();
  arrow2.hide();
  av.umsg(Frames.addQuestion("q21"));
  letter1 = av.label("$>R$", {top: 50, left: xleft + 100});
  letter2 = av.label("$\\overline{\\#}$", {top: 0, left: xleft + 115});
  // Curvy line1
  curvy1.show();

  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"))
  av.step();

  //frame 23
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
  
  av.umsg(Frames.addQuestion("q23"));
  av.step();

  //frame 24
  arrow2 = av.g.line(260 + xleft, 10 + yStart, 260 + xleft, 100 + yStart,
    {"stroke-width": 3});

  // Right part
  var letter7 = av.label("$>L_{\\#}$", {top: 50 + yStart, left: xleft + 300});
  var letter8 = av.label("$M$", {top: 50 + yStart, left: xleft + 400});
  // Horizontal arrow
  var arrow3 = av.g.line(340 + xleft, 75 + yStart, 395 + xleft, 75 + yStart,
    {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.umsg(Frames.addQuestion("q24"));
  av.step();
    
  //frame 25
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
  av.umsg("Figure 9.2.6: Copy Machine: Transform # w <u>#</u> into # w # w <u>#</u>. Note the difference between L<sub>#</sub> in the start state (which means move left until seeing the first blank), and L<sub>#</sub> at the bottom (which means move left and then write a space). <br><br><br><br><br><br><br><br><br> Figure 9.2.7: Shift a string right.");
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
  
  //frame 26
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
  av.umsg("<b>9.2.1.6. Turing Machine Extensions</b> <br><br> When we give extensions or new functionality to a computing system, sometimes they change something fundamental about the capabilities of the system. For example, when we add non-determinism to an algorithm, we <b>might</b> change the cost of the underlying problem from exponential to polynomial time. But, other changes do nothing fundamental. In terms of Turing machines, our concern is what the machine can do, rather than how long it takes to do it. Does non-determinism help us to solve the Halting problem? No. Likewise, the following extensions do not increase the power of Turing Machines.");
  av.step();

  //frame 27
  av.umsg("&bull; <b><i>Limit the tape to be infinite in only one direction</i></b> <br><br> Our first example actually demonstrates that some limitations do not make a difference. Many textbooks on formal languages present the basic Turing Machine as having a tape that is infinite in only one direction. The folling diagram shows that we can easily simulate a tape infinite in two directions with a one-direction infinite tape. <br><br><br><br><br><br><br><br> The idea is to just bend the 2-way infinite tape in the middle, and store both directions of the tape into a single cell. This requires a greatly expanded alphabet, because we now need to be able to represent any combination of two characters. This will need more states, and probably more time. But it does not allow anything new in terms of capability.");
  ytop = 80;
  var cellwidth = 20;
  xleft = 20;
  var i;
  var clearlist1 = new Array();

  clearlist1.push(av.g.line(xleft, ytop, xleft + 7 *cellwidth, ytop,
            {"stroke-width": 2}));

  clearlist1.push(av.g.line(xleft, ytop + cellwidth,
            xleft + 7 *cellwidth, ytop + cellwidth,
            {"stroke-width": 2}));

  for (i = 1; i < 7; i++) {
    var k = av.g.line(xleft + i * cellwidth, ytop, xleft + i * cellwidth, ytop + 1 * cellwidth, {"stroke-width": 2});
    clearlist1.push(k);
  }

  clearlist1.push(av.label("-2", {top: ytop + 5, left: xleft + 3 + cellwidth * 1}));
  clearlist1.push(av.label("-1", {top: ytop + 5, left: xleft + 3 + cellwidth * 2}));
  clearlist1.push(av.label("0",  {top: ytop + 5, left: xleft + 7 + cellwidth * 3}));
  clearlist1.push(av.label("1",  {top: ytop + 5, left: xleft + 7 + cellwidth * 4}));
  clearlist1.push(av.label("2",  {top: ytop + 5, left: xleft + 7 + cellwidth * 5}));

  clearlist1.push(av.label("$a$", {top: ytop - 15, left: xleft + 6 + cellwidth}));
  clearlist1.push(av.label("$b$", {top: ytop - 15, left: xleft + 6 + cellwidth * 2}));
  clearlist1.push(av.label("$c$", {top: ytop - 15, left: xleft + 6 + cellwidth * 3}));
  clearlist1.push(av.label("$d$", {top: ytop - 15, left: xleft + 6 + cellwidth * 4}));
  clearlist1.push(av.label("$e$", {top: ytop - 15, left: xleft + 6 + cellwidth * 5}));

  clearlist1.push(av.g.polyline([[xleft + 165, ytop], [xleft + 155, ytop + 10],
                 [xleft + 165, ytop + 20]], {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 160, ytop + 5, xleft + 180, ytop + 5,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 160, ytop + 15, xleft + 180, ytop + 15,
            {"stroke-width": 2}));
  clearlist1.push(av.g.polyline([[xleft + 175, ytop], [xleft + 185, ytop + 10],
                 [xleft + 175, ytop + 20]], {"stroke-width": 2}));

  clearlist1.push(av.g.line(xleft + 210, ytop - 10, xleft + 210 + 5 *cellwidth, ytop - 10,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 210 + cellwidth, ytop + 10,
            xleft + 210 + 5 *cellwidth, ytop + 10,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 210, ytop + 30, xleft + 210 + 5 *cellwidth, ytop + 30,
            {"stroke-width": 2}));

  for (i = 0; i < 5; i++) {
    var linetemp1 = av.g.line(xleft + 210 + i * cellwidth, ytop - 10,
              xleft + 210 + i * cellwidth, ytop + 30,
              {"stroke-width": 2});
    clearlist1.push(linetemp1);
  }

  clearlist1.push(av.label("$\\$$", {top: ytop - 15, left: xleft + 215}));
  clearlist1.push(av.label("$b$", {top: ytop - 5, left: xleft + 235}));
  clearlist1.push(av.label("$a$", {top: ytop - 5, left: xleft + 255}));
  clearlist1.push(av.label("$c$", {top: ytop - 25, left: xleft + 235}));
  clearlist1.push(av.label("$d$", {top: ytop - 25, left: xleft + 255}));
  clearlist1.push(av.label("$e$", {top: ytop - 25, left: xleft + 275}));

  clearlist1.push(av.label("0", {top: ytop - 44, left: xleft + 235}));
  clearlist1.push(av.label("1", {top: ytop - 44, left: xleft + 255}));
  clearlist1.push(av.label("2", {top: ytop - 44, left: xleft + 275}));
  clearlist1.push(av.label("-1", {top: ytop + 17, left: xleft + 232}));
  clearlist1.push(av.label("-2", {top: ytop + 17, left: xleft + 252}));
  clearlist1.push(av.label("-3", {top: ytop + 17, left: xleft + 272}));
  av.step();


  //frame 28
  for (var j = 0; j < clearlist1.length; j++){
    clearlist1[j].hide();
  }
  xleft = 200;
  ytop = 50;
  clearlist1 = [];

  av.umsg("&bull; <i><b>Multiple tapes (each with its own head)</i></b> <br><br> Again, we can simulate this with encoding multiple symbols into a single table cell. For example, to simulate two tapes (each with a head), we encode in each cell the corresponding two symbols, and two binary markers to indicate if the tape head is currently in the corresponding cell of the two tapes.<br><br><br><br><br><br><br><br><br> &bull; <i><b>Multiple heads on one tape</i></b> <br><br> This is easier than encoding multiple tapes. We merely encode the heads onto the tape, and simulate moving them around.");

  for (i = 0; i < 5; i++) {
    clearlist1.push(av.g.line(xleft + cellwidth, ytop + i * cellwidth,
              xleft + 5 * cellwidth, ytop + i * cellwidth,
              {"stroke-width": 2}));
    clearlist1.push(av.g.line(xleft + i * cellwidth, ytop,
              xleft + i * cellwidth, ytop + 4 * cellwidth,
              {"stroke-width": 2}));
  }
  clearlist1.push(av.g.line(xleft, ytop, xleft + cellwidth, ytop,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft, ytop + 4 * cellwidth,
            xleft + cellwidth, ytop + 4 * cellwidth,
            {"stroke-width": 2}));

  clearlist1.push(av.label("Single tape:", {top: ytop + 5, left: xleft - 100}));
  clearlist1.push(av.label("Each column is one cell", {top: ytop + 25, left: xleft - 187}));
  clearlist1.push(av.label("$\\$$", {top: ytop + 16, left: xleft + 5}));
  clearlist1.push(av.label("$a$", {top: ytop - 13, left: xleft + 5 + cellwidth}));
  clearlist1.push(av.label("$b$", {top: ytop - 13, left: xleft + 5 + cellwidth * 2}));
  clearlist1.push(av.label("$\\#$", {top: ytop - 13, left: xleft + 5 + cellwidth * 3}));

  clearlist1.push(av.label("$1$", {top: ytop - 13 + cellwidth, left: xleft + 5 + cellwidth}));
  clearlist1.push(av.label("$1$", {top: ytop - 13 + 3 * cellwidth,
                   left: xleft + 5 + 2 * cellwidth}));

  clearlist1.push(av.label("$a$", {top: ytop - 13 + 2 * cellwidth,
                   left: xleft + 5 + cellwidth}));
  clearlist1.push(av.label("$a$", {top: ytop - 13 + 2 * cellwidth,
                   left: xleft + 5 + cellwidth * 2}));
  clearlist1.push(av.label("$\\#$", {top: ytop - 13 + 2 * cellwidth,
                     left: xleft + 5 + cellwidth * 3}));

  clearlist1.push(av.label("$0$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 1 * cellwidth}));
  clearlist1.push(av.label("$1$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 2 * cellwidth}));
  clearlist1.push(av.label("$2$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 3 * cellwidth}));
  clearlist1.push(av.label("$3$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 4 * cellwidth}));
  clearlist1.push(av.label("(Tape 1 contents)",
           {top: ytop - 13 + cellwidth * 0, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Tape 1 head location)",
           {top: ytop - 13 + cellwidth * 1, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Tape 2 contents)",
           {top: ytop - 13 + cellwidth * 2, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Tape 2 head location)",
           {top: ytop - 13 + cellwidth * 3, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Cell numbering from original multi-tapes)",
           {top: ytop - 13 + cellwidth * 4, left: xleft + 5 + 5 * cellwidth}));


  av.step();


  //frame 29
  for (var j = 0; j < clearlist1.length; j++){
    clearlist1[j].hide();
  }
  xleft = 50;
  ytop = 30;
  for (i = 0; i < 5; i++) {
    av.g.line(xleft, ytop + i * cellwidth,
              xleft + 5 * cellwidth, ytop + i * cellwidth,
              {"stroke-width": 2});
    av.g.line(xleft + i * cellwidth, ytop,
              xleft + i * cellwidth, ytop + 5 * cellwidth,
              {"stroke-width": 2});
    av.g.line(xleft + (i + 1) * cellwidth, ytop,
              xleft, ytop + (i + 1) * cellwidth,
              {"stroke-width": 1, "arrow-end":"classic-wide-long"});
  }
  av.umsg("&bull; <i><b>A two-dimensional \"tape\"</b></i> <br><br> All that we need to do is find a mapping from 2D to 1D, which is fairly easy. One approach is to work in diagonals, in the order (0, 0), (0, 1), (1, 0), (0, 2), (1, 1), (2, 0), and so on. <br><br><br><br><br><br><br><br><br><br> &bull; <i><b>Non-determinismFormalLanguages2</b></i> <br><br> We can simulate non-deterministic behavior in sequence, doing all length 1 computations, then length 2, etc., until we reach a halt state for one of the non-deterministic choices. So we see that while non-determinism can save a lot of time, it does not change what can (eventually) be done.");

  av.recorded();
});
