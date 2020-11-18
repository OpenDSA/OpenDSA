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
		jsav = new JSAV($("#jsavcontainer"));
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
			var exercise = jsav.flexercise(modelSolution, initialize,
				{feedback: "atend", grader: "finalStep", controls: $(".jsavexercisecontrols"), checkSolutionFunction: testSolution});
				exercise.reset()
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

		$('#testSolution').click(testSolution);
    
    
	}

  var testSolution = function(){
    //we need to write the code to test the entered RE
    expression = document.getElementById('tb1').value;
    if(controller)
      controller.clear();
    controller = new REtoFAController(jsav, expression, false, true, {});
    controller.completeAll();
    this.resultingFA = controller.fa;
    return exerciseController.startTesting(this.resultingFA, expression);
  }
	//Function sent to exercise constructor to initialize the exercise
	function initialize() {
    exerciseController.updateExercise(0);
    document.getElementById('tb1').value = "";
	}
	
	  //Function used by exercise object to show the model answer and to grade the solution by comparing the model answer with student answer.
	  //In our case, we will make this function show the test cases only.
	  function modelSolution(modeljsav) {
		var containHideTest = false;
		var testNum = 1;
		var testCases = exerciseController.tests[0]["testCases"];
		var list = [["Test Number", "Test String", "Accept/Reject"]];
		for (i = 0; i < testCases.length; i++) {
			var testCase = testCases[i];
			var hideOption = testCase.ShowTestCase;
			if (hideOption == false || hideOption== undefined) {
				containHideTest = true;
			}
			if(testCase.ShowTestCase){
		  var input = Object.keys(testCase)[0];
		  //var inputResult = FiniteAutomaton.willReject(this.fa, input);
			list.push([testNum, input, testCase[input]]);
			testNum = testNum + 1;
			}
		}
		if(containHideTest){
      list.push([testNum, "Hidden Test", "Hidden Solution"]);
    }
		var model = modeljsav.ds.matrix(list);
		//layoutTable(model);
		modeljsav.displayInit();
		return model;
	  } 

	$(document).ready(onLoad);
}(jQuery));
