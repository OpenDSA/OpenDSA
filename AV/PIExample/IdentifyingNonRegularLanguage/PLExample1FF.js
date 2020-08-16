$(document).ready(function () {
  "use strict";
  var av_name = "PLExample1FF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("Prove that $L = \\{a^nb^n | n \\geq 0\\}$ is not regular.");
  av.displayInit();

  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();

  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg(Frames.addQuestion("q10"));
  av.step();

  //frame 11
  av.umsg(Frames.addQuestion("q11"));
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg(Frames.addQuestion("q17"));
  av.step();

  //frame 18
  av.umsg("Correct. We have proved that the language $a^nb^n$ is not regular.");
  av.step();

  //frame 19
  av.umsg("What will happen if we selected a different string for $w$?.");
  av.step();

  //frame 20
  av.umsg(Frames.addQuestion("q20"));
  av.step();

  //frame 21
  av.umsg(Frames.addQuestion("q21"));
  av.step();

  //frame 22
  av.umsg(Frames.addQuestion("q22"));
  av.step();

  //frame 23
  av.umsg("Exactly, since we have multiple division for the string $w$, we must prove that all possible divisions will lead to show that the language is not regular.");
  av.step();

  //frame 24
  av.umsg("So, what is the difference. The main difference is the correct choice for the string $w$. Every time we need to prove that a language is not regualr. We must select a $\\textbf{good}$ string.");
  av.step();

  //frame 25
  av.umsg("In pumping lemma proofs, a major condition to takecare of is $|w| \\ge m$. So, select a string that has only one division for $w$ into $xyz$ as possible.");
  av.step();

  //frame 26
  av.umsg("In case that you selected a string with different cases, you must prove that all divisions are leading to one conclusion that the language is not regular.");
  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  av.step();

  //frame 28
  av.umsg(Frames.addQuestion("q28"));
  av.step();

  //frame 29
  av.umsg(Frames.addQuestion("q29"));
  av.step();

  //frame 30
  av.umsg("Now, let us continue the proof with $w = a^{m/2}b^{m/2}$.<br/>Case 1: $y$ is only $a\\prime$s. This means that $x$ can be any number of $a$'s, $y$ is some $a$'s, and $z$ is the remaining. Selecting any division where $y$ is some $a\\prime$s will lead to the same result.");
  av.step();

  //frame 31
  av.umsg(Frames.addQuestion("q31"));
  av.step();

  //frame 32
  av.umsg(Frames.addQuestion("q32"));
  av.step();

  //frame 33
  av.umsg(Frames.addQuestion("q33"));
  av.step();

  //frame 34
  av.umsg(Frames.addQuestion("q34"));
  av.step();

  //frame 35
  av.umsg(Frames.addQuestion("q35"));
  av.step();

  //frame 36
  av.umsg("Now we only prove that, if $y$ is only some $a\\prime$s, the generated string is $\\not \\in L$. Next step is to prove the second case, $y$ can be form $b\\prime$s only");
  av.step();

  //frame 37
  av.umsg(Frames.addQuestion("q37"));
  av.step();

  //frame 38
  av.umsg(Frames.addQuestion("q38"));
  av.step();

  //frame 39
  av.umsg(Frames.addQuestion("q39"));
  av.step();

  //frame 40
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 41
  av.umsg("Now we only prove that, if $y$ is only some $b\\prime$s, the generated string is $\\not \\in L$. Next step is to prove the third case, $y$ can be form $a\\prime$s and $b\\prime$s");
  av.step();

  //frame 42
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 43
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 44
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 45
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 46
  av.umsg(Frames.addQuestion("q40"));
  av.step();

  //frame 47
  av.umsg("Now we can conclude that $L$ is not regular.");
  av.step();

  //frame 48
  av.umsg(Frames.addQuestion("q48"));
  av.step();

  //frame 49
  av.umsg("As you will see in the examples below, all pumping lemma proves will follow the same steps. All what you need is to select a good string.");
  av.recorded();
});