/*global window */
(function() {
  "use strict";

  var nth_root = {

    option: [0, 0, 0],

    // Initialise the exercise
    initZ: function(n) {
      var z = "";
      if (n === 3) {
        z = "-1^{2/3}";
      } else if (n === 4) {
        z = "i";
      } else if (n === 5) {
        z = "-1^{2/5}";
      } else if (n === 6) {
        z = "-1^{1/3}";
      } else if (n === 7) {
        z = "-1^{2/7}";
      } else if (n === 8) {
        z = "\\sqrt i";
      } else if (n === 9) {
        z = "-1^{2/9}";
      } else if (n === 10) { z = "-1^{1/5}"; }
      return z;
    },

    answers: function(n) {
      var my_array = [];
      var temp_n = n;
      my_array[0] = n;
      while (temp_n === my_array[0]) {
        temp_n = Math.floor(Math.random() * 7 + 3);
      }
      nth_root.option[0] = nth_root.initZ(temp_n);
      my_array[1] = temp_n;
      while (temp_n === my_array[0] || temp_n === my_array[1]) {
        temp_n = Math.floor(Math.random() * 7 + 3);
      }
      nth_root.option[1] = nth_root.initZ(temp_n);
      my_array[2] = temp_n;
      while (temp_n === my_array[0] || temp_n === my_array[1] || temp_n === my_array[2]) {
        temp_n = Math.floor(Math.random() * 7 + 3);
      }
      nth_root.option[2] = nth_root.initZ(temp_n);

      return n;
    }

  };

  window.nth_root = window.nth_root || nth_root;
}());
