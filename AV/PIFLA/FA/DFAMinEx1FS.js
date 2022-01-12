/*global Minimizer*/
// Written by Mostafa Mohammed and Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DFAMinEx1FS";
  var av = new JSAV(av_name);
  var url = "../../../AV/OpenFLAP/machines/FA/stminDFA1.jff";
  var dfa = new av.ds.FA({top: 0, left: 10, width: 500, height: 150, url: url});
  var mytree = new av.ds.tree({width: 200, height: 340, editable: true, left: 20, top: 350});
  var minm = new Minimizer();
  av.displayInit();
  var newGraphDimensions = {top: 360, left: 290, width: 380, height: 300};
  var piframesLocations = {top: 10, left: -100};
  //minm.minimizeDFA(av, dfa, mytree, newGraphDimensions);
  minimizeDFAWithQuestions(minm, av_name, av, dfa, mytree, newGraphDimensions, piframesLocations);
  av.recorded();
});
