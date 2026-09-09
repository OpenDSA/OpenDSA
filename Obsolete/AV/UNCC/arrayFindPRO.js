"use strict";

$(document).ready(function() {
	// Process about button: Pop up a message with an Alert
	function about() {
		alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")))
	}
	
	$('#about').click(about)

	// Processes the reset button
	function initialize() {
		//if (JSAV_EXERCISE_OPTIONS.code) 
		//	av.clear();
		//JSAV_EXERCISE_OPTIONS.code = "find";
		//config = ODSA.UTILS.loadConfig();
		//code = config.code;                   // get the code object
		//pseudo = av.code(code[0]);
		
		if(stack)
			stack.clear() // clear number in the stack
		if(userArr)
			userArr.clear() // clear the array
		//if (pseudo)
		//	pseudo.clear()
		//pseudo = av.code({url: "find_code.txt", lineNumbers: false})
		// Generate the array values.
		initialArray = genArrNoRepeat(89, arraySize)
		stack = createStackLayout(av);
		stackArray = []
		for(var i = 0; i < stackSize; i++) {
			var new_val = initialArray[Math.floor(Math.random() * initialArray.length)]
			stack.addLast(new_val)
			stackArray[i] = new_val
		}
		// highlight the stack's top number
		stack.first().highlight()
		stack.layout()
		// Create the array the user will intereact with and highlight the first value
		userArr = createArrayLayout(av, initialArray, true, arrayLayout.val())
		addArrayClick()
		return userArr
	}
	
	// Add a click event to userArr
	function addArrayClick() {
		userArr.click(function(index) {
			moveHighlight(getHighlight(userArr), index, userArr)
			av.gradeableStep()
		})
	}

	// Create the model solution for grading the exercise
	function modelSolution(modelav) {
		modelStack = createStackLayout(modelav)
		modelStack = buildStackFromArr(stackArray, stackSize, modelStack)
		modelStack.layout()
		modelStack.first().highlight()
		var modelArr = createArrayLayout(modelav, initialArray, true, arrayLayout.val())
		modelav.displayInit()
		// while the model stack contains values
		while(modelStack.size() > 0) {
			var ind = 1
			moveHighlight(getHighlight(modelArr), 0, modelArr)
			modelav.gradeableStep();
			while(modelArr.value(ind) <= modelStack.first().value()) {
				moveHighlight(ind - 1, ind, modelArr)
				modelav.gradeableStep()
				ind++
			}
			ind--
			modelArr.unhighlight(ind)
			modelArr.addClass(ind, "correctIndex")
			modelav.gradeableStep()
			modelStack.removeFirst()
			modelArr.removeClass(getFirstIndWithClass(modelArr, "correctIndex"), "correctIndex")
		}
		return modelArr
	}

	// Fixstate function called if continuous feedback/fix mode is used
	function fixState(modelState) {
		var modelArray = modelState[0]
		// Get the raw array elements so we can access their list of class names
		var modArrElems = JSAV.utils._helpers.getIndices($(modelArray.element).find("li"))
		var userArrElems = JSAV.utils._helpers.getIndices($(userArr.element).find("li"))
		for(var i = 0; i < modelArray.size(); i++) {
			// Fix incorrect values
			userArr.value(i, modelArray.value(i))
			// Ensure the classes of each element in the user array match those in the model solution
			userArrElems[i].className = modArrElems[i].className
		}
	}

	function foundButton() {
		var hlPos = getHighlight(userArr)
		var array_value = userArr.value(hlPos)
		if(array_value == stack.first().value()) {
			userArr.addClass(hlPos, "correctIndex")
			userArr.unhighlight(hlPos)
			exercise.gradeableStep()
			stack.removeFirst()
			if (stack.size() > 0)			// If the stack is not empty
				stack.first().highlight()	// highlight the top value.
		} else {
			userArr.addClass(hlPos, "wrongIndex")
			userArr.unhighlight(hlPos)
			exercise.gradeableStep()
		}
		// Clear the "correct" or "wrong" CSS class from the array.
		userArr.removeClass(getFirstIndWithClass(userArr, "correctIndex"), "correctIndex") 
		userArr.removeClass(getFirstIndWithClass(userArr, "wrongIndex"), "wrongIndex")		
	} 
	
	$('#Found').click(foundButton)			// Attach the 'found' button handler
	
	//////////////////////////////////////////////////////////////////
	// Start processing here
	//////////////////////////////////////////////////////////////////
	var arraySize = 13,
		stackSize = 5,
		initialArray = [],
		stack,
		modelStack,
		stackArray,
		pseudo,
		//pointer,
		// Load the config object with interpreter created by odsaUtils.js
		config = ODSA.UTILS.loadConfig(),
		interpret = config.interpreter, // get the interpreter
		code = config.code,
		codeOptions = {
			after: {element: $(".instructions")},
			visible: true
		},
		settings = config.getSettings(), // Settings for the AV
		av = new JSAV($('.avcontainer'), {
			settings: settings
		})
	av.recorded(); // we are not recording an AV with an algorithm
	// show a JSAV code instance only if the code is defined in the parameter
	// and the parameter value is not "none"
	//if(code)
	//	pseudo = av.code($.extend(codeOptions, code));
	if(code)
		pseudo = av.code(code[0]);
	var exercise = av.exercise(modelSolution, initialize, {
		compare: {css: "backgroundColor"},
		feedback: "continuous",
		controls: $(".jsavexercisecontrols")
	})
	// add the layout setting prelow, high, valference
	var arrayLayout = settings.add("layout", {
		"type": "select",
		"options": {
			"bar": "Bar",
			"array": "Array"
		},
		"label": "Array layout: ",
		"value": "array"
	})
	exercise.reset()
	var userArr // Initialize JSAV array userArr
})