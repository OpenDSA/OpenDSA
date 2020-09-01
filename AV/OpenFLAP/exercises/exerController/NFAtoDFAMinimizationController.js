var latexit = "http://latex.codecogs.com/svg.latex?";
var NFAtoDFAMinimizationController = function (jsav, fa, filePath, dataType, options) {
	this.init(jsav, fa, filePath, dataType, options);
};
var controllerProto = NFAtoDFAMinimizationController.prototype;
var logRecord = new Object();
var tryC = 0;
controllerProto.init = function (jsav, fa, filePath, dataType, options) {
	this.filePath = filePath;
	this.dataType = dataType;
	this.tests;
	this.jsav = jsav;
	this.fa = fa;
	this.currentExercise = 0;
	this.testCases;
	this.initGraph = options.initGraph;
	
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
	/*$('#testSolution').click(function() {
		proto.startTesting();
	});
*/	$('.links').click(function() {
		proto.toExercise(this);
	});
	$('#showResult').click(function () {
		alert(JSON.stringify(logRecord));
	});
	$("#testResults").hide();
    this.updateExercise(this.currentExercise);
}

controllerProto.startTesting = function(studentSolution, exerciseType) {//exerciseType = "minimization" OR "NFAtoDFA"
	tryC++;
	if (studentSolution == null) {
		window.alert("FA traversal requires an initial state.");
		return;
	}
	$("#testResults").empty();
	$("#testResults").append("<tr><td>Number of incorrect steps</td><td>Error Messages</td></tr>");
	var count = 0;
    var testRes = [];
    if(exerciseLog.errorsCount != 0){
        $("#testResults").append("<tr><td>" + exerciseLog.errorsCount + "</td><td>" + exerciseLog.errorMessages[0]);
	    for (i = 1; i < exerciseLog.errorMessages.length; i++) {
            $("#testResults").append("<tr><td>" + "</td><td>" + exerciseLog.errorMessages[i]);	
        }
    }
    var exer = {};
	exer['Attempt' + tryC.toString()] = testRes;
	exer['studentSolution'] = serialize(studentSolution);
	var exNum = parseInt(this.currentExercise) + 1;
	if (count > logRecord['Exercise' + exNum +'_Highest']) {
	 	logRecord['Exercise' + exNum +'_Highest'] = count;
    }
    if(exerciseType === "minimization"){
        exer['Auto_partitions_used'] =  exerciseLog.numberOfAutoPartitions + '/3';
        exer['Hints_used'] = exerciseLog.numberOfHints + '/3';
    }
	logRecord['Exercise' + exNum].push(exer);
	var end = new Date;
    logRecord['Exercise' + exNum + '_Time'].push(end);
    
	$("#percentage").text("Correctness: " + exerciseLog.numberOfSteps + " / " + (exerciseLog.numberOfSteps + exerciseLog.errorsCount));
	$("#percentage").show();
	$("#testResults").show();
	window.scrollTo(0,document.body.scrollHeight);
	$('#container').scrollTop($('#container').prop("scrollHeight"));
	if(exerciseLog.numberOfSteps > 0)
		return exerciseLog.numberOfSteps / (exerciseLog.numberOfSteps + exerciseLog.errorsCount);
	else
		return 0;
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
    $("#editable").empty();
    $("#reference").empty();
	if (!exercise["graph"]) {
		this.fa = this.initGraph({graph: {"nodes":[], "edges":[]}, layout: "automatic"});
	} else {
		this.fa = this.initGraph({graph: exercise["graph"], layout: "automatic"});
	}
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
var exerciseLog = {
    errorsCount:0,
    errorMessages : [],
    numberOfSteps:0,
    numberOfHints:0,
    numberOfAutoPartitions:0
};
