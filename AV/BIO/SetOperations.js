"use strict";

$(document).ready(function () {
  var av_name = "SetOperations";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);
  //var set=["pop","rock","soul","Hard rock","rock","rock","Easy"]
  var pseudo = jsav.code(code[0]);
  //coding_dna[0].css().addClass("markpath");
  jsav.displayInit();
  jsav.umsg("initialize set1");
  pseudo.setCurrentLine(1);
  jsav.step();
  jsav.umsg("show set after remove duplicate because set doesn't allow duplicate values ");
  pseudo.unhighlight(1);
  pseudo.setCurrentLine(2);
  var set = jsav.label("{pop,rock,soul,Hard rock,Easy}",{left:0, top:0})
  jsav.step();
  jsav.umsg("initialize another 2 sets (set 2 ,set 3)");
  set.hide()
  pseudo.unhighlight(2);
  pseudo.setCurrentLine(3);
  pseudo.highlight(4);
  jsav.step();
  jsav.umsg(" add element to set in random place ");
  set.hide();
  var set1 = jsav.label("{AbdElrahman,Osama,Omar,Salah}",{left:0, top:0})

  pseudo.unhighlight(4);
  pseudo.setCurrentLine(5);
  jsav.step();
  set1.hide();
  jsav.umsg("this function add items from another set(set2) into the current set(set1)");
  var set2 = jsav.label("{AbdElrahman,Osama,Omar,Salah,Nader,Amr,Ali}",{left:0, top:0})
  pseudo.unhighlight(5);
  pseudo.setCurrentLine(6);
  jsav.step();
  jsav.umsg("current 2 functiom add items for removing specific element from current set (set1)");
  var set3 = jsav.label("{AbdElrahman,Omar,Salah,Nader,Amr,Ali}",{left:0, top:0})
  set2.hide();
  pseudo.unhighlight(6);
  pseudo.setCurrentLine(7);
  pseudo.highlight(8);
  jsav.step();
  set3.hide();
  jsav.umsg("initialize another set (set 4)");

  pseudo.unhighlight(7);
  pseudo.unhighlight(8);
  pseudo.setCurrentLine(9);
  jsav.step();
  jsav.umsg("this function return a new set which contain elements are present in both set  ");
  var set4 = jsav.label("{Ali}",{left:0, top:0})
  pseudo.unhighlight(9);
  pseudo.setCurrentLine(10);
  pseudo.highlight(11);
  jsav.step();
  jsav.umsg("this function will keep only the items that are present in both sets.");
  set4.hide();
  var set5 = jsav.label("set2 = {Ali}",{left:0, top:0})
  pseudo.unhighlight(10);
  pseudo.unhighlight(11);
  pseudo.setCurrentLine(12);
  jsav.step();
  jsav.umsg("initialize another 2 sets (set 5 ,set 6)");
  set5.hide();
  pseudo.unhighlight(12);
  pseudo.setCurrentLine(13);
  pseudo.highlight(14);

  jsav.step();
  jsav.umsg("this function will keep only the elements that are NOT present in both sets.");
  var set6 = jsav.label("{AbdElrahman,Omar,Salah,Nader,Amr,Ali}",{left:0, top:0})

  pseudo.unhighlight(14);
  pseudo.setCurrentLine(15);
  jsav.step();
  jsav.umsg("this function  return a new set which contain element that are NOT present in both sets.");
  var set7 = jsav.label("set 7 ={AbdElrahman,Omar,Salah,Nader,Amr,Ali}",{left:0, top:0})
  set6.hide()
  pseudo.unhighlight(15);
  pseudo.setCurrentLine(16);
  pseudo.highlight(17);

  jsav.recorded();
});
