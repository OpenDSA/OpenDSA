/*global window */
(function() {
  "use strict";
  var a_array = [];
  var b_array = [];
  var second = false;

  var Polynomial_multiplication = {

    // Initialise the exercise
    initPoly: function(poly_size) {
      var i;
      var next_val;
      var poly_str;
      var my_array = [];
      for (i = 0; i < poly_size; i++) {
        next_val = Math.floor(Math.random() * 8 - 4);
        my_array.push(next_val);
      }
      poly_str = "";
      for (i = 0; i < poly_size; i++) {
        if (my_array[i] !== 0) {
          if (poly_str !== "") {
            poly_str = poly_str + "+";
          }
          if ((poly_size - 1 - i) === 1) {
            poly_str = poly_str + my_array[i] + "x";
          } else if ((poly_size - 1 - i) === 0) {
            poly_str = poly_str + my_array[i];
          } else {
            poly_str = poly_str + my_array[i] + "x^" + (poly_size - 1 - i);
          }
        }
      }

      if (second === false) {
        a_array = my_array;
        second = true;
      } else {
        b_array = my_array;
        second = false;
      }

      return poly_str;
    },

    multiply: function(value) {
      var i;
      var a_size = a_array.length;
      var b_size = b_array.length;
      var eval_A = 0;
      var eval_B = 0;
      for (i = 0; i < a_size; i++) {
        eval_A = eval_A + a_array[i] * Math.pow(value, a_size - 1 - i);
      }
      for (i = 0; i < b_size; i++) {
        eval_B = eval_B + b_array[i] * Math.pow(value, b_size - 1 - i);
      }
      return eval_A * eval_B;
    }
  };

  window.Polynomial_multiplication = window.Polynomial_multiplication || Polynomial_multiplication;
}());
