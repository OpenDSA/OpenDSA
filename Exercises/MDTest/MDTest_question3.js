/*global window */
(function() {
    "use strict";
    var my_array;

    var md_test_exercise = {

	option: [0,0,0],

	// Initialise the exercise
	initArr: function(arr_size) {
	    var i;
	    var next_val;
	    var array_str;
	    my_array = ["add", "clear", "contains", "toArray"];
	    array_str = "";
	    for (i = 0; i < arr_size; i++) {
		      array_str = array_str + " " + my_array[i];
	    }
	    console.log(array_str);
	    return array_str;
	},

	maxValue: function() {
	    md_test_exercise.option[0] = my_array[1];
	    md_test_exercise.option[1] = my_array[2];
	    md_test_exercise.option[2] = my_array[3];
	    return my_array[0];
	},

    };
    window.md_test_exercise = window.md_test_exercise || md_test_exercise;
}());
