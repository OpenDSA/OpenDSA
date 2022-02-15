$(document).ready(function () {
  "use strict";
  var av_name = "ClosPropFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("We now show how to use closure properties of regular languages to prove a language non-regular. This works by converting your language in question into a language which you already know is non-regular. This will lead to a contradiction. Then you can conclude that the language in hand is non-regular");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("recall"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("recall2"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("result"));
  av.step();

  // Frame 5
  av.umsg("<b>Proof outline:</b> Assume $L$ is regular<br/>Apply operations to $L$ that we know are closed for regular languages, and perhaps we include other languages that we know are regular as part of the closed operation. (The goal is to construct $L'$ that you know is non-regular.)<br/>If $L$ were regular, and if we apply closed operations on $L$, then the result must be regular.<br/>However, $L'$ is non-regular. This is a contradiction.</br/>So, our assumption that $L$ is regular must be false. $L$ is non-regular.");
  av.step();

  // Frame 6
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
