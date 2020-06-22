$(document).ready(function() {
  "use strict";
  var av_name = "DFAIntersectionCON";
  var av = new JSAV(av_name);
  av.umsg("In this example, we will create a DFA for the intersection of two languages.");
  av.displayInit();
  av.umsg("We begin with DFAs for the languages $L_1 = a^*b$ and $L_2 = aa\\{a|b\\}^*$.");
  var url1 = "../../../AV/VisFormalLang/Regular/Machines/DFAIntersection1CON.jff";
  new av.ds.FA({left: 50, top: -20, url: url1});
  var url2 = "../../../AV/VisFormalLang/Regular/Machines/DFAIntersection2CON.jff";
  new av.ds.FA({right: 0, top: -38, url: url2});
  av.step();
  av.umsg("The DFA for the intersection of the two languages is shown at the bottom.");
  var url3 = "../../../AV/VisFormalLang/Regular/Machines/DFAIntersection3CON.jff";
  new av.ds.FA({left: 200, top: 80, url: url3});
  av.recorded();
});
