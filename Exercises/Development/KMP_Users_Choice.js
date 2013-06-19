
var kmp_exercise, master_str, sub_str, compares, shifts, started;

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
L = arr.length;
for(var p = 2; p < L; p++) {
  q = align[p-1];
  while((q>=0) && (arr[q] != arr[p-1])) {
    q = align[q];
  }
  align[p] = q+1;
}
return align;
}


function kmp(master, sub, align) {

    var m = 0;
    var s = 0;
    compares = 0;
    shifts = 0;
    //highlight the first spots
    master.highlight(m);
    sub.highlight(m);   
    kmp_exercise.step();
    var n = 0;
    var found = false;
    while((m < sub.size()-1) && (sub_str.length - s <= master.size() - m)) {
      align.unhighlight();
      if(master.value(m) === sub.value(m)) {          
        m+=1;
        s+=1;
        compares+=1;
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
        compares+=1;
        for(var i = sub.size()-1; i > 0; i--){
          sub.value(i, sub.value(i-1));
        }
        sub.value(m-1, ' ');
        master.unhighlight();
        sub.unhighlight();
        master.highlight(m);
        sub.highlight(m);
      } else {
        compares+=1;
        shifts+=1;
        n = s;
        align.highlight(s);        
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
      kmp_exercise.step();
    }
      kmp_exercise.recorded();
    if(s == sub_str.length-1 || found) {
      return m - s;
    } else {
      return -1;
    }
  }


function checkAnswer() {
  var answer = 2
  if(answer == 2) {
    return true;
  } else {
    return false;
  }
}


//This function initializes the arrays, and handles the clicks on the specific indexes, see comments in method for more information
function make_arrays(){
  started = true;
  kmp_exercise = new JSAV("container");
  var max = 0;
  var strs = generate_strings();
  master_str = strs[0];
  sub_str = strs[1];

  var master_arr = master_str.split("");
  var sub_arr = sub_str.split("");

  main_text = kmp_exercise.ds.array([' '], {indexed: true});


  for(i=0; i<master_str.length;i++) {
  	main_text.value(i, master_str.charAt(i));
  }

  search_string = kmp_exercise.ds.array([' ']);

  for(z=0;z<search_string.size();z++) {
  	search_string.value(z, ' ');
  }

  //need to make the arrays align nicely so we need to fill the remaining indexes of the substring array with empty characters 
  for(j=0;j<master_str.length;j++) {
    if(sub_str.charAt(j).length > 0) {
  	  search_string.value(j, sub_str.charAt(j));
    } else {
      search_string.value(j, " ");
    }
  }
  //initializing the alignment array
  var alignment_table = kmp_exercise.ds.array([' ']);
  var align_table_temp = new Array();
  align_table_temp = compute_align_array(sub_arr);
  for(f=0;f<align_table_temp.length;f++) {
    alignment_table.value(f, align_table_temp[f]);
  }
  kmp_exercise.displayInit();
  kmp_exercise.step();
  kmp(main_text, search_string, alignment_table);
  $("#number1").html("Number 1 (compares): "+compares);
  $("#number2").html("Number 2 (shifts): "+shifts);

}