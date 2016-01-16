/*global window */
(function() {
  "use strict";
  /* The structure of the log problem is:
   * log_base (number) = answer.
   */

  var logarithms_1 = {
    /* This is used for hints. Given the number you're taking a logarithim of, and
     * a base, breaks the number into base x base x base...     x base.
     * Returns a string. */
    get_power_string: function(number, base) {
      var result = base;
      for (var i = base; i < number; i *= base) {
        result += "\\times" + base;
      }
      return result;
    }
  };

  window.logarithms_1 = window.logarithms_1 || logarithms_1;
}());
