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

  //frame 1
  av.umsg("While Turing machines might be able to do powerful things, when operating at the individual state level, it can get rather difficult and tedious to program them. In fact, it might feel in some ways like writing machine code or assembly language.<br/><br/>The secret to success in modern software development is to build up more powerful tools, especially by packaging behavior together and manipulating the packages.<br/><br/>We can hope to build up similar capability with Turing Machines.")
  av.displayInit();

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
  av.umsg("How can we benifit from that?. A Turing machine can do a series of computations on the input string and each computation passes the result to the next computation. This means that Turing machine computations can be combined into larger machines. Suppose we a Turing Machine $M$ that will call another TM $M_2$:<br/> &bull; $M$ prepares a string as input to $M_2$.<br/>&bull; $M$ passes control to $M_2$ with the I/O head at the end of the input.<br/> &bull; $M$ retrieves control when $M_2$ has completed.");
  av.step();
  
  //frame 12
  av.umsg("Think about any programming language. When we write a program we can write lines of code that do all what we need. However, a programming language also provides us with a number of predefined functions/methods to help us reduce the amount of code that we need to write.");
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
  av.umsg("Copy Machine: Transform # w <u>#</u> into # w # w <u>#</u>. Note the difference between L<sub>#</sub> in the start state (which means move left until seeing the first blank), and L<sub>#</sub> at the bottom (which means move left and then write a space). <br><br><br><br><br><br><br><br><br> Shift a string right:");
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
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
