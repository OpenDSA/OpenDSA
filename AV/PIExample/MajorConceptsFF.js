$(document).ready(function() {
"use strict";
var av_name = "MajorConceptsFF";
var av = new JSAV(av_name);
var Frames = PIFRAMES.init(av_name);
var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
	interpret = config.interpreter,
	code = config.code;
var goNext = false;

//Frame 1
av.umsg("A <b>language</b> is simply a collection of strings. A fundamental thing to be able to do with a string is to determine whether or not it is part of a given language. Let’s formally define the concept of a “language”. But first we need some stuff to make them from.");
av.displayInit();
//Frame 2
av.umsg(Frames.addQuestion("q1"));
av.step();
//Frame 3
av.umsg(Frames.addQuestion("q111"));
av.step();
//Frame 4
av.umsg(Frames.addQuestion("q2"));
av.step();
//Frame 5
av.umsg(Frames.addQuestion("q2_2"));
av.step();
//Frame 6
av.umsg(Frames.addQuestion("q2_3"));
av.step();
//Frame 7
av.umsg(Frames.addQuestion("q3"));
av.step();
//Frame 8
av.umsg(Frames.addQuestion("q3_2"));
av.step();
//Frame 9
av.umsg(Frames.addQuestion("q3_3"));
av.step();
//Frame 10
av.umsg(Frames.addQuestion("q3_4"));
av.step();
//Frame 11
av.umsg(Frames.addQuestion("q3_5"));
av.step();
//Frame 12
av.umsg(Frames.addQuestion("q4"));
av.step();
//Frame 13
av.umsg(Frames.addQuestion("q5"));
av.step();
//Frame 14
av.umsg(Frames.addQuestion("q5_1"));
av.step();
//Frame 15
av.umsg(Frames.addQuestion("q6"));
av.step();
//Frame 16
av.umsg(Frames.addQuestion("q7"));
av.step();
//Frame 17
av.umsg(Frames.addQuestion("q7_1"));
av.step();
//Frame 18
av.umsg("Sometimes we want to talk about the string that has no characters. If we literally wrote a string with no characters, it would be hard for you to understand what we wrote! So we have a special symbol to use for the empty string: $\\lambda$ and it is called $\\textit{lambda}.");
av.step();
//Frame 19
av.umsg(Frames.addQuestion("q8_1"));
av.step();
//Frame 20
av.umsg(Frames.addQuestion("q8"));
av.step();
//Frame 21
av.umsg(Frames.addQuestion("q9"));
av.step();
//Frame 22
av.umsg(Frames.addQuestion("q10"));
av.step();
//Frame 23
av.umsg(Frames.addQuestion("q11"));
av.step();
//Frame 24
av.umsg(Frames.addQuestion("q12"));
av.step();
//Frame 25
av.umsg(Frames.addQuestion("q12_1"));
av.step();
//Frame 26
av.umsg(Frames.addQuestion("q13"));
av.step();
//Frame 27
av.umsg(Frames.addQuestion("q14"));
av.step();
//Frame 28
av.umsg(Frames.addQuestion("q15"));
av.step();
//Frame 29
av.umsg(Frames.addQuestion("q16"));
av.step();
//Frame 30
av.umsg(Frames.addQuestion("q17"));
av.step();
//Frame 31
av.umsg(Frames.addQuestion("q18"));
av.step();
//Frame 32
av.umsg(Frames.addQuestion("q19"));
av.step();
//Frame 33
av.umsg(Frames.addQuestion("q19_1"));
av.step();
//Frame 34
av.umsg("Completed.");
av.step();

av.recorded();
});
