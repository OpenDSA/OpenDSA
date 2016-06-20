(function($) {
	var jsav = new JSAV("av");
	var controller = new REtoFAController(jsav, "(a+ab*)*");
	
	$('#nextStep').click(function() {
		controller.completeStep()
	});
}(jQuery));
