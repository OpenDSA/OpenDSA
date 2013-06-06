"use strict";
/*global alert: true, ODSA */
(function ($) {
  $(document).ready(function () {
    /*
      This area will be cleaned up soon but I was mimicking an example exercise in an attempt to ensure that everything worked.
      -S.A.M.
    */
    /* **************************************************************
    *  This first section is generic initialization that all AVs    *
    *  will need, including initialization for the OpenDSA library  *
    *  The first line you need to set to use your form's name       *
    ************************************************************** */

    // settings for the AV
    var settings = new JSAV.utils.Settings($(".jsavsettings"));

    // add the layout setting preference
    var arrayLayout = settings.add("layout", {"type": "select",
          "options": {"bar": "Bar", "array": "Array"},
          "label": "Array layout: ", "value": "array"});

    var kmp_jsav = new JSAV($('.avcontainer'), {settings: settings});
    kmp_jsav.recorded();

    // Create a convenience function named tell for writing to the
    // output buffer
    var tell = function (msg, color) { kmp_jsav.umsg(msg, {color: color}); };

    /* **************************************************************
    *        Everything below this is specific to this AV           *
    ************************************************************** */


    /*#################################################################
      These global constants are set to modify the strings easily.
    #################################################################*/
    //this determines the maximum length of the substring
    var substring_max_length = 8;
    //this determines the maximum length of the master string
    var master_string_max_length = 16;
    //this represents the lower bound of randomly generated numbers desired in the ascii table
    var char_lower_bound = 97;
    //this represents the upper bound of randomly generated numbers desired in the ascii table
    var char_upper_bound = 122;
    var contains; //determines if the substring will be contained in the master string

    /*#################################################################
      Other Global Variables
    #################################################################*/    

    var model_arr = [], // needed for model answer
        str,
        sub_str,
        sub_str_size,
        str_curr,
        sub_str_curr,
        align_arr,
        num_comp;

      

    function reset_exec_vars() {
      str = null;
      sub_str = null;
      sub_str_size = null;
      str_curr = null;
      sub_str_curr = null;
      align_arr = null;
      num_comp = null;
    }  
    //returns a random number between lower_bound and upper_bound
    function gen_random(lower_bound, upper_bound) {
      return Math.floor(Math.random() * (upper_bound - lower_bound + 1) + lower_bound);
    }
    //converts the ascii_value parameter to character and returns it
    function get_char(ascii_value) {
      return String.fromCharCode(ascii_value);
    }
    //function that generates the first 5 characters of our substring

    function generate_first_part_of_substring(decision, seed) {
      if(decision == 1) {
        var second = get_char(gen_random(char_lower_bound, char_upper_bound));
        return seed + second + seed + second + seed;
      } else if(decision == 2) {
        var second = get_char(gen_random(char_lower_bound,char_upper_bound));
        return seed+seed+seed+second+second;
      } else if(decision == 3) {
        return seed+seed+seed+seed+get_char(gen_random(char_lower_bound,char_upper_bound));
      } else if(decision == 4) {
        return seed + get_char(gen_random(char_lower_bound,char_upper_bound)) + seed + seed + get_char(gen_random(char_lower_bound,char_upper_bound));
      } else {
        return seed + get_char(gen_random(char_lower_bound,char_upper_bound)) + get_char(gen_random(char_lower_bound,char_upper_bound))+ get_char(gen_random(char_lower_bound,char_upper_bound)) + get_char(gen_random(char_lower_bound,char_upper_bound));
      }
    }
    //generates last 1-3 characters of the substring
    function generate_last_part_of_substring(num, rep, first) {
      if(rep){
        return first + first.substring(0, num);
      } else {
        var tail = '';
        for(var i = 0; i < num; i++){
          tail += get_char(gen_random(char_lower_bound,char_upper_bound));
        }
        return first + tail;
      }
    }
    //This function generates the master and substring needed for the exercise
    function generate_strings(){
        /*######################################
          Substring generation begins here
        ######################################*/
        //ascii values of lower case characters are char_lower_bound - char_upper_bound, so I'll choose a random number in that range
        var rand_char = get_char(gen_random(char_lower_bound, char_upper_bound));
        //now that rand_char holds the "seed" for our random string we will start with the substring
        var decision_one = gen_random(1, 5);
        //we first generate 5 random characters (the smallest the substring can be)
        var first_sub = generate_first_part_of_substring(decision_one, rand_char);

        /*
        next we decide how many characters to add and if they will be repeats of the first part of the string or not.
        We add anywhere form 1 - substring_rough_size - 5 characters to the original 5 and then we decide if it will be repeated or not based on the
        number returned being even or odd.
        */
        var decision_two = gen_random(1, substring_max_length-5);
        var repeat;
        if(decision_two % 2 == 0) {
          repeat = true;
        } else {
          repeat = false;
        }
        var substr = generate_last_part_of_substring(decision_two, repeat, first_sub);
        /*############################################
          Master string generation begins here
        ############################################*/
        //we want the master string to be at least 3 characters larger than the substring
        var master_str_len = gen_random(substr.length + 3, master_string_max_length);
        var sub_str_location = gen_random((substr.length/2)+1, master_str_len - substr.length);
        //1 is the case that it doesn't contain the substring, unless the randomly generated characters decide to contain it anyway...
        
        var master = substr;
        for(var i = (substr.length/2)+1; i < master_str_len; i++) {
          if(i < sub_str_location){
            master = get_char(gen_random(char_lower_bound,char_upper_bound)) + master;
          } else if (i >= (sub_str_location + substr.length)) {
            master = master + get_char(gen_random(char_lower_bound,char_upper_bound));
          }
        }
        //determine whether a random character is placed before or after the first half of the substring at the beginning of the master
        if(gen_random(1,2) == 1){
            master = get_char(gen_random(char_lower_bound,char_upper_bound)) + substr.substring(0, substr.length/2) + master;
        } else {
            master = substr.substring(0, substr.length/2) + get_char(gen_random(char_lower_bound,char_upper_bound)) + master;
        }
        return [master,substr];
    }

    //This function computes the alignment lookup table for the KMP algorithm
    function compute_align_array(arr) {
      var align = new Array();
      align[0] = -1;
      align[1] = 0;
      var q = 0;
      var L = arr.length;
      for(var p = 2; p < L; p++) {
        q = align[p-1];
        while((q>=0) && (arr[q] != arr[p-1])) {
          q = align[q];
        }
        align[p] = q+1;
      }
      return align;
    }

    function str_click_handler(index) {
      str_curr = index;
      str.unhighlight();
      str.highlight(index);
    }
    function sub_str_click_handler(index) {
      sub_str_curr = index;
      sub_str.unhighlight();
      sub_str.highlight(index);
    }

    //This function initializes the arrays for the exercise
    function initialize(){
      // Clear all existing arrays
      $("#arrays").html("");
      reset_exec_vars();
      

      var strs = generate_strings();

      var master_arr = strs[0].split("");
      var sub_arr = strs[1].split("");
      sub_str_size = sub_arr.length;
      str = kmp_jsav.ds.array(master_arr);

      sub_str = str.clone();
      sub_str.show();
      for(var j=0;j<master_arr.length;j++) {
        if(j < sub_arr.length) {
          sub_str.value(j, sub_arr[j]);
        } else {
          sub_str.value(j, " ");
        }
      }

      
      var align_table_temp = compute_align_array(sub_arr);
      align_arr = kmp_jsav.ds.array(align_table_temp, {indexed: true});
      num_comp = 0;
      str_curr = 0;
      sub_str_curr = 0;

      //bind click events to the handler functions
      str.click(str_click_handler);
      sub_str.click(sub_str_click_handler);

      return [str, sub_str, align_arr];
    }

    //This function is the KMP algorithm, implemented in the way described in the pseudo code in the slideshow
    function kmp(temp_jsav, master, sub, align) {
      var m = str_curr;
      if(num_comp != 0) {
        var s = num_comp-1;
      } else {
        s = 0;
      }
      //highlight the first spots
      master.highlight(m);
      sub.highlight(m);
      temp_jsav.stepOption("grade", true);      
      temp_jsav.step();
      var n = 0;
      var found = false;
      while((m < sub.size()-1) && (sub_str_size - s <= master.size() - m)) {
        if(master.value(m) === sub.value(m)) {          
          m+=1;
          s+=1;
          //case that we have found a match
          if(sub.value(m) == ' ') {
            found = true;
            break;
          }
          master.unhighlight(m-1);
          sub.unhighlight(m-1);          
          master.highlight(m);
          sub.highlight(m);
        } else if(s == 0) {
          m+=1;
          for(var i = sub.size()-1; i > 0; i--){
            sub.value(i, sub.value(i-1));
          }
          sub.value(m-1, ' ');
          master.unhighlight();
          sub.unhighlight();
          master.highlight(m);
          sub.highlight(m);
        } else {
          n = s;
          s = align.value(s);
          for(var i = sub.size()-1; i > m-1; i--){
            sub.value(i, sub.value(i-(n-s)));
          }     
          for(var i = 0; i < m-s; i++){
            sub.value(i, ' ');
          }
          sub.unhighlight();
          sub.highlight(m);
        }
        temp_jsav.stepOption("grade", true);
        temp_jsav.step();
      }
      if(s == sub_str_size-1 || found) {
        return m - s;
      } else {
        return -1;
      }
    }

    function modelSolution(temp_jsav) {
      var temp_str = temp_jsav.ds.array([' '], {indexed: true});
      var temp_sub_str = temp_jsav.ds.array([' ']);
      var temp_align_arr = temp_jsav.ds.array([' ', {indexed: true}]);
      for(var i = 0; i < str.size(); i++){
        temp_str.value(i, str.value(i));
        temp_sub_str.value(i, sub_str.value(i));
        if(i < align_arr.size()) {
          temp_align_arr.value(i, align_arr.value(i));
        }
      }
      temp_jsav.displayInit();      
      var x = kmp(temp_jsav, temp_str, temp_sub_str, temp_align_arr);
      console.log(x);
      return [temp_str, temp_sub_str, temp_align_arr]; 
    }


    function fixState(modelState) {
      var model_str = modelState[0]; //get the master string from the model answer
      var model_sub_str = modelState[1]; //get the sub string from the model answer
      for(var i = 0; i < str.size(); i++) {
        if(model_str.isHighlight(i) != str.isHighlight(i)){
          if(model_str.isHighlight(i)){
            str.highlight(i);
            str_curr = i;
          } else {
            str.unhighlight(i);
          }
        }
        if(model_str.value(i) != str.value(i)) {
          str.value(i, model_str.value(i));
        }

        if(model_sub_str.isHighlight(i) != sub_str.isHighlight(i)){
          if(model_sub_str.isHighlight(i)) {
            sub_str.highlight(i);
            sub_str_curr = i;
          } else {
            sub_str.unhighlight(i);
          }
        }
        if(model_sub_str.value(i)!=sub_str.value(i)) {
          sub_str.value(i, model_sub_str.value(i));
        }
      }
      var spot = 0;
      for(var i = 0; i < sub_str.size(); i++) {
        if(sub_str.value(i) != " ") {
          spot = i;
          break;
        }
      }
      num_comp = (sub_str_curr - spot) + 1;
    }

    $('#help').click(function() {
      alert("Follow the instructions.")
    });
    $('#about').click(function() {
      alert("KMP Proficiency Exercise\nWritten by Samuel Micka\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());     
    });


    // Initialize the exercise
    // Defines the function to call on reset (initialize())
    var exercise = kmp_jsav.exercise(modelSolution, initialize,
                     [{css: "background-color"}, {}], {controls:
                     $('.jsavexercisecontrols'), fix: fixState,
                     feedback: "continuous", fixmode: "fix"});
    exercise.reset();
/*
    str.click(function(index) {
      str_curr = index;
      str.unhighlight();
      str.highlight(index);
    });
    sub_str.click(function(index) {
      sub_str_curr = index;
      sub_str.unhighlight();
      sub_str.highlight(index);
    });
*/
    $('#next').click(function() {
      if(str_curr != sub_str_curr){
        sub_str.unhighlight(sub_str_curr); 
        if(num_comp > 1) {       
          num_comp = num_comp - (str_curr - sub_str_curr); //number compared is now number compared - the shift offset
        }
        console.log(num_comp);
        if(((str_curr - sub_str_curr) + str_curr) < sub_str.size()) {
          for(var i = sub_str.size()-1; i >= (str_curr-sub_str_curr); i--){
            sub_str.value(i, sub_str.value(i - (str_curr - sub_str_curr)));
          }
          if(sub_str_curr != 0){
            var curr = 0;
            for(var i = 1; i < sub_str.size(); i++){
              if(sub_str.value(i) != " "){
                curr = i;
                break;
              }
            }
           if(num_comp > 0){
              for(var i = 0; i <= (str_curr - num_comp); i++){
                sub_str.value(i, " ");
              }
            } else {
              for(var i = 0; i < (str_curr - num_comp); i++){
                sub_str.value(i, " ");
              }              
            }
          } else {
            if(num_comp > 0) {
              for(var i = 0; i <= (str_curr - num_comp); i++){
                sub_str.value(i, " ");
              } 
            } else {
               for(var i = 0; i < (str_curr - num_comp); i++){
                sub_str.value(i, " ");               
              } 
            }           
          }
          sub_str_curr = str_curr;
          sub_str.highlight(sub_str_curr);
        
        }       
      } else {
        num_comp++;
      }
     exercise.gradeableStep()
    });
        
  });
}(jQuery));  