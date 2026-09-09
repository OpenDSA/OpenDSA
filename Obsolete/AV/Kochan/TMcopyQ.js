$(document).ready(function() {
  "use strict";
  var av_name = "TMcopyQ";
  var av = new JSAV(av_name);
  var hspaceForQuestion = 100;
  var vspaceForQuestion = 35;
  var espaceBtwMachineTape = 20;
  var xleft = 250 - hspaceForQuestion;
  var ytop = 25 + vspaceForQuestion;
  var Frames = PIFRAMES.init(av_name);
  //Slide 1
  // av.umsg("In this slideshow, we will see how a copy machine processes input string 'ab'.<br>" +
  //         "The following machine is a copy machine that can transform #w# into #w#w#:<br>" +
  //         "(Note: w represents the input string ('ab' in this case).)");
  av.umsg("In this slideshow, we will see how a copy machine processes input string 'ab'.");
  var r = av.label("$R$", {top: 10 + ytop, left: xleft + 120});
  // var h1 = av.label("$\\# R^{2}_{\\#} \\sigma L^{2}_{\\#} \\sigma$", {top: 10 + ytop, left: xleft + 200});
  var h1 = av.label("$\\#$", {top: 10 + ytop, left: xleft + 200});
  var r2 = av.label("$R^{2}_{\\#}$", {top: 10 + ytop, left: xleft+213});
  var s1 = av.label("$\\sigma$", {top: 10 + ytop, left: xleft+233});
  var l2 = av.label("$L^{2}_{\\#}$", {top: 10 + ytop, left: xleft+243});
  var s2 = av.label("$\\sigma$", {top: 10 + ytop, left: xleft+261});
  var r3 = av.label("$R_{\\#}$", {top: 90 + ytop, left: xleft + 115});
  var ol =av.label("$\\overline{\\#}$", {top: -5 + ytop, left: xleft + 160});
  var h2 = av.label("$\\#$", {top: 45 + ytop, left: xleft + 105});
  var l = av.label("$>L_{\\#}$", {top: 10 + ytop, left: xleft + 20});
  // Vertical arrow
  av.g.line(125 + xleft, 50 + ytop, 125 + xleft, 100 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  av.g.line(140 + xleft, 35 + ytop, 195 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  // Horizontal arrow
  av.g.line(60 + xleft, 35 + ytop, 115 + xleft, 35 + ytop,
            {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.g.polyline([[xleft + 275, 35 + ytop], [xleft + 295, 35 + ytop],
                 [xleft + 295, 0 + ytop], [xleft + 125, 0 + ytop],
                 [xleft + 125, 25 + ytop]],
                {"stroke-width": 2, "arrow-end":"classic-wide-long"});
  av.displayInit();

  // Slide 2
  av.umsg(Frames.addQuestion("q1"));
  av.step();

  // Slide 3
  av.umsg("Let's make a tape to keep track of the copy machine. The highlighted cell is the head.");
  var tape = av.ds.tape(["#", "a", "b", "#", "#", "#", "#"], 300-hspaceForQuestion, 200+vspaceForQuestion+espaceBtwMachineTape, "both", 3);
  av.step();

  // Slide 4
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  // Slide 5
  l.css({'color':'red'});
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  // Slide 6
  // av.umsg("Excellent! We start from the <font color='red'>$>L_{\\#}$</font>. $L_{\\#}$ means going to the closest space (denoted by #) " +
  //        "on the left, from the head.");
  av.umsg(Frames.addQuestion("q6"));
  tape.highlightPosition("0");
  av.step();

  // Slide 6
  // av.umsg(Frames.addQuestion("q3"));
  // av.step();



  // Slide 7
  l.css({'color':'black'});
  r.css({'color':'red'});
  av.umsg(Frames.addQuestion("q7"));

  // av.umsg("The $R$ in red means moving from the current tape cell to the right cell.");
  tape.highlightPosition(1);
  av.step();

  // Slide 8
  r.css({'color':'black'});
  ol.css({'color': 'red'});
  h1.css({'color': 'red'});
  // av.umsg("Is the current tape cell a space (i.e. #)?<br>" +
  //         "No, the current tape cell is an 'a', so we follow the $\\overline{\\#}$ direction to go to the # state. <BR>" +
  //         "Then, erase the value 'a' by making the cell empty (denoted by #).");
  av.umsg(Frames.addQuestion("q8"));

  // tape.arr.value(1, "#");
  av.step();

  // Slide 9
  tape.arr.value(1, "#");

  ol.css({'color': 'black'});
  h1.css({'color': 'black'});
  r2.css({'color': 'red'});
  av.umsg(Frames.addQuestion("q9"));
  // av.umsg("$R^{2}_{\\#}$: Go to the second space(#) on the right.");
  // tape.highlightPosition(3);
  // tape.moveRight();
  av.step();

  // Slide 10
  tape.highlightPosition(3);
  tape.moveRight();
  r2.css({'color': 'black'});
  s1.css({'color': 'red'});
  av.umsg(Frames.addQuestion("q10"));

  // av.umsg("Sigma($\\sigma$): Write the letter we just read to the current tape cell. " +
  //         "<br> We just read 'a', so we need write 'a' to the cell.");
  // tape.arr.value(4, "a");
  av.step();

  //Slide 11
  tape.arr.value(4, "a");

  s1.css({'color': 'black'});
  l2.css({'color': 'red'});
  av.umsg(Frames.addQuestion("q11"));

  // av.umsg("Awesome! The machine just wrote 'a' to the cell. <br> Now, <font color='red'>$L^{2}_{\\#}$</font> " +
  //     "looks very similar to $R^{2}_{\\#}$. <font color='red'>$L^{2}_{\\#}$</font> means changing the current " +
  //     "tape position to the second space(#) on the LEFT. <br> Notice how the <font color='red'>$L^{2}_{\\#}$</font> " +
  //     "machine unhighlighted the previous positions and then highlighted the current position.");
  tape.highlightPosition(3);
  tape.highlightPosition(1);
  av.step();

  //Slide 12
  l2.css({'color': 'black'});
  s2.css({'color': 'red'});
  // av.umsg("Sigma($\\sigma$): Write the letter we just read to the current tape cell. <br>" +
  //         " We just read 'a', so we need write 'a' to the cell.");
  av.umsg(Frames.addQuestion("q12"));

  tape.current = 1;
  tape.arr.value(1, 'a');
  tape.highlightCurrent();
  av.step();

  //Slide 13
  r.css({'color':'red'});
  s2.css({'color': 'black'});
  // av.umsg("The $R$ in red means moving from the current tape cell to the right cell.");
  av.umsg(Frames.addQuestion("q13"));
  tape.moveRight();
  av.step();

  //Slide 14
  r.css({'color':'black'});
  ol.css({'color': 'red'});
  h1.css({'color': 'red'});
  // av.umsg("Is the current tape cell a space (i.e. #)?<br>" +
  //         "No, the current tape cell is 'b', so we follow the $\\overline{\\#}$ direction to go to the # state <br>" +
  //         "Then, erase the value 'b' by making the cell empty (denoted by #).");
  av.umsg(Frames.addQuestion("q14"));
  tape.setCurrentValue("#");
  av.step();

  //Slide 15
  ol.css({'color': 'black'});
  h1.css({'color': 'black'});
  r2.css({'color': 'red'});
  tape.setCurrentValue("#");
  // av.umsg("$R^{2}_{\\#}$: Go to the second space(#) on the right.");
  av.umsg(Frames.addQuestion("q15"));

  av.step();

  //Slide 16
  r2.css({'color': 'black'});
  s1.css({'color': 'red'});
  tape.highlightPosition(3);
  tape.highlightPosition(5);
  // av.umsg("Sigma($\\sigma$): Write the letter we just read to the current tape cell. " +
  //         "<br> We just read 'b', so we need write 'b' to the cell.");
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //Slide 17
  s1.css({'color': 'black'});
  l2.css({'color': 'red'});
  tape.current = 5;
  tape.arr.value(5, 'b');
  av.umsg(Frames.addQuestion("q17"));

  // av.umsg("$L^{2}_{\\#}$: Go to the second space(#) on the left.");
  av.step();

  //Slide 18
  tape.highlightPosition(3);
  tape.highlightPosition(2);
  l2.css({'color': 'black'});
  s2.css({'color': 'red'});
  av.umsg(Frames.addQuestion("q18"));

  // av.umsg("Sigma($\\sigma$): Write the letter we just read to the current tape cell. <br>" +
  //         " We just read 'b', so we need write 'b' to the cell.");
  av.step();

  //Slide 19
  s2.css({'color': 'black'});
  r.css({'color':'red'});
  tape.current = 2;
  tape.arr.value(2, 'b');
  av.umsg(Frames.addQuestion("q19"));

  // av.umsg("The $R$ in red means moving from the current tape cell to the right cell.");

  av.step();

  //Slide 20
  tape.moveRight();
  av.umsg(Frames.addQuestion("q20"));

  // av.umsg("Is the current tape cell a space (i.e. #)?<br>" +
  //         "Yes, it is a space(#), so we follow the # direction to go to the $R_{\\#}$ state. <br>" +
  //         "Then, move to the closest space (denoted by #) on the right.");
  // tape.highlightPosition(6);
  av.step();


  //Slide 21
  r.css({'color': 'black'});
  r3.css({'color':'red'});
  h2.css({'color':'red'});
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //Slide 22
  tape.highlightPosition(6);
  // tape.current = 6;
  // tape.unhighlightCurrent();
  r3.css({'color':'black'});
  h2.css({'color':'black'});

  av.umsg("The final string is 'abab'. We successfully made a duplicate for the string 'ab', " +
          "by using this copy machine.");
  av.label("Initial Tape: ", {top: 200+vspaceForQuestion-60+espaceBtwMachineTape, left: 300-hspaceForQuestion-120});
  av.label("Final Tape: ", {top: 200+vspaceForQuestion-10+espaceBtwMachineTape, left: 300-hspaceForQuestion-120});
  var diff = 45
  var tape1 = av.ds.tape(["#", "a", "b", "#", "#", "#", "#"], 300-hspaceForQuestion, 200+vspaceForQuestion-diff+espaceBtwMachineTape, "both", 3);

  av.recorded();
});
