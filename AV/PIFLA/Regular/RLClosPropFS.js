/*global PIFRAMES */

// Title: Basic Closure Properties of Regular Languages
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Regular Language; Closure Property
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction Frameset presenting some basic operations that are closed for regular languages, like intersection. */

$(document).ready(function () {
  "use strict";
  var av_name = "RLClosPropFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("Now we'll discuss properties for regular languages. We will start with properties that we already know are closed for regular languages.");
  av.displayInit();

  // Frame 2
  av.umsg(Frames.addQuestion("RLreview"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("union"));
  av.step();

  // Frame 4
  av.umsg(Frames.addQuestion("unionways"));
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("concat"));
  av.step();

  // Frame 6
  av.umsg(Frames.addQuestion("concatways"));
  av.step();

  // Frame 7
  av.umsg(Frames.addQuestion("star"));
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("starways"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("complement"));
  av.step();

  // Frame 10
  av.umsg(Frames.addQuestion("reverse"));
  av.step();
  
  // Frame 11
  av.umsg(Frames.addQuestion("intersect"));
  av.step();
  
  // Frame 12
  av.umsg(Frames.addQuestion("setdiff"));
  av.step();
  
  // Frame 13
  av.umsg(Frames.addQuestion("setdiff2"));
  av.step();

  // Frame 14
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
