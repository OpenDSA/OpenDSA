"use strict";
$(document).ready(function() {
    // Process about button: Pop up a message with an Alert
    function about() {
        alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
    }
    $('#about').click(about);

    // Processes the reset button
    function initialize() {
		// if (JSAV_EXERCISE_OPTIONS.code)
		// 	av.clear();
		// JSAV_EXERCISE_OPTIONS.code = "delete";
		//config = ODSA.UTILS.loadConfig();
		// code = config.code;                   // get the code object
		// pseudo = av.code(code[0]);

        clearInterval(intv);
        if (stack)
            stack.clear(); // Clear the numbers in the stack.
        if (userArr)
            userArr.clear(); // Clear the array.
		//if (pseudo)
		//	pseudo.clear();
		//pseudo = av.code({url: "delete_code.txt", lineNumbers: false})
        initialArray = genArrNoRepeat(89, arraySize) // Generate the array values.
        stack = createStackLayout(av);
        stackArray = [];
        for (var i = 0; i < stackSize; i++) {
            var value = initialArray[Math.floor(Math.random() * initialArray.length)]
            while (stackArray.includes(value))
                value = initialArray[Math.floor(Math.random() * initialArray.length)]
            stackArray[i] = value
            stack.addLast(value);
        }
        // Highlight the top number of the stack.
        stack.first().highlight();
        stack.layout();
        // Create the array the user will intereact with and highlight the first value
        userArr = createArrayLayout(av, initialArray, true, arrayLayout.val())
		addArrayClick()
		return userArr;
    }

	// Add a click event to userArr
	function addArrayClick() {
		userArr.click(function(index) {
			userArr.unhighlight(getHighlight(userArr))
			userArr.highlight(index)
			av.gradeableStep()
		});
	}

    // Create the model solution used for grading the exercise
    function modelSolution(modelav) {
        // create stack and populate with values from stackArray
        modelStack = createStackLayout(modelav)
        modelStack = buildStackFromArr(stackArray, stackSize, modelStack)
        modelStack.layout();
        modelStack.first().highlight();
        var modelArr = createArrayLayout(modelav, initialArray, true, arrayLayout.val())
        modelav.displayInit();
        while (modelStack.size() > 0) {
            var ind = 1
            modelArr.highlight(0)
            modelav.gradeableStep()
			while (modelArr.value(ind) <= modelStack.first().value() && modelArr.value(ind) != "") {
                moveHighlight(ind - 1, ind, modelArr)
                modelav.gradeableStep();
                ind++;
            }
            ind--;
			modelArr.unhighlight(ind);
            modelArr.addClass(ind, "correctIndex");
			modelav.gradeableStep();
			modelStack.removeFirst()
			modelArr.removeClass(getFirstIndWithClass(modelArr, "correctIndex"), "correctIndex")
			modelArr.value(ind, "");
            while (ind < arraySize - 1) {
                modelArr.value(ind, modelArr.value(ind + 1));
                modelArr.value(ind + 1, "");
                ind++;
            }
            modelav.step();
        }
        return modelArr;
    }

    // Fixstate function called if continuous feedback/fix mode is used
    function fixState(modelState) {
        var modelArray = modelState[0];
        // Get the raw array elements so we can access their list of class names
        var modArrElems = JSAV.utils._helpers.getIndices($(modelArray.element).find("li"));
        var userArrElems = JSAV.utils._helpers.getIndices($(userArr.element).find("li"));
        for (var i = 0; i < modelArray.size(); i++) {
            // Fix any incorrect values
            userArr.value(i, modelArray.value(i))
            // Ensure the classes of each element in the user array match those in the model solution
            userArrElems[i].className = modArrElems[i].className;
        }
    }

    function deleteButton() {
        if (arrHasHighlight(userArr)) {
            var hlPos = getHighlight(userArr);
            var array_value = userArr.value(hlPos);
            if (array_value == stack.first().value()) {
                userArr.addClass(hlPos, "correctIndex")
				userArr.unhighlight(hlPos)
				exercise.gradeableStep()
				stack.removeFirst()
				if (stack.size() > 0)			// If the stack is not empty
					stack.first().highlight()	// highlight the top value.
			}
            else {
                userArr.addClass(hlPos, "wrongIndex")
				userArr.unhighlight(hlPos)
				exercise.gradeableStep()
			}
            var ind = hlPos;
			userArr.value(hlPos, "");
            intv = setInterval(function animateStep() {
                while (ind < arraySize - 1) {
                    userArr.value(ind, userArr.value(ind + 1))
                    userArr.value(ind + 1, "")
                    ind++;
                }
                stopAnimation()
            }, 1400)
            userArr.removeClass(getFirstIndWithClass(userArr, "correctIndex"), "correctIndex");
            userArr.removeClass(getFirstIndWithClass(userArr, "wrongIndex"), "wrongIndex");
		}
    }

    $('#Delete').click(deleteButton)

    //////////////////////////////////////////////////////////////////
    // Start processing here
    //////////////////////////////////////////////////////////////////
    var arraySize = 13,
        stackSize = 5,
        initialArray = [],
        stack,
        intv,
        modelStack,
        stackArray,
		    pseudo,
		    code,
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
        });
    av.recorded(); // we are not recording an AV with an algorithm

    // show a JSAV code instance only if the code is defined in the parameter
    // and the parameter value is not "none"
    //if (code)
    //    pseudo = av.code($.extend(codeOptions, code));
    var exercise = av.exercise(modelSolution, initialize, {
        compare: {css: "backgroundColor"},//feedback: "continuous",
        controls: $(".jsavexercisecontrols")
    });
    // add the layout setting prelow, high, valference
    var arrayLayout = settings.add("layout", {
        "type": "select",
        "options": {
            "bar": "Bar",
            "array": "Array"
        },
        "label": "Array layout: ",
        "value": "array"
    });
    exercise.reset();
    // Initialize userArr
    var userArr; // JSAV array
});
