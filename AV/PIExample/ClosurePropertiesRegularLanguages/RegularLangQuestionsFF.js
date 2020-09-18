$(document).ready(function () {
  "use strict";
  var av_name = "RegularLangQuestionsFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;
  
  //frame 1
  av.umsg("Let us answer some questions about Regular Languages.");
  av.displayInit();
  
  //frame 2
  av.umsg("Suppose we have $L$ is a regular language.");
  av.step();

  //frame 3
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $w \\in L$?");
  av.step();

  //frame 4
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $w \\in L$?<br/>Answer: Construct a FA and test if it accepts $w$");
  av.step();
  
  //frame 5
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $L$ is empty?");
  av.step();

  //frame 6
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $L$ is empty?<br/>Construct a FA. If there is a path from the start state to any final state, then $L$ is not empty.");
  av.step();

  //frame 7
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if the complement of $L$ is regular?<br/>Simply take the DFA and reverse the final and non-final states.");
  av.step();

  //frame 8
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $L$ is finite?");
  av.step();

  //frame 9
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $L$ is finite?<br/>This was easy! But we will see in other contexts that complement is not so simple to decide.");
  av.step();
  
  //frame 10
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $L$ is infinite?");
  av.step();

  //frame 11
  av.umsg("Given $L, \\Sigma, w \\in \\Sigma^*$. How can we determine if $L$ is finite?<br/>Construct a FA. Determine if any of the vertices on a path from the start state to a final state are the base of some cycle. If so, then $L$ is infinite");
  av.step();
  
  //frame 3
  av.umsg("Given $L_1$ and $L_2$. How can we determine if $L_1 = L_2$?");
  av.step();

  //frame 3
  av.umsg("Given $L_1$ and $L_2$. How can we determine if $L_1 = L_2$?<br/>Construct $L_3 = (L_1 \\cap \\bar{L_2}) \\cup (\\bar{L_1} \\cap L_2)$, then $L_1 = L_2$");
  av.step();

  //frame 
  av.step("Completed.");
  av.recorded();

});