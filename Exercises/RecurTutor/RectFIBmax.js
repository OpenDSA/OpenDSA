/*global window */
(function() {
  "use strict";
  var rectFIBmax = {
    genAnswer: function(A) { // Calculate max
      return A;
// This exercise is broken because A is passed in as an interger, not an array
// If the HTML were changed to generate a random array, then it would be OK.
// At least now it works (with this change), but its not so interesting.
//      var answer = mystery(A, 0);
//      return answer;
    }
  };

  function mystery(numbers, index) {
    if (index === numbers.length - 1) {
      return numbers[index];
    }
console.log("ERROR! index: " + index + ", length: " + numbers.length);
    var temp = mystery(numbers, index + 1);
    if (temp > numbers[index]) return temp;
    else return numbers[index];
  }

  window.rectFIBmax = window.rectFIBmax || rectFIBmax;
}());
