$(document).ready(function() {
  "use strict";
  var av_name = "PDAAcceptanceEquivalenceFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;

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
  av.umsg("$\\textbf{Theorem:}$ Given NPDA $M$ that accepts by final state, $\\exists$ NPDA $M\\prime$ that accepts by empty stack such that $L(M)=L(M\\prime)$.");
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 6
  av.umsg(Frames.addQuestion("q6"));
  var radiusS = 15;
  var radiusF = 20;

  // machine and states that are not final states
  av.g.rect(200, 30, 200, 280);
  av.g.circle(110, 100, radiusS);
  av.g.circle(250, 100, radiusS);
  av.g.circle(540, 100, radiusS);

  // final states
  av.g.circle(340, 80, radiusS);
  av.g.circle(340, 80, radiusF);
  av.g.circle(340, 150, radiusS);
  av.g.circle(340, 150, radiusF);
  av.g.circle(340, 220, radiusS);
  av.g.circle(340, 220, radiusF);

  // arrows
  av.g.line(50,100,85,100,{"arrow-end": "classic-wide-long"});
  av.g.line(132,100,225,100,{"arrow-end": "classic-wide-long"});
  av.g.polyline([[365, 80], [490, 80], [515, 90]], {"arrow-end": "classic-wide-long"});
  av.g.polyline([[365, 150], [490, 150], [515, 110]], {"arrow-end": "classic-wide-long"});
  av.g.polyline([[365, 220], [490, 220], [525, 125]], {"arrow-end": "classic-wide-long"});
  av.g.polyline([[558, 90], [590, 80], [585, 110],[570, 120], [560, 113]], {"arrow-end": "classic-wide-long"});

  // labels  
  av.label("q", {left: 100, top: 75});
  av.label("s", {left: 108, top: 83});
  av.label("M", {left: 250, top: 25});
  av.label("q", {left: 240, top: 75});
  av.label("0", {left: 248, top: 83});
  av.label("q", {left: 523, top: 75});
  av.label("f", {left: 541, top: 83});
  av.label("λ , z; zz'", {left: 130, top: 65});
  av.label("λ , x; λ", {left: 420, top: 45});
  av.label("λ , x; λ", {left: 420, top: 115});
  av.label("λ , x; λ", {left: 420, top: 185});
  av.label("λ , x; λ", {left: 600, top: 70});
  
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
  av.step();

  //Frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //Frame 12
  av.umsg("Theorem: Given NPDA $M$ that accepts by empty stack, $\\exists$ NPDA $M′$ that accepts by final state<br/>We will follow the same steps as what we did in the previous proof.");
  av.step();

  //Frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //Frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //Frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //Frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //Frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //Frame 18
  av.umsg(Frames.addQuestion("q18"));
  av.step();

  //Frame 19
  av.umsg(Frames.addQuestion("q19"));
  av.step();

  //Frame 20
  av.umsg("So, having any type of PDA acceptance, we can easily convert it to the other type.");
  av.recorded();
});