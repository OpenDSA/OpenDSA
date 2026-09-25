var jsav,
		expression, // input by user
		controller, // REtoFA controller object
		controller2, // FAtoRG controller object
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
        $('#toRG').click(function() {
			new_fa1 = controller.completeAll(); //NFA
			localStorage['convertNFA'] = true;
    		localStorage['toConvert'] = serialize(new_fa1);
    		//window.open("./NFAtoDFA.html", "popupWindow", "width=830, height=800, scrollbars=yes");
    		window.open("./NFAtoDFA.html");
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
		var testCases = exerciseController.tests[0]["testCases"];
		var list = [["Test Number", "Test String", "Accept/Reject"]];
		for (i = 0; i < testCases.length; i++) {
		  var testNum = i + 1;
		  var testCase = testCases[i];
		  var input = Object.keys(testCase)[0];
		  //var inputResult = FiniteAutomaton.willReject(this.fa, input);
		  list.push([testNum, input, testCase[input]]);
		}
		var model = modeljsav.ds.matrix(list);
		//layoutTable(model);
		modeljsav.displayInit();
		return model;
	  } 

	$(document).ready(onLoad);
}(jQuery));
