"use strict";
$(document).ready(function() {
	// Process about button: Pop up a message with an Alert
	function about() {
		alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")))
	}

	$('#about').click(about)
	
	// Processes the reset button
	function initialize() {
		clearInterval(intv)
	//	if (JSAV_EXERCISE_OPTIONS.code) 
	//		av.clear();
	//	JSAV_EXERCISE_OPTIONS.code = "insert";
	//	config = ODSA.UTILS.loadConfig();
	//	code = config.code;                   // get the code object
	//	pseudo = av.code(code[0]);
		
		if(stack)
			stack.clear() // clear number in the stack
		if(userArr)
			userArr.clear() // clear the array
		//if (pseudo)
		//	pseudo.clear()
		//pseudo = av.code({url: "insert_code.txt", lineNumbers: false})
		var num_values = arraySize - stackSize
		// generate the array
		initialArray = genArrNoRepeat(89, arraySize)
		for(var i = 0; i < stackSize; i++)
			initialArray[num_values + i] = ""
		stackArray = buildArrayUniqueValues(initialArray, stackSize)
		stack = buildStackFromArr(stackArray, stackSize, createStackLayout(av))
		// highlight the top number of the stack
		stack.first().highlight()
		stack.layout()
		// Create the array the user will intereact with and highlight the first value.
		userArr = createArrayLayout(av, initialArray, true, arrayLayout.val())
		addArrayClick()
		return userArr
	}
		
	// Add a click event to userArr
	function addArrayClick() {
		userArr.click(function(index) {
			moveHighlight(getHighlight(userArr), index, userArr)
			exercise.gradeableStep() //a
		})
	}

	// Create the model solution used for grading the exercise
	function modelSolution(modelav) {
		// Create the model stack and build it from the stack array
		modelStack = createStackLayout(modelav)
		modelStack = buildStackFromArr(stackArray, stackSize, modelStack)
		modelStack.layout()
		modelStack.first().highlight()
		// Initialize the display or else the model answer won't show up until
		// the second step of the slideshow
		var modelArr = createArrayLayout(modelav, initialArray, true, arrayLayout.val())
		modelav.displayInit()
		// while the model stack contains values
		while(modelStack.size() > 0) {
			var ind = 1
			modelArr.highlight(0)
			modelav.gradeableStep() //a
			while(modelArr.value(ind) <= modelStack.first().value()) {
				moveHighlight(ind - 1, ind, modelArr)
				modelav.gradeableStep() //a
				ind++
			}
			moveHighlight(ind - 1, ind, modelArr)
			modelav.gradeableStep()//a
			modelArr.unhighlight(ind)
			modelArr.addClass(ind, "correctIndex")
			modelav.gradeableStep()//b
			var current = modelArr.size() - 1
			while(current >= ind) {
				if(modelArr.value(current) == "") {
					modelArr.unhighlight(current)
					current--
				} else {
					if(modelArr.value(current - 1) != "") {
						modelArr.value(current + 1, modelArr.value(current))
						modelArr.value(current, "")
					} else
						current--
				}
			}
			modelav.step()
			modelArr.value(ind, modelStack.first().value())
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
			// Fix any incorrect values
			userArr.value(i, modelArray.value(i))
			// Ensure the classes of each element in the user array match those in the model solution
			userArrElems[i].className = modArrElems[i].className;
		}
	}

	function insertValue(hlPos, insert_val) {
		intv = setInterval(function animateStep() {
			var position = userArr.size() - 1
			var insert_pos
			if (getFirstIndWithClass(userArr, "correctIndex") >= 0)
				insert_pos = getFirstIndWithClass(userArr, "correctIndex")
			else
				insert_pos = getFirstIndWithClass(userArr, "wrongIndex")
			while(position > insert_pos) {
				if(userArr.value(position) == "")
					position = position - 1
				else {
					if(userArr.value(position - 1) != "") {
						userArr.value(position + 1, userArr.value(position))
						userArr.value(position, "")
					} else
						position = position - 1
				}
				if(position == insert_pos) {
					userArr.value(position + 1, userArr.value(position))
					userArr.value(position, "")
					var val = stack.first().value()
					stack.removeFirst()
					userArr.value(position, val)
					userArr.removeClass(getFirstIndWithClass(userArr, "correctIndex"),
						"correctIndex")
					userArr.removeClass(getFirstIndWithClass(userArr, "wrongIndex"),
						"wrongIndex")
					userArr.unhighlight(hlPos);
					clearInterval(intv)
				}
			}
		}, 1400)
		
	}

	function insertButton() {
			clearClassFromArr(userArr, "wrongIndex")
			var insert_val = stack.first().value()
			var hlPos = getHighlight(userArr)
			var array_value = userArr.value(hlPos)
			if(array_value >= insert_val && (hlPos == 0 || userArr.value(hlPos - 1) <
					insert_val)) {
				userArr.unhighlight(hlPos)
				userArr.addClass(hlPos, "correctIndex")
				insertValue(hlPos, insert_val)
			} else {
				userArr.unhighlight(hlPos)
				userArr.addClass(hlPos, "wrongIndex")
			}
			exercise.gradeableStep()//b
	}

	$('#Insert').click(insertButton)
	
	//////////////////////////////////////////////////////////////////
	// Start processing here
	//////////////////////////////////////////////////////////////////
	var arraySize = 13,
		stackSize = 5,
		initialArray = [],
		intv,
		stack,
		modelStack,
		stackArray,
		pseudo,
		last_first,
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
	var exercise = av.exercise(modelSolution, initialize, {
		compare: {css: "backgroundColor"},feedback: "continuous",
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
	// Initialize userArr
	var userArr // JSAV array
})
