"use strict";

$(document).ready(function () {
    var av_name = "Dictionary";
	var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object

  var jsav = new JSAV("Dictionary");
  jsav.umsg(interpret("sc1"));
  var pseudo = jsav.code(code[0]);
  pseudo.setCurrentLine("a");

    var m = jsav.ds.matrix({rows: 3, columns: 1, style: "table", top: 60, left: 310});
    var V = jsav.ds.matrix({rows: 3, columns: 1, style: "table", top: 60, left: 450});
    jsav.label("Car = {brand:'Ford',model:'Mustang',year:'1964'}",{top: 0, left: 20}).addClass("Size");
    jsav.label("Key",{top: 36, left: 312}).addClass("Size");
    jsav.label("Value",{top: 36, left: 448}).addClass("Size");
    var y= jsav.g.line(343, 90, 448, 90,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(343, 120, 448, 120,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});
    var y= jsav.g.line(343, 150, 448, 150,{"arrow-end": "classic-wide-long",opacity: 90, "stroke-width": 1.5});



	

    
    jsav.displayInit();
	jsav.recorded();
});