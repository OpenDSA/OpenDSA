$(document).ready(function() {
  "use strict";
  var av_name = "DFAMinimizationStepsFF";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);
  var config = ODSA.UTILS.loadConfig({ av_name: av_name });

  //frame 1  
  av.umsg("As we seen, there is a process that we can follow to minimize any DFA.");
  av.displayInit();
  //frame 2
  av.umsg("Unfortunately, this is not obviously an algorithm, since we cannot actually test on all input strings.");
  av.step();
  //frame 3  
  av.umsg("But remember the definition for $\\delta^*(p,w). Look at things this way: It is telling us that we don’t care about the prior history before we got to the current state with whatever remains of the input.");
  av.step();
  //frame 4
  av.umsg("So, we can look at each transition out of two subsets being considered, and verify that they lead to “equivalent” places (which is not the same as leading to the same state in the non-minimized machine).");
  av.step();
  //frame 5  
  av.umsg("We will start with the maximum possible joining of states as a potential equivalence class, and see if we find evidence that forces us to break them apart as we consider the various transitions.");
  av.step();
  //frame 6
  av.umsg("We will build a tree, whose root has all states in the original machine.");
  av.step();
  //frame 7  
  av.umsg("The first step will always be to split the states into the subset of non-final vs. the subset of final states, so these are the children of the root.");
  av.step();
  //frame 8
  av.umsg("We then look at each current leaf node of the tree, and check the transitions from each of the states in that leaf.");
  av.step();
  //frame 9
  av.umsg("We test a given character against the states in that subset to see if they all go to the same subset.");
  av.step();
  //frame 
  av.umsg("Split them up when they do not go to the same place.");
  av.step();
  //frame 
  av.umsg("Completed.");
  av.recorded();


});