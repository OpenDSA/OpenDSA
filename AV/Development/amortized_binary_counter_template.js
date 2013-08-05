/******************************************************
	The following functions and variables are all part of the Binary Counter Example
	-Samuel A. Micka 7/31/2013


	Note to developers:
		for your template to show up, go to the amortized_template.html file
		1) you will need to add a link for your template under the select menu
		2) you will need to include your template below the select
		3) make sure all function calls are sent in as strings properly

		follow the instructions in the amortized_template.html file and use this file as a guide
******************************************************/
//GLOBAL VARS
//need these variables to be global so that they can be called from the construct_show method
//they can also be passed around in string function calls that are later evaluated in the template (amortized_template.html)

var add_one, check_add_use, bin_counter_backstep;
var bin_counter_arr;
var bits_flipped = 0;
var one_step_prev_arr = [];
//initializes the dynamic array function
function binary_counter() {
	//FUNCTIONS for binary counter

	potential_function_val = (function(bits_flipped) {
		return 2*(bits_flipped);
	});

	//add a new element
	add_one = (function() {
		bits_flipped = 0;

		var i = bin_counter_arr.size()-1;

		//store the previous values in an array for stepping back once
		var two_d_level = [];
		for(var x = 0; x < bin_counter_arr.size(); x++) {
			two_d_level.push(bin_counter_arr.value(x));
		}
		one_step_prev_arr.push(two_d_level); 

		while(i > -1 && bin_counter_arr.value(i) == 1) {
			bin_counter_arr.value(i, 0);
			i--;
			bits_flipped++;
		}
		if(i > -1)
			bin_counter_arr.value(i, 1);
			bits_flipped++;
		return bits_flipped;
	});


	//lets you know if you should use the add function
	check_one_use = (function(){
		return true;
	});


	//function called when the user wants to step backwards
	bin_counter_backstep = (function(bin_counter_arr) {
		bin_counter_arr.clear();
		this.bin_counter_arr = visualization.ds.array(one_step_prev_arr[one_step_prev_arr.length-1], {center:false});
		one_step_prev_arr.pop();		
	});



	//define the pseudo code for both functions
	var add_pseudo = "function add_one(num): \n\ti = num.length - 1 \n\twhile i > -1 and num[i] == 1: \n\t\tnum[i] = 0 \n\t\ti -= 1\n\tif i > -1\n\t\tnum[i] = 1";

	var operations = [["Add 1", "add_one()", "check_one_use()",add_pseudo]];

	construct_show(operations, "potential_function_val(bits_flipped)",0,0,0,1,0, "bin_counter_backstep(bin_counter_arr)");
	/*****************************
		Here I am setting up the button that we will use to add another element to the array list
	******************************/
	//get the div I want to nest them in

	/*
		We want to put this with the other buttons, so we grab they div they are in by the id buttons_div
	*/
	var the_div = document.getElementById('buttons_div');
	//create a button to add the value
	var add_button = document.createElement('button');
	add_button.id = 'add_button';
	the_div.appendChild(add_button);
	//Add the text 'Add' to our dynamically created button
	$("#add_button").html("Add One");

	bin_counter_arr = visualization.ds.array([0,0,0,0], {center:false});
	current_index = 0;

	$("#add_button").click(function() {
		//call the next step function
		next_step();
	});
}	



