$(document).ready(function() {
  "use strict";
  var av_name = "CFLPumpingLemmaExample4FF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    interpret = config.interpreter,
    code = config.code;
  var goNext = false;

//Frame 1
av.umsg("Prove that the following Languages is not CFL<br/>$L = \\{w{\\bar w}w : w\\in \\Sigma^*\\}, \\Sigma = \\{a, b\\}$, where $\\bar w$ is the string $w$ with each occurence of $a$ replaced by $b$ and each occurence of $b$ replaced by $a$.");
av.displayInit();

//Frame 2
av.umsg(Frames.addQuestion("q2"));
av.step();

//Frame 3
av.umsg(Frames.addQuestion("q3"));
av.step();

//Frame 4
av.umsg(Frames.addQuestion("q4"));
av.step();

//Frame 5
av.umsg(Frames.addQuestion("q5"));
av.step();

//Frame 6
av.umsg(Frames.addQuestion("q6"));
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
av.umsg(Frames.addQuestion("q12"));
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
av.umsg(Frames.addQuestion("q20"));
av.step();

//Frame 21
av.umsg(Frames.addQuestion("q21"));
av.step();

//Frame 22
av.umsg(Frames.addQuestion("q22"));
av.step();

//Frame 23
av.umsg(Frames.addQuestion("q23"));
av.step();

//Frame 24
av.umsg(Frames.addQuestion("q24"));
av.step();

//Frame 25
av.umsg(Frames.addQuestion("q25"));
av.step();

//Frame 26
av.umsg(Frames.addQuestion("q26"));
av.step();

//Frame 27
av.umsg(Frames.addQuestion("q27"));
av.step();

//Frame 28
av.umsg(Frames.addQuestion("q28"));
av.step();

//Frame 29
av.umsg(Frames.addQuestion("q29"));
av.step();

//Frame 30
av.umsg(Frames.addQuestion("q30"));
av.step();

//Frame 31
av.umsg(Frames.addQuestion("q31"));
av.step();

//Frame 32
av.umsg(Frames.addQuestion("q32"));
av.step();

//Frame 33
av.umsg(Frames.addQuestion("q33"));
av.step();

//Frame 34
av.umsg(Frames.addQuestion("q34"));
av.step();

//Frame 35
av.umsg(Frames.addQuestion("q35"));
av.step();

//Frame 36
av.umsg(Frames.addQuestion("q36"));
av.step();

//Frame 37
av.umsg(Frames.addQuestion("q37"));
av.step();

//Frame 38
av.umsg("Thus, there is no breakdown of $w$ into $uvxyz$ such that $|vy| \\ge 1$, $|vxy| \\le m$ and for all $i \\ge 0$, $uv^ixy^iz$ is in $L$. This is a contradiction, thus, L is not a CFL. Done.");
av.recorded();

});