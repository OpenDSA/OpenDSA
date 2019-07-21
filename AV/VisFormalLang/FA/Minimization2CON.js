/*global Minimizer*/
$(document).ready(function() {
  "use strict";
  var av_name = "Minimization2CON";
  var av = new JSAV(av_name);
  var url = "../../../AV/VisFormalLang/FA/Machines/stminDFAE2.jff";
  var dfa = new av.ds.FA({top: 0, left: -20, width: 470, height: 450, url: url});
  var mytree = new av.ds.tree({top: 0, left: 500, width: 420, height: 340, editable: true});
  var minm = new Minimizer();
  av.displayInit();
  var newGraphDimensions = {top: 275, left: 450, width: 360, height: 250};
  minm.minimizeDFA(av, dfa, mytree, newGraphDimensions);
  av.recorded();
});
