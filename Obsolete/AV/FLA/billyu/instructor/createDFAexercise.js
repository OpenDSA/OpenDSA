(function ($) {
	var problems = [],
			haveGraph = false,
			testCaseNumbers = {1: 1}, //problem -> number of test cases
			problemCount = 1,
			resultCount = 1,
			editGraphButtons = [];

	function generatejson() {
		problems = [];
		$("fieldset").each(problemInfo);
		var json = JSON.stringify(problems);
		var downloadData = 'data:text/json;charset=utf8,' + encodeURIComponent(json);
		var fileName;
		if (haveGraph) {
			fileName = "fixerTests.json";	
		} else {
			fileName = "tests.json";
		}
		$('#download').html('<a href="data:' + downloadData + '" target="_blank" download="' + fileName + '">Download Exercises JSON File</a>');
		$('#download').click();
	}
	
	function problemInfo() {
		var problem = {
    	expression: "",
			description: "",
			type: "",
    	testCases: [],
			graph: ""
		};
		var index = $(this).index();

		var typeButtons = $(this).find("input[type='radio']");
		var showType = typeButtons[0].checked ? "expression" : "description";
		problem.type = showType;
		problem.expression = $(this).find("input[name='expression']")[0].value;
		problem.description = $(this).find("input[name='description']")[0].value;

		$(this).find(".testCase").each(function() {
			var _case = {},
					testString = $(this).find("input[name='testString']")[0].value,
					resultButtons = $(this).find("input[type='radio']");
			var result = resultButtons[0].checked ? true : false;
			_case[testString] = result;
			problem.testCases.push(_case);
		});
		problem.graph = jQuery.parseJSON(localStorage['problem' + index]);
		problems.push(problem);
	}

	function addProblem() {
		problemCount++;
		resultCount++;
		$("#problems").append(""+
			"<fieldset id='" + problemCount + "'>" + 
				"<legend>Problem " + problemCount + "</legend>" + 
					"<input type='radio' name='show" + problemCount + "' value='true' checked>" + 
					"<span>Expression: </span>" + 
					"<input type='text' name='expression'>" + 
					"<br>" + 
					"<input type='radio' name='show" + problemCount + "' value='false'>" + 
					"<span>Description: </span>" + 
					"<input type='text' name='description'" + 
					"<br>"+
					"<div class='testCases'>" + 
					"<div class='testCase'>"+
						"<span>Test Case 1: </span>"+
						"<input type='radio' name='result" + resultCount + "' value='true' checked> <span>Accept</span>"+
						" <input type='radio' name='result" + resultCount + "' value='false'> <span>Reject</span>"+
						"<input type='text' name='testString'>"+
						"<br>" + 
					"</div>"+
					"</div>"+
			"</fieldset>");
		var addCaseButton = $("<button type='button' id='addTestCase'>Add another test case</button>");
		addCaseButton.click(addCase);
		$("fieldset[id='" + problemCount + "']").append(addCaseButton);
		var editGraphButton = $("<button type='button' id='editGraph'>Edit Graph</button>");
		editGraphButton.click(editGraph);
		$("fieldset[id='" + problemCount + "']").append(editGraphButton);
		testCaseNumbers[problemCount] = 1;
		localStorage['problem' + (problemCount - 1)] = '{"nodes":[], "edges": []}';
		if (haveGraph) editGraphButton.show();
		else editGraphButton.hide();
		editGraphButtons.push(editGraphButton);
	}

	function addCase() {
		var button = $(this);
		var thisProblem = button.parent();
		var testCases = button.parent().find(".testCases");
		var index = thisProblem.index() + 1;
		testCaseNumbers[index]++;
		caseCount = testCaseNumbers[index];
		resultCount++;
		testCases.append("" +
			"<div class='testCase'>"+
				"<span>Test Case " + caseCount + ": </span>"+
				"<input type='radio' name='result" + resultCount + "' value='true' checked> <span>Accept</span>"+
				"<input type='radio' name='result" + resultCount + "' value='false'> <span>Reject</span>"+
				"<input type='text' name='testString'>"+
				"<br>"+
			"</div>");
	}

	function editGraph() {
		var editButton = $(this);
		var problemIndex = editButton.parent().index();
		//let FAEditor know we are editing graphs for exercises so we don't need certain functions.
		localStorage['createExercise'] = true;
		localStorage['exerciseIndex'] = problemIndex;
		window.open("../ui/FAEditor.html");
	}
		
	$('input:radio[name="mode"]').change(function() {
  	if ($(this).val() == 'noGraph') {
    	$("#editGraph").hide();
			editGraphButtons.forEach(function(button) {
				button.hide();
			});
			haveGraph = false;
  	} else {
    	$("#editGraph").show();
			editGraphButtons.forEach(function(button) {
				button.show();
			});
			haveGraph = true;
  	}
	});

	$("#getjson").click(generatejson);
	$("#addExercise").click(addProblem);
	$("#addTestCase").click(addCase);
	$("#editGraph").click(editGraph);
	$("#editGraph").hide();
	localStorage['problem0'] = '{"nodes":[],"edges":[]}';
}(jQuery));
