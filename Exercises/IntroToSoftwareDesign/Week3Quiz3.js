/*global window */
(function() {
    "use strict";
    var x_value;
    var Q1correct;
    var Q2correct;
    var Q3correct;

    var Quiz3 = {

	Q1option: ["STATEMENT 1", "STATEMENT 2"],
	Q1setRight: function(x) {
    if (x<20){
      Q1correct = "STATEMENT 1";
      Quiz3.Q1option[0] = "STATEMENT 2";
      Quiz3.Q1option[1] = "STATEMENT 3";
    }else if(x <25){
      Q1correct = "STATEMENT 2";
      Quiz3.Q1option[0] = "STATEMENT 1";
      Quiz3.Q1option[1] = "STATEMENT 3";
    }else{
      Q1correct = "STATEMENT 3";
      Quiz3.Q1option[0] = "STATEMENT 1";
      Quiz3.Q1option[1] = "STATEMENT 2";
    }
    return Q1correct;
	},


  Q2option: ["STATEMENT 1", "STATEMENT 2", "STATEMENT 3" ],
  Q2setRight: function(x) {
    if (x<20){
      Q2correct = "STATEMENT 1";

      Quiz3.Q2option[0] = "STATEMENT 2";
      Quiz3.Q2option[1] = "STATEMENT 3";
      Quiz3.Q2option[2] = "STATEMENT 4";
    }
    if (x>50){
      Q2correct = "STATEMENT 2";

      Q2option[0] = "STATEMENT 1";
      Q2option[1] = "STATEMENT 3";
      Q2option[2] = "STATEMENT 4";
    }else{
      Q2correct = "STATEMENT 3";

      Q2option[0] = "STATEMENT 1";
      Q2option[1] = "STATEMENT 2";
      Q2option[2] = "STATEMENT 4";
    }
    if(x>90){
      Q2correct = "STATEMENT 4";

      Q2option[0] = "STATEMENT 1";
      Q2option[1] = "STATEMENT 2";
      Q2option[2] = "STATEMENT 3";
    }

    return Q2correct;
  },


  Q3option: ["STATEMENT 1" ],

  Q3intToBool: function(x){
    var boolVal;
    if(x==1){
      boolVal = true;
    }
    else{
      boolVal = false;
    }
    return boolVal;
  },

  Q3setRight: function(x) {
    if (x == false){
      Q3correct = "STATEMENT 1";
      Quiz3.Q3option[0] = "STATEMENT 2";
		}else{
			Q3correct ="STATEMENT 2";
      Quiz3.Q3option[0] = "STATEMENT 1"
		}
    return Q2correct;
  },


    };
    window.Quiz3 = window.Quiz3 || Quiz3;
}());
