var GrammarExerciseController = function (jsav, matrix, filePath, dataType) {
	this.init(jsav, matrix, filePath, dataType);
};
var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var controllerProto = GrammarExerciseController.prototype;
var logRecord = new Object();
var tryC = 0;
controllerProto.init = function (jsav, matrix, filePath, dataType) {
	this.filePath = filePath;
	this.dataType = dataType;
	this.tests;
	this.currentExercise = 0;
    this.testCases;
    this.grammarMatrix = matrix;
    this.jsav = jsav;
}
controllerProto.load = function () {
	var filePath = this.filePath;
	var dataType = this.dataType;
	var tests;

	$.ajax({
		url: filePath,
		crossDomain: true,
		dataType: dataType,
		async: false,
		success: function (data) {
			tests = data;
		}
	});
	this.tests = tests;

	for (i = 0; i < this.tests.length; i++) {
		$("#exerciseLinks").append("<a href='#' id='" + i + "' class='links'>" + (i+1) + "</a>");
	}
	var proto = this;
	$('#testSolution').click(function() {
        //we need to read the grammar from the grammarMatrix
        proto.grammar = [];
        for (var i = 0; i < arr.length; i++){
            if(arr[i][0] === "")
                break;
                proto.grammar.push(arr[i]);
        }
		proto.startTesting();
	});
	$('.links').click(function() {
		proto.toExercise(this);
	});
	$('#showResult').click(function () {
		alert(JSON.stringify(logRecord));
	});
	$("#testResults").hide();
	this.updateExercise(this.currentExercise);
}

controllerProto.startTesting = function() {
	tryC++;
	//we need to find an initial test to know if the student has something to test or not
	$("#testResults").empty();
	$("#testResults").append("<tr><td>Test Case</td><td>Standard Result</td><td>Your Result</td></tr>");
	var count = 0;
    var testRes = [];
    //we need to convert the grammar to a PDA to test the grammar.
    var pda = this.convertToPDA();
    //var parser = new ParseTreeController(this.jsav, JSON.stringify(this.grammar),"", {visible: false});
	for (i = 0; i < this.testCases.length; i++) {
		var testNum = i + 1;
		var testCase = this.testCases[i];
        var input = Object.keys(testCase)[0];
        var inputResult = pda.traverseOneInput(input);
        //parser.inputString = input;
        //var inputResult = parser.stringAccepted()[0];
		if (inputResult === testCase[input]) {
			$("#testResults").append("<tr><td>" + input + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='correct'>" + (inputResult ? "Accept": "Reject") + "</td></tr>");
			count++;
			testRes.push('Test' + testNum +':' + 'Correct');
		}
		else {
			$("#testResults").append("<tr><td>" + input + "</td><td>" + (testCase[input] ? "Accept" : "Reject") + "</td><td class='wrong'>" + (inputResult ? "Accept": "Reject") + "</td></tr>");
			testRes.push('Test' + testNum + ':' + 'Wrong');
		}
	}
	var exer = {};
	exer['Attempt' + tryC.toString()] = testRes;
	exer['studentSolution'] = this.serializeGrammar();//this function is defined inside grammarEditor.js. It serializaes the current grammar
	var exNum = parseInt(this.currentExercise) + 1;
	if (count > logRecord['Exercise' + exNum +'_Highest']) {
	 	logRecord['Exercise' + exNum +'_Highest'] = count;
	}
	logRecord['Exercise' + exNum].push(exer);
	var end = new Date;
	logRecord['Exercise' + exNum + '_Time'].push(end);

	$("#percentage").text("Correct cases: " + count + " / " + this.testCases.length);
	$("#percentage").show();
	$("#testResults").show();
	window.scrollTo(0,document.body.scrollHeight);
	$('#container').scrollTop($('#container').prop("scrollHeight"));
};

// binded with question links at the top of the page
// change the problem displayed
controllerProto.toExercise = function(button) {
	this.currentExercise = button.getAttribute('id');
	this.updateExercise(this.currentExercise);
};

// the function that really changes the problem displayed
// called by toExercise
controllerProto.updateExercise = function(id) {
	var exercise = this.tests[id];
	var type = exercise["type"];
	if (type == "expression") {
		$("#expression").html("<img src='" + latexit + exercise["expression"] + "' border='0'/>");
		$("#question").show();
		$("#description").hide();
	}
	else {
		$("#description").text(exercise["description"]);
		$("#description").show();
		$("#question").hide();
	}
	$(".links").removeClass("currentExercise");
	$("#" + this.currentExercise).addClass("currentExercise");
	this.testCases = exercise["testCases"];
	$("#testResults").hide();
	$("#percentage").hide();
	var exNum = parseInt(this.currentExercise) + 1;
	logRecord['Exercise' + exNum] = [];
	var high = 0;
	// Object.defineProperty(high, 'Highest', {value: 0, writable:true});
	logRecord['Exercise' + exNum + '_Highest'] = [];
	logRecord['Exercise' + exNum + '_Highest'].push(high);
	var start = new Date();
	logRecord['Exercise' + exNum + '_Time'] = [];
	logRecord['Exercise' + exNum + '_Time'].push(start);

};
controllerProto.convertToPDA = function () {
    var productions = this.grammar;
    this.builtPDA = this.jsav.ds.pda({visible: true});
    var a = this.builtPDA.addNode({visible: true}),
        b = this.builtPDA.addNode({visible: true}),
        c = this.builtPDA.addNode({visible: true});
    this.builtPDA.makeInitial(a);
    c.addClass('final');
    var startVar = productions[0][0];
    this.convertToPDAinLL(a, b, c, productions, startVar);
    return this.builtPDA;
};

controllerProto.convertToPDAinLL = function(a, b, c, productions, startVar) {
    this.builtPDA.addEdge(a, b, {weight: emptystring + ':Z:' + startVar + 'Z', visible: false});
    this.builtPDA.addEdge(b, c, {weight: emptystring + ':Z:' + emptystring, visible: false});
    // add a transition for each terminal
    for (var i = 0; i < productions.length; i++) {
      var t = productions[i][2].split("");
      for (var j = 0; j < t.length; j++) {
        if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
            this.builtPDA.addEdge(b, b, {weight: t[j] + ':' + t[j] + ':' + emptystring});
        }
      }
    }
    var bEdge = this.builtPDA.getEdge(b, b);
    this.pCount = 0;
    for(var i = 0; i< productions.length; i++){
        this.builtPDA.addEdge(b, b, {weight: emptystring + ':' + productions[i][0] + ':' + productions[i][2]});
    }
};
controllerProto.serializeGrammar = function () {
    var productions = this.grammar;
    var text = "";
    for (var i = 0; i < productions.length; i++) {
      text = text + "<production>";
      text = text + "<left>" + productions[i][0] + "</left>";
      text = text + "<right>" + productions[i][2] + "</right>";
      text = text + "</production>";
    }
    return text;
  };

  controllerProto.convertToPDAinLR = function (a, b, c, productions, startVar) {
    this.builtPDA.addEdge(a, b, {weight: emptystring + ':' + startVar + ':' + emptystring});
    this.builtPDA.addEdge(b, c, {weight: emptystring + ':Z:' + emptystring});
    // add a transition for each terminal
    for (var i = 0; i < productions.length; i++) {
      var t = productions[i][2].split("");
      for (var j = 0; j < t.length; j++) {
        if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
            this.builtPDA.addEdge(a, a, {weight: t[j] + ':' + emptystring + ':' + t[j]});
        }
      }
    }
  };