var jsav,
		expression, // input by user
		controller, // REtoFA controller object
		exerciseController,
		pageType; //determine weather the page is an RE exercise or REtoFA

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
		pageType = $('h1').attr('id');
		if(pageType !== "Exercise"){
			start();
			if (!controller) console.log("error! no controller.");
		}
		else{
			$('#av').hide();
			var exerciseLocation = getExerciseLocation();
			exerciseController = new ExerciseController(jsav, exerciseLocation, 'json');
			exerciseController.load();
		}
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

		$('#testSolution').click(function(){
			//we need to write the code to test the entered RE
			expression = document.getElementById('tb1').value;
			if(controller)
				controller.clear();
			controller = new REtoFAController(jsav, expression, false, true, {});
			controller.completeAll();
			this.resultingFA = controller.fa;
			exerciseController.startTesting(this.resultingFA, expression);
		});
		
	}

	$(document).ready(onLoad);
}(jQuery));
