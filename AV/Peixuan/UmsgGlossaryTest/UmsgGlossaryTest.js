$(document).ready(function() {
  "use strict";
  var av_name = "UmsgGlossaryTest";
  var av = new JSAV(av_name);

  av.displayInit();
  var Frames = PIFRAMES.init(av_name);
  av.umsg(Frames.addQuestion("q1"));
  av.step();
  av.umsg(Frames.addQuestion("q0"));
  av.step();

  av.umsg("A :term:`language` is simply a collection of strings. These ways include :term:`grammars <grammar>`, and other like :term:`regular expressions <regular expression>`");

  av.step();
  av.umsg("There's a lot of nice, tidy code you can write without knowing about :term:`pointers <pointer>`.");
  av.step();

  //not support put glossary in other places rather than the description yet

  av.recorded();
});
