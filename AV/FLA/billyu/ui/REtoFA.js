(function($) {
	var jsav = new JSAV("av");
	var controller = new REtoFAController(jsav, "aa+bb");
	
	$('#nextStep').click(function() {
		controller.completeStep()
	});
}(jQuery));
