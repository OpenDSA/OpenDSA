/*global window */
(function() {
  "use strict";
    var my_array;

    var Dynamic_quiz = {

    // Initialise the exercise
      initArr: function(arr_size) {
	  var i;
	  var next_val;
	  var array_str;
	  my_array = [];
	  for (i = 0; i < arr_size; i++) {
	      next_val = Math.floor(Math.random() * 1000 + 1);
	      while (my_array.includes(next_val))
		      next_val = Math.floor(Math.random() * 1000 + 1);

        my_array.push(next_val);
	      console.log(" " + next_val);
	  }
	  array_str = "";
	  for (i = 0; i < arr_size; i++) {
	      array_str = array_str + " " + my_array[i];
	  }
	  console.log(array_str);
	  return array_str;
      },

  makeQuestionTEXT: function(){
    var questionText;
    next_val = Math.floor(Math.random() * 2); // generate random 0 or 1
    questionText = "";
    if(next_val == 1){
      questionText = "THIS IS QUESTION TEXT 1";
    }else{
      questionText = "THIS IS QUESTION TEXT 2";
    }
    return questionText;

  },

  maxValue: function() {
	  var i;
	  var the_max = my_array[0];
	  for (i = 1; i < my_array.length; i++) {
	      if (my_array[i] > the_max) {
		  the_max = my_array[i];
	      }
	  }
	  return the_max;
      }
  };


  window.Dynamic_quiz = window.Dynamic_quiz || Dynamic_quiz;
}());
