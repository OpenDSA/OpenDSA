/*global ODSA */
// Written by Mohammed Farghally and Cliff Shaffer
// Insertion Sort Average Case
$(document).ready(function() {
  "use strict";
  var av_name = "InsertionSortAverageCaseCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]).hide();
  var arr;
  function insert_equation(current, added) {
    var new_equation;
    var end_index = current.indexOf("\\end{eqnarray*}");
    new_equation = current.substr(0, end_index) + added + current.substr(end_index);
    return new_equation;
  }

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  pseudo.show();
  av.umsg(interpret("sc2"));
  arr = av.ds.array(["0", "1", "...", "i-1", "i", "...", "n-1"], {left: 300, top: 0, indexed: false});
  pseudo.highlight("loop2");
  arr.highlight(4);
  av.step();

  //Slide 3
  av.umsg(interpret("sc3"));
  arr.addClass([0, 1, 2, 3], "greenbg");
  av.step();

  //Slide 4
  av.umsg(interpret("sc4"));
  pseudo.unhighlight("loop2");
  av.step();

  //Slide 5
  av.umsg(interpret("sc5"));
  av.step();

  //Slide 6
  av.umsg(interpret("sc6"));
  var eq = av.label("$\\displaystyle\\sum_{i=1}^{n-1}\\frac{i}{2}$", {top: "0px", left: "15px"}).addClass("mediumLabel");
  var label = av.label("|---------- $n-1$ ---------|",  {top: "40px", left: "310px"}).addClass("largeLabel");
  pseudo.highlight("loop1");
  arr.unhighlight(4);
  arr.removeClass([0, 1, 2, 3], "greenbg");
  av.step();

  //Slide 7
  av.umsg(interpret("sc7"));
  eq.hide();
  var eq = av.label("$\\displaystyle\\sum_{i=1}^{n-1}\\frac{i}{2} = \\frac{n(n+1)}{4}$", {top: "0px", left: "15px"}).addClass("mediumLabel");
  av.step();

  //Slide 8
  av.umsg(interpret("sc8"));
  pseudo.unhighlight("loop2");
  label.hide();
  av.recorded();
});
