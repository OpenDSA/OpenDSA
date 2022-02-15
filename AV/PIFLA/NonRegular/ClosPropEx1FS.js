$(document).ready(function () {
  "use strict";
  var av_name = "ClosPropEx1FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Can we prove that $L = \\{a^3b^nc^{n-3}\\ |\\ n > 3 \\}$ is non-regular by using regular language closure properties?");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("assume"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("homo"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("outcome"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("finite"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("b6concat"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("smallstring"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("union"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("result"));
  av.step();

  av.umsg("So we have: $L = \\{a^3b^nc^{n-3}\\ |\\ n > 3 \\}$<br/>Homomorphism $h$ is: $\\Sigma \\rightarrow \\Sigma^*$.<br/>$h(a) = a\\quad |\\quad h(b) = a\\quad |\\quad h(c) = b$<br/>So, $h(L) = \\{a^3a^nb^{n-3}\\ |\\ n > 3 \\} = \\{a^{n+3}b^{n-3}\\ |\\ n > 3\\}$<br/><br/>$L' = h(L)b^6 = \\{a^{n+3}b^{n+3}\\ |\\ n > 3\\}$<br/>$L_4 = L' \\cup \\{ab, aabb, aaabbb \\} = \\{a^nb^n\\ |\\ n > 0\\}$.<br/><br/>This is a contradiction. So, $L = \\{a^3b^nc^{n-3}\\ |\\ n > 3 \\}$ is not regular.");
  av.step();

  // Frame 10
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
