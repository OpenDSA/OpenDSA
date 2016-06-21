var jsav,
		expression, // input by user
		controller; // REtoFA controller object

(function($) {
	var start = function() {
		expression = prompt("Regular Expression:");
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
	}

	onLoad();
}(jQuery));
