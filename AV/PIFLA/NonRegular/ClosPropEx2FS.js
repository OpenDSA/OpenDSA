$(document).ready(function () {
  "use strict";
  var av_name = "ClosPropEx2FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  
  // Frame 1
  av.umsg("Can we prove that $L = \\{a^nb^ma^{m}\\ |\\ m \\ge 0, n \\ge 0 \\}$ is non-regular by using regular language closure properties?");
  av.displayInit();
  
  // Frame 2
  av.umsg(Frames.addQuestion("assume"));
  av.step();
  
  // Frame 3
  av.umsg(Frames.addQuestion("regex"));
  av.step();
  
  // Frame 4
  av.umsg(Frames.addQuestion("intersect"));
  av.step();
  
  // Frame 5
  av.umsg(Frames.addQuestion("homo"));
  av.step();
  
  // Frame 6
  av.umsg(Frames.addQuestion("homo2"));
  av.step();
  
  // Frame 7
  av.umsg(Frames.addQuestion("result"));
  av.step();
  
  // Frame 8
  av.umsg("Assume $L = \\{a^nb^ma^{m}\\ |\\ m \\ge 0, n \\ge 0 \\}$ is regular.<br/> Define $L_1 = \\{ bb^{*}aa^{*}\\}$, and let $L_2 = L \\cap L_1 = \\{b^na^n \\mid n > 0\\}$.<br/>Define homomorphism $h = \\Sigma \\rightarrow \\Sigma^*$ as $h(a) = b\\quad |\\quad h(b) = a$<br/>$h(L_2) = \\{a^nb^n\\ |\\ n > 0 \\}$.<br/><br/>This is a contradiction. So, $L = \\{a^nb^ma^{m}\\ |\\ m \\ge 0, n \\ge 0 \\}$ is not regular.")
  av.step();

  // Frame 9
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
