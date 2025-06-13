/*global Minimizer*/
// Written by Mostafa Mohammed and Cliff Shaffer

// Title: Programmed Instruction: DFA Minimization Example 1
// Author: Mostafa Mohammed; Cliff Shaffer
// Institution: Virginia Tech
// Features: Programmed Instruction
// Keyword: Deterministic Finite Automata
// Natural Language: en
// Programming Language: N/A
/* Description: Programmed Instruction Frameset presenting the algorithm to minimize the number of states in a DFA: Example 1. */

$(document).ready(function() {
  "use strict";
  var av_name = "DFAMinEx1FS";
  var av = new JSAV(av_name);
  var url = "../../../AV/OpenFLAP/machines/FA/stminDFA1.jff";
  var dfa = new av.ds.FA({top: 0, left: 10, width: 500, height: 150, url: url});
  var mytree = new av.ds.tree({width: 180, height: 250, editable: true, left: 10, top: 270});
  var minm = new Minimizer();
  av.displayInit();
  var newGraphDimensions = {top: 275, left: 290, width: 300, height: 250};
  var piframesLocations = {top: 10, left: -100};
  //minm.minimizeDFA(av, dfa, mytree, newGraphDimensions);
  minimizeDFAWithQuestions(minm, av_name, av, dfa, mytree, newGraphDimensions, piframesLocations);
  av.recorded();
});
