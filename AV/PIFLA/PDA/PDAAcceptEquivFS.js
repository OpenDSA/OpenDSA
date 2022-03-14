$(document).ready(function() {
  "use strict";
  var av_name = "PDAAcceptEquivFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  //Frame 1
  av.umsg("PDAs can support two different types of language acceptance. A natural question is: What is their relationship in terms of the languages that can be recognized?");
  av.displayInit();

  //Frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //Frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //Frame 4
  av.umsg("<b>Theorem:</b> Given NPDA $M$ that accepts by final state, there exists NPDA $M'$ that accepts by empty stack such that $L(M) = L(M')$.");
  av.step();

  //Frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //Frame 6
  av.umsg(Frames.addQuestion("q6"));
  var radiusS = 15;
  var radiusF = 20;
  var figtop = 100;
  var figleft = -40;
  
  // machine and states that are not final states
  av.g.rect(figleft + 190, figtop + 30, 170, 250);
  av.g.circle(figleft + 100, figtop + 100, radiusS);
  av.g.circle(figleft + 220, figtop + 100, radiusS);
  av.g.circle(figleft + 490, figtop + 100, radiusS);

  // final states
  av.g.circle(figleft + 300, figtop + 80, radiusS);
  av.g.circle(figleft + 300, figtop + 80, radiusF);
  av.g.circle(figleft + 300, figtop + 150, radiusS);
  av.g.circle(figleft + 300, figtop + 150, radiusF);
  av.g.circle(figleft + 300, figtop + 220, radiusS);
  av.g.circle(figleft + 300, figtop + 220, radiusF);

  // arrows
  av.g.line(figleft + 50, figtop + 100, figleft + 80, figtop + 100,
            {"arrow-end": "classic-wide-long"});
  av.g.line(figleft + 115, figtop + 100, figleft + 200, figtop + 100,
            {"arrow-end": "classic-wide-long"});
  av.g.polyline([[figleft + 320, figtop + 80], [figleft + 440, figtop + 80],
                 [figleft + 475, figtop + 90]],
                {"arrow-end": "classic-wide-long"});
  av.g.polyline([[figleft + 320, figtop + 150], [figleft + 440, figtop + 150],
                 [figleft + 475, figtop + 110]],
                {"arrow-end": "classic-wide-long"});
  av.g.polyline([[figleft + 320, figtop + 220], [figleft + 440, figtop + 220],
                 [figleft + 485, figtop + 120]],
                {"arrow-end": "classic-wide-long"});
  av.g.polyline([[figleft + 506, figtop + 90], [figleft + 530, figtop + 80],
                 [figleft + 535, figtop + 110],[figleft + 520, figtop + 120],
                 [figleft + 508, figtop + 113]],
                {"arrow-end": "classic-wide-long"});

  // labels  
  av.label("q", {left: figleft + 92, top: figtop + 75});
  av.label("s", {left: figleft + 100, top: figtop + 83});
  av.label("M", {left: figleft + 210, top: figtop + 25});
  av.label("q", {left: figleft + 213, top: figtop + 74});
  av.label("0", {left: figleft + 221, top: figtop + 82});
  av.label("q", {left: figleft + 487, top: figtop + 73});
  av.label("f", {left: figleft + 495, top: figtop + 81});
  av.label("λ, z; zz'", {left: figleft + 125, top: figtop + 65});
  av.label("λ, x; λ", {left: figleft + 390, top: figtop + 45});
  av.label("λ, x; λ", {left: figleft + 390, top: figtop + 115});
  av.label("λ, x; λ", {left: figleft + 390, top: figtop + 185});
  av.label("λ, x; λ", {left: figleft + 500, top: figtop + 110});

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
  av.umsg("<b>Theorem:</b> Given NPDA $M$ that accepts by empty stack, there exists NPDA $M'$ that accepts by final state.<br/>We can use a similar proof.");
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
  av.umsg("So,the two types of PDA acceptance recognize the same set of languages.");
  av.step();

  //Frame 20
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
