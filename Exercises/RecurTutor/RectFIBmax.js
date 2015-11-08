/*global window */
(function() {
  "use strict";
  var rectFIBmax = {
    genAnswer: function(A) { // Calculate max
      var answer = mystery(A, 0);
      return answer;
    }
  };

  function mystery(numbers, index) {
    if (index === numbers.length - 1) {
      return numbers[index];
    }
    var temp = mystery(numbers, index + 1);
    if (temp > numbers[index]) return temp;
    else return numbers[index];
  }

  window.rectFIBmax = window.rectFIBmax || rectFIBmax;
}());
