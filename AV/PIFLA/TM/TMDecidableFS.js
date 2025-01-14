$(document).ready(function () {
  "use strict";

  var av_name = "TMDecidableFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var xStart = 150;
  var yStart = 0;

  // Frame 1
  av.umsg("Recall that a Turing machine can accept or reject a string. We also noted that a Turing machine can go into an infinite loop. We will now examine that concept more closely.");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("accept"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("halts"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("decideable"))
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("acceptable"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("difference"));
  av.step();

  // Frame 7
  av.umsg("It is easy to turn any Turing-decidable machine into a Turing-acceptable machine. If the machine would reject the string, then simply go into an infinite loop by moving right regardless of the value of the symbol seen. But, can every Turing-acceptable machine be converted into a Turing-decidable machine?");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("noa"));
  av.step();
  
  // Frame 9
  av.umsg(Frames.addQuestion("TA"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("remove"));
  av.step();

  // Frame 11
  av.umsg("Here is the modified machine: <br>  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q &nbsp; &nbsp; σ &nbsp; &nbsp; δ(q,σ,{R,L,S})</i> <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-------------------------------- <br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; a &nbsp; &nbsp; (h, a, R)</i> <br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<i>q<sub>0</sub> &nbsp; b  &nbsp; &nbsp; (q<sub>0</sub>, b, R)</i>");
  av.step();

  // Frame 12
  av.umsg("All that we have done is remove the transition for what to do when a blank symbol is seen. Thus, the machine halts instead of moving to the right.<br/><br/>You might ask: But what if there is an 'a' to the right of the #? Recall that we only care about the machine's behavior when it begins in a legal start configuration. And since # is not in the language alphabet, it cannot be in a properly configured string.");
  av.step();

  //frame 15
  av.umsg("Again we can ask: Is every Turing-acceptable language Turing decidable? In other words, whenever the Turing-acceptable machine would hang, can we always replace it with logic to trigger a non-existant transition instead? This is known as the <b><i>Halting Problem</i></b>. <br><br> It turns out that we can prove that there are always languages that cannot be converted from Turing-acceptable to Turing-decidable. In other words, we can <b>prove</b> that the Halting Problem is unsolveable.");
  av.step();

  // Frame
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
