$(document).ready(function() {
  "use strict";
  var av_name = "PDAAcceptEquivFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("A given PDA might operate under one of two language acceptance criteria: Final state or empty stack. A natural question then becomes: Is there any differnce in the languages that each type of PDA can recognize?");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("equiv"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("FS"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("ES"));
  var radiusS = 15;
  var radiusF = 20;
  var figtop = 100;
  var figleft = -40;
  
  // machine and states that are not final states
  av.g.rect(figleft + 190, figtop + 30, 170, 250);
  av.g.circle(figleft + 100, figtop + 100, radiusS);
  av.g.circle(figleft + 220, figtop + 100, radiusS);
  av.g.circle(figleft + 490, figtop + 100, radiusS);
  // Circle to make the added q_f final
  var ffcirc = av.g.circle(figleft + 490, figtop + 100, radiusF);
  ffcirc.hide();
  
  // final states
  av.g.circle(figleft + 300, figtop + 80, radiusS);
  var fcirc1 = av.g.circle(figleft + 300, figtop + 80, radiusF);
  av.g.circle(figleft + 300, figtop + 150, radiusS);
  var fcirc2 = av.g.circle(figleft + 300, figtop + 150, radiusF);
  av.g.circle(figleft + 300, figtop + 220, radiusS);
  var fcirc3 = av.g.circle(figleft + 300, figtop + 220, radiusF);

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
  var polyf = av.g.polyline([[figleft + 506, figtop + 90], [figleft + 530, figtop + 80],
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
  av.label("λ, Z; ZZ'", {left: figleft + 125, top: figtop + 65});
  var labx1 = av.label("λ, x; λ", {left: figleft + 390, top: figtop + 45});
  var labx2 = av.label("λ, x; λ", {left: figleft + 390, top: figtop + 115});
  var labx3 = av.label("λ, x; λ", {left: figleft + 390, top: figtop + 185});
  var labx4 = av.label("λ, x; λ", {left: figleft + 500, top: figtop + 110});
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("add2"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("zprime"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("start"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("nofinal"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("gamma"));
  av.step();

  // Frame 10
  av.umsg("Good. We have shown how to convert a PDA that accepts by final state into an equivalent one that accepts by empty stack. Now we need to do the other direction to show that these two definitions are effectively the same.<br/><br/><b>Theorem:</b> Given NPDA $M$ that accepts by empty stack, there exists NPDA $M'$ that accepts by final state.<br/>We can use a similar proof.");

  // Update the diagram for second proof
  fcirc1.hide();  
  fcirc2.hide();  
  fcirc3.hide();  
  ffcirc.show();
  labx1.hide();
  labx2.hide();
  labx3.hide();
  labx4.hide();
  polyf.hide();
  var labx1b = av.label("λ, Z'; λ", {left: figleft + 390, top: figtop + 45});
  var labx2b = av.label("λ, Z'; λ", {left: figleft + 390, top: figtop + 115});
  var labx3b = av.label("λ, Z'; λ", {left: figleft + 390, top: figtop + 185});
  av.step();

  // Frame 11
  av.umsg(Frames.addQuestion("ES2"));
  av.step();

  // Frame 12
  av.umsg(Frames.addQuestion("FS2"));
  av.step();

  // Frame 13
  av.umsg(Frames.addQuestion("add2again"));
  av.step();

  // Frame 14
  av.umsg(Frames.addQuestion("addZprime"));
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("newqs"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("newfs"));
  av.step();

  //  // Frame 17
  // Some proofs for this require that the start state not be a final state.
  // I think we don't need this simplifying assumption because of
  // the way this proof is written. But I am leaving this in as a
  // comment in case there is a flaw in the argument and we need this
  // question later (since it is a good question if we need the assumption).
  //  av.umsg(Frames.addQuestion("simplify"));
  //  av.step();

  // Frame 17
  av.umsg(Frames.addQuestion("allnodes"));
  av.step();

  // Frame 18
  av.umsg("So,the two types of PDA acceptance recognize the same set of languages.");
  av.step();

  // Frame 19
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
