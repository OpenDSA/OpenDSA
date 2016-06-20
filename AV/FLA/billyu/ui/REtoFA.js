(function($) {
	var jsav = new JSAV("av");
	var expression = prompt("Regular Expression:");
	var controller = new REtoFAController(jsav, expression);
	
	$('#nextStep').click(function() {
		controller.completeStep();
	});
	$('#allSteps').click(function() {
		controller.completeAll();
	});
}(jQuery));
