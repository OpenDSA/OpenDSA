$(document).ready(function() {
  "use strict";

  var av_name = "RENFAtoDFACON";
  var av = new JSAV(av_name);
  av.umsg("In this example, we will convert the NFA that accepts $ab^*+c$ to a minimized DFA.");
  av.displayInit();
  var url1 = "../../../AV/VisFormalLang/Regular/Machines/ABStarOrC.jff";
  new av.ds.FA({left: 10, top: 0, width: 300, url: url1});
  av.step();
  av.umsg("After applying the NFA to DFA algorithm covered in chapter 3, the resulting DFA will be:");
  var url2 = "../../../AV/VisFormalLang/Regular/Machines/ABStarOrCDFA.jff";
  new av.ds.FA({left: 400, top: 0, width: 300, height: 350, url: url2});
  av.step();
  av.umsg("Finally, the minimized DFA is");
  var url3 = "../../../AV/VisFormalLang/Regular/Machines/ABStarOrCMinDFA.jff";
  new av.ds.FA({left: 300, top: 200, url: url3});
  av.recorded();
});
