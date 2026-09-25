"use strict";

$(document).ready(function() {
    // Process about button: pop up a message with an alert
    function about() {
        alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
    }
    $('#about').click(about);
	
    // Process the reset button
    function initialize() {
        // clear the user array
        if (userArr)
            userArr.clear()
		av.clearumsg()
		arr_ind = av.variable(0)
		paint_type = "paint_lvl"
		for (var i = 0; i < arr_size; i++) 
			arr[i] = "";
		// set the first array's values
		for (var i = 0; i < 5; i++) 
			randomizeElements(i);		
		// create the array
		setUserArray(arr);
		setUpText(arr_ind.value());
		userArr.click(function(index) {
			userArr.addClass(index, paint_type + arr_ind.value());
			userArr.addClass(index, "paint");
			exercise.gradeableStep();
		});	
		return userArr;
    }
	
	// set userArr to a new array 
	function setUserArray(arr) {
        userArr = av.ds.array(arr, {
            indexed: true,
            layout: arrayLayout.val()
        });
	}
	
	function setUpIncrText(ind) {
		av.umsg("<p><strong>Array " + (ind + 1) + " of 5 (" + difficultyString(arr_ind.value()) + ")</strong></p>&emsp;for (int i = " + arr_starts[ind] + "; i < "
			+ arr_ends[ind] + "; i = i + " + arr_steps[ind] + ") {" 
		+ "<br/> &emsp;&emsp; paint(i); <br/> &emsp;}")
	}
	
	function setUpDecrText(ind) {
		av.umsg("<p><strong>Array " + (ind + 1) + " of 5 (" + difficultyString(arr_ind.value()) + ")</strong></p>&emsp;for (int i = " + arr_ends[ind] + "; i > "
			+ arr_starts[ind] + "; i = i - " + arr_steps[ind] + ") {" 
		+ "<br/> &emsp;&emsp; paint(i); <br/> &emsp;}")
	}
	
	function setUpMultText(ind) {
		av.umsg("<p><strong>Array " + (ind + 1) + " of 5 (" + difficultyString(arr_ind.value()) + ")</strong></p>&emsp;for (int i = " + arr_starts[ind] + "; i < "
			+ arr_ends[ind] + "; i = i * " + arr_steps[ind] + ") {" 
		+ "<br/> &emsp;&emsp; paint(i); <br/> &emsp;}")
	}
	
	function setUpText(ind) {
		// clear the old text
		av.clearumsg()
		switch(ind) {
			case 0: case 1: case 2:
				setUpIncrText(ind)
				break;
			case 3:
				setUpDecrText(ind)
				break;
			default:
				setUpMultText(ind)
				break;
		}
	}
	
	// set up the randomized elements 
	function randomizeElements(ind) {
		switch(ind) {
		case 0:
			arr_starts[ind] = Math.floor(Math.random() * (arr_size/3))
			arr_ends[ind] = arr_size - 1 - Math.floor(Math.random() * (arr_size/3))
			arr_steps[ind] = 1
			break;
		case 1:
			arr_starts[ind] = Math.floor(Math.random() * (arr_size/3))
			arr_ends[ind] = arr_size - 1 - Math.floor(Math.random() * (arr_size/3))
			arr_steps[ind] = Math.floor(Math.random() * (arr_size / 4)) + 2
			break;
		default:
			arr_starts[ind] = Math.floor(Math.random() * (arr_size/2))
			arr_ends[ind] = arr_size - 1 - Math.floor(Math.random() * (arr_size/2))
			arr_steps[ind] = Math.floor(Math.random() * (arr_size / 4)) + 2
			break;
		}
	}
	
	function clearArrayPaint(ind, arr) {
		clearClassFromArr(arr, paint_type + ind)
		clearClassFromArr(arr, "paint")
	} 

    function modelSolution(av) {
			var model_ind = 0;
			var modelArray = av.ds.array(arr, {
				indexed: true,
				layout: arrayLayout.val()
			});
			av.displayInit();
		while (model_ind < 3) {
				av.step();
				for (var i = arr_starts[model_ind]; i < arr_ends[model_ind]; i = i + arr_steps[model_ind]) {
					modelArray.addClass(i, paint_type + model_ind);
					modelArray.addClass(i, "paint");
					av.gradeableStep();
				}
				clearArrayPaint(model_ind, modelArray)
				model_ind = model_ind + 1;
		}
		av.step();
		for (var i = arr_ends[3]; i > arr_starts[3]; i = i - arr_steps[3]) {
			modelArray.addClass(i, paint_type + 3);
			modelArray.addClass(i, "paint");
			av.gradeableStep();
		}
		clearArrayPaint(3, modelArray)
		av.step();
		for (var i = arr_starts[4]; i < arr_ends[4]; i = i * arr_steps[4]) {
			modelArray.addClass(i, paint_type + 4);
			modelArray.addClass(i, "paint");
			av.gradeableStep();
		}
		clearArrayPaint(4, modelArray)
		return modelArray;
    }
	
	function nextArray() {
		if (userArr && arr_ind.value() < 4) {
			clearArrayPaint(arr_ind.value(), userArr)
			arr_ind.value(arr_ind.value() + 1)
			setUpText(arr_ind.value())
		} 
	}
	
	function backArray() {
		if (userArr && arr_ind.value() > 0) {
			clearArrayPaint(arr_ind.value(), userArr)
			arr_ind.value(arr_ind.value() - 1)
			setUpText(arr_ind.value())
		}
	}
	
	function setColorType(pt_type) {
		if (pt_type != paint_type) {
			var painted_ind = getIndicesWithClass(userArr, paint_type + arr_ind.value())
			var old_paint = paint_type
			paint_type = pt_type;
			for (var i = 0; i < painted_ind.length; i++) {
				userArr.addClass(painted_ind[i], paint_type + arr_ind.value())
				userArr.removeClass(painted_ind[i], old_paint + arr_ind.value())
			}
		}
	}	
	
	document.getElementById("default_col").addEventListener("click", function() {
		setColorType("paint_lvl");
	}, false);
	document.getElementById("pd_col").addEventListener("click", function() {
		setColorType("deut_prot");
	}, false);
	document.getElementById("trit_col").addEventListener("click", function() {
		setColorType("trit");
	}, false);
	document.getElementById("mono_col").addEventListener("click", function() {
		setColorType("mono");
	}, false);
	$('#next').click(nextArray)
	$('#back').click(backArray)	
    //////////////////////////////////////////////////////////////////
    // Start processing here
    //////////////////////////////////////////////////////////////////
    var arr_size = 13,
		paint_type,
		arr_text,
		arr_starts = [],
		arr_ends = [],
		arr_steps = [],
        config = ODSA.UTILS.loadConfig(),
        interpret = config.interpreter, // get the interpreter
        code = config.code,
		//arr_ind = 0,
		arr_ind,
		arr = [],
        codeOptions = {
            after: { element: $(".instructions") },
            visible: true
        },
        settings = config.getSettings(), // Settings for the AV
        av = new JSAV($('.avcontainer'), { settings: settings });
    // we are not recording an AV with an algorithm
    av.recorded();
    // show a JSAV code instance only if the code is defined in the parameter
    // and the parameter value is not "none"
    if (code)
        pseudo = av.code($.extend(codeOptions, code));
    var exercise = av.exercise(modelSolution, initialize, {
        compare: {class: "paint"},
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
})