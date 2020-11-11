/*global PIFRAMES */
/* Written by Eunoh Cho, Mostafa Mohammed, Cliff Shaffer */
$(document).ready(function() {
  "use strict";
  var av_name = "LanguagesFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("A :term:`language` is simply a collection of strings. A fundamental thing to be able to do with a string is to determine whether or not it is part of a given language. We will give a way to formally define a particular language. But first we need some notations to use.");
  av.displayInit();
  // Frame 2
  av.umsg(Frames.addQuestion("alpha"));
  av.step();
  // Frame 3
  av.umsg(Frames.addQuestion("char"));
  av.step();
  // Frame 4
  av.umsg(Frames.addQuestion("strings"));
  av.step();
  // Frame 5
  av.umsg(Frames.addQuestion("stringnotset"));
  av.step();
  // Frame 6
  av.umsg(Frames.addQuestion("badchar"));
  av.step();
  // Frame 7
  av.umsg(Frames.addQuestion("examplelang"));
  av.step();
  // Frame 8
  av.umsg(Frames.addQuestion("notset"));
  av.step();
  // Frame 9
  av.umsg(Frames.addQuestion("isset"));
  av.step();
  // Frame 10
  av.umsg("For $\\Sigma$={$a,b,c\\}$, $L=\\{ab,ac,cabb\\}$ is an example of a <b>finite</b> language, because there are only three strings in the language.");
  av.step();
  // Frame 11
  av.umsg(Frames.addQuestion("infinite"));
  av.step();
  // Frame 12
  av.umsg("For $\\Sigma$={$0,1,2,3,4,5,6,7,8, 9\\}$, $L=\\{set\\ of\\ all\\ even\\ numbers\\}$ is a somewhat informal way to describe a language.");
  av.step();
  // Frame 13
  av.umsg(Frames.addQuestion("empty"));
  av.step();
  // Frame 14
  av.umsg(Frames.addQuestion("emptysymbol"));
  av.step();
  // Frame 15
  av.umsg(Frames.addQuestion("stringname"));
  av.step();
  // Frame 16
  av.umsg(Frames.addQuestion("charname"));
  av.step();
  // Frame 17
  av.umsg(Frames.addQuestion("size"));
  av.step();
  // Frame 18
  av.umsg(Frames.addQuestion("concat"));
  av.step();
  // Frame 19
  av.umsg(Frames.addQuestion("nocirc"));
  av.step();
  // Frame 20
  av.umsg("Sometimes we want to talk about the string that has no characters. If we literally wrote a string with no characters, it would be hard for you to understand what we wrote! So we have a special symbol to use for the empty string: $\\lambda$. It is called <b>lambda</b>.");
  av.step();
  // Frame 21
  av.umsg(Frames.addQuestion("emptystring"));
  av.step();
  // Frame 22
  av.umsg("Note the difference. $L_1 = \\{\\}$ is the language with no strings in it. But $L_2 = \\{ \\lambda \\}$ is the language that has just one string in it: the empty string. The empty string is a perfectly fine string, and a language with the empty string is different from a language with no strings at all.");
  av.step();
  // Frame 23
  av.umsg(Frames.addQuestion("selfconcat"));
  av.step();
  // Frame 24
  av.umsg(Frames.addQuestion("identity"));
  av.step();
  // Frame 25
  av.umsg(Frames.addQuestion("reverse"));
  av.step();
  // Frame 26
  av.umsg(Frames.addQuestion("revlength"));
  av.step();
  // Frame 27
  av.umsg(Frames.addQuestion("closure"));
  av.step();
  // Frame 28
  av.umsg(Frames.addQuestion("closurex"));
  av.step();
  // Frame 29
  av.umsg(Frames.addQuestion("plus"));
  av.step();
  // Frame 30
  av.umsg(Frames.addQuestion("union"));
  av.step();
  // Frame 31
  av.umsg(Frames.addQuestion("intersect"));
  av.step();
  // Frame 32
  av.umsg(Frames.addQuestion("comp"));
  av.step();
  // Frame 33
  av.umsg(Frames.addQuestion("concatsets"));
  av.step();
  // Frame 34
  av.umsg(Frames.addQuestion("selfconset"));
  av.step();
  // Frame 35
  av.umsg(Frames.addQuestion("setconx"));
  av.step();
  // Frame 36
  av.umsg(Frames.addQuestion("setcon3"));
  av.step();
  // Frame 37
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
