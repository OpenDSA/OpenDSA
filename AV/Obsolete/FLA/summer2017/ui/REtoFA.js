var jsav,
		expression, // input by user
		controller; // REtoFA controller object

(function($) {
	var start = function() {
		if (localStorage["expression"] && localStorage["expression"] !== "null") {
			expression = localStorage["expression"];
			localStorage["expression"] = null;
		}
		else {
			expression = prompt("Regular Expression:");
		}
		while (!expression) {
			alert("put in something, don't try to trick the program!");
			expression = prompt("Regular Expression:");
		}
		controller = new REtoFAController(jsav, expression, {});
	}

	var onLoad = function() {
		jsav = new JSAV("av");
		start();
		if (!controller) console.log("error! no controller.");
		$('#nextStep').click(function() {
			controller.completeStep();
		});
		$('#allSteps').click(function() {
			controller.completeAll();
		});
		$('#layoutButton').click(function() {
			controller.fa.layout();
		});
		$('#export').click(function() {
			controller.exportToFA();
		});
		$('#export').hide();
	}

	$(document).ready(onLoad);
}(jQuery));
