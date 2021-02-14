(function ($)
{
	var problems = [],
		haveGraph = false,
		graphType = "fa",
		testCaseNumbers = {1: 1}, //problem -> number of test cases
		problemCount = 1,
		resultCount = 1,
		editGraphButtons = [],
		uploadGraphButtons = [];

	function generatejson()
	{
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

		$("#btn-save");
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

		$(this).find(".testCase").each(function()
		{
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

	function addProblem()
	{
		isFA = false;
		problemCount++;
		resultCount++;

		$("#problems").append(""+
			"<fieldset id='" + problemCount + "'>" + 
				"<legend>Problem " + problemCount + "</legend>" +
					"<div><input type='radio' name='mode' value='noGraph' checked>Expression Only" +
					"<input type='radio' name='mode' value='yesGraph'>With Wrong Graph</div>" +
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

		var uploadGraphButton = $("<button type='button' id='uploadGraph'>Upload Graph</button>");
		uploadGraphButton.click(uploadGraph);
		$("fieldset[id='" + problemCount + "']").append(uploadGraphButton);

		testCaseNumbers[problemCount] = 1;
		localStorage['problem' + (problemCount - 1)] = '{"nodes":[], "edges": []}';

		if (haveGraph) {
			editGraphButton.show();
			uploadGraphButton.show();
		}
		else {
			editGraphButton.hide();
			uploadGraphButton.hide();
		}

		editGraphButtons.push(editGraphButton);
		uploadGraphButtons.push(uploadGraphButton);
	}

	function addCase()
	{
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
		localStorage['fromEditor'] = true;
		if (graphType == "fa")
		{
			window.open("../../FA.html");
		}
		else if (graphType == "pad")
		{
			window.open("../../PDAEditor.html");
		}
		else if (graphType == "tm"){
			//OpenDSA/AV/Development/formal_language/TMEditor.html
			window.open("../../../Development/formal_language/TMEditor.html");
		}

	}

	//Open the FAFix page
	function fixerButton() {
		problems = [];
		$("fieldset").each(problemInfo);
		var json = JSON.stringify(problems);
		localStorage['json'] = json;
		window.buttonid = document.getElementById('fixerButton');
		window.open("../../FAFixer.html");
	}

	//Open the FATester page
	function testerButton() {
		problems = [];
		$("fieldset").each(problemInfo);
		var json = JSON.stringify(problems);
		localStorage['json'] = json;
		window.buttonid = document.getElementById('testerButton');
		window.open("../../FATester.html");
	}

	function uploadGraph() {
		var uploadButton = $(this);
		var problemIndex = uploadButton.parent().index();
		//let FAEditor know we are editing graphs for exercises so we don't need certain functions.
		localStorage['createExercise'] = true;
		localStorage['exerciseIndex'] = problemIndex;
		// console.log('PROBLEM INDEX: ' + problemIndex);

		document.getElementById('upload').click();
	}
	//parse function copy from FAEditor
	function parseFile(text) {
		var parser,
			jsav = new JSAV("av"),
			g,
			xmlDoc;
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(text,"text/xml");
		}
		else {
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(txt);
		}
		if (!xmlDoc.getElementsByTagName("type")[0]) {
			// This file is not a file that can be parsed.
			window.alert('File does not contain an automaton.');
			return;
		}
		if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== graphType){//check that the machine matches the graph type
			// This file was created by a different automaton editor.
			window.alert('File does not contain a finite automaton.');
			return;
		}
		else {
			g = new jsav.ds.FA({width: '730px', height: 440, layout: "automatic", editable: true});
			var nodeMap = {};			// map node IDs to nodes
			var xmlStates = xmlDoc.getElementsByTagName("state");
			xmlStates = _.sortBy(xmlStates, function(x) { return x.id; })
			var xmlTrans = xmlDoc.getElementsByTagName("transition");
			// Iterate over the nodes and initialize them.
			for (var i = 0; i < xmlStates.length; i++) {
				var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
				var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
				// console.log('x = ' + x);
				// console.log('y = ' + y);
				var newNode = g.addNode({left: x, top: y});
				// console.log(newNode.position().left);
				// console.log(newNode.position().top);
				// Add the various details, including initial/final states and state labels.
				var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
				var isFinal = xmlStates[i].getElementsByTagName("final")[0];
				var isLabel = xmlStates[i].getElementsByTagName("label")[0];
				if (isInitial) {
					g.makeInitial(newNode);
				}
				if (isFinal) {
					newNode.addClass('final');
				}
				if (isLabel) {
					newNode.stateLabel(isLabel.childNodes[0].nodeValue);
				}
				nodeMap[xmlStates[i].id] = newNode;
				newNode.stateLabelPositionUpdate();
			}
			// Iterate over the edges and initialize them.
			for (var i = 0; i < xmlTrans.length; i++) {
				var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
				var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
				var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
				// Empty string always needs to be checked for.
				if (!read) {
					read = emptystring;
				}
				else {
					read = read.nodeValue;
				}
				var edge = g.addEdge(nodeMap[from], nodeMap[to], {weight: read});
				edge.layout();
			}
		}
		return serialize(g);
	}

	function loadGraph() {
		var loaded = document.getElementById('upload');
		var file = loaded.files[0],
			reader = new FileReader();
		reader.onload = function (ev) {
			var text = reader.result;
			console.log('The input JFLAP file: ');
			console.log(text);
			console.log('The output JSON file: ');
			var resultJson = parseFile(text);
			console.log(resultJson);

			var uploadButton = $(this);
			var problemIndex = uploadButton.parent().index();
			// console.log('problem index: ' + localStorage['exerciseIndex']);
			localStorage['problem' + localStorage['exerciseIndex']] = resultJson;
		};
		reader.readAsText(file);
		alert('Graph loaded!');
	}
		
	$('input:radio[name="mode"]').change(function()
	{
		if ($(this).val() == 'noGraph')
		{
			$("#editGraph").hide();
			editGraphButtons.forEach(function(button) {
				button.hide();
			});

			$("#uploadGraph").hide();
			uploadGraphButtons.forEach(function(button) {
				button.hide();
			});

			$("#fixerButton").hide();
			$("#testerButton").show();
			haveGraph = false;
		}
		else {
			$("#editGraph").show();
			editGraphButtons.forEach(function(button) {
				button.show();
			});

			$("#uploadGraph").show();
			uploadGraphButtons.forEach(function(button) {
				button.show();
			});

			$("#fixerButton").show();
			$("#testerButton").hide();
			haveGraph = true;
		}
	});

	$('input:radio[name="mode2"]').change(function()
	{
		if ($(this).val() == 'pda')
		{
			graphType = "pad";
		}
		else if ($(this).val() == 'fa'){
			graphType = "fa";
		}
		else if ($(this).val() == 'tm'){
			graphType = "tm"
		}
		else if ($(this).val() == 'regulargrammar'){
			//FIXME hides the graph radio button
			;
		}
	});


	$("#getjson").click(generatejson);
	$("#addExercise").click(addProblem);
	$("#addTestCase").click(addCase);
	$("#editGraph").click(editGraph);

	//Test button for FAFixer and FATester
	$("#fixerButton").hide();
	$("#fixerButton").click(fixerButton);
	$("#testerButton").click(testerButton);

	$("#editGraph").hide();

	$("#uploadGraph").click(uploadGraph);
	$("#uploadGraph").hide();
	$("#upload").change(loadGraph);
	localStorage.clear();
	localStorage['problem0'] = '{"nodes":[],"edges":[]}';
}(jQuery));
