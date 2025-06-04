/*global Minimizer*/
// Written by Mostafa Mohammed and Cliff Shaffer

// Title: Programmed Instruction: DFA Minimization Example 2
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Deterministic Finite Automata
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction Frameset presenting the algorithm to minimize the number of states in a DFA: Example 2. */

$(document).ready(function() {
  "use strict";
  var av_name = "DFAMinEx2FS";
  var av = new JSAV(av_name);
  var url = "../../../AV/OpenFLAP/machines/FA/stminDFAE2.jff";
  var dfa = new av.ds.FA({top: 0, left: -20, width: 470, height: 450, url: url});
  var mytree = new av.ds.tree({top: 340, left: 10, width: 380, height: 300, editable: true});
  var minm = new Minimizer();
  av.displayInit();
  var newGraphDimensions = {top: 340, left: 310, width: 300, height: 250};
  var piframesLocations = {top: 10, left: -100};
  //minm.minimizeDFA(av, dfa, mytree, newGraphDimensions);
  minimizeDFAWithQuestions(minm, av_name, av, dfa, mytree, newGraphDimensions, piframesLocations);
  av.recorded();
});
