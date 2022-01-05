"use strict";

$(document).ready(function () {
  var jsav = new JSAV("KuriscalCON");
  var matrix = new jsav.ds.matrix([["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]], {style: "table", top: 0, left: 100});
	jsav.displayInit();
	for(var i = 0; i < 6; i++){
		for(var j = 0; j < 5; j++){
			matrix.value(i, j, i*j);
			jsav.step();
		}
	}
	matrix.layout();
	jsav.recorded();
});
